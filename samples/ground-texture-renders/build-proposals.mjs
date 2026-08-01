/* Ground texture — build the two proposal pages from the SHIPPED index.html.

     node samples/ground-texture-renders/build-proposals.mjs

   Generated rather than hand-copied so neither proposal can drift from the page
   it proposes against: everything outside the one injected stylesheet is
   byte-identical to index.html, and re-running this file after any shipped
   change re-bases both in one step.

   Writes samples/ground-current.html and samples/ground-stronger.html.
   Neither ever ships. They exist to be measured and looked at.

   CURRENT is index.html with nothing changed at all — it carries the same
   injected-stylesheet seam as STRONGER so the two differ in pigment and in
   nothing else, not even in how they were made.

   STRONGER changes the grain and only the grain. The vignette is untouched in
   both themes; the light vignette's 5% cap is not near anything here. */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const src = readFileSync(join(ROOT, "index.html"), "utf8");

function swap(html, from, to, label) {
  if (!html.includes(from)) throw new Error("build-proposals: no match for " + label);
  return html.replace(from, to);
}

/* The proposals live one directory down, so the page's own relative asset paths
   are re-pointed at the real stylesheets and scripts rather than copied. One
   source of truth for every token the proposal is measured in. */
const base = src
  .replaceAll('href="styles/', 'href="../styles/')
  .replaceAll('src="scripts/', 'src="../scripts/');

/* --------------------------------------------------------------- the grain */
/* The shipped tile, restated here so the diff between the two is readable as
   text rather than as a diff of two 700-character data URIs.

   fractalNoise → desaturate → transfer → fill. Everything is generated: no
   image file, no url() that fetches, no raster. The tile is 140 user units
   painted into a 196px box, i.e. ~1.4× — that upscale is what makes it read as
   tooth rather than as static, and it does not change between the two. */
const tile = ({ rgb, gamma }) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E` +
  `%3Cfilter id='g'%3E` +
  `%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E` +
  `%3CfeColorMatrix type='saturate' values='0'/%3E` +
  `%3CfeComponentTransfer%3E${rgb}` +
  `%3CfeFuncA type='gamma' exponent='${gamma}' amplitude='1' offset='0'/%3E` +
  `%3C/feComponentTransfer%3E%3C/filter%3E` +
  `%3Crect width='140' height='140' filter='url(%23g)'/%3E%3C/svg%3E")`;

/* A linear transfer on R/G/B about mid-grey: slope 3, intercept -1 maps the
   0.33–0.67 band the noise actually occupies onto the full 0–1 range. The
   pigment stops being a single pale grey and becomes two-sided — light grit AND
   dark grit — which is the only lever that does anything at all on the light
   ground, where the pale grey sits ~28 levels off the ground and opacity buys
   almost nothing. */
const STRETCH = ["R", "G", "B"]
  .map((c) => `%3CfeFunc${c} type='linear' slope='3' intercept='-1'/%3E`)
  .join("");

const CURRENT_CSS = `
<style>
/* GROUND TEXTURE — proposal only. Never ships; decision record.
   CURRENT: the shipped grain, restated. Identical in every value to
   styles/base.css and styles/tokens.css — this block exists so that the two
   proposals differ in pigment alone and not in construction. */
.texture__grain {
  opacity: var(--grain-alpha);
  background-image: ${tile({ rgb: "", gamma: "2.6" })};
  background-size: 196px 196px;
}
</style>
`;

const STRONGER_CSS = `
<style>
/* GROUND TEXTURE — proposal only. Never ships; decision record.
   STRONGER: three changes, all inside the grain.

     1. the pigment goes two-sided   feFuncR/G/B linear, slope 3, intercept -1
     2. the alpha curve lifts        feFuncA gamma exponent 2.6 -> 1.5
     3. dark opacity rises           --grain-alpha 0.08 -> 0.11

   The light theme's --grain-alpha does NOT move: doubling it measures +23% of
   spread, where the pigment change alone measures +150%. The vignette is not
   touched in either theme; the light cap stays 5%.

   The tile is still 140 user units in a 196px box. Coarsening it was measured
   and rejected: +13% spread for a grain whose features grow past a glyph stem. */
:root { --grain-alpha: 0.11; }
@media (prefers-color-scheme: light) { :root { --grain-alpha: 0.04; } }
:root[data-theme="light"] { --grain-alpha: 0.04; }
:root[data-theme="dark"] { --grain-alpha: 0.11; }

.texture__grain {
  opacity: var(--grain-alpha);
  background-image: ${tile({ rgb: STRETCH, gamma: "1.5" })};
  background-size: 196px 196px;
}
</style>
`;

writeFileSync(
  join(ROOT, "samples", "ground-current.html"),
  swap(base, "</head>", CURRENT_CSS + "</head>", "current stylesheet")
);
writeFileSync(
  join(ROOT, "samples", "ground-stronger.html"),
  swap(base, "</head>", STRONGER_CSS + "</head>", "stronger stylesheet")
);
console.log("wrote samples/ground-current.html and samples/ground-stronger.html");
