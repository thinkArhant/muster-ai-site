# Developer Context — Muster website
<!-- PM-MANAGED — Only the PM modifies this file. Agents read it at startup for filtered product context. -->

## Product Context

**Product**: Muster website — the public one-page site for Muster, the open-source multi-agent
framework for Claude Code. It proves with measured data and real build artifacts that one person plus a
governed AI team ships real products, and ends in a single `curl`.

The page is an exhibit of what Muster produces. Build quality is the argument.

- **Tech stack**: static HTML/CSS + minimal vanilla JS. **No framework, no build system** beyond simple
  assembly, no webfonts, no package manager required.
- **Architecture**: single page, no backend, no storage, no auth, no data layer. Assets self-contained —
  inline SVG, CSS-generated texture.
- **Hard constraint — zero external network requests at runtime** (A-004). No webfonts, no CDN, no
  analytics, no beacons. QA asserts this mechanically; it is a published product claim, not a
  preference. It also means the page carries no instrumentation — that collision resolves in favour of
  the constraint.
- **Type**: system monospace (SF Mono/Menlo) for display, labels, and system chrome in tracked
  uppercase; system-ui humanist sans for reading passages; metrics in tabular mono, rust.
- **Both themes first-class** (A-006), twelve exact palette values, contrast ≥4.5:1 body text in both.
- **Cross-engine is a known failure class here**: verify WebKit **and** Blink at every visual milestone
  (`qlmanage`/Safari + headless Chrome). Inline-SVG/WebKit divergence has bitten this project's sibling
  build before — it is not hypothetical.
- **Motion**: exactly three live elements plus the curl's blinking cursor. All
  `prefers-reduced-motion`-gated, and **the reduced path renders complete content**, never a degraded
  subset.
- **Accessibility**: semantic landmarks, real focus states, contrast ≥4.5:1 body text both themes.
- **Deploy**: Cloudflare Pages from this repo. Domain arrives from the founder mid-build; the GitHub raw
  URL is the fallback in the curl until then.
- **Repo is public from commit one.** Commit subjects follow `<role>: <outcome>` — the log is part of
  the product.

### Rules that will trip you if unread

- **Founder-authored files are read-only** (A-001): `product-spec-seed.md`, `bodh-sprint4-corpus.md`,
  `design-specs/direction-reference.html`. Quote, verify, and build from them; never edit, reformat,
  extend, or regenerate them. QA treats a modification as a blocking finding.
- **Never run `muster/scripts/muster-meter.py`** (A-002). Build telemetry is founder-supplied and
  committed at milestones. No step generates a metric.
- **`direction-reference.html` is not a build input** (A-003). Build from `design-specs/web/page-shell.md`.
  The reference contains `#abae90` (not a locked palette value) and `https://muster.build/setup.sh` (a
  host that does not exist) — inheriting either would ship a defect.
- **Never write a THIS SITE metric.** Those stay dashed until launch (A-005).
- **`.gitignore` is correct as written.** `.muster-sprint-logs/*.jsonl` excludes only the bulky
  transcripts; `.metrics` files and run logs in that directory already commit. Do not "fix" it.

### Cross-Cutting References

- `knowledge-base/product-spec.md` §5 — technical constraints
- `knowledge-base/product-spec-seed.md` → "Tech, deploy, telemetry practice" and "Design direction"
- `knowledge-base/foundational-assumptions.md` — A-001 through A-005 all bind your work
- `knowledge-base/design-patterns.md`, `knowledge-base/design-system-reference.md`

### Cross-Agent Dependencies

- **You depend on UI/UX**: `design-specs/web/page-shell.md` and `design-specs/web/section-02-replay.md`. Implement everything in them; a task's listed criteria are non-exhaustive examples and never override the handoff.
- **You depend on Content**: `design-specs/web/section-02-narration.md`, used verbatim.
- **You provide to UI/UX and Content**: `design-specs/web/section-02-beat-inventory.md` — the corpus mapped to beats with measured intervals. Both of them pace their work against it.
- **You provide to QA**: the built artifacts, plus the beat inventory QA uses as a fidelity baseline.

## Project Skills
<!-- PM-MANAGED: Product-specific skill files that supplement muster methodology skills. -->

None yet for this role.

## Current Tasks

**Sprint 2 — five steps. One is a decision aid for Gate A; one blocks every other; three build sections.**

### 1. Gate A sample render → `samples/gate-a.html`, HO-024

Small step, high leverage: it converts Gate A from imagining to looking. Build every §1 headline
candidate **as it would actually set** — real tokens, real fonts, real sizes, both themes, not an
approximation — plus **one real §4 spec-sheet** built from the spec and the real copy, so the founder
judges the rendering rather than a description of it. Label candidates so the founder can name one in a
verdict. State each headline's accessible name and how you tested it.

**This never ships.** It is a decision aid, like the reading-measure comparison. Keep it out of the
page's build and out of the zero-request surface.

### 2. Shell — spacing system and brand mark → HO-025. **Blocks every section build.**

All five terminal left-edge relationships implemented, with **one `scripts/test.sh` assertion each**.
Without the assertions this step is not done: they are what every later step inherits, and they are the
deliverable that stops a fourth patch round (DEC-032).

Resolve the carried gate-3 defect — the key-beat tick collides with the timestamp at every viewport.
**The tick becomes a positioned mark, not `border-inline-start` on the line**, so indentation and tick
placement stop sharing a lever.

Pennant in the header (`pennant + MUSTER_`, static underscore) and at all five section separators, via
`clip-path`, sized per spec. Favicon data-URI swapped to the pennant. **Zero new network requests** —
no inline SVG in these seats, which is the whole point of the clip-path route (DEC-031).

§2's fidelity, its 48.00 s schedule and its phone budget are all unchanged — prove it, do not assume it.

### 3. §1 and §6 → HO-026

They pair because both carry the `curl` and the `VERIFY ⎘` chip. Build the founder's chosen headline
with the accessible name the spec defines, and **verify it reads correctly aloud** rather than assuming
the markup is enough. Measured line visible without scrolling; dual readout with THIS SITE dashed and
scope-labelled; eight named roles on the formation; the §1 terminal stream. Wire the `VERIFY ⎘` link —
the file itself lands in Wave 3, so do not invent it. §6's `curl` is the real GitHub raw URL,
copy-paste-correct, never `muster.build`.

### 4. §3 and §4 → HO-027

§4's four spec-sheets must render **as approved at Gate A** — divergence from the sample the founder
judged is a defect. Decision / Problem / Trade-off / Mechanism rows, strongest first, dates as small
stamps. §3 is prose in the reading column at `64ch` (DEC-023).

### 5. §5, then scroll-snap → HO-028

§5's readout cards use the shell motif; THIS SITE dashed; count-up is motion element 3, already in
budget. **Scroll-snap builds last** — it needs sections to snap between, and it is the likeliest thing
to be rejected at Gate B, so building it last minimises sunk cost. Proximity snapping, **never
JavaScript scroll-jacking**; keyboard paging, find-in-page and 200% zoom each asserted, not claimed.
**§2 is exempt** — verify its playback and phone budget are untouched by the snap container.

**Every step**: zero external requests, cross-engine WebKit **and** Blink before filing, all motion
`prefers-reduced-motion`-gated with complete content in the reduced path, and `scripts/test.sh` green
including the relationship assertions. Extend the existing harness rather than adding a second runner
(DEC-020). Never run `muster-meter.py`; never write a THIS SITE metric.

