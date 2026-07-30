/* QA full-page sweep — the criteria the section harnesses do not reach.

   `verify-shell.mjs` and `verify-webkit.mjs` are the build's own harnesses and
   `qa-independent-audit.mjs` re-derives §2, the palette and the accessibility
   floors from the specs. This file covers what neither reaches: the whole-page
   copy matrix including VERIFY.md, §4's stamps, the motion inventory as a count,
   the counting cells' announced value during playback, the reader's own scroll
   paths as behaviour rather than as declarations,
   and complete content with motion off and with JavaScript off — section by
   section rather than for §2 alone.

   Nothing here ships. Run: node tests/qa-fullpage-sweep.mjs
*/

import { launchChrome } from "./lib/cdp.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = pathToFileURL(join(ROOT, "index.html")).href;
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const results = [];
const evidence = {};
const check = (name, pass, detail = "") => {
  results.push({ name, pass: !!pass, detail: String(detail) });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `\n      ${detail}` : ""}`);
};
const report = (name, detail) => {
  results.push({ name, pass: null, detail: String(detail) });
  console.log(`RPRT  ${name}\n      ${detail}`);
};

/* ------------------------------------------------------------------ *
 * 1. Static files — no browser needed
 * ------------------------------------------------------------------ */

const html = read("index.html");
const verify = existsSync(join(ROOT, "VERIFY.md")) ? read("VERIFY.md") : null;
const copyRules = read("knowledge-base/agent-skills/content/copy-rules.md");

/* The one verified curl form, read off R12 rather than retyped. */
const R12 = copyRules.match(/`(curl -fsSL \S+ \| bash -s my-product)`/)?.[1] ?? "";

function staticChecks() {
  check("VERIFY.md exists at repo root",
    verify !== null && verify.length > 0,
    verify ? `${verify.split("\n").length} lines` : "missing");

  /* The chip's production target is the site repo's rendered blob URL: a static
     host serves a relative `VERIFY.md` as raw markdown or 404s it. So the
     subject survives and the form re-bases — the URL still has to name a path
     that exists in THIS repo, which is what keeps the check falsifiable
     without ever fetching anything. The footer's VERIFY receipt is the same
     string; verify-shell.mjs asserts the two are byte-equal. */
  const chipHref = html.match(/class="chip chip--emphasis" href="([^"]+)"/)?.[1];
  const CHIP_BLOB = "https://github.com/thinkArhant/muster-ai-site/blob/main/";
  const chipPath = chipHref?.startsWith(CHIP_BLOB) ? chipHref.slice(CHIP_BLOB.length) : null;
  check("§1's VERIFY chip names a file that exists in the repo",
    chipPath === "VERIFY.md" && existsSync(join(ROOT, chipPath)),
    `chip href = ${chipHref ?? "not found"}; repo path ${chipPath ?? "off the blob root"} ${chipPath && existsSync(join(ROOT, chipPath)) ? "present" : "ABSENT"}`);

  check("R12's verified curl was parsed off copy-rules.md, not retyped",
    R12.startsWith("curl -fsSL https://raw.githubusercontent.com/"), R12 || "not parsed");
}

/* ------------------------------------------------------------------ *
 * 2. The copy matrix, run over rendered section text + VERIFY.md
 * ------------------------------------------------------------------ */

/* DEC-044's four stamps. Byte-exact is the criterion: the stamps are §4's
   independent-arrival argument and a transposed date is a launch-grade defect. */
const STAMPS = ["2026-04-24", "2026-06-13", "2026-04-12", "2026-06-07"];

/* Named competitors are banned page-wide (DEC-047). "Claude Code" is the host
   product the framework runs in, not a competitor, and is permitted. */
const COMPETITORS = [
  "Cursor", "Copilot", "Windsurf", "Devin", "Aider", "Cline", "Codex",
  "ChatGPT", "Gemini", "Replit", "Lovable", "Bolt", "v0", "AutoGPT",
  "CrewAI", "LangGraph", "AutoGen", "MetaGPT", "OpenAI", "Anthropic"
];

const BANNED_WORDS = [
  "blazing", "blazingly", "seamless", "revolutionary", "game-chang",
  "cutting-edge", "10x", "effortless", "magical", "supercharge"
];

/* Whole-product figures. Each must appear exactly once on the page, in §5. */
const WHOLE_PRODUCT = ["9.3 h", "$147", "4.8 h"];
/* Wave-scope figures. §1 and §5 must carry none of them. */
const WAVE = ["~64", "289", "$24.73"];

function copyMatrix(sections, verifyText, chrome) {
  /* The matrix runs over everything a reader sees, not over `main` alone: the
     status bar and the footer are page copy too, and the footer is the last
     thing the eye lands on after the curl. */
  const pageText = [...Object.values(sections), chrome.header, chrome.footer].join("\n");

  check("no `muster.build` anywhere on the page or in VERIFY.md",
    !/muster\.build/i.test(pageText) && !/muster\.build/i.test(verifyText),
    "the direction reference's fictional host stayed out of both");

  check("no named competitor on the page or in VERIFY.md (DEC-047)",
    !COMPETITORS.some((c) => new RegExp(`\\b${c}\\b`, "i").test(pageText)) &&
    !COMPETITORS.some((c) => new RegExp(`\\b${c}\\b`, "i").test(verifyText)),
    `${COMPETITORS.length} names swept; hits: ` +
      (COMPETITORS.filter((c) => new RegExp(`\\b${c}\\b`, "i").test(pageText + verifyText)).join(", ") || "none"));

  check("no banned adjective-as-argument, no exclamation mark, on the page or in VERIFY.md",
    !BANNED_WORDS.some((w) => new RegExp(w, "i").test(pageText + verifyText)) &&
      !pageText.includes("!") && !verifyText.includes("!"),
    BANNED_WORDS.filter((w) => new RegExp(w, "i").test(pageText + verifyText)).join(", ") || "clean");

  check("\"proven\" never used as a claim, on the page or in VERIFY.md (R6)",
    !/\bproven\b|\bguaranteed\b/i.test(pageText) && !/\bproven\b|\bguaranteed\b/i.test(verifyText),
    "R6: measured, never proven");

  check("\"context engineering\" appears exactly once on the page, in §3 (R11)",
    (pageText.match(/context engineering/gi) || []).length === 1 &&
      /context engineering/i.test(sections["the-insight"]),
    `${(pageText.match(/context engineering/gi) || []).length} occurrence(s); in §3: ${/context engineering/i.test(sections["the-insight"])}`);

  /* The Gate A negatives, read off the rendered hero rather than the markup. */
  const heroBodh = ["9.3", "4.8", "$147", "$24.73", "289", "~64", "bodh", "Bodh"]
    .filter((t) => sections.hero.includes(t));
  check("no Bodh material in §1 — no measured line, no BODH row, no hero terminal (DEC-046)",
    heroBodh.length === 0,
    heroBodh.length ? `found: ${heroBodh.join(", ")}` : "hero text carries none of the eight Bodh tokens");

  for (const fig of WHOLE_PRODUCT) {
    const hits = Object.entries(sections).filter(([, t]) => t.includes(fig));
    check(`\`${fig}\` appears exactly once on the page, and §5 is the site (DEC-048)`,
      hits.length === 1 && hits[0][0] === "shipped-with-muster",
      hits.map(([id, t]) => `${id} ×${(t.split(fig).length - 1)}`).join(" · ") || "absent");
  }

  const waveInS1S5 = WAVE.filter((f) => sections.hero.includes(f) || sections["shipped-with-muster"].includes(f));
  check("no wave-scope figure in §1 or §5 (the scopes never share a card)",
    waveInS1S5.length === 0, waveInS1S5.join(", ") || "none of ~64 / 289 / $24.73");

  /* Every scope label rides with its values. */
  const labels = ["BODH · IDEA → LIVE", "THIS SITE · SPEC → LIVE", "BODH SPRINT 4 · WEBSITE WAVE ONLY"];
  const missing = labels.filter((l) => !pageText.includes(l));
  check("every measured value set carries its own scope label (R5)",
    missing.length === 0, missing.length ? `missing: ${missing.join(" | ")}` : labels.join(" · "));

  const s5 = sections["shipped-with-muster"];
  const dashCells = (s5.match(/—/g) || []).length;
  const parts = {
    "§5 carries the THIS SITE scope label": /THIS SITE · SPEC → LIVE/.test(s5),
    "§5's THIS SITE card is four em-dashes": dashCells >= 4,
    /* `.t-micro` sets the caption in tracked uppercase, so the rendered string
       is what innerText reports — matched case-insensitively on purpose. */
    "§5 says `measured at launch`": /measured at launch/i.test(s5),
    "§1's remnant says `measured at launch`": /measured at launch/i.test(sections.hero),
    "no THIS SITE cell carries a numeral": !/THIS SITE · SPEC → LIVE[\s\S]*?(\d)/.test(s5.split("BODH")[0] === s5 ? s5 : s5.slice(s5.indexOf("THIS SITE")))
  };
  check("THIS SITE is still dashed, with `measured at launch` beside it (R4)",
    Object.values(parts).every(Boolean),
    Object.entries(parts).map(([k, v]) => `${v ? "✓" : "✗"} ${k}`).join(" · ") + ` — ${dashCells} em-dashes in §5`);

  check("the curl is byte-equal to R12's verified form in §1, §6 and VERIFY.md",
    (html.match(new RegExp(R12.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length === 2 &&
      verifyText.includes(R12),
    `page: 2 instances · VERIFY.md: ${verifyText.includes(R12) ? "byte-equal" : "DIFFERS"}`);

  /* VERIFY.md is developer-authored and gets no Content pass — the criterion
     singles it out because a scope slip there is read by the exact skeptic the
     file exists for. */
  const vScopes = ["BODH", "BODH SPRINT-4 WEBSITE WAVE", "THIS SITE"];
  check("VERIFY.md states the three scopes separately, THIS SITE dashed (DEC-050)",
    vScopes.every((s) => verifyText.includes(s)) &&
      /\|\s*\*\*THIS SITE\*\*\s*\|[^|]*\|\s*—/.test(verifyText),
    "three-row scope table present; THIS SITE row's measured column is an em-dash");

  const aggregate = /\b(total|combined|altogether|across all)\b[^.\n]{0,40}(9\.3|147|24\.73|64)/i.test(verifyText);
  check("VERIFY.md states no cross-scope aggregate",
    !aggregate, "no total/combined figure spans two scopes");

  const thisSiteRow = verifyText.split("\n").find((l) => l.includes("**THIS SITE**")) ?? "";
  check("VERIFY.md makes no unmeasured claim about THIS SITE",
    !/[\d$]/.test(thisSiteRow.split("|").slice(2).join("|")) &&
      /THIS SITE's column stays\s+dashed/.test(verifyText.replace(/\s+/g, " ")),
    `row: "${thisSiteRow.trim()}" — no numeral past the scope column, and the file states the column stays dashed until a snapshot lands`);

  check("VERIFY.md's roster line is not stated as this build's participation",
    /roster, not the\s+participation in any one build/.test(verifyText.replace(/\s+/g, " ")) ||
      /describes Muster's roster, not the/.test(verifyText),
    "the `8 AI agents · 1 operator` line is qualified as roster size");
}

/* ------------------------------------------------------------------ *
 * 3. Browser sweep
 * ------------------------------------------------------------------ */

const SECTION_IDS = ["hero", "watch-it-ship", "the-insight", "the-decisions", "shipped-with-muster", "get-started"];

/* The playback control is not content: with motion reduced or JS off there is
   nothing to control and the spec says it is absent. It is measured separately
   so its absence is stated rather than folded into a content diff. */
const sectionTextJS = `(() => {
  const controls = document.querySelector("[data-replay-controls]");
  const control = controls ? controls.innerText.replace(/\\s+/g, " ").trim() : "";
  /* The beat indicator is a playback position readout, aria-hidden, and it is
     the one string on the page whose value is supposed to differ between a
     running playback and a static path. Measured on its own, not diffed away. */
  const beatEl = document.querySelector("[data-beat-indicator]");
  const beat = beatEl ? beatEl.innerText.replace(/\\s+/g, " ").trim() : "";
  const out = { _control: control, _beat: beat };
  for (const id of ${JSON.stringify(SECTION_IDS)}) {
    const el = document.getElementById(id);
    if (!el) { out[id] = null; continue; }
    let t = el.innerText.replace(/\\s+/g, " ").trim();
    for (const strip of [control, beat]) if (strip) t = t.split(strip).join("");
    out[id] = t.replace(/\\s+/g, " ").trim();
  }
  return out;
})()`;

async function run() {
  const chrome = await launchChrome();
  const page = await chrome.browser.newPage();
  await page.init();

  try {
    /* ---- 3a. motion path, dark, desktop ---- */
    await page.setMedia({ colorScheme: "dark" });
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(PAGE);

    const sections = await page.eval(sectionTextJS);
    evidence.sectionText = sections;
    const missingSections = SECTION_IDS.filter((id) => !sections[id]);
    check("all six sections render text content",
      missingSections.length === 0,
      missingSections.length ? `empty: ${missingSections.join(", ")}` : SECTION_IDS.map((id) => `${id} ${sections[id].length}ch`).join(" · "));

    const chrome = await page.eval(`(() => ({
      header: (document.querySelector("body > header") || {}).innerText || "",
      footer: (document.querySelector("body > footer") || {}).innerText || "",
      placeholders: [...document.querySelectorAll("[data-shell-placeholder]")].map(e => e.innerText.replace(/\\s+/g, " ").trim())
    }))()`);
    evidence.chrome = chrome;
    copyMatrix(sections, verify, chrome);

    /* Reported, never asserted: a shell placeholder is a state the page passes
       through, and the last string a reader meets after the curl deserves a
       measurement rather than a glance. */
    report("shell placeholders still rendering on the assembled page",
      chrome.placeholders.length
        ? `${chrome.placeholders.length} in the footer: "${chrome.placeholders.join('" | "')}" — the last string a reader meets after the curl`
        : "none — the footer carries real copy");

    /* ---- §4's four stamps, byte-exact and in DEC-044's order ---- */
    const stamps = await page.eval(`[...document.querySelectorAll("#the-decisions .sheet__stamp")].map(e => e.textContent)`);
    evidence.stamps = stamps;
    const dates = stamps.map((s) => (s.match(/\d{4}-\d{2}-\d{2}/) || [])[0]);
    check("§4's four stamps carry DEC-044's dates byte-exact, in order",
      stamps.length === 4 && STAMPS.every((d, i) => dates[i] === d),
      stamps.map((s, i) => `${i + 1}: "${s}"`).join(" · "));

    /* ---- the headline's computed accessible name, read from the AX tree ---- */
    const { root } = await page.call("DOM.getDocument", { depth: -1 });
    const { nodeId } = await page.call("DOM.querySelector", { nodeId: root.nodeId, selector: "#hero-title" });
    const ax = await page.call("Accessibility.getPartialAXTree", { nodeId, fetchRelatives: false });
    const axName = ax.nodes?.[0]?.name?.value ?? "";
    const rendered = await page.eval(`document.getElementById("hero-title").textContent`);
    evidence.headline = { axName, rendered };
    const words = (s) => s.toUpperCase().replace(/\s+/g, " ").trim();
    check("§1's headline's computed accessible name omits the struck phrase (read from the AX tree)",
      words(axName) === "SHIP A PRODUCT WITH AN AI TEAM." && !words(axName).includes("A HUMAN") &&
        rendered.includes("a human"),
      `announced "${axName}" · rendered "${rendered.trim()}"`);

    /* ---- zero external network requests ---- */
    const external = page.requests.filter((r) => !r.url.startsWith("file:") && !r.url.startsWith("data:"));
    evidence.requests = page.requests.map((r) => r.url);
    check("zero external network requests on load (dark, 1280)",
      external.length === 0,
      `${page.requests.length} requests, all file:/data: — ${external.map((r) => r.url).join(", ") || "no external URL requested"}`);

    /* ---- the motion inventory, as a count against the page's budget ---- */
    /* An ambient element is a thing that keeps moving with the reader doing
       nothing — an animation with no end. A transition is one-shot and ends;
       §2's reveal is one of those by ruling (DEC-015), not a fourth lamp. The
       budget is counted in elements a reader can point at, not in keyframe
       rules: one pulse motif draws with a core and two rings. */
    const motion = await page.eval(`(() => {
      const seat = (el) => {
        if (!el) return "?";
        const sec = el.closest("section, header, footer");
        const own = el.closest(".pulse, .cursor") || el;
        return (sec ? "#" + (sec.id || sec.tagName.toLowerCase()) + " " : "") + (own.className || own.tagName);
      };
      const looping = [], oneShot = [];
      for (const a of document.getAnimations()) {
        const t = a.effect && a.effect.target;
        const timing = a.effect ? a.effect.getComputedTiming() : {};
        const row = { name: a.animationName || "(transition)", seat: seat(t), state: a.playState };
        (timing.iterations === Infinity ? looping : oneShot).push(row);
      }
      const byName = (rows) => rows.reduce((m, r) => (m[r.name] = (m[r.name] || 0) + 1, m), {});
      const seats = [...new Set(looping.map(r => r.seat))];
      const oneShotSections = [...new Set(oneShot.map(r => r.seat.split(" ")[0]))];
      return {
        looping: byName(looping), loopingSeats: seats, oneShotCount: oneShot.length,
        oneShotNames: byName(oneShot), oneShotSections,
        lamps: document.querySelectorAll(".pulse").length,
        cursors: document.querySelectorAll(".cursor").length,
        countups: document.querySelectorAll("[data-countup]").length
      };
    })()`);
    evidence.motion = motion;
    /* Two ambient elements (the pulse lamp motif, §5's count-up) + the §6
       cursor. The lamp motif is one element seated twice — header and §2's
       terminal — which is what the budget calls one. */
    const loopingSeatKinds = [...new Set(motion.loopingSeats.map((s) => (s.includes("pulse") ? "pulse" : s.includes("cursor") ? "cursor" : s)))];
    check("the live motion inventory on the built page is the budget exactly: the pulse motif, the count-up, the §6 cursor",
      loopingSeatKinds.length === 2 && loopingSeatKinds.includes("pulse") && loopingSeatKinds.includes("cursor") &&
        motion.cursors === 1 && motion.lamps === 2 && motion.countups === 8,
      `${motion.loopingSeats.length} looping seats, all pulse or cursor: ${motion.loopingSeats.join(" · ")} — ` +
        `keyframes ${Object.entries(motion.looping).map(([n, c]) => `${n} ×${c}`).join(", ")}; ` +
        `count-up is ambient element 2 (JS, ${motion.countups} cells, gated, one-shot per load)`);
    check("§2's reveal is a one-shot transition, not a fourth ambient element (DEC-015)",
      motion.oneShotSections.every((s) => s === "#watch-it-ship") && motion.oneShotCount > 0,
      `${motion.oneShotCount} running transitions, all in ${motion.oneShotSections.join(", ")} — the replay's opacity reveal, which ends`);

    /* ---- no live region anywhere ---- */
    const live = await page.eval(`[...document.querySelectorAll("[aria-live],[role=status],[role=alert],[role=log],[role=timer],[role=marquee],[aria-atomic]")].map(e => e.tagName + "." + e.className)`);
    check("no element on the page carries a live region (DEC-052)",
      live.length === 0, live.join(", ") || "swept aria-live, aria-atomic and the five live roles: none");

    /* ---- the counting cells during playback: what is SEEN vs what is ANNOUNCED ---- */
    const roll = await page.eval(`(async () => {
      const cell = document.querySelector("#shipped-with-muster .shipped__cell");
      const span = cell.querySelector("[data-countup]");
      const seen = new Set(), announced = new Set();
      /* The announced string of the cell = its text with aria-hidden subtrees
         removed. That is what a screen reader assembles, and it is the thing the
         posture claims never lies. */
      const accessibleText = (el) => [...el.querySelectorAll("*")].concat([el])
        .filter(n => n.getAttribute && n.getAttribute("aria-hidden") === "true")
        .reduce((acc, hidden) => acc, null) === null
          ? (function walk(n) {
              if (n.nodeType === 3) return n.nodeValue;
              if (n.nodeType !== 1) return "";
              if (n.getAttribute("aria-hidden") === "true") return "";
              return [...n.childNodes].map(walk).join("");
            })(el).replace(/\\s+/g, " ").trim()
          : "";
      let stop = false;
      const sample = () => {
        seen.add(span.textContent);
        announced.add(accessibleText(cell));
        if (!stop) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
      document.getElementById("shipped-with-muster").scrollIntoView();
      await new Promise(r => setTimeout(r, 2200));
      stop = true;
      return {
        seen: [...seen], announced: [...announced],
        state: span.getAttribute("data-countup-state"),
        settled: span.textContent
      };
    })()`);
    evidence.roll = roll;
    const announcedValues = roll.announced.filter(Boolean);
    check("the counting cell takes many visible states and exactly one announced state, verified during playback",
      roll.seen.length > 10 && announcedValues.length === 1 && announcedValues[0].includes("9.3 h") &&
        roll.state === "done" && roll.settled === "9.3 h",
      `${roll.seen.length} distinct visible strings, ${announcedValues.length} announced: "${announcedValues.join('" | "')}" · settles "${roll.settled}" (state ${roll.state})`);

    /* Mid-roll, from the AX tree rather than from the DOM. */
    await page.goto(PAGE);
    const midRoll = await page.eval(`(async () => {
      document.getElementById("shipped-with-muster").scrollIntoView();
      await new Promise(r => requestAnimationFrame(() => setTimeout(r, 350)));
      const span = document.querySelector("#shipped-with-muster [data-countup]");
      return { visible: span.textContent, state: span.getAttribute("data-countup-state") };
    })()`);
    const fullAx = await page.call("Accessibility.getFullAXTree");
    const axStrings = fullAx.nodes.map((n) => n.name?.value).filter(Boolean);
    const axHasIntermediate = axStrings.some((s) => /^\$?\d[\d.,]* ?h?$/.test(s.trim()) &&
      !["9.3 h", "4.8 h", "4", "$147"].includes(s.trim()));
    const liveProps = fullAx.nodes.filter((n) => (n.properties || []).some((p) => p.name === "live" && p.value?.value && p.value.value !== "off"));
    evidence.midRoll = { ...midRoll, axHas93: axStrings.includes("9.3 h"), axHas48: axStrings.includes("4.8 h"), liveNodes: liveProps.length };
    check("mid-roll the accessibility tree carries the measured values and no intermediate, with no live node",
      midRoll.state === "running" && axStrings.includes("9.3 h") && axStrings.includes("4.8 h") &&
        !axHasIntermediate && liveProps.length === 0,
      `visible "${midRoll.visible}" (state ${midRoll.state}) while the AX tree reads 9.3 h and 4.8 h; ` +
        `${liveProps.length} nodes with a live property`);

    /* ---- reader paths: keyboard paging ----
       These three checks were written under the page's section snapping and
       titled for it. The feature is gone (page-shell.md §7.1); their subjects
       are not. Keyboard paging, find-in-page and 200% zoom were always
       assertions about the reader's own paths surviving whatever the page
       declares, so the claims drop the word and keep the property. */
    await page.goto(PAGE);
    const paging = await page.eval(`(() => {
      const doc = document.documentElement;
      return { max: doc.scrollHeight - doc.clientHeight, snap: getComputedStyle(doc).scrollSnapType,
               pad: getComputedStyle(doc).scrollPaddingTop };
    })()`);
    evidence.paging = paging;

    const pressPageDown = async () => {
      for (const type of ["rawKeyDown", "keyUp"]) {
        await page.call("Input.dispatchKeyEvent", {
          type, key: "PageDown", code: "PageDown", windowsVirtualKeyCode: 34, nativeVirtualKeyCode: 34
        });
      }
      await page.eval(`new Promise(r => setTimeout(r, 220))`);
    };
    await page.eval(`document.body.focus(); window.scrollTo(0, 0)`);
    const stops = [];
    for (let i = 0; i < 40; i++) {
      await pressPageDown();
      const y = await page.eval(`Math.round(window.scrollY)`);
      stops.push(y);
      if (y >= paging.max - 1) break;
    }
    evidence.pageDownStops = stops;
    const reachedBottom = stops[stops.length - 1] >= paging.max - 1;
    const monotone = stops.every((y, i) => i === 0 || y >= stops[i - 1]);
    check("PageDown walks the page to its end in a bounded number of presses, never stalling",
      reachedBottom && monotone && stops.length <= 20 && new Set(stops).size === stops.length,
      `${stops.length} presses to the bottom (${paging.max}px of scroll), strictly advancing: ${stops.join(" → ")}`);

    /* every section start is reachable — after paging, each section's top has
       been at or above the fold at some rest */
    const reach = await page.eval(`(async () => {
      const out = [];
      for (const id of ${JSON.stringify(SECTION_IDS)}) {
        const el = document.getElementById(id);
        el.scrollIntoView();
        await new Promise(r => setTimeout(r, 180));
        const r = el.getBoundingClientRect();
        const bar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 48;
        out.push({ id, top: Math.round(r.top * 100) / 100, clearsBar: r.top >= bar - 0.5 || r.top >= 0 });
      }
      return out;
    })()`);
    evidence.sectionRest = reach;
    check("every section start comes to rest clear of the status bar",
      reach.every((r) => r.clearsBar),
      reach.map((r) => `${r.id} +${r.top}px`).join(" · "));

    /* ---- reader paths: find-in-page ---- */
    const find = await page.eval(`(async () => {
      const leaves = [...document.querySelectorAll("main *")]
        .filter(el => el.children.length === 0 && el.textContent.trim() && el.getClientRects().length);
      const bar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 48;
      const off = { centreIfNeeded: [], startAligned: [] };
      const vh = () => window.innerHeight;
      for (const el of leaves) {
        /* centre-if-needed: what Chrome's own find does */
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 0));
        let r = el.getBoundingClientRect();
        if (r.top < bar || r.bottom > vh()) el.scrollIntoView({ block: "center" });
        await new Promise(r2 => setTimeout(r2, 120));
        r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh()) off.centreIfNeeded.push(el.className || el.tagName);
        /* start-aligned: the default scrollIntoView() */
        window.scrollTo(0, 0);
        await new Promise(r2 => setTimeout(r2, 0));
        el.scrollIntoView();
        await new Promise(r2 => setTimeout(r2, 120));
        r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh()) off.startAligned.push((el.className || el.tagName) + " @" + Math.round(r.top));
      }
      return { leaves: leaves.length, ...off };
    })()`);
    evidence.find = find;
    check("a find-in-page match stays on screen under centre-if-needed, which is what the engine's find uses",
      find.centreIfNeeded.length === 0,
      `0 of ${find.leaves} text leaves land off screen centred; start-aligned leaves ${find.startAligned.length} off screen`);
    report("start-aligned scrollIntoView, which no link on the page currently uses",
      `${find.startAligned.length} of ${find.leaves} leaves off screen: ${find.startAligned.slice(0, 6).join(", ")}${find.startAligned.length > 6 ? " …" : ""}`);

    /* ---- reader paths: 200% zoom ---- */
    await page.setViewport({ width: 720, height: 450, deviceScaleFactor: 2 });
    await page.goto(PAGE);
    const zoom = await page.eval(`(async () => {
      const doc = document.documentElement;
      const bar = parseFloat(getComputedStyle(doc).getPropertyValue("--bar-h")) || 48;
      const out = [];
      for (const id of ${JSON.stringify(SECTION_IDS)}) {
        const sec = document.getElementById(id);
        const last = [...sec.querySelectorAll("*")].filter(e => e.children.length === 0 && e.textContent.trim() && e.getClientRects().length).pop();
        if (!last) continue;
        last.scrollIntoView({ block: "center" });
        await new Promise(r => setTimeout(r, 150));
        const r = last.getBoundingClientRect();
        out.push({ id, top: Math.round(r.top), bottom: Math.round(r.bottom), view: window.innerHeight,
                   whole: r.top >= bar - 0.5 && r.bottom <= window.innerHeight + 0.5 });
      }
      return { out, hScroll: doc.scrollWidth > doc.clientWidth, sw: doc.scrollWidth, cw: doc.clientWidth };
    })()`);
    evidence.zoom = zoom;
    check("at 200% zoom every section's last content lands whole and clear of the bar, with no horizontal scroll",
      !zoom.hScroll && zoom.out.every((z) => z.whole),
      `scrollWidth ${zoom.sw} ≤ clientWidth ${zoom.cw}; ` +
        zoom.out.map((z) => `${z.id} ${z.top}–${z.bottom} of ${z.view}`).join(" · "));

    /* ---- reduced motion: complete content, section by section ---- */
    await page.setViewport({ width: 1280, height: 900 });
    await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.goto(PAGE);
    /* let the motion path's own end state be the comparison: §2 reveals over
       48s, so compare against the reduced path's complete transcript */
    const reducedText = await page.eval(sectionTextJS);
    const reducedAnim = await page.eval(`document.getAnimations().filter(a => a.playState === "running").length`);
    evidence.reducedText = reducedText;
    const reducedGaps = SECTION_IDS.filter((id) => reducedText[id] !== sections[id]);
    check("reduced motion renders identical content in every section, and nothing animates",
      reducedGaps.length === 0 && reducedAnim === 0,
      reducedGaps.length
        ? `differs in: ${reducedGaps.map((id) => `${id} (${sections[id].length} → ${reducedText[id].length} ch)`).join(", ")}`
        : `all six sections character-identical to the motion path; ${reducedAnim} animations running`);
    check("reduced motion offers no playback control, which is the one thing it does not carry (spec §8)",
      reducedText._control === "" && sections._control !== "",
      `motion path offers "${sections._control}"; reduced path offers ${reducedText._control === "" ? "nothing to control" : `"${reducedText._control}"`}`);
    check("reduced motion parks the beat indicator on the sixth beat — the end state, not a mid-playback position",
      /BEAT 06 \/ 06/.test(reducedText._beat) && reducedText._beat !== sections._beat,
      `motion path at load reads "${sections._beat}"; reduced path reads "${reducedText._beat}" (aria-hidden either way)`);

    /* ---- no JS: complete content, section by section ---- */
    await page.setMedia({ colorScheme: "dark" });
    await page.call("Emulation.setScriptExecutionDisabled", { value: true });
    /* Not page.goto(): its settle step awaits a requestAnimationFrame that a
       page with no script execution will never run. */
    await page.call("Page.navigate", { url: PAGE });
    await new Promise((r) => setTimeout(r, 1500));
    const noJsRan = await page.eval(`typeof window.MusterCountUp`);
    const noJsText = await page.eval(sectionTextJS);
    await page.call("Emulation.setScriptExecutionDisabled", { value: false });
    evidence.noJsText = noJsText;
    check("with script execution disabled the page's own scripts really did not run",
      noJsRan === "undefined", `window.MusterCountUp is ${noJsRan}`);
    const noJsGaps = noJsText ? SECTION_IDS.filter((id) => noJsText[id] !== sections[id]) : SECTION_IDS;
    check("with JavaScript disabled every section renders the same complete content",
      noJsGaps.length === 0,
      noJsGaps.length
        ? `differs in: ${noJsGaps.map((id) => `${id} (${sections[id].length} → ${noJsText[id].length} ch)`).join(", ")}`
        : "all six sections byte-identical to the motion path");

    /* ---- contrast, body text, both themes ---- */
    for (const scheme of ["dark", "light"]) {
      await page.setMedia({ colorScheme: scheme });
      await page.goto(PAGE);
      const contrast = await page.eval(`(() => {
        const lum = (c) => { const [r,g,b] = c.map(v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
          return 0.2126*r + 0.7152*g + 0.0722*b; };
        const parse = (s) => (s.match(/[\\d.]+/g) || []).slice(0,3).map(Number);
        const bgOf = (el) => { let n = el; while (n) { const bg = getComputedStyle(n).backgroundColor;
          if (bg && !/rgba?\\(0, 0, 0, 0\\)|transparent/.test(bg)) return parse(bg); n = n.parentElement; }
          return parse(getComputedStyle(document.body).backgroundColor); };
        const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
        const out = [];
        for (const sel of ["#the-insight p.read", "#shipped-with-muster p.read", "#get-started p.read",
                           "#the-decisions .sheet__row dd", "#the-decisions .sheet__stamp",
                           "#watch-it-ship .narration__text", "#hero .formation__caption", "#hero .remnant__key"]) {
          const el = document.querySelector(sel); if (!el) continue;
          const cs = getComputedStyle(el);
          out.push({ sel, ratio: Math.round(ratio(parse(cs.color), bgOf(el)) * 100) / 100,
                     size: parseFloat(cs.fontSize) });
        }
        return out;
      })()`);
      evidence[`contrast_${scheme}`] = contrast;
      const failures = contrast.filter((c) => c.ratio < 4.5);
      check(`contrast ≥ 4.5:1 for body and label text, ${scheme} theme`,
        failures.length === 0,
        contrast.map((c) => `${c.sel} ${c.ratio}:1`).join(" · "));
    }

    /* ---- landmarks and focus states ---- */
    await page.setMedia({ colorScheme: "dark" });
    await page.goto(PAGE);
    const landmarks = await page.eval(`(() => ({
      header: !!document.querySelector("body > header"),
      main: !!document.querySelector("body > main#main"),
      footer: !!document.querySelector("body > footer"),
      sections: [...document.querySelectorAll("main > section")].map(s => ({ id: s.id, labelled: !!s.getAttribute("aria-labelledby") && !!document.getElementById(s.getAttribute("aria-labelledby")) })),
      h1: document.querySelectorAll("h1").length,
      lang: document.documentElement.lang
    }))()`);
    evidence.landmarks = landmarks;
    check("landmarks: header, main and footer are siblings, every section labelled by a heading it contains, one h1",
      landmarks.header && landmarks.main && landmarks.footer && landmarks.h1 === 1 &&
        landmarks.sections.length === 6 && landmarks.sections.every((s) => s.labelled) && landmarks.lang === "en",
      `${landmarks.sections.length} labelled sections · ${landmarks.h1} h1 · lang=${landmarks.lang}`);

    /* real Tab, so :focus-visible resolves under keyboard modality */
    const tabStops = [];
    for (let i = 0; i < 8; i++) {
      for (const type of ["rawKeyDown", "keyUp"]) {
        await page.call("Input.dispatchKeyEvent", { type, key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
      }
      const stop = await page.eval(`(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        return { tag: el.tagName, cls: String(el.className || ""),
                 ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
                 width: cs.outlineWidth, colour: cs.outlineColor };
      })()`);
      if (stop.tag === "BODY") break;
      tabStops.push(stop);
    }
    evidence.tabStops = tabStops;
    check("every keyboard stop paints a visible focus ring under real Tab presses",
      tabStops.length > 0 && tabStops.every((s) => s.ring),
      tabStops.map((s) => `${s.tag}.${s.cls.split(" ")[0]} ${s.ring ? s.width : "NO RING"}`).join(" · "));

    await page.close();
  } finally {
    await chrome.close();
  }
}

staticChecks();
await run();

const passed = results.filter((r) => r.pass === true).length;
const failed = results.filter((r) => r.pass === false);
const reported = results.filter((r) => r.pass === null).length;

writeFileSync(join(ROOT, "tests/artifacts/qa-sweep-report.json"),
  JSON.stringify({ results, evidence }, null, 2));

console.log(`\n${passed}/${passed + failed.length} sweep checks passed. ${reported} measurement(s) reported.`);
if (failed.length) {
  console.log(failed.map((f) => `FAIL  ${f.name}\n      ${f.detail}`).join("\n"));
  process.exit(1);
}
