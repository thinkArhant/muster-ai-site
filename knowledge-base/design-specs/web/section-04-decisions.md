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
    <span class="sheet__stamp t-micro">framework — 2026-04-24</span>
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
air whose pages nearly fill the container and demote the peek affordance to a sliver. At 40rem the
sheet keeps a document's proportions: title at two lines, rows at one to two, and 360px of the next
sheet visible (§8.1). The original protection — the label column must never steal reading width —
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
discoverability cost: sideways content is missable. That cost is paid for, not ignored:

- **The peek is the affordance.** `--sheet-w: 40rem` (640px) leaves **360px of sheet 2 visible**
  at 1280 — over a third of the next page, its title readable, unmistakably cut by the edge.
  Nothing communicates "more this way" more honestly than the content itself, cropped.
- **The skim layer survives without scrolling.** The four h3 title sentences remain the section's
  argument skeleton for heading navigation regardless of scroll position, and the count is four —
  a page turn, not a carousel of unknown length.
- **No machinery.** The track is CSS overflow with proximity snap — no buttons, no dots, no JS.
  A control strip would be more chrome than the content it pages.

**Construction**: the `<ol>` becomes the track at ≥ `--bp-wide` — `display: grid;
grid-auto-flow: column; grid-auto-columns: var(--sheet-w); gap: --gap-flow; overflow-x: auto;
scroll-snap-type: x proximity`, each sheet `scroll-snap-align: start`. Grid stretch equalizes the
four sheets to the tallest (measured: all four at 473.3px). The track carries `tabindex="0"` and
`aria-label="The four decisions"` so keyboard users can scroll it (§11); the scrollbar renders
per platform and is never hidden.

**Snap scope**: the sheets snap to the *track* — their nearest scroll container — never to the
document's y axis. `page-shell.md` §7.1 A4 is amended to scope its no-other-snap-align sweep to
elements outside this track. Under `prefers-reduced-motion: reduce` the track's snap turns off
with the page's (same profile: a post-gesture user-agent glide), in the same media query; paging
by plain scroll is unaffected.

**One-screen budget, measured** (Blink, real tokens, real strings): track 473.3px tall; content
bottom 612.1px from section top at 1280 × 700 (`--gap-section` resolves 98px) and 626.1px at
1280 × 800 (112px). **Snapped under the sticky bar, the track's bottom edge sits at 684.1px of a
700px viewport and 698.1px of an 800px one** — the whole section inside one screen at both common
laptop heights, with the `--sheet-pad` = 24px ruling (§6.4) as part of the budget.

**Phone ruling — stacked, and why not paged**: below `--bp-wide` the track un-tracks (block flow,
no overflow) and sheets stack at `--gap-major`. Measured cost, stated honestly: sheets at 375px
run 631.8 / 629.5 / 648.3 / 660.7px — each roughly one phone screen, the section about five
(2786.4px total; 3079.9px at 320) — so §4 on a phone is one idea per screen, not one section per
screen. The one-screen ruling is desktop-scoped (DEC-043 set it against a desktop screen); paging
was rejected on the phone because a sheet is taller than the 553px fold, and horizontally paging
cards that also scroll vertically is two-axis navigation of clipped documents — strictly worse
than the scroll the reader is already doing. No horizontal scroll at 320/360/375/390 (measured,
document and track).

**200% zoom** (720 × 450 CSS): 720px sits below `--bp-wide`, so zoomed readers get the stacked
path — every sheet reachable by vertical scroll alone, no horizontal scroll, which is what keeps
the track compatible with the shell's zoom promise.

### Wireframe — desktop ≥ `--bp-wide`

```
│ ──┤ ▸ §04 · THE DECISIONS ├──────────────────────────────── │  shell chrome (h2)
│                                                             │
│  ┌──────────────────────────────────┐ ┌───────────────────  │
│  │ I optimized what each agent      │ │ Any rule a script   │  (1) h3, 2L in track
│  │ reads, not how they talk.        │ │ can check, a scrip  │
│  │ FRAMEWORK — 2026-04-24           │ │ FRAMEWORK — 2026-0  │  (2) stamp, micro muted
│  │                                  │ │                     │
│  │ DECISION    Each agent gets a    │ │ DECISION    Mechan  │  (3) label col 6rem │
│  │             curated brief: …     │ │             live i  │      prose ≤64ch cap
│  │ ──────────────────────────────   │ │ ─────────────────   │
│  │ PROBLEM     What breaks isn't …  │ │ PROBLEM     AI fol  │
│  │ ──────────────────────────────   │ │ ─────────────────   │
│  │ TRADE-OFF   Agents never talk …  │ │ TRADE-OFF   Hard f  │
│  │ ──────────────────────────────   │ │ ─────────────────   │
│  │▌MECHANISM   Three reading tiers  │ │▌MECHANISM   Autom   │  (4) 2px rust bar
│  └──────────────────────────────────┘ └───────────────────  │
│   sheet 1 · 640px            360px of sheet 2: the peek (5) │
│  ⟵ x-proximity track: sheets 3 · 4 off-canvas ⟶             │
```

### Wireframe — phone 375

```
   ──┤ ▸ §04 · THE DECISIONS ├──
   ┌──────────────────────────────┐
   │ I optimized what each        │ (1) ≤3 lines at 375
   │ agent reads, not how         │
   │ they talk.                   │
   │ FRAMEWORK — 2026-04-24       │ (2) wraps to 2 lines
   │                              │     only on stamp 3
   │ DECISION                     │ (3) label above value,
   │ Each agent gets a curated    │     27ch prose, no
   │ brief: what its task …       │     horizontal scroll
   │ ──────────────────────────   │
   │ PROBLEM                      │
   │ …                            │
   │ ──────────────────────────   │
   │ TRADE-OFF                    │
   │ …                            │
   │ ──────────────────────────   │
   │▌MECHANISM                    │ (4) same mark, same
   │ Three reading tiers; the …   │     12px card inset
   └──────────────────────────────┘
      --gap-major, then sheet 2      (stacked, ~one sheet
                                      per screen — §8.1)
```

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Title sentence | §4 — h3, sans bold at kicker scale, sentence case, `<em>` preserved |
| 2 | Stamp | §5 — one text slot, micro muted, four verified dates |
| 3 | Rows | §6 — fixed 6rem label column ≥`--bp-wide`, stacked below; prose ≤64ch cap |
| 4 | Mechanism row | §7 — 2px rust bar at 12px from card inner edge, ink-bold label |
| 5 | The peek | §8.1 — 360px of the next sheet visible at rest; the paging affordance |

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
| Row rules, card border | `--hair` on `--surface` | decorative | decorative | never information-bearing alone |

The banned pair — `--ink` on `--accent`, 3.43 / 2.79 — appears nowhere: §4 contains no filled rust
and no rust text (§7.3).

## 10. States, motion, interaction

- **§4 is fully static.** No animation, no transition, no scroll-triggered anything, no count-up
  (there are no metrics here — stamps are provenance, not measurements). The motion budget is closed
  at the shell's two elements plus the cursor, and this section holds no seat. The track's snap
  settle is the user agent finishing the reader's own gesture, not an element animation — the same
  scope ruling as the page's y snap (`page-shell.md` §7.1) — and it is off under reduced motion.
- **Reduced motion / no JS: identical render, complete content, zero JavaScript.** The track is CSS
  overflow; with snap off (reduced motion) it pages by plain scroll.
- **Interactive inventory: one focusable element — the track itself** (`tabindex="0"`, named
  `The four decisions`), so keyboard users can scroll sheets 2–4 into view at desktop. Nothing
  inside a sheet is interactive: no links, no controls. Below `--bp-wide` the attribute remains
  (the markup is static and no JS exists to toggle it), which costs one tab stop on a
  non-scrolling list — accepted: the stop is named, skippable, and harms nothing, where a JS
  toggle would be machinery and an unconditional removal would strand desktop keyboard users.
  Find-in-page and select-and-copy hit real text everywhere (the uppercase label/stamp casing is
  transform-only; copied text yields the source casing per engine behavior); a find match in an
  off-canvas sheet scrolls the track to reveal it, and the scroll-into-view path is asserted as
  its mechanical stand-in (§12.16).
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
   date drifts, is reformatted, or a numeral appears in §4 outside the four stamps.
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
    non-default transition, in default **and** reduced-motion paths; the section contains exactly
    one focusable element — the track. (The brand-rule static-assertion pattern, applied to a
    whole section.) Fails if sheet content becomes interactive or the track loses its tab stop.
11. **Heading discipline** — within `#the-decisions`: one h2, exactly four h3, nothing deeper.
12. **List semantics** — the `<ol>` exposes list role with four items in the AX tree despite
    `list-style: none`, and its accessible name is the visible-purpose label `The four decisions`.
13. **One screen** — at 1280 × 700 with §4 scrolled to its snap rest, the track's bottom edge sits
    within the viewport. Read the elements and the live `--gap-section`, never this file's
    figures, so the check follows any padding or copy change. Fails the moment §4 exceeds the
    screen DEC-043 ruled.
14. **Track mechanics** — at ≥ `--bp-wide` the track is horizontally scrollable
    (`scrollWidth > clientWidth`), computes `scroll-snap-type` `"x"` (proximity serialises out —
    the A1 lesson), and every sheet computes `scroll-snap-align: start` with the track as its
    nearest scroll container; under `prefers-reduced-motion: reduce` the track's snap-type is
    `none`. Fails if the snap binds to the root, goes `mandatory`, or survives reduced motion.
15. **The peek** — at the track's rest position, sheet 2's box intersects the track's visible box
    **and** extends beyond its inline-end edge (partially cut — the paging affordance). Fails if
    `--sheet-w` grows to fill the container and the cue disappears.
16. **Every sheet reachable** — with the track focused, `ArrowRight` (real key events) strictly
    increases `scrollLeft` until sheet 4's inline-end edge is inside the track's box; and
    `scrollIntoView()` on sheet 3's last `<dd>` lands it fully visible (the mechanical stand-in
    for find-in-page reaching off-canvas content). Fails if the track traps or clips.
17. **Phone un-track** — below `--bp-wide`: the track has no horizontal overflow
    (`scrollWidth === clientWidth`) and each sheet's top edge ≥ the previous sheet's bottom edge
    (the stack). Fails if the track leaks into the stacked path.

## 13. Existing harness sites — one spec-level re-base, two pointers

No shipped check in `tests/verify-shell.mjs` or `tests/qa-independent-audit.mjs` asserts anything
about `#the-decisions` beyond the shell placeholder, whose counts drop symmetrically when the
section lands (the placeholder-count checks compare across states and survive, per the shell's
established pattern). Neither harness contains a scroll-snap check yet (verified by grep — those
land with the scroll-snap build step), so the A4 amendment below is spec-level only:

- **`page-shell.md` §7.1 A4 is amended by this spec**: its no-other-snap-align sweep now scopes to
  elements *outside* the §4 track — the track's sheets snap to the track, their nearest scroll
  container, and never bind to the document's y axis. The scroll-snap build step implements A4 in
  its amended form.
- The audit's 64ch reading-measure probe finds its permanent target in **§3's paragraph** — the
  page's largest single body of reading prose at the full 64ch measure. `.sheet__row dd` is no
  longer the exemplar: on the track it renders ~46 rendered characters by design (§6.2).
- The mechanism marks join the audit's decorative-construction sweep alongside the replay's marks,
  and they must be painted with `background-color` so the small-rust-text sweep (keyed on computed
  `color`) never sees them (§7.3).

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
measured budget, the 40rem sheet page, the 360px peek as the paging affordance, x-proximity snap
scoped to the track (and page-shell A4's amended sweep), the track as the section's single named
tab stop, and the stacked phone form with its stated cost; the single-text-slot stamp with no
structured date field; parens-as-enclosure dropped in render; title at kicker scale in sans bold
sentence case and the first-person-as-face ruling (§4); the fixed 6rem label column with its
measured headroom; the 64ch ruling — the cap ships on the prose and the track's page width governs
the rendered measure (§6.2); the stacked single-column row grammar below `--bp-wide`; the
mechanism emphasis system (12px-inset rust bar as the accent-mark idiom's third seat + ink-bold
label, zero rust text in the section); sheets as `--surface` cards without registration marks
(documents, not instruments); `<ol role="list">` / h3 / `<dl>` markup and the announced structure.

**From the direction reference, as feel cues only (A-003 — it never ships)**: the calm density of a
bordered card holding labelled rows. **Present in the reference and deliberately not inherited**: its
muted-toned feed prose (founder prose here is full-ink `--ink` — A-007); its rust small-caps words
(zero rust text in this section); its blurred/glassy chrome (sheets are matte and opaque); the
`amber` class name (the accent is rust).

Nothing in this file is open. Every value is a founder ruling's, the shell's, or measured here.
