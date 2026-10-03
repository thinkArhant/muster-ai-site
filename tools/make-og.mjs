#!/usr/bin/env node
/* make-og.mjs — renders og.jpg, the page's unfurl card, from index.html itself.
   Usage: node tools/make-og.mjs

   The card is a real render of the shipped page — composed artwork would be the
   one unverifiable claim on a page built against them. The frame is the first
   screen zoomed 1.2×: viewport 1000 × 525 CSS px at deviceScaleFactor 1.2,
   dark theme, full-viewport capture → exactly 1200 × 630 (the OG standard).
   JPEG quality 90; PNG measured 3.4× the bytes for identical display, and 2×
   was rejected outright — no client renders the card above ~600px.

   DETERMINISM IS THE PAGE'S OWN REDUCED-MOTION PATH, not hand-parking:
   `prefers-reduced-motion: reduce` is emulated, which renders the pulse solid,
   the cursor solid, and every count-up cell at its authored final value with
   state "static" — no mid-roll frame can exist, so the card can never publish
   a number the page did not state. Fonts are awaited and a settle follows
   before capture. The render is captured twice and must be byte-identical:
   a non-deterministic card churns a committed binary on every rebuild.

   THE FRAME IS ASSERTED, NEVER TRUSTED: system-mono glyph metrics differ
   across machines, so a crop correct here can be wrong when regenerated
   elsewhere. The relationships the ruled frame depends on are checked after
   render — the headline's struck phrase and its rust replacement each occupy a
   single fragment, the formation caption's bottom sits inside the frame, and
   the remnant's top sits below it (deliberately out of frame — remnant, VERIFY
   chip and curl are unreadable mush at card size). A violated relationship
   fails the run loudly rather than emitting a subtly wrong card. */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launchChrome } from "../tests/lib/cdp.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PAGE_URL = pathToFileURL(join(ROOT, "index.html")).href;
const OUT = join(ROOT, "og.jpg");

/* The ruled frame: 1000 × 525 CSS px at DSF 1.2 → 1200 × 630 device px. */
const VIEW = { width: 1000, height: 525, deviceScaleFactor: 1.2, mobile: false };
const CARD = { width: 1200, height: 630 };
const JPEG_QUALITY = 90;
const SETTLE_MS = 150;

/* Width and height straight off the JPEG's own start-of-frame marker, so the
   dimension claim is read from the bytes that ship, never from the request. */
function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("not a JPEG (no SOI marker)");
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) throw new Error(`bad JPEG marker at byte ${i}`);
    const marker = buf[i + 1];
    /* SOF0–SOF15 carry the frame size; C4/C8/CC are not SOFs. */
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error("no SOF marker found");
}

const failures = [];
function assert(name, ok, detail) {
  const line = `${ok ? "ok  " : "FAIL"} ${name} — ${detail}`;
  console.log(line);
  if (!ok) failures.push(line);
}

async function render(page) {
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewport(VIEW);
  await page.goto(PAGE_URL);
  /* Fonts settled, one frame painted, then a beat — the ruled pre-capture wait. */
  await page.eval(
    `document.fonts.ready.then(() => new Promise((r) =>
       requestAnimationFrame(() => setTimeout(r, ${SETTLE_MS}))))`
  );

  const frame = await page.eval(`(() => {
    const rect = (sel) => document.querySelector(sel).getBoundingClientRect();
    const frags = (sel) => document.querySelector(sel).getClientRects().length;
    return {
      dark: matchMedia("(prefers-color-scheme: dark)").matches,
      still: matchMedia("(prefers-reduced-motion: reduce)").matches,
      cutFragments: frags(".h1__cut"),
      accentFragments: frags(".h1__accent"),
      captionBottom: Math.round(rect(".formation__caption").bottom * 10) / 10,
      remnantTop: Math.round(rect(".remnant").top * 10) / 10,
      countStates: [...document.querySelectorAll("[data-countup]")].map((el) =>
        el.getAttribute("data-countup-state")),
      liveAnimations: document.getAnimations().length,
      scrollY: window.scrollY
    };
  })()`);

  const { data } = await page.call("Page.captureScreenshot", {
    format: "jpeg",
    quality: JPEG_QUALITY
  });
  return { frame, buf: Buffer.from(data, "base64") };
}

const chrome = await launchChrome();
try {
  const page = await chrome.browser.newPage();
  await page.init();

  const first = await render(page);
  const second = await render(page);
  const { frame, buf } = first;

  /* The state under test: the emulations actually took, and the page is at
     rest on its own complete static path. */
  assert("theme is dark and motion is reduced", frame.dark && frame.still,
    `dark ${frame.dark}, reduced ${frame.still}`);
  assert("page is at scroll 0", frame.scrollY === 0, `scrollY ${frame.scrollY}`);
  assert("every count-up cell is parked static — no mid-roll frame can exist",
    frame.countStates.length > 0 && frame.countStates.every((s) => s === "static"),
    `${frame.countStates.length} cell(s): ${frame.countStates.join(", ")}`);
  assert("nothing animates in the captured frame", frame.liveAnimations === 0,
    `${frame.liveAnimations} live animation(s)`);

  /* The ruled frame's load-bearing relationships, per-machine metrics and all. */
  assert("the struck phrase and the rust edit each hold a single fragment",
    frame.cutFragments === 1 && frame.accentFragments === 1,
    `.h1__cut ${frame.cutFragments} rect(s), .h1__accent ${frame.accentFragments} rect(s)`);
  assert("the formation caption sits inside the frame",
    frame.captionBottom < VIEW.height,
    `caption bottom ${frame.captionBottom} vs frame ${VIEW.height}`);
  assert("the remnant opens below the frame — remnant, chip and curl stay out",
    frame.remnantTop > VIEW.height,
    `remnant top ${frame.remnantTop} vs frame ${VIEW.height}`);

  /* The page fetched nothing but its own file:// assets and generated data:
     URIs, tags present — the same locality rule the harness enforces. */
  const external = page.requests.filter((r) => !/^(file:|data:)/.test(r.url));
  assert("zero external requests during the render", external.length === 0,
    external.map((r) => r.url).join(", ") || `${page.requests.length} local request(s) only`);
  assert("no page errors during the render", page.consoleErrors.length === 0,
    page.consoleErrors.join(" | ") || "none");

  /* The output itself: exact OG geometry, and stable across renders. */
  const size = jpegSize(buf);
  assert("the JPEG is exactly the OG geometry",
    size.width === CARD.width && size.height === CARD.height,
    `${size.width} × ${size.height} vs ${CARD.width} × ${CARD.height}`);
  assert("two renders are byte-identical — the card does not churn on rebuild",
    buf.equals(second.buf), `${buf.length} vs ${second.buf.length} bytes`);

  await page.close();

  if (failures.length) {
    console.error(`\nmake-og: FAILED — ${failures.length} assertion(s); og.jpg NOT written.`);
    process.exit(1);
  }

  writeFileSync(OUT, buf);
  console.log(`\nmake-og: OK — og.jpg written: ${size.width} × ${size.height}, ${buf.length} bytes, JPEG q${JPEG_QUALITY}`);
} finally {
  await chrome.close();
}
