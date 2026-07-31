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

## What this site has cost so far — a floor, and not the THIS SITE row

The row above is dashed and stays dashed. What follows is a narrower measurement that does not
fill it: what the **committed autonomous step-sessions** cost, as the sprint driver recorded them
in `.muster-sprint-logs/`. Read it as a floor, for two reasons stated up front.

1. **Interactive sessions are not in it.** Founder gates, interactive fix rounds and the closing
   round that shipped this file are not metered here.
2. **It is a snapshot, and the logs kept growing after it was taken.** The figures below were read
   at the final build gate, over the step-sessions committed at that point. Summing the committed
   files today gives a larger number, because more steps ran after the snapshot.

Nothing in this section is an answer to *spec → live*. That answer is a single metered snapshot,
and it lands at launch.

| Measured | Figure | Over |
|---|---|---|
| Spend | $594 | 51 committed step-sessions |
| Driver time | ~27.3 hours | the same 51 sessions |
| Premium model tier | 14 steps · $209 | 35% of the spend |
| Standard model tier | 37 steps · $385 | the rest |
| Waste from errored runs | under 10% | the same 51 sessions |

Per-step figures are one line each in `.muster-sprint-logs/*.metrics`; the model each step ran on
is named in the driver's run log beside it. The waste share is the part that matters for reading
the rest: under a tenth of the spend went to runs that failed and were re-run, so the cost is
structural rather than accidental.

### The rate, with its inputs

$594 over ~27.3 hours of driver time is **$21.8 per hour**. The product this site exhibits priced
its own website wave at $24.73 for ~64 minutes of agent work — **$23.2 per hour**. The rate is
what the framework costs to run; what differs between the two is hours, not price per hour.

Two things about that comparison, stated rather than smoothed:

- **The denominators are not the same measure.** Driver time is the sprint driver's own run clock.
  The wave's ~64 minutes is agent work summed from session logs. They sit close for autonomous
  chains, because a chain runs back to back with no idle gaps — the same property that makes the
  wave's active build and its elapsed span agree — but they are not interchangeable, and neither
  is the `active build` measure defined at the top of this file.
- **The hours are the whole of the difference.** This build carried four founder gates, three fix
  rounds on §2 alone, one full section redesign after a gate, and three harness runners re-run at
  nearly every step. A one-page site does not need that apparatus. A page whose entire claim is
  that its claims are checkable does.

None of these figures appears on the page. The page prints measured inputs and no rate derived
from them, and it prints no human or agency cost baseline anywhere — that comparison is the
reader's to make, with the reader's own numbers.

## The four receipts, live

The page's footer links these four artifacts as commit-SHA permalinks, pinned to the moment each
file is most a demonstration of itself — a snapshot cannot rot, and cannot be quietly rewritten
after the claim is made. Current state lives here:

- [orchestration-queue.md](https://github.com/thinkArhant/muster-ai-site/blob/main/knowledge-base/orchestration-queue.md)
  — the step sequence as it stands today
- [agent-requests.md](https://github.com/thinkArhant/muster-ai-site/blob/main/knowledge-base/agent-requests.md)
  — the handoff ledger as it stands today
- [decision-log.md](https://github.com/thinkArhant/muster-ai-site/blob/main/knowledge-base/decision-log.md)
  — the decision record as it stands today
- [VERIFY.md](https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md) — this file

The two differ on purpose: the pinned link is the receipt, this one is the running file. Compare
them and the diff is the build since.

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
