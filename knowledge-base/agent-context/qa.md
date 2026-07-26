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

**Status**: DONE — HO-004 accepted 2026-07-25. Both harnesses re-run at review and agreeing. All four
items disposed in DEC-021: F1 to the founder, F2 ruled (its cited blocker disproved), F3 applied to the
spec, the `qlmanage` ceiling ruled and now scoping §2's cross-engine criterion. One correction to carry
into task 2: the audit's 45-character floor is unsatisfiable and gets re-based there.

---

### 2. §2 replay validation — Priority: HIGH, Effort: M, Platform: web

**Deliverable**: HO-007 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Dependencies**: Developer §2 replay (HO-006).

**Acceptance criteria**:
- Every rendered terminal line diffed against `bodh-sprint4-corpus.md` and cited — altered, paraphrased, or invented lines are blocking
- Corpus file confirmed unmodified — an agent editing founder source material is blocking
- "Condensed from the real build log" label present
- **Every §2 chrome string diffed against `section-02-narration.md` §5**, which is the authority on §2
  copy (DEC-022). Narration slot text is rendered verbatim — a paraphrase is a blocking finding, same as
  an altered terminal line
- **Measure the chain-totals strip (DEC-022.3–4).** At 375 × 553 it is budgeted at exactly two
  `--text-micro` lines = 33.0px and the core has 5.1px of slack, so a third line costs 16.5px and busts
  it. Assert the rendered line count and the value-line scale below `--bp-wide`; report the measured
  strip width against the ~327px content width so the margin is on the record either way
- **Cross-engine parity, scoped to what the tooling can prove (DEC-021.4 — supersedes a flat "both
  engines").** WebKit's job is the no-JS/reduced-motion complete transcript at ~1024²: twelve corpus
  lines verbatim, L12's large-rust treatment, the §9 emphasis system, terminal chrome, grain and vignette
  parity, both themes. That is load-bearing, not a consolation — DEC-017 item 4 makes the no-JS DOM
  identical to the complete transcript, on the engine whose inline-SVG divergence is this project's known
  failure class. Blink carries playback, the visibility gate, the windowed terminal, media queries,
  horizontal-scroll containment, and every mobile width. **Mobile evidence is Blink-only and HO-007 says
  so in those words** — never "verified cross-engine". Your probes established the ceiling; it is not
  re-litigated and not closed by installing anything (DEC-020)
- Zero network requests; reduced-motion path complete
- Narration/terminal synchronization holds at reduced motion and, where JS is involved, on Blink
- **Re-base the audit's 45-character floor and verify the `.instrument` fix (DEC-021.1–2).** The check
  cannot pass at 320px under any padding: 45 × 7.615px = 342.7px, wider than the viewport itself; the
  ceiling is ~36 characters at 320px with a zero-inset card and ~43 at 375px. Replace it with (a) a
  deterministic assertion that at ≤375px `.instrument`'s total horizontal inset is ≤20% of the card width
  (48/272 = 17.6% passes, today's 96/272 = 35.3% fails) and (b) the measured character count **reported,
  not asserted** — geometry is deterministic, a character count folds in font metrics and line-break
  raggedness, which is why your 320px figure of 18 sits under that width's ~23 capacity. This is a
  threshold correction, not a tolerance loosening: the build is fixed in the same wave, so red does not
  go green on the threshold alone. Disagree in HO-007 rather than deleting the check
- **Measured beat intervals reported factually** — the founder judges pacing with styling mentally subtracted, so give that judgment data to sit alongside
- Copy checked against `copy-rules.md` → Review checklist, including the Safari-catch boundary and scope labels
- **Mobile at 375 × 553**: terminal window shows 5 lines, both layers fully visible for the whole
  playback, measured core height ≤553px, page body never scrolls horizontally (also at 320px and 200%
  zoom), and the terminal's scroll container is focusable and arrow-key operable
- **Measure the rendered narration card against SP3's real copy** — `section-02-replay.md` §7.1 budgets
  a 6-line worst case and UI/UX flagged it as the budget's least comfortable number. At 7 lines the
  terminal drops to 4 visible lines, which the design absorbs, but the budget table is then wrong and
  gets corrected rather than tolerated. Report the measured line count either way
- Derive scope from HO-002 and HO-005 directly

**On red**: halt to PM, do not advance the queue.

**Key refs**: `bodh-sprint4-corpus.md` · `design-specs/web/section-02-beat-inventory.md` ·
`design-specs/web/section-02-replay.md` · `design-specs/web/section-02-narration.md` ·
`agent-skills/content/copy-rules.md` · `muster/team/qa/skills/web/web-testing.md`
