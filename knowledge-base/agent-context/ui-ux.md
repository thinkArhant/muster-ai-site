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

**Note**: the founder executes this step personally in a warm tab. Expect review cycles.
