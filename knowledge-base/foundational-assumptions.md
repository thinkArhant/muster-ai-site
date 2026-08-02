# Foundational Assumptions
<!-- Cross-cutting assumptions that are encoded across multiple files. -->
<!-- When a decision invalidates an assumption, PM uses the touchpoint list to cascade changes. -->
<!-- All agents should verify deliverables are consistent with active assumptions. -->

## Active Assumptions

<!-- ENTRY TEMPLATE:
### A-[ID]: [Assumption statement]
**Status**: active | invalidated
**Touchpoints**: [List of files that encode this assumption]
**Notes**: [Context or constraints]
-->

### A-001: Founder-authored source material is read-only to every agent

**Status**: active

**Touchpoints**: `product-spec-seed.md`, `bodh-sprint4-corpus.md`,
`design-specs/direction-reference.html`, `orchestration-queue.md`, `current-sprint.md`,
`agent-context/{developer,ui-ux,qa,content}.md`, `agent-skills/content/copy-rules.md`

**Notes**: Agents quote, verify, inventory, and build from these files. Agents never edit, reformat,
extend, regenerate, or "clean up" any of them. The founder authors them and announces when they land —
do not poll the filesystem for them. QA treats a modification to any of these files as a blocking
finding, because an agent silently improving source material breaks the provenance the whole page rests
on.

### A-002: Agents never measure this build

**Status**: active

**Touchpoints**: `orchestration-queue.md` → Execution Mode, `current-sprint.md` → Standing practices,
`agent-context/developer.md`, `agent-context/qa.md`, `pre-launch-checklist.md`

**Notes**: No session runs `muster/scripts/muster-meter.py`. Build telemetry snapshots are
founder-supplied and committed at milestones; a step needing a metric reads a committed snapshot. The
rationale is attribution integrity — interactive tinkering muddies the number this site publishes about
itself, and the site's own measured column is a published claim. THIS SITE metrics stay dashed in all
page copy until launch.

### A-003: The direction reference is a feel input and never ships

**Status**: active

**Touchpoints**: `design-specs/direction-reference.html`, `agent-context/ui-ux.md`,
`agent-context/developer.md`, `agent-skills/content/copy-rules.md` → R12, `brand-guidelines.md`

**Notes**: The reference communicates mood, density, and rhythm. Its markup, class names, and
measurements are not a build target, and the production build should exceed it. Two known divergences
must not be inherited: it uses `#abae90`, which is not one of the twelve locked palette values, and its
`curl` points at `https://muster.build/setup.sh`, a host that does not exist. The class name `amber`
aliases the rust accent and should not carry into any spec — the accent is RUST.

### A-004: The page makes zero external network requests at runtime

**Status**: active

**Touchpoints**: `product-spec.md` §5 + §7 + §10, `brand-guidelines.md` §4,
`agent-context/{developer,qa}.md`, `current-sprint.md`, `test-strategy.md`

**Notes**: No webfonts, no CDN, no client-side analytics, no beacons, self-contained assets only. This is
a published product claim asserted mechanically by QA, not a preference — which is why it outranks
instrumentation.

**Host-side analytics do not violate this.** Cloudflare Pages' server-side request analytics measure
visits and `VERIFY.md` fetches without adding anything to the page, so the claim stays intact. The
distinction that matters is *what the page requests at runtime*, not *what the host observes about
requests to it*. Scroll depth and curl-copy would require client instrumentation and are therefore
unmeasured by design — see `product-spec.md` §7.

Adding any client-side analytics, beacon, or third-party script would invalidate this assumption and the
privacy posture (A-008) in one move.

### A-005: Three measurement scopes exist and are never conflated

**Status**: active

**Touchpoints**: `product-spec.md` §8, `agent-skills/content/copy-rules.md` (scope table, R1, R2, R5),
`bodh-sprint4-corpus.md`, `product-spec-seed.md` → Measured data, `pre-launch-checklist.md`

**Notes**: BODH (idea → live): 9.3 h active build, $147, 4.8 h operator attention, 4 commit-days.
BODH SPRINT-4 WEBSITE WAVE (one evening's chain): ~64 min across 8 sessions, 289 API calls, $24.73.
THIS SITE (spec → live): dashes until launch. The wave's deploy landed three days after its chain
because the gate waited on Apple — no copy may imply the deploy closed the chain. This is the page's
most likely factual failure mode.

### A-006: Both themes are first-class

**Status**: active

**Touchpoints**: `brand-guidelines.md` §4, `product-spec.md` §5, `design-specs/web/page-shell.md`,
`agent-context/{ui-ux,developer,qa}.md`, `current-sprint.md`

**Notes**: Dark is primary; light is an olive field canvas, deliberately not cream. Neither is a
derived afterthought — both are specified, built, and validated at contrast ≥4.5:1 for body text.
Twelve palette values total; a thirteenth colour is a deviation requiring written justification.

### A-007: The design direction is locked and is executed, not re-derived

**Status**: active

**Touchpoints**: `product-spec-seed.md` → Design direction, `brand-guidelines.md` §4,
`agent-context/ui-ux.md`, `design-specs/web/page-shell.md`

**Notes**: Palettes, type pairing, texture, the motion budget, motifs, surface rules, and layout are
settled. Design work is craft in execution, not exploration of alternatives. Exactly two live motion
elements — the pulse motif and the readout count-up — plus the curl cursor; a third is a deviation.
One-shot chains that end, such as the replay, are not ambient elements and do not spend the budget.
Any paragraph meant to be read is full-ink; muted tone is for labels and captions only.

### A-008: The page collects no user data, so no privacy policy or terms are required

**Status**: active

**Touchpoints**: `product-spec.md` §6 + §8 + §10, `legal/`, `pre-launch-checklist.md`,
`agent-context/qa.md`

**Notes**: No cookies, no storage, no beacons, no accounts, no transactions, no third-party requests.
The privacy claim is asserted at code level by QA rather than described in a policy — the same standard
the Bodh wave held. Depends on A-004; adding any analytics invalidates both together and would require
Legal to re-scope.

### A-009: The page sells nothing and has one conversion event

**Status**: active

**Touchpoints**: `product-spec.md` §3 + §6, `brand-guidelines.md` §5,
`agent-skills/content/copy-rules.md` → R9

**Notes**: MIT-licensed open source. No pricing, tiers, gating, or signup. The single conversion event
is copying the `curl`. No newsletter, Discord, stars badge, testimonials, or community furniture — the
restraint is itself positioning.

## Invalidated Assumptions
<!-- Moved here when invalidated. Include date and decision that invalidated it. -->

*None.*
