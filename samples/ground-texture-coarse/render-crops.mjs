/* Ground texture, coarse round — the crops the sheet is made of.

     node samples/ground-texture-coarse/render-crops.mjs

   Every crop is 1:1, captured at clip scale 2 from a deviceScaleFactor-1
   viewport (the same rasterisation a 2x display gives, one instruction), and
   is never resized afterwards — scaling a crop of a per-pixel noise averages
   it back toward flat and shows a texture no candidate has.

   Surfaces, per variant:
     s02   §2's terminal mid-playback, dark, 1280 — the densest surface
     s05   §5's cards, light, 1280 — where the grain is nearest invisible
     s03   §3's reading column on bare ground, dark, 1280 — the only place a
           stronger grain can cost anything
     p375  phone, dark, Blink only — no WebKit exists at any phone width

   Writes <surface>-<variant>.png + crop-dims.json. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { VARIANTS } from "./build-proposals.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const url = (name) => "file://" + join(ROOT, "samples", `groundc-${name}.html`);

const { browser, close } = await launchChrome();

try {
  const p = await browser.newPage();
  await p.init();

  const crop = async (name, box) => {
    const { data } = await p.call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { ...box, scale: 2 }
    });
    writeFileSync(join(OUT, name + ".png"), Buffer.from(data, "base64"));
    return { w: box.width, h: box.height };
  };

  const boxOf = async (selector, { w, h, dx = 0, dy = 0 }) => {
    const r = await p.eval(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      const b = el.getBoundingClientRect();
      return { x: b.x + scrollX, y: b.y + scrollY };
    })()`);
    return { x: Math.round(r.x + dx), y: Math.round(r.y + dy), width: w, height: h };
  };

  const dims = {};
  const shoot = async (label, page, theme, viewport, selector, geom, settle = 0) => {
    await p.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await p.setMedia({ colorScheme: theme });
    await p.goto(url(page));
    await p.eval(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:"start"})`);
    if (settle) await p.eval(`new Promise(r => setTimeout(r, ${settle}))`);
    await p.eval(`new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
    dims[label] = await crop(label, await boxOf(selector, geom));
  };

  const DESK = { width: 1280, height: 900 };
  const PHONE = { width: 375, height: 812, mobile: true };
  const names = Object.keys(VARIANTS);

  for (const v of names)
    await shoot(`s02-${v}`, v, "dark", DESK, ".replay__core", { w: 440, h: 300, dx: 116, dy: -16 }, 9000);
  for (const v of names)
    await shoot(`s05-${v}`, v, "light", DESK, ".shipped", { w: 440, h: 300, dx: 0, dy: -22 });
  for (const v of names)
    await shoot(`s03-${v}`, v, "dark", DESK, "#the-insight", { w: 440, h: 260, dx: 0, dy: 44 });
  for (const v of names)
    await shoot(`p375-${v}`, v, "dark", PHONE, ".replay__core", { w: 335, h: 260, dx: -20, dy: -12 }, 9000);

  writeFileSync(join(OUT, "crop-dims.json"), JSON.stringify(dims, null, 2));
  console.log("crops written:", Object.keys(dims).length);
  await p.close();
} finally {
  await close();
}
