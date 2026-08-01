/* Ground texture, coarse round — WebKit. The gate, not a formality.

     node samples/ground-texture-coarse/render-webkit.mjs

   Every variant this round changes feTurbulence parameters inside an inline-SVG
   filter, and inline-SVG/WebKit divergence is this project's named failure
   class — so each variant's filter is verified to APPLY in WebKit rather than
   assumed: the statistic reported per render is the ground patch's spread AND
   its correlation length (feature size in px), which is the property the round
   is buying. If WebKit renders a coarse variant with corrLen ~1, the variant is
   dead regardless of Blink.

   Instrument limits, learned the expensive way last round:
   - qlmanage is the only WebKit on this machine; it runs no JavaScript (costs
     nothing here — the texture has no script path).
   - It scales a whole document into a fixed square frame, and downscaling
     box-averages a per-pixel noise back toward flat (the false x1.01). Every
     shot pins the document height to ~1280 so the render lands near 1:1.
   - It cannot be given a viewport: NO WebKit evidence exists at any phone
     width. Phone figures are Blink's and are labelled so.
   - Even pinned, WebKit's raster is not exactly 1:1 with a CSS pixel, so
     spread is read as a RATIO between candidates in the same engine, and
     corrLen as a relative size, never as absolutes against Blink. */

import { decodePng } from "../../tests/lib/png.mjs";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { VARIANTS } from "./build-proposals.mjs";

const ROOT = process.cwd();
const OUT = join(ROOT, "samples", "ground-texture-coarse");

const GROUND = { dark: [0x13, 0x14, 0x0d], light: [0xdb, 0xd8, 0xc6] };

/* Pin the document to ~1280px tall: hide every section but the hero, cap the
   body. The vignette is LEFT ON — this pass verifies the filter applies, and
   the statistic tolerates the wash; the per-pixel contrast numbers come from
   Blink where the instrument can separate the layers. */
const PIN = `#watch-it-ship,#the-insight,#the-decisions,#shipped-with-muster,#get-started,body>footer{display:none!important}
  html,body{block-size:1280px!important;overflow:hidden!important}`;

function groundStats(img, ground, size = 96, slack = 30) {
  const { width, height, pixels, stride, channels } = img;
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
      let corrLen = null;
      if (sd > 0.05) {
        for (let k = 1; k < 24 && corrLen === null; k++) {
          let num = 0, cnt = 0;
          for (let j = 0; j < size; j++)
            for (let i = 0; i + k < size; i++) {
              num += (lums[j * size + i] - mean) * (lums[j * size + i + k] - mean);
              cnt++;
            }
          if (num / cnt / (sd * sd) < 0.2) corrLen = k;
        }
        if (corrLen === null) corrLen = 24;
      }
      const r2 = (n) => Math.round(n * 100) / 100;
      return { at: `${x},${y}`, mean: r2(mean), sd: r2(sd), corrLen, min: r2(Math.min(...lums)), max: r2(Math.max(...lums)) };
    }
  }
  return null;
}

const report = {};

for (const name of Object.keys(VARIANTS)) {
  for (const theme of ["dark", "light"]) {
    const label = `${name}-${theme}`;
    const html = readFileSync(join(ROOT, "samples", `groundc-${name}.html`), "utf8");
    const src = join(ROOT, "samples", `.wkc-${label}.html`);
    writeFileSync(
      src,
      html
        .replace(`<html lang="en">`, `<html lang="en" data-theme="${theme}">`)
        .replace("</head>", `<style>${PIN}</style></head>`)
    );
    const dir = join(OUT, `.wkc-${label}`);
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
    const png = join(dir, `.wkc-${label}.html.png`);
    if (!existsSync(png)) {
      console.log(label, "NO RENDER");
    } else {
      const buf = readFileSync(png);
      writeFileSync(join(OUT, `webkit-${label}.png`), buf);
      const stats = groundStats(decodePng(buf), GROUND[theme]);
      report[label] = stats;
      console.log(
        label.padEnd(16),
        stats ? `mean ${stats.mean}  sd ${stats.sd}  feat ${stats.corrLen}px  range ${stats.min}-${stats.max}  at ${stats.at}` : "no ground patch"
      );
    }
    rmSync(dir, { recursive: true, force: true });
    rmSync(src, { force: true });
  }
}

writeFileSync(join(OUT, "webkit-coarse-report.json"), JSON.stringify(report, null, 2));

for (const theme of ["dark", "light"]) {
  const base = report[`current-${theme}`];
  if (!base) continue;
  for (const name of Object.keys(VARIANTS)) {
    const s = report[`${name}-${theme}`];
    if (s && name !== "current")
      console.log(
        `WebKit ${theme.padEnd(5)} ${name.padEnd(6)}: spread x${Math.round((s.sd / base.sd) * 100) / 100}  ` +
          `feat ${base.corrLen}px -> ${s.corrLen}px`
      );
  }
}
