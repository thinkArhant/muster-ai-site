/* Closing round — build the two proposal pages from the SHIPPED index.html.

   Generated rather than hand-copied so the proposal cannot drift from the page
   it proposes against: everything outside the edits below is byte-identical to
   index.html, and re-running this file after any shipped change re-bases both
   proposals in one step.

     node samples/closing-round-renders/build-proposals.mjs

   Writes samples/closing-round-a.html and samples/closing-round-b.html.
   Neither ever ships. They exist to be measured and looked at.

   The two differ in ONE region — §1's THIS SITE remnant. §5's rebuilt cards
   and the footer's final sentence are identical in both, so the founder's A/B
   look is a comparison of exactly the thing being asked.
*/

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const src = readFileSync(join(ROOT, "index.html"), "utf8");

function swap(html, from, to, label) {
  if (!html.includes(from)) throw new Error("build-proposals: no match for " + label);
  return html.replace(from, to);
}

/* The proposals live one directory down, so the page's own relative asset
   paths are re-pointed at the real stylesheets and scripts rather than copied.
   One source of truth for every token the proposal is measured in. */
let out = src
  .replaceAll('href="styles/', 'href="../styles/')
  .replaceAll('src="scripts/', 'src="../scripts/');

/* ---------------------------------------------------------------- §5 prose */
/* Four lines now. Line 2 is new and sits between the identity line and the
   provenance line. It renders at PROSE weight in ink — the figures do not
   bring the instrument treatment with them. */
out = swap(
  out,
  `<p class="t-body read shipped__line">Bodh — a shipped iOS app and web landing, live at bodh.day. The replay above is its website wave.</p>`,
  `<p class="t-body read shipped__line">Bodh — a shipped iOS app and web landing, live at bodh.day. The replay above is its website wave.</p>
      <p class="t-body read shipped__line">Bodh, idea to live: 9.3 hours of active build, $147 in AI tokens at API list price.</p>`,
  "§5 prose line 2"
);

/* ------------------------------------------------------------ §5 card BODH */
out = swap(
  out,
  `          <dl class="shipped__cells">
            <div class="shipped__cell">
              <dt class="t-micro readout__key">ACTIVE BUILD</dt>
              <dd class="readout__value"><span data-countup>9.3 h</span></dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">OPERATOR ATTENTION</dt>
              <dd class="readout__value"><span data-countup>4.8 h</span></dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">COMMIT-DAYS</dt>
              <dd class="readout__value"><span data-countup>4</span></dd>
              <dd class="t-micro readout__sub">Jul 11–18</dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">COST · API LIST</dt>
              <dd class="readout__value"><span data-countup>$147</span></dd>
            </div>
          </dl>`,
  `          <dl class="shipped__cells">
            <div class="shipped__cell">
              <dt class="t-micro readout__key">OPERATOR ATTENTION</dt>
              <dd class="readout__value"><span data-countup>4.8 h</span></dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">SHIPPED</dt>
              <dd class="readout__value">bodh.day</dd>
              <dd class="t-micro readout__sub">App Store + web</dd>
            </div>
          </dl>`,
  "§5 BODH cells"
);

/* ------------------------------------------------------- §5 card THIS SITE */
/* One dash and one answered value. The card-level caption retires: it would
   caption the SHIPPED answer too, and that answer is measured. */
out = swap(
  out,
  `          <dl class="shipped__cells">
            <div class="shipped__cell">
              <dt class="t-micro readout__key">ACTIVE BUILD</dt>
              <dd class="readout__value readout__value--unmeasured"><span data-countup>—</span></dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">OPERATOR ATTENTION</dt>
              <dd class="readout__value readout__value--unmeasured"><span data-countup>—</span></dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">COMMIT-DAYS</dt>
              <dd class="readout__value readout__value--unmeasured"><span data-countup>—</span></dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">COST · API LIST</dt>
              <dd class="readout__value readout__value--unmeasured"><span data-countup>—</span></dd>
            </div>
          </dl>
          <p class="t-micro readout__sub shipped__caption">measured at launch</p>`,
  `          <dl class="shipped__cells">
            <div class="shipped__cell">
              <dt class="t-micro readout__key">OPERATOR ATTENTION</dt>
              <dd class="readout__value readout__value--unmeasured"><span data-countup>—</span></dd>
              <dd class="t-micro readout__sub">measured at launch</dd>
            </div>
            <div class="shipped__cell">
              <dt class="t-micro readout__key">SHIPPED</dt>
              <dd class="readout__value">THIS PAGE</dd>
            </div>
          </dl>`,
  "§5 THIS SITE cells"
);

/* ------------------------------------------------------- footer, final line */
out = swap(
  out,
  `Specced, written, and reviewed by Muster's AI team — 5 of 8 agents, the other three never invoked, 1 operator — and designed and built by Kanwar Sandhu, solo, shipping his own products with it.`,
  `Specced, written, and reviewed by Muster's AI team — 5 of 8 agents, the other three never invoked, 1 operator — on a framework designed and built by Kanwar Sandhu, solo, shipping his own products with it.`,
  "footer sentence"
);

/* --------------------------------------------------- sample-only stylesheet */
/* Two rules, both scoped to option A's remnant. Nothing here is a proposal for
   the shell: the strip's cell already stacks key/value, and A adds a sub-line
   under one of them, which is the only structure the shipped CSS has no seat
   for. Option B needs no CSS at all — it deletes markup. */
const SAMPLE_CSS = `
<style>
/* CLOSING ROUND — proposal only. Never ships; decision record. */

/* Option A: the strip carries a cell-level sub-line, the same construction §5
   uses, so "measured at launch" sits under the dash it qualifies rather than
   under a card that also answers SHIPPED. */
.remnant--a .remnant__cell {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  column-gap: var(--gap-hairline);
}
.remnant--a .remnant__key { grid-column: 1; }
.remnant--a .remnant__value { grid-column: 2; }
.remnant--a .remnant__sub {
  grid-column: 1 / -1;
  margin-block-start: calc(var(--rhythm) / 4);
}

/* An answered value is rust at the readout size, an unanswered one an ink
   em-dash: the value slot's colour is the answered/unanswered channel, and the
   dash's shape plus its sub-line carry the same fact without colour. */
.remnant--a .remnant__value { color: var(--accent); }
.remnant--a .remnant__value--unmeasured { color: var(--ink); }

@media (min-width: 60rem) {
  .remnant--a .remnant__cells { grid-template-columns: repeat(2, 1fr); }
  .remnant--a .remnant__cell { display: block; }
  .remnant--a .remnant__sub {
    display: block;
    margin-block-start: calc(var(--rhythm) / 4);
  }
}
</style>
`;

out = swap(out, "</head>", SAMPLE_CSS + "</head>", "sample stylesheet");

/* ------------------------------------------------------------ §1 remnant, A */
const REMNANT_CELLS = `        <dl class="remnant__cells">
          <div class="remnant__cell">
            <dt class="t-micro remnant__key">ACTIVE BUILD</dt>
            <dd class="remnant__value">—</dd>
          </div>
          <div class="remnant__cell">
            <dt class="t-micro remnant__key">COST · API LIST</dt>
            <dd class="remnant__value">—</dd>
          </div>
          <div class="remnant__cell">
            <dt class="t-micro remnant__key">SHIPPED</dt>
            <dd class="remnant__value">THIS PAGE</dd>
          </div>
        </dl>
        <p class="t-micro remnant__caption">measured at launch</p>`;

const A_CELLS = `        <dl class="remnant__cells">
          <div class="remnant__cell">
            <dt class="t-micro remnant__key">OPERATOR ATTENTION</dt>
            <dd class="remnant__value remnant__value--unmeasured">—</dd>
            <dd class="t-micro remnant__sub">measured at launch</dd>
          </div>
          <div class="remnant__cell">
            <dt class="t-micro remnant__key">SHIPPED</dt>
            <dd class="remnant__value">THIS PAGE</dd>
          </div>
        </dl>`;

const optA = swap(
  swap(out, REMNANT_CELLS, A_CELLS, "remnant cells → A"),
  `<div class="remnant">`,
  `<div class="remnant remnant--a">`,
  "remnant class A"
);

/* ------------------------------------------------------------ §1 remnant, B */
/* The cells and the caption go entirely. What is left is the head row: the
   scope label on the rail, the VERIFY chip on the rail-end.
   The bottom-right registration mark goes with them. Two marks frame a surface
   with a field between them; on a single-row bar the inline-end corner already
   belongs to the chip, and the mark lands on the chip's own border — measured
   overlapping it at 1280, 375 and 320. The surface keeps one mark, top-left. */
const optB = swap(
  swap(out, "\n" + REMNANT_CELLS, "", "remnant cells → B"),
  `        <span class="regmark regmark--br" aria-hidden="true">+</span>
        <div class="remnant__head">`,
  `        <div class="remnant__head">`,
  "remnant br regmark → B"
);

writeFileSync(join(ROOT, "samples", "closing-round-a.html"), optA);
writeFileSync(join(ROOT, "samples", "closing-round-b.html"), optB);
console.log("wrote samples/closing-round-a.html and samples/closing-round-b.html");
