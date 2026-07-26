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
<!-- PM-MANAGED: PM updates at sprint planning, task completion, priority changes -->

### 1. Bodh corpus verification + beat inventory — Priority: HIGH, Effort: S, Platform: web

**Deliverable**: `knowledge-base/design-specs/web/section-02-beat-inventory.md`; HO-001 in `agent-requests.md`.

Map `bodh-sprint4-corpus.md` onto the six §2 beats in `product-spec-seed.md` §2, and derive the pacing
data downstream steps need. The corpus already ships a "Terminal-line inventory" — do not duplicate it.
Your value-add is the beat mapping, the interval arithmetic, and an independent consistency check.

**Dependencies**: none — the corpus is in the repo.

**Acceptance criteria**:
- **Read-only on the corpus.** No edits, no reformatting, no cleanup, no extension
- Every corpus terminal line either assigned to a beat or explicitly listed as unused — nothing silently dropped
- Timestamps preserved verbatim; inter-beat intervals shown as derived, with the arithmetic visible
- Coverage report per beat: supported by which lines, or reported as a gap. **Gaps are reported, never filled**
- Independent consistency check recorded: session durations against the chain total, session timestamps against the terminal inventory, and the corpus's own totals
- Zero conversation content surfaced — queue lines, handoffs, decisions, timestamps only

**Known mapping** (verify, don't assume): the corpus's 8 sessions collapse onto the seed's 6 beats, with
sessions 4–6 (content, legal, marketing) forming the seed's step 4.

**HALT if**: the coverage report finds a beat the corpus does not support. File the report as-is, re-point
`## Next Step` to a `Role: pm` step naming the unsupported beats, and stop. Do not invent, infer, or
approximate a line or timestamp — a fabricated line refutes the page's central claim.

**Key refs**: `bodh-sprint4-corpus.md` · `product-spec-seed.md` §2 + Verification ·
`muster/team/developer/skills/generic/plan-first-discipline.md`

**Status**: DONE — HO-001 accepted, trued up to corpus v1.1 as HO-009 and accepted 2026-07-25. The
inventory is final: chain 3858 s, B6 486 s, both endpoints measured at source.

---

### 2. Page shell implementation — Priority: HIGH, Effort: L, Platform: web

**Deliverable**: `index.html`, `styles/`, `scripts/` — shell only, no section content. HO-003.

**Dependencies**: `design-specs/web/page-shell.md` (UI/UX, HO-002), approved at the founder gate.
**The spec is now final and PM-accepted** — the Wave 1 amendments landed as HO-010 (accepted 2026-07-25).
Build from the file as it stands; nothing in it is open. Two things changed since the gate: **no theme
control ships** (§9 — build the theme *system*, both palettes and `prefers-color-scheme`, and keep the
`:root[data-theme]` attribute so QA can force a theme, but put no control in the UI), and §10's motion
budget is closed at three elements plus the curl cursor, with the §2 replay explicitly outside it.

**Acceptance criteria**:
- Both palettes at exact hex values, both themes first-class; mono display / humanist-sans reading split
- Grain texture + top vignette CSS/SVG-generated; stencil section tags, hairline rules with machined end-ticks, registration marks, OPERATIONAL status bar
- **Zero external network requests at runtime**, evidenced
- Matte surfaces, sharp corners, opaque cards; reading column ~64ch; semantic landmarks, real focus states
- All motion reduced-motion-gated, reduced path renders complete content
- WebKit and Blink verified before filing
- Implement everything in HO-002; the above is non-exhaustive

**Key refs**: `design-specs/web/page-shell.md` · `product-spec-seed.md` → Design direction + Tech ·
`muster/team/developer/skills/web/{web-best-practices,web-accessibility,web-performance-engineering}.md`

---

### 3. §2 replay implementation — Priority: HIGH, Effort: L, Platform: web

**Deliverable**: the §2 section built into the shell, corpus wired into the terminal layer. HO-006.

**Dependencies**: beat inventory (HO-001), replay spec (HO-002), narration (HO-005, PM-approved).

**Acceptance criteria**:
- **Founder criterion**: the replay must stand on pacing and plain-English narration alone, independent of the visual frame. The founder judges timing and narration with styling mentally subtracted
- Terminal layer renders corpus lines verbatim, labelled "condensed from the real build log" — nothing staged, embellished, or invented
- Narration synchronized to the beats per the replay spec's timing; ends on `bodh.day`, live
- Scripted HTML/CSS/JS only — no asciinema, no tooling dependency, zero external requests
- Reduced-motion path renders complete content
- WebKit and Blink verified before filing
- Implement everything in HO-002 and HO-005; the above is non-exhaustive

**HALT if**: the corpus lacks a line the replay spec calls for. Do not invent, paraphrase, or
reconstruct it. Re-point `## Next Step` to a `Role: pm` step naming the missing line and stop.

**Key refs**: `design-specs/web/section-02-replay.md` · `design-specs/web/section-02-narration.md` ·
`bodh-sprint4-corpus.md` · `design-specs/web/section-02-beat-inventory.md` · `product-spec-seed.md` §2
