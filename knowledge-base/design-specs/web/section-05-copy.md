# §5 Copy — shipped with Muster

**Surface type**: every Content-owned string in §5 — three prose lines and two readout cards (copy
deliverable)
**Consumers**: Developer (builds the strings verbatim and derives §5's content inventory from this
file — §5 has no separate design spec; treatment comes from `page-shell.md` §8), PM (reviews line by
line against the copy rules), QA (scope-label and dash checks)
**Sources**: every claim traces to `product-spec-seed.md` §5 and its Measured data table
(founder-authored, read-only) or `bodh-sprint4-corpus.md` (founder-authored, read-only), cited per
string. Governed by `agent-skills/content/copy-rules.md` and `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Product voice, with one exception.** The provenance line is founder-supplied and is one of the two
  permitted first-person places (R7). It is preserved exactly as the founder supplies it — the seed's
  line as he amended it at his gate (DEC-059). Every other string in §5 is product voice.
- **Scope discipline (A-005) is the section's highest risk.** §5 carries **BODH** values and **THIS
  SITE** dashes, each beside its own scope label, and **no wave-scope number at all** — `~64 min`,
  `289` and `$24.73` do not appear in this section. Two scopes sit adjacent here by design, which is
  exactly why every value is labelled.
- **THIS SITE is dashes** (R4, A-002) with `measured at launch` as its sub-line. Never a placeholder,
  never an estimate, and the dashes never count up (`page-shell.md` §10.3).
- **No growing-list hype** — see the ruling in §5 of this file.
- **Word counting convention**: as in the sibling copy files — whitespace-delimited tokens containing
  a letter or digit; script-measured.

## 2. Section chrome

- **Section heading (`<h2>`)**: `§05 · SHIPPED WITH MUSTER`

## 3. The three prose lines

The seed budgets §5 at "~4 lines + readout cards." Three lines is what the inventory needs; the
fourth is not spent on a sentence that says the list will grow (§5 below).

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
on the page where the two scopes sit closest.

### 3.2 The provenance line — founder-supplied, preserved verbatim

**Not budgeted.** It is founder copy; the budget concept does not apply and no word may be tightened
out of it in either direction.

```
Muster was extracted mid-build from a real iOS app — the framework existed as working practice before it existed as a repo.
```

| Claim | Source |
|---|---|
| The whole line | Seed §5, provenance line, as amended by the founder at his gate — one word, "real" (DEC-059); verbatim thereafter (21 words) |
| "a real iOS app" | The founder's claim-check of his own line: the source app is nearing MVP, not in production, so "real" is the truthful word and "production" may not appear near this line |

- **The source app stays unnamed.** No status, no roadmap, no "coming soon" (seed §5;
  `brand-guidelines.md` §5).
- **Noted for review, no action taken**: the seed labels this line "(first person, founder-supplied)",
  and as written it contains no first-person pronoun. It is preserved exactly as supplied — the label
  describes its authorship, not its grammar, and R7's protection covers it either way. Rewriting it
  into first person would be editing founder copy to match a parenthetical.

### 3.3 This page

**Budget: ≤ 18 words.** Rationale: one line at the reading column on desktop. Written: **14**.

```
This page — built by its own AI team, and measured with the same meter.
```

| Claim | Source |
|---|---|
| Built by its own AI team | Seed §5 ("built with Muster by its own team") + R8's naming requirement, which supplies "AI" |
| Measured with the same meter | Seed → Measured data ("This site's numbers come from the same meter over this repo's own build") |

"by its own **AI** team" is R8 applied to the seed's phrase: "its own team" unqualified is the exact
construction R8 bans, and the fix is one word. The full attribution shape — *8 agents, 1 operator* —
lives in the footer and in §1's formation caption; repeating it a third time here would be furniture.

**The line does not name Muster.** The section heading two lines above (`§05 · SHIPPED WITH MUSTER`)
supplies the subject, so the attribution's third instance inside one screen is carried by the
section frame rather than by the sentence. The seed's phrase survives where it is doing work — in
the heading and in the founder's provenance line — and the page-attribution line spends its words
on what is *only* true of this page: its team and its meter.

## 4. The readout cards

Two cards, same four keys, same order. Treatment is `page-shell.md` §8's instrument readout cell:
key `--text-micro` `--muted`, value `--text-readout` `--accent` tabular, sub-line `--text-micro`
`--muted`; unmeasured values render an `--ink` em-dash with the `measured at launch` sub-line and
never animate.

### 4.1 Card strings

| Slot | Card 1 | Card 2 |
|---|---|---|
| Card label | `BODH · IDEA → LIVE` | `THIS SITE · SPEC → LIVE` |
| Key 1 | `ACTIVE BUILD` | `ACTIVE BUILD` |
| Value 1 | `9.3 h` | `—` |
| Key 2 | `OPERATOR ATTENTION` | `OPERATOR ATTENTION` |
| Value 2 | `4.8 h` | `—` |
| Key 3 | `COMMIT-DAYS` | `COMMIT-DAYS` |
| Value 3 | `4` | `—` |
| Key 4 | `COST · API LIST` | `COST · API LIST` |
| Value 4 | `$147` | `—` |
| Sub-line | `Jul 11–18` (under Value 3 only) | `measured at launch` |

| Claim | Source |
|---|---|
| `9.3 h` active build, BODH scope | Seed → Measured data (BODH column); scope table |
| `4.8 h` operator attention | Seed → Measured data ("4.8 h (supporting stat)") |
| `4` commit-days, `Jul 11–18` | Seed → Measured data ("4 (Jul 11–18)") |
| `$147`, API list price | Seed → Measured data (BODH column); scope table; DEC-048. The key label carries R3's framing so the figure is never read as subscription spend |
| THIS SITE dashed, `spec → live` | Seed rule 4 and rule 5; A-002 |

### 4.2 Which values §5 carries, and why these four

§5 is the page's primary — and only — site for the whole-product number set (DEC-046, DEC-048): §1
carries no Bodh numeral, so `9.3 h`, `4.8 h`, `4` commit-days and `$147` live here and nowhere else.
The cards answer two questions at once: *what did this cost the person running it?* (operator
attention, commit-days — the seed's two supporting figures) and *what did it cost to make?* (active
build, API-list cost). Commit-days are additionally R2's named checkable fallback for elapsed time,
and this is the one place the page shows them.

`ACTIVE BUILD 9.3 h` and `COST · API LIST $147` are the anchors the attention figure is read
against — a readout of operator attention with no build or cost figure beside it is a number without
a denominator. **The harness asserts `9.3 h` and `$147` byte-exact with §5 as the primary site**:
two renderings of one measurement is the drift this page cannot afford.

**No derived figure is printed.** The page never states a ratio, a percentage, or a difference between
these numbers — the cells sit side by side and the reader does the arithmetic, the same posture R3
takes with cost.

## 5. Rulings this file makes

1. **The provenance line is prose, not a readout cell.** It has no key and no value, and a readout
   cell is an instrument surface. Framing founder testimony as telemetry is the same error
   `section-04-decisions.md` §6.4 refuses when it keeps registration marks off the spec-sheets:
   *founder testimony must not dress as telemetry*. §5 therefore renders two cards, not three.
2. **"The list is growing" is carried by the format, not by a sentence.** The seed's §5 message says
   the list grows, and its own instruction is "no more-coming-soon hype. The growing-list format
   returns as products ship." A card list with two entries that can take a third *is* the claim; a
   sentence asserting growth would be an unmeasured claim about the future on a page whose entire
   proposition is that its claims are checkable. Nothing in §5 says the list will grow.
3. **No third card ships as a placeholder.** No empty slot, no "next", no ghost card. When a product
   ships, a card is added.

## 6. Verification statement

- **R1** — every numeral in §5 is quoted exactly from the seed's Measured data table: `9.3 h`, `4.8 h`,
  `4`, `Jul 11–18`, `$147`. None is rounded; none is given precision its source lacks; none is derived.
- **R2** — the only time claims are "active build" and commit-days, both as the seed labels them. No
  wall-clock framing, no "built in N hours", and §5 makes no deploy claim at all.
- **R3** — the one cost figure, `$147`, sits under the `COST · API LIST` key, which carries R3's
  framing in the label itself: API list price, cost-to-replicate, never subscription spend. No human
  or agency baseline exists anywhere in the section.
- **R4** — THIS SITE is four em-dashes with `measured at launch`; no placeholder value, and the
  dashes are inert.
- **R5** — both cards are scope-labelled (`BODH · IDEA → LIVE`, `THIS SITE · SPEC → LIVE`); no claim
  mixes scopes; wave-scope numbers (`~64 min`, `289`, `$24.73`) appear nowhere in §5.
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
