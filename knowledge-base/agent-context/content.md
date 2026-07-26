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

**Sprint 2 — two steps. Your §1/§3 step runs FIRST in the whole sprint**, because the hero design must
specify a headline treatment and its accessible name against your real candidate strings (DEC-034).

### 1. §1 and §3 copy → `section-01-copy.md`, `section-03-copy.md`, HO-018 (model: claude-fable-5)

**The §1 headline is yours to make and defend.** The seed calls the anchor text *"Ship a product.
Without a team."* **available, not locked**, and says *"Content arranges headline vs. subline."* Deliver
3–4 candidates with one recommendation; the founder picks at Gate A from **rendered** versions.

**The founder's own direction is the incumbent to beat:**

> *Ship a product with a ~~human~~ **AI agents** team* — "human" struck, "AI agents" accented.

A strong idea — it resolves the ambiguity visually instead of spending words, and a strikethrough is an
**edit mark**, on-thesis for a page about process. Four things decide whether it lands:

1. **The article breaks as written** — "a human team" → "a AI agents team" does not parse. Strike the
   article with the adjective, or find better. Do not ship the founder's phrasing verbatim.
2. **Screen readers** announce struck text as ordinary text. Write copy that survives being read aloud.
3. **The accent cannot be a new colour** (A-006). Rust on display-size text is available (DEC-017).
4. **Does it cost a beat of confusion?** §1's job is a message landing in five seconds.

**Rulings you have, so you need not invent them:**

- **The measured line.** The seed's string is *"this build: 9.3 hours of active build, $147 in AI
  tokens"* — but "this build" reads as THIS SITE while the numbers are BODH, which is A-005's named
  failure mode inside the source string. **You may and should rewrite the framing** so scope is
  unambiguous. §1 is a brief, not the locked draft §4 is. The numbers never change.
- **Length budgets.** None exist for §1/§3, unlike §2's narration. **Set them** — state a word count and
  rationale per string. PM recounts against your stated budget rather than against nothing.
- **The eight role labels**: PM · Developer · UI/UX · QA · Content · Marketing · Legal · Research.
- **§3's CrewAI/AutoGen clause** rests on the founder's own survey. Research is unstaffed this sprint —
  if no research lands before §3 builds, the clause ships **cut, not softened**.
- **SP3 overflows §2's narration card at 320px** and the lever is copy length, open exactly once, now.

### 2. §4, §5 and §6 copy → three files, HO-023 (opus)

**§4's four decisions are founder-authored locked draft.** Tighten only — never inflate, never reorder,
never add a fifth. R7 permits first person here. **"Tightened, not rewritten" must be checkable**: every
original sentence's subject and claim survive, no sentence is deleted, and you state before/after word
counts per decision so PM verifies rather than judges.

**§5** carries Bodh, the provenance line, and this site. The provenance line is founder-supplied first
person — preserve it. The source app stays unnamed. THIS SITE is dashes. No growing-list hype.

**§6** is one `curl`, byte-identical to the string in `copy-rules.md`, then `cd my-product && claude`,
and **one GitHub link**. `muster.build` is fictional and must never appear (DEC-010, R12). Verify by
string equality, not by fetching.

**Binding throughout**: every rule in `copy-rules.md`, and `brand-guidelines.md` §5 — which holds the
only enumerated banned-word list. Scope labels are the page's likeliest factual failure.

## SP7 as it now stands (2026-07-26 — supersedes the note above)

SP7 was rewritten at the founder's Wave 3 gate (DEC-024) and accepted with no revision (DEC-027):

> The operator planned the sprint, left the agents running, and returns to a deploy-ready site.

**15 of 16 words, 4.29 s of the 4.80 s hold, and SP6's relief is still unspent at 10 of 12.** The timed
total is unchanged at 139 of 163. The thesis is now told as the operator's arc rather than by negation;
the honest-headline fact — no human touched the chain until the deploy gate — is carried inside it,
stated as what the operator did rather than what no one did.

**The guardrail that governed the rewrite is worth keeping.** The ask arrived as "something a VC would
want to hear that would amaze them," which is the exact instruction that produces adjectives-as-argument.
The line contains none: "deploy-ready" is the packet's recorded state, not praise for it, and the effect
comes from tense landing on a terminal that reads `awaiting operator`. On this page a sentence reaching
for awe is a blocking finding no matter how well it reads.

One item is carried to Sprint 2 and the lever is copy length: **SP3 overflows the narration card at
320px** (7 lines into a 6-line budget). Nothing to do now — SP3 is not open — but any future growth in
that string makes it worse, and any replacement should aim under six rendered lines at 320px.
