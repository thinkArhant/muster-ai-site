# §4 — The Decisions: four spec-sheets

**Surface type**: page section (§4 of 6) — the seed's second design centerpiece; founder-supplied first-person copy rendered as instrument documents
**Consumers**: Developer (builds §4 and the rendered sample from this file), QA (derives validation scope), Content (the copy contract in §3 names every string this layout consumes), PM (reviews against the seed and the copy file)
**Inherits**: every token in `page-shell.md`. The section chrome (the `§04 · THE DECISIONS` rule, tag, and pennant) is the shell's and is not respecified here.
**Copy**: every string is `design-specs/web/section-04-copy.md`'s, verbatim. This file specifies treatment, never wording. Measurements below were taken against the seed's locked draft; the copy file may tighten but never inflate, so every measured line count is a ceiling, not an estimate.
**Authority**: `product-spec-seed.md` §4 is the content inventory — four decisions, strongest first, each with a bolded title sentence, a stamp, and Decision / Problem / Trade-off / Mechanism rows. Nothing is added to that inventory and nothing dropped. The section renders no insider-term callouts, no glossary, and no slot for any string that is not in the seed's §4 draft.

---

## 1. What §4 is

Four decisions, each rendered as a spec-sheet — the same document grammar as a machine's data sheet:
a title, a stamp, four labelled rows. The reader who skims gets four bolded sentences; the reader who
stops gets the problem, the price paid, and the mechanism each decision produced. This is one of the
page's two first-person places, and the section's entire argument is carried by prose the founder
wrote — so the design's job is to frame that voice as a measured document, not to decorate it.

The section has **no intro copy, no kicker, and no closing line**. The shell's stencil tag is the
heading; the sheets are the content; nothing else exists. Four ideas, four screens' worth of page —
one idea per screen is the seed's own layout rule.

## 2. Content hierarchy

1. **The four title sentences** — the skim layer; the argument's skeleton, strongest first
2. **The stamps** — category + provenance (`framework` / `product`); the "measured and stamped" claim
3. **The rows** — Decision / Problem / Trade-off / Mechanism, in the seed's fixed order
4. **The mechanism emphasis** — each sheet's key beat: the decision ends in the mechanism it produced

Document order per sheet follows this ranking: title, stamp, rows. **Order across sheets is the
seed's own order and is never changed** — "strongest first" is a content ruling already made by the
founder; Content may not reorder it and neither may this spec. The fourth row is emphasized because
the seed says each decision *ends in the mechanism it produced* — the row list has a direction, and
the design points at its destination.

## 3. The sheet — anatomy and copy contract

Each sheet consumes exactly six strings from the copy file, per decision:

| Slot | Copy file supplies | Rendered as |
|---|---|---|
| Title | the bolded title sentence, inline emphasis preserved | `<h3>`, §4 below |
| Stamp | the parenthetical's content — category, and whatever follows it | one text run, §5 below |
| Decision / Problem / Trade-off / Mechanism | the four row values | `<dd>` prose |

The category (`framework` / `product`) is the stamp's first word and is additionally carried as
`data-category` on the sheet for the harness — it is one string, not two slots.

### Markup contract

```html
<ol class="sheets" role="list">
  <li class="sheet" data-category="framework">
    <h3 class="sheet__title">I optimized what each agent <em>reads</em>, not how they talk.</h3>
    <span class="sheet__stamp t-micro">framework — 2026-05-05</span>
    <dl class="sheet__rows">
      <div class="sheet__row">
        <dt class="t-label">Decision</dt>
        <dd>…</dd>
      </div>
      <div class="sheet__row">…Problem…</div>
      <div class="sheet__row">…Trade-off…</div>
      <div class="sheet__row sheet__row--mech">
        <dt class="t-label">Mechanism</dt>
        <dd>…</dd>
      </div>
    </dl>
  </li>
  …three more sheets…
</ol>
```

- **`<ol>` because the order is meaningful** (strongest first). `list-style: none` strips VoiceOver's
  list semantics in WebKit, so `role="list"` restores them — the probe confirms Blink announces a
  4-item list; verify VoiceOver does too before filing the build.
- **`<h3>` per sheet**: the title sentences are the section's sub-headings — a heading-nav user reads
  the four-decision skeleton exactly as a sighted skimmer does. Tree stays h2 (stencil tag) → four
  h3, no skips, no h4.
- **`<dl>` with `<div>` row wrappers** (valid HTML, needed for the row rules and the two-column
  grid). Announced structure, read from the Blink AX tree, not asserted: each sheet exposes a
  description list of exactly four term/definition pairs, terms `DECISION` · `PROBLEM` · `TRADE-OFF`
  · `MECHANISM` in order.
- **Inline emphasis in titles is preserved as `<em>`** (the seed italicizes *reads*), rendered
  italic, and present in the heading's computed name — measured: the h3 announces the full sentence
  including the emphasized word.
- **The fifth-decision note in the seed costs nothing here**: a future fifth sheet is one more `<li>`
  with no CSS change. No empty slot ships meanwhile.

## 4. The title — first person, typographically

**What R7's first-person ruling means in type**: the founder's voice renders in the *reading* face —
`--font-sans`, sentence case, full-ink — and the machine grammar around it (labels, stamps, rules,
the mark) renders in mono tracked uppercase. The contrast between stencil chrome and humanist prose
IS the typographic expression of "a person wrote this, the instrument recorded it." Concretely:

- **Title**: `--font-sans` at `--text-kicker` / `--lead-kicker`, **weight 700** (the seed bolds every
  title sentence), `--ink`, sentence case — never uppercased, never mono. It is the only bold
  sans-at-kicker-scale text on the page, which makes the four titles a recognizable voice.
- **No quotation marks, no pull-quote styling, no signature, no avatar, no per-sheet attribution.**
  The page-level attribution (footer) and §5's provenance line carry authorship; decorating the voice
  would convert founder testimony into marketing testimonial — the exact register this page refuses.
- **Row prose** (`<dd>`): `--text-body` sans `--ink` — read prose, full-ink (A-007). The first-person
  pronoun lives in the row values and needs no special treatment; the voice is carried by the words.

Measured title behavior (seed draft strings, ceilings — Blink, real tokens): the longest title sets
**2–3 lines at ≥`--bp-wide`** (33.6–36px rendered) and **3–6 lines at 320–390px** (24px, the kicker
floor). The 6-line worst case is the longest title (17 words) at 320px; at the budget-standard 375px
it is 5 lines. Accepted: the titles are the section's display layer and earn the space — and the
founder judges this from a rendered sample, not from this description.

## 5. The stamp — category and provenance, one slot, four shapes

The seed's stamps are **not one shape**: `framework — 2026-05-05` · `framework — 2026-06-13` ·
`framework — 2026-04-12, first commit` · **`product — Bodh` with no date at all**. The design
decision that absorbs all four without per-shape markup: **the stamp is a single text slot, not a
structured date field.**

- **Treatment**: `--text-micro` — mono, uppercase (transform only; source text stays the copy file's
  casing), `--track-micro`, `--muted`. It renders directly under the title at `--gap-hairline` — the
  stamped attribution line, small against the title's scale exactly as the seed's "dates as small
  stamps" asks.
- **The parentheses do not render.** The seed's `(framework — 2026-05-05)` is source punctuation
  enclosing the stamp; the stamp construction is the enclosure. The copy file supplies the content
  without the wrapping parens; everything inside them ships verbatim, including the third stamp's
  `, first commit` qualifier.
- **The no-date case renders exactly as supplied**: `PRODUCT — BODH`, full stop. No dash placeholder,
  no "n.d.", no invented date, no aligned empty column. The dash-with-caption idiom is for unmeasured
  *metrics* (rule 4); a stamp is provenance, not a metric, and a dash here would fabricate the look
  of a redaction. Because the stamp is one text run, the short shape costs nothing — there is no
  empty field to explain.
- **Stamps never carry accent, never carry a border.** A chip border would make them read as
  interactive; they are captions.
- **Wrap behavior, measured**: the longest stamp (36 characters) sets one line at ≥`--bp-wide` and
  wraps to **two lines at 320–390px**. Accepted as-is — it wraps at a natural boundary inside a muted
  caption; resizing or un-tracking micro type to force one line would fork the token for one string.

## 6. The rows — label column, reading measure, and what 64ch means here

### 6.1 The two-column construction (≥ `--bp-wide`)

Each row is a grid: `grid-template-columns: var(--sheet-label-col) minmax(0, var(--read-max))`,
column gap `--gap-flow`.

- **`--sheet-label-col: 6rem` (96px), fixed** — sheet-scoped custom property. The label strings are a
  closed set of four structural words, not copy, so a fixed column is honest and keeps all four rows
  of all four sheets on one shared vertical. Measured at `--text-label` with `--track-label` in the
  first-choice mono: widest labels (`TRADE-OFF`, `MECHANISM`) render **84.47px** — 11.5px of headroom
  inside 6rem for wider fallback monos. The relationship the harness asserts is the outcome: every
  label sets one line inside the column.
- **Labels** (`<dt>`): `--text-label` — mono uppercase tracked, `--muted`. Muted is correct here:
  the labels are captions to the founder's prose, not content (A-007's label/caption carve-out).
  A small `padding-block-start` (0.15rem) optically aligns the mono cap-height with the sans
  ascender across the gap.
- **Values** (`<dd>`): `--text-body` sans `--ink`, `max-inline-size: var(--read-max)`.

### 6.2 What `64ch` means for this construction — the ruling

**The reading column governs the prose being read, not the artifact containing it.** The founder's
reading-column ruling fixes `--read-max: 64ch` as the CSS value; in §4 the read prose is the `<dd>`
column, so **the value column takes `max-inline-size: var(--read-max)` and the sheet is wider than
the reading column by exactly the label column + gap + card padding.** Measured at 1280px: the prose
column renders **685.31px (= 64ch computed in the body face)** and the card **903.31px** — inside the
container's 1024px content width with air to spare. The alternative — squeezing the whole card into
64ch — would take the actual prose measure down to ~50ch and make the label column steal reading
width, which inverts what the ruling protects.

Between `--bp-wide` (960px) and ~1020px the grid minimum caps the prose column slightly below its
maximum (measured 62.8ch at exactly 960px) — the cap is a maximum and the column never exceeds it.

The card: `inline-size: 100%; max-inline-size: calc(var(--sheet-label-col) + var(--gap-flow) +
var(--read-max) + 2 * var(--sheet-pad) + 2px)` — content-derived, so the long titles wrap inside the
rows' width instead of dragging the card to container width. Cards sit start-aligned like every
reading passage on the page (the `.read` column is start-aligned; centering the sheets would detach
them from the page's reading edge).

### 6.3 Single column (< `--bp-wide`)

Rows stack: label above value (`grid-template-columns: minmax(0, 1fr)`), value at
`margin-block-start: calc(var(--rhythm) / 4)` under its label. The label column disappears rather
than compresses — a 96px column at 320px would leave 21ch of prose beside it per line pair; measured
single-column prose is **21.6ch at 320px, 27ch at 375px, 28.4ch at 390px**, no horizontal scroll at
any of 320 / 360 / 375 / 390 (measured; `scrollWidth` clean at all four).

### 6.4 Row rules and rhythm

- Rows separate with a 1px `--hair` `border-block-start` on every row after the first, with
  `--gap-hairline` above the rule (as `margin-block-start`) and `--gap-hairline` below it (as
  `padding-block-start`) — one-sided application throughout, per the shell's spacing rule.
- Inside the sheet: title → stamp at `--gap-hairline`; stamp → rows at `--gap-flow`.
- Card: `--surface`, 1px `--hair` border, sharp corners, opaque. Padding `--sheet-pad` =
  `--gap-flow` (24px) below `--bp-wide`, `--gap-block` (48px) at and above it.
- **Sheets carry no registration marks.** Regmarks are instrument-surface grammar (terminal, readout
  strips — glanced surfaces); the sheets are documents, and the distinction in component grammar is
  doing scope work here just as it does in §1: founder testimony must not dress as telemetry.
- Between sheets: `--gap-major` (72px) — idea-group separation; the section's `--gap-section`
  padding closes the section per the shell.

## 7. The mechanism emphasis — rust with zero rust text

**The constraint that shapes this section**: `--ink` on `--accent` measures **3.43 (dark) / 2.79
(light)** — fails every body floor — so a filled rust label column, rust section header, or any text
plated on rust is banned (shell §2.2, §2.3.4). Rust *text* at body size fails AA in dark theme too.
The emphasis system therefore uses rust only as a graphical mark, and weight only in ink:

1. **The mark**: each sheet's Mechanism row carries a **2px `--accent` bar, inset `--gap-hairline`
   (12px) from the inner edge of its own card**, outside the text flow, spanning the row's content
   block. This is the page's one accent-mark idiom — *this is the one you are on* — in its third
   seat: §2's log and narration mark the active entry with it, and here it marks the row each
   decision resolves into. Same token, same 12px value, same semantic; measured 12.00px on all four
   sheets. Its distance from the card is its own (this sheet's padding), not a fourth member of §2's
   two-layer equality — the §2 invariant binds its two synchronized layers and is not extended here.
2. **The mechanism label**: `--ink` at weight 700 (the other three labels stay `--muted` regular) —
   the duplicated-emphasis pattern from the shell's rust rules: the fact carried in ink at AA, rust
   as the flag beside it. Colour is never the sole channel — position (last row), weight, and the
   mark all point at the same thing.
3. **Zero rust text in §4.** No element in the section resolves `color` to `--accent` — titles,
   labels, stamps, prose are all ink or muted. The mark is painted with `background-color` on an
   empty `aria-hidden`-irrelevant pseudo-element (`::before` — it never enters the AX tree), **never
   with `color`** — the independent audit builds its small-rust-text sweep from elements whose
   `color` resolves to the accent, and a mark painted with `color` would join that set and fail.
4. Clearance, measured: mark to label text **10px** below `--bp-wide` (24px padding), **34px** at and
   above it (48px padding). The mark starts at the row's content edge (below its rule) and runs to
   the row's block end.

Implementation: `.sheet__row--mech { position: relative }` with
`::before { inset-inline-start: calc(var(--gap-hairline) - var(--sheet-pad)); inline-size: 2px;
inset-block: var(--gap-hairline) 0; background-color: var(--accent); }` — the offset is
token-derived, so a padding change moves the mark's room, not its 12px seat.

## 8. Layout

### Wireframe — desktop ≥ `--bp-wide`

```
│ ──┤ ▸ §04 · THE DECISIONS ├──────────────────────────────── │  shell chrome (h2)
│                                                             │
│  ┌─────────────────────────────────────────────────┐        │
│  │ I optimized what each agent reads, not how      │ (1)    │  h3, sans bold kicker
│  │ they talk.                                      │        │
│  │ FRAMEWORK — 2026-05-05                          │ (2)    │  stamp, micro muted
│  │                                                 │        │
│  │ DECISION    Each agent reads only what its      │ (3)    │  label col 6rem │ prose ≤64ch
│  │             current task needs — …              │        │
│  │ ────────────────────────────────────────────    │        │  hair rule
│  │ PROBLEM     Every multi-agent framework I …     │        │
│  │ ────────────────────────────────────────────    │        │
│  │ TRADE-OFF   I gave up the simple thing — …      │        │
│  │ ────────────────────────────────────────────    │        │
│  │▌MECHANISM   The three-tier reading model + …    │ (4)    │  2px rust bar at 12px;
│  └─────────────────────────────────────────────────┘        │  label ink bold
│                                                             │
│              --gap-major                                    │
│  ┌ sheet 2 … ┐  ┌ sheet 3 … ┐  ┌ sheet 4 … ┐               │  (stacked, same anatomy)
```

### Wireframe — phone 375

```
   ──┤ ▸ §04 · THE DECISIONS ├──
   ┌──────────────────────────────┐
   │ I optimized what each        │ (1) 3 lines at 375
   │ agent reads, not how         │
   │ they talk.                   │
   │ FRAMEWORK — 2026-05-05       │ (2) wraps to 2 lines
   │                              │     only on stamp 3
   │ DECISION                     │ (3) label above value,
   │ Each agent reads only what   │     27ch prose, no
   │ its current task needs — …   │     horizontal scroll
   │ ──────────────────────────   │
   │ PROBLEM                      │
   │ …                            │
   │ ──────────────────────────   │
   │ TRADE-OFF                    │
   │ …                            │
   │ ──────────────────────────   │
   │▌MECHANISM                    │ (4) same mark, same
   │ Breadth is absorbed at …     │     12px card inset
   └──────────────────────────────┘
```

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Title sentence | §4 — h3, sans bold at kicker scale, sentence case, `<em>` preserved |
| 2 | Stamp | §5 — one text slot, micro muted, parens dropped, no-date case as supplied |
| 3 | Rows | §6 — fixed 6rem label column ≥`--bp-wide`, stacked below; prose ≤64ch |
| 4 | Mechanism row | §7 — 2px rust bar at 12px from card inner edge, ink-bold label |

Measured line counts (seed draft, ceilings) for the build to sanity-check against:

| Viewport | Sheet 1 | Sheet 2 | Sheet 3 | Sheet 4 | Longest stamp |
|---|---|---|---|---|---|
| 320 | title 3L | 4L | 6L | 5L | 2L |
| 375 | 3L | 3L | 5L | 4L | 2L |
| 390 | 3L | 3L | 4L | 3L | 2L |
| 1280 | 2L | 2L | 3L | 2L | 1L |

## 9. Both themes, contrast — stated per token pair

Every pair below is the shell's measured table (§2.2); this section introduces no new pair and no
thirteenth colour.

| Element | Pair | Dark | Light | Floor |
|---|---|---|---|---|
| Title, row prose, mech label | `--ink` on `--surface` | 13.23 | 13.64 | 4.5 ✓ AAA |
| Row labels, stamps | `--muted` on `--surface` | 5.16 | 5.76 | 4.5 ✓ (labels/captions only) |
| Mechanism mark (graphical) | `--accent` on `--surface` | 3.86 | 4.89 | 3.0 ✓ UI/graphics |
| Row rules, card border | `--hair` on `--surface` | decorative | decorative | never information-bearing alone |

The banned pair — `--ink` on `--accent`, 3.43 / 2.79 — appears nowhere: §4 contains no filled rust
and no rust text (§7.3).

## 10. States, motion, interaction

- **§4 is fully static.** No animation, no transition, no scroll-triggered anything, no count-up
  (there are no metrics here — stamps are provenance, not measurements). The motion budget is closed
  at the shell's three elements plus the cursor, and this section holds no seat.
- **Reduced motion / no JS: identical render.** Complete content with zero JavaScript — there is
  nothing to degrade.
- **Interactive inventory: zero elements.** No links, no controls, nothing focusable. Find-in-page
  and select-and-copy hit real text everywhere (the uppercase label/stamp casing is transform-only;
  copied text yields the source casing per engine behavior).
- Forced colors: card and row borders are real borders and survive; the mark is a background and
  drops — correct, it is decorative duplication of what position and weight already carry.

## 11. Accessibility

- **Heading tree**: `§04 · THE DECISIONS` (h2, shell) → four h3 title sentences. No skips; no other
  headings in the section.
- **Announced structure** (measured, Blink AX tree): a 4-item list; each item a heading (full title
  sentence, `<em>` content included) followed by a description list of exactly four term/definition
  pairs in row order. The stamp is announced between heading and list as plain text — category
  first, which orients before the rows arrive.
- **Casing divergence, cross-engine (known)**: Blink computes names from rendered (uppercased) text,
  WebKit from source text. Every string assertion on labels and stamps is case-insensitive,
  word-exact — same ruling as the hero headline.
- **`role="list"`** on the `<ol>` restores list semantics that `list-style: none` strips in WebKit.
- Colour never sole channel (§7.2); no touch targets exist (§10); 200% zoom reflows on the
  single-column path with no horizontal scroll (same construction as the measured phone layouts).

## 12. Assertions

Each protects one relationship, one probe each; every one must fail when its relationship is
violated.

1. **Sheet inventory and order** — exactly four `.sheet` items; the four h3 AX names equal the copy
   file's title strings in the copy file's order, case-insensitive word-exact, emphasis content
   included. Fails on reorder, a dropped `<em>`, or a fifth sheet appearing early.
2. **Row inventory** — every sheet's `<dl>` exposes exactly four term/definition pairs; term strings
   equal `Decision` / `Problem` / `Trade-off` / `Mechanism` in that order (case-insensitive). Fails
   on a missing, renamed, or reordered row.
3. **Stamp fidelity** — each sheet has exactly one stamp whose text equals the copy file's stamp
   string (case-insensitive vs the transform); **the `product` sheet's stamp contains no digit** —
   the no-date case must never gain a date. Fails if a date, dash, or placeholder is invented.
4. **Stamp position** — the stamp is the h3's next element sibling, before the rows (the announced
   order is title → stamp → rows). Fails if reordered.
5. **Zero rust text** — no element inside `#the-decisions` has computed `color` equal to the accent;
   the accent appears in the section only as the four mechanism marks' `background-color`. Fails on
   any rust word, rust label, or filled-rust surface.
6. **The mark relationship** — on each sheet, the mechanism row's mark is 2px wide, painted with
   `background-color: var(--accent)`, sits at `--gap-hairline` (read the token, not a hardcoded 12)
   from the card's inner edge, spans the row's content block, and its inline-end edge clears the
   nearest text's inline-start edge. Present on exactly the fourth row, exactly four in the section.
   Fails if padding changes unseat it or the mark migrates rows.
7. **Reading measure** — every `<dd>`'s computed `max-inline-size` equals `--read-max`, and rendered
   width never exceeds it. Fails if the cap is dropped or overridden.
8. **Label column** — at ≥`--bp-wide`: all four `<dt>`s in a sheet share one rendered width, and each
   sets one line (fails if a wider fallback mono overflows 6rem — the assertion catches what the
   11.5px headroom is for). Below `--bp-wide`: no `<dt>` shares a horizontal band with its `<dd>`.
9. **No horizontal scroll** — document and every sheet at 320 / 360 / 375 / 390.
10. **Static section** — no element inside `#the-decisions` carries a non-`none` animation or a
    non-default transition, in default **and** reduced-motion paths; the section contains zero
    focusable elements. (The brand-rule static-assertion pattern, applied to a whole section.)
11. **Heading discipline** — within `#the-decisions`: one h2, exactly four h3, nothing deeper.
12. **List semantics** — the `<ol>` exposes list role with four items in the AX tree despite
    `list-style: none`.

## 13. Existing harness sites — this spec forces no re-base

No check in `tests/verify-shell.mjs` or `tests/qa-independent-audit.mjs` asserts anything about
`#the-decisions` beyond the shell placeholder, whose counts drop symmetrically when the section lands
(the placeholder-count checks compare across states and survive, per the shell's established
pattern). Two pointers for the build step:

- The audit's 64ch reading-measure probe (currently aimed at shell placeholder prose, re-targeted at
  §1's landing) gains its ideal permanent target when §4 lands: `.sheet__row dd` is the page's
  largest body of reading prose.
- The mechanism marks join the audit's decorative-construction sweep alongside the replay's marks,
  and they must be painted with `background-color` so the small-rust-text sweep (keyed on computed
  `color`) never sees them (§7.3).

## 14. Provenance — seed lock vs. decided here

**Locked by the seed (authoritative)**: four decisions, strongest first, order fixed; the bolded
title sentence per decision; Decision / Problem / Trade-off / Mechanism rows, in that order, each
ending in its mechanism; dates as small stamps; the stamps' exact content including the no-date
`product — Bodh`; first person (R7); ~4–6 sentences per decision (Content's constraint); the
spec-sheet motif itself; every colour, face, and surface rule via the shell.

**From the copy file**: every string — titles, stamps, row values — verbatim.

**Decided here (the craft)**: the single-text-slot stamp that absorbs all four stamp shapes with no
structured date field; parens-as-enclosure dropped in render; title at kicker scale in sans bold
sentence case and the first-person-as-face ruling (§4); the fixed 6rem label column with its
measured headroom; the 64ch ruling — the value column is the reading column, the card exceeds it by
chrome; the stacked single-column row grammar below `--bp-wide`; the mechanism emphasis system
(12px-inset rust bar as the accent-mark idiom's third seat + ink-bold label, zero rust text in the
section); sheets as `--surface` cards without registration marks (documents, not instruments); the
`--gap-major` sheet separation; `<ol role="list">` / h3 / `<dl>` markup and the announced structure.

**From the direction reference, as feel cues only (A-003 — it never ships)**: the calm density of a
bordered card holding labelled rows. **Present in the reference and deliberately not inherited**: its
muted-toned feed prose (founder prose here is full-ink `--ink` — A-007); its rust small-caps words
(zero rust text in this section); its blurred/glassy chrome (sheets are matte and opaque); the
`amber` class name (the accent is rust).

Nothing in this file is open. Every value is the seed's, the shell's, or measured here.
