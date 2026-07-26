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
<!-- PM-MANAGED: PM updates at sprint planning, task completion, priority changes -->

### 1. Design foundation + §2 replay spec — Priority: HIGH, Effort: L, Platform: web

**Deliverable**:
- `knowledge-base/design-specs/web/page-shell.md` — tokens (both themes), type scale, motifs, section chrome
- `knowledge-base/design-specs/web/section-02-replay.md` — replay layout, two-layer structure, annotation placement, beat timing, reduced-motion fallback
- HO-002 in `agent-requests.md`

**Dependencies**: `design-specs/web/section-02-beat-inventory.md` (Developer, HO-001) for real timing.

**Acceptance criteria**:
- Every token traced to the seed's locked values. Both themes first-class, not light-as-afterthought
- Reading passages full-ink; muted tone reserved for labels and captions
- Exactly three live motion elements specified, plus the curl cursor — nothing else; all reduced-motion-gated with complete-content fallbacks
- Contrast ≥4.5:1 body text in both themes, stated per token pair
- Replay spec pins beat timing and narration sync precisely enough that **pacing is a design decision, not a developer guess**
- Timing paced against the real intervals in the beat inventory
- States which choices came from the direction reference as feel cues versus the seed's locked values

**Why timing carries unusual weight here**: the founder judges the replay with the styling mentally
subtracted — it must stand on pacing and narration alone, independent of the visual frame. Your timing
spec is what that judgment lands on.

**Key refs**: `product-spec-seed.md` → Design direction + §2 · `design-specs/direction-reference.html`
(feel only) · `design-specs/web/section-02-beat-inventory.md` ·
`muster/team/ui-ux/skills/web/{web-design-system,web-screen-specification,web-accessibility,web-marketing-and-conversion-pages}.md`

**Status**: delivered as HO-002 and approved at the Wave 1 gate with amendments. Superseded by task 2.

---

### 2. Gate amendments — narration-first mobile, 48 s chain, B5 rebalance — Priority: HIGH, Effort: M, Platform: web

**Deliverable**: revised `page-shell.md` and `section-02-replay.md`; HO-010. Full step brief in
`orchestration-queue.md`; rulings and rationale in `decision-log.md` DEC-015 and DEC-016.

**Dependencies**: none — the rulings are recorded. Runs before the shell build, because A1 changes
`page-shell.md` and the Developer builds from it.

**The four amendments**:
- **A1** Drop the theme control (`page-shell.md` §9, §15 q1). Delete the row, not the theme system — both themes stay first-class via `prefers-color-scheme`
- **A2** Close the motion-budget question (§10 scope note, §15 q2): the replay is content playback; budget stays at three plus the cursor
- **A3** **Mobile is narration-first** — terminal is texture, narration is the payload. Per-viewport visible-line counts; long lines soft-wrap and **nothing scrolls horizontally anywhere** (DEC-026 — supersedes the terminal's own scroll container); narration card stays in view for the full playback. **§5.1 needs amending too** — line persistence becomes a desktop guarantee with a stated small-viewport equivalent
- **A4** Rescale to 48 s uniform ×0.8; B3 stays 20%, **B5 restored 10.6% → ~14.5%**, B6 absorbs at ~17.2%

**Acceptance criteria**:
- Both layers visible simultaneously at 375×667 during playback — the criterion, not a particular solution
- A stated mobile height budget: numbers plus the viewport assumed, not a claim that it fits
- Dwells tile to exactly 48.00 s; word budgets recomputed at 3.5 w/s
- Fidelity intact — no truncation, no ellipsis, every character diffs byte-clean against the corpus
- Reduced-motion and no-JS paths still render the complete transcript
- No stale "flagged for the gate" text survives in either spec

**Latitude and push-back**: B6's internal split is yours. Scaling L10 ×0.8 leaves a ~4.14 s gate hold,
down 45% from 7.5 s; compressing L10 harder preserves more. If the hold stops reading as deliberate
stillness at its new length, say so in the handoff rather than shipping a pause that reads as a stall.

**Why F1 was raised**: measured against the real corpus lines, the section core reached ~646px of a
667px viewport at the spec'd 12px minimum — pushing the narration card off-screen while the terminal
played. Narration is what carries the non-technical reader the founder's acceptance criterion is written
for, so losing it on mobile broke the criterion, not just the layout.

**Key refs**: `wave-review.md` · `decision-log.md` DEC-015/016 · `agent-requests.md` HO-002 finding F1 ·
`bodh-sprint4-corpus.md` (read-only; longest line 74 chars)

**Status**: delivered as HO-010 and **accepted with notes 2026-07-25** — all four amendments landed, F1
closed, every number re-derived clean. The gate-hold push-back is upheld: at 4.80 s it gives SP7 16 words
rather than the 14 the projected 4.14 s alternative would have. Two factual claims in the pacing
rationale were wrong and PM corrected them in place rather than spending a revision round on two
sentences — C1: the hold does not "arrive 0.35 s after the fastest interval" (L11's 3.45 s interval sits
between; the 13.7× figure is a beat-level spread, restated as such); C2: the 6.60 s L8→L9 ellipsis is the
third-longest interval, not the second. No design value moved. See DEC-019; overrule either wording at
your next touch if you disagree.

---

**No further UI/UX steps this sprint.** Waves 2–3 are Developer, Content and QA executing the two specs.
Your next likely involvement is a Wave 3 gate outcome or a QA finding against `section-02-replay.md` §7.1
— specifically the narration card's 6-line worst case, which QA measures against SP3's real copy once
Content files it.

---

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
