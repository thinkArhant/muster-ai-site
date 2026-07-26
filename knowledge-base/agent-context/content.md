# Content Context — Muster website
<!-- PM-MANAGED — Only the PM modifies this file. Agents read it at startup for filtered product context. -->

## Product Context

**Product**: Muster website — anchor headline available: *"Ship a product. Without a team."*

A single public page for Muster, the open-source multi-agent framework for Claude Code. It converts a
skeptical five-second skim into one copied `curl` using measured data and real build artifacts. The
page is an exhibit of what Muster produces, so inflated copy doesn't just read badly — it refutes the
product.

- **Brand tone**: the field engineer. Exact · restrained · mechanical · candid · unhurried. A number
  does the work an adjective would. See `brand-guidelines.md` §2.
- **Target user**: the skeptical technical cold reader. Discounts unverified claims by default,
  distrusts round numbers, can read a terminal log. Writes off hype instantly. What resonates: exact
  figures, named mechanisms, admitted limits. What kills it: adjectives-as-argument, superlatives,
  community-invitation warmth.
- **Copy surfaces this project**: the six section briefs (§1 hero · §2 replay narration · §3 the
  insight · §4 the four decision spec-sheets · §5 shipped with Muster · §6 get started) and the footer.
- **First person is confined to exactly two places**: the provenance line in §5 and the decisions in
  §4, both founder-supplied. Everything else — including all §2 narration — is product voice. You may
  tighten founder passages; you may never inflate them.
- **The team is AI and says so**: "by Muster's AI team — 8 agents, 1 operator." Never "the Muster team"
  unqualified.
- **Vocabulary**: use Muster's coinages as-is — *tokens are the currency* · *the queue is the org
  chart* · *growth caps* · *prose for judgment, scripts for mechanics*. One recognition hook permitted:
  "context engineering." Insider terms (*cascade lag*, *cold-start sufficiency*) only in §4, where they
  earn their meaning.
- **Never printed**: a human or agency cost baseline, "proven," any banned adjective, exclamation
  marks, "coming soon."
- **No monetization copy exists.** MIT open source, nothing sold, one CTA — the `curl`. No newsletter,
  Discord, stars badge, testimonials, or pricing.

### The three measurement scopes — the highest-risk thing you touch

| Scope | Span | Numbers |
|---|---|---|
| **BODH** | idea → live | 9.3 h active build · $147 · 4.8 h operator attention · 4 commit-days |
| **BODH SPRINT-4 WEBSITE WAVE** | the §2 chain, one evening | ~64 min across 8 sessions · 289 API calls · $24.73 |
| **THIS SITE** | spec → live | — (measured at launch) |

Never mix two scopes in one claim. Never round: `$24.73` not `$25`, `9.3 h` not `~10 h`. Never add
precision the source lacks: the corpus says `~64 minutes`, so never "exactly 64." Unmeasured metrics are
dashes, never placeholders.

**The deploy boundary**: the wave's chain ran one evening; `bodh.day` went live three days later
because the gate waited on Apple. No copy may imply the deploy closed the chain.

### Cross-Cutting References

- `knowledge-base/agent-skills/content/copy-rules.md` — **read this first, every time.** The twelve non-negotiable rules as pass/fail checks, the scope table, the sourced-claim list, and the do-not-overclaim boundary
- `knowledge-base/product-spec-seed.md` §2 — the six-beat sequence and the honest headline beat
- `knowledge-base/bodh-sprint4-corpus.md` — the only permitted source for §2 facts. Read-only (A-001)
- `knowledge-base/brand-guidelines.md` §2, §3, §5 — personality, messaging, naming
- `knowledge-base/foundational-assumptions.md` — A-001, A-005 bind your work

### Cross-Agent Dependencies

- **You depend on Developer**: `design-specs/web/section-02-beat-inventory.md` — which corpus lines belong to which beat.
- **You depend on UI/UX**: `design-specs/web/section-02-replay.md` — beat timing and sync points to write against.
- **You provide to Developer**: `design-specs/web/section-02-narration.md`, used verbatim in the build.
- **You provide to PM**: the narration for line-by-line rule review before anything is built.
- **You provide to QA**: the narration QA validates sync and fidelity against.

## Project Skills
<!-- PM-MANAGED: Product-specific skill files that supplement muster methodology skills. -->

- `knowledge-base/agent-skills/content/copy-rules.md` — the seed's twelve non-negotiable rules as enforceable pass/fail checks, plus the scope table, the sourced-claim list, and the §2 do-not-overclaim boundary. Read alongside `muster/team/content/skills/generic/brand-voice.md`.

## Current Tasks
<!-- PM-MANAGED: PM updates at sprint planning, task completion, priority changes -->

### 1. §2 narration script — Priority: HIGH, Effort: M, Platform: web

**Deliverable**: `knowledge-base/design-specs/web/section-02-narration.md` — the narration layer line by
line, each line keyed to its terminal beat; HO-005 in `agent-requests.md`.

**Dependencies**: beat inventory (Developer, HO-001) and replay spec (UI/UX) — **read the HO-010 amended
version, not HO-002**. The chain rescaled from 60 s to 48 s, so every word budget in §6 shrank by 20%.
Budgets are a spec contract, not a style guide: an overrun breaks the pacing the section is judged on.

Two beats changed materially. **B5 (QA validation) gained time** — restored from 10.6% to ~14.5% of the
chain, and in absolute terms it grew despite the shorter chain. It has to carry two claims, not one:
QA re-derived the date math *with its own formula* across 24 dates × 3 timezones, **and** 11/11 PASS with
zero bugs. The first is what makes the second credible to a skeptical reader — that is why the beat was
given room back. **B6 (the gate hold) lost time**, so SP7's honest-headline slot is tighter than it was.

**SP7 is the tight one, and it is the page's thesis.** ≤16 words, at the gate, with zero slack — a
16-word line reads in 4.57 s of the 4.80 s window. Write to 16. If the line genuinely cannot land in 16
without going flat, **say so in HO-005 with the version you would write at 20 and the version you would
ship at 16** — do not overrun, and do not quietly flatten it either. The known relief is SP6's 12 words
in the same beat, which needs no reschedule, and it is PM's call to spend (DEC-019). Raising it is the
expected outcome, not a failure.

The specs are final and PM-accepted as of 2026-07-25; nothing in either is open. Two pacing-rationale
sentences in §5.1 were corrected after filing (DEC-019) — they change no budget, no anchor, no window.

**Acceptance criteria**:
- Product voice throughout — §2 is not one of the two first-person places
- A non-technical reader follows the narration alone; a technical reader reads the terminal lines; both reach `bodh.day · LIVE`
- Lands the honest headline beat: the PM re-checked the developer's work with its own screenshots, QA passed 11/11, no human touched this until the deploy button
- No rounded numbers, no adjectives-as-argument, "measured" never "proven", scope labels correct, AI team named as AI
- **Every factual claim cites a line in `bodh-sprint4-corpus.md`.** A claim the corpus does not support is cut, not softened
- The Safari-only SVG catch is omitted, or narrated explicitly as a founder-directed polish pass — never as part of the untouched run
- Never imply the website wave alone cost 9.3 h / $147

**Pre-sourced claims are listed in `copy-rules.md`** → "§2-specific: the do-not-overclaim boundary."
Use those; don't improvise near them. Compression and merging of corpus lines is permitted; invention
is not. Anything not in the corpus is not in the replay.

**Key refs**: `agent-skills/content/copy-rules.md` · `product-spec-seed.md` §2 ·
`bodh-sprint4-corpus.md` · `design-specs/web/section-02-beat-inventory.md` ·
`design-specs/web/section-02-replay.md` · `muster/team/content/skills/generic/brand-voice.md`
