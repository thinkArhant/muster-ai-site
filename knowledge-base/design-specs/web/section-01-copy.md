# §1 Copy — hero strings

**Surface type**: every Content-owned string in the §1 hero (copy deliverable)
**Consumers**: UI/UX (specifies the headline treatment and its accessible name against these strings),
Developer (builds the strings verbatim), PM (reviews line by line against the copy rules), the founder
(selects the headline from rendered candidates)
**Sources**: every factual claim traces to `product-spec-seed.md` (founder-authored, read-only) or
`bodh-sprint4-corpus.md` (founder-authored, read-only) and is cited per string below. Copy is governed
by `agent-skills/content/copy-rules.md` and the banned-word list in `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Product voice throughout.** §1 is not one of the two permitted first-person places.
- **Scope discipline (A-005).** Three scope statements appear in the hero and are never mixed: the
  measured line and the readout's BODH row are **whole-product** (*idea → live*: 9.3 h · $147); the
  hero terminal is **wave-scope** and its chrome label says so; THIS SITE is dashes, *spec → live*.
- **Word counting convention**: words are whitespace-delimited tokens containing at least one letter or
  digit; numerals and compounds count as one word each; standalone punctuation and separators (`·`,
  `→`, an em-dash between spaces) count as zero. Counts below are script-measured, not eyeballed.
- **Budgets are stated per string with rationale**, so review is a recount against a stated number
  rather than a judgment call. Locked strings (the eight role names, the readout labels and values,
  the curl, the eyebrow, the terminal chrome labels) are verified by equality against their cited
  source, not budgeted as prose — a budget on a string that may not vary is an assertion that cannot
  fail.

## 2. The headline — four candidates, one recommendation

The anchor text *"Ship a product. Without a team."* is available, not locked. The founder's own
direction — strike the human team, accent the AI replacement — is the incumbent idea; as literally
given (*"Ship a product with a ~~human~~ AI agents team"*) the article breaks ("a AI agents team"), so
candidate B repairs it by striking the full noun phrase. One of these ships; the others are removed
from this file when the selection lands.

**Budget: ≤ 9 rendered words per candidate.** Rationale: display-size mono must set on at most two
lines at 360px; a third display line spends the fold budget the hero spec allocates elsewhere.

### Candidate A — the anchor, as written (6 words)

```
Ship a product. Without a team.
```

- **Treatment**: none. No strike, no accent required.
- **Announced string**: identical to the visible string.
- **For**: shortest, hardest cut; the full stop after "product." is the five-second verdict.
- **Against**: it sits one viewport above a formation labelled as a team of eight. The skeptical
  reader pays a beat reconciling "without a team" with the roster — the ambiguity is resolved by the
  subline, one line too late for a five-second skim.

### Candidate B — the founder's edit mark, article repaired (9 rendered words) ★ RECOMMENDED

```
Ship a product with ~~a human team~~ AI agents.
```

Visible composition: `Ship a product with` + struck `a human team` + accented `AI agents.`

- **Treatment**: "a human team" struck in ink; "AI agents" in rust at display size (rust on display
  text is permitted; the accent is not a new colour). The strike takes the whole noun phrase, so the
  sentence parses **both before and after the edit**: *"Ship a product with a human team"* →
  *"Ship a product with AI agents."*
- **Announced string (required)**: `Ship a product with AI agents.` — the struck phrase must not be
  announced. Screen readers read struck text as ordinary text, so the accessible name must be the
  post-edit sentence only; UI/UX specifies the markup that achieves this.
- **For**: it resolves the anchor's ambiguity visually instead of spending words — there *is* a team,
  and it is AI. The strikethrough is an edit mark, and on a page about a governed build process an
  edit mark is on-thesis rather than decorative. The beat it costs is spent landing the thesis, not
  lost to confusion.
- **Against (stated honestly)**: a struck phrase at display size is a typographic gesture on a page
  whose surface rule is restraint. If it reads as decoration when rendered, candidate A is the
  fallback — that judgment is exactly what rendered candidates are for.

### Candidate C — the ambiguity resolved in words (7 words)

```
Ship a product. The team is AI.
```

- **Treatment**: none required; "AI" may take the rust accent.
- **Announced string**: identical to the visible string.
- **For**: candidate A's rhythm with the reconciliation built in; zero treatment risk; trivially
  screen-reader-safe.
- **Against**: states what B demonstrates; the second sentence explains rather than lands.

### Candidate D — the name as the collective noun (9 words)

```
Ship a product with a muster of AI agents.
```

- **Treatment**: none required; "muster" may take the rust accent.
- **Announced string**: identical to the visible string.
- **For**: "a muster of AI agents" makes the product name do the work — muster: assemble into
  formation, which is what the visual beside it shows.
- **Against**: it is wordplay, and the brand never sounds pleased with itself; the reader who misses
  the collective-noun reading gets a weaker sentence than A, B, or C.

### Recommendation

**B.** It beats the anchor on the anchor's one real weakness (the "without a team" / eight-plate
formation collision), it repairs the founder's article break without losing the edit-mark idea, it
survives being read aloud as a clean sentence, and its accent spends only permitted ink. A is the
named fallback if the rendered strike reads as decoration.

## 3. The subline (one string, shared by all candidates)

**Budget: ≤ 12 words** — one line at desktop, at most two at phone. Written: **11**.

```
One operator. Eight AI roles. The queue is the org chart.
```

| Claim | Source |
|---|---|
| One operator, eight AI roles | Seed rule 8 ("8 agents, 1 operator"); roster of eight in `copy-rules.md` scope table |
| The queue is the org chart | Seed rule 11 coinage, used as-is |

The subline names the team as AI in full words (R8), so every headline candidate — including A —
is disambiguated by the second line the reader reaches.

## 4. The measured line

The seed's own string ("this build: 9.3 hours of active build, $147 in AI tokens") reads "this build"
as THIS SITE while the numbers are BODH — the exact scope conflation A-005 names. The framing below
replaces "this build" with the product's name and its span label; the numbers are untouched.

**Primary (budget ≤ 20, written 18):**

```
Bodh — a shipped App Store + web product — idea → live: 9.3 hours of active build, $147 in AI tokens.
```

**Compact (budget ≤ 14, written 12)** — same scope discipline for a tighter fold; UI/UX picks by
measurement, not preference:

```
Bodh, idea → live: 9.3 hours of active build, $147 in AI tokens.
```

| Claim | Source |
|---|---|
| 9.3 hours of active build, $147 in AI tokens | Seed §1 measured line; Measured data table (BODH column) |
| Bodh, idea → live | Seed rule 5 (BODH = *idea → live*); scope table |
| Shipped App Store + web product | Seed Measured data ("bodh.day — App Store + web"); seed §5 ("shipped iOS app + web landing") |

"9.3 hours **of active build**" is R2's framing — never "in 9.3 hours," which would imply wall-clock.
The line must be visible without scrolling (seed §1); the hero spec sets the pixel budget that makes
that falsifiable.

## 5. Eyebrow facts (locked, 8 words)

```
open source · runs in Claude Code · v4 · MIT
```

Verbatim from seed §1. Display casing (tracked uppercase) is the type system's call; the `·`
separators are visual only and must not be announced — UI/UX specifies the markup.

## 6. Formation labels

The eight roles (from the `copy-rules.md` scope table): **PM · Developer · UI/UX · QA · Content ·
Marketing · Legal · Research.**

The formation's hub reading is specified by UI/UX; both label sets below are final strings for
whichever reading ships:

- **Hub = PM** (recommended reading): hub plate `PM`; bus-bar plates `DEVELOPER · UI/UX · QA ·
  CONTENT · MARKETING · LEGAL · RESEARCH` (seven specialists — no role appears twice).
- **Hub = operator**: hub plate `OPERATOR`; bus-bar plates all eight role names.

**Optional formation caption (budget ≤ 6, written 5):** `8 AI AGENTS · 1 OPERATOR` — the R8
attribution shape, uppercase as a label.

## 7. The dual build readout

Two rows, THIS SITE above BODH, each row scope-labelled (seed §1; R4, R5). Strings:

| Element | String |
|---|---|
| Row 1 label | `THIS SITE · SPEC → LIVE` |
| Row 1 values | `—` · `—` · `THIS PAGE` |
| Row 1 caption | `measured at launch` |
| Row 2 label | `BODH · IDEA → LIVE` |
| Row 2 values | `9.3 h` · `$147` · `bodh.day` |
| Cell labels | `ACTIVE BUILD` · `COST · API LIST` · `SHIPPED` |
| Chip | `VERIFY ⎘` |

- Dashes are R4's rendering of an unmeasured metric — never a placeholder value. The caption
  `measured at launch` rides with the dashes.
- `COST · API LIST` carries R3's framing into the cell label so the number is never read as
  subscription spend.
- Chip: visible text `VERIFY ⎘`. Suggested accessible name: `Verify these numbers — VERIFY.md`;
  the hero spec rules the final name and the `href`.

## 8. The curl (one string, byte-identical everywhere it appears)

```
curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product
```

Identical by string equality to the verified form in `copy-rules.md` R12. The hero shows the command
alone; the blinking cursor belongs to the §6 curl, which owns the page's only cursor.

## 9. Hero terminal chrome label

The hero terminal streams the wave-scope run-log, so it carries the same label strings as §2's
terminal — one copy set, and the scope adjacency (wave-scope terminal beside whole-product BODH
figures) is disambiguated by the label itself:

- **≥ wide breakpoint**: `BODH · SPRINT 4 — CONDENSED FROM THE REAL BUILD LOG`
- **< wide breakpoint**: `CONDENSED FROM THE REAL BUILD LOG`

Which corpus lines stream, at what rate, and the loop/end state are the hero spec's to rule; the
lines themselves come only from the terminal-line inventory in `bodh-sprint4-corpus.md`.

## 10. Verification statement

Every numeral above traces to the seed's Measured data table or the corpus and is cited in place:
`9.3`, `$147`, `v4`, `8`, `1`. No number is rounded or given precision its source lacks. No banned
adjective, no exclamation mark, no "proven," no human-cost baseline, no second CTA. First person
appears nowhere. The wave totals (~64 min, $24.73) appear nowhere in §1 copy — the hero terminal's
wave scope is carried by its label, not by numbers adjacent to BODH's. Unmeasured metrics render as
dashes with `measured at launch`. The curl was verified by string equality against `copy-rules.md`,
not by fetching.
