/* Ground texture, coarse round — the measurement the ruling is made from.

     node samples/ground-texture-coarse/measure-coarse.mjs

   Same instrument discipline as the alpha/pigment round, kept because each rule
   was learned by getting it wrong once:

   1. THE PATCH IS THE SAME PATCH. Found once, on a page with both texture
      layers off, and every candidate is measured inside those coordinates.
   2. THE VIGNETTE IS NOT THE GRAIN. Spread is measured with the vignette OFF;
      contrast with the vignette ON at its darkest, because that is the worst
      case a reader meets.
   3. PER CSS PIXEL. The 2x render is box-averaged 2x2 before the statistic, so
      1x and 2x are the same unit. For a 1.5px-feature grain the averaging
      destroys variance; for a 4px+ feature it preserves it — which is exactly
      the effect this round exists to buy, so it must be in the number.

   One statistic is NEW this round: feature size is measured, not asserted.
   The lag-k autocorrelation of the patch's luminance field gives the distance
   at which the noise decorrelates (first k where r(k) < 0.2); a 1px veil
   decorrelates at k=1, canvas tooth at 3-6, wear at ~8+. That is the number
   the whole hypothesis stands on, so it is measured per candidate per theme.

   Contrast is per-pixel WCAG of --ink and --muted against the composited
   ground, worst pixel in the patch. No shipped runner can see any of this:
   both contrast probes resolve a background by walking ancestors for a
   background-color, and .texture is a fixed sibling.

   Report -> coarse-report.json. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { decodePng } from "../../tests/lib/png.mjs";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { VARIANTS } from "./build-proposals.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const PAGE = "file://" + join(ROOT, "index.html");

const GROUND = { dark: [0x13, 0x14, 0x0d], light: [0xdb, 0xd8, 0xc6] };
const INK = { dark: [0xe6, 0xe3, 0xd3], light: [0x19, 0x1b, 0x10] };
const MUTED = { dark: [0x8c, 0x90, 0x75], light: [0x55, 0x58, 0x3f] };

const lin = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const cr = (a, b) => {
  const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const r2 = (n) => Math.round(n * 100) / 100;

/* Candidates: the five variants, forced with !important so the injected sheet
   wins over the shipped rule regardless of order. Alphas are NOT touched —
   the shipped tokens carry 0.08/0.04 for every candidate by construction. */
const important = (css) =>
  css.replace("background-image:", "background-image:").replace(/;background-size:([^}]+)\}/, "!important;background-size:$1!important}");

const CANDIDATES = { off: `.texture__grain{display:none!important}` };
for (const [name, v] of Object.entries(VARIANTS)) CANDIDATES[name] = important(v.css);

const NO_VIGNETTE = `.texture__vignette{display:none!important}`;

/* ------------------------------------------------------------------ helpers */
function flatPatch(img, ground, size, step) {
  const { width, height, pixels, stride, channels } = img;
  for (let y = 0; y + size <= height; y += step)
    scan: for (let x = 0; x + size <= width; x += step) {
      for (let j = 0; j < size; j += 2)
        for (let i = 0; i < size; i += 2) {
          const o = (y + j) * stride + (x + i) * channels;
          if (
            Math.abs(pixels[o] - ground[0]) > 3 ||
            Math.abs(pixels[o + 1] - ground[1]) > 3 ||
            Math.abs(pixels[o + 2] - ground[2]) > 3
          )
            continue scan;
        }
      return { x, y, size };
    }
  return null;
}

function stats(img, patch, dpr, theme) {
  const { stride, channels, pixels } = img;
  const { x, y, size } = patch;
  const n = size / dpr;
  const lums = [];
  const rgbs = [];
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) {
      let r = 0, g = 0, b = 0;
      for (let dy = 0; dy < dpr; dy++)
        for (let dx = 0; dx < dpr; dx++) {
          const o = (y + j * dpr + dy) * stride + (x + i * dpr + dx) * channels;
          r += pixels[o]; g += pixels[o + 1]; b += pixels[o + 2];
        }
      const k = dpr * dpr;
      const px = [r / k, g / k, b / k];
      rgbs.push(px);
      lums.push(0.2126 * px[0] + 0.7152 * px[1] + 0.0722 * px[2]);
    }
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  const sd = Math.sqrt(lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length);

  /* feature size: first horizontal lag at which autocorrelation drops below
     0.2, averaged over rows. lums is an n x n row-major field. */
  let corrLen = null;
  if (sd > 0.05) {
    for (let k = 1; k < 24 && corrLen === null; k++) {
      let num = 0, cnt = 0;
      for (let j = 0; j < n; j++)
        for (let i = 0; i + k < n; i++) {
          num += (lums[j * n + i] - mean) * (lums[j * n + i + k] - mean);
          cnt++;
        }
      if (num / cnt / (sd * sd) < 0.2) corrLen = k;
    }
    if (corrLen === null) corrLen = 24;
  }

  const inkR = rgbs.map((q) => cr(INK[theme], q));
  const mutR = rgbs.map((q) => cr(MUTED[theme], q));
  return {
    mean: r2(mean), sd: r2(sd),
    min: r2(Math.min(...lums)), max: r2(Math.max(...lums)),
    span: r2(Math.max(...lums) - Math.min(...lums)),
    corrLen,
    inkWorst: r2(Math.min(...inkR)),
    mutedWorst: r2(Math.min(...mutR)),
    mutedMean: r2(mutR.reduce((a, b) => a + b, 0) / mutR.length)
  };
}

/* ---------------------------------------------------------------------- run */
const report = {
  engine: "Blink (headless Chrome, CDP), 1280x900",
  unit: "per CSS pixel; the 2x render is box-averaged 2x2 first; corrLen = first lag with autocorr < 0.2",
  patch: {},
  spread: {},   /* vignette OFF — the grain alone */
  contrast: {}  /* vignette ON at its darkest — the worst case a reader meets */
};

const { browser, close } = await launchChrome();
try {
  const p = await browser.newPage();
  await p.init();

  const shoot = async (theme, dpr, css) => {
    await p.setViewport({ width: 1280, height: 900, deviceScaleFactor: dpr });
    await p.setMedia({ colorScheme: theme });
    await p.goto(PAGE);
    if (css)
      await p.eval(`(() => { const s = document.createElement("style"); s.textContent = ${JSON.stringify(css)}; document.head.appendChild(s); })()`);
    await p.eval(`new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
    const { data } = await p.call("Page.captureScreenshot", { format: "png" });
    return decodePng(Buffer.from(data, "base64"));
  };

  for (const dpr of [1, 2]) {
    report.patch[dpr + "x"] = {};
    report.spread[dpr + "x"] = {};
    report.contrast[dpr + "x"] = {};

    for (const theme of ["dark", "light"]) {
      const flat = await shoot(theme, dpr, CANDIDATES.off + NO_VIGNETTE);
      const patch = flatPatch(flat, GROUND[theme], 96 * dpr, 16 * dpr);
      if (!patch) throw new Error("no flat ground patch: " + theme + " " + dpr);
      report.patch[dpr + "x"][theme] = { x: patch.x / dpr, y: patch.y / dpr, cssSize: 96 };

      for (const [name, css] of Object.entries(CANDIDATES)) {
        const noVig = await shoot(theme, dpr, css + NO_VIGNETTE);
        (report.spread[dpr + "x"][name] ||= {})[theme] = stats(noVig, patch, dpr, theme);
        const withVig = await shoot(theme, dpr, css);
        (report.contrast[dpr + "x"][name] ||= {})[theme] = stats(withVig, patch, dpr, theme);
      }
    }
  }
  await p.close();
} finally {
  await close();
}

writeFileSync(join(OUT, "coarse-report.json"), JSON.stringify(report, null, 2));

for (const dpr of ["1x", "2x"]) {
  for (const theme of ["dark", "light"]) {
    console.log(`\n===== ${dpr} · ${theme} · patch ${JSON.stringify(report.patch[dpr][theme])} =====`);
    console.log("  candidate    spread(no vig)  span   feat(px)  |  worst with vignette: ink / muted    mean");
    for (const name of Object.keys(CANDIDATES)) {
      const s = report.spread[dpr][name][theme];
      const c = report.contrast[dpr][name][theme];
      console.log(
        `  ${name.padEnd(10)} sd ${String(s.sd).padStart(5)}  ${String(s.span).padStart(6)}  ${String(s.corrLen ?? "-").padStart(6)}   |  ` +
          `${String(c.inkWorst).padStart(6)} / ${String(c.mutedWorst).padStart(5)}   ${String(c.mean).padStart(7)}`
      );
    }
  }
}
