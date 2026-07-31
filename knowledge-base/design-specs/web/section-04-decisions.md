# §4 — The Decisions: four spec-sheets

**Surface type**: page section (§4 of 6) — the seed's second design centerpiece; founder-supplied first-person copy rendered as instrument documents
**Consumers**: Developer (builds §4 and the rendered sample from this file), QA (derives validation scope), Content (the copy contract in §3 names every string this layout consumes), PM (reviews against the seed and the copy file)
**Inherits**: every token in `page-shell.md`. The section chrome (the `§04 · THE DECISIONS` rule, tag, and pennant) is the shell's and is not respecified here.
**Copy**: every string is `design-specs/web/section-04-copy.md`'s, verbatim. This file specifies treatment, never wording. Measurements below were rendered against the shipping strings (written under the copy file's ≤45-word row / ≤12-word title ceilings) in the real tokens; `samples/s04-one-screen.html` is the rendered record.
**Authority**: the content inventory is `decision-log.md` DEC-044 — four decisions, strongest first, every stamp date verified by `git log` against the framework repo — under DEC-043's audience ruling (§4's reader is non-technical; plain words, never bigger claims; one desktop screen). The founder's gate rulings supersede `product-spec-seed.md` §4's draft, by the same amendment mechanism `section-01-hero.md` records. Nothing is added to DEC-044's inventory and nothing dropped. The section renders no insider-term callouts, no glossary, and no slot for any string that is not in the copy file.

---

## 1. What §4 is

Four decisions, each rendered as a spec-sheet — the same document grammar as a machine's data sheet:
a title, a stamp, four labelled rows. The reader who skims gets four bolded sentences; the reader who
stops gets the problem, the price paid, and the mechanism each decision produced. This is one of the
page's two first-person places, and the section's entire argument is carried by prose in the
founder's voice — so the design's job is to frame that voice as a measured document, not to decorate
it. §4's reader is the page's one deliberate audience change (DEC-043): non-technical — a VC, or
someone deciding whether to hire the person — which is why the copy is plain and short and why the
sheets must not demand work.

The section has **no intro copy, no kicker, and no closing line**. The shell's stencil tag is the
heading; the sheets are the content; nothing else exists. Four ideas, **one desktop screen**
(DEC-043): at ≥ `--bp-wide` the sheets ride a horizontal paged track (§8.1); below it they stack,
each roughly a phone screen — the one-idea-per-screen rule expressed per surface.

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

The category is the stamp's first word (`framework`, on all four shipping stamps) and is
additionally carried as `data-category` on the sheet for the harness — it is one string, not two
slots.

### Markup contract

```html
<ol class="sheets" role="list">
  <li class="sheet" data-category="framework">
    <h3 class="sheet__title">I optimized what each agent <em>reads</em>, not how they talk.</h3>
    <div class="sheet__meta">
      <span class="sheet__stamp t-micro">framework — 2026-04-24</span>
      <span class="sheet__ordinal t-micro" aria-hidden="true">SHEET 1 OF 4</span>
    </div>
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

Measured title behavior (shipping strings — Blink, real tokens): every title sets **2 lines in the
track at 1280** and at most **3 lines at 375/390, 4 lines at 320** (the worst case is the 11-word
title, sheet 3). The copy ceilings (≤12 words) keep the display layer short enough that no title
approaches a wall of type at any width.

## 5. The stamp — category and provenance, one slot

All four stamps carry a verified date (DEC-044, each checked by `git log` against the framework
repo): `framework — 2026-04-24` · `framework — 2026-06-13` · `framework — 2026-04-12, first commit`
· `framework — 2026-06-07`. The stamps are the section's independent-arrival argument — four dates
a hostile reader can click through — and its only numerals. **The stamp is a single text slot, not
a structured date field**: the third stamp's `, first commit` qualifier rides in the same run with
no extra markup, and a future stamp of any shape costs nothing.

- **Treatment**: `--text-micro` — mono, uppercase (transform only; source text stays the copy file's
  casing), `--track-micro`, `--muted`. It renders directly under the title at `--gap-hairline` — the
  stamped attribution line, small against the title's scale exactly as the seed's "dates as small
  stamps" asks.
- **The meta line (DEC-057)**: the stamp shares one line box with the sheet ordinal —
  `.sheet__meta`, a baseline-aligned flex row at the stamp's old seat, stamp at the inline-start,
  `SHEET n OF 4` at the inline-end (`margin-inline-start: auto`, nowrap; the §7.2 counterweight
  pattern). Provenance reads first, position closes the line. The ordinal is `--text-micro`
  `--muted` like the stamp, **`aria-hidden`** — the `<ol role="list">` already announces "n of 4"
  natively, so the visual mark duplicates list semantics and must not be read twice. Its text is
  chrome, not copy (the same class of designed label as §2's `BEAT 06 / 06`): Content owns the
  stamp string; this spec owns the ordinal string, and its numerals are self-verifying — `n` is
  the sheet's 1-based DOM position and `4` is the list's length (§12.18). Measured: the meta line
  is the stamp's own 16.5px line box in the track (zero height cost); below ~`--bp-wide` widths
  where stamp + ordinal exceed the line, the ordinal wraps to its own right-aligned line at
  +28.5px per sheet (the flex row wraps; measured at 375/320).
- **Dates render exactly as supplied — never reformatted, never localized.** A stamp is provenance;
  the four strings above are byte-fixed by DEC-044 and any drift is a defect, not a style choice.
- **Stamps never carry accent, never carry a border.** A chip border would make them read as
  interactive; they are captions.
- **Wrap behavior, measured**: the longest stamp (the 36-character `first commit` qualifier) sets
  one line in the track at 1280 and wraps to **two lines at 320–390px**; the other three set one
  line everywhere. Accepted as-is — it wraps at a natural boundary inside a muted caption; resizing
  or un-tracking micro type to force one line would fork the token for one string.

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
reading-column ruling fixes `--read-max: 64ch` as the CSS value: every `<dd>` carries
`max-inline-size: var(--read-max)`, the cap ships, and the prose column never exceeds it (DEC-023).

In the track, the governing dimension is the sheet's page width — `--sheet-w: 40rem` (§8.1) — so
the prose column renders **470px ≈ 45.7 rendered characters of the body face** at 1280, under its
cap. That is a judged trade, not a squeeze: the rows are ≤ 14 words each (one to two lines at this
measure), so no row approaches the line lengths the 64ch column exists to protect, and a
64ch-of-prose sheet (≈903px of card) would set every row on one long line — a stretched ribbon of
air whose pages nearly fill the scrollport and starve the cut. At 40rem the sheet keeps a
document's proportions: title at two lines, rows at one to two, and the next sheet substantially
on screen before the screen edge cuts it (§8.1). The original protection — the label column must never steal reading width —
holds structurally: the column is additive chrome outside the prose (`6rem + --gap-flow` beside it),
and the assertion on the cap survives unchanged.

The track sets sheet width directly, so no max-width formula is needed on the card; below
`--bp-wide` the stacked sheet takes `inline-size: 100%` of the container. Sheets sit start-aligned
like every reading passage on the page (centering them would detach the section from the page's
reading edge — the track's first page shares the container's inline-start).

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
  `--gap-flow` (24px) at **every** viewport — on the 40rem track page the tighter padding is
  load-bearing: at `--gap-block` the track measures ~48px taller and its snapped bottom crosses the
  700px fold, so the padding value is part of the one-screen budget (§8.1), not taste.
- **Sheets carry no registration marks.** Regmarks are instrument-surface grammar (terminal, readout
  strips — glanced surfaces); the sheets are documents, and the distinction in component grammar is
  doing scope work here just as it does in §1: founder testimony must not dress as telemetry.
- Between sheets: `--gap-flow` (24px) along the track's inline axis (pages of one document, not
  separated ideas — the idea-group seam is the section boundary itself); `--gap-major` (72px)
  between stacked sheets below `--bp-wide`. The section's `--gap-section` padding closes the
  section per the shell.

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
4. Clearance, measured: mark to label text **10px** at every viewport (`--sheet-pad` is 24px
   everywhere — §6.4). The mark starts at the row's content edge (below its rule) and runs to the
   row's block end.

Implementation: `.sheet__row--mech { position: relative }` with
`::before { inset-inline-start: calc(var(--gap-hairline) - var(--sheet-pad)); inline-size: 2px;
inset-block: var(--gap-hairline) 0; background-color: var(--accent); }` — the offset is
token-derived, so a padding change moves the mark's room, not its 12px seat.

## 8. Layout

### 8.1 The one-screen ruling — a horizontal paged track at desktop

**Ruling: at ≥ `--bp-wide` the four sheets ride a horizontal paged track — one sheet fully in
view, the next visibly cut at the container's edge. Below `--bp-wide` they stack.** Decided
against the shipping copy's measured lengths, from three candidates rendered with the real strings
(`samples/s04-one-screen.html`):

| Candidate at 1280 | Content bottom from section top | Verdict |
|---|---|---|
| Horizontal paged track | **612.1px** (700-high viewport) / 626.1px (800) | **fits one screen — ships** |
| Stacked (baseline) | 2060.6px | ~3 screens — fails the ruling |
| 2×2 grid | 1256.9px | ~1.8 screens — fails (rows wrap harder at half-width; the grid also pairs sheets the order ranks) |

The track is the only candidate that satisfies DEC-043, and it is the pattern the founder himself
raised. Horizontal scroll between discrete cards is permitted — the Sprint-1 ruling (DEC-025)
barred sideways dragging *within a line of text*, not card paging — but it has a real
discoverability cost: sideways content is missable. **The rejected construction, founder-judged
from the rendered page (DEC-057): a next sheet cropped at the container's inline-end, amputated
mid-page with a dead strip of bare ground between the cut and the screen edge (128px at 1280,
208px at 1440, measured) — it reads as "something broke," not as an invitation.** The affordance
is three channels, each in the section's own grammar:

- **The cut lands on the screen edge, never mid-page.** The track's scrollport spans the
  viewport (construction below); sheets keep their seats — sheet 1 rests on the rail — but the
  next sheet now runs off the physical screen edge, the one place a crop universally reads as
  *continues beyond* rather than *broken here*. The dead strip is gone by construction. The
  shell's own grammar already works this way: section rules span the viewport while content sits
  in the container (`page-shell.md` §7). How much of sheet 2 shows is width-dependent (measured:
  488px at 1280, 568px at 1440, all 640px at 1600 — at roughly ≥1590px a whole number of sheets
  fits and no cut is visible), which is why the cut is one channel of three, not the affordance
  alone.
- **The sheet ordinal — `SHEET 1 OF 4` — is real spec-sheet grammar.** Machine data sheets carry
  their sheet number; the motif §4 is built on supplies its own "more, sideways" statement.
  Each sheet's meta line carries the stamp at its start and the ordinal at its end (§5): the
  reader on sheet 1 knows there are three more, the reader on sheet 4 knows they are done, at
  every viewport and independent of where the cut falls. It is the width-independent channel.
- **The indicator — four segments under the track, always visible, aligned with it** (DEC-060;
  it succeeds a styled-scrollbar gauge that failed on its own terms: overlay scrollbars are
  hidden by default so the signal was absent for most readers, and where classic scrollbars
  render, the bar ran edge-to-edge and read misaligned with the sheets). One segment per sheet
  in a single row spanning **rail → rail-end** — the same edges the resting sheet composes to,
  which is what makes it read aligned. Segments are 2px tall — the page's single accent-mark
  weight, the mechanism mark's own stroke — separated by `--gap-flow`, seated
  `--gap-hairline` below the track. The sheet at rest paints its segment `--accent` (painted
  with `background-color`, never `color`); the other three are `--hair`, the page's rule
  weight. Rust here is one 2px line of it — restrained by construction. It is the paged
  counterpart of `SHEET n OF 4`: the ordinal says it in text, the indicator says it at a
  glance, and colour is never the sole channel because the text form always rides with it.
  State is discrete and instant — segments never animate and never transition, so the motion
  budget is untouched. The mechanism is an `IntersectionObserver` on the sheets (the same
  observer class §2's playback gate already uses): it watches which sheet occupies the track
  at rest and moves the active class — it never reads or writes any scroll position, so the
  shell's "no script touches the page's scroll" assertion holds exactly as written. The markup
  ships with segment 1 active, so with JavaScript absent the indicator renders complete and
  truthful at the track's load rest, and the ordinals carry position from there. The native
  scrollbar retires with this (`scrollbar-width: none`) — two position channels under one
  track, one of them misaligned, is the state this replaces.
- **The skim layer survives without scrolling.** The four h3 title sentences remain the section's
  argument skeleton for heading navigation regardless of scroll position, and the count is four —
  a page turn, not a carousel of unknown length.
- **Still no scroll machinery.** No buttons, no click targets, nothing that moves the track for
  the reader. The ordinal is four static spans; the indicator is four static segments plus one
  observer that only ever toggles a class — it is state display, not a control, and no script
  reads, writes, or intercepts any scroll position.

**Construction**: the `<ol>` becomes the track at ≥ `--bp-wide` — `display: grid;
grid-auto-flow: column; grid-auto-columns: var(--sheet-w); gap: --gap-flow; overflow-x: auto;
scroll-snap-type: x proximity`, each sheet `scroll-snap-align: start`. Grid stretch equalizes the
four sheets to the tallest (measured: all four at 473.3px, unchanged by the meta line — it
replaces the stamp's line box at the same height). The track carries `tabindex="0"` and
`aria-label="The four decisions"` so keyboard users can scroll it (§11).

**The bleed**, in full — the rail's distance from the viewport edge, derived from the page's own
tokens and applied three ways so the geometry cannot shear:

```
.sheets {
  --track-bleed: calc((100vw - min(var(--page-max), 100vw)) / 2 + var(--gutter));
  margin-inline:               calc(-1 * var(--track-bleed));
  padding-inline:              var(--track-bleed);
  scroll-padding-inline-start: var(--track-bleed);
  scrollbar-width:             none;   /* the indicator is the position channel */
}
```

Percentages are wrong here twice, and the trap is silent: padding percentages resolve against the
containing block but `scroll-padding` percentages against the *scrollport*, and the mismatch lets
the track's own snap pull sheet 1 off the rail at first layout (measured before this formula: the
UA snapped the fresh track to `scrollLeft` 128 and sheet 1 sat on the viewport edge). With the
token-derived bleed: sheet 1 rests on the rail at `scrollLeft` 0 (128/208/288 at 1280/1440/1600,
all measured), the fully-scrolled track rests sheet 4's inline-end exactly on the rail-end, and
the document's `scrollWidth` stays equal to the viewport at every measured width — the bleed
never leaks page-level horizontal scroll. The binding relationships: **track border-box spans the
viewport; track content and snap rest sit on the rail; no page-level x overflow** — never the
literal offsets.

**Snap scope**: the sheets snap to the *track* — their nearest scroll container — never to the
document's y axis. **Since DEC-057 removed the page's section snapping, this track is the page's
only snap container of any kind.** The founder's remove-or-page binary was ruled on the page's
section scrolling; the track's x snap is retained deliberately as part of this affordance — it is
what guarantees the track always *rests* composed (a sheet on the rail, the next cut at the
screen edge) instead of parked mid-crop, which is the very state the founder rejected. It is
proximity, bounded, within one section, between discrete cards. If the founder rules that
"remove entirely" covers the track too, the fallback is one declaration
(`scroll-snap-type: none` on the track) and the rest of the affordance stands. Under
`prefers-reduced-motion: reduce` the track's snap turns off (a post-gesture user-agent glide —
the same profile that ruling was always about); paging by plain scroll is unaffected.

**One-screen budget, measured** (Blink, real tokens, real strings): track 473.3px tall; content
bottom 612.1px from section top at 1280 × 700 (`--gap-section` resolves 98px) and 626.1px at
1280 × 800 (112px). **With the section's start scrolled under the sticky bar (fragment or
`scrollIntoView()` landing at `--scroll-pad`), the track's bottom edge sits at 684.1px of a
700px viewport and 698.1px of an 800px one** — the whole section inside one screen at both common
laptop heights, with the `--sheet-pad` = 24px ruling (§6.4) as part of the budget. Section height
686.1px at 1280, measured identical before and after the meta line landed.

**Phone ruling (DEC-057): the stack stays, and it gains orientation.** Below `--bp-wide` the
track un-tracks (block flow, no overflow, no bleed — the media query scopes the whole
construction) and sheets stack at `--gap-major`. The founder's finding from the rendered phone
was that four stacked sheets read *far too long*; the honest measurements of every alternative:

| Phone candidate | Measured | Disqualifier |
|---|---|---|
| Paged track at 375 | sheets 650.8–679.7px vs a 553px fold | two-axis navigation of clipped documents (DEC-051's rejection, still true) |
| Exclusive accordion (`<details name>`, three sheets collapsed to title + meta) | ≈2 screens | hides 12 of 16 rows of founder testimony behind taps; text inside closed sheets is invisible to Safari's find-in-page — and find-in-page is a committed reader path *and* one of the founder's own re-gate phone checks. DEC-043 also bars sheets that demand work from a non-technical reader |
| Un-carding the sheets on phone | saves ≈200px of 3071 (6.5%) | breaks the spec-sheet motif for a saving that changes nothing about the felt length |
| **Stacked + ordinals (ships)** | **3071px at 375, 3364.5px at 320** — the ordinal costs +28.5px per sheet where it wraps to its own line | — |

What was actually wrong with the judged stack was not its height but its *anonymity*: four
near-identical gray cards, three of four stamped `FRAMEWORK — 2026-…`, no extent, no progress, no
end in sight. The ordinal fixes precisely that: `SHEET 2 OF 4` on every card tells the phone
reader where they are, how much remains, and when they are done — and the length itself is the
content's honest size. One idea per screen is the page's own rule; four ideas at roughly a screen
each is that rule holding, now legible as progress instead of reading as a wall. The removal of
page snapping (DEC-057) also retires the scroll-fight half of the phone finding.
No horizontal scroll at 320/360/375/390 (measured, document and track).

**200% zoom** (720 × 450 CSS): 720px sits below `--bp-wide`, so zoomed readers get the stacked
path — every sheet reachable by vertical scroll alone, no horizontal scroll, which is what keeps
the track compatible with the shell's zoom promise.

### Wireframe — desktop ≥ `--bp-wide`

```
│ ──┤ ▸ §04 · THE DECISIONS ├──────────────────────────────────│  shell chrome (h2)
│                                                              │
│  ┌──────────────────────────────────┐  ┌─────────────────────  ⟵ cut at the
│  │ I optimized what each agent      │  │ Any rule a script c │    SCREEN edge,
│  │ reads, not how they talk.        │  │ enforces.           │    no dead strip
│  │ FRAMEWORK — 2026-04-24  SHEET 1 OF 4  FRAMEWORK — 2026-06 │  (2) meta line:
│  │                                  │  │                     │      stamp + ordinal
│  │ DECISION    Each agent gets a    │  │ DECISION    Mechani │  (3) label col 6rem │
│  │             curated brief: …     │  │             judgme  │      prose ≤64ch cap
│  │ ──────────────────────────────   │  │ ─────────────────   │
│  │ PROBLEM     What breaks isn't …  │  │ PROBLEM     AI fol  │
│  │ ──────────────────────────────   │  │ ─────────────────   │
│  │ TRADE-OFF   Questions between …  │  │ TRADE-OFF   Hard f  │
│  │ ──────────────────────────────   │  │ ─────────────────   │
│  │▌MECHANISM   Three reading tiers  │  │▌MECHANISM   Autom   │  (4) 2px rust bar
│  └──────────────────────────────────┘  └─────────────────────
│  ▬▬▬▬▬▬▬▬▬▬▬▬   ░░░░░░░░░░░░   ░░░░░░░░░░░░   ░░░░░░░░░░░░   (6) the indicator
│   rail → sheet 1 · 640px      sheet 2 runs off the screen (5)
│  ⟵ x-proximity track: sheets 3 · 4 off-canvas ⟶              │
```

### Wireframe — phone 375

```
   ──┤ ▸ §04 · THE DECISIONS ├──
   ┌──────────────────────────────┐
   │ I optimized what each        │ (1) ≤3 lines at 375
   │ agent reads, not how         │
   │ they talk.                   │
   │ FRAMEWORK — 2026-04-24       │ (2) meta line; the
   │                 SHEET 1 OF 4 │     ordinal wraps to its
   │                              │     own right-aligned
   │ DECISION                     │     line on the phone
   │ Each agent gets a curated    │ (3) label above value,
   │ brief: what its task …       │     27ch prose, no
   │ ──────────────────────────   │     horizontal scroll
   │ PROBLEM                      │
   │ …                            │
   │ ──────────────────────────   │
   │ TRADE-OFF                    │
   │ …                            │
   │ ──────────────────────────   │
   │▌MECHANISM                    │ (4) same mark, same
   │ Three reading tiers; the …   │     12px card inset
   └──────────────────────────────┘
      --gap-major, then sheet 2      (stacked, ~one sheet per
                                      screen; SHEET n OF 4 is
                                      the progress read — §8.1)
```

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Title sentence | §4 — h3, sans bold at kicker scale, sentence case, `<em>` preserved |
| 2 | Meta line | §5 — stamp (one text slot, four verified dates) + `SHEET n OF 4` ordinal at the line's end, both micro muted |
| 3 | Rows | §6 — fixed 6rem label column ≥`--bp-wide`, stacked below; prose ≤64ch cap |
| 4 | Mechanism row | §7 — 2px rust bar at 12px from card inner edge, ink-bold label |
| 5 | The cut | §8.1 — the next sheet runs off the screen edge (width-dependent share; 488px of sheet 2 at 1280); one of three affordance channels |
| 6 | The indicator | §8.1 — one 2px segment per sheet, rail → rail-end under the track; sheet at rest in `--accent`, rest `--hair`; discrete, `aria-hidden`, desktop only |

Measured line counts (shipping strings) for the build to sanity-check against:

| Viewport | Titles (1–4) | Row bodies | Longest stamp |
|---|---|---|---|
| 320 | 3L / 3L / 4L / 3L | 2–4L | 2L |
| 375 | 3L / 2L / 3L / 3L | 2–3L | 2L |
| 390 | 3L / 2L / 3L / 3L | 2–3L | 2L |
| 1280 (track) | 2L / 2L / 2L / 2L | 1–2L | 1L |

## 9. Both themes, contrast — stated per token pair

Every pair below is the shell's measured table (§2.2); this section introduces no new pair and no
thirteenth colour.

| Element | Pair | Dark | Light | Floor |
|---|---|---|---|---|
| Title, row prose, mech label | `--ink` on `--surface` | 13.23 | 13.64 | 4.5 ✓ AAA |
| Row labels, stamps | `--muted` on `--surface` | 5.16 | 5.76 | 4.5 ✓ (labels/captions only) |
| Mechanism mark (graphical) | `--accent` on `--surface` | 3.86 | 4.89 | 3.0 ✓ UI/graphics |
| Indicator, active segment (graphical) | `--accent` on `--ground` | 4.19 | 4.35 | 3.0 ✓ UI/graphics |
| Indicator, inactive segments | `--hair` on `--ground` | decorative | decorative | extent rides in the ordinals' text, never in these alone |
| Row rules, card border | `--hair` on `--surface` | decorative | decorative | never information-bearing alone |

The banned pair — `--ink` on `--accent`, 3.43 / 2.79 — appears nowhere: §4 contains no filled rust
and no rust text (§7.3).

## 10. States, motion, interaction

- **§4 is fully static.** No animation, no transition, no count-up (there are no metrics here —
  stamps are provenance, not measurements; the ordinal is a static span). The motion budget is
  closed at the shell's two elements plus the cursor, and this section holds no seat: the
  indicator's state change is a discrete class toggle with no transition — a repaint, not
  motion — asserted as such in both paths (§12.19). The track's snap settle is the user agent
  finishing the reader's own gesture, not an element animation, and it is off under reduced
  motion. The track is the page's only snap container — the page's own section snapping was
  removed by founder ruling (`page-shell.md` §7.1, DEC-057).
- **Reduced motion / no JS: identical render, complete content.** The track is CSS overflow; with
  snap off (reduced motion) it pages by plain scroll, and the indicator behaves identically in
  both paths (nothing animates either way). The section's one script is the indicator's observer —
  state display only (§8.1); with JavaScript absent the shipped markup renders segment 1 active,
  which is true at the track's load rest, and the ordinals carry position thereafter.
- **Interactive inventory: one focusable element — the track itself** (`tabindex="0"`, named
  `The four decisions`), so keyboard users can scroll sheets 2–4 into view at desktop. Nothing
  inside a sheet is interactive: no links, no controls. Below `--bp-wide` the attribute remains
  (the markup is static and no JS exists to toggle it), which costs one tab stop on a
  non-scrolling list — accepted: the stop is named, skippable, and harms nothing, where a JS
  toggle would be machinery and an unconditional removal would strand desktop keyboard users.
  Find-in-page and select-and-copy hit real text everywhere (the uppercase label/stamp casing is
  transform-only; copied text yields the source casing per engine behavior); a find match in an
  off-canvas sheet scrolls the track to reveal it, and the scroll-into-view path is asserted as
  its mechanical stand-in in the two forms DEC-053 ruled (§12.16): with the track's snap on, the
  reveal is re-aligned to a sheet start and lands the match's sheet substantially on screen;
  whole-visible is asserted on the snap-off (reduced-motion) path.
- Forced colors: card and row borders are real borders and survive; the mark is a background and
  drops — correct, it is decorative duplication of what position and weight already carry.

## 11. Accessibility

- **Heading tree**: `§04 · THE DECISIONS` (h2, shell) → four h3 title sentences. No skips; no other
  headings in the section.
- **Announced structure** (measured, Blink AX tree): a 4-item list named `The four decisions`; each
  item a heading (full title sentence, `<em>` content included) followed by a description list of
  exactly four term/definition pairs in row order. The stamp is announced between heading and list
  as plain text — category first, which orients before the rows arrive. Screen-reader access is
  layout-independent: the virtual cursor reads all four sheets regardless of the track's scroll
  position.
- **Keyboard**: the track is the tab stop (§10); with it focused, arrow keys scroll it — verified
  with real key events at the build (`Input.dispatchKeyEvent`, the established practice: the
  programmatic form lies about snapping).
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
   string (case-insensitive vs the transform), and **each stamp's date is byte-equal to its
   DEC-044-verified value** — the stamps are the independent-arrival argument, and a transposed
   date on the one section whose premise is checkable dates is a launch-grade defect. Fails if a
   date drifts, is reformatted, or a numeral appears in §4 outside the four stamps and the four
   ordinals (the ordinal's numerals are chrome and self-verifying — assertion 18 pins them to the
   DOM; any other numeral in the section is still a defect).
4. **Meta-line position** — the meta line (stamp + ordinal) is the h3's next element sibling,
   before the rows, with the stamp its first content (the announced order stays title → stamp →
   rows; the ordinal is `aria-hidden`). Fails if reordered or if the ordinal enters the announced
   stream.
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
    non-default transition, in default **and** reduced-motion paths; the section contains exactly
    one focusable element — the track. (The brand-rule static-assertion pattern, applied to a
    whole section.) Fails if sheet content becomes interactive or the track loses its tab stop.
11. **Heading discipline** — within `#the-decisions`: one h2, exactly four h3, nothing deeper.
12. **List semantics** — the `<ol>` exposes list role with four items in the AX tree despite
    `list-style: none`, and its accessible name is the visible-purpose label `The four decisions`.
13. **One screen** — at 1280 × 700 with §4's start scrolled under the bar (fragment or
    `scrollIntoView()` landing at `--scroll-pad` — the page no longer snaps), the track's bottom
    edge sits within the viewport. Read the elements and the live `--gap-section`, never this
    file's figures, so the check follows any padding or copy change. Fails the moment §4 exceeds
    the screen DEC-043 ruled.
14. **Track mechanics and the bleed** — at ≥ `--bp-wide` the track is horizontally scrollable
    (`scrollWidth > clientWidth`), computes `scroll-snap-type` `"x"` (proximity serialises out —
    the A1 lesson), and every sheet computes `scroll-snap-align: start` with the track as its
    nearest scroll container; under `prefers-reduced-motion: reduce` the track's snap-type is
    `none`. The bleed holds as relationships: the track's border box spans the viewport's width;
    at `scrollLeft` 0 sheet 1's inline-start equals the container's content inline-start (the
    rail); fully scrolled, sheet 4's inline-end equals the rail-end; and the document's
    `scrollWidth` equals the viewport width (the bleed leaks no page-level x scroll). Fails if
    the snap binds to the root, goes `mandatory`, survives reduced motion, or the track shears
    off the rail.
15. **The cut** — at the track's rest position at 1280, sheet 2's box intersects the viewport
    **and** extends beyond the physical screen edge, with no rendered ground between the track's
    inline-end and the viewport edge (the dead strip stays gone). Width-scoped deliberately: at
    widths where a whole number of sheets fits (~≥1590px) no cut exists and the ordinal +
    indicator carry the affordance — the assertion pins the budgeted case, not every width. Fails if
    `--sheet-w` grows to fill the scrollport or the track returns to a container-edge clip.
16. **Every sheet reachable** — with the track focused, `ArrowRight` (real key events) strictly
    increases `scrollLeft` until sheet 4's inline-end edge is inside the track's box; and
    `scrollIntoView()` on sheet 3's last `<dd>` behaves per DEC-053's two shipped forms — snap
    on: the reveal re-aligns to a sheet start with the match's sheet substantially on screen;
    snap off (reduced motion): the target lands whole. Fails if the track traps or clips beyond
    those forms.
17. **Phone un-track** — below `--bp-wide`: the track has no horizontal overflow
    (`scrollWidth === clientWidth`), no bleed (its border box stays inside the container), and
    each sheet's top edge ≥ the previous sheet's bottom edge (the stack). Fails if the track or
    the bleed leaks into the stacked path.
18. **The ordinal** — exactly one `.sheet__ordinal` per sheet, `aria-hidden`, absent from the AX
    tree; its text equals `SHEET n OF m` where `n` is the sheet's 1-based DOM position and `m`
    the list's rendered length (read both from the DOM, never from this file); it sets in
    `--text-micro` `--muted` and never computes the accent. Fails if an ordinal drifts from its
    position, the count hardcodes, it enters the announced stream, or it dresses as a metric.
19. **The indicator** — at ≥ `--bp-wide`, six clauses, each a relationship:
    (a) exactly one indicator row exists, `aria-hidden`, absent from the AX tree, and its segment
    count equals the rendered sheet count — both read from the DOM, never from this file;
    (b) its border box spans the container's content width — inline-start on the rail, inline-end
    on the rail-end, ≤ 1px — the alignment the finding it answers was about;
    (c) each segment's block-size equals the mechanism mark's 2px stroke — the page's single
    accent-mark weight, bound to its sibling so the two move together or the check fails;
    (d) exactly one segment computes the accent as `background-color` (never `color`) at any rest,
    and after real-key scrolling to sheet 2's rest the active segment is the second — the state
    tracks the rest, not a constant;
    (e) no segment and no indicator element carries a non-`none` animation or a non-default
    transition, in default **and** reduced-motion paths — the discrete-state guarantee that keeps
    the motion budget closed;
    (f) the track computes `scrollbar-width: none` (the retired scrollbar must not silently
    return as a second, misaligned channel), and below `--bp-wide` no indicator renders.
    Fails if the count hardcodes, the row shears off the rail, a segment animates, the state
    sticks at 1, or the scrollbar comes back.

## 13. Existing harness sites this round re-bases

The build that lands this spec meets a harness that already asserts both the container-edge peek
and the whole page-snap feature. The known sites, so nothing is cleaned by accident or left
asserting a retired behaviour:

- **`tests/verify-shell.mjs` "Section scrolling" block (~`:2953` on the judged tree)** — the page
  y-snap assertions. Every one is dispositioned in `page-shell.md` §7.1's retirement inventory
  (A1 inverts, A2/A8/A9 keep, A3/A4/A10/A11 re-base, A5 re-scopes to the track, A6/A7 retire).
  `.section--no-snap` and its markup comment leave `index.html` with them.
- **`tests/verify-shell.mjs` §4 track checks (~`:1395–1647`)** — the track's snap-to-itself,
  one-screen, reveal-share and reduced-motion checks survive with two re-bases: the one-screen
  landing no longer arrives by page snap (§12.13's fragment/`scrollIntoView` path), and the
  rest-position geometry gains the bleed relationships (§12.14–15). The DEC-053 reveal checks
  (`:1590–1647`) are already the two forms §12.16 now states — the spec catches up to the build.
- **`tests/qa-fullpage-sweep.mjs` scroll-snap-titled checks (~`:386–470`)** — keyboard paging,
  centre-if-needed find, 200% zoom: subjects survive, claims re-word (they never depended on
  snapping to be true).
- The audit's 64ch reading-measure probe keeps its permanent target in **§3's paragraph**;
  `.sheet__row dd` renders ~46 characters on the track by design (§6.2).
- The mechanism marks stay in the audit's decorative-construction sweep, painted with
  `background-color` so the small-rust-text sweep never sees them (§7.3). The ordinal joins the
  muted-label family and must never compute the accent (§12.18).
- **New assertions this spec plants**: §12.14's bleed relationships, §12.15's screen-edge cut,
  §12.18's ordinal, §12.19's indicator clauses — each proven able to go red at the build, per
  the standing planted-violation practice. The retired scrollbar-gauge's computed-style checks
  (`scrollbar-width: thin` + accent `scrollbar-color`) must not survive as written — §12.19(f)
  now asserts the inverse (`scrollbar-width: none`), so a leftover copy of the old check is a
  guaranteed contradiction, not dead weight.

## 14. Provenance — seed lock vs. decided here

**Locked by founder rulings** (`decision-log.md`): the four decisions, their order (strongest
first), and all four stamp dates, each verified by `git log` (DEC-044); the non-technical
audience, the plain language with its never-inflate guardrail, and the one-desktop-screen
requirement with layout decided after the copy's measured lengths (DEC-043).

**Locked by the seed (authoritative, surviving DEC-044's re-selection)**: the spec-sheet motif
itself; the bolded title sentence per decision; Decision / Problem / Trade-off / Mechanism rows,
in that order, each ending in its mechanism; dates as small stamps; first person (R7); every
colour, face, and surface rule via the shell.

**From the copy file**: every string — titles, stamps, row values — verbatim, under its stated
≤45-word row / ≤12-word title ceilings.

**Decided here (the craft)**: the horizontal paged track as the one-screen answer, with its
measured budget and the 40rem sheet page; the paging affordance system (DEC-057) — the
viewport-spanning scrollport with its token-derived bleed so the cut lands on the screen edge,
the `SHEET n OF 4` ordinal as the width-independent channel in real spec-sheet grammar, and the
segmented indicator as the always-visible position channel, rail-aligned, succeeding the styled
scrollbar (DEC-060); x-proximity snap scoped to the track, retained as what
keeps the track's rests composed; the track as the section's single named tab stop; the stacked
phone form re-ruled with the ordinal as its orientation and its full measured cost and rejected
alternatives on the record (§8.1); the single-text-slot stamp with no structured date field and
the meta line pairing it with the ordinal; parens-as-enclosure dropped in render; title at kicker
scale in sans bold sentence case and the first-person-as-face ruling (§4); the fixed 6rem label
column with its measured headroom; the 64ch ruling — the cap ships on the prose and the track's
page width governs the rendered measure (§6.2); the stacked single-column row grammar below
`--bp-wide`; the mechanism emphasis system (12px-inset rust bar as the accent-mark idiom's third
seat + ink-bold label, zero rust text in the section); sheets as `--surface` cards without
registration marks (documents, not instruments); `<ol role="list">` / h3 / `<dl>` markup and the
announced structure.

**From the direction reference, as feel cues only (A-003 — it never ships)**: the calm density of a
bordered card holding labelled rows. **Present in the reference and deliberately not inherited**: its
muted-toned feed prose (founder prose here is full-ink `--ink` — A-007); its rust small-caps words
(zero rust text in this section); its blurred/glassy chrome (sheets are matte and opaque); the
`amber` class name (the accent is rust).

Nothing in this file is open. Every value is a founder ruling's, the shell's, or measured here.
