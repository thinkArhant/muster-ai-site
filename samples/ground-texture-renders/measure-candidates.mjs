/* Ground texture — the measurement the ruling is made from.

     node samples/ground-texture-renders/measure-candidates.mjs

   Three things the first look at this problem gets wrong, each fixed here.

   1. THE PATCH MUST BE THE SAME PATCH. Hunting for a "bare ground" patch per
      candidate finds a different rectangle for each one, and the numbers then
      differ by location rather than by pigment. The patch is found ONCE, on a
      page with both texture layers off, and every candidate is measured inside
      those exact coordinates.

   2. THE VIGNETTE IS NOT THE GRAIN. The vignette's own gradient carries a
      spread of its own — larger, on the light ground, than the whole grain
      layer. Spread is therefore measured with the vignette OFF, so the number
      is the grain and nothing else. The vignette returns for the contrast pass,
      at its darkest, because that is the worst case.

   3. DEVICE PIXEL RATIO CHANGES THE ANSWER. The page is read on a 2× display,
      where the tile rasterises at 2× and the panel integrates pairs of device
      pixels back toward flat. Every spread below is per CSS pixel: the 2×
      render is box-averaged 2×2 before the statistic, so 1× and 2× are the same
      unit and can be compared.

   Contrast is per-pixel WCAG of --ink and --muted against the composited
   ground, worst pixel in the patch. No shipped runner measures this: both read
   `background-color` off the computed style, and .texture is a fixed sibling of
   the content rather than an ancestor, so the texture is invisible to them.

   Report → candidate-report.json. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { decodePng } from "../../tests/lib/png.mjs";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

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

/* -------------------------------------------------------------- candidates */
const GRAIN_URL = (freq, octaves, gamma, extra = "") =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${octaves}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E${extra}%3CfeFuncA type='gamma' exponent='${gamma}' amplitude='1' offset='0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23g)'/%3E%3C/svg%3E")`;

/* Contrast stretch about mid-grey, applied to R/G/B: slope s, intercept
   (1-s)/2. One-sided pale noise becomes two-sided — light grit AND dark grit. */
const STRETCH = (s) => {
  const i = (1 - s) / 2;
  return ["R", "G", "B"].map((c) => `%3CfeFunc${c} type='linear' slope='${s}' intercept='${i}'/%3E`).join("");
};

const alphas = (d, l) => `:root{--grain-alpha:${d}!important}
  @media (prefers-color-scheme:light){:root{--grain-alpha:${l}!important}}
  :root[data-theme=light]{--grain-alpha:${l}!important}`;

const C = ({ size = 196, gamma = "2.6", stretch = null, dark = null, light = null }) =>
  `.texture__grain{background-image:${GRAIN_URL("0.9", 4, gamma, stretch ? STRETCH(stretch) : "")}!important;
     background-size:${size}px ${size}px!important}` + (dark !== null ? alphas(dark, light) : "");

export const CANDIDATES = {
  off: `.texture__grain{display:none!important}`,
  shipped: "",
  /* scale alone — same pigment, same per-pixel values, bigger tooth */
  scale294: C({ size: 294 }),
  /* opacity alone */
  a12: alphas(0.12, 0.06),
  a16: alphas(0.16, 0.08),
  /* alpha curve alone — lifts the mid alphas, leaves the peak */
  gamma15: C({ gamma: "1.5" }),
  /* pigment alone — bipolar grey at the shipped alpha curve and opacity */
  stretch3: C({ stretch: 3 }),
  /* the mechanism: bipolar pigment + lifted alpha curve, opacity untouched */
  bipolar: C({ gamma: "1.5", stretch: 3 }),
  /* THE PROPOSAL — bipolar pigment, coarser tooth, opacity up on dark, and on
     light only as far as the light ground's own headroom allows */
  PROPOSED: C({ size: 294, gamma: "1.5", stretch: 3, dark: 0.11, light: 0.05 }),
  /* the proposal priced without its scale change */
  proposedFine: C({ size: 196, gamma: "1.5", stretch: 3, dark: 0.11, light: 0.05 }),
  /* the proposal one step hotter, to show where the light floor actually bites */
  hotter: C({ size: 294, gamma: "1.5", stretch: 3, dark: 0.16, light: 0.08 })
};

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
  const inkR = rgbs.map((q) => cr(INK[theme], q));
  const mutR = rgbs.map((q) => cr(MUTED[theme], q));
  return {
    mean: r2(mean), sd: r2(sd),
    min: r2(Math.min(...lums)), max: r2(Math.max(...lums)),
    inkWorst: r2(Math.min(...inkR)), inkMean: r2(inkR.reduce((a, b) => a + b, 0) / inkR.length),
    mutedWorst: r2(Math.min(...mutR)), mutedMean: r2(mutR.reduce((a, b) => a + b, 0) / mutR.length)
  };
}

/* ---------------------------------------------------------------------- run */
const report = {
  engine: "Blink (headless Chrome, CDP), 1280×900",
  unit: "spread and luminance per CSS pixel; the 2× render is box-averaged 2×2 first",
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
      /* the patch: found once, on flat ground with BOTH layers off */
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

writeFileSync(join(OUT, "candidate-report.json"), JSON.stringify(report, null, 2));

for (const dpr of ["1x", "2x"]) {
  for (const theme of ["dark", "light"]) {
    console.log(`\n===== ${dpr} · ${theme} · patch ${JSON.stringify(report.patch[dpr][theme])} =====`);
    console.log("  candidate       spread(no vig)   mean    |   worst-case with vignette: ink / muted   mean");
    for (const name of Object.keys(CANDIDATES)) {
      const s = report.spread[dpr][name][theme];
      const c = report.contrast[dpr][name][theme];
      console.log(
        `  ${name.padEnd(14)} sd ${String(s.sd).padStart(5)}  ${String(s.mean).padStart(7)}   |   ` +
          `${String(c.inkWorst).padStart(6)} / ${String(c.mutedWorst).padStart(5)}   ${String(c.mean).padStart(7)}  (range ${c.min}–${c.max})`
      );
    }
  }
}
