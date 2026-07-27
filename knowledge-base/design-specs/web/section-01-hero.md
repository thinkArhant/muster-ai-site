# §1 — Hero: the five-second verdict

**Surface type**: page section (§1 of 6) — the page's opening claim and its proof, in one screen
**Consumers**: Developer (builds §1 and the rendered headline samples from this file), QA (derives validation scope), PM (reviews against the copy file and the seed), the founder (selects the headline from rendered candidates)
**Inherits**: every token in `page-shell.md`; the terminal component, emphasis rules and left-edge system in `section-02-replay.md` §9–§9.2; the pennant rulings in `brand-seats.md`. One shell token is amended by this spec (§4.1) — the amendment lives in `page-shell.md` §3 and the measurement that forced it lives here.
**Copy**: every string in this section is `design-specs/web/section-01-copy.md`'s, verbatim. This file specifies treatment, never wording.
**Authority**: `product-spec-seed.md` §1 is the element inventory; nothing is added to it and nothing dropped. `bodh-sprint4-corpus.md` (read-only) is the only source of terminal content.

---

## 1. What §1 is

The message that must land in five seconds: *one person plus a governed AI team ships real
products — here is the measured proof.* Eight elements carry it: the eyebrow facts, the headline,
the subline, the measured line, the dual build readout with its `VERIFY ⎘` chip, the streaming
terminal, the roster formation, and one `curl`. The hero carries no stencil tag and no separator
pennant — its `<h1>` is the section's heading (`page-shell.md` §11, `brand-seats.md` §5).

## 2. Content hierarchy

1. **Headline + subline** — the claim, and who does the work (AI, named as such)
2. **The measured line** — the proof sentence; **visible without scrolling** (seed §1), enforced by §3's budget
3. **The dual build readout + `VERIFY ⎘`** — the receipts, scope-labelled, checkable
4. **The streaming terminal** — real work happening, previewing §2
5. **The formation** — the eight roles; this IS the roster (no separate roster section exists)
6. **The `curl`** — the action; §6 owns the canonical instance and the page's only cursor
7. **Eyebrow facts** — orientation: open source · runs in Claude Code · v4 · MIT

Document order follows this ranking exactly, at every viewport: the verdict stack (7 → 1 → 1 → 2),
then 3, then 4, then 5, then 6. Whole-product proof (2, 3) is kept contiguous and the wave-scope
terminal (4) sits after it, never interleaved — that ordering is part of the scope system (§10).

## 3. Above-the-fold budget — the falsifiability contract

"Visible without scrolling" binds as a measured budget at a named viewport, the same discipline as
the §2 mobile budget. **The budget case is 375 × 553 — iPhone SE, mobile Safari, toolbars shown**
(the visual viewport, not the 667px device height). Figures below are rendered measurements in
headless Blink against the real tokens with the §4.1 floor in force, not derivations:

| Item | Derivation | px |
|---|---|---|
| Sticky status bar | shell §9, `3rem` | 48.0 |
| Hero top padding | `--gap-section` floor (`.section--hero`) | 96.0 |
| Eyebrow | 2 lines × (`--text-label` 12px × 1.4) — wraps below ~459px viewport | 33.6 |
| Eyebrow → h1 | `--gap-hairline` | 12.0 |
| Headline (candidate B, the longest with D) | 3 lines × (28px × `--lead-display` 1.05) | 88.2 |
| h1 → subline | `--gap-flow` | 24.0 |
| Subline | 2 lines × (`--text-lead` 17px × 1.6) | 54.4 |
| Subline → measured line | `--gap-flow` | 24.0 |
| **Measured line (primary form), bottom edge** | 3 lines × 27.2 | **461.8** |

**The measured line's bottom edge sits at 461.8px against the 553px fold — 91.2px clear.** The
guarantee therefore holds on any portrait viewport with ≥462px of visual height at ≥360px width
(at 320px width the stack runs taller — bottom edge 507.9px — so the floor there is 508px).
Desktop: at 1280 × 700 the bottom edge measures 427.6px, and the readout's first row and the
terminal chrome are also on screen. **Landscape phone (667 × 331 visual) cannot hold the full
verdict stack** — the measured line's bottom edge lands at ~439px — and this spec does not contort
the hero to claim otherwise: the budget names its cases rather than asserting "every viewport,"
which is unfalsifiable. What is above the landscape fold is the eyebrow, the headline and the
subline's first line.

The **primary** measured-line form ships at every viewport — measured, it fits the budget case
with 91px to spare, so the compact form is not spent. The compact form is the named fallback if a
future change tightens this budget; whoever spends it records the new bottom-edge figure here.

## 4. The headline

Four candidates exist in the copy file; one ships after selection and the others leave the copy
file. All four set in `--text-display` — mono bold, uppercase (`text-transform`, source text stays
sentence case), `--track-display`, `--lead-display`, `--ink`. The h1 keeps `id="hero-title"` and
the section keeps `aria-labelledby="hero-title"` (landmark tree and the existing harness contrast
probe both key on it).

### 4.1 The display floor — re-measured against the real strings

`--text-display` is amended in `page-shell.md` §3 to `clamp(1.75rem, 6.5vw, 4.25rem)`. The prior
floor (2.4rem = 38.4px) was set before any real headline string existed; measured against the
candidates it produces a 14-character line at 360px, which sets candidate B on **four to five
broken lines** and **overflows the 320px viewport inside the unbreakable struck phrase** — a
horizontal-scroll defect no wrap rule can fix at that size. At the 28px floor, measured in Blink
at 320/360/375/390: A and C set 2 lines, B and D set 3, nothing overflows, and every line is a
whole phrase (§4.2). The ceiling (4.25rem) and the growth slope (6.5vw) are untouched; above
~431px the rendered size is identical to before. 28px bold keeps every accent use in this section
at AA-large (≥19px bold — shell §2.2).

### 4.2 Break units — lines are phrases, never accidents

Wrapping is controlled by `white-space: nowrap` on phrase spans, not by `<br>`:

- **Candidate B**: the struck phrase `a human team` and the accent phrase `AI agents.` are each one
  unbreakable unit. Measured composition: 3 lines at 360–390px (`SHIP A PRODUCT` / `WITH A HUMAN
  TEAM` / `AI AGENTS.`), 2 lines at desktop (`SHIP A PRODUCT WITH` / `A HUMAN TEAM AI AGENTS.`).
  A strike or an accent that breaks mid-phrase is a defect.
- **Candidate D**: `muster` is the accent unit; natural wrap otherwise (3 lines on phones).
- **Candidates A and C**: natural wrap; the sentence boundary is where the break falls at every
  measured viewport (2 lines phone and desktop).

### 4.3 Markup and announced string, per candidate

Struck text is announced as ordinary text by every screen reader, so candidate B's accessible name
is built by exclusion: the struck phrase is `aria-hidden` and the computed heading name is the
post-edit sentence. Verified against the Blink AX tree (`Accessibility.getFullAXTree`), not
asserted.

| Candidate | Markup | Computed accessible name |
|---|---|---|
| A | `<h1 id="hero-title">Ship a product. Without a team.</h1>` | `Ship a product. Without a team.` |
| B | `<h1 id="hero-title">Ship a product with <s aria-hidden="true" class="h1__cut">a human team</s> <span class="h1__accent">AI agents.</span></h1>` | `Ship a product with AI agents.` — the struck phrase absent |
| C | `<h1 id="hero-title">Ship a product. The team is <span class="h1__accent">AI.</span></h1>` | `Ship a product. The team is AI.` |
| D | `<h1 id="hero-title">Ship a product with a <span class="h1__accent">muster</span> of AI agents.</h1>` | `Ship a product with a muster of AI agents.` |

- **Case caveat, cross-engine**: Blink computes the name from rendered text, so `text-transform`
  uppercases it (`SHIP A PRODUCT WITH AI AGENTS.` — measured); WebKit computes from source text
  (sentence case). The words are identical; any equality assertion on the announced string is
  **case-insensitive and word-exact**.
- **B's treatment**: the struck phrase is `--ink` with `text-decoration: line-through` at
  `text-decoration-thickness: 0.06em` (≈1.7px at the floor, ≈4px at the ceiling — an edit mark,
  not a hairline). The accent phrase is `--accent` — bold ≥28px is AA-large in both themes
  (4.19/4.35 on `--ground` ≥ 3:1). `<s>` is the element (content no longer accurate), not `<del>`
  (no document edit happened).
- **B's copy behaviour, stated**: selection ignores `aria-hidden`, so select-and-copy yields the
  full visible sentence including the struck phrase. That is the visible truth and is accepted;
  only the *announced* string excludes the edit.
- C and D's accent words carry no aria treatment — their names equal their text.

## 5. Eyebrow, subline, measured line

- **Eyebrow**: `--text-label`, `--muted`, tracked uppercase, above the h1 — the page's opening
  stencil. Markup is a list so the `·` separators are never announced (copy file requirement):
  four `<li>` facts, separators drawn by CSS — `content: "·"; content: "·" / "";` (the second
  declaration strips it from the AX tree; engines without alt-text syntax fall back to the first
  and still render). Each fact is a nowrap unit; below ~459px the list wraps at fact boundaries
  to two lines (budgeted in §3). Announced: the four facts, nothing else.
- **Subline**: `--text-lead`, sans, `--ink` (read prose — full-ink, A-007). One string, shared by
  all candidates; it is what disambiguates candidate A's "without a team" against the roster one
  viewport below.
- **The measured line**: `--text-lead`, sans, `--ink`, primary form (§3). The numeral groups
  (`9.3 hours`, `$147`) set bold with `tabular-nums`; **they stay ink, not rust** — `--text-lead`
  is 17px on phones, below every rust floor, and per-viewport colour switching is exactly the kind
  of shared-value coupling this project retired. Rust proof lives one block down in the readout,
  where the 24px floor is structural. The `→` in `idea → live` stays a text character (announced
  "right arrow" by VoiceOver — honest, and it keeps find-in-page and selection intact; an
  aria-label override on prose is not worth that cost).

## 6. The dual build readout and the `VERIFY ⎘` chip

Shell instrument-cell motif (`page-shell.md` §8). Two row-groups, **THIS SITE above BODH** (seed
§1), each group scope-labelled with the copy file's strings. Strings, order and dashes are the copy
file's §7 table verbatim.

- **Group label**: `--text-label`, `--muted` — `THIS SITE · SPEC → LIVE` / `BODH · IDEA → LIVE`.
- **Cells** (three per group): key `--text-micro` `--muted` (`ACTIVE BUILD` · `COST · API LIST` ·
  `SHIPPED`); value `--text-readout`, tabular. BODH values `--accent` flat (24px floor = AA-large,
  both themes). Unmeasured values are `--ink` em-dashes — **dashes never render accent and never
  animate**.
- **THIS SITE caption**: `measured at launch` — `--text-micro`, `--muted`, once under the group.
  Deliberate motif deviation, stated: the motif puts a sub-line under each unmeasured cell; here
  one caption serves the row's two dashes, because the copy file defines one row caption and
  repeating it twice in 48px is noise the restraint rule forbids.
- **Layout**: ≥ `--bp-wide`, cells set three-across per group. Below it each group is a stack of
  key/value rows (key left, value right-aligned, `--hair` rules between) — measured, `bodh.day`
  at the 24px value floor does not fit a third of a phone column, and shrinking the value type to
  force the grid would break the rust floor. Two registration `+` marks (tl, br) on the block —
  the shell's per-surface maximum.
- **Count-up** (motion element 3, shell §10.3): the two numeric BODH values only. `9.3 h` rolls
  `0.0 → 9.3` with the unit static; `$147` rolls `0 → 147` with the `$` static; final frame
  renders the copy string exactly. `bodh.day`, `THIS PAGE` and every dash render static. Triggered
  once at ≥55% cell visibility; reduced motion renders final values immediately. Whatever
  `aria-live` posture the build rules for these cells, assistive tech must never receive
  intermediate frames — the announced value is the final string or nothing.
- **The chip**: shell emphasis chip — `--accent` border, `--ink` text, rust glyph. Markup:
  `<a class="chip chip--emph" href="VERIFY.md" aria-label="Verify these numbers — VERIFY.md">VERIFY <span aria-hidden="true">⎘</span></a>`.
  **`href` is `VERIFY.md`** — same-origin, a click is user navigation, so A-004's zero-runtime-
  request claim is untouched; no prefetch attributes ever. The accessible name is ruled:
  **`Verify these numbers — VERIFY.md`** (contains the visible label "VERIFY" — WCAG 2.5.3
  holds). It seats at the readout block's top-right, beside the THIS SITE group label: the chip
  belongs to the numbers it verifies, not to the page chrome. 44px hit area via padding; the
  visual stays chip-sized.

## 7. The hero terminal

The terminal is §2's component, not a sibling of it. It inherits, and never re-derives: the
`.log` left-edge system and its custom properties `--mark-inset` / `--mark-width` / `--mark-clear`
(`section-02-replay.md` §9.2 — one gutter system, two instances), soft-wrap with the 1ch hanging
indent, entry grouping (`--lead-micro` rows + `--gap-hairline` entry separators below `--bp-wide`;
`--lead-terminal` above), the §9 emphasis system, minute-precision stamps in `--muted` with
content in `--ink`, `<ol>` markup with no `aria-live`, and byte-clean corpus fidelity.

- **Content**: all twelve corpus lines, verbatim. **L12 renders as one corpus line** — the `─────`
  divider is its stamp column — at §9's terminal-state scale (1.25rem bold; `bodh.day · LIVE` may
  set `--accent` at AA-large). L4 and L9 carry the key-beat treatment: bold-ink role/verdict,
  `--accent` glyph, the positioned mark element — on the same `--mark-inset` as §2's, which is what
  makes the two terminals read as one instrument.
- **Chrome**: the shared label strings (copy file §9): `BODH · SPRINT 4 — CONDENSED FROM THE REAL
  BUILD LOG` at ≥ `--bp-wide`, `CONDENSED FROM THE REAL BUILD LOG` below. Always visible. The
  `RUN` lamp is a seat of motion element 2 (the OPERATIONAL pulse — one element, multiple seats:
  status bar, this terminal, §2's terminal). Two registration marks.
- **Geometry**: below `--bp-wide` the terminal is a window of **3 whole entries** (§2's window
  semantics: whole entries only, instant advance by entry pitch, never resting mid-entry, earlier
  lines reachable in the terminal's own vertical overflow, `tabindex="0"` + accessible name +
  visible focus ring). At `--bp-wide` and above, all twelve lines render with no window — the
  container is wide enough that every line sets one row (measured: ≥104 columns at the 960px
  container against L3's 74). The two-column arrangement (§8) engages at 1200px, where a fixed
  623px terminal column still holds one-row entries; the terminal column is **fixed, not a
  share** — the same guarantee mechanism as §2's desktop layout.
- **Accessible name**: the `<ol>` is labelled `Bodh Sprint 4 build log, condensed from the real
  build log`.

### 7.1 Playback — the ambient stream (motion element 1)

The stream is ambient preview, not the replay: no narration, no controls, no beat structure. The
reader who wants the story gets it in §2; this element's job is *real work, streaming, ending
shipped*.

**Schedule**: uniform **1.40s cadence**, with two exceptions that are facts, not pacing: the
same-stamp pairs L1/L2 and L9/L10 reveal exactly one `--reveal` cadence (0.35s) apart — the
simultaneity rule inherited from §2 §5.1 — and the gap before L12 is **2.80s (2 × cadence)**, the
gate's silence in miniature.

| t (s) | 0.00 | 0.35 | 1.75 | 3.15 | 4.55 | 5.95 | 7.35 | 8.75 | 10.15 | 10.50 | 11.90 | 14.70 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Line | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | L11 | L12 |

Reveals are the shell's `--reveal` micro-reveal, opacity-only over lines that occupy their space
from load — nothing reflows. The stream completes in ~15s: inside a reader's first dwell on the
hero, fast enough to read as activity, slow enough that any line can be read (in the 3-entry
window a line stays visible ≥3 cadences ≈ 4.2s; on desktop all lines persist). It **plays once per
page load and does not loop** — a real log that replays itself reads as a screensaver, and the
page's whole posture is that this output is evidence. The resting state is the log ended at
`deploy · bodh.day · LIVE`, which is the strongest still frame the hero can hold.

**Trigger**: starts when the terminal first reaches ≥50% visibility, pauses if it leaves (>50%
out) or the document hides, resumes where it stopped — no motion runs unwatched. End state:
complete log; below `--bp-wide` the window rests on L10 / L11 / L12 with the rest in scrollback.

**Reduced motion / no JS**: no stream, no reveals — the complete log renders immediately in its
end state. Complete content, not a subset; every line rendered and reachable.

## 8. Layout

### Wireframe — desktop ≥1200px

```
│ STATUS BAR  ▌MUSTER_                        ● OPERATIONAL │
│                                                           │
│  OPEN SOURCE · RUNS IN CLAUDE CODE · V4 · MIT         (1) │
│  SHIP A PRODUCT WITH A̶ ̶H̶U̶M̶A̶N̶ ̶T̶E̶A̶M̶ AI AGENTS.        (2) │
│  One operator. Eight AI roles. The queue is the       (3) │
│  org chart.                                               │
│  Bodh — a shipped App Store + web product — idea →    (4) │
│  live: 9.3 hours of active build, $147 in AI tokens.      │
│                                                           │
│  ┌ READOUT ─────────────────┐  ┌ TERMINAL ── 623px ────┐  │
│  │ + THIS SITE · SPEC→LIVE  │  │ + BODH · SPRINT 4 —   │  │
│  │        [VERIFY ⎘] (6)    │  │   CONDENSED FROM THE  │  │
│  │  —      —     THIS PAGE  │  │   REAL BUILD LOG ● RUN│  │
│  │  measured at launch      │  │───────────────────────│  │
│  │ BODH · IDEA → LIVE   (5) │  │ 20:38 muster  sprint… │  │
│  │  9.3 h  $147  bodh.day + │  │ 20:38 ui-ux   produc… │  │
│  └──────────────────────────┘  │ … (12 lines, stream)  │  │
│                                │ ───── deploy bodh.day │  │
│                                │        · LIVE     (7) │  │
│                                └───────────────────────┘  │
│            ┌──────┐                                       │
│            │  PM  │                (8) hub plate          │
│  +─────────┴┬───┬────┬────┬────┬────┬────┬──────────+     │
│  ┌────────┐┌┴──┐┌┴──┐┌┴───┐┌┴────┐┌┴───┐┌┴──────┐         │
│  │DEVELOPER││UI/UX││QA││CONTENT││MARKETING││LEGAL││RESEARCH│
│            8 AI AGENTS · 1 OPERATOR       (9)             │
│                                                           │
│  ┌ curl -fsSL https://raw.githubusercontent.com/… ┐ (10)  │
└───────────────────────────────────────────────────────────┘
```

Between `--bp-wide` and 1200px the readout/terminal row stacks (readout, then terminal, both full
container width); everything else is unchanged. The two-column condition is 1200px because that is
the measured width at which a fixed 623.3px terminal column (74 columns + the 17.91px gutter +
padding + borders) coexists with a readout column that still sets three cells — a section-scoped
condition, not new page chrome.

### Wireframe — phone 375 × 553

```
   OPEN SOURCE · RUNS IN                 (1) eyebrow, wraps at
   CLAUDE CODE · V4 · MIT                    fact boundaries
   SHIP A PRODUCT                        (2) 3 lines, whole
   WITH A̶ ̶H̶U̶M̶A̶N̶ ̶T̶E̶A̶M̶                        phrases (§4.2)
   AI AGENTS.
   One operator. Eight AI roles.         (3) subline
   The queue is the org chart.
   Bodh — a shipped App Store + web      (4) measured line —
   product — idea → live: 9.3 hours          bottom edge 461.8px,
   of active build, $147 in AI tokens.       91.2px above the fold
  ─ ─ ─ ─ ─ ─ fold at 553px ─ ─ ─ ─ ─
   ┌ THIS SITE · SPEC → LIVE  [VERIFY ⎘]┐(5)(6) readout as
   │ ACTIVE BUILD               —       │    stacked key/value
   │ COST · API LIST            —       │    rows below --bp-wide
   │ SHIPPED               THIS PAGE    │
   │  measured at launch                │
   │ BODH · IDEA → LIVE                 │
   │ ACTIVE BUILD             9.3 h     │
   │ COST · API LIST          $147      │
   │ SHIPPED                bodh.day    │
   └────────────────────────────────────┘
   ┌ CONDENSED FROM THE REAL      ● RUN ┐(7) window of 3 whole
   │ BUILD LOG                          │    entries; earlier
   │────────────────────────────────────│    lines in scrollback
   │  21:35  pm       handoffs accepted │
   │   · deploy packet → founder        │
   │  21:43  gate     Role: halt ·      │
   │   awaiting operator                │
   │  ─────  deploy   bodh.day · LIVE   │
   └────────────────────────────────────┘
   ┌ PM ┐                               (8) hub, then the
   ├──┬─┘                                   vertical bus ladder
   │ ┌┴─────────┐
   │ │DEVELOPER │  … (7 plates)
   8 AI AGENTS · 1 OPERATOR             (9)
   ┌ curl -fsSL https://raw.githubuser… ┐(10) soft-wraps, no
   │ content.com/… | bash -s my-product │    cursor, no prompt
   └────────────────────────────────────┘
```

`--gap-major` separates the readout block (whole-product scope) from the terminal (wave scope) —
§10. Other inter-block gaps are `--gap-block`.

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Eyebrow | §5 — list markup, separators drawn and unannounced, facts nowrap |
| 2 | Headline | §4 — `id="hero-title"`, candidate treatment, break units, announced string |
| 3 | Subline | §5 — `--text-lead` ink, full-ink rule |
| 4 | Measured line | §5 — primary form, bold ink numerals, tabular; the fold guarantee (§3) |
| 5 | Dual readout | §6 — THIS SITE above BODH, scope labels, dashes ink and static |
| 6 | `VERIFY ⎘` chip | §6 — `href="VERIFY.md"`, name `Verify these numbers — VERIFY.md` |
| 7 | Hero terminal | §7 — §2's component, 12 corpus lines, once-per-load stream, no loop |
| 8 | Formation | §9 — hub + bus-bar, built to the hub-is-PM reading |
| 9 | Formation caption | copy §6 — `8 AI AGENTS · 1 OPERATOR`, `--text-micro` `--muted` |
| 10 | The curl | §11 — exact string, wraps, no cursor, no prompt glyph |

## 9. The formation

The seed's concept visual: a command hub and a bus-bar formation, carrying the roster as labels.
**Built to the hub-is-PM reading**: hub plate `PM`, seven specialist plates on the bus — the
reading in which no role appears twice. The alternative (hub `OPERATOR`, eight plates) is pending
a founder ruling recorded in the orchestration queue; both label sets are final in the copy file,
and switching is a **label change, not a redesign** — same plate component, same bus, the list
gains one item and its accessible label changes with it.

- **Markup**: a `<ul>` labelled `The eight AI roles` — eight `<li>` plates in the copy file's
  order, `PM` first. Announced: the eight role names as a list. The bus, stems and terminals are
  CSS construction (borders and pseudo-elements with no content) — nothing decorative reaches the
  AX tree.
- **Plate**: `--surface`, 1px `--hair` border, sharp corners; role name `--text-label`, `--ink`
  (the names are the roster's content, not captions), tracked uppercase; padding `--gap-hairline`
  inline, `calc(var(--rhythm) / 3)` block. Locked full role names only — never abbreviations.
- **Hub plate**: 1px `--accent` border (4.19/4.35 on ground ≥ 3:1 graphical, both themes), first
  in DOM and visually seated above the bus on a stem. Its distinction rides on **position and
  order as well as colour** — colour is never the sole channel.
- **Bus-bar**: 1px `--hair` horizontal rule; 1 × 12px `--hair` stems from bar to each plate and
  from hub to bar; registration `+` marks (`--text-micro` `--muted`, `aria-hidden`) at both bar
  ends — the shell's regmark styling reused, per the shell motif table. The hairline construction
  is decorative rhythm at 1.36:1 and carries no information the list text and order do not.
- **Caption**: `8 AI AGENTS · 1 OPERATOR` below the formation — `--text-micro`, `--muted`,
  uppercase. It is the R8 attribution at hero altitude and it is true in both hub readings.
- **Responsive**: one horizontal bus row at ≥ `--bp-wide` (measured: seven plates set ~673px
  against the 864px container at the breakpoint). Below it the formation is a vertical ladder —
  hub on top, spine down the inline-start edge, plates stacked at `--gap-hairline` gaps, stems
  from spine to plate. Same DOM, same reading order, both orientations.

## 10. Scope adjacency (A-005) — how wave and whole-product stay distinct

The wave-scope terminal and the whole-product BODH figures share one viewport. This is the page's
likeliest factual failure, and it is handled structurally, not by hoping labels are read:

1. **Contiguous scope blocks, never interleaved.** The whole-product story (measured line +
   readout) is one unbroken run; the wave-scope terminal follows it. No BODH aggregate sits below
   the terminal and no wave artifact sits above it, at any viewport.
2. **`--gap-major` at the scope seam.** The readout → terminal gap is the page's idea-group gap,
   one step up from every other inter-block gap in the section: the seam is spatial as well as
   labelled.
3. **Every surface carries its own scope in its own chrome**: the measured line's scope is inline
   (`idea → live`), the readout rows are scope-labelled (`SPEC → LIVE` / `IDEA → LIVE`), the
   terminal's chrome label says what it streams — always visible, inherited from §2.
4. **No wave numeral exists in §1.** The chain totals (`~64` minutes, `289` calls, `$24.73`)
   appear nowhere in this section — the corpus lines the terminal streams carry timestamps and
   counts of their own facts, but the wave's aggregate figures belong to §2's totals strip alone.
   Asserted, not trusted (§13).
5. **Different component grammar.** Whole-product numbers live only in instrument cells; the wave
   lives only in the log. A reader who never reads a label still never sees the two scopes in the
   same visual form.

## 11. The curl

The copy file's §8 string, byte-identical to the verified form, in a `--surface` card with 1px
`--hair` border and `--gap-hairline` padding, `--text-terminal` mono, `--ink`. It closes the
section: claim → proof → team → command.

- **No cursor** — the §6 curl owns the page's only blink. **No `$` prompt glyph** — a prompt
  invites copy-paste damage and adds a character the command does not have; the command stands
  alone.
- **Wrapping**: `overflow-wrap: anywhere` — the URL is one ~85-character token, wider than every
  phone column, and the page scrolls horizontally nowhere. A soft wrap adds and removes nothing;
  selection yields the exact string at every viewport.
- §6 reuses this treatment and adds the cursor; the two instances are one string, asserted equal.

## 12. Both themes, states, accessibility

- **Both themes first-class** (A-006), no thirteenth value. Contrast pairs used here, from the
  shell's measured table: ink on ground 14.37/12.15 (headline, subline, measured line, curl);
  muted on ground 5.61/5.13 (eyebrow, captions, keys); accent on ground at display bold and at
  readout scale — AA-large 4.19/4.35; accent border on surface 3.86/4.89 ≥ 3:1 (hub plate, chip);
  ink on surface 13.23/13.64 (plates, terminal, curl). No text on filled rust anywhere.
- **Motion inventory closes at three plus the cursor** (A-007): element 1 is §7.1's stream,
  element 2's seats here are the status-bar dot and the terminal `RUN` lamp, element 3 is the
  readout count-up (§6 of this file). The hero curl has no cursor; the header underscore is static and is not a slot; the
  formation, readout dashes, chip and headline carry no animation or transition.
- **States**: default (stream per §7.1); end (complete log, counted-up values); reduced motion
  (end state immediately — complete content, lamp solid, values exact); no JS (identical to
  reduced motion). The dashes render identically in all four.
- **Accessibility**: one `<h1>`, the section's label; heading tree unchanged (h1 → §02's h2, no
  skips). Interactive inventory is exactly two elements — the `VERIFY ⎘` chip and, below
  `--bp-wide`, the terminal's focusable scroll region — both with visible focus rings and 44px
  targets. Announced strings are ruled in §4.3 (headline), §5 (eyebrow), §6 (chip), §7 (log), §9
  (formation). Forced colors: plates and chip carry real borders; the key-beat marks and pennant
  drop (decorative, correct); state rides on text everywhere.

## 13. Assertions

Each is the relationship it protects, one probe each; every one must fail when its relationship is
violated.

1. **The announced headline** — the h1's AX-tree name equals the shipped candidate's announced
   string, case-insensitive word-exact; for candidate B the struck phrase's words appear in the
   rendered text but not in the name. Fails if the strike enters the name or the treatment is
   dropped.
2. **The fold guarantee** — at 375 × 553, the measured line's bottom edge ≤ the visual viewport
   height. Read the element, not this file's figure, so the check follows any future stack change.
3. **One gutter system, two terminals** — the hero log's computed `--mark-inset` /
   `--mark-width` / `--mark-clear` equal §2's, and the hero's L4/L9 marks measure the same inset
   from their card as §2's (the R1 equality, third instance).
4. **Scope separation** — the strings `$24.73`, `289` and `~64` do not occur within `#hero`; the
   readout → terminal gap ≥ the section's other inter-block gaps.
5. **Rust floor** — every element whose `color` resolves to `--accent` inside `#hero` measures
   ≥24px, or ≥19px bold, or is a single-glyph graphical mark whose meaning is carried by adjacent
   ink text (the log's `✓`, the chip's `⎘` — shell §2.3.2). The headline accent, readout values
   and L12 pass the size clause; any rust *word* below the floor fails.
6. **Dashes are inert** — unmeasured cells render `--ink`, carry no animation, and their text is
   the em-dash before, during and after playback.
7. **Count-up exactness** — after playback (and immediately under reduced motion) the numeric
   cells' text equals the copy strings `9.3 h` and `$147` byte-exact.
8. **The stream schedule** — pair reveals at one `--reveal` cadence; the L11 → L12 interval
   measures 2× the uniform cadence; the stream never restarts within a page load.
9. **Window discipline** — below `--bp-wide` the window holds 3 whole entries, never rests
   mid-entry, and the scroll region is focusable with an accessible name.
10. **The curl** — `#hero`'s curl text, §6's curl text and the verified string are byte-equal;
    no horizontal scroll of page or card at 320/360/375.
11. **Eyebrow silence** — no `·` in the eyebrow's AX names (the separators are style, not
    content).
12. **Formation integrity** — eight list items, the locked names in the locked order, hub first;
    every bus/stem/terminal construction absent from the AX tree.
13. **Hero motion closes** — no animated or transitioning element inside `#hero` outside the log
    reveals, the `RUN` lamp and the count-up cells (the brand-rule static assertion pattern,
    applied to the section).

## 14. Existing harness sites this section re-bases

The checks below pass against the shell placeholder and will not survive §1 landing; re-base,
never delete:

| Site | Today | Re-base to |
|---|---|---|
| `qa-independent-audit.mjs:346` | reads `#hero .instrument p` (the shell placeholder) for the 64ch reading-measure probe | the placeholder leaves with §1 — re-target to a rendered body paragraph (`.slot .t-body`, §2's narration entries, until §3's prose lands) |
| `verify-shell.mjs:264` | `contrastOf("#hero-title")` | no re-base — the id survives on the real h1 (required by §4) |
| placeholder counts (`verify-shell.mjs:314,426`; `qa-independent-audit.mjs:303,586,607`) | compare `[data-shell-placeholder]` counts across states | no re-base — counts drop symmetrically when the placeholder leaves |
| `styles/tokens.css` `--text-display` | `clamp(2.4rem, 6.5vw, 4.25rem)` | the amended clamp (§4.1) — no harness asserts the old value (verified by grep); the audit's token evidence report updates itself |

## 15. Provenance — reference feel vs. locked values

**Locked by the seed (authoritative)**: the §1 element inventory in full; the measured line
visible without scrolling; THIS SITE above BODH with scope labels; the eight named roles on the
formation as the roster; the hub + bus-bar concept; one `curl`; the terminal streaming the real
run-log with rust key beats; the `VERIFY ⎘` chip to `VERIFY.md`; the eyebrow facts; the three
motion elements; every colour, face and surface rule via the shell.

**From the copy file**: every string, including the announced strings' content and the primary/
compact measured-line forms.

**Decided here (the craft)**: the display floor re-measured against the real candidates (§4.1);
the break-unit system and per-candidate markup (§4.2–4.3); ink-bold numerals in the measured
line; the fold budget and its named cases; the readout's stacked-row phone grammar and the
one-caption deviation; the chip's `href` and accessible name; the 1.40s/0.35s/2.80s stream
schedule, once-per-load no-loop ruling, and 3-entry window; the 1200px two-column condition with
a fixed terminal column; the hub-is-PM construction and the formation's ladder; the `--gap-major`
scope seam; the curl's no-prompt, no-cursor, wrap-anywhere treatment.

**From the direction reference, as feel cues only (A-003 — it never ships)**: the eyebrow-above-
headline opening; the hub-plate / stem / bus-bar schematic grammar as a visual idiom (the concept
itself is the seed's); the calm density of the terminal card. **Present in the reference and
deliberately not inherited**: the curl living inside the terminal with a `$` prompt and cursor
(the hero curl has neither — §6 owns the cursor, and the setup command did not produce the Bodh
log the terminal streams); `https://muster.build/setup.sh` (host does not exist); the `amber`
class (the accent is rust); count-up on unmeasured THIS SITE values (`~$300`, `~4 H` — invented
numbers, the exact thing rule 4 bans; ours are static ink dashes); the `PM · CONTEXT HUB` plate in
rust text at 12px (fails AA small text — our hub is an accent *border* with ink text); the
abbreviated plate names (`DEV`, `UX`, `MKT` — the role names are locked full forms); the
four-cell readout with an `Operators` column (the copy file's three cells are the readout).

Nothing in this file is open except the formation's hub ruling, which is a label swap by
construction (§9).
