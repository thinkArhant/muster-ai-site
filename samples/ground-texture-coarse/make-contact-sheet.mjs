/* Ground texture, coarse round — the founder's contact sheet.

     node samples/ground-texture-coarse/build-proposals.mjs
     node samples/ground-texture-coarse/measure-coarse.mjs
     node samples/ground-texture-coarse/render-crops.mjs
     node samples/ground-texture-coarse/render-webkit.mjs
     node samples/ground-texture-coarse/make-contact-sheet.mjs

   One rule governs this sheet and it is not a style choice: EVERY CROP IS 1:1.
   The thing being judged is a noise texture; scaling a crop box-averages it
   toward flat and shows a texture no candidate has. Each crop is captured at
   clip scale 2, laid out at its CSS width, and the sheet is shot with zoom 2 so
   one device pixel of the page is one device pixel of the sheet, everywhere.
   The WebKit windows are unscaled background-position views into the pinned
   qlmanage renders for the same reason.

   Output: CONTACT-SHEET.png in this directory. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync, rmSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const OUT = fileURLToPath(new URL(".", import.meta.url));

const dims = JSON.parse(readFileSync(join(OUT, "crop-dims.json"), "utf8"));
const rep = JSON.parse(readFileSync(join(OUT, "coarse-report.json"), "utf8"));
const wk = JSON.parse(readFileSync(join(OUT, "webkit-coarse-report.json"), "utf8"));
const wkl = JSON.parse(readFileSync(join(OUT, "webkit-light-novig-report.json"), "utf8"));

const NAMES = ["current", "f035", "f018", "f009", "duo"];
const LABELS = {
  current: "CURRENT · bf 0.9",
  f035: "COARSE · bf 0.35",
  f018: "COARSE · bf 0.18 — recommended",
  f009: "COARSE · bf 0.09 — shown, not asked",
  duo: "TWO-LAYER — shown, not asked"
};

const s2 = (n, t) => rep.spread["2x"][n][t];
const c2 = (n, t) => rep.contrast["2x"][n][t];

const band = (prefix, wide) => `
  <div class="row" style="--w:${wide}px">
    ${NAMES.map(
      (n) =>
        `<figure><figcaption>${LABELS[n]}</figcaption>` +
        `<img src="${prefix}-${n}.png" width="${dims[`${prefix}-${n}`].w}" height="${dims[`${prefix}-${n}`].h}"></figure>`
    ).join("\n    ")}
  </div>`;

const wkBand = `
  <div class="row" style="--w:440px">
    ${NAMES.map(
      (n) =>
        `<figure><figcaption>${LABELS[n]} · WebKit</figcaption>` +
        `<div class="wkwin" style="background-image:url(webkit-${n}-dark.png)"></div></figure>`
    ).join("\n    ")}
  </div>`;

const num = (v) => `<td class="n">${v}</td>`;
const blinkTable = (theme) => `
  <table>
    <tr><th>Blink · 2x · ${theme}</th>${NAMES.map((n) => `<th>${n}</th>`).join("")}</tr>
    <tr><td>feature size (px, autocorr length)</td>${NAMES.map((n) => num(s2(n, theme).corrLen)).join("")}</tr>
    <tr><td>grain spread (sd of 255)</td>${NAMES.map((n) => num(s2(n, theme).sd)).join("")}</tr>
    <tr><td>span of the patch (levels of 255)</td>${NAMES.map((n) => num(s2(n, theme).span)).join("")}</tr>
    <tr><td>muted on ground, worst px (floor 4.5)</td>${NAMES.map((n) => num(c2(n, theme).mutedWorst)).join("")}</tr>
    <tr><td>ink on ground, worst px</td>${NAMES.map((n) => num(c2(n, theme).inkWorst)).join("")}</tr>
    <tr><td>ground luminance (of 255)</td>${NAMES.map((n) => num(c2(n, theme).mean)).join("")}</tr>
  </table>`;

const r2 = (x) => Math.round(x * 100) / 100;
const wkTable = `
  <table>
    <tr><th>WebKit, in-engine</th>${NAMES.map((n) => `<th>${n}</th>`).join("")}</tr>
    <tr><td>dark · spread ratio vs CURRENT</td>${NAMES.map((n) => num("x" + r2(wk[`${n}-dark`].sd / wk["current-dark"].sd))).join("")}</tr>
    <tr><td>dark · feature size (px)</td>${NAMES.map((n) => num(wk[`${n}-dark`].corrLen)).join("")}</tr>
    <tr><td>light, vignette off · spread</td>${NAMES.map((n) => num(wkl[n].sd)).join("")}</tr>
    <tr><td>light, vignette off · feature size (px)</td>${NAMES.map((n) => num(wkl[n].corrLen)).join("")}</tr>
  </table>`;

const sheet = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="../../styles/tokens.css">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; zoom: 2; background: var(--ground); color: var(--ink);
         font-family: var(--font-sans); inline-size: 2360px; padding: 30px 38px 34px; }
  h1 { font-family: var(--font-mono); font-size: 17px; letter-spacing: .14em;
       text-transform: uppercase; margin: 0 0 9px; }
  .sub { font-size: 14px; line-height: 1.5; margin: 0 0 5px; max-inline-size: 1500px; }
  .sub b { color: var(--accent); font-weight: 700; }
  .rec { font-size: 14px; line-height: 1.5; margin: 9px 0 0; max-inline-size: 1500px; }
  .rec span { font-family: var(--font-mono); font-size: 11px; letter-spacing: .16em;
              text-transform: uppercase; color: var(--accent); margin-inline-end: 8px; }
  .bar { border-block-start: 1px solid var(--hair); margin-block: 16px 13px; }
  .eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: .18em;
             text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
  .row { display: grid; grid-template-columns: repeat(5, var(--w)); gap: 20px; }
  figure { margin: 0; }
  figcaption { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em;
               text-transform: uppercase; color: var(--muted); margin: 0 0 6px; }
  img { display: block; border: 1px solid var(--hair); }
  .wkwin { inline-size: 440px; block-size: 220px; border: 1px solid var(--hair);
           background-position: -300px -1030px; background-repeat: no-repeat; }
  .note { font-size: 12.5px; line-height: 1.55; margin: 9px 0 0; max-inline-size: 2280px; }
  .note b { font-weight: 700; }
  table { border-collapse: collapse; font-family: var(--font-mono); font-size: 11.5px; margin-block-start: 4px; }
  th, td { text-align: left; padding: 4px 18px 4px 0; border-block-end: 1px solid var(--hair); }
  th { color: var(--muted); font-weight: 400; letter-spacing: .08em; text-transform: uppercase; }
  td.n { font-variant-numeric: tabular-nums; }
  .cols2 { display: grid; grid-template-columns: auto auto; gap: 60px; justify-content: start; align-items: start; }
</style></head><body>

<h1>Muster — the ground grain · the feature-size round · one pick</h1>
<p class="sub"><b>The lever this round varies is baseFrequency, and nothing else.</b> Alphas stay at the shipped 0.08 dark / 0.04 light, the pigment stays the shipped pale grey, both vignettes are untouched. At bf 0.9 the noise features are ~1px on a 2&times; display and the eye box-averages them into a uniform veil; the coarse variants move the features to a measured <b>3 / 5 / 8&nbsp;px</b> (autocorrelation length), which is the band real canvas tooth and gunmetal wear live in. Coarser reads stronger at the same alpha — and it is nearly free: worst-case contrast moves at most 0.15, and the dark ground's luminance does not move at all (20.57 &rarr; 20.58 of 255, where the rejected alpha route cost +3.7).</p>
<p class="rec"><span>UI/UX recommends</span><b>COARSE 0.18</b>, asked against <b>CURRENT</b> (and 0.35 is the quieter fallback if 0.18 reads too coarse in person). 0.18 is the first variant that is perceptibly a material rather than a veil: visible clumpy tooth at arm's length on the dark ground, in both engines, with no visible tile repeat at full viewport. What it is not, stated plainly: it is still a quiet texture — within the 4.5:1 floor no overt grit exists on this page, and <b>the light theme's grain stays imperceptible in every variant</b> (span &le; 2.5 of 255). Feature size fixes the dark theme; the light theme's limit is pigment distance at its locked alpha, and both of those axes lost their round already.</p>

<div class="bar"></div>
<p class="eyebrow">Behind real content · §2's terminal, the densest surface on the page · Blink, dark, 1280 · shown 1:1, not resized</p>
${band("s02", 440)}
<p class="note">Mid-playback, all five frames at the same beat. Every card is opaque <b>--surface</b> with the texture behind it at <b>z-index:-1</b>, so the log's legibility is identical in all five by construction — the grain shows only in the ground band above the card and in the pane gutter.</p>

<div class="bar"></div>
<p class="eyebrow">Behind real content · §5's cards · Blink, light theme, 1280 · shown 1:1</p>
${band("s05", 440)}
<p class="note"><b>The honest light-theme result: no frequency makes this grain perceptible on the light ground.</b> The pigment sits ~28 levels from the ground and the locked 0.04 alpha leaves a span of at most 2.5 levels of 255 — tooth for a reader who looks for it, invisible for one who does not. The variant that fixed this (a two-sided pigment) is the one already rejected; feature size is not a substitute for it on light. Both vignettes untouched, light at its 5% cap.</p>

<div class="bar"></div>
<p class="eyebrow">A reading column on bare ground · §3 · Blink 1280, dark · shown 1:1 — the only surface where a coarser grain could cost anything</p>
${band("s03", 440)}
<p class="note">The old guard — "features must stay below a glyph stem" — is lifted for the ground layer, and the render shows why it was the wrong guard here: at 0.18 the clumps are far wider than a stem, the way paper tooth is far coarser than the type printed on it, and the text rides over the texture without interference. The real guard is the measured floor: worst single composited pixel under this text, vignette at its darkest — <b>5.14 dark / 4.82 light</b> against a 4.5 floor (CURRENT: 5.29 / 4.83). <b>0.09 is disqualified on judgement</b>: its 8px features read as staining and uneven backlight, not tooth — it is the point where texture stops being material and starts being a defect a reader would report. <b>TWO-LAYER is disqualified on measurement</b>: as constructed (sparse grit, gamma 4 &times; amplitude 0.6) the grit lands below perception and the result is CURRENT again — sd 1.18 vs 1.12.</p>

<div class="bar"></div>
<p class="eyebrow">Phone · 375 · Blink, dark · shown 1:1 — no WebKit exists at any phone width; every phone figure on this sheet is Blink's</p>
${band("p375", 335)}

<div class="bar"></div>
<p class="eyebrow">WebKit · the cross-engine gate · pinned-height qlmanage renders, unscaled 1:1 windows onto bare hero ground</p>
${wkBand}
<p class="note">Every variant is a changed <b>feTurbulence</b> inside an inline-SVG filter — this project's named failure class — so each one is verified to apply in WebKit rather than assumed: the in-engine feature size moves 2 &rarr; 3 / 6 / 12 px and the spread ratios move in Blink's direction (table below). The instrument traps from last round are respected: document height pinned so qlmanage cannot box-average the noise, and every number read as an in-engine ratio, never across engines. On light, WebKit's grain is at quantisation level in every variant — the same result as Blink, stated rather than implied.</p>

<div class="bar"></div>
<p class="eyebrow">What it measures · Blink 2x raster, per CSS pixel · spread with the vignette off; contrast worst-pixel with the vignette at its darkest</p>
<div class="cols2">
  <div>${blinkTable("dark")}<div style="block-size:14px"></div>${blinkTable("light")}</div>
  <div>${wkTable}
  <p class="note" style="max-inline-size:640px"><b>Runners on the proposed 0.18 state, run serially: 308/308 &middot; 27/27 &middot; 108/108 &middot; 45/45 — zero red.</b> Unlike the alpha round there is no token to re-base: no alpha moves, and no harness literal names the frequency. The standing caveat also stands: no shipped runner can see any of this — both contrast probes resolve background from ancestors and the texture is a fixed sibling — so every ratio above was measured per-pixel for this decision, not read off a runner.</p></div>
</div>
<p class="note"><b>Judged, beside what was measured:</b> 0.18's clumps have soft edges (a gamma&nbsp;2.6 alpha curve on coarse noise makes mottle, not sharp grit) — it reads as matte field-manual paper, which is the brand's texture, not as gunmetal. If the intent calibrated from the direction reference is the reference's own overt grain, that needs roughly an order of magnitude more effective alpha than the 4.5:1 floor allows on this palette, at any frequency; it is not reachable by this lever or any other measured so far. If 0.18 does not sing in person, ship CURRENT without regret.</p>

</body></html>`;

const { browser, close } = await launchChrome();
try {
  const p = await browser.newPage();
  await p.init();
  const sheetPath = join(OUT, ".contact-sheet.html");
  writeFileSync(sheetPath, sheet);
  await p.setViewport({ width: 4720, height: 1200, deviceScaleFactor: 1 });
  await p.goto("file://" + sheetPath);
  await p.eval(`new Promise(r => setTimeout(r, 500))`);
  const h = await p.eval(`Math.ceil(document.documentElement.getBoundingClientRect().height)`);
  await p.setViewport({ width: 4720, height: h, deviceScaleFactor: 1 });
  await p.eval(`new Promise(r => setTimeout(r, 700))`);
  const { data } = await p.call("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(OUT, "CONTACT-SHEET.png"), Buffer.from(data, "base64"));
  rmSync(sheetPath, { force: true });
  console.log("CONTACT-SHEET.png —", 4720, "x", h, "device px, crops 1:1");
  await p.close();
} finally {
  await close();
}
