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

**Sprint 2 — three steps, in queue order. Two founder gates only; Gate A judges a *rendered* sample of
your §4 work, so specs must be buildable from themselves.**

### 1. §1 hero design → `section-01-hero.md`, HO-018 (model: claude-fable-5)

The page's five-second verdict, and the section with the most distinct elements. Implement the seed's
§1 inventory in full: the measured line **visible without scrolling**; eight named roles as labels on
the PM-hub + bus-bar formation (this IS the roster, there is no separate roster section); one `curl`;
the terminal streaming the real Sprint-4 log; the dual build readout with THIS SITE dashed above BODH,
scope-labelled; the `VERIFY ⎘` chip; the eyebrow facts.

**The highest-risk detail is the headline's accessible name.** The founder's preferred direction is a
typographic device — a struck word plus an accented one. Struck text is announced by screen readers as
ordinary text, so an unspecified treatment ships a headline that reads aloud as gibberish. You specify
how a struck word sets *and* how the whole headline is announced; Content supplies the candidates.

Rust on the headline is permitted at display size (DEC-017, ≥24px). No thirteenth palette value
(A-006). The motion budget stays closed at three live elements plus the cursor — §1's terminal stream
and the count-up are two of the three that already exist, not new ones. Reading measure is `64ch` as
the CSS value (DEC-023).

### 2. §4 spec-sheet rendering → `section-04-decisions.md`, HO-019

The seed's **second design centerpiece**. Four founder decisions as spec-sheets: Decision / Problem /
Trade-off / Mechanism rows, strongest first, dates as small stamps.

**The acceptance test is that it is buildable from itself** — a Developer builds one real spec-sheet
from this spec for Gate A without asking you a question. The founder judges that rendered artifact, not
a description of it.

### 3. Terminal spacing system, brand seats, scroll-snap → amended specs + `brand-seats.md`, HO-020

**A — the terminal's left edge, as a system.** Three Sprint-1 fix rounds each satisfied their stated
criterion and disturbed an adjacent relationship, because five relationships derive from two or three
shared CSS values. Name and measure all five: tick↔card, tick↔text, row↔row, entry↔entry, text↔wrap
edge. **Move the tick out of the text flow** — today it is `border-inline-start` on `.log__line`, and
the hanging indent (`padding-inline-start: 1ch`, `text-indent: -1ch`) puts the first row at 0 from that
border, so on a key beat the timestamp butts against the tick. Specify it as a positioned mark in the
log's gutter. **One harness assertion per relationship** — that is the deliverable that stops a fourth
round (DEC-032).

**B — the pennant seats** (DEC-031). Header lockup is `pennant + MUSTER_` with a **static** rust
underscore — it never blinks, the `curl` owns the only cursor on the page. Five section separators take
the pennant in place of their 8px squares. Icon seats (favicon, tile, avatars) use the artwork as
supplied. **Never render the pennant on a pole.**

Sized **optically, not mechanically**: the pennant is ~1:1.5 portrait where the square is 1:1, so equal
width sets half again as tall. Drawn as `clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 81.79%, 0 100%)`
on the existing box — no inline SVG, no new network request, and the WebKit divergence class avoided
rather than tested for. At 8–12px the mark reads as punctuation; at display size it becomes badging,
which this page's restraint does not carry.

**C — scroll-snap** in `page-shell.md`. The seed's *one idea per screen* as a mechanism rather than as
composition. **Proximity snapping, never JavaScript scroll-jacking** — keyboard paging, find-in-page
and 200% zoom must all survive, and QA asserts accessibility mechanically here. **§2 is exempt**: its
core already fills most of a phone viewport. Define the reduced-motion path.

**Standing practice this sprint**: assert relationships, not values. Any spec that changes spacing,
insets or rhythm names the relationship it preserves and gives the harness a way to check it.

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
