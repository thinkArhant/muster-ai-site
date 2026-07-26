# Muster framework feedback — from the muster-ai-site build

<!-- Findings about MUSTER ITSELF, not about this product. Accumulated during the build and handed to
the Muster core team at project close. Product decisions live in decision-log.md; this file is only for
things that should change in the framework. -->

---

## FF-001 — PM audits plans with subagents because the framework gives it nothing cheaper

**Filed**: 2026-07-26, during Sprint 2 planning
**Severity**: high — this recurs on every sprint plan, for every project
**Founder cost this instance**: ~284k subagent tokens across three agents, producing zero build output

### What happened

PM wrote a 13-step Sprint 2 plan, the founder asked it to be stress-tested, and PM spawned three
fresh-context subagents to audit it by reading only what each queue step hands its executor. The audit
found three blocking sequence defects and roughly a dozen real ones, all before the run started.

The findings were genuine and the highest-value ones were expensive to miss:

- A design step scheduled **before** the copy it had to specify a treatment for — a premium-model step
  designing against strings that did not exist yet.
- A shell build scheduled **after** the sample rendered from that shell, while a later step declared
  divergence-from-sample a defect. The plan armed a trap and walked into it.
- An acceptance criterion (`scripts/test.sh` green) that was **impossible to satisfy** for the step that
  must ship a URL, because the harness fails any shipped `http(s)` string. The cheapest fix available to
  a blocked headless agent would have been deleting the check — which is the mechanical guard on the
  product's most load-bearing published claim.

On pure economics the audit won: a single Sprint-1 fix round on this project cost ~$42 and one founder
gate, and the audit plausibly avoided two to three of them plus one silent product-claim regression.

### Why it was still the wrong shape

**1. Most of what it found is deterministic and needed no model at all.** Roughly 60% of the findings are
greppable:

| Finding class | Mechanical check |
|---|---|
| `file:line` citations pointing at the wrong selector | resolve every `path:line` in the queue; assert the symbol is on that line |
| Orphaned handoff ID (HO-021 referenced, never produced) | extract HO-NNN sequence; assert contiguity and that every consumed ID has a producer |
| Producer/consumer path mismatch (`section-04-copy.md` vs `knowledge-base/design-specs/web/section-04-copy.md`) | extract every `Deliverable:` path and every `Inputs:` path; diff |
| Steps missing a `Deliverable:` line | lint |
| Blocked-path instruction present only in HTML comments **outside** the fenced blocks, so no specialist ever received it | assert every fenced block contains the required instruction |
| Broken markdown table (a row stranded outside its own table by inserted prose) | table linter |
| A term the plan requires that exists nowhere in the knowledge-base (the eight role names) | grep every quoted requirement for a definition |
| Dangling decision IDs | grep |

None of that needs judgment. All of it needs a script that does not exist.

**2. Three agents was redundancy, not coverage.** All three independently found the missing role names;
two found the same wrong line numbers; two found the same sequence defects. The redundancy caught
nothing the cheapest agent missed. The structural-audit agent — 59.9k tokens, the smallest of the three —
returned the highest-value findings (both sequence defects, the gate-consumption gap, the
instruction-outside-the-fence defect, and the model-assignment reasoning). One agent with that prompt
plus a lint script would have delivered ~90% of the value at ~⅓ the cost.

**3. The audit was paying to discover things the author could have known while writing.** This is the
uncomfortable one. PM wrote `.log__line` "(~164)" from recall and it was right; `.narration__entry`
"(~206)" from recall and it was 24 lines off, pointing at an unrelated rule. PM wrote "`scripts/test.sh`
green" without opening `verify-shell.mjs`, which is where the impossibility lived. **Every citation
written without opening the file is a defect waiting to be paid for at audit time or at run time.** The
audit did not fail; the authoring did.

### Why a cheaper alternative does NOT work — worth recording so nobody proposes it

The obvious cheap alternative is a dry run: execute step 1 and see whether it stalls. **That does not
work in autonomous mode, and the reason generalises.** A headless agent facing an ambiguity does not
halt and ask — it assumes and proceeds confidently. The failure is therefore silent, and it surfaces
several steps later as a wrong artifact everything downstream has been built on. The cold-start audit
works precisely because it asks "what would I have to invent?" instead of inventing.

So *some* fresh-context agent time is irreducible. The insight that a designer was being asked to
specify a treatment for strings that did not exist is not greppable — it requires simulating the
cold-start experience. The waste was in the redundancy and in the un-grounded authoring, not in the
technique.

### Recommendations to the core team

**R1 — Ship `muster-plan-lint.sh` alongside `muster-queue-lint.sh`.** The existing queue lint only checks
structure (one fenced Next Step, valid `Role:` per block). It should also check *referential integrity*,
which is where plans actually break. Minimum set: every `path:line` citation resolves to the named
symbol; every consumed handoff ID has a producer; every `Inputs:` path matches some step's `Deliverable:`
path exactly; every fenced block carries the blocked-path instruction; every step has a `Deliverable:`;
no dangling `DEC-NNN`. Every one of these caught a real defect on this project.

**R2 — Make the cold-start audit a named, single-agent skill, not an ad-hoc fan-out.** One agent, one
prompt: *"read only what this step hands its executor; report what you would have to invent."* Run it per
step, or on the two or three highest-risk steps, rather than three agents over the whole plan. Budget it
explicitly so the founder is not surprised by the spend.

**R3 — Add a `sprint-planning.md` rule: cite nothing you have not opened.** Any file path, line number,
selector, or test-harness claim written into a queue step must be verified against the artifact at
authoring time. This is the cheapest possible fix and it removes the majority of what the audit found.

**R4 — Make the run-time cost of a planning defect visible at planning time.** PM had the data to know a
fix round costs ~$42 and a gate, but nothing in the framework prompts it to weigh audit cost against
expected rework. A one-line convention in `sprint-planning.md` — *state the plan's audit budget and the
cost of one fix round* — would make this a decision rather than an instinct.

**R5 — Ordering rules deserve to be first-class, not prose.** Two of the three blocking defects were
ordering: copy-before-design, and shell-before-sample. Both were derivable from the dependency graph the
plan already implies. A lint that builds the graph from `Deliverable:`/`Inputs:` pairs and reports any
step consuming an artifact produced later would have caught both, mechanically, for free.

### The honest verdict

The audit was justified given the state of the plan, and the founder's money came back several times
over in avoided rework. But it cost about three times what it needed to, and the plan should not have
needed it. The framework should make R1 and R3 cheap and automatic, so that the expensive technique (R2)
is reserved for the judgment-shaped question it is actually good at — *what would a cold reader have to
invent?* — rather than spent re-deriving line numbers a script could have checked.
