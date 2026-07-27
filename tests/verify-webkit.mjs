/* WebKit half of the cross-engine gate.

   Inline-SVG/WebKit divergence is this project's known failure class, so
   "renders in Chrome" is not a pass. QuickLook renders HTML with WebKit; this
   script drives it over both themes and measures the same thing the Blink
   harness measures — the pixel spread of a patch of bare page ground, which is
   non-zero only if the generated grain actually rasterised.

   Usage:  node tests/verify-webkit.mjs [--json]  */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { decodePng, findGroundPatch, hexLuminance } from "./lib/png.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ARTIFACTS = join(ROOT, "tests", "artifacts");
const RENDER_WIDTH = 1400;

/* The seed's locked ground values. Kept here rather than parsed out of CSS on
   purpose: the render is checked against the spec, not against itself. */
const GROUND = { dark: "#13140D", light: "#DBD8C6" };
const ACCENT = { dark: "#C05A32", light: "#A0451F" };
const INK = { dark: "#E6E3D3", light: "#191B10" };

const results = [];
const evidence = {};
const temps = [];

function check(name, passed, detail) {
  results.push({ name, passed: Boolean(passed), detail });
}

function renderWithQuickLook(sourcePath, label) {
  const outDir = join(ARTIFACTS, "webkit-" + label);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  execFileSync("qlmanage", ["-t", "-s", String(RENDER_WIDTH), "-o", outDir, sourcePath], {
    stdio: "pipe"
  });
  const name = sourcePath.split("/").pop() + ".png";
  const rendered = join(outDir, name);
  if (!existsSync(rendered)) throw new Error(`QuickLook produced no render for ${sourcePath}`);
  const buffer = readFileSync(rendered);
  writeFileSync(join(ARTIFACTS, `webkit-${label}.png`), buffer);
  rmSync(outDir, { recursive: true, force: true });
  return buffer;
}

/* A copy of the page with the theme forced, so the render does not depend on
   the machine's appearance setting. Same directory, so relative assets resolve.

   `hide` exists because of a measured ceiling, not a preference: QuickLook
   renders at a fixed ~1024 square and ignores the requested size, so a section
   that sits below the hero never enters the frame. Hiding a section brings the
   one under test into view. Nothing else is altered — same markup, same CSS,
   same no-JavaScript path, which is exactly the path this engine is here to
   verify (playback is an opacity reveal over a complete DOM, so what QuickLook
   renders IS the complete transcript). */
function themedCopy(theme, { hide = [], label = theme } = {}) {
  let html = readFileSync(join(ROOT, "index.html"), "utf8").replace(
    '<html lang="en">',
    `<html lang="en" data-theme="${theme}">`
  );
  if (hide.length) {
    html = html.replace(
      "</head>",
      `<style>${hide.map((id) => id + "{display:none}").join("")}</style></head>`
    );
  }
  const path = join(ROOT, `.webkit-${label}.html`);
  writeFileSync(path, html);
  temps.push(path);
  return path;
}

/* Share of pixels that are not bare ground — how much ink a render actually
   put on the page. Differential, so it needs no layout assumption. */
function inkShare(image, groundLum) {
  let inked = 0;
  let total = 0;
  for (let y = 0; y < image.height; y += 2) {
    for (let x = 0; x < image.width; x += 2) {
      const i = y * image.stride + x * image.channels;
      const lum =
        image.channels >= 3
          ? 0.2126 * image.pixels[i] + 0.7152 * image.pixels[i + 1] + 0.0722 * image.pixels[i + 2]
          : image.pixels[i];
      if (Math.abs(lum - groundLum) > 8) inked++;
      total++;
    }
  }
  return Math.round((inked / total) * 10000) / 100;
}

/* --- the header lockup, in the engine that can actually get it wrong ---

   `brand-seats.md` §11 names one construction here with real WebKit divergence
   risk: `align-self: baseline` on an EMPTY flex item. There is no text in the
   pennant for an engine to synthesise a baseline from, so where its bottom edge
   lands is an engine decision, and the Blink harness measures it with a DOM
   probe this engine cannot run — QuickLook executes no JavaScript. So it is
   measured off the pixels instead, which is the stronger evidence anyway: the
   claim is about where the mark visibly sits.

   The relationship, not the coordinate: the pennant's bottom edge and the
   wordmark's baseline are the same line. `MUSTER` is all-caps mono with no
   descender, so the wordmark's lowest inked row IS its baseline row, and the two
   figures are directly comparable without a font metric. Tolerance is one raster
   row — antialiasing puts a partial row at each edge, and asking a rasteriser
   for sub-pixel agreement would fail a correct build. A build that dropped the
   baseline alignment centres the mark instead, which moves it by about 3px
   against a 16.8px line box, so a 1px tolerance still catches it. */
const channel = (image, x, y, k) => image.pixels[y * image.stride + x * image.channels + k];
const rgbAt = (image, x, y) => [channel(image, x, y, 0), channel(image, x, y, 1), channel(image, x, y, 2)];
const hexRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const isNear = (c, t, tol) => c.every((v, i) => Math.abs(v - t[i]) <= tol);

function lockupBaseline(image, theme) {
  const accent = hexRgb(ACCENT[theme]);
  const band = Math.min(image.height, Math.round(image.height * 0.1));

  /* The pennant is the leftmost accent cluster in the status bar. Found by
     connectivity and filtered on shape rather than looked up at a coordinate, so
     the check survives the bar's contents moving. */
  const hits = new Set();
  for (let y = 0; y < band; y++) {
    for (let x = 0; x < image.width; x++) {
      if (isNear(rgbAt(image, x, y), accent, 12)) hits.add(x + "," + y);
    }
  }
  const seen = new Set();
  const clusters = [];
  for (const key of hits) {
    if (seen.has(key)) continue;
    const stack = [key];
    const cell = [];
    while (stack.length) {
      const k = stack.pop();
      if (seen.has(k) || !hits.has(k)) continue;
      seen.add(k);
      const [cx, cy] = k.split(",").map(Number);
      cell.push([cx, cy]);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) stack.push(cx + dx + "," + (cy + dy));
    }
    const xs = cell.map((c) => c[0]);
    const ys = cell.map((c) => c[1]);
    const box = { l: Math.min(...xs), r: Math.max(...xs), t: Math.min(...ys), b: Math.max(...ys) };
    box.w = box.r - box.l + 1;
    box.h = box.b - box.t + 1;
    /* 6 × 9 authored, plus up to a row of antialiasing on each edge. */
    if (box.w >= 5 && box.w <= 9 && box.h >= 8 && box.h <= 12) clusters.push(box);
  }
  if (!clusters.length) return null;
  const mark = clusters.sort((a, b) => a.l - b.l)[0];

  /* The wordmark: letters matched on the INK token, not on "anything that is not
     ground". The looser reading catches the underscore's antialiasing — which is
     accent bleeding toward ground, so it is neither — and that sits BELOW the
     baseline by construction, which would drag the measurement down by the exact
     amount the check is trying to detect. Every letter of MUSTER is ink; nothing
     else in these rows is. */
  const ink = hexRgb(INK[theme]);
  let inkTop = Infinity;
  let inkBottom = -1;
  for (let y = Math.max(0, mark.t - 6); y < Math.min(image.height, mark.b + 6); y++) {
    for (let x = mark.r + 2; x < Math.min(image.width, mark.r + 200); x++) {
      if (!isNear(rgbAt(image, x, y), ink, 28)) continue;
      if (y < inkTop) inkTop = y;
      if (y > inkBottom) inkBottom = y;
    }
  }
  if (inkBottom < 0) return null;
  return { mark, inkTop, inkBottom, drop: mark.b - inkBottom };
}

try {
  mkdirSync(ARTIFACTS, { recursive: true });

  for (const theme of ["dark", "light"]) {
    const source = themedCopy(theme);
    const png = renderWithQuickLook(source, theme);
    const image = decodePng(png);
    const target = hexLuminance(GROUND[theme]);
    const patch = findGroundPatch(image, target);

    evidence[theme] = { render: `${image.width}x${image.height}`, targetLuminance: target, patch };

    check(
      `WebKit renders the page (${theme})`,
      image.width > 0 && image.height > 0,
      `${image.width}x${image.height}px`
    );
    check(
      `WebKit ground matches the locked value (${theme})`,
      patch !== null,
      patch
        ? `patch at ${patch.x},${patch.y} mean ${patch.mean} vs expected ${target}`
        : `no patch within tolerance of ${target} — ground colour or layout is off`
    );
    check(
      `grain renders in WebKit (${theme})`,
      patch !== null && patch.stdDev > 0.2,
      patch ? `stdDev ${patch.stdDev}, range ${patch.min}-${patch.max}` : "no ground patch found"
    );

    const lockup = lockupBaseline(image, theme);
    evidence[theme + "Lockup"] = lockup;
    check(
      `WebKit sets the header pennant on the wordmark's baseline (${theme})`,
      lockup !== null && Math.abs(lockup.drop) <= 1,
      lockup
        ? `pennant ${lockup.mark.w}×${lockup.mark.h}px, its lowest row ${lockup.mark.b} against the wordmark's ` +
          `baseline row ${lockup.inkBottom} — ${lockup.drop}px apart (one raster row of antialiasing allowed)`
        : "no 6×9 accent pennant found in the status bar"
    );
  }

  /* --- §2, in the engine whose inline-SVG divergence is this project's known
         failure class. What QuickLook can prove here is the no-JS transcript:
         it runs no JavaScript, so the DOM it renders is the complete annotated
         transcript, and that is load-bearing rather than a fallback prize.
         Playback timing, the visibility gate and every mobile measurement are
         Blink evidence and are labelled as such in the handoff. --- */
  for (const theme of ["dark", "light"]) {
    const target = hexLuminance(GROUND[theme]);
    const withS2 = decodePng(renderWithQuickLook(themedCopy(theme, { hide: ["#hero"], label: theme + "-s02" }), theme + "-s02"));
    const withoutS2 = decodePng(
      renderWithQuickLook(
        themedCopy(theme, { hide: ["#hero", "#watch-it-ship"], label: theme + "-control" }),
        theme + "-control"
      )
    );
    const inked = inkShare(withS2, target);
    const control = inkShare(withoutS2, target);
    const patch = findGroundPatch(withS2, target);

    evidence[theme + "S02"] = {
      render: `${withS2.width}x${withS2.height}`,
      inkShare: inked,
      controlInkShare: control,
      patch
    };

    check(
      `WebKit renders §2 (${theme})`,
      withS2.width > 0 && withS2.height > 0 && inked > control,
      `${withS2.width}x${withS2.height}px · ink ${inked}% with §2 vs ${control}% without`
    );
    check(
      `§2 puts real content on the page in WebKit (${theme})`,
      inked - control > 1,
      `+${Math.round((inked - control) * 100) / 100} percentage points of inked pixels`
    );
    check(
      `grain and ground survive under §2 in WebKit (${theme})`,
      patch !== null && patch.stdDev > 0.2,
      patch ? `patch at ${patch.x},${patch.y} mean ${patch.mean} stdDev ${patch.stdDev}` : "no ground patch found"
    );
  }

  /* Side-by-side with Blink, when that report is present. */
  const blinkReport = join(ARTIFACTS, "blink-report.json");
  if (existsSync(blinkReport)) {
    const blink = JSON.parse(readFileSync(blinkReport, "utf8"));
    const blinkPatch = blink.evidence?.blinkGrainPatch;
    if (blinkPatch) {
      evidence.parity = { blink: blinkPatch, webkit: evidence.dark.patch };
      const wk = evidence.dark.patch;
      check(
        "cross-engine parity: both engines paint grain on the same ground",
        Boolean(wk) &&
          Math.abs(wk.mean - blinkPatch.mean) <= 2.5 &&
          wk.stdDev > 0.2 &&
          blinkPatch.stdDev > 0.2,
        `Blink mean ${blinkPatch.mean} / stdDev ${blinkPatch.stdDev} · WebKit mean ${wk?.mean} / stdDev ${wk?.stdDev}`
      );
    }
  } else {
    check(
      "cross-engine parity",
      false,
      "run node tests/verify-shell.mjs first — no Blink report to compare against"
    );
  }
} finally {
  temps.forEach((path) => rmSync(path, { force: true }));
}

const failed = results.filter((r) => !r.passed);
const width = Math.max(...results.map((r) => r.name.length));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ results, evidence }, null, 2));
} else {
  for (const r of results) {
    console.log(`${r.passed ? "PASS" : "FAIL"}  ${r.name.padEnd(width)}  ${r.detail ?? ""}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  console.log("Renders: tests/artifacts/webkit-{dark,light}.png, webkit-{dark,light}-s02.png");
}

writeFileSync(join(ARTIFACTS, "webkit-report.json"), JSON.stringify({ results, evidence }, null, 2));
process.exit(failed.length ? 1 : 0);
