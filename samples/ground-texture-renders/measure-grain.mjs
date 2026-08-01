/* Ground texture — characterise the grain layer, then measure what it does to
   the page's contrast budget.

     node samples/ground-texture-renders/measure-grain.mjs

   Two passes, because "it looks faint" is not evidence.

   PASS 1 — solve the noise. The grain tile is deterministic (feTurbulence with
   a fixed seed), so rendering the SAME layer at opacity 1 over pure black and
   over pure white yields two images whose pixels are in exact correspondence:

       over black:  Cb = a·G
       over white:  Cw = a·G + (1-a)·255
       ⇒ a = 1 − (Cw − Cb)/255      G = Cb / a

   That recovers the per-pixel alpha and grey of the source tile — the real peak
   alpha, not the one the spec claims — and lets any candidate be predicted
   before it is rendered.

   PASS 2 — measure the page. For a patch of BARE GROUND (no card, no ink), the
   per-pixel WCAG ratio of --ink and --muted against that pixel. Neither shipped
   runner does this: both read `background-color` off the computed style, and the
   texture is a fixed sibling, not an ancestor — so it is invisible to them.

   Report → grain-report.json. */

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
const r3 = (n) => Math.round(n * 1000) / 1000;

/* ---------------------------------------------------------------- variants */
/* Each is a CSS override injected into the live page after load. `shipped` is
   the empty string: the page exactly as it ships. */
const GRAIN_URL = (freq, octaves, gamma, extra = "") =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${octaves}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E${extra}%3CfeFuncA type='gamma' exponent='${gamma}' amplitude='1' offset='0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23g)'/%3E%3C/svg%3E")`;

/* An RGB contrast stretch about mid-grey: slope s, intercept (1-s)/2. Turns a
   one-sided pale grey noise into a two-sided one — light grit AND dark grit —
   which is what the feel reference paints by hand. */
const STRETCH = (s) => {
  const i = (1 - s) / 2;
  return ["R", "G", "B"]
    .map((c) => `%3CfeFunc${c} type='linear' slope='${s}' intercept='${i}'/%3E`)
    .join("");
};

export const VARIANTS = {
  shipped: "",
  grainOff: `.texture__grain{display:none!important}`,
  /* one-token: opacity only */
  alpha12: `:root{--grain-alpha:0.12!important}:root[data-theme=light]{--grain-alpha:0.06!important}`,
  alpha16: `:root{--grain-alpha:0.16!important}:root[data-theme=light]{--grain-alpha:0.08!important}`,
  /* alpha-curve: lift the mid alphas, leave the peak alone */
  gamma16: `.texture__grain{background-image:${GRAIN_URL("0.9", 4, "1.6")}!important}`,
  gamma12: `.texture__grain{background-image:${GRAIN_URL("0.9", 4, "1.2")}!important}`,
  /* bipolar: stretch the grey about mid, keep the alpha curve */
  stretch26: `.texture__grain{background-image:${GRAIN_URL("0.9", 4, "2.6", STRETCH(3))}!important}`,
  /* the candidate: bipolar grey + lifted alpha curve, opacity untouched */
  bipolar: `.texture__grain{background-image:${GRAIN_URL("0.9", 4, "1.5", STRETCH(3))}!important}`,
  bipolarA12: `.texture__grain{background-image:${GRAIN_URL("0.9", 4, "1.5", STRETCH(3))}!important}
               :root{--grain-alpha:0.12!important}:root[data-theme=light]{--grain-alpha:0.06!important}`,
  /* coarser tooth at the shipped strength — visibility from feature size */
  coarse: `.texture__grain{background-size:294px 294px!important}`
};

/* ------------------------------------------------------------- patch finder */
/* A 96×96 square every pixel of which is within `slack` of the ground on every
   channel — i.e. bare ground with texture on it and no ink anywhere near. */
function barePatch(img, ground, { size = 96, slack = 26, step = 16 } = {}) {
  const { width, height, pixels, stride, channels } = img;
  for (let y = 0; y + size <= height; y += step) {
    scan: for (let x = 0; x + size <= width; x += step) {
      for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
          const o = (y + j) * stride + (x + i) * channels;
          if (
            Math.abs(pixels[o] - ground[0]) > slack ||
            Math.abs(pixels[o + 1] - ground[1]) > slack ||
            Math.abs(pixels[o + 2] - ground[2]) > slack
          )
            continue scan;
        }
      }
      return { x, y, size };
    }
  }
  return null;
}

function patchStats(img, patch, theme) {
  const { stride, channels } = img;
  const { x, y, size } = patch;
  const px = [];
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      const o = (y + j) * stride + (x + i) * channels;
      px.push([img.pixels[o], img.pixels[o + 1], img.pixels[o + 2]]);
    }
  }
  const lums = px.map((p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]);
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  const sd = Math.sqrt(lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length);
  const inkR = px.map((p) => cr(INK[theme], p));
  const mutR = px.map((p) => cr(MUTED[theme], p));
  const sorted = [...lums].sort((a, b) => a - b);
  return {
    at: `${x},${y}`,
    mean: r2(mean),
    stdDev: r2(sd),
    min: r2(sorted[0]),
    max: r2(sorted[sorted.length - 1]),
    /* the DC shift the harness's ground-patch tolerance (±2.5) reads */
    p1: r2(sorted[Math.floor(lums.length * 0.01)]),
    p99: r2(sorted[Math.floor(lums.length * 0.99)]),
    inkWorst: r2(Math.min(...inkR)),
    inkMean: r2(inkR.reduce((a, b) => a + b, 0) / inkR.length),
    mutedWorst: r2(Math.min(...mutR)),
    mutedMean: r2(mutR.reduce((a, b) => a + b, 0) / mutR.length)
  };
}

/* ------------------------------------------------------------------- run */
const report = {
  engine: "Blink (headless Chrome, CDP), 1280×900, deviceScaleFactor 1",
  note:
    "Ratios are per-PIXEL WCAG against bare ground with the texture composited on it. " +
    "No shipped runner measures this: both read background-color off the computed style, " +
    "and .texture is a fixed sibling of the content, not an ancestor.",
  noise: {},
  variants: {}
};

const { browser, close } = await launchChrome();
try {
  const p = await browser.newPage();
  await p.init();
  await p.setViewport({ width: 1280, height: 900 });

  /* ---- PASS 1: solve the source tile ---- */
  const solveDoc = (bg, css) =>
    "data:text/html," +
    encodeURIComponent(
      `<!doctype html><html><head><style>html,body{margin:0;height:100%}
       body{background:${bg}}
       .g{position:fixed;inset:0;opacity:1;background-repeat:repeat;background-size:196px 196px;
          background-image:${GRAIN_URL("0.9", 4, "2.6")}}
       ${css}</style></head><body><div class="g"></div></body></html>`
    );

  const grab = async (url) => {
    await p.goto(url);
    await p.eval(`new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
    const { data } = await p.call("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: 392, height: 392, scale: 1 }
    });
    return decodePng(Buffer.from(data, "base64"));
  };

  for (const [label, css] of [
    ["shipped tile (gamma 2.6)", ""],
    ["gamma 1.5", `.g{background-image:${GRAIN_URL("0.9", 4, "1.5")}!important}`],
    ["bipolar (stretch 3 + gamma 1.5)", `.g{background-image:${GRAIN_URL("0.9", 4, "1.5", STRETCH(3))}!important}`]
  ]) {
    const onBlack = await grab(solveDoc("#000", css));
    const onWhite = await grab(solveDoc("#fff", css));
    const alphas = [];
    const greys = [];
    const ch = onBlack.channels;
    if (onBlack.stride !== onBlack.width * ch) throw new Error("stride mismatch");
    for (let i = 0; i < onBlack.width * onBlack.height; i++) {
      const o = i * ch;
      const cb = 0.2126 * onBlack.pixels[o] + 0.7152 * onBlack.pixels[o + 1] + 0.0722 * onBlack.pixels[o + 2];
      const cw = 0.2126 * onWhite.pixels[o] + 0.7152 * onWhite.pixels[o + 1] + 0.0722 * onWhite.pixels[o + 2];
      const a = 1 - (cw - cb) / 255;
      alphas.push(a);
      if (a > 0.02) greys.push(cb / a);
    }
    const sortedA = [...alphas].sort((x, y) => x - y);
    const sortedG = [...greys].sort((x, y) => x - y);
    const meanA = alphas.reduce((x, y) => x + y, 0) / alphas.length;
    report.noise[label] = {
      meanAlpha: r3(meanA),
      p50Alpha: r3(sortedA[Math.floor(sortedA.length * 0.5)]),
      p99Alpha: r3(sortedA[Math.floor(sortedA.length * 0.99)]),
      peakAlpha: r3(sortedA[sortedA.length - 1]),
      greyP01: r2(sortedG[Math.floor(sortedG.length * 0.01)] || 0),
      greyMedian: r2(sortedG[Math.floor(sortedG.length * 0.5)] || 0),
      greyP99: r2(sortedG[Math.floor(sortedG.length * 0.99)] || 0)
    };
  }

  /* ---- PASS 2: the page ---- */
  for (const [name, css] of Object.entries(VARIANTS)) {
    report.variants[name] = {};
    for (const theme of ["dark", "light"]) {
      await p.setMedia({ colorScheme: theme });
      await p.goto(PAGE);
      if (css)
        await p.eval(
          `(() => { const s = document.createElement("style"); s.textContent = ${JSON.stringify(css)}; document.head.appendChild(s); })()`
        );
      await p.eval(`new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
      const { data } = await p.call("Page.captureScreenshot", { format: "png" });
      const img = decodePng(Buffer.from(data, "base64"));
      const patch = barePatch(img, GROUND[theme]);
      report.variants[name][theme] = patch
        ? patchStats(img, patch, theme)
        : { error: "no bare-ground patch found" };
    }
  }

  await p.close();
} finally {
  await close();
}

/* the DC shift each variant costs, against grain-off */
for (const theme of ["dark", "light"]) {
  const base = report.variants.grainOff[theme].mean;
  for (const name of Object.keys(report.variants)) {
    const v = report.variants[name][theme];
    if (v.mean !== undefined) v.dcShift = r2(v.mean - base);
  }
}

writeFileSync(join(OUT, "grain-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
