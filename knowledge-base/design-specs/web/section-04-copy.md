# §4 Copy — the four decisions

**Surface type**: every Content-owned string in §4 — four title sentences, four stamps, sixteen row
values (copy deliverable)
**Consumers**: Developer (builds the strings verbatim), UI/UX (rules the one-screen layout against
the measured lengths below), PM (reviews against the inflation guardrail), QA (fidelity and stamp
checks), the founder (reviews this copy as rendered)
**Sources**: the four decisions, their order, their stamps, and every load-bearing claim come from
`decision-log.md` DEC-044 (each date verified by `git log` against the framework repo). The audience
ruling and its guardrail are DEC-043. Decision 1's trade-off row and decision 4's mechanism row
carry founder-ruled amendments (DEC-056). Governed by `agent-skills/content/copy-rules.md` and
`brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **§4's reader is non-technical** (DEC-043): a VC, or someone evaluating the founder to hire. The
  section's job is to show a systems thinker — the judgment behind the framework. Every other section
  keeps the skeptical technical cold reader.
- **Plainer words, never bigger claims** (DEC-043's guardrail). Translating for a non-technical
  reader is the job; a decision that loses its cost stops being a decision and becomes a boast, and
  an inflated §4 is a blocking defect at PM review. Every core trade-off survives below.
- **Muster only.** No Bodh, no Arogh, no product decision — the four decisions are framework
  decisions (DEC-044).
- **First person is permitted here** (R7) — §4 is one of exactly two places on the page where it is.
  The voice is the founder's.
- **Hard ceilings, script-measured**: ≤ 45 words per sheet across the four row bodies; title ≤ 12
  words. Derived from the one-screen requirement (DEC-043): two to three short lines per row is what
  lets four sheets share a desktop screen. Measured counts are stated per sheet in §5.
- **Word counting convention**: whitespace-delimited tokens containing at least one letter or digit;
  numerals and compounds count as one word; standalone punctuation and separators (`—`, `·`) count
  as zero.
- **§4 carries no numerals except the stamps' dates**, so no measurement scope applies and nothing in
  this section can be rounded, scope-mixed, or given false precision.
- **Insider terms do not appear.** With §4 in plain language, no section on the page satisfies R11's
  earn-their-meaning condition, so *cascade lag* and *cold-start sufficiency* appear nowhere
  (DEC-043).

## 2. Section chrome

- **Section heading (`<h2>`)**: `§04 · THE DECISIONS`
- The section has no intro, no kicker, and no closing line (`section-04-decisions.md` §1). This file
  supplies no string for any of them because none exists.

## 3. Mechanical notes for the build

1. **Stamps ship as supplied below** — the stamp construction is one text slot; all four carry dates,
   and no dateless case exists (DEC-044).
2. **The title's ordinal does not ship** — the `<ol>` carries order in markup.
3. **Row labels** (`DECISION` / `PROBLEM` / `TRADE-OFF` / `MECHANISM`) are chrome from
   `section-04-decisions.md`, uppercased by CSS transform; this file supplies the row values only.

## 4. The four decisions — shipping strings

Order is DEC-044's, strongest first, and is never changed. Each decision supplies six strings: title,
stamp, and four row values.

### Decision 1 — tiered reading (architecture)

**Title** (`<h3>`, emphasis as `<em>` on *reads*):

```
I optimized what each agent reads, not how they talk.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-04-24
```

**Decision**

```
Each agent gets a curated brief: what its task needs, nothing more.
```

**Problem**

```
What breaks isn't the talking — it's each agent reading too much.
```

**Trade-off**

```
Questions between roles travel as files — written, routed, auditable — and each costs a session.
```

**Mechanism**

```
Three reading tiers; the PM routes context.
```

| Claim | Source |
|---|---|
| Title, verbatim | DEC-044 decision 1 (founder's voice) |
| Stamp 2026-04-24 | DEC-044 ruling 1 — commit `03ba0ce`, "slim bootstrap: keep routing behavior, cut ~600 tokens/session"; verified by `git log` |
| Reading too much, not talking, is what breaks | DEC-044: the real ceiling was each agent's context window filling with what it didn't need |
| Written, routed, auditable files; each question costs a session | DEC-044 trade-off, with the mechanism named rather than denied (DEC-056): agents do communicate — through request files, never a live chat. The cost survives (each exchange spends a session) |
| Three tiers, PM as router | DEC-044 mechanism (three-layer read architecture; PM as sole context-router) |

### Decision 2 — determinism and model economics (systems thinking)

**Title** (no inline emphasis):

```
Any rule a script can check, a script enforces.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-06-13
```

**Decision**

```
Mechanics live in scripts; judgment stays in prose.
```

**Problem**

```
AI follows written instructions unevenly — one model skipped a required step.
```

**Trade-off**

```
Hard floors can't flex: a legitimate exception still trips the gate.
```

**Mechanism**

```
Automated gates hold the floors, so premium models buy judgment, not correctness.
```

| Claim | Source |
|---|---|
| Title | DEC-044 decision 2 ("if a rule can be checked by a script, it isn't allowed to live in prose"), plain form |
| Stamp 2026-06-13 | DEC-044 — commit `c7bbde8`, pillar-budget gate + CI; verified by `git log` |
| A model skipped a required step | DEC-044 problem — the recorded field failure (a skipped closeout commit), stated without inflation |
| Floors can't flex | DEC-044 trade-off, intact |
| Premium models buy judgment, not correctness | DEC-044 payoff line, near-verbatim — the merged model-economics half |
| Scripts/prose split | R11 coinage *prose for judgment, scripts for mechanics*, honoured in the Decision row |

### Decision 3 — growth caps (systems thinking)

**Title** (no inline emphasis):

```
I capped every file the agents read — before almost anything else.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-04-12, first commit
```

**Decision**

```
Every file the agents read has a hard size cap.
```

**Problem**

```
Shared files grow quietly; eventually agents mostly reread their own history.
```

**Trade-off**

```
Agents lose sight of anything older than the current sprint.
```

**Mechanism**

```
Size caps plus archive rules, and a build gate that fails on growth.
```

| Claim | Source |
|---|---|
| Title | DEC-044 decision 3, plain form — the foresight claim the first-commit stamp makes checkable |
| Stamp 2026-04-12, first commit | DEC-044 — commit `216fa50` (initial extraction; the commit itself contains the growth-cap rule); verified by `git log` |
| Silent growth, rereading own history | DEC-044 problem, intact |
| History lost from view | DEC-044 trade-off (nothing older than the current sprint is in view), intact |
| Caps + archive rules + gate on growth | DEC-044 mechanism, intact |

*Growth caps* is Muster's own coinage (R11), used as this decision's name in this file's headings —
the shipping strings carry it as plain description.

### Decision 4 — attention architecture (architecture)

**Title** (no inline emphasis):

```
The system treats my attention as the scarcest resource.
```

**Stamp** · `data-category="framework"`:

```
framework — 2026-06-07
```

**Decision**

```
Runs halt at planned gates — never interrupt, never guess.
```

**Problem**

```
Unattended agents guess wrong or stall — constant pings don't scale.
```

**Trade-off**

```
No steering mid-run — ambiguity is paid up front, at planning.
```

**Mechanism**

```
The run doesn't need me present — it waits only at gates, for a written verdict.
```

| Claim | Source |
|---|---|
| Title | DEC-044 decision 4 (human attention is the scarcest input), first-person plain form |
| Stamp 2026-06-07 | DEC-044 — commit `78490b7`, "Muster v4 — autonomous sprint execution (#29)"; verified by `git log` |
| Guess-or-stall, constant pings don't scale | DEC-044 problem, intact |
| No mid-run steering; ambiguity paid up front | DEC-044 trade-off, intact |
| The run doesn't need the operator present; gates are the only waits | Founder-supplied fact in its ruled mechanism form (DEC-056), evidenced by night-stamped commits in the public repo — never framed as wall-clock, never as hours |
| Waits at gates for a written verdict | DEC-044 mechanism (halt gates, written verdict to resume), framed as attention economics |

## 5. Measured counts — per sheet, against the ceilings

Row-body totals are the sum of the four row values (Decision + Problem + Trade-off + Mechanism);
titles are counted separately. Script-measured under the stated convention.

| Decision | Title (≤ 12) | Rows (≤ 45) | Per row (D / P / T / M) |
|---|---|---|---|
| 1 — tiered reading | 10 | **44** | 12 / 11 / 14 / 7 |
| 2 — determinism + economics | 9 | **42** | 8 / 11 / 11 / 12 |
| 3 — growth caps | 11 | **44** | 10 / 11 / 10 / 13 |
| 4 — attention architecture | 9 | **44** | 9 / 10 / 10 / 15 |
| **§4 total** | 39 | **174** | — |

Longest title is 11 words — short enough that no title approaches a multi-line wall of display type
at 320px.

## 6. What the ceiling cost, stated for review

Each sheet's core trade-off survives; the ceiling did trim secondary clauses of two DEC-044
trade-offs, recorded here so the cut is a visible choice rather than a silent one:

1. **Decision 2** drops "every scripted rule ships with a regression fixture" and "the split itself
   must be maintained" — the core cost (floors can't flex; legitimate exceptions trip the gate)
   ships.
2. **Decision 3** drops "every new file must ship with a cap or it's a leak" — the core cost
   (permanent loss of history from view) ships.
3. **Decision 4** carries the operator-absence fact in its mechanism row (DEC-056), and the room
   was paid for inside the sheet rather than by inflating the ceiling: the problem row drops "and
   pinging **me**" for "constant pings" and the trade-off drops "every" — both claims intact — and
   the mechanism drops "gates carry **only** the judgment calls," a curation corollary of the
   halt-gate claim the decision row still makes. Halt-at-planned-gates, no-interrupt-no-guess, and
   resume-on-written-verdict all ship.

None of these omissions changes any claim's size; all are corollaries of costs or mechanisms that
ship. No decision needed more than 45 words to make its point — nothing is flagged as unfittable.

## 7. Verification statement

Checked line by line against `copy-rules.md`:

- **R1 / R4 / R5** — §4 contains no measured value, no metric, and no scope claim. The only numerals
  are the four stamp dates, exactly as DEC-044 verified them: `2026-04-24` · `2026-06-13` ·
  `2026-04-12` · `2026-06-07`. Nothing is rounded, nothing invented, no scope mixed, no
  dash-and-caption case arises.
- **R2 / R3** — no time claim, no cost claim, no human or agency baseline. "Premium models buy
  judgment" is a design claim about where model spend goes, not a cost figure. "The run doesn't
  need me present" is a mechanism claim in the founder-ruled form (DEC-056): no wall-clock framing,
  no "overnight," no hour span appears anywhere in the section — the evidence (night-stamped
  commits) lives in the public repo, not in the copy.
- **R6** — "proven" appears nowhere; no merit claim beyond the decisions themselves.
- **R7** — first person appears only as the founder's (titles 1, 3, 4; rows of decision 4); no
  first-person sentence exists outside §4's permitted place.
- **R8** — §4 makes no claim about who did the work; no attribution string appears.
- **R9 / R10 / R12** — no CTA, no version string, no URL in the section. Commit hashes above are
  documentation for verification, not shipping strings.
- **R11** — *prose for judgment, scripts for mechanics* is honoured in decision 2's Decision row;
  no insider term appears anywhere (DEC-043 cascade).
- **`brand-guidelines.md` §5** — no banned adjective, no exclamation mark, no "coming soon", no
  superlative. Every claim traces to DEC-044; no claim is larger than its source.
