# UI/UX Context — Muster website
<!-- PM-MANAGED — Only the PM modifies this file. Agents read it at startup for filtered product context. -->

## Product Context

**Product**: Muster website — anchor headline available: *"Ship a product. Without a team."*

A single public page for Muster, the open-source multi-agent framework for Claude Code. Its job is to
convert a skeptical five-second skim into one copied `curl`, using measured data and real build
artifacts. The page is itself an exhibit of what Muster produces — a bloated page refutes the product.

- **Primary user**: the skeptical technical cold reader. Five-second skim, discounts unverified claims
  by default, can read a terminal log. The measured line must be visible without scrolling.
- **Secondary**: the non-technical builder who follows narration but not raw logs — the §2 narration
  layer exists for them.
- **Design direction is LOCKED**, not open for exploration. Palettes (twelve exact hex values), type
  pairing, texture, motifs, surface rules, and layout are settled in
  `product-spec-seed.md` → "Design direction". Your work is craft in execution. `brand-guidelines.md`
  §4 is the recorded form.
- **Concept**: spacious mil-spec field manual as a calm, live operations terminal. *Spacious* is the
  overriding constraint — generous air, one idea per screen, reading column ~64ch.
- **Both themes first-class** (A-006). Dark primary; light is an olive field canvas, deliberately not
  cream. Contrast ≥4.5:1 body text in both, stated per token pair.
- **Exactly three live motion elements** plus the curl's blinking cursor — hero terminal stream,
  OPERATIONAL rust pulse, scroll-triggered metric count-up with decimal support. A fourth is a
  deviation. All `prefers-reduced-motion`-gated, with reduced paths rendering **complete** content.
- **Any paragraph meant to be read is full-ink.** Muted tone is for labels and captions only.
- **Surface**: fully matte, sharp corners, opaque cards. No glass, no gradients-as-decoration, no
  rounded-friendly styling.
- **Page structure**: six sections — §1 hero (the eight named roles on the concept visual ARE the
  roster; there is no separate roster section) · §2 the replay · §3 the insight · §4 the decisions as
  spec-sheets · §5 shipped with Muster · §6 get started.

### The direction reference — read this before opening it

`knowledge-base/design-specs/direction-reference.html` is a founder-supplied mockup. **Feel only:
mood, density, rhythm. It is not a build target and none of it ships** (A-003). Do not copy its markup,
class names, or measurements. The production version should exceed it with your own craft.

Three specific things in it must not be inherited:

- `#abae90` — not one of the twelve locked palette values. The dark muted token is `#8C9075`.
- `https://muster.build/setup.sh` — a host that does not exist. Violates seed rule 12.
- the class name `amber` — it aliases the rust accent. The accent is RUST; don't carry "amber" into a spec.

State explicitly in your spec which choices came from the reference as feel cues and which from the
seed's locked values, so the reference cannot leak in as a de facto spec.

### Cross-Cutting References

- `knowledge-base/product-spec-seed.md` — authoritative; §2 for the replay structure, "Design direction" for tokens
- `knowledge-base/brand-guidelines.md` §4 — the recorded palette, type, texture, motifs, motion
- `knowledge-base/foundational-assumptions.md` — A-003, A-004, A-006, A-007 bind your work
- `knowledge-base/design-specs/README.md` — spec file conventions
- `knowledge-base/design-system-reference.md` — component availability

### Cross-Agent Dependencies

- **You provide to Developer**: `design-specs/web/page-shell.md` and `design-specs/web/section-02-replay.md`. Developer builds only from these, never from the direction reference.
- **You provide to Content**: the §2 beat timing and sync points Content writes narration against.
- **You provide to QA**: the spec QA derives its validation scope from directly.
- **You depend on Developer**: `design-specs/web/section-02-beat-inventory.md` — the real corpus beats and measured intervals. Pace the replay against these, not invented timings.
- **You depend on PM**: review of your handoff before the founder gate.

## Project Skills
<!-- PM-MANAGED: Product-specific skill files that supplement muster methodology skills. -->

None yet for this role. The seed's "Design direction" section functions as this project's design
doctrine — treat it with the authority of a skill file.

## Current Tasks

**Sprint 2 — four steps. Two founder gates only. Gate A judges a *rendered* sample of your §4 work, so
that spec must be buildable from itself.**

**Your steps run AFTER Content's §1/§3 copy**, deliberately: the hero spec specifies a headline treatment
and its accessible name against real candidate strings, not a hypothesis (DEC-034).

### 1. Terminal spacing system + brand seats → amended specs + `brand-seats.md`, HO-019 (opus)

Close the defect class that cost three Sprint-1 rounds. Name and measure all five left-edge
relationships: tick↔card, tick↔text, row↔row, entry↔entry, text↔wrap edge.

**Two constraints make this hard and you should know them before you start.** `section-02-replay.md`
§9.1 holds a **12px equality invariant** — the accent mark is inset 12px from its own card's inner edge
in *both* layers, at every viewport, and the founder accepted Gate 3 partly for that. §7.1 holds a
**37-first-row-column floor with only 5.7px of margin at 360px** before L3 wraps to three rows and the
3-entry phone guarantee collapses. DEC-032 originally sketched "a positioned mark in the log's 12px
gutter" — that mechanism is **withdrawn**, because the gutter *is* the 12px and a mark inside it breaks
the equality. The requirement is the outcome: tick clears the timestamp, equality survives, floor holds.
A reasoned refusal naming which one you traded is an acceptable deliverable.

Also rule whether `.narration__entry`'s active mark moves too — `verify-shell.mjs:617` asserts the two
sides are equal, so changing one and not the other is a defect either way. Read
`tests/verify-shell.mjs` and `tests/qa-independent-audit.mjs` before specifying assertions; several
existing checks hardcode `12`, which is the value-not-relationship anti-pattern DEC-032 exists to end.
Say which must be re-based.

**Brand seats** (DEC-031): header lockup `pennant + MUSTER_` with a **static** rust underscore — it never
blinks, the `curl` owns the only cursor. Five section separators. `brand-guidelines.md` §4 also names a
**footer** lockup that DEC-031 omits — rule on it. Favicon is an inline data-URI rust square at 16×16
today; specify the pennant's path and viewBox at that size. **Specify the underscore's accessible name**:
today the header announces "MUSTER", and an unspecified underscore changes what every screen reader says
on every page.

Sized optically — 470×703 ≈ 1:1.5 against an 8×8 square. `clip-path: polygon(0 0, 100% 0, 100% 100%,
50% 81.79%, 0 100%)`, never inline SVG, never on a pole. `page-shell.md` §8 and §9 still describe the
square and "one accent glyph permitted"; both are stale and yours to amend.

### 2. §1 hero design → `section-01-hero.md`, HO-020 (model: claude-fable-5)

The page's five-second verdict, and the section with the most distinct elements. Implement the seed's §1
inventory in full. **The eight role names are PM · Developer · UI/UX · QA · Content · Marketing · Legal ·
Research** — they were enumerated nowhere in the knowledge-base and now live in `copy-rules.md`.

**State an above-the-fold pixel budget against a named viewport**, the way §7.1 does for §2. "Visible
without scrolling" is otherwise unfalsifiable, and §1 carries more elements than §2 did.

**The headline's accessible name is the highest-risk detail on the page.** Struck text is announced as
ordinary text; specify markup and announced string per candidate.

**The hero terminal** is unspecified anywhere: say which corpus lines, at what rate, whether it loops,
and its end state. It inherits the terminal component and §9 emphasis rules from `section-02-replay.md`.

**Scope adjacency (A-005)**: the wave-scope terminal sits beside whole-product BODH figures in one
viewport — the page's likeliest factual failure. Say how they stay visually distinct.

**A-003**: state which choices came from `direction-reference.html` as feel cues versus the seed's locked
values. It never ships and must not leak in as spec.

### 3. §4 spec-sheet rendering → `section-04-decisions.md`, HO-021 (model: claude-fable-5)

The seed's second design centerpiece. **Buildable from itself** is the acceptance test — a Developer
builds one real sheet from it for Gate A without asking a question.

Beyond the four rows, the seed's decisions also carry a **bolded title sentence** (the strongest line in
each sheet) and a **category** (`framework` / `product`) — specify both. **The stamps are not one shape**:
three carry dates, one is `(product — Bodh)` with **no date at all**, and rule 4 forbids inventing one.
`--ink` on `--accent` measures 3.43/2.79 and **fails AA**, so a filled rust label column is banned — state
the emphasis system you use instead. §4 is one of only two first-person places (R7).

### 4. Scroll-snap spec → amended `page-shell.md`, HO-022 (opus)

Proximity snapping, **never JavaScript scroll-jacking**. Keyboard paging, find-in-page and 200% zoom must
survive. Set `scroll-padding-block-start` against the 48px sticky bar or every section heading clips.
**§2 is exempt** — specify how the exemption is expressed and what happens at its boundaries.
`prefers-reduced-motion` does **not** disable scroll-snap (snap is not animation) — decide and state
whether snapping turns off under it, and why.

## Current state of §2's mobile model (2026-07-26 — supersedes A3 above)

The log soft-wraps at every viewport with a **1ch** hanging indent, **nothing scrolls horizontally
anywhere**, and §2 claims no WCAG 1.4.10 exception at all. Narration-first still holds — per-viewport
visible entry counts, the card in view for the whole playback. Below `--bp-wide` the log's single
leading value is split in two: rows inside an entry set at `--lead-micro`, entries separated by a
`--gap-hairline` `margin-block-start`. The accent mark is inset `--gap-hairline` from the inner edge of
its own card in **both** layers at every viewport — the invariant is the equality of the two insets, and
12px is its value.

The current numbers, so nothing downstream quotes the retired ones: fixed core **379.4px** (the chain
totals strip left it, returning 45.0px), row **19.5px**, **entry box 39.0px**, **entry pitch 51.0px**,
**3 whole entries at 375 × 553** in 141.0px of line region with **32.6px** of slack, guarantee floor
**469.4px**. The line region at 375px is 313.0px, giving **39 first-row columns / 38 continuation**. The
**horizontal floor is 37/36** — all of L1–L11 hold at two rows down to exactly that, L3 breaks first
below it, and anything above it is margin. Landscape inverts the column split — the terminal takes the
wider column (55/41), sized by the wrap rule rather than by a share.

Accepted with notes, no revision (DEC-030). Three PM corrections landed in the spec in place and change
no design value: "line region" now names three widths apart (§7), §9.1 states the equality rather than
the number as the invariant, and §12's landscape check binds at the 37 floor instead of a derived 40.
The open item was ruled by amending `page-shell.md` — a component-scoped pairing's leading is the
one-row case, and a component whose entry wraps states its own row pitch. Two items are deferred to
Sprint 2 rather than dropped: SP3 overflows the six-line narration card at 320px (the fix is §7.1's own
priority order — the beat indicator returns 28.5px against a 28.9px line), and the totals value line
wraps at that width.
