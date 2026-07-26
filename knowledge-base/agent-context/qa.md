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

**Sprint 2 — one step, at the end of Wave 2. A single full-page sweep, not one pass per section.**

### Full-page sweep → HO-029

Validate the content-complete page end to end. **Derive scope from the section specs directly**, so a
dev-charter omission does not also blind QA.

- **Cross-engine parity on WebKit *and* Blink**, with evidence per engine. State plainly what remains
  Blink-only — scoping honestly is worth more than a claim the harness cannot support.
- **Zero runtime network requests**, with evidence. This is a published product claim, not a preference.
- **Contrast ≥4.5:1** for body text in both themes; landmarks and focus states verified.
- **The headline's accessible name** verified by what a screen reader would actually announce. The §1
  headline uses a struck word, which is announced as ordinary text unless handled — this is the single
  likeliest accessibility defect on the page.
- **Reduced-motion and no-JS** paths render complete content across every section.
- **§2 fidelity** still byte-clean against the corpus; the corpus unmodified, proven from git rather
  than asserted.
- **All relationship assertions green**, and `qa-independent-audit.mjs` exits zero. An assertion that
  cannot fail is not an assertion — check that each would actually fail if violated. This is the
  blind-by-construction failure that has now been caught three times on this project.
- **Scroll-snap**: keyboard paging, find-in-page and 200% zoom each verified working.
- **Copy rules as a text matrix** across all sections: no `muster.build`, no cross-scope aggregates,
  scope labels present in the DOM beside their values, THIS SITE still dashed.

**Red build or any failing check: halt to PM, do not advance the queue.** Re-point `## Next Step` to a
`Role: pm` assessment step.

**Standing practice**: verify against a render of the state under test. A frame that cannot display the
condition being claimed is not evidence — PM made exactly this mistake in Sprint 1 by confirming a
key-beat fix against a render with no key beat revealed.

