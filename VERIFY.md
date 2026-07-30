# VERIFY

This page makes measured claims. This file says where each one comes from and how to re-derive
it. Nothing here asks to be taken on trust.

## The method, in five lines

1. Whole-build numbers are metered from Claude Code session logs by
   `muster/scripts/muster-meter.py`; a single autonomous run's per-step figures come from the
   sprint driver, which writes them as it goes. Neither is hand-entered.
2. **Active build** is the sum of gaps between consecutive session events, each gap capped at
   300 s. It is working time, not elapsed time.
3. **Operator attention** is the same gap math over human-typed prompts only.
4. **Cost** is API list price from a snapshot of LiteLLM's public rate table — the cost to
   replicate the build, not subscription spend.
5. **Elapsed** is the count of distinct git commit-days, which anyone can check from the log.

Re-run it against this repo:

```
python3 muster/scripts/muster-meter.py <this-repo-path> --repo <this-repo-path> --json
```

## Three scopes, never mixed

| Scope | Span | What is measured |
|---|---|---|
| **BODH** | idea → live | 9.3 h active build · $147 API list · 4.8 h operator attention · 4 commit-days (Jul 11–18) · the whole product, iOS app included |
| **BODH SPRINT-4 WEBSITE WAVE** | one evening, the chain §2 replays | ~64 minutes of agent work across 8 sessions · 289 API calls · $24.73 |
| **THIS SITE** | spec → live | — · measured at launch |

A figure from one scope is never presented as a figure from another. THIS SITE's column stays
dashed until the metered snapshot is committed; a dash is what an unmeasured metric renders as
here, and no estimate stands in for it.

## What is committed in this repo, and what it holds

| Artifact | What a reader can check |
|---|---|
| `.muster-sprint-logs/*.metrics` | one line per completed autonomous step: `turns\|cost\|context %\|output tokens\|output tokens raw` |
| `.muster-sprint-logs/*.log` | the driver's own run log — which step ran, when, and how it ended |
| `knowledge-base/orchestration-queue.md` | the step sequence, and which agent was told to do what |
| `knowledge-base/agent-requests.md` | every handoff and request between agents, with review verdicts |
| `knowledge-base/decision-log.md` | every product decision, dated, with its rationale |
| `knowledge-base/design-specs/web/` | the specs each section was built from, with their measurements |
| `knowledge-base/bodh-sprint4-corpus.md` | the source for §2's replay — the build log it condenses |
| `git log` | the build history. Each commit subject names the role that made it |

## The page's own claims, checked mechanically

```
bash scripts/test.sh                    # both engines: Blink, then WebKit
node tests/qa-independent-audit.mjs     # QA's independent re-verification
```

`scripts/test.sh` asserts the claims this page makes about itself, among them: zero external
network requests at runtime, contrast floors in both themes, complete content with motion off
and with JavaScript off, and byte-fidelity of §2's replay against the corpus above.
`tests/qa-independent-audit.mjs` re-derives its checks from the specs rather than from the build
harness, so a gap in one does not become a gap in both.

## The setup command

```
curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product
```

The script that command fetches is readable in the repository before it is run:
`github.com/thinkArhant/muster-ai`.

## Who built this

This page was built with Muster, by Muster's AI team, with one operator. Five of the eight
roles ran this build — PM, Developer, UI/UX, QA, and Content; Marketing, Legal, and Research
were never invoked. Which role ran which step is recorded in the queue and the handoff ledger
above — read them rather than taking a count on trust. The hero's `8 AI agents · 1 operator`
describes Muster's roster, not the participation in any one build; the footer states the
participation.
