# Wave Review
<!-- File-mediated I/O contract between the autonomous sprint loop and the founder at a wave gate. PM-owned. Tier-2: read on demand only (at a wave gate / on resume), never a startup read. -->
<!-- The loop does NOT parse this file. PM writes the Output block at the gate; the founder writes the Verdict block; PM reads the verdict on resume (muster/scripts/muster-sprint-resume.sh). Keeping human feedback here — not in the orchestration queue — is the seam a future remote/mobile bridge plugs into. -->

> **This is the GATE A packet — copy and rendered samples, before anything is built.** It sits here on
> purpose: copy is a build input, and reviewing it after the section exists is how rework happens. The
> three §2 verdicts from Sprint 1 are preserved at the bottom of this file; this is a new gate, not a
> re-judgement of that one.

## Current Wave

**Wave:** Sprint 2, Wave 1 — six specs and copy files, plus one rendered sample
**Build at:** the autonomous worktree on `sprint/auto-20260725-163930`. The live page is `index.html`
in that worktree; the sample is `samples/gate-a.html`.
**Under review:** HO-018 · HO-019 · HO-020 · HO-021 · HO-022 · HO-023 · HO-024 · HO-025 — all eight
reviewed and accepted before this packet was written. Nothing below is waiting on a verdict from me.

**What this gate is for**: four things need your taste. Everything else that could be settled has been
settled, and everything a machine could decide has been run rather than argued.

---

## Open this first

**`samples/gate-a.html`** — open it in a browser. It is one file, it fetches nothing, and it renders
all four headline candidates and one real §4 spec-sheet in both themes, in the page's actual tokens,
with the machine's own measurements printed beside each one. It is not a mockup: the type, the colours
and the spacing are the shipping values.

Read it in this order:

1. **The four headlines**, dark theme, at your window's width. Then narrow the window to phone width
   and look again — the sample prints the actual line breaks at 320 / 375 / 1280px under each.
2. **The §4 spec-sheet**, both themes. This is the second design centerpiece and the first time it
   exists as an artifact rather than a specification.
3. Then come back here for the copy.

---

## 1. Pick the §1 headline

Four candidates. The recommendation is **B**, and the case against it is real enough that it belongs in
front of you rather than in a handoff.

| | Visible string | Announced to a screen reader (read from the AX tree, not asserted) | Lines at 320 / 375 / 1280 |
|---|---|---|---|
| **A** | `Ship a product. Without a team.` | `SHIP A PRODUCT. WITHOUT A TEAM.` | 2 / 2 / 2 |
| **B** ★ | `Ship a product with ~~a human team~~ AI agents.` | `SHIP A PRODUCT WITH AI AGENTS.` | **4** / 3 / 2 |
| **C** | `Ship a product. The team is AI.` | `SHIP A PRODUCT. THE TEAM IS AI.` | 2 / 2 / 2 |
| **D** | `Ship a product with a muster of AI agents.` | `SHIP A PRODUCT WITH A MUSTER OF AI AGENTS.` | 3 / 3 / 2 |

**B is your own edit mark, with the article break repaired.** As you wrote it — *"Ship a product with a
~~human~~ AI agents team"* — it reads "a AI agents team"; B strikes the whole noun phrase instead of the
one word, which fixes the grammar and keeps the idea.

**The thing B does that nothing else on this page does**: the struck words are *absent from what a screen
reader announces* and *present in what a sighted reader sees*. That is measured — the announced string
above came out of Blink's accessibility tree, not out of a promise. Select-and-copy still yields the full
visible sentence, which is stated as accepted rather than solved.

**The defect, and it is the reason this is a gate item.** At 320px B sets four lines, and the second one
is a lone `WITH`:

```
320px   SHIP A PRODUCT / WITH / A HUMAN TEAM / AI AGENTS.
375px   SHIP A PRODUCT WITH / A HUMAN TEAM / AI AGENTS.
1280px  SHIP A PRODUCT WITH / A HUMAN TEAM AI AGENTS.
```

An orphan `WITH` at display size is not "every line is a whole phrase," and **it cannot be engineered
away**: binding `WITH A HUMAN TEAM` into one unbreakable unit measures ~290px against a 272px column and
overflows, which is the exact failure the type floor was already amended to remove. So the honest choice
is *accept the orphan on the narrowest phones* or *take A or C*. Nothing overflows in any case, and B's
two treated phrases stay unbroken at every width.

**A's weakness, stated so the trade is symmetric**: "Without a team" sits one viewport above a formation
labelled as a team of eight. A skeptical reader spends a beat reconciling those, and the subline resolves
it one line too late for a five-second skim. C resolves that ambiguity in words and loses the edit-mark
idea entirely.

**Recommendation: B, accepting the 320px orphan.** 320px is the narrowest phone still in circulation and
the line is legible and unbroken there; the edit mark is the strongest five-second idea any of the four
carries. **A is the fallback and costs nothing** — it needs no spec change and no rebuild.

---

## 2. Judge the §4 spec-sheet

In the sample, both themes. This is decision 1, real copy, real spec — not a placeholder.

What it is trying to be: an instrument reading, not a testimonial. Your voice in sans, the machine's
chrome in mono, and **no rust text anywhere in the section** — the accent appears only as a 2px bar
against the Mechanism row. That was not a preference: ink-on-rust measures 3.43:1 dark and 2.79:1 light,
so filled-rust containers with text are unusable here, and the emphasis had to come from somewhere else.

| What was measured | Reading |
|---|---|
| Prose column | 685.31px (= 64ch) inside a 903.31px card |
| Mechanism mark | 2px of accent, 12.00px from the card's inner edge |
| Rust text in the sheet | zero elements, dark **and** light |
| The title's announced name | `I optimized what each agent reads, not how they talk.` — the italic is inside the name |

**The one thing to look for**: whether the sheet reads as a *specification* or as a *quote block*. If it
reads as a quote block, the whole §4 idea is wrong and it is much cheaper to hear that now.

**Second thing, smaller**: the longest title runs 6 lines at 320px. That is a lot of bold display type on
a small phone. It measures fine; the question is whether it reads or shouts.

---

## 3. Read the copy — all five sections

Return findings as one list. Files, in reading order:

| Section | File | What is new |
|---|---|---|
| §1 hero | `design-specs/web/section-01-copy.md` | headline candidates, subline, measured line, eyebrow, readout strings |
| §3 insight | `design-specs/web/section-03-copy.md` | kicker + one paragraph |
| §4 decisions | `design-specs/web/section-04-copy.md` | **your draft, tightened by five words** |
| §5 shipped | `design-specs/web/section-05-copy.md` | three prose lines + two readout cards |
| §6 get started | `design-specs/web/section-06-copy.md` | lead line, `curl`, `cd`, one link |

**Three things worth knowing before you read:**

**§4 is barely touched, and that is the finding.** Five words out of 420, across four edits, in three
rows. Every sentence you wrote survives — 30 in, 30 out, none deleted, split, merged or moved. I
re-derived the diff from your seed independently rather than accepting the report:

| Row | Edit |
|---|---|
| 1 · Problem | `the thing that actually breaks` → `what actually breaks` (−2); `room and let them` → `room, let them` (−1) |
| 1 · Trade-off | `one role has to own` → `one role must own` (−1) |
| 2 · Decision | `prose is reserved for judgment` → `prose is for judgment` (−1) |

Everything else is word-identical. The draft carries almost no fat; a bigger delta would have meant
cutting clauses, and cutting your copy is your call, not Content's.

**Which raises the one §4 question**: your seed says *"Keep each ~4–6 sentences."* The draft runs **7–8
per decision**. It measures fine — nothing overflows, the sheets fit — so this is purely whether it reads
long once you see it rendered. You are looking at decision 1 in the sample; judge the density there. If
it reads long, say so and Content cuts to your number. **My recommendation: ship it. Each sentence is
carrying a distinct claim, and the ~4–6 was a note to yourself before the copy existed.**

**§4's decision 4 has no date and must never get one.** Its stamp is `product — Bodh`. Bodh's launch date
exists in the corpus and inserting it would fabricate provenance for a decision out of a deploy. The
stamp is built as one text slot precisely so the no-date case ships as supplied. Nothing needed from you
— stated so it is not read later as an omission.

---

## 4. Rule on §1's formation — eight roles, nine seats

Two of your read-only source files disagree and neither can be edited from inside the sprint.

- `product-spec-seed.md` **line 58**: *"the **eight named roles as labels** on the concept visual (PM
  command hub + bus-bar formation)"*
- `product-spec-seed.md` **line 224** and `brand-guidelines.md`: *"the roster as a formation (**PM hub +
  eight plates** on a bus-bar)"* — one hub plus eight plates is nine seats for eight roles.

**Recommendation: the hub is PM and the bus-bar carries the seven specialists.** Line 58 effectively
settles it — it says the labels on the visual *are the eight named roles*. Hub = PM puts exactly eight
role labels on the visual. The alternative (hub = the human operator, eight plates = the eight AI roles)
puts **nine** labels there, one of which — `OPERATOR` — is not a role, so it cannot be the reading line 58
describes. It also reads truest to what Muster is: PM coordinates, specialists execute.

It is built to that reading already. **If you pick the other, it is a label swap, not a redesign** — both
label sets are written and final.

The eight names are settled and need nothing from you: **PM · Developer · UI/UX · QA · Content ·
Marketing · Legal · Research.**

---

## Already green — machine-verified, do not spend attention here

Every one of these was run this session, foreground, by me — not read off a handoff.

| Check | Result |
|---|---|
| `bash scripts/test.sh` on the clean tree | ✅ **GREEN**, both engines, 1m49s |
| `node tools/gate-a-report.mjs` | ✅ **51/51, exit 0** |
| All four headlines' announced strings vs. their ruling | ✅ match, word-exact, read from the AX tree |
| §4 seed-vs-shipped word diff, all 16 rows | ✅ 420 → 415, −5, **re-derived independently** |
| §4 sentence count | ✅ 30 → 30 |
| Every stated word budget across all five copy files | ✅ **recounted, all match**, none over budget |
| Every stated contrast pair, both themes | ✅ **recomputed from the locked hex, all 8 exact** |
| `curl` byte-equality across the four files that carry it | ✅ identical |
| R4 · R5 — THIS SITE dashed, every metric scope-labelled | ✅ |
| R6 · R10 · R12 — no "proven", no minor version, no `muster.build`, every URL real | ✅ |
| R1 — no rounded number, no banned adjective, no exclamation mark | ✅ |
| §1's element inventory vs. seed §1, item by item | ✅ all nine present |

**The two assertions this sprint is built on were planted and proven to fail.** I did not take this on
trust — I broke the build twice and watched the harness catch it:

- `--mark-clear: 0ch` (the exact defect you gated at Gate 3) → **R2 goes red at all three states**,
  reporting `L4 0px · L9 0px`.
- `--mark-inset: 8px` → **R1 goes red**, reporting `terminal 8px / narration 12px … expected 8px read
  from --mark-inset`. Note what that proves: the expected figure *followed the token* to 8px, and the
  check still failed — on the inequality between the two layers. It cannot be satisfied by moving the
  value it was written against, which is the whole point of the relationship rule.

Both reverted; the tree is clean.

---

## One thing that is not green, and it is mine to fix, not yours

**`tests/qa-independent-audit.mjs` hangs.** It does not fail — it stops, silently, every time, in the
375 × 553 mobile chain, and never returns. Measured: the Node process sits at 0% CPU while its Chrome
child spins at ~105%, and the CDP client has no timeout, so a reply that never arrives blocks forever.

This is the second, independent harness. `scripts/test.sh` — the primary one — is green on the same
tree, both engines, so **no shipped check is unverified**; what is missing is the cross-check.

Ruled and scheduled, no decision needed from you: the timeout lands in the next build step (a harness
that can hang cannot report), and the renderer diagnosis lands with QA, which owns the audit. I have
noted it here rather than leaving it out because "51/51 and green" would otherwise have been an
incomplete sentence.

---

## Settled without you — stated for visibility, not for a ruling

Six items reached me that a founder gate did not need to spend attention on:

1. **The `9.3 h` repeat in §5 stays.** §5's cards carry operator attention (4.8 h) and commit-days (4) —
   the two measured figures the page shows nowhere else — and a figure for what the operator spent needs
   the build figure beside it as a denominator. It renders byte-identically to §1's string.
2. **Cross-engine for scroll-snap is a manual check, not a mechanical one.** QuickLook cannot scroll, so
   WebKit parity for a *behaviour* is unreachable on this machine. Driving Safari would need a one-time
   admin authorisation from you plus new harness surface in a sprint with none budgeted — not worth it.
   It becomes a manual pass, labelled as manual, never reported as a mechanical result. **One sentence
   gets added to your Gate B iPhone ask**: whether section snapping fights your scroll.
3. **`brand-guidelines.md` no longer names a footer lockup** — it disagreed with the ruling that the
   footer takes no mark. Amended. Its stale `~8px` pennant size is corrected to `6 × 9px` at the same time.
4. **The display-type token lands with §1, not before it.** No harness currently asserts it, and landing
   an unguarded token change ahead of the assertion that guards it is how values drift here.
5. **§3 names CrewAI and AutoGen.** Your seed instructs the fold and the only thing attributed to them is
   your own characterisation. The cut is pre-authored if a later review disagrees.
6. **§5's provenance line contains no first-person pronoun** despite the seed labelling it "(first
   person)". It ships exactly as you supplied it. The label describes who wrote it, not its grammar.

---

## Verdict

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

### Gate A — 2026-07-27

**Four things need your word.** Everything else above is either already green or already settled.

1. **Headline** — A, B, C or D. (Recommendation: B, accepting the 320px orphan. A is the free fallback.)
2. **§4 spec-sheet** — does it read as a specification or as a quote block? Anything to change?
3. **Copy** — all five sections, as one list of findings.
4. **Formation** — hub = PM (recommended), or hub = operator?

**Status:** IN PROGRESS — recorded item by item as the founder settles each, so nothing is held only in
conversation. The gate is not complete until all four carry a decision.

**Findings:**

**1. HEADLINE — SETTLED.** Candidate **B, amended to keep "team"**, with the accent narrowed:

```
Ship a product with ~~a human~~ an AI team.
```

- **Struck**: `a human` (ink, `aria-hidden`) · **Rust**: `an AI` · **Plain ink**: `team.`
- **Announced string**: `Ship a product with an AI team.`

*Why it beat the recommended B.* PM measured the amendment in the sample's real tokens before proposing
it. It is better on all three axes rather than trading one for another:

| | 320 | 360 | 375 | 390 | 1280 |
|---|---|---|---|---|---|
| B, as recommended | **4** | 3 | 3 | 3 | 2 |
| B + "team" (shipping) | **3** | 3 | **2** | **2** | 2 |

The 320px orphan `WITH` that was the sole objection to B **does not occur** in this form. Measured line
breaks: `Ship a product / with a human / an AI team.` at 320px — every line a whole phrase, the struck
phrase intact, the accented phrase intact. At 375px and above it sets two lines with the entire
substitution on one of them, so the edit reads as a single gesture.

*Why the accent is `an AI` and not `an AI team`.* The strike removes `a human`; what replaces it is
`an AI`. **`team` is the constant that survives the edit** — accenting it would imply it is new and
would blur the one idea the headline makes: the team does not change, its members do. Struck = removed,
rust = replacement, plain = unchanged. Determiner-plus-modifier on both sides, so the swap is
unit-for-unit.

*Cost of the accent decision*: none. Colour does not affect layout, so the measured line counts hold,
and the announced string is unaffected because the strike is hidden and rust is only colour.

*Carried to the fix round*: Content finalises the exact string in `section-01-copy.md` and removes the
unselected candidates; UI/UX re-measures against §3's fold budget and specifies the accent scope. This
is a variant of an approved candidate — it rides the existing path, no rebuild of the sample.

**2. §4 SPEC-SHEET — PASSES, WITH TWO AMENDMENTS.**

*"It reads as a spec for sure"* — the concept holds and the rendering is accepted. The Decision /
Problem / Trade-off / Mechanism structure stays, as does the no-rust-text emphasis system (forced by
measurement: ink-on-rust is 3.43:1 dark and 2.79:1 light, both under the floor).

**A — §4 is written for a different reader than the rest of the page. §4 ONLY.**
The founder's ruling: §4's readers are non-technical — VC, and people evaluating him to hire. The copy
is rewritten in their language and **shorter**, because that reader will not work for it. The rest of
the page keeps the `product-spec.md` target reader (*the skeptical technical cold reader*) unchanged —
§2 is proof and §3 is mechanism, and both stay technical.

*This is coherent rather than a compromise*: §4's job in the scroll is *"shows the judgment behind
it"* — it is the section where a reader decides whether to trust the person, which is precisely what a
VC or a hiring manager is there to decide.

**The guardrail, stated because the ask has the same shape as one that nearly went wrong before.**
"Write it for VCs" is the same instruction shape as "something that would amaze them," which nearly
inflated SP7 in Sprint 1. **Plainer words, not bigger claims.** Translating jargon for a non-technical
reader is the job; making the decisions sound more impressive than they were is the one unrecoverable
brand failure on a page whose whole argument is checkability. Every trade-off stated in the seed's
draft survives the rewrite — a decision that loses its cost stops being a decision.

**Cascade, settled here by the seed's own logic.** Seed rule 11 permits insider terms (*cascade lag*,
*cold-start sufficiency*) "only where they earn their meaning," and `product-spec.md` records that
they earn it in §4. With §4 in plain language, nowhere on the page satisfies rule 11's condition — so
they drop out by the rule rather than by override. §3 is the only alternative home and is one
paragraph long. Reversible if the founder wants them kept.

**B — Four sheets must not exceed one screen, and the layout is decided AFTER the copy is rewritten.**
The founder does not want §4 taller than a single screen and raised horizontal scroll as the likely
answer. Correct instinct, wrong order: **copy length determines which layouts exist at all.** Four
sheets at the current 4–6 sentences cannot share a screen by any arrangement; at two or three short
lines each, a 2×2 grid may fit at desktop and a carousel may be unnecessary.

*For UI/UX when it picks*: horizontal scroll is **not** ruled out by Sprint 1's §2 ruling. That
removed sideways dragging *within a line of text*; scrolling *between discrete cards* is a different
and normal pattern. But it carries a real cost — readers miss content that sits off-screen sideways,
and a carousel is a lot of machinery on a page arguing for restraint. Judge it against the rewritten
length, and state the measured height either way.

**One thing to keep watching**: the longest decision title runs six lines at 320px today. The rewrite
should retire that on its own; if it does not, it is a finding.

**C — §4's four decisions are RE-SELECTED, not just rewritten. Scope grew after the ruling above.**
Founder direction: build a candidate list of ~10 real decisions that shaped Muster, then narrow to the
three or four that ship — so the section is chosen from the full set rather than inherited.

**The section's job, in the founder's words**: show that he is a **systems thinker** with expert domain
knowledge — that the taste and judgment to design a system that works is the strength on display.
Every decision is about **Muster only**. Nothing about Bodh, nothing about Arogh.

**Immediate consequence — the seed's decision 4 is out.** *"Building a real app with it, I removed the
one feature every competitor adds"* is a Bodh product decision and is excluded by the Muster-only rule.
That frees a slot, and it also retires the `(product — Bodh)` stamp — the one instance with **no date**
that UI/UX had to specify a special case for. If no replacement is dateless, that special case can go.

**Coverage required**: at least one decision on **architecture**, at least one on **systems thinking**.
Founder-named candidates to investigate: the **autonomous sprint** (leave the agents running for hours,
return to finished work); the **feedback loop** (a project offers its telemetry and retro at sprint
close → filed as a GitHub issue → XO prepares the PR for the next framework version); and
**environment-variable knobs** the operator tunes to preference.

**How this was sourced**: the founder ran candidate-generation and a stress-test round in a separate
session, so the exploration never entered this project's telemetry or token budget. Ten candidates came
back with git evidence; the stress test (against the founder's own bar — *does the reader see he
understands tokens AND human time?*) revised the recommended four. PM adopted the revised four, made
the two rulings that round left open, and **verified every load-bearing commit citation by running
`git log` against the framework repo directly** — all five hashes, dates and messages match. Recorded
as **DEC-044**.

**SELECTED — the four that ship, strongest first.** Content writes each as Decision / Problem /
Trade-off / Mechanism, in plain language per amendment A; the trade-off is load-bearing and survives.
The material below is the source of truth for the Content fix step.

**1 · Tiered reading — architecture. Stamp: 2026-04-24.**
- *Decision (founder's voice)*: "I optimized what each agent reads, not how they talk."
- *Problem*: multi-agent frameworks obsess over messaging; the real ceiling was each agent's context
  window filling with what it didn't need.
- *Trade-off*: agents never share a conversation — every cross-role question costs a file write and a
  session, and PM becomes a deliberate serialization point.
- *Mechanism*: three-layer read architecture (brain file / PM-curated agent-context / skills loaded
  per-task); PM as sole context-router.
- *Evidence*: architecture in first commit `216fa50`; stamp commit `03ba0ce` — "slim bootstrap: keep
  routing behavior, cut ~600 tokens/session." Stamp ruled to 04-24 over the seed's 05-05: the commit
  *is* the claim with the number in the message, the cleaner hostile click-through.

**2 · Determinism + model economics, merged — systems thinking. Stamp: 2026-06-13.**
- *Decision*: "If a rule can be checked by a script, it isn't allowed to live in prose" — and once
  correctness was mechanical, premium models stopped being paid to be careful.
- *Problem*: a real field failure — a model skipped its closeout commit ("first prose-trust failure
  observed in the field"); prose compliance degrades as files grow.
- *Trade-off*: floors can't flex — a legitimate exception still trips the gate — and every scripted
  rule ships with a regression fixture. Judgment stays in prose; the split itself must be maintained.
- *Mechanism*: pillar-budget gate + CI (`c7bbde8`), commit floor, queue-lint, handoff lint — bash
  floors under prose judgment; model routing inverted so cheap models run routine steps and premium
  needs explicit sign-off.
- *Payoff line (the strongest AI-economics signal of the ten)*: the floors don't move, so premium
  models buy judgment, not correctness.

**3 · Growth caps — systems thinking. Stamp: 2026-04-12, the first commit.**
- *Decision*: "I capped the size of every file the agents read — before I wrote almost anything else."
- *Problem*: accumulating files silently eat the context window; the failure is invisible until an
  agent is terminal. Later proven in the field — one uncapped file hit 1,382 lines and buried the one
  open request.
- *Trade-off*: agents permanently lose history — nothing older than the current sprint is in view —
  and every new file must ship with a cap or it's a leak.
- *Mechanism*: caps + archive rules in commit one (`216fa50` literally contains the growth-cap rule);
  later a CI gate that fails the build on growth.
- *Why it holds a slot*: unfalsifiable foresight — the first-commit date does work no other candidate's
  date can do. It survived a hostile click-through in the research round.

**4 · Attention architecture — architecture. Stamp: 2026-06-07.**
- *Decision*: human attention is the scarcest input, so the run gets designed gates — it halts, never
  asks, never guesses.
- *Problem*: unattended agents that hit ambiguity either guess (ship wrong) or stall waiting for a
  human who isn't there — and a run that pings its operator constantly spends the one resource that
  doesn't scale.
- *Trade-off*: the founder deliberately never sees the mechanical layer, and no mid-run steering
  exists — every ambiguity is paid for up front at planning time.
- *Mechanism*: `Role: halt` wave gates; specialists cannot escalate past PM to the founder; gate
  packets curated down to the human-judgment residue; resume only after a written verdict.
- *Evidence*: `78490b7` — "Muster v4 — autonomous sprint execution (#29)."
- *Why it took slot 4 (DEC-044 ruling 2)*: slots 1–3 cover the token economy; this covers the
  human-time half of the founder's bar, and it explains §5's 4.8 h operator-attention figure — the
  page starts reading as designed, not assembled. Framed as attention economics it does not restate
  §2's on-screen `Role: halt`.

**Named alternate, documented swap**: the **feedback loop** (sprint close → telemetry + retro →
GitHub issue → XO prepares the next-version PR; three public releases titled from field-retro
findings — the most independently checkable evidence of the ten). Swaps in for slot 4 if the founder
prefers to signal compounding (the VC moat read) over attention discipline. One-word override at any
point before the §3/§4 build step.

**The six cut, with reasons, so they are not re-litigated**: halt design (absorbed into 4's framing;
alone it restates §2), model inversion (merged into 2), self-healing 429 boundary (a sub-decision of
4), docs-describe-the-present and one-file-one-writer (real, but inside-baseball — most translation
for least reader payoff), config-knobs-earn-existence (smallest blast radius of the ten).

**3. Copy — IN PROGRESS. §1 is settled by the sparse-hero ruling; §3, §5, §6 still await.**

**§1 — THE SPARSE HERO (Option A). Founder ruling, made against rendered evidence (DEC-045).**
The founder wants a YC-grade first screen: *"only a few words that capture the attention, no
clutter."* Both candidate compositions were rendered with a real simplified formation and fold
rulers (`samples/s01-sparse-hero.html`); the founder picked **A** knowing the phone trade-off was
measured and stated: on a phone the ladder cuts at the fold and the first screen carries no number.

**What §1's first screen is now**: eyebrow · headline · the formation. Nothing else.
- **The subline is deleted** (*One operator. Eight AI roles. The queue is the org chart.*) — its
  meaning moves to the formation and its caption. The 8/1 repetition Exhibit 3 rendered dies with it.
- **The measured line is deleted from §1** (*Bodh, idea → live: 9.3 h…*) — Bodh's numbers live in §5
  and in §1's readout below the fold. The seed's "measured line visible without scrolling" guarantee
  is superseded by this ruling; the founder is the seed's author and this is his amendment, recorded
  here because the seed file itself is read-only inside the sprint.
- **ALL Bodh material leaves §1 (DEC-046, founder's one-line override of the recorded default).**
  Three removals, each with a later home the founder named: the measured line (§5), the readout's
  BODH row (§5's cards), and the **hero streaming terminal** — it streams the Bodh Sprint-4 corpus
  under a `BODH · SPRINT 4` label, and §2's replay directly below is the same material done
  properly. §2 becomes the page's only terminal.
- **What §1 keeps below the fold**: the THIS SITE readout remnant (dashes · `measured at launch` ·
  `VERIFY ⎘` chip — self-referential proof posture, not Bodh) and the curl. Whether the remnant
  still reads as a readout at one row, or folds into something smaller, is UI/UX's design call at
  the fix step. Honest cost, stated: THIS SITE's dashes lose the measured BODH row that made the
  dash idiom self-evident by contrast.
- **The formation is promoted to the §1 centerpiece and gets a real design pass at the UI/UX fix
  step** — the sample's simplified render is a placeholder for composition judgment only. The
  founder explicitly deferred visual refinement to UI/UX's design step.

*Carried to the fix round*: UI/UX revises `section-01-hero.md` — new composition, formation as
centerpiece with its real design pass, new fold budget, the readout remnant ruled, and §10's
scope-adjacency deleted rather than rewritten (with no Bodh numeral and no wave terminal in §1,
there is no scope adjacency left to manage). The motion budget shrinks: the hero terminal was one
of the page's three live elements. Content revises `section-01-copy.md` — subline, measured line,
readout BODH row and terminal chrome labels removed, unselected headline candidates removed,
everything else verbatim. Brand `§3` message hierarchy amended: §1 leads with the claim and the
team visual; measured proof lands at first scroll (founder-accepted deviation, recorded rather
than hidden).

**§1 is CLOSED.**

**§3 — RE-RULED (DEC-047), founder verdict from an out-of-band critique session.**

**Ruling 1 — no named competitors anywhere on the page.** The CrewAI/AutoGen clause is dead, and
so is its pre-authored "every multi-agent framework…" fallback (a universal claim one
counterexample kills). Supersedes the "clause ships named" ruling this packet carried under
"Settled without you" item 5, and DEC-035 decision 2.

**Ruling 2 — §3's contrast is Muster vs bare Claude Code**, the reader's own lived experience:
used bare, the operator is the memory system — every session gets re-briefed by hand, and the
briefing grows with the product. Muster moves that job into the system: decisions land in the
knowledge base, each session reads a curated per-role slice, file caps keep the slice bounded.
**The compounding claim is §3's new spine**: the bigger the product, the more the system carries.
Each contrast now appears exactly once on the page — bare-Claude in §3, the framework contrast
only in §4 decision 1's title, unnamed.

**Honesty boundaries (hard):** no comparative token/benchmark claims vs bare Claude Code —
mechanism claims only (persistent knowledge base, curated per-role slice, capped reads). Never
disparage Claude Code: the claim is about WHO carries the context at production scale, not
capability. The scaling claim renders as architecture, not promise: *the knowledge base grows
with the product; what a session reads stays bounded.*

**Kept from the prior draft:** "a small always-on tier, the rest on demand, most of it never"
(verbatim); the floor beat (mechanics as scripts, judgment in prose → holds on cheap models); the
8-roles/1-operator + files-and-queue fact (now the page's only prose statement of it);
"context engineering" at most once, and if spent in §3 it attaches to the curated-slice sentence
("— context engineering, per role"), never as a standalone flourish.

**Founder starting material (tighten freely, never inflate).** Kickers:
K1 `The product grows. The briefing doesn't.` · K2 `You stop being the memory between sessions.`
· K3 `A team that briefs itself.` Founder's pick: **K1**. Paragraph (script-measured **90/90
words**, zero numerals, zero banned words, zero first person):

> Muster puts eight AI roles under one human operator, coordinating through markdown files and a
> work queue. Used bare, Claude Code makes you the memory: every new session starts with what you
> re-explain, and the re-explaining grows with the product. Muster moves that job into the system.
> Decisions land in a knowledge base; each session reads a curated slice — a small always-on tier,
> the rest on demand, most never. The product grows; what a session reads stays bounded. Mechanics
> run as scripts, judgment in prose — it holds on cheap models.

**Sensitive sentence, watched at render**: "makes you the memory" must read as the operator's job,
never Claude Code's capability; if it reads as a dig rendered, the soft form is pre-authored:
*"the context lives in your head and your prompts."*

**§3 CLOSED — founder confirmed against the render, 2026-07-28**: K1 + the paragraph, hook **IN**
(attached to the curated-slice sentence, ships as ink), sentence **KEPT**. The final string,
90/90 words (`samples/s03-insight.html` is the rendered record):

> Muster puts eight AI roles under one human operator, coordinating through markdown files and a
> queue. Used bare, Claude Code makes you the memory: every session starts with re-explaining, and
> the re-explaining grows with the product. Muster moves that job into the system. Decisions land
> in a knowledge base; each session reads a curated slice — a small always-on tier, the rest on
> demand, most never — context engineering, per role. The product grows; what a session reads
> stays bounded. Mechanics run as scripts, judgment in prose — it holds on cheap models.

*Hook funding, applied by PM and listed for Content's re-verification at the fix round (−4)*:
"every new session" → "every session" · "what you re-explain" → "re-explaining" · "a work queue" →
"a queue". *Kicker wrap rule for the build*: each K1 sentence is an unbreakable-preferred unit
(inline-block span, the headline's mechanism family) — measured: sentence-boundary break at 375px,
internal wrap without overflow at 320px, one line at desktop. Content rewrites
`section-03-copy.md` from this block; the file's old §5 named-competitor ruling and fallback are
void per DEC-047.

**§5 CLOSED — provenance confirmed, cost row in, stress-tested against the seed's purpose
(DEC-048).** The founder confirmed the provenance line verbatim and ruled the cost row **in**:
both cards gain a fourth key — `COST · API LIST` → `$147` (BODH) / `—` (THIS SITE). This repairs
the cascade DEC-046 opened: when all of Bodh left §1, `$147` lost its only home, and the copy
file's "no cost figure appears in §5" note was written when §1 carried it. PM stress-tested the
final inventory against the seed's §5 message — *real products come out of this, the list is
growing, and this page is one of them* — with §5 now bearing the page's entire whole-product
number set (9.3 h · 4.8 h · 4 commit-days · $147): each message clause has a carrier, the growing
list stays format-not-sentence, and the attention figure now sits beside the build and cost
figures it needs as denominators. No further change needed.

*Content's cascade list for the fix round (stale rationales, not string changes)*: §3.3's "lives
in the footer and in §1's subline" (subline is dead — DEC-045); §4.2's "repeats §1 deliberately /
§1's harness asserts `9.3 h`" (§1 carries no number — the byte-equality assertion re-bases onto
§5 as primary); the R3/§6-verification "no cost figure in §5" note (superseded by the cost row).

**§6 —** *awaiting the founder's read.*

**4. FORMATION — SETTLED.** The hub is **PM**; the bus-bar carries the **seven specialists**
(Developer · UI/UX · QA · Content · Marketing · Legal · Research). No role appears twice, and it reads
true to the architecture: PM coordinates, specialists execute. The seed's "eight plates" phrasing is
superseded for the visual; the roster is still eight roles and copy still says eight.

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

### Gate 3 — 2026-07-26

**Status:** ENTRY GROUPING ACCEPTED · ONE DEFECT CARRIED · SPRINT 1 CLOSES

**Entry grouping works.** The split of the log's leading into a row pitch and an entry separator reads
correctly at a glance, on both desktop and phone, and it cost nothing — the section got 7.2px shorter.
The accent mark now takes the same 12px inset in both cards, and the correction that it was flush at
*every* viewport rather than only on mobile made the fix strictly better than the finding asked for.

**F-G3 — the key-beat tick now collides with the timestamp. Carried to Sprint 2, not fixed here.**
On L4 and L9 the rust tick sits hard against `20:59` and `21:35` with no separation, on both desktop
and phone. Cause, confirmed in the CSS rather than by eye: `.log__line` sets
`padding-inline-start: 1ch` with `text-indent: -1ch`, which is the hanging indent's mechanism — first
row starts at `padding − indent` = **0** from the border. On ordinary lines the border is transparent
so nothing shows; on key beats the border *is* the tick. It was structurally certain to do this the
moment the tick became visible against text.

**Why it is not fixed as a fourth round.** This is the third consecutive fix that satisfied its stated
criterion and disturbed an adjacent relationship — horizontal scroll → entry grouping → tick spacing.
The cause is common to all three: the terminal's left edge has five relationships (tick↔card,
tick↔text, row↔row, entry↔entry, text↔wrap edge) that all derive from two or three shared CSS values,
and every harness asserts the value that was named rather than the relationship that matters. A fourth
single-value round would cost roughly another $42 and carries a real chance of disturbing a fifth
relationship. It is folded into Sprint 2's first build step, which names all five relationships as a
system, moves the tick out of the text flow entirely, and adds one harness assertion per relationship.

**PM's own miss, recorded.** PM verified this round against `qa-s02-mobile-375.png`, which renders
BEAT 01 — no key beat is revealed at that frame, so the artifact used to confirm the fix was
structurally incapable of showing this defect. That is the same blind-by-construction failure QA found
in its own WebKit row profile, repeated at review. Standing correction: verify against a render of the
state under test, never an arbitrary frame.

**Sprint 1 closes here.** §2 is built, validated, and accepted with one carried defect. Total cost
across three gates: ~$97.

---

### Re-gate — 2026-07-26

**Status:** SP7 APPROVED · PHONE SENT BACK — 2026-07-26

**SP7 lands.** *"The operator planned the sprint, left the agents running, and returns to a
deploy-ready site."* Approved as written, at 15 of 16 words, with SP6's relief still unspent. The
reframe is settled and is not reopened in the next round. Content's work on §2 is complete.

**The phone check fails.** The sideways gesture is gone, which was the stated criterion, but
readability was traded for it in a way the fix did not measure. Both findings were raised by the
founder from the real device and confirmed by PM against the built CSS, not by eye.

**Findings:**

- **F-R1 — Wrapped log lines do not group into entries. Blocking; this is a regression the fix
  introduced.** At 375px four entries occupy eight rows, and the vertical gap between an entry's own
  continuation row and the *next* entry's first row is identical — `.log__line` carries no
  `margin-block-start`, so nothing separates one entry from the next. Eight rows read as eight things
  rather than four. The hanging indent (`padding-inline-start: 2ch; text-indent: -2ch`) and the absent
  timestamp on continuations are the only cues, and parsing them takes deliberate effort instead of
  happening at a glance.
  **The requirement is the outcome, not a mechanism**: entry boundaries must be visible at a glance at
  375 × 553. Vertical separation is the obvious lever and height is the scarce resource — there was
  25.4px of slack, and a per-entry gap costs roughly 6px each, so it will likely need funding from
  `--lead-terminal` rather than being added on top. Banding or a continuation glyph are alternatives;
  UI/UX chooses and states the measured budget. Fidelity and the no-horizontal-scroll guarantee both
  hold — neither is available to pay for this.

- **F-R2 — The rust accent has two different relationships to its container. Blocking on mobile.**
  Both the key-beat tick and the active narration bar are built identically (a 2px transparent
  `border-inline-start` that turns `--accent`), but the narration entry sits inside a card with
  `padding: var(--gap-hairline)` = **12px**, so its bar is inset and reads as a mark inside the card,
  while `.log` is explicitly `padding-inline: 0`, so the terminal tick sits at **0px** — flush against
  the card border, reading as part of the frame.
  The wide-viewport rule restores a gutter (`calc(var(--gap-hairline) + 2ch)`) and its own comment says
  the phone "cannot afford" it, which is exactly why desktop reads clean and the phone does not: the
  horizontal room that inset the tick was spent on the wrap fix. One consistent inset for the same
  semantic mark across both cards, or a stated reason why the terminal gutter is deliberately different.
  If the room genuinely is not there, say so and propose the alternative rather than shipping the
  collision.

**Not reopened**: passes 1–3, SP7, the 48.00 s schedule, fidelity, and the no-horizontal-scroll
guarantee. The next round is these two visual findings only.

**Still carried**: the live-playback look on real mobile Safari. The founder's latest screenshot *is*
live playback at BEAT 03/06, which is progress over the end-state shot — it confirms the visibility
gate fires and both layers hold their place. `100dvh` under Safari's dynamic toolbars remains the
unproven mechanism and rides to the next gate.

---

### Previous verdict — the first §2 gate, 2026-07-26

Kept because this gate re-judges the same section. All four findings below are ruled and three are
already built or building; F-G3 is the live-playback look still carried above.

**Status:** APPROVED WITH ONE COPY FIX — 2026-07-26

The replay stands on pacing and narration with the styling subtracted. Passes 1, 2 and 3 all judged
good by the founder: the narration alone carries a reader who has never used Muster; the expanded
re-verify beat and the compressed QA beat both read correctly; and the 4.80 s gate hold reads as
deliberate stillness rather than as a stall. The hold is upheld at its reduced length — the concern
recorded in DEC-016 that funding B3 from B6 might cost the beat its meaning did not materialise.

**Findings:**

- **F-G1 — SP7 is rewritten to the founder's arc.** The current line frames the thesis negatively
  ("no human touched this"). The founder wants the active human story a first-time reader actually
  pictures: *the operator plans the sprint, leaves while the agents run, and comes back to work that is
  ready to deploy.* The arc is factually supported by the corpus — the chain ran unattended with a
  single human gate at deploy — so this is a framing change, not a new claim. Routed to Content as a
  revision of SP7, with SP6's 12 unspent words in the same beat available as the relief.
  **Guardrail, and it is the whole risk here**: the founder's framing of the ask was "something a VC
  would want to hear that would amaze them." That is the exact instruction that produces
  adjectives-as-argument, and `copy-rules.md` forbids it. The arc is approved; amazement is not a copy
  technique. The line earns its effect from the fact being true and specific, the way SP3's
  "re-checked with its own screenshots" does. Content revises; PM reviews line by line before it builds.

- **F-G2 — The reading measure is ruled: option A, `64ch` ships as written.** The founder compared
  all three widths and chose the current build. The seed's "reading column ~64ch" therefore means the
  CSS value, and no change is made to `--read-max`. **Consequence that must ride this fix wave**: the
  independent audit's 45–75-character band check now asserts a standard the product has deliberately
  declined, so it must be retired or re-scoped to a reported measurement. Left as-is it keeps
  `qa-independent-audit.mjs` exiting non-zero forever, which trains everyone to ignore a red audit.
  This closes the last hard item that was holding in `pre-launch-checklist.md`.

- **F-G3 — The phone check is NOT yet satisfied, and the screenshot does not settle it.** The founder's
  iPhone screenshot shows all twelve terminal lines, the beat indicator at its authored end state
  ("BEAT 06 / 06 · THE HUMAN GATE"), and the narration entries stacked rather than one at a time. Per
  §7 line 120 that is the **complete-transcript end state** — either playback had already finished, or
  Reduce Motion is on in iOS. Both render correctly and the screenshot is evidence the degraded path
  looks right on a real phone, which is worth having. But the guarantee under test — a five-line
  windowed terminal with both layers visible *during* the 48 s — applies only to live playback, and
  live playback is what the screenshot does not show. `100dvh` in mobile Safari therefore remains
  unverified on real WebKit, exactly as flagged going in. Carried to the re-gate: reload the page, let
  §2 scroll into view fresh, and watch during the chain. Not blocking, because every other mobile
  measurement is Blink-verified and the failure mode it guards against would be visible immediately.

- **F-G4 — The phone reader should not scroll horizontally to read a log line.** Raised by the founder
  from the real device. This reopens F1's approved resolution, which is legitimate — F1 was settled on
  measurement, and the founder is now reading it on the instrument the gate exists to apply. Routed to
  UI/UX with the trade costed rather than left to be discovered: at 375px the terminal's inner width is
  ~301px ≈ 38 characters and the longest corpus line is 74 characters ≈ 577px, so removing ~276px of
  horizontal scroll is paid for in visible line count (soft-wrap supports about **2–3 log lines instead
  of 5** against the 553px core budget) or in type scale (~5px, not viable). It is never paid for in
  fidelity — truncation and ellipsis stay forbidden, because they convert §2's central claim from true
  to false. PM's position is soft-wrap with a hanging indent, which is consistent with the spec's own
  ruling that on mobile the terminal is texture and the narration is the payload. See DEC-025.

**Founder observation, recorded with its correction.** The founder read the opening as `muster` and
`ui-ux` landing together and then a long wait for the developer line, and judged that rhythm right —
setup is quick, the design step visibly takes work, and the reader has time to absorb the screen. The
rhythm is real and the judgment stands; the interval is **6.05 s**, not the ~48 s estimated (48 s is
the whole chain). Recording the measured figure so the pacing rationale is not carried forward on a
mis-estimate.
