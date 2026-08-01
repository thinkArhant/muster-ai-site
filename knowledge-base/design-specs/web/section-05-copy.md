# §5 Copy — shipped with Muster

**Surface type**: every Content-owned string in §5 — four prose lines and two readout cards (copy
deliverable)
**Consumers**: Developer (builds the strings verbatim and derives §5's content inventory from this
file — §5 has no separate design spec; treatment comes from `page-shell.md` §8), UI/UX (composes
the two-cell card against these strings), PM (reviews line by line against the copy rules), QA
(scope-label and dash checks)
**Sources**: every claim traces to `product-spec-seed.md` §5 and its Measured data table
(founder-authored, read-only) or `bodh-sprint4-corpus.md` (founder-authored, read-only), cited per
string. Governed by `agent-skills/content/copy-rules.md` and `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Product voice, with one exception.** The provenance line is founder-supplied and is one of the two
  permitted first-person places (R7). It is preserved exactly as the founder supplies it. Every other
  string in §5 is product voice.
- **Scope discipline (A-005) is the section's highest risk.** §5 carries **BODH** values and **THIS
  SITE** dashes, each beside its own scope label, and **no wave-scope number at all** — `~64 min`,
  `289` and `$24.73` do not appear in this section. Two scopes sit adjacent here by design, which is
  exactly why every value is labelled.
- **THIS SITE's unmeasured metric is a dash** (R4, A-002) with `measured at launch` attached to the
  dash itself. Never a placeholder, never an estimate, and the dash never counts up
  (`page-shell.md` §10.3).
- **No growing-list hype** — see the ruling in §5 of this file.
- **Word counting convention**: as in the sibling copy files — whitespace-delimited tokens containing
  a letter or digit; script-measured.

## 2. Section chrome

- **Section heading (`<h2>`)**: `§05 · SHIPPED WITH MUSTER`

## 3. The four prose lines

The seed budgets §5 at "~4 lines + readout cards", and §5 spends all four: three name what shipped
and who made it, one states what Bodh cost. The fourth is not spent on a sentence that says the list
will grow — that message is carried by the card format (§5 ruling 2).

**Order is load-bearing.** The two Bodh lines are adjacent, the provenance line follows as the
section's single primary, and the page-attribution line closes. A reader meets the product, then its
price, then where the framework came from, then the page they are standing in.

**The figures render as prose, at prose weight and in ink.** Rust and the readout size are the
instrument treatment; moving a figure into a sentence does not bring the treatment with it, and §5's
prose block carries no accent-coloured element at all.

### 3.1 Bodh

**Budget: ≤ 22 words.** Rationale: one line at the reading column on desktop, two at phone. Written:
**18**.

```
Bodh — a shipped iOS app and web landing, live at bodh.day. The replay above is its website wave.
```

| Claim | Source |
|---|---|
| Shipped iOS app and web landing, live at `bodh.day` | Seed §5 ("shipped iOS app + web landing, live at `bodh.day`"); Measured data ("bodh.day — App Store + web") |
| The replay above is its website wave | Seed §2 (§2 is Bodh's website wave, Sprint 4); corpus → "What Sprint 4 was" |

The second sentence is the seed's own "(the case study above)" written as a sentence, and it does one
piece of scope work: it tells the reader that the 64-minute chain they watched in §2 is a **wave
inside** this product, not the whole of it. That is A-005's failure mode pre-empted in the one place
on the page where the two scopes sit closest — and the line below it, which prints a whole-product
`$147` two screens under §2's wave-scoped `$24.73`, is exactly the hazard that sentence guards.

### 3.2 Bodh's measured line

**Budget: ≤ 20 words.** Rationale: one line at the reading column on desktop, like its neighbours.
Its content is fixed — a scope key, two sourced figures, and the framing one of them may not shed —
so any growth would be padding around a closed set. Written: **17**.

```
Bodh, idea to live: 9.3 hours of active build, $147 in AI tokens at API list price.
```

| Claim | Source |
|---|---|
| `9.3 hours of active build`, BODH scope | Seed → Measured data ("Active build · 9.3 h", BODH column); scope table |
| `$147 in AI tokens`, BODH scope | Seed → Measured data ("Cost (API list) · $147", BODH column); seed §1's own phrasing of the measured line |
| `at API list price` | R3 and `brand-guidelines.md` §5: API list price, cost-to-replicate, never subscription spend. The seed's own row label for this figure is "Cost (API list)" |
| `idea to live` as the span | Seed → Measured data column header ("BODH (idea → live)"); scope table |

Three things this line's form is doing, all of them scope work:

1. **The subject is named, not inherited.** The nearest antecedent above this line is "its website
   wave" — the one scope these figures are not. A scope key whose subject must be inferred from the
   previous sentence is one skim away from binding `$147` to a 64-minute chain, so the product is
   named again. One repeated word buys the removal of the page's most dangerous ambiguity.
2. **The scope key is front-loaded and matches the card label verbatim.** `Bodh, idea to live:` and
   `BODH · IDEA → LIVE` are the same key in two registers, three inches apart, so the reader binds
   the prose figures to the BODH card without a sentence telling them to.
3. **`at API list price` travels with `$147`.** A cost figure carries its framing wherever it is
   rendered — a figure may not shed its qualifier by moving from a labelled cell into a sentence, so
   the sentence states it. In words it is at least what a `COST · API LIST` key would carry, and it
   is legible to a reader who never reads a label.

### 3.3 The provenance line — founder-supplied, preserved verbatim

**Not budgeted.** It is founder copy; the budget concept does not apply and no word may be tightened
out of it in either direction.

```
Muster was extracted mid-build from a real iOS app — the framework existed as working practice before it existed as a repo.
```

| Claim | Source |
|---|---|
| The whole line | Seed §5, provenance line, as amended by the founder at his gate — one word, "real"; verbatim thereafter (21 words) |
| "a real iOS app" | The founder's claim-check of his own line: the source app is nearing MVP, not in production, so "real" is the truthful word and "production" may not appear near this line |

- **The source app stays unnamed.** No status, no roadmap, no "coming soon" (seed §5;
  `brand-guidelines.md` §5).
- **This line is §5's single primary**, and its emphasis is weight alone, on a run spanning the whole
  sentence. No other prose line in §5 carries emphasis — the measured line at 3.2 sits at prose
  weight beside it, because a second weighted line would make §5 two primaries and neither.
- **Noted for review, no action taken**: the seed labels this line "(first person,
  founder-supplied)", and as written it contains no first-person pronoun. It is preserved exactly as
  supplied — the label describes its authorship, not its grammar, and R7's protection covers it
  either way. Rewriting it into first person would be editing founder copy to match a parenthetical.

### 3.4 This page

**Budget: ≤ 18 words.** Rationale: one line at the reading column on desktop. Written: **14**.

```
This page — built by its own AI team, and measured with the same meter.
```

| Claim | Source |
|---|---|
| Built by its own AI team | Seed §5 ("built with Muster by its own team") + R8's naming requirement, which supplies "AI" |
| Measured with the same meter | Seed → Measured data ("This site's numbers come from the same meter over this repo's own build") |

"by its own **AI** team" is R8 applied to the seed's phrase: "its own team" unqualified is the exact
construction R8 bans, and the fix is one word. The full attribution shape — *5 of 8 agents, 1
operator* — lives in the footer, and the roster label lives in §1's formation caption; repeating
either here would be furniture.

**The line does not name Muster.** The section heading four lines above
(`§05 · SHIPPED WITH MUSTER`) supplies the subject, so the attribution's third instance inside one
screen is carried by the section frame rather than by the sentence. The seed's phrase survives where
it is doing work — in the heading and in the founder's provenance line — and the page-attribution
line spends its words on what is *only* true of this page: its team and its meter.

## 4. The readout cards

Two cards, same two keys, same order. Treatment is `page-shell.md` §8's instrument readout cell:
key `--text-micro` `--muted`, value `--text-readout` `--accent` tabular, sub-line `--text-micro`
`--muted`; an unmeasured value renders an `--ink` em-dash with the `measured at launch` sub-line and
never animates.

### 4.1 Card strings

`(none)` means the slot is empty in that card and nothing renders there. Only the backticked runs
ship.

| Slot | Card 1 | Card 2 |
|---|---|---|
| Card label | `BODH · IDEA → LIVE` | `THIS SITE · SPEC → LIVE` |
| Key 1 | `OPERATOR ATTENTION` | `OPERATOR ATTENTION` |
| Value 1 | `4.8 h` | `—` |
| Sub-line 1 | (none) | `measured at launch` |
| Key 2 | `SHIPPED` | `SHIPPED` |
| Value 2 | `bodh.day` | `THIS PAGE` |
| Sub-line 2 | `App Store + web` | (none) |

| Claim | Source |
|---|---|
| `4.8 h` operator attention, BODH scope | Seed → Measured data ("4.8 h (supporting stat)"); scope table |
| `bodh.day` + `App Store + web` | Seed → Measured data, Shipped row: "bodh.day — App Store + web". Value and sub-line reconstitute the seed's cell exactly: `bodh.day` + ` — ` + `App Store + web` |
| `THIS PAGE` | Seed → Measured data, Shipped row, THIS SITE column: "this page" |
| THIS SITE dashed, `spec → live`, `measured at launch` | Seed rule 4 and rule 5; A-002 |

### 4.2 Which values §5 carries, and why these two

**Both cards ask one question, and they ask it symmetrically.** Every key is answered in both
columns, so the two columns are comparable cell by cell — which is the only thing that makes THIS
SITE's dash informative rather than decorative. A key present in one card and absent from the other
would be a card dodging its twin.

**`OPERATOR ATTENTION` is the question the page is actually about.** The thesis is that one person
plus a governed AI team ships real products; the number that tests it is how much of the person it
took. It is also the dash the meter can fill: THIS SITE's `measured at launch` promises one figure of
the same kind as the one beside it, which is a promise a single snapshot keeps.

**`SHIPPED` is the falsifier.** `bodh.day` is a place a reader can open, and `THIS PAGE` is the one
THIS SITE cell that cannot be unmeasured — the reader is standing in the evidence. It is the seed's
own Shipped row, split across value and sub-line because the value slot is a readout at
`--text-readout` scale and `App Store + web` is a qualifier, not a value. It is the section's only
cell-level sub-line, and the construction is reserved for exactly that case.

**The attention figure has its denominators, and they sit in prose rather than in sibling cells.** A
readout of operator attention with no build or cost figure anywhere near it is a number without a
denominator. Those denominators — `9.3 hours of active build` and `$147 ... at API list price` — are
stated two lines above, for the same scope, in the same section. In prose they read as what they are
(what the build cost) instead of as instrument cells competing with the one figure that answers the
page's question.

**Neither card carries a cost cell, and that symmetry is the point.** A cost cell whose twin is a
dash invites the reader to price a build that has not been measured yet — an invitation to invent
the number the whole page exists to refuse.

**Commit-days appear nowhere on the page.** They are R2's checkable fallback for elapsed time, and
against a two-key card they would add a third kind of number to a surface that asks one question —
while the span they measure is already stated, in the same section, as `idea to live`.

**The harness asserts `9.3 h`, `$147` and `4.8 h` byte-exact with §5 as the sole site** — two
renderings of one measurement is the drift this page cannot afford. That two of the three render in
prose and one in a cell does not change the count: one rendering each, page-wide.

**No derived figure is printed anywhere on the page.** No ratio, no percentage, no rate, no
difference between these numbers — the reader does the arithmetic, the same posture R3 takes with
cost. `VERIFY.md` publishes this site's own economics as a measurement report, with its inputs and
its method; the page states measured inputs and nothing derived from them.

## 5. Rulings this file makes

1. **§5 runs four prose lines, not three, and the fourth is a measurement.** Bodh's identity and
   Bodh's price are two claims with different sources and different falsifiers — one is checked by
   opening `bodh.day`, the other by re-running the meter — so they take a line each and §5's audit
   stays one-to-one. Merging them would also bury the scope key mid-sentence, where it reads as a
   continuation of the product description rather than as the label binding two figures to one span.
   A scope qualifier that can be skimmed past is not a scope qualifier.
2. **The provenance line is prose, not a readout cell.** It has no key and no value, and a readout
   cell is an instrument surface. Framing founder testimony as telemetry is the same error
   `section-04-decisions.md` §6.4 refuses when it keeps registration marks off the spec-sheets:
   *founder testimony must not dress as telemetry*. §5 therefore renders two cards, not three.
3. **"The list is growing" is carried by the format, not by a sentence.** The seed's §5 message says
   the list grows, and its own instruction is "no more-coming-soon hype. The growing-list format
   returns as products ship." A card list with two entries that can take a third *is* the claim; a
   sentence asserting growth would be an unmeasured claim about the future on a page whose entire
   proposition is that its claims are checkable. Nothing in §5 says the list will grow.
4. **No third card ships as a placeholder.** No empty slot, no "next", no ghost card. When a product
   ships, a card is added.
5. **`measured at launch` attaches to the dash it qualifies, not to the card.** Card 2 now carries
   one unmeasured value beside one measured one, so a card-level caption would say the `SHIPPED`
   answer is unmeasured too. R4 asks for a dash *with* "measured at launch"; the sub-line sits under
   the dash, which is the tightest form of that.
6. **Readout values are authored strings and are never re-cased by CSS, so the copy file's string is
   what renders — and `THIS PAGE` is that string, in every seat.** Uppercase is the readout register
   for a phrase used as a value: `SHIPPED · THIS PAGE` reads as an instrument state, the same way
   `OPERATIONAL` does in the status bar, where lowercase would read as the start of a sentence. The
   page's key labels take the same transformation from the same seed table (`Active build` renders
   `ACTIVE BUILD`), so the seed supplies the fact and the page supplies the register. **Its twin
   `bodh.day` stays lowercase**, and that asymmetry is ruled rather than accidental: a hostname is a
   literal a reader may type or search, and re-casing it makes it a different string. If §1's
   remnant strip keeps a `SHIPPED` cell, it renders `THIS PAGE` byte-identically — one string, one
   casing, both seats.

## 6. Verification statement

- **R1** — every numeral in §5 is quoted exactly from the seed's Measured data table: `9.3` hours,
  `$147`, `4.8 h`. None is rounded; none is given precision its source lacks; none is derived.
- **R2** — the only time claim is "active build", as the seed labels it. No wall-clock framing, no
  "built in N hours", and §5 makes no deploy claim at all. Commit-days, R2's checkable fallback, are
  no longer shown here or anywhere on the page.
- **R3** — the one cost figure, `$147`, carries its framing in the sentence that prints it: `at API
  list price` — cost-to-replicate, never subscription spend. No human or agency baseline exists
  anywhere in the section, and no rate is derived from the figures beside it.
- **R4** — THIS SITE's one metric is an em-dash with `measured at launch` under it; no placeholder
  value, and the dash is inert. `THIS PAGE` is not an exception to this: it is a measured fact, not
  a metric.
- **R5** — both cards are scope-labelled (`BODH · IDEA → LIVE`, `THIS SITE · SPEC → LIVE`); the
  prose figures carry the same scope key in words (`Bodh, idea to live:`); no claim mixes scopes;
  wave-scope numbers (`~64 min`, `289`, `$24.73`) appear nowhere in §5.
- **R6** — "proven" does not appear; no merit claim is made about the framework.
- **R7** — first person is confined to the provenance line, preserved verbatim.
- **R8** — "its own AI team"; the string "the Muster team" appears nowhere.
- **R9** — no CTA in §5: no link, no chip, no signup, no community furniture. `bodh.day` appears as
  text, not as a second call to action; whether it is also a link is the build's ruling, and if it is
  one it points at `https://bodh.day` and nowhere else.
- **R10 / R11** — no version string; no insider term; no coinage misused.
- **R12** — the only host named is `bodh.day`, which is live and founder-supplied (seed → Measured
  data). `muster.build` does not appear.
- **`brand-guidelines.md` §5** — no banned adjective, no exclamation mark, no "coming soon", no
  superlative, no growth hype.
