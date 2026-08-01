/* Ground texture — the founder's contact sheet.

     node samples/ground-texture-renders/build-proposals.mjs
     node samples/ground-texture-renders/render-webkit.mjs
     node samples/ground-texture-renders/make-contact-sheet.mjs

   One rule governs this sheet and it is not a style choice: EVERY CROP IS 1:1.
   The thing being judged is a per-pixel noise. Scaling a crop to fit a column
   box-averages that noise back toward flat and shows the founder a texture
   neither candidate has — which is exactly how the first WebKit pass of this
   round reported a real pigment change as ×1.01. So each crop is captured at
   deviceScaleFactor 2 (the same rasterisation a 2× display gives it), laid out
   at its CSS width, and the sheet itself is shot at deviceScaleFactor 2. One
   device pixel of the page becomes one device pixel of the sheet, everywhere.
   Nothing on this sheet is resized, and nothing is a thumbnail.

   The consequence is that the sheet shows CROPS of dense surfaces rather than
   whole sections: at 1:1 a whole hero does not fit beside another whole hero.
   That trade is the right way round — a whole-page thumbnail of a grain
   comparison is a picture of nothing.

   Output: CONTACT-SHEET.png in this directory. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync, rmSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const A = "file://" + join(ROOT, "samples", "ground-current.html");
const B = "file://" + join(ROOT, "samples", "ground-stronger.html");

const { browser, close } = await launchChrome();

try {
  const p = await browser.newPage();
  await p.init();

  /* Capture at 2×, report the CSS box. `crop` returns the CSS size so the sheet
     can lay the image out at exactly that width and let the 2× sheet render map
     it back 1:1.

     The 2× comes from the CLIP, at a viewport of deviceScaleFactor 1 — never
     from both at once. A 2× viewport plus captureBeyondViewport asks the
     renderer to raster the whole 5000px document at 2× for a 700px crop, and it
     does not reply inside three minutes. Same rasterisation, one instruction. */
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
  /* Scroll into view FIRST, then settle: the replay is gated on visibility, so
     settling before the scroll leaves every frame parked at beat 01 with two log
     lines in it — a picture of the empty half of the densest surface. */
  const shoot = async (label, url, theme, viewport, selector, geom, settle = 0) => {
    await p.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await p.setMedia({ colorScheme: theme });
    await p.goto(url);
    await p.eval(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:"start"})`);
    if (settle) await p.eval(`new Promise(r => setTimeout(r, ${settle}))`);
    await p.eval(`new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
    dims[label] = await crop(label, await boxOf(selector, geom));
  };

  const DESK = { width: 1280, height: 900 };
  const PHONE = { width: 375, height: 812, mobile: true };

  /* --- §2's terminal: the densest surface on the page. A grain that muddies
         anything muddies this first. Dark, desktop. -------------------------- */
  for (const [tag, url] of [["cur", A], ["str", B]])
    await shoot(`s02-${tag}`, url, "dark", DESK, ".replay__core", { w: 700, h: 300, dx: -16, dy: -16 }, 9000);

  /* --- §5's cards, light theme: opaque cards with ground between and around
         them, which is where the grain is judged against a real edge. ------- */
  for (const [tag, url] of [["cur", A], ["str", B]])
    await shoot(`s05-${tag}`, url, "light", DESK, ".shipped", { w: 700, h: 300, dx: -16, dy: -22 });

  /* --- bare ground beside a reading column: §3, both themes. The texture is
         most legible here, and so is any muddying of body text. ------------- */
  for (const [tag, url] of [["cur", A], ["str", B]])
    await shoot(`s03-dark-${tag}`, url, "dark", DESK, "#the-insight", { w: 700, h: 250, dx: 0, dy: 44 });

  /* --- phone, 375, Blink only. No WebKit exists at this width. ------------- */
  for (const [tag, url] of [["cur", A], ["str", B]])
    await shoot(`p375-${tag}`, url, "dark", PHONE, ".replay__core", { w: 335, h: 300, dx: -20, dy: -12 }, 9000);

  /* ----------------------------------------------------------- the sheet */
  const wk = JSON.parse(readFileSync(join(OUT, "webkit-report.json"), "utf8"));
  const cand = JSON.parse(readFileSync(join(OUT, "candidate-report.json"), "utf8"));
  const d2 = (name, theme) => cand.spread["2x"][name][theme];
  const c2 = (name, theme) => cand.contrast["2x"][name][theme];

  const pair = (a, b, wide) => `
    <div class="pair" style="--w:${wide}px">
      <figure><figcaption>CURRENT</figcaption><img src="${a}.png" width="${dims[a].w}" height="${dims[a].h}"></figure>
      <figure><figcaption>STRONGER</figcaption><img src="${b}.png" width="${dims[b].w}" height="${dims[b].h}"></figure>
    </div>`;

  const sheet = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="../../styles/tokens.css">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  /* zoom 2, then one 1× raster. The crops are 2× images laid out at their CSS
     width, so zoom 2 puts each image pixel on exactly one device pixel — the
     same 1:1 a deviceScaleFactor-2 capture gives, in a single rasterisation
     pass. Emulating DPR 2 over ten large images instead asks the renderer for a
     composite it does not return inside three minutes. */
  body { margin: 0; zoom: 2; background: var(--ground); color: var(--ink);
         font-family: var(--font-sans); inline-size: 1500px; padding: 30px 38px 34px; }
  h1 { font-family: var(--font-mono); font-size: 17px; letter-spacing: .14em;
       text-transform: uppercase; margin: 0 0 9px; }
  .sub { font-size: 14px; line-height: 1.5; margin: 0 0 5px; }
  .sub b { color: var(--accent); font-weight: 700; }
  .rec { font-size: 14px; line-height: 1.5; margin: 9px 0 0; }
  .rec span { font-family: var(--font-mono); font-size: 11px; letter-spacing: .16em;
              text-transform: uppercase; color: var(--accent); margin-inline-end: 8px; }
  .bar { border-block-start: 1px solid var(--hair); margin-block: 16px 13px; }
  .eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: .18em;
             text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
  .pair { display: grid; grid-template-columns: repeat(2, var(--w)); gap: 24px; }
  figure { margin: 0; }
  figcaption { font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em;
               text-transform: uppercase; color: var(--muted); margin: 0 0 6px; }
  img { display: block; border: 1px solid var(--hair); }
  .note { font-size: 12.5px; line-height: 1.55; margin: 9px 0 0; max-inline-size: 1400px; }
  .note b { font-weight: 700; }
  table { border-collapse: collapse; font-family: var(--font-mono); font-size: 11.5px; margin-block-start: 4px; }
  th, td { text-align: left; padding: 4px 16px 4px 0; border-block-end: 1px solid var(--hair); }
  th { color: var(--muted); font-weight: 400; letter-spacing: .08em; text-transform: uppercase; }
  td.n { font-variant-numeric: tabular-nums; }
  .ok { color: var(--accent); }
  .cols2 { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; align-items: start; }
</style></head><body>

<h1>Muster — the ground texture · one pick</h1>
<p class="sub"><b>CURRENT</b> — the grain exactly as it ships. One pale grey, mostly at very low alpha. On a 2× display its pixels span <b>7.5 levels of 255</b> on the dark ground and <b>2.0</b> on the light one, around a standard deviation of 1.12 and 0.26. Two levels is one step of 8-bit quantisation: on the light ground it is not that it reads faintly, it is that there is nothing to read.</p>
<p class="sub"><b>STRONGER</b> — the pigment goes two-sided (light grit and dark grit instead of pale grey only), more of the tile carries real alpha, and the dark theme's opacity rises 0.08 → 0.11. Pixels span <b>16.3 levels</b> dark and <b>5.0</b> light, deviation 2.49 and 0.65: about 2.2× on both.</p>
<p class="rec"><span>UI/UX recommends</span><b>STRONGER</b>, and this is a recommendation, not a ruling. The light theme is the hard case and it gets its whole gain from the pigment, with <b>its opacity untouched</b> — doubling opacity on light measures +23%, changing the pigment measures +150%. Both themes keep every contrast pair above 4.5:1. Two things it is not: the light ground stays subtle in absolute terms — 5 levels of 255 is tooth, not texture, and that is deliberate, because the light theme has a third of the dark theme's contrast headroom. And the dark ground's own luminance rises about 6 of 255, which is the one real cost and is priced at the bottom of this sheet.</p>

<div class="bar"></div>
<p class="eyebrow">Behind real content · §2's terminal, the densest surface on the page · Blink, dark, 1280 · shown 1:1, not resized</p>
${pair("s02-cur", "s02-str", 700)}
<p class="note">Mid-playback, both frames at the same beat. The crop is aimed at the gutter between the two panes: opaque card, bare ground, opaque card, in one frame. The cards themselves are opaque <b>--surface</b> and the texture sits behind them at <b>z-index: -1</b>, so no card text is touched by either candidate — the log's own legibility is identical in the two frames by construction, not by luck.</p>

<div class="bar"></div>
<p class="eyebrow">Behind real content · §5's cards · Blink, light theme, 1280 · shown 1:1</p>
${pair("s05-cur", "s05-str", 700)}
<p class="note">The light ground is where CURRENT is closest to invisible and where the pigment change does the most. The vignette is <b>untouched</b> in both: light stays at its 5% cap, dark at 16%.</p>

<div class="bar"></div>
<p class="eyebrow">A reading column on bare ground · §3 · Blink 1280, dark · shown 1:1</p>
${pair("s03-dark-cur", "s03-dark-str", 700)}
<p class="note">This is the only place on the page where a stronger grain can cost anything: body text sits directly on the ground, with nothing between it and the texture. Everywhere else the text is on an opaque card. Worst single composited pixel under that text, <b>both themes</b>, measured rather than modelled — the table below.</p>

<div class="bar"></div>
<div class="cols2">
  <div>
    <p class="eyebrow">Phone · 375 · Blink · shown 1:1</p>
    ${pair("p375-cur", "p375-str", 335)}
    <p class="note">Blink only. <b>qlmanage is the only WebKit on this machine</b>, it cannot be given a viewport, so <b>no WebKit evidence exists at any phone width</b> in this round — stated rather than implied.</p>
  </div>
  <div>
    <p class="eyebrow">WebKit · the cross-engine gate</p>
    <table>
      <tr><th>WebKit, bare ground</th><th>current</th><th>stronger</th><th></th></tr>
      <tr><td>dark · spread</td><td class="n">${wk["current-dark"].sd}</td><td class="n">${wk["stronger-dark"].sd}</td><td class="n ok">×${(wk["stronger-dark"].sd / wk["current-dark"].sd).toFixed(2)}</td></tr>
      <tr><td>light · spread</td><td class="n">${wk["current-light"].sd}</td><td class="n">${wk["stronger-light"].sd}</td><td class="n ok">×${(wk["stronger-light"].sd / wk["current-light"].sd).toFixed(2)}</td></tr>
      <tr><td>dark · §5 surface</td><td class="n">${wk["current-s05-dark"].sd}</td><td class="n">${wk["stronger-s05-dark"].sd}</td><td class="n ok">×${(wk["stronger-s05-dark"].sd / wk["current-s05-dark"].sd).toFixed(2)}</td></tr>
    </table>
    <p class="note">The stronger pigment adds three <b>feFuncR/G/B</b> primitives to an inline-SVG filter, and inline-SVG/WebKit divergence is this project's named failure class — so it was isolated rather than assumed. Same tile, same alpha curve, same opacity, pigment change alone, rendered in WebKit over mid-grey: spread <b>5.70 → 10.00</b>, range <b>127–180 → 55–203</b>. WebKit applies it.</p>
  </div>
</div>

<div class="bar"></div>
<p class="eyebrow">What it costs · Blink, 2× raster, per CSS pixel · worst single composited pixel with the vignette at its darkest</p>
<table>
  <tr><th>&nbsp;</th><th colspan="2">dark</th><th colspan="2">light</th></tr>
  <tr><th>&nbsp;</th><th>current</th><th>stronger</th><th>current</th><th>stronger</th></tr>
  <tr><td>grain spread (sd of 255)</td>
      <td class="n">${d2("shipped", "dark").sd}</td><td class="n ok">${d2("proposedFine", "dark").sd}</td>
      <td class="n">${d2("shipped", "light").sd}</td><td class="n ok">${d2("bipolar", "light").sd}</td></tr>
  <tr><td>ink on ground, worst px</td>
      <td class="n">${c2("shipped", "dark").inkWorst}</td><td class="n">${c2("proposedFine", "dark").inkWorst}</td>
      <td class="n">${c2("shipped", "light").inkWorst}</td><td class="n">${c2("bipolar", "light").inkWorst}</td></tr>
  <tr><td>muted on ground, worst px</td>
      <td class="n">${c2("shipped", "dark").mutedWorst}</td><td class="n">${c2("proposedFine", "dark").mutedWorst}</td>
      <td class="n">${c2("shipped", "light").mutedWorst}</td><td class="n">${c2("bipolar", "light").mutedWorst}</td></tr>
  <tr><td>ground luminance (of 255)</td>
      <td class="n">${d2("shipped", "dark").mean}</td><td class="n">${d2("proposedFine", "dark").mean}</td>
      <td class="n">${d2("shipped", "light").mean}</td><td class="n">${d2("bipolar", "light").mean}</td></tr>
</table>
<p class="note"><b>Every pair stays above 4.5:1 in both themes</b>, worst pixel, vignette at its darkest — dark <b>4.92</b>, light <b>4.71</b>, floor 4.5. Runners on the proposed state, run serially: sweep <b>45/45</b>, audit <b>108/108</b>, verify-shell <b>306/307</b> with exactly one red — <code>grain peak alpha capped at 8% (dark)</code>, which asserts the literal <b>0.08</b> and has to be re-based to whatever is picked. Neither the sweep nor the audit can see the texture at all: both read <code>background-color</code> off the computed style, and the texture is a fixed sibling of the content rather than an ancestor. Every ratio above was measured for this decision, not read off a runner.</p>
<p class="note"><b>The one honest cost.</b> On a near-black ground, making a grain visible <i>is</i> lightening it — the two are the same variable, and nothing in the mechanism separates them. The dark ground's rendered luminance goes 21.9 → 25.6 of 255 (about 3 points of L*). It is already 19.3 → 21.9 today, so this is the second step, not the first. Rejected on measurement: coarsening the tile (+13% spread, but its features grow past a glyph stem), lifting the alpha curve alone (+13% spread for +2.2 of ground luminance — the worst trade of anything tested), and raising the light theme's opacity (a doubling buys +23%).</p>

</body></html>`;

  const sheetPath = join(OUT, ".contact-sheet.html");
  writeFileSync(sheetPath, sheet);
  /* Measure the sheet at 1×, then give the viewport its full height and shoot
     the viewport itself at 2×. captureBeyondViewport on a 5000px document at 2×
     asks for a raster the renderer does not return inside three minutes; a
     viewport-sized capture of the same pixels returns at once. */
  await p.setViewport({ width: 3000, height: 1200, deviceScaleFactor: 1 });
  await p.goto("file://" + sheetPath);
  await p.eval(`new Promise(r => setTimeout(r, 500))`);
  const h = await p.eval(`Math.ceil(document.documentElement.getBoundingClientRect().height)`);
  await p.setViewport({ width: 3000, height: h, deviceScaleFactor: 1 });
  await p.eval(`new Promise(r => setTimeout(r, 700))`);
  const { data } = await p.call("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(OUT, "CONTACT-SHEET.png"), Buffer.from(data, "base64"));
  rmSync(sheetPath, { force: true });
  console.log("CONTACT-SHEET.png —", 3000, "×", h, "device px, crops 1:1");
  await p.close();
} finally {
  await close();
}
