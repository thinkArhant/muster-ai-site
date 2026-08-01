/* Ground texture — WebKit. The gate, not a formality.

     node samples/ground-texture-renders/render-webkit.mjs

   The stronger grain adds three `feFuncR/G/B` primitives to an inline-SVG
   filter, and inline-SVG/WebKit divergence is this project's named failure
   class. If WebKit ignores a linear transfer, or clamps it differently, the
   pigment is one texture in Blink and another in Safari — and the proposal is
   dead regardless of how it measures in Chrome. So this file does not just
   screenshot: it decodes both renders and reports the ground patch's spread and
   mean per engine, which is the same statistic the Blink pass reports.

   Instrument limits, stated rather than worked around:

   - `qlmanage` is the only WebKit on this machine. It runs no JavaScript. That
     costs nothing here: the texture is two static layers with no script path.
   - It renders a whole document scaled into a fixed 1280×1280 frame and cannot
     be given a viewport, so there is NO WebKit evidence at phone widths
     anywhere in this round. Every phone figure is Blink's and is labelled so.
   - That fixed frame is the trap on this particular question. A 3000px document
     is downscaled to fit, and downscaling box-averages a per-pixel noise back
     toward flat — the first run of this file reported the pigment change as
     ×1.01 on the light ground purely because the render was squeezed by 0.43.
     Every shot below therefore pins the document's own height so the render
     lands near 1:1, and each shot records the scale it actually got.
   - Even pinned, WebKit's raster is not exactly 1:1 with a CSS pixel, so the
     WebKit spread is read as a RATIO between the two candidates in the same
     engine, never as an absolute against Blink's. The question WebKit answers
     is "does the pigment change land here too, and in the same direction" —
     not "is 2.49 also 2.49".

   Output lands in this directory beside the Blink renders. */

import { decodePng } from "../../tests/lib/png.mjs";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "samples", "ground-texture-renders");

const GROUND = { dark: [0x13, 0x14, 0x0d], light: [0xdb, 0xd8, 0xc6] };

/* `pin` forces the document to ~1280px tall so qlmanage's fixed square frame
   renders it near 1:1 instead of downscaling the noise into flat grey. */
const pin = (hide) =>
  `${hide}{display:none!important}
   html,body{block-size:1280px!important;overflow:hidden!important}
   body>footer{display:none!important}`;

const ONLY = {
  bare: "#hero,#watch-it-ship,#the-insight,#the-decisions,#shipped-with-muster,#get-started",
  s02: "#hero,#the-insight,#the-decisions,#shipped-with-muster,#get-started",
  s05: "#hero,#watch-it-ship,#the-insight,#the-decisions,#get-started"
};

const shots = [
  ["current-dark", "ground-current.html", "dark", pin(ONLY.bare)],
  ["stronger-dark", "ground-stronger.html", "dark", pin(ONLY.bare)],
  ["current-light", "ground-current.html", "light", pin(ONLY.bare)],
  ["stronger-light", "ground-stronger.html", "light", pin(ONLY.bare)],
  /* the same pigment behind real content — §2's terminal is the densest surface
     on the page and the one a muddy grain would wreck first; §5's cards are the
     other */
  ["current-s02-dark", "ground-current.html", "dark", pin(ONLY.s02)],
  ["stronger-s02-dark", "ground-stronger.html", "dark", pin(ONLY.s02)],
  ["current-s02-light", "ground-current.html", "light", pin(ONLY.s02)],
  ["stronger-s02-light", "ground-stronger.html", "light", pin(ONLY.s02)],
  ["current-s05-dark", "ground-current.html", "dark", pin(ONLY.s05)],
  ["stronger-s05-dark", "ground-stronger.html", "dark", pin(ONLY.s05)],
  ["current-s05-light", "ground-current.html", "light", pin(ONLY.s05)],
  ["stronger-s05-light", "ground-stronger.html", "light", pin(ONLY.s05)]
];

/* Largest run of pixels that are all within `slack` of the ground: bare ground
   with texture on it and no ink near. Returns the patch's own statistics. */
function groundStats(img, ground, size = 96, slack = 30) {
  const { width, height, pixels, stride, channels } = img;
  /* Start below the sticky bar and its hairline: at y 0 the bar's rule lands
     inside the patch and its own contrast dominates the statistic. */
  for (let y = 200; y + size <= height; y += 8) {
    scan: for (let x = 0; x + size <= width; x += 8) {
      for (let j = 0; j < size; j += 2)
        for (let i = 0; i < size; i += 2) {
          const o = (y + j) * stride + (x + i) * channels;
          if (
            Math.abs(pixels[o] - ground[0]) > slack ||
            Math.abs(pixels[o + 1] - ground[1]) > slack ||
            Math.abs(pixels[o + 2] - ground[2]) > slack
          )
            continue scan;
        }
      const lums = [];
      for (let j = 0; j < size; j++)
        for (let i = 0; i < size; i++) {
          const o = (y + j) * stride + (x + i) * channels;
          lums.push(0.2126 * pixels[o] + 0.7152 * pixels[o + 1] + 0.0722 * pixels[o + 2]);
        }
      const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
      const sd = Math.sqrt(lums.reduce((a, b) => a + (b - mean) ** 2, 0) / lums.length);
      const r2 = (n) => Math.round(n * 100) / 100;
      return { at: `${x},${y}`, mean: r2(mean), sd: r2(sd), min: r2(Math.min(...lums)), max: r2(Math.max(...lums)) };
    }
  }
  return null;
}

const report = {};

for (const [label, file, theme, css] of shots) {
  const html = readFileSync(join(ROOT, "samples", file), "utf8");
  /* The temp file sits beside its source so every relative asset path holds. */
  const src = join(ROOT, "samples", `.wk-${label}.html`);
  writeFileSync(
    src,
    html
      .replace(`<html lang="en">`, `<html lang="en" data-theme="${theme}">`)
      .replace("</head>", `<style>${css}</style></head>`)
  );
  const dir = join(OUT, `.wk-${label}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  try {
    execFileSync("qlmanage", ["-t", "-s", "1280", "-o", dir, src], {
      stdio: "pipe",
      timeout: 90000,
      killSignal: "SIGKILL"
    });
  } catch (err) {
    console.log(label, "RENDER FAILED:", err.message.slice(0, 140));
  }
  const png = join(dir, `.wk-${label}.html.png`);
  if (!existsSync(png)) {
    console.log(label, "NO RENDER");
  } else {
    const buf = readFileSync(png);
    writeFileSync(join(OUT, `webkit-${label}.png`), buf);
    const stats = groundStats(decodePng(buf), GROUND[theme]);
    report[label] = stats;
    console.log(label.padEnd(20), stats ? `mean ${stats.mean}  sd ${stats.sd}  range ${stats.min}–${stats.max}  at ${stats.at}` : "no ground patch");
  }
  rmSync(dir, { recursive: true, force: true });
  rmSync(src, { force: true });
}

writeFileSync(join(OUT, "webkit-report.json"), JSON.stringify(report, null, 2));

for (const surface of ["", "-s02", "-s05"]) {
  for (const theme of ["dark", "light"]) {
    const a = report[`current${surface}-${theme}`];
    const b = report[`stronger${surface}-${theme}`];
    if (a && b)
      console.log(
        `WebKit ${(surface || "-bare").slice(1).padEnd(4)} ${theme.padEnd(5)}: spread ${String(a.sd).padStart(5)} -> ${String(b.sd).padStart(5)} ` +
          `(×${Math.round((b.sd / a.sd) * 100) / 100})   mean ${a.mean} -> ${b.mean} ` +
          `(${b.mean - a.mean > 0 ? "+" : ""}${Math.round((b.mean - a.mean) * 100) / 100})`
      );
  }
}
