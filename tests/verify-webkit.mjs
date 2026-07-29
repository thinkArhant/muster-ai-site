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
const SURFACE = { dark: "#1B1D13", light: "#E7E4D4" };

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

  /* --- §3 and §4 in WebKit. Two claims are worth the render here rather than
         an ink count alone.

         §3's is content: the kicker and a 90-word paragraph must actually set,
         in an engine that computes `ch` and `inline-block` wrapping its own way.

         §4's is geometry, and it is the one construction in the section with
         real cross-engine risk: the mechanism mark is an absolutely positioned
         pseudo-element seated by `inset-inline-start: calc(--gap-hairline -
         --sheet-pad)` — logical properties, a negative calc, and a background
         paint. Blink measures it with a DOM probe QuickLook cannot run, so it
         is measured off the pixels instead: rust clusters that are ~2px wide
         and many times taller than wide are marks, and their distance from the
         card's inked left edge is the 12px seat. That is the stronger evidence
         anyway — the claim is about where the mark visibly sits. --- */
  const markSeats = (image, theme) => {
    const accent = hexRgb(ACCENT[theme]);
    const hits = new Set();
    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        if (isNear(rgbAt(image, x, y), accent, 14)) hits.add(x + "," + y);
      }
    }
    const seen = new Set();
    const bars = [];
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
      /* A 2px bar plus up to a column of antialiasing each side, and taller
         than it is wide by an order of magnitude — no glyph or tick in this
         palette has that shape. */
      if (box.w <= 4 && box.h >= 8 * box.w) bars.push(box);
    }
    return bars.sort((a, b) => a.t - b.t);
  };

  /* One section on screen at a time, against a control with that section also
     hidden. Hiding a section pulls the next one up into the frame, so a
     "with / without" pair that leaves the rest of the page standing measures
     the section that moved, not the section under test — the control has to be
     the same page minus one section, with nothing else free to take its place. */
  const PAGE = ["#hero", "#watch-it-ship", "#the-insight", "#the-decisions", "#shipped-with-muster", "#get-started", ".pagefoot"];
  const pageWithout = (keep) => PAGE.filter((s) => s !== keep);

  for (const theme of ["dark", "light"]) {
    const target = hexLuminance(GROUND[theme]);
    const withS3 = decodePng(renderWithQuickLook(
      themedCopy(theme, { hide: pageWithout("#the-insight"), label: theme + "-s03" }), theme + "-s03"));
    const withS4 = decodePng(renderWithQuickLook(
      themedCopy(theme, { hide: pageWithout("#the-decisions"), label: theme + "-s04" }), theme + "-s04"));
    const control = decodePng(renderWithQuickLook(
      themedCopy(theme, { hide: PAGE, label: theme + "-s34control" }), theme + "-s34control"));

    const s3Ink = inkShare(withS3, target);
    const s4Ink = inkShare(withS4, target);
    const baseInk = inkShare(control, target);
    const bars = markSeats(withS4, theme);
    evidence[theme + "S0304"] = {
      s3InkShare: s3Ink, s4InkShare: s4Ink, controlInkShare: baseInk,
      marks: bars.map((b) => ({ w: b.w, h: b.h, l: b.l, t: b.t }))
    };

    check(
      `WebKit sets §3's kicker and paragraph (${theme})`,
      withS3.width > 0 && s3Ink - baseInk > 0.5,
      `${withS3.width}x${withS3.height}px · ink ${s3Ink}% with §3 against ${baseInk}% on the same page with every section hidden`
    );
    check(
      `WebKit sets §4's spec-sheets (${theme})`,
      withS4.width > 0 && s4Ink - baseInk > 1,
      `ink ${s4Ink}% against ${baseInk}% — +${Math.round((s4Ink - baseInk) * 100) / 100} percentage points over the section-less control`
    );
    /* The seat, read off the pixels: the mark's left edge against the card's
       own inked left edge on the same rows. The card border is --hair over
       --surface — too close to ground for a colour match — so the edge is
       taken as the leftmost non-ground pixel in the mark's row band, which is
       that border. */
    /* QuickLook lays the page out at its own width and rasters the result to
       the requested size, so a raster distance is not a CSS distance — the
       lockup check above survives that by comparing two features in the same
       raster space, and this one has to do the same. The relationship §7 fixes
       is scale-free when stated as a proportion: --sheet-pad is 24px and the
       mark is seated at --gap-hairline, 12px, so the mark sits at the MIDPOINT
       of the card's padding. Measured here as exactly that — the surface run
       from the card's border to the mark, against the run from the border to
       the row label's first ink. A mark that migrated, lost its token or was
       painted with `color` instead of a background moves or erases that
       midpoint. */
    const surface = hexRgb(SURFACE[theme]);
    const ink = hexRgb(INK[theme]);
    const seats = bars.map((bar) => {
      const floor = Math.max(0, bar.l - 90);
      const rows = [0.15, 0.3, 0.45].map((f) => Math.round(bar.t + f * bar.h));
      const pairs = rows.map((y) => {
        let x = bar.l - 1;
        /* Step off the mark's own antialiasing, which blends accent into
           surface and matches neither, then cross the card's padding. */
        while (x >= floor && !isNear(rgbAt(withS4, x, y), surface, 6)) x--;
        while (x >= floor && isNear(rgbAt(withS4, x, y), surface, 6)) x--;
        if (x <= floor) return null;
        const border = x;
        /* The label's first ink, right of the mark: the padding edge. */
        let label = null;
        for (let px = bar.r + 2; px < Math.min(withS4.width, bar.r + 90); px++) {
          if (isNear(rgbAt(withS4, px, y), ink, 40)) { label = px; break; }
        }
        return label === null ? null : { seat: bar.l - 1 - border, pad: label - border };
      }).filter(Boolean);
      if (!pairs.length) return null;
      const best = pairs.sort((a, b) => a.pad - b.pad)[0];
      return { seat: best.seat, pad: best.pad, ratio: Math.round((best.seat / best.pad) * 1000) / 1000 };
    }).filter(Boolean);

    check(
      `WebKit seats §4's mechanism marks 12px inside their card (${theme})`,
      bars.length >= 1 && seats.length === bars.length && seats.every((s) => Math.abs(s.ratio - 0.5) <= 0.07),
      bars.length
        ? `${bars.length} rust bar(s) of ${bars.map((b) => b.w + "×" + b.h).join(", ")}px — ${seats.map((s) => s.seat + "/" + s.pad + " = " + s.ratio).join(", ")} of the card's padding, against the 12-in-24 midpoint the token seats it at`
        : "no 2px rust bar found in §4 — the mark is painted with background-color and may not have rasterised"
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
