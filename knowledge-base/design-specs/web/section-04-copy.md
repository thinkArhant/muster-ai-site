# §4 Copy — the four decisions

**Surface type**: every Content-owned string in §4 — four title sentences, four stamps, sixteen row
values (copy deliverable)
**Consumers**: Developer (builds the strings verbatim), PM (verifies the tightening against the
stated counts), QA (fidelity checks), the founder (reviews this copy as rendered)
**Sources**: every string traces to `product-spec-seed.md` §4 (founder-authored, read-only), which is
the locked draft. Nothing here is sourced anywhere else — §4 makes no measured claim and carries no
metric. Governed by `agent-skills/content/copy-rules.md` and `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Tighten only.** Never inflate, never reorder, never add a fifth decision, never drop a row.
- **First person is permitted here** (R7) — §4 is one of exactly two places on the page where it is.
  The pronoun is the founder's; it is preserved everywhere it appears.
- **"Tightened, not rewritten" is checkable, not judged.** The three conditions this file holds itself
  to, all verifiable by reading §5's table beside the seed:
  1. every original sentence survives — no sentence is deleted, split, merged, or moved;
  2. every surviving sentence keeps its subject and its claim;
  3. before/after word counts are stated per decision and per row, script-measured.
- **Word counting convention**: whitespace-delimited tokens containing at least one letter or digit;
  numerals and compounds count as one word; standalone punctuation and separators (`—`, `·`) count as
  zero. Counts below are script-measured against the seed's text and this file's text.
- **§4 carries no numerals except the stamps' dates**, so no measurement scope applies and nothing in
  this section can be rounded, scope-mixed, or given false precision.
- **Insider terms are permitted in §4 and are not used**, because the seed's draft does not use them.
  R11 licenses *cascade lag* and *cold-start sufficiency* here; licensing is not an instruction to
  spend it, and adding either word would be inflation of founder copy.

## 2. Section chrome

- **Section heading (`<h2>`)**: `§04 · THE DECISIONS`
- The section has no intro, no kicker, and no closing line (`section-04-decisions.md` §1). This file
  supplies no string for any of them because none exists.

## 3. Mechanical transforms applied to every string

Three normalizations are applied uniformly. They are not tightening and are excluded from the word
counts, because they change no word:

1. **Row values open in sentence case.** The seed writes row values as list continuations
   (`each agent reads only…`); they render as `<dd>` prose sentences, so the first letter is
   capitalized. No other casing changes — labels and stamps are uppercased by CSS transform, and the
   source text keeps its own casing (`section-04-decisions.md` §5).
2. **The stamp's parentheses do not ship.** The seed's `(framework — 2026-05-05)` is source
   punctuation; the stamp construction is the enclosure. Everything inside the parens ships verbatim,
   including decision 3's `, first commit` qualifier and decision 4's missing date.
3. **The title's leading ordinal does not ship.** The seed's `**1.`, `**2.`… is the draft's list
   numbering; the `<ol>` carries order in markup.

Quotation marks inside decision 2's Trade-off ship as the seed types them — straight, not curly.
Typographic quotes would be a change to founder text for a reason no reader can check.

## 4. The four decisions — shipping strings

Order is the seed's own, strongest first, and is never changed. Each decision supplies six strings:
title, stamp, and four row values.

### Decision 1

**Title** (`<h3>`, emphasis preserved as `<em>` on *reads*):

```
I optimized what each agent reads, not how they talk.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-05-05
```

**Decision**

```
Each agent reads only what its current task needs — a small always-on tier, everything else on demand, most of it never; the PM routes context to whoever needs it.
```

**Problem**

```
Every multi-agent framework I looked at optimized message-passing. But what actually breaks is the context window — put eight agents in a room, let them all read everything, and each one drowns in context meant for someone else. Quality falls as the window fills.
```

**Trade-off**

```
I gave up the simple thing — every agent sees everything — for a PM that decides what each agent reads. That costs coordination discipline: one role must own context routing.
```

**Mechanism**

```
The three-tier reading model + the PM as context-translator. The bottleneck was never agent communication; it was agent memory.
```

### Decision 2

**Title** (no inline emphasis):

```
If a rule can be checked by a script, it isn't allowed to live in prose.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-06-13
```

**Decision**

```
Mechanics go in bash; prose is for judgment. Anything a script can verify, a script must.
```

**Problem**

```
Prose instructions degrade by model tier — a weaker model skips a rule a stronger one follows. And every rule in prose costs tokens on every read and dilutes the instructions around it.
```

**Trade-off**

```
I gave up "just tell the model what to do" and paid upfront for deterministic checks — so the rules stop depending on which model is running.
```

**Mechanism**

```
Deterministic gates — size budgets, lints, guard scripts, CI. The payoff is a claim few agent frameworks can make: it runs safely on small, cheap models, because the floors don't move.
```

### Decision 3

**Title** (no inline emphasis):

```
I capped the size of every file the agents read each session — before I wrote almost anything else.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-04-12, first commit
```

**Decision**

```
The always-read surface has hard budgets, enforced in CI. When a shared file hits its cap, something gets archived or trimmed — the cap doesn't quietly move.
```

**Problem**

```
Multi-agent systems rot over weeks. Shared files accumulate, and one day the system spends its whole context budget re-reading its own history before doing any real work.
```

**Trade-off**

```
I gave up append-forever convenience for forced discipline. Hitting a cap is friction, on purpose.
```

**Mechanism**

```
Pillar-budget regression in CI. It was the first thing I built, because the failure it prevents is invisible until it's terminal.
```

### Decision 4

**Title** (no inline emphasis):

```
Building a real app with it, I removed the one feature every competitor adds.
```

**Stamp** · `data-category="product"` — **the no-date case; it never gains a date**:

```
product — Bodh
```

**Decision**

```
Bodh shows one mental model a day, and the reader never picks a category — not a filter, not a preference, not an onboarding choice.
```

**Problem**

```
The obvious feature is topic choice. But self-selection is confirmation bias at the library level — people deselect exactly the categories they need most.
```

**Trade-off**

```
I gave up the feature users would ask for, and the personalization story, for the thing that actually works — non-chosen exposure. Choice can be added later; taking it away is a betrayal.
```

**Mechanism**

```
Breadth is absorbed at the library's admission bar, not by user filtering. The same restraint as the framework, applied to a product that ships.
```

## 5. The tightening report — before/after, per decision and per row

Word counts are of the four row values (the title and stamp are untouched in all four decisions and
are counted separately below).

| Decision | Rows: seed → shipped | Δ | Sentences: seed → shipped | Title (unchanged) |
|---|---|---|---|---|
| 1 — optimized what each agent reads | 123 → **119** | −4 | 8 → 8 | 10 words |
| 2 — a rule a script can check | 105 → **104** | −1 | 7 → 7 | 16 words |
| 3 — capped every always-read file | 89 → **89** | 0 | 8 → 8 | 18 words |
| 4 — removed the one feature | 103 → **103** | 0 | 7 → 7 | 14 words |
| **§4 total** | **420 → 415** | **−5** | **30 → 30** | 58 words |

Per row, where a count changed:

| Decision · row | Seed | Shipped | Δ |
|---|---|---|---|
| 1 · Problem | 46 | 43 | −3 |
| 1 · Trade-off | 30 | 29 | −1 |
| 2 · Decision | 17 | 16 | −1 |

Every other row is word-identical to the seed; only the sentence-case transform (§3.1) was applied.

### Every edit, stated so it can be checked rather than judged

1. **1 · Problem** — *"But the thing that actually breaks is the context window"* → *"But what
   actually breaks is the context window."* Subject and claim identical; `the thing that` is a
   nominalization `what` carries in two fewer words.
2. **1 · Problem** — *"put eight agents in a room and let them all read everything, and each one
   drowns"* → *"put eight agents in a room, let them all read everything, and each one drowns."*
   Three imperative clauses in a series; the comma does the work the first `and` did.
3. **1 · Trade-off** — *"one role has to own context routing"* → *"one role must own context
   routing."* The modal is preserved — `must`, not `owns` — because the sentence's claim is an
   obligation the trade-off buys, not a description of who happens to own it.
4. **2 · Decision** — *"prose is reserved for judgment"* → *"prose is for judgment."* Exclusivity is
   already carried by the sentence that follows (*anything a script can verify, a script must*), and
   the shorter form is Muster's own coinage as R11 states it: *prose for judgment, scripts for
   mechanics*.

**Five words is the honest total, and the small number is the finding.** The draft carries almost no
fat: every sentence is doing work, and the four edits above are the complete list of places where a
word could go without a claim going with it. Manufacturing a bigger delta would mean cutting clauses
the founder wrote on purpose, which is rewriting under a tightening label. Where the seed's prose is
already tight, this file leaves it alone and says so.

## 6. Findings for review

1. **The draft runs 7–8 sentences per decision; the seed's own §4 brief says "~4–6 sentences."** The
   locked draft does not meet its own guidance, and tightening cannot close the gap — reaching 6
   would require deleting two sentences per decision, which is rewriting. No sentence was deleted.
   If the guidance is ruled to bind over the draft, that is a cut rather than a tighten, and cutting
   founder copy needs the founder's word. **Not blocking**: the section builds from these strings as
   they stand, and `section-04-decisions.md` measured its line-count ceilings against exactly this
   text.
2. **Every title is untouched**, so every measured line count in `section-04-decisions.md` §8 holds
   exactly rather than as a ceiling — the build can sanity-check against those figures directly.
3. **Decision 4's stamp carries no date and must never gain one.** The seed supplies `product — Bodh`;
   Bodh's launch date exists in the corpus (`2026-07-18`) and inserting it here would be a fabricated
   provenance stamp — the date belongs to the deploy, not to the decision.

## 7. Verification statement

Checked line by line against `copy-rules.md`:

- **R1 / R4 / R5** — §4 contains no measured value, no metric, and no scope claim. The only numerals
  are the three stamp dates, quoted from the seed exactly (`2026-05-05`, `2026-06-13`, `2026-04-12`).
  Nothing is rounded, nothing invented, no scope mixed, no dash-and-caption case arises.
- **R2 / R3** — no time claim, no cost claim, no human or agency baseline.
- **R6** — "proven" appears nowhere; no merit claim beyond what the founder wrote.
- **R7** — first person appears in decisions 1, 2, 3 and 4 as the seed wrote it, and nowhere is a
  first-person sentence added or amplified.
- **R8** — no attribution string appears in §4; the section makes no claim about who did the work.
- **R9 / R10 / R12** — no CTA, no version string, no URL in the section.
- **R11** — Muster's coinage *prose for judgment, scripts for mechanics* is honoured in 2 · Decision;
  no insider term is introduced.
- **`brand-guidelines.md` §5** — no banned adjective, no exclamation mark, no "coming soon", no
  superlative. Every word in the section is the founder's or is a deletion of one of his.
