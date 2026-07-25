# QA Context — Muster website
<!-- PM-MANAGED — Only the PM modifies this file. Agents read it at startup for filtered product context. -->

## Product Context

**Product**: Muster website — the public one-page site for Muster, the open-source multi-agent framework
for Claude Code. It ships measured claims backed by public artifacts.

Testing note that shapes everything below: **several of this page's acceptance criteria are published
product claims, not internal quality bars.** "Zero external requests" and "these numbers are real" are
assertions the page makes to a skeptical reader. A miss there is a truthfulness defect, not a polish
issue — treat it as blocking.

- **Platform**: static HTML/CSS + minimal vanilla JS. No framework, no build system, no backend, no
  storage, no auth, no accounts, no transactions.
- **Architecture implications**: nothing to test server-side; no tier splits; no subscription flows; no
  login states. The surface is one page in two themes at varying viewport widths.
- **Cross-engine is the known failure class**: verify WebKit **and** Blink every visual milestone
  (`qlmanage`/Safari + headless Chrome). Inline-SVG/WebKit divergence has bitten this project's sibling
  build; a Chrome-only pass is not a pass.
- **Zero external network requests at runtime** (A-004) — assert with evidence. No webfonts, no CDN, no
  analytics, no beacons. This is the page's privacy posture *and* a product claim, and it is asserted at
  code level rather than described in a policy (A-008).
- **Both themes first-class** (A-006): contrast measured ≥4.5:1 for body text in both, not just dark.
- **Reduced motion**: every `prefers-reduced-motion` path must render **complete** content, not a
  degraded subset. A reduced path that drops information is a failure.
- **Accessibility**: semantic landmarks, real focus states.
- **Offline / no-network**: the page must render fully with no network available — a direct consequence
  of the zero-requests constraint and worth testing as its own case.
- **No compliance docs to test against**: no privacy policy or terms exist at current scope, because
  nothing is collected (A-008). Your code-level assertion *is* the compliance evidence.

### Fidelity testing — unusual for this project

`bodh-sprint4-corpus.md` is founder-authored, read-only source material (A-001), and it is the sole
permitted source for every line and timestamp the §2 replay renders. Two checks follow:

1. **Rendered-line fidelity**: diff every terminal line the page renders against the corpus. An altered,
   paraphrased, or invented line is a blocking bug — "condensed from the real build log" is a claim, and
   compression is permitted while invention is not.
2. **Source integrity**: confirm the corpus file itself is unmodified. An agent "improving" founder source
   material is a blocking finding even if the result reads better.

**The three measurement scopes** (A-005) — BODH (9.3 h, $147), the Sprint-4 wave (~64 min, $24.73), and
THIS SITE (dashes). Flag any copy that mixes two scopes, rounds a figure, adds precision the source
lacks, or implies the wave's deploy closed its chain. The deploy landed three days later.

### Cross-Cutting References

- `knowledge-base/product-spec.md` §3 (feature inventory + acceptance), §5 (technical constraints)
- `knowledge-base/test-strategy.md`
- `knowledge-base/foundational-assumptions.md` — A-001, A-004, A-005, A-006, A-008 all bind your work
- `knowledge-base/agent-skills/content/copy-rules.md` — the review checklist doubles as a copy test matrix

### Cross-Agent Dependencies

- **You depend on Developer**: the built artifacts to validate.
- **You depend on UI/UX**: `design-specs/web/page-shell.md` and `design-specs/web/section-02-replay.md` — derive validation scope from these handoffs **directly**, so a gap in a developer's charter doesn't also blind you.
- **You depend on Content**: `design-specs/web/section-02-narration.md` — the sync and claim baseline.
- **You provide to PM**: per-criterion pass/fail with evidence. On red, do not advance the queue — re-point `## Next Step` to a `Role: pm` assessment step.

## Project Skills
<!-- PM-MANAGED: Product-specific skill files that supplement muster methodology skills. -->

None specific to QA yet. `knowledge-base/agent-skills/content/copy-rules.md` → "Review checklist" is
directly reusable as a copy-validation matrix when you validate §2.

## Current Tasks
<!-- PM-MANAGED: PM updates at sprint planning, task completion, priority changes -->

### 1. Shell validation — Priority: HIGH, Effort: M, Platform: web

**Deliverable**: HO-004 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Dependencies**: Developer page shell (HO-003).

**Acceptance criteria**:
- Cross-engine parity verified on WebKit **and** Blink, with evidence per engine
- Zero runtime network requests asserted with evidence
- Contrast measured ≥4.5:1 body text in **both** themes; semantic landmarks and focus states verified
- Reduced-motion path renders complete content
- No webfonts, CDN references, or build-system artifacts in shipped output
- Page renders fully with no network available
- Derive scope from `design-specs/web/page-shell.md` directly

**On red**: halt to PM, do not advance the queue.

**Key refs**: `design-specs/web/page-shell.md` · `product-spec-seed.md` → Tech + Accessibility ·
`muster/team/qa/skills/web/web-testing.md` · `muster/team/qa/skills/generic/{test-strategy,bug-reporting}.md`

---

### 2. §2 replay validation — Priority: HIGH, Effort: M, Platform: web

**Deliverable**: HO-007 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Dependencies**: Developer §2 replay (HO-006).

**Acceptance criteria**:
- Every rendered terminal line diffed against `bodh-sprint4-corpus.md` and cited — altered, paraphrased, or invented lines are blocking
- Corpus file confirmed unmodified — an agent editing founder source material is blocking
- "Condensed from the real build log" label present
- Cross-engine parity on WebKit and Blink; zero network requests; reduced-motion path complete
- Narration/terminal synchronization holds across both engines and at reduced motion
- **Measured beat intervals reported factually** — the founder judges pacing with styling mentally subtracted, so give that judgment data to sit alongside
- Copy checked against `copy-rules.md` → Review checklist, including the Safari-catch boundary and scope labels
- Derive scope from HO-002 and HO-005 directly

**On red**: halt to PM, do not advance the queue.

**Key refs**: `bodh-sprint4-corpus.md` · `design-specs/web/section-02-beat-inventory.md` ·
`design-specs/web/section-02-replay.md` · `design-specs/web/section-02-narration.md` ·
`agent-skills/content/copy-rules.md` · `muster/team/qa/skills/web/web-testing.md`
