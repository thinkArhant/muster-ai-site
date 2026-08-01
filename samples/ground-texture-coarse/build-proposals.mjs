/* Ground texture, coarse round — build the proposal pages from the SHIPPED index.html.

     node samples/ground-texture-coarse/build-proposals.mjs

   Generated rather than hand-copied so no proposal can drift from the page it
   proposes against: everything outside the one injected stylesheet is
   byte-identical to index.html, and re-running this file after any shipped
   change re-bases all of them in one step.

   THE HYPOTHESIS UNDER TEST: ruggedness is a feature-SIZE property, not an
   intensity property. At baseFrequency 0.9 the noise features are ~1.5 CSS px
   and a 2x display box-averages them into a uniform veil; real canvas tooth and
   gunmetal wear have features around 3-6px with clumpy structure. So this round
   varies baseFrequency ONLY. Alphas stay at the shipped values (0.08 dark /
   0.04 light), the pigment stays the shipped single pale grey, the alpha curve
   stays gamma 2.6, and both vignettes are untouched. Coarser must read stronger
   at the SAME alpha or the variant fails.

   Feature size arithmetic: dominant wavelength ~ 1/baseFrequency user units,
   painted at the established 1.4x upscale:
     0.9  -> ~1.6px   (shipped)
     0.35 -> ~4px     (canvas-tooth band)
     0.18 -> ~7.8px   (coarse weave)
     0.09 -> ~15.6px  (wear / patina scale)

   Tile sizing rule: the tile carries >= ~50 base-frequency periods per side so
   the repeat cannot be caught by eye (period count = tileUnits x baseFrequency;
   a coarse grain in a small tile repeats visibly). The 1.4x paint upscale is
   the shipped tooth character and does not vary.
     0.35 -> 140u tile / 196px box  (49 periods)
     0.18 -> 280u tile / 392px box  (50 periods)
     0.09 -> 560u tile / 784px box  (50 periods)

   DUO is the optional two-layer form: the shipped fine veil untouched, plus a
   sparse coarse grit (bf 0.18) whose own alpha curve is pushed down hard
   (gamma exponent 4, amplitude 0.6) so it contributes occasional clumps at very
   low alpha rather than a second veil. Same single layer opacity token.

   Writes samples/groundc-current.html, -f035, -f018, -f009, -duo. None ever
   ships. They exist to be measured and looked at. */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const src = readFileSync(join(ROOT, "index.html"), "utf8");

function swap(html, from, to, label) {
  if (!html.includes(from)) throw new Error("build-proposals: no match for " + label);
  return html.replace(from, to);
}

/* Proposals live in samples/, one directory down. */
const base = src
  .replaceAll('href="styles/', 'href="../styles/')
  .replaceAll('src="scripts/', 'src="../scripts/');

/* The shipped construction, parameterised on frequency/octaves/tile only.
   Pigment and alpha curve are the SHIPPED ones for every variant. */
export const tile = ({ size, freq, oct, alpha = "%3CfeFuncA type='gamma' exponent='2.6' amplitude='1' offset='0'/%3E" }) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E` +
  `%3Cfilter id='g'%3E` +
  `%3CfeTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${oct}' stitchTiles='stitch'/%3E` +
  `%3CfeColorMatrix type='saturate' values='0'/%3E` +
  `%3CfeComponentTransfer%3E${alpha}%3C/feComponentTransfer%3E%3C/filter%3E` +
  `%3Crect width='${size}' height='${size}' filter='url(%23g)'/%3E%3C/svg%3E")`;

const GRIT_ALPHA = "%3CfeFuncA type='gamma' exponent='4' amplitude='0.6' offset='0'/%3E";

export const VARIANTS = {
  current: {
    label: "CURRENT",
    css: `.texture__grain{background-image:${tile({ size: 140, freq: "0.9", oct: 4 })};background-size:196px 196px}`
  },
  f035: {
    label: "COARSE 0.35",
    css: `.texture__grain{background-image:${tile({ size: 140, freq: "0.35", oct: 4 })};background-size:196px 196px}`
  },
  f018: {
    label: "COARSE 0.18",
    css: `.texture__grain{background-image:${tile({ size: 280, freq: "0.18", oct: 5 })};background-size:392px 392px}`
  },
  f009: {
    label: "COARSE 0.09",
    css: `.texture__grain{background-image:${tile({ size: 560, freq: "0.09", oct: 5 })};background-size:784px 784px}`
  },
  duo: {
    label: "TWO-LAYER",
    css:
      `.texture__grain{background-image:` +
      `${tile({ size: 280, freq: "0.18", oct: 5, alpha: GRIT_ALPHA })},` +
      `${tile({ size: 140, freq: "0.9", oct: 4 })};` +
      `background-size:392px 392px,196px 196px}`
  }
};

for (const [name, v] of Object.entries(VARIANTS)) {
  const block = `
<style>
/* GROUND TEXTURE, coarse round — proposal only. Never ships; decision record.
   ${v.label}: baseFrequency is the only lever varied this round. Alphas stay at
   the shipped 0.08 dark / 0.04 light; pigment and alpha curve are the shipped
   ones; both vignettes untouched. CURRENT restates the shipped grain so every
   proposal shares the same injected-stylesheet seam and differs in frequency
   and nothing else. */
${v.css}
</style>
`;
  writeFileSync(
    join(ROOT, "samples", `groundc-${name}.html`),
    swap(base, "</head>", block + "</head>", name)
  );
}
console.log("wrote samples/groundc-{current,f035,f018,f009,duo}.html");
