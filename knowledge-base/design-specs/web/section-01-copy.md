# §1 Copy — hero strings

**Surface type**: every Content-owned string in the §1 hero (copy deliverable)
**Consumers**: UI/UX (specifies the headline treatment and its accessible name against these strings),
Developer (builds the strings verbatim), PM (reviews line by line against the copy rules), QA
(announced-string and scope checks)
**Sources**: every factual claim traces to `product-spec-seed.md` (founder-authored, read-only) or a
founder gate ruling recorded in `decision-log.md` (DEC-045, DEC-046), cited per string below. Copy is
governed by `agent-skills/content/copy-rules.md` and the banned-word list in `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Product voice throughout.** §1 is not one of the two permitted first-person places.
- **§1 carries no Bodh material** (DEC-046): no Bodh numeral, no Bodh label, no Bodh corpus line. The
  page's whole-product numbers live in §5. The only measurement scope present in §1 is THIS SITE, and
  it renders as dashes (*spec → live*).
- **§1's inventory** (DEC-045, DEC-046): eyebrow · headline · formation + caption above the fold; the
  THIS SITE readout remnant and the curl below it. Nothing else — no subline, no measured line, no
  terminal. §2 is the page's only terminal.
- **Word counting convention**: words are whitespace-delimited tokens containing at least one letter or
  digit; numerals and compounds count as one word each; standalone punctuation and separators (`·`,
  `→`, an em-dash between spaces) count as zero. Counts below are script-measured, not eyeballed.
- **Locked strings are verified by equality**, not budgeted as prose — the headline, the eight role
  names, the readout labels and values, the curl, and the eyebrow may not vary, and a budget on a
  string that may not vary is an assertion that cannot fail.

## 2. The headline — settled, locked

The headline is founder-ruled from rendered candidates and is not open for re-drafting. It is the
founder's own edit mark: the sentence corrects itself in front of the reader.

**Visible string (9 rendered words):**

```
Ship a product with ~~a human~~ an AI team.
```

**Treatment (three spans, specified by the hero spec):**

| Span | Text | Rendering |
|---|---|---|
| Struck | `a human` | ink strikethrough; **excluded from the accessible name** (`aria-hidden`) |
| Accent | `an AI` | rust, colour only — rust on display text is permitted; the accent is not a new colour |
| Plain | `team.` | ink, no treatment |

**Announced string (required):** `Ship a product with an AI team.` — the struck phrase must not be
announced. Screen readers read struck text as ordinary text, so the accessible name must be the
post-edit sentence only; the hero spec rules the markup that achieves this, and the build verifies the
computed name from the accessibility tree, not by assertion.

**Why the spans divide exactly there**: struck = removed, rust = replacement, plain = unchanged. `team`
is the constant that survives the edit — accenting it would imply it is new and blur the one idea the
headline makes: the team does not change, its members do. Both sides of the swap are
determiner-plus-modifier (`a human` → `an AI`), so the edit is unit-for-unit and the sentence parses
before and after it: *"Ship a product with a human team"* → *"Ship a product with an AI team."*

**Measured line counts** (rendered in the page's real tokens):

| Viewport | Lines | Breaks |
|---|---|---|
| 320px | 3 | `Ship a product / with a human / an AI team.` |
| 360px | 3 | every line a whole phrase |
| 375px | 2 | the entire substitution on one line |
| 390px | 2 | as at 375px |
| 1280px | 2 | — |

No orphan word at any width; the struck phrase and the accented phrase each stay unbroken at every
viewport. At 375px and above the whole edit sits on one line, so it reads as a single gesture.

**Accepted posture, recorded**: select-and-copy yields the full visible sentence
(`Ship a product with a human an AI team.`). Accepted, not solved — the announced string and the
rendered strike carry the meaning for their respective readers.

## 3. Eyebrow facts (locked, 8 words)

```
open source · runs in Claude Code · v4 · MIT
```

Verbatim from seed §1. Display casing (tracked uppercase) is the type system's call; the `·`
separators are visual only and must not be announced — the hero spec rules the markup.

## 4. Formation labels — settled reading

The formation's reading is settled: **the hub is PM; the bus-bar carries the seven specialists.** No
role appears twice, and the visual reads true to the architecture — PM coordinates, specialists
execute.

- Hub plate: `PM`
- Bus-bar plates: `DEVELOPER · UI/UX · QA · CONTENT · MARKETING · LEGAL · RESEARCH`
- Caption (5 words): `8 AI AGENTS · 1 OPERATOR`

| Claim | Source |
|---|---|
| The eight role names | `copy-rules.md` scope table (the enumeration's single home) |
| 8 AI agents, 1 operator | Seed rule 8 ("8 agents, 1 operator"); R8's attribution shape, uppercase as a label |

The caption is the hero's only statement of the 8/1 fact — §1 has no subline, so the caption does that
work alone.

## 5. The build readout — THIS SITE remnant

One scope row (THIS SITE), dashes with their caption, and the `VERIFY ⎘` chip. Whether it renders as a
one-row readout or as something smaller is the hero spec's ruling; these are the strings whichever
form ships:

| Element | String |
|---|---|
| Label | `THIS SITE · SPEC → LIVE` |
| Values | `—` · `—` · `THIS PAGE` |
| Caption | `measured at launch` |
| Cell labels | `ACTIVE BUILD` · `COST · API LIST` · `SHIPPED` |
| Chip | `VERIFY ⎘` |

- Dashes are R4's rendering of an unmeasured metric — never a placeholder value, and they never
  animate. The caption `measured at launch` rides with the dashes.
- `COST · API LIST` carries R3's framing into the cell label so the value, once measured, is never
  read as subscription spend.
- Chip: visible text `VERIFY ⎘`. Suggested accessible name: `Verify these numbers — VERIFY.md`;
  the hero spec rules the final name and the `href`.

## 6. The curl (one string, byte-identical everywhere it appears)

```
curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product
```

Identical by string equality to the verified form in `copy-rules.md` R12. The hero shows the command
alone; the blinking cursor belongs to the §6 curl, which owns the page's only cursor.

## 7. Verification statement

The numerals in §1 are `v4` (eyebrow, verbatim from seed §1) and `8` · `1` (caption, seed rule 8).
No Bodh numeral, label, or corpus line appears anywhere in the section (DEC-046); the wave totals
(~64 min, $24.73) appear nowhere in §1 copy. No number is rounded or given precision its source
lacks. No banned adjective, no exclamation mark, no "proven," no human-cost baseline, no second CTA.
First person appears nowhere. Unmeasured metrics render as dashes with `measured at launch`. The
announced headline string contains no struck text. The curl was verified by string equality against
`copy-rules.md`, not by fetching.
