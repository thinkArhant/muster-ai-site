/* Closing round — the founder's contact sheet.

     node samples/closing-round-renders/make-contact-sheet.mjs

   One screenful, one verdict. The sheet is built in two passes: crop every
   surface at 2× off the real proposal pages, then compose the crops on a page
   laid out in the product's own tokens and shoot that page at 2×.

   Everything the founder is ASKED lives in the top half at the largest size the
   sheet can carry. Everything he is SHOWN — §5's rebuilt cards, the footer's
   final sentence — lives in the bottom half, small enough to be seen and big
   enough to be refused.

   Output: CONTACT-SHEET.png in this directory. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const A = "file://" + join(ROOT, "samples", "closing-round-a.html");
const B = "file://" + join(ROOT, "samples", "closing-round-b.html");

/* The two nowrap units the footer takes, applied here so the sheet shows the
   sentence as it is proposed to set rather than as it sets untreated. */
const NAME_UNITS = `(() => {
  const el = document.querySelector('.pagefoot__line');
  el.innerHTML = el.textContent
    .replace('never invoked', '<span style="white-space:nowrap">never invoked</span>')
    .replace('Kanwar Sandhu', '<span style="white-space:nowrap">Kanwar Sandhu</span>');
})()`;

const { browser, close } = await launchChrome();

try {
  const p = await browser.newPage();
  await p.init();
  await p.setMedia({ colorScheme: "dark" });

  const crop = async (name, selector, pad = 0, scale = 2) => {
    const box = await p.eval(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      const r = el.getBoundingClientRect();
      return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height };
    })()`);
    const { data } = await p.call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: {
        x: Math.max(0, box.x - pad),
        y: Math.max(0, box.y - pad),
        width: box.w + pad * 2,
        height: box.h + pad * 2,
        scale
      }
    });
    writeFileSync(join(OUT, name + ".png"), Buffer.from(data, "base64"));
    return { w: box.w + pad * 2, h: box.h + pad * 2 };
  };

  const dims = {};

  /* --- the ask: both options in situ, whole hero, desktop ---------------- */
  await p.setViewport({ width: 1280, height: 700 });
  await p.goto(A);
  dims.heroA = await crop("sheet-hero-a", "#hero", 0);
  await p.goto(B);
  dims.heroB = await crop("sheet-hero-b", "#hero", 0);

  /* --- the ask: both options at phone width ------------------------------ */
  await p.setViewport({ width: 375, height: 553, mobile: true });
  await p.goto(A);
  await p.eval(`document.querySelector('.remnant').scrollIntoView({block:'center'})`);
  await p.eval(`new Promise(r => setTimeout(r, 200))`);
  dims.stripA = await crop("sheet-strip-a", ".remnant", 14);
  await p.goto(B);
  await p.eval(`document.querySelector('.remnant').scrollIntoView({block:'center'})`);
  await p.eval(`new Promise(r => setTimeout(r, 200))`);
  dims.stripB = await crop("sheet-strip-b", ".remnant", 14);

  /* --- shown, not asked: §5's rebuilt cards, and the footer line --------- */
  await p.setViewport({ width: 1280, height: 700 });
  await p.goto(A);
  await p.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await p.eval(`new Promise(r => setTimeout(r, 1700))`);
  dims.cards = await crop("sheet-s05-cards", ".shipped", 8);

  await p.goto(A);
  await p.eval(NAME_UNITS);
  await p.eval(`document.querySelector('.pagefoot').scrollIntoView({block:'end'})`);
  await p.eval(`new Promise(r => setTimeout(r, 200))`);
  dims.footer = await crop("sheet-footer", ".pagefoot__inner", 10);

  await p.setViewport({ width: 375, height: 553, mobile: true });
  await p.goto(A);
  await p.eval(NAME_UNITS);
  await p.eval(`document.querySelector('.pagefoot').scrollIntoView({block:'end'})`);
  await p.eval(`new Promise(r => setTimeout(r, 200))`);
  dims.footerPhone = await crop("sheet-footer-p375", ".pagefoot__line", 10);

  /* ----------------------------------------------------------- the sheet */
  const HERO_W = 660;
  const fit = (d, w) => Math.round(d.h * (w / d.w));
  const sheet = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="../../styles/tokens.css">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--ground); color: var(--ink);
         font-family: var(--font-sans); inline-size: 1520px; padding: 28px 36px 32px; }
  h1 { font-family: var(--font-mono); font-size: 17px; letter-spacing: .14em;
       text-transform: uppercase; margin: 0 0 7px; }
  .sub { font-size: 14px; line-height: 1.45; margin: 0 0 4px; }
  .sub b { color: var(--accent); font-weight: 700; }
  .rec { font-size: 14px; line-height: 1.45; margin: 7px 0 0; color: var(--ink); }
  .rec span { font-family: var(--font-mono); font-size: 11px; letter-spacing: .16em;
              text-transform: uppercase; color: var(--accent); margin-inline-end: 8px; }
  .bar { border-block-start: 1px solid var(--hair); margin-block: 14px 12px; }
  .eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: .18em;
             text-transform: uppercase; color: var(--muted); margin: 0 0 9px; }
  .cols { display: grid; grid-template-columns: ${HERO_W}px ${HERO_W}px; gap: 36px; align-items: start; }
  h2 { font-family: var(--font-mono); font-size: 13px; letter-spacing: .12em;
       text-transform: uppercase; margin: 0 0 7px; color: var(--accent); }
  .shot { display: block; border: 1px solid var(--hair); }
  .note { font-size: 12.5px; line-height: 1.5; margin: 8px 0 0; }
  .note b { font-weight: 700; }
  .micro { font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em;
           text-transform: uppercase; color: var(--muted); margin: 9px 0 5px; }
  .lower { display: grid; grid-template-columns: 352px 486px 486px; gap: 32px; align-items: start; }
</style></head><body>

<h1>Muster — closing round · one look</h1>
<p class="sub"><b>Asked — one thing:</b> §1's THIS SITE strip, <b>A</b> or <b>B</b>. Shown in situ, under the headline and the formation.</p>
<p class="sub"><b>Shown, not asked:</b> §5's rebuilt two-cell cards, and the footer's final sentence as it sets. Speak only if either is wrong.</p>
<p class="rec"><span>UI/UX recommends</span><b>B</b> — A prints the same two keys and the same two values as §5's THIS SITE card one scroll above it, and puts a second rust readout under the headline's rust <b>AN AI</b>. The recommendation is not the ruling.</p>

<div class="bar"></div>
<p class="eyebrow">The ask · Blink 1280×700, dark · both re-rendered in WebKit, same composition</p>

<div class="cols">
  <div>
    <h2>A — re-keyed to match §5</h2>
    <img class="shot" src="sheet-hero-a.png" width="${HERO_W}" height="${fit(dims.heroA, HERO_W)}">
    <p class="note">Strip <b>139px</b> · hero <b>861px</b>. Two cells across a 1024px bar. Rust <b>THIS PAGE</b> at 30px.</p>
  </div>
  <div>
    <h2>B — slimmed to the VERIFY chip</h2>
    <img class="shot" src="sheet-hero-b.png" width="${HERO_W}" height="${fit(dims.heroB, HERO_W)}">
    <p class="note">Strip <b>52px</b> · hero <b>774px</b>, <b>87px</b> less — the curl clears a 774px window whole. Scope on the rail, VERIFY on the rail-end.</p>
  </div>
</div>

<div class="bar"></div>

<div class="lower">
  <div>
    <p class="eyebrow">The ask, at phone · 375</p>
    <p class="micro">A</p>
    <img class="shot" src="sheet-strip-a.png" width="352" height="${fit(dims.stripA, 352)}">
    <p class="micro">B</p>
    <img class="shot" src="sheet-strip-b.png" width="352" height="${fit(dims.stripB, 352)}">
  </div>
  <div>
    <p class="eyebrow">Shown · §5's two-cell cards · 1280</p>
    <img class="shot" src="sheet-s05-cards.png" width="486" height="${fit(dims.cards, 486)}">
    <p class="note">Card heights equal at <b>362px</b>, down from 674. Every key and value on one row across the pair; each sub-line sits <b>42px</b> under its own value. Answered values rust, the unanswered one an ink dash.</p>
  </div>
  <div>
    <p class="eyebrow">Shown · the footer's final sentence · 1280, then 375</p>
    <img class="shot" src="sheet-footer.png" width="486" height="${fit(dims.footer, 486)}">
    <img class="shot" src="sheet-footer-p375.png" width="300" height="${fit(dims.footerPhone, 300)}" style="margin-block-start:10px">
    <p class="note"><b>3 lines</b> desktop · <b>6</b> at 375 · <b>7</b> at 320. Untreated it broke <b>Kanwar / Sandhu</b> across lines at 375 and 320; here the name and “never invoked” are held as units, which costs zero lines at every width.</p>
  </div>
</div>

</body></html>`;

  const sheetPath = join(OUT, ".contact-sheet.html");
  writeFileSync(sheetPath, sheet);
  /* 2× once, not twice: the device scale factor already doubles every pixel,
     so the clip stays at scale 1 or the capture asks for a 6000px-wide frame
     and the renderer never replies. */
  await p.setViewport({ width: 1520, height: 1200, deviceScaleFactor: 2 });
  await p.goto("file://" + sheetPath);
  await p.eval(`new Promise(r => setTimeout(r, 400))`);
  const h = await p.eval(`document.body.scrollHeight`);
  const { data } = await p.call("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: 1520, height: h, scale: 1 }
  });
  writeFileSync(join(OUT, "CONTACT-SHEET.png"), Buffer.from(data, "base64"));
  rmSync(sheetPath, { force: true });
  console.log("CONTACT-SHEET.png —", 1520, "×", h, "CSS px at 2×");
  await p.close();
} finally {
  await close();
}
