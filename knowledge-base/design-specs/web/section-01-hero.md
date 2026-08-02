# §1 — Hero: the five-second verdict

**Surface type**: page section (§1 of 6) — the sparse hero: the claim and the team, nothing else
**Consumers**: Developer (builds §1 from this file), QA (derives validation scope), PM (reviews against the copy file and the gate rulings), the founder (judges the assembled page at the gate)
**Inherits**: every token in `page-shell.md`; the pennant rulings in `brand-seats.md`. The display-floor amendment lives in `page-shell.md` §3 and the measurement that forced it lives here (§4.1).
**Copy**: every string in this section is `design-specs/web/section-01-copy.md`'s, verbatim. This file specifies treatment, never wording.
**Authority**: the founder's gate rulings recorded in `decision-log.md` DEC-045 and DEC-046 govern this section's inventory; they supersede `product-spec-seed.md` §1's fuller element list and its "measured line visible without scrolling" guarantee (the seed is founder-authored and read-only; the founder's gate ruling is its amendment mechanism). `brand-guidelines.md` §3 records the same deviation.

---

## 1. What §1 is

A YC-grade first screen: **eyebrow · headline · formation. Nothing else above the fold.** The
five-second verdict is the claim correcting itself in front of the reader and the team that does
the work, drawn as a formation. Measured proof deliberately lands at the first scroll — §2's
replay and §5's cards carry every number; §1 carries none (DEC-045).

**§1 contains no Bodh material** (DEC-046): no Bodh numeral, no Bodh label, no corpus line, no
terminal. §2 is the page's only terminal. The only measurement scope named in §1 is THIS SITE, in
the below-fold remnant, and §1 states no measured figure of its own.

## 2. Content hierarchy and inventory

1. **Headline** — the claim, edited in front of the reader: struck `a human`, rust `an AI`
2. **The formation** — the section's centerpiece: PM hub, bus-bar, seven specialists; this IS the
   roster (no separate roster section exists)
3. **Formation caption** — `8 AI AGENTS · 1 OPERATOR`, the hero's only statement of the 8/1 fact
4. **The THIS SITE remnant** — the self-referential proof posture: the scope, and `VERIFY ⎘`
   (below the fold)
5. **The curl** — the action; §6 owns the canonical instance and the page's only cursor
6. **Eyebrow facts** — orientation: open source · runs in Claude Code · v4 · MIT

Document order at every viewport: eyebrow → h1 → formation + caption → remnant → curl. **The
complete inventory is these five blocks.** No subline, no measured line, no readout BODH row, no
hero terminal — an element added between the headline and the formation is a defect, not a
refinement (DEC-045/046).

## 3. Above-the-fold budget — the falsifiability contract

The budget case is **375 × 553** — iPhone SE, mobile Safari, toolbars shown (the visual viewport).
Figures are rendered measurements in headless Blink against the real tokens with the §4.1 floor in
force (`samples/s01-hero-recomposed.html` is the rendered record); none is a derivation. y = distance
from page top (48px bar + 96px hero padding = 144px to first content).

| Element · bottom edge | 320px | 375px | 1280px |
|---|---|---|---|
| Eyebrow (lines) | 177.6 (2L) | 177.6 (2L) | 160.8 (1L) |
| Headline (lines) | 277.8 (3L) | 248.4 (2L) | 315.6 (2L) |
| Hub plate | 364.2 | 334.8 | 402.0 |
| Last whole plate above the 553 fold | plate 3 · 515.3 | plate 4 · 536.3 | n/a — full row at 465.4 |
| Formation caption | 757.4 | 728.0 | 505.9 |
| Remnant strip | 1073.7 | 1044.3 | 731.8 |
| Curl card | 1271.1 | 1217.0 | 830.4 |

**What the first screen holds, stated honestly:**

- **375 × 553**: eyebrow, headline, the hub, and four whole specialist plates; the fold cuts
  plate 5 (bottom 586.7). **The ladder cuts at the fold and the first measured figure arrives on
  scroll** — accepted by the founder at the gate with this measurement in front of him (DEC-045).
  The cut is designed, not suffered: the ladder's spine runs through the fold line, so the crop
  reads as *more below*, which is the only scroll cue the sparse screen needs.
- **320 floor**: the same stack holds with the headline at three whole-phrase lines and three
  whole plates above the fold (plate 3 bottom 515.3). No overflow at any width (document
  `scrollWidth` clean at 320/360/375/390 — measured).
- **1280 × 700 desktop**: the entire first screen — eyebrow, headline, the full formation and its
  caption — sits above the fold with **199.3px clear** (caption bottom 500.7). The remnant enters
  at 572.7 and what follows it crosses the 700 line: the strip is the desktop scroll cue, cut by
  the fold exactly as the ladder is on the phone. The section measures 773.6px, which brings the
  `curl` — the page's one conversion event — inside a 774px laptop window whole.
- **Landscape phone (667 × 331 visual)** cannot hold the formation: eyebrow and headline fit
  (headline bottom 263.8, 2L), the hub lands just under the fold (bottom 350.2). The budget names
  its cases rather than asserting "every viewport."

**§1 carries no measured figure at all.** The section's only numerals are the eyebrow's `v4` and
the caption's `8` / `1` — on a phone the first screen carries no numeral beyond the version tag.
The page's first measured number is §2's, which is one scroll away and labelled with its scope.

## 4. The headline — settled, locked

One string, founder-ruled from rendered candidates (`section-01-copy.md` §2 — no other candidate
exists). Set in `--text-display` — mono bold, uppercase (`text-transform`; source text stays
sentence case), `--track-display`, `--lead-display`, `--ink`. The h1 keeps `id="hero-title"` and
the section keeps `aria-labelledby="hero-title"`.

### 4.1 The display floor — measured against the settled string

`--text-display` is amended in `page-shell.md` §3 to `clamp(1.75rem, 6.5vw, 4.25rem)`. At the 28px
floor the settled headline sets **3 whole-phrase lines at 320px and 2 lines at 375/390** with no
overflow (measured; the breaks match the copy file's table exactly). A 2.4rem floor sets a
14-character display line at 360px and overflows the 320px viewport inside an unbreakable phrase —
the defect class the amendment removes. Ceiling and slope untouched; rendered size is identical
above ~431px. 28px bold keeps the accent phrase at AA-large (≥19px bold — shell §2.2).

### 4.2 Break units — lines are phrases, never accidents

Wrapping is controlled by `white-space: nowrap` on the two treated phrase spans, never by `<br>`:
the struck phrase `a human` is one unbreakable unit, the accent phrase `an AI` is another, and
`team.` rides the natural wrap. Measured composition: `Ship a product / with a human / an AI team.`
at 320px; two lines at 375px and above with the entire substitution on one line, so the edit reads
as a single gesture. Each treated span renders as a **single fragment** at every measured width
(`getClientRects().length === 1` at 320/360/375/390) — a strike or an accent broken mid-phrase is
a defect.

### 4.3 Markup and announced string

```html
<h1 id="hero-title">Ship a product with
  <s aria-hidden="true" class="h1__cut">a human</s>
  <span class="h1__accent">an AI</span> team.</h1>
```

- **Computed accessible name**: `Ship a product with an AI team.` — the struck phrase is excluded
  by `aria-hidden`; verified against the AX tree (`Accessibility.getFullAXTree`), never by
  assertion. Case caveat, cross-engine: Blink computes the name from rendered (uppercased) text,
  WebKit from source text — equality assertions are **case-insensitive and word-exact**.
- **Accent scope is exactly `an AI`** — struck = removed, rust = replacement, plain = unchanged.
  `team` is the constant that survives the edit; accenting it would blur the one idea the headline
  makes. Colour affects no layout: the measured line counts above hold for any span colouring.
- **Strike treatment**: `--ink` with `text-decoration: line-through` at
  `text-decoration-thickness: 0.06em` (≈1.7px at the floor, ≈4px at the ceiling — an edit mark,
  not a hairline). `<s>` is the element (content no longer accurate), not `<del>`.
- **Copy behaviour, accepted**: select-and-copy yields the full visible sentence including the
  struck phrase (`section-01-copy.md` §2 records the posture). Only the announced string excludes
  the edit.

## 5. The eyebrow

`--text-label`, `--muted`, tracked uppercase, above the h1 — the page's opening stencil. Markup is
a list so the `·` separators are never announced: four `<li>` facts, separators drawn by CSS
(`content: "·"; content: "·" / "";` — alt-text syntax strips them from the AX tree; engines
without it fall back and still render). Each fact is a nowrap unit; below ~459px the list wraps at
fact boundaries to two lines (budgeted in §3). Announced: the four facts, nothing else.

## 6. The formation — the centerpiece

The section's visual anchor and the seed's concept visual: a command hub and a bus-bar carrying
the roster. **Hub = `PM`; the bus-bar carries the seven specialists** — the settled reading in
which no role appears twice and the visual tells the architecture's truth: PM coordinates,
specialists execute.

### 6.1 Construction — wide (≥ `--bp-wide`)

- **Hub plate**: `--surface`, **1px `--accent` border** (3.86/4.89 on surface ≥ 3:1 both themes),
  text `PM` in `--text-label` mono tracked uppercase, `--ink`, **weight 700**. The hub's
  distinction rides on position (seated above the bus), DOM order (first), weight, and the accent
  border — colour is never the sole channel. Seated centered over the bus (`inset-inline-start:
  50%`, translated), with a 1px `--hair` stem `--gap-hairline` (12px) tall from hub to bus.
- **Bus-bar**: 1px `--hair` horizontal rule spanning exactly the plate row's width — which is
  the **container's full content width** (the relationship is bus width = row width = container
  content width, never a figure). Registration `+` marks (`--text-micro`, `--muted`,
  `aria-hidden`) at both bus ends — the shell's regmark grammar, two per surface, marking the
  formation as an instrument reading of the org — seated on the rail and rail-end, over the
  corners of the remnant strip below.
- **Plates**: seven, one flex row **distributed edge to edge** (`justify-content: space-between`
  on the full-width row — the gaps flex, the plates do not), each `--surface` with 1px `--hair`
  border, role name `--text-label` `--ink` tracked uppercase (the names are content, not
  captions), padding `--gap-hairline` inline / `calc(var(--rhythm) / 3)` block. Locked full role
  names in the locked order: `DEVELOPER · UI/UX · QA · CONTENT · MARKETING · LEGAL · RESEARCH`.
  A 1px `--hair` stem 12px tall drops from the bus to each plate's center. Plate 1's inline-start
  edge is the rail; plate 7's inline-end edge is the rail-end.
- **Alignment ruling (DEC-057)**: the formation **spans the container** — bus = plate row =
  container content width — and the hub stays centered within it, which makes the hub's center
  the page's axis (`page-shell.md` §7.2). The rejected alternative, founder-judged from the
  rendered page: an intrinsic-width block (676.4px at 1280) with the hub centered on that block
  alone — an orphan axis at x 546.2 against the 720 shared by the headline block and the THIS
  SITE strip at 1440, visibly centered on nothing. Spanning the container keeps the reading edge
  (plate 1 on the rail) **and** gives the centered gesture a page-true axis — measured
  hub-center − axis = **0.0px at 1280, 1440 and 1600**, bus spanning rail→rail-end exactly
  (`samples/gate-b-renders/after-report.json`; rendered record `samples/gate-b-proposed.html`).
  The spread also serves *spacious*: plate gaps open from 12px to ~70px at 1280, and the
  formation reads as the section centerpiece DEC-045 made it, rather than a packed cluster
  huddled at the rail.

### 6.2 Construction — the phone ladder (< `--bp-wide`)

Hub on top; a 1px `--hair` **spine** at `inset-inline-start: var(--gap-hairline)` (12px — the same
value family as the page's mark-inset idiom) descending from the hub's bottom edge; plates stacked
at `--gap-hairline` gaps, indented 36px (12px spine seat + 24px stem), each with a `--rhythm`-wide
(24px) horizontal stem from spine to plate at the plate's vertical center. Measured: plate pitch
50.4px, ladder 391.1px tall × 146.5px wide at 375.

**The spine terminates at the last plate's stem line** — it never trails past Research. At the 375
fold it is mid-ladder (plate 5 cut), which is the designed scroll cue (§3).

### 6.3 Markup and announced structure

```html
<div class="formation__diagram" role="group" aria-label="PM and seven specialist AI roles">
  <span class="formation__hub">PM</span>
  <div class="formation__bus" aria-hidden="true"></div>
  <ul class="formation__plates" aria-label="The seven specialist roles">
    <li>Developer</li> … <li>Research</li>
  </ul>
</div>
<p class="formation__caption">8 AI agents · 1 operator</p>
```

- Announced: the group's name, then `PM`, then a **7-item list** of the specialist names — the
  hub/bus hierarchy told structurally, matching the settled reading (a flat 8-item list would
  erase the one thing the visual says). `list-style: none` strips list semantics in WebKit VoiceOver,
  so the `<ul>` carries `role="list"`; verify VoiceOver announces 7 items before filing.
- Bus, spine, stems and regmarks are CSS constructions (borders and pseudo-elements) —
  decorative rhythm at 1.36:1, carrying nothing the text and order do not; none reaches the AX
  tree.
- **Caption**: `8 AI AGENTS · 1 OPERATOR` — `--text-micro`, `--muted`, uppercase, at `--gap-flow`
  below the diagram, start-aligned with it. The R8 attribution at hero altitude and the hero's
  only 8/1 statement (no subline exists). True in both hub readings; exact under the settled one.

## 7. The THIS SITE remnant — the instrument motif at its smallest honest size

**The remnant is *posture*, not measurement**: this page measures itself and invites checking. §5
owns the measured story and renders the full THIS SITE card beside BODH's, so the remnant takes the
motif's smallest form — one `--surface` card, 1px `--hair` border, `--gap-hairline` padding, and a
head row that never changes.

| Zone | Content (all strings `section-01-copy.md` §5) |
|---|---|
| Head row | `THIS SITE · SPEC → LIVE` (`--text-label` `--muted`, **nowrap** — a scope label never breaks mid-phrase) on the rail · `VERIFY ⎘` chip at the row's inline end, the rail-end counterweight |

The head row wraps below ~390px: the label holds as one unit and the chip drops to its own
right-aligned row (`margin-inline-start: auto`). The scope label never breaks.

### 7.1 The strip is the head row alone

- The strip is the scope label and the chip, in a `--surface` card at `--gap-hairline` padding.
  There are no cells and no strip-level caption.
- Measured, Blink dark: strip 52.19px at 1280×700, 80.98px at 375×553; hero 773.55px and 1072.98px —
  which brings the whole hero **including the `curl`** inside a 774px laptop window, and the curl is
  the page's single conversion event.
- **The card stays.** A bare label-and-chip pair on the ground was rendered and rejected: it stops
  being an instrument surface and reads as loose chrome, and the hairline it needs to hold the pair
  together puts a full-width rule where this page's grammar reads a section boundary.

**Why the strip carries no readout, when the motif it quotes is a readout.** The trust claim §1
makes at the fold is carried by two elements — the scope label and the chip — and both are here at
full strength. A dash would add neither. **An unmeasured value needs its measured twin to read as a
promise rather than as a gap**, and §1 has no twin: the identical dash works in §5 because it lands
beside `4.8 h`, `bodh.day` and the prose figures. Met alone in the first seconds by a reader who
discounts unverified claims by default, a blank where a number belongs invites *"so you haven't
measured it"* — the opposite of the intended reframe. `SHIPPED · THIS PAGE` fails a second way: it
is a tautology in the page's most expensive seat, told to a reader currently looking at the page.

The consequence is a rule restored rather than an exception carried: **§1 makes no unmeasured claim
at all, and `measured at launch` occurs exactly once on the page**, in §5, attached to the THIS SITE
card's `OPERATOR ATTENTION` dash.

### 7.2 What holds

- **A dash never appears without its key.** The key is what makes a dash a *claim* — unmeasured,
  will be measured — rather than punctuation. Folding the labels away is not a form of this strip;
  where the strip states no value, it states no key either.
- **One registration mark, at the top-left** (`page-shell.md` §8). The inline-end corner belongs to
  the chip: a bottom-right mark lands on the chip's own border, measured overlapping it at 1280, 375
  and 320.
- **Nothing in §1 animates** (§10). Nothing here carries a count-up hook.
- **The strip sits at `--gap-major` below the caption** — the section's one idea-group seam: claim +
  team above it, receipts + command below it. The remnant → curl gap is `--gap-block`.
- **The chip**: shell emphasis chip — `--accent` border, `--ink` text, rust glyph. Markup:
  `<a class="chip chip--emphasis" href="https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md" aria-label="Verify these numbers — VERIFY.md">VERIFY <span aria-hidden="true">⎘</span></a>`.
  The `href` is the public blob URL — byte-equal to the footer's `VERIFY` receipt
  (`footer-copy.md` §3), a blob page renders readable where a raw-markdown response would not,
  and the two strings are asserted equal so they cannot drift. It targets `main` rather than a
  commit: this file's demo moment is the launch state, which `main` is by construction. An inert
  `<a href>` is permitted navigation; a click is user navigation, so A-004's zero-runtime-request
  claim is untouched; no prefetch attributes ever. 44px hit area via padding; the visual stays
  chip-sized. It is §1's **only interactive element**.

## 8. The curl

The copy file's §6 string, byte-identical to the verified form, in a `--surface` card with 1px
`--hair` border, `--gap-hairline` padding, `--text-terminal` mono, `--ink`. It closes the section:
claim → team → posture → command.

- **No cursor** — the §6 curl owns the page's only blink. **No `$` prompt glyph.**
- **Wrapping**: `overflow-wrap: anywhere` — the URL is one ~85-character token; the page scrolls
  horizontally nowhere. Selection yields the exact string at every viewport (measured card
  heights: 50.7px at 1280 — one line; 124.8px at 375 — three).
- §6 reuses this treatment and adds the cursor; the two instances are one string, asserted equal.

## 9. Layout

### Wireframe — desktop ≥ `--bp-wide`

```
│ STATUS BAR  ▌MUSTER_                        ● OPERATIONAL │
│                                                           │
│  OPEN SOURCE · RUNS IN CLAUDE CODE · V4 · MIT         (1) │
│  SHIP A PRODUCT WITH                                  (2) │
│  A̶ ̶H̶U̶M̶A̶N̶ AN AI TEAM.                                     │
│                                                           │
│                        ┌──────┐                           │
│                        │  PM  │       (3) hub, accent, on │
│  +─────────────────────┴──┬───┴────────────────────────+  │     the page axis
│  ┌─────────┐  ┌─────┐  ┌──┴┐  ┌───────┐  ┌─────┐  ┌────────┐
│  │DEVELOPER│  │UI/UX│  │QA │…│CONTENT│…  │LEGAL│  │RESEARCH│   rail → rail-end,
│  └─────────┘  └─────┘  └───┘  └───────┘  └─────┘  └────────┘   gaps flex
│  8 AI AGENTS · 1 OPERATOR             (4)                 │
│ ─ ─ ─ ─ ─ ─ ─ 700px fold ─ ─ ─ ─ ─ ─ (194.1px clear) ─ ─  │
│  ┌ + THIS SITE · SPEC → LIVE            [VERIFY ⎘] ┐ (5)  │
│  └─────────────────────────────────────────────────┘      │
│  ┌ curl -fsSL https://raw.githubusercontent.com/… ┐ (6)   │
└───────────────────────────────────────────────────────────┘
```

The card closes directly under the label-and-chip row — one row, one mark.

### Wireframe — phone 375 × 553

```
   OPEN SOURCE · RUNS IN                 (1) eyebrow, wraps at
   CLAUDE CODE · V4 · MIT                    fact boundaries
   SHIP A PRODUCT WITH                   (2) 2 lines, whole
   A̶ ̶H̶U̶M̶A̶N̶ AN AI TEAM.                       phrases (§4.2)
   ┌ PM ┐                                (3) hub, then the
   │└──┬─┘                                   ladder: spine +
   ├───┤ DEVELOPER │                         24px stems,
   ├───┤ UI/UX     │                         50.4px pitch
   ├───┤ QA        │
   ├───┤ CONTENT   │                     fold cuts plate 5 —
  ─│─ ─│─ fold at 553px ─ ─ ─ ─ ─            the spine runs on:
   ├───┤ MARKETING │                         the scroll cue
   ├───┤ LEGAL     │
   └───┤ RESEARCH  │
   8 AI AGENTS · 1 OPERATOR              (4)
   ┌ + THIS SITE · SPEC → LIVE ┐         (5) label nowrap;
   │              [VERIFY ⎘]   │             chip on its own
   └───────────────────────────┘             right-aligned row
   ┌ curl -fsSL https://raw.gith… ┐      (6)
   └──────────────────────────────┘
```

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Eyebrow | §5 — list markup, separators drawn and unannounced, facts nowrap |
| 2 | Headline | §4 — settled string, break units, announced name from the AX tree |
| 3 | Formation | §6 — hub `PM` accent-bordered bold; bus + regmarks; ladder below `--bp-wide` |
| 4 | Caption | §6.3 — `8 AI AGENTS · 1 OPERATOR`, micro muted, the only 8/1 statement |
| 5 | Remnant strip | §7 — the instrument motif at its smallest size: the head row alone, one registration mark, chip to `VERIFY.md`, no readout |
| 6 | The curl | §8 — exact string, wraps, no cursor, no prompt glyph |

Gaps, one-sided throughout: eyebrow → h1 `--gap-hairline` · h1 → formation `--gap-block` ·
diagram → caption `--gap-flow` · caption → remnant `--gap-major` (the idea-group seam) ·
remnant → curl `--gap-block`.

## 10. Motion — §1 is fully static

**No element in §1 animates, transitions, or streams. The section holds no seat in the page's
motion inventory.** The chip has no hover animation (underline-weight changes are not
transitions); the formation is still; the hero curl has no cursor.

The page-level budget this section re-states (`page-shell.md` §10): **two live ambient elements —
the OPERATIONAL pulse (element 1) and the §5 count-up (element 2) — plus the §6 curl cursor.**
The stream seat that a hero terminal would occupy does not exist: §2 is the page's only terminal
(DEC-046), and a new ambient element anywhere is a deviation requiring written justification
(A-007). The count-up engine and its `aria-live` posture are decided and verified where the
page's only counting cells live — §5's cards — not here.

Reduced motion / no JS: §1 renders identically — there is nothing to degrade. Complete content in
all four states (default, end, reduced, no-JS).

The dash and the count-up are §5's, and so is the promise that fills it: §1 states no metric, so it
has none to animate and none to qualify (§7.1).

## 11. Both themes, contrast — stated per token pair

Every pair is the shell's measured table (§2.2); this section introduces no new pair.

| Element | Pair | Dark | Light | Floor |
|---|---|---|---|---|
| Headline (incl. struck phrase), curl text | `--ink` on `--ground` / `--surface` | 14.37 / 13.23 | 12.15 / 13.64 | 4.5 ✓ AAA |
| Accent phrase `an AI` (display bold ≥28px) | `--accent` on `--ground` | 4.19 | 4.35 | AA-large ✓ (≥19px bold) |
| Eyebrow, caption, scope label | `--muted` on `--ground` / `--surface` | 5.61 / 5.16 | 5.13 / 5.76 | 4.5 ✓ (labels/captions) |
| Plate names, curl text | `--ink` on `--surface` | 13.23 | 13.64 | 4.5 ✓ AAA |
| Hub border, chip border (graphical) | `--accent` on `--surface` | 3.86 | 4.89 | 3.0 ✓ UI |
| Bus, spine, stems, rules | `--hair` | decorative | decorative | never information-bearing alone |

No text on filled rust anywhere, and no rust text below its floor: the accent appears in §1 as the
headline phrase (display bold), the hub and chip borders, and the chip glyph beside ink text.
Nothing else in the section is rust — which is what keeps the headline's `an AI` the section's one
display moment.

## 12. States and accessibility

- **States**: one. §1 has no playback, no count-up, no end state — default, reduced-motion and
  no-JS renders are identical (§10).
- **Landmarks/headings**: one `<h1>`, the section's label via `aria-labelledby="hero-title"`;
  heading tree h1 → §02's h2, no skips; the hero carries no stencil tag and no separator pennant
  (`brand-seats.md` §5).
- **Interactive inventory: exactly one element** — the `VERIFY ⎘` chip. Visible focus ring (2px
  `--accent`, 3px offset), ≥44px hit area. Nothing else in §1 is focusable — there is no
  terminal scroll region.
- **Announced strings ruled**: headline (§4.3), eyebrow (§5), formation (§6.3), chip (§7). The
  formation announces group → `PM` → 7-item specialist list; the caption is plain text.
- **Forced colors**: hub and chip carry real borders and survive; bus, spine, stems and regmarks
  drop (decorative, correct); the strike survives as `text-decoration`; state rides on text
  everywhere.
- **200% zoom**: the stack reflows on the ladder path with no horizontal scroll (same
  construction as the measured phone layouts).

## 13. Assertions

Each protects one relationship, one probe each; every one must fail when its relationship is
violated. The fold budget's load-bearing relationships (§3) are 1–5.

1. **The announced headline** — the h1's AX-tree name equals `Ship a product with an AI team.`
   case-insensitive word-exact; the struck words appear in the rendered text and not in the name.
   Fails if the strike enters the name or the treatment is dropped.
2. **Phrase units hold** — `.h1__cut` and `.h1__accent` each report exactly one client rect at
   320/360/375/390. Fails on any mid-phrase break — the no-orphan relationship the settled
   string was chosen for.
3. **The fold guarantee** — at 375 × 553: the hub plate's bottom edge and the fourth plate's
   bottom edge ≤ the visual viewport height; at 320 × 553 the third plate's. Read the elements,
   never this file's figures, so the check follows any future stack change.
4. **Stack integrity** — the h1's next rendered sibling block is the formation diagram (nothing
   ships between claim and team); eyebrow → h1 gap computes `--gap-hairline`; h1 → formation gap
   computes `--gap-block`; caption → remnant gap computes `--gap-major` and is ≥ every other
   inter-block gap in the section (the idea-group seam).
5. **The sparse negative** — within `#hero`: none of the strings `9.3`, `4.8`, `$147`, `$24.73`,
   `289`, `~64`, `bodh` (case-insensitive) occurs; no `<ol>` and no element with a terminal/log
   class exists; the section's text content contains no digits other than the eyebrow's `4` and
   the caption's `8` and `1`; and no em-dash and no `measured at launch` occurs anywhere in it.
   Fails the moment any Bodh material, measured figure, or unmeasured claim re-enters §1.
6. **Formation integrity** — the diagram announces: hub text `PM` first, then a list of exactly
   seven items equal to the locked names in the locked order; the hub's computed border-color is
   the accent and its font-weight ≥ 700 (distinction is never colour alone); bus, spine, stem and
   regmark constructions are absent from the AX tree.
7. **Formation modes and the axis** — below `--bp-wide`: each plate's top edge ≥ the previous
   plate's bottom edge (the ladder stacks). At ≥ `--bp-wide`: all seven plates share one row
   (equal top edges); the bus's rendered width equals the plate row's width **equals the
   container's content width** (plate 1 starts on the rail, plate 7 ends on the rail-end); and
   |hub center − the container content box's midpoint| ≤ 1px — the page's one axis-bound
   element, per `page-shell.md` §7.2. Fails if the bus detaches from the row it diagrams, the
   formation shrinks back to intrinsic width, or the hub's center drifts off the page axis.
8. **Remnant honesty** — the scope label reports exactly one client rect at 320/375 (a scope label
   never breaks mid-phrase); the strip renders exactly one registration mark and it is the
   top-left one; no element inside the strip overlaps the chip's border box, at 1280 and at every
   phone width; and the strip contains no readout element and no count-up hook — its announced
   text is the scope label and the chip's label, and nothing else. Restoring the bottom-right mark
   fails the mark count and the overlap measurement together.
9. **The chip** — accessible name contains the visible label `VERIFY` (WCAG 2.5.3); its `href`
   string equals the footer's `VERIFY` receipt href byte-for-byte (`footer-copy.md` §3 — equality
   asserted as strings, never by fetching); hit area ≥ 44 × 44 on coarse pointers; it is the only
   focusable element inside `#hero`.
10. **Hero static** — zero elements inside `#hero` carry a non-`none` animation or a non-default
    transition, in default **and** reduced-motion paths (the brand-rule static-assertion pattern,
    applied to the whole section).
11. **The curl** — `#hero`'s curl text, §6's curl text and the verified string are byte-equal; no
    horizontal scroll of page or card at 320/360/375/390.
12. **Eyebrow silence** — no `·` in the eyebrow's AX names (the separators are style, not
    content).

## 14. Provenance — what is locked vs. decided here

**Locked by founder rulings** (`decision-log.md`): the sparse above-fold inventory —
eyebrow · headline · formation, nothing else (DEC-045); all Bodh material out, §2 as the page's
only terminal (DEC-046); the settled headline string, spans and announced name
(`section-01-copy.md` §2 records the ruling); hub = PM with the seven specialists on the bus
(`section-01-copy.md` §4); the phone reality — ladder cut at
the fold, first measured figure on scroll — accepted with the measurement on the table.

**Locked by the seed and shell**: the hub + bus-bar concept and the roster-as-formation; every
colour, face, surface and spacing rule; the eyebrow facts; one `curl`; the `VERIFY ⎘` chip to
`VERIFY.md`.

**From the copy file**: every string, including announced-string content and the remnant strings.

**Decided here (the craft)**: the fold budget and its named cases, re-measured for the sparse
stack; the formation's design pass — the container-spanning formation with the hub on the page
axis (DEC-057: bus = plate row = container content width, plates distributed edge to edge,
regmarks on the rail and rail-end), 12px stems on the rhythm scale, the ladder spine terminating
at the last stem and running through the fold as the scroll cue, hub weight-700 + accent border
as the multi-channel distinction; the announced group → `PM` → 7-list structure; the remnant ruled as a
one-row instrument strip carrying posture rather than measurement, with its why (§5 owns every
value, and a dash needs its measured twin); its single top-left registration mark, the inline-end
corner let to the chip; the nowrap scope label + chip-drop wrap rule; the
`--gap-major` idea-group seam; §1 ruled fully static with the page budget re-stated at two live
elements + cursor; the display floor re-measured against the settled string (§4.1).

**From the direction reference, as feel cues only (A-003 — it never ships)**: the
eyebrow-above-headline opening; the hub-plate / stem / bus-bar schematic grammar as a visual
idiom. **Present in the reference and deliberately not inherited**: the curl inside a terminal
with prompt and cursor (no terminal exists in §1; §6 owns the cursor); `https://muster.build/…`
(host does not exist); the `amber` class (the accent is rust); the `PM · CONTEXT HUB` plate in
rust text at 12px (fails AA small — our hub is an accent *border* with ink text at weight 700);
abbreviated plate names (`DEV`, `UX`, `MKT` — the role names are locked full forms); any
count-up on an unmeasured value (§1 states no metric to animate).

Nothing in this file is open.
