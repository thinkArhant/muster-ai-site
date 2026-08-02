# §1 Copy — hero strings

**Surface type**: every Content-owned string in the §1 hero (copy deliverable)
**Consumers**: UI/UX (specifies the headline treatment and its accessible name against these strings),
Developer (builds the strings verbatim), PM (reviews line by line against the copy rules), QA
(announced-string and scope checks)
**Sources**: every factual claim traces to `product-spec-seed.md` (founder-authored, read-only) or a
founder ruling recorded in `decision-log.md`, cited per string below. Copy is governed by
`agent-skills/content/copy-rules.md` and the banned-word list in `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Product voice throughout.** §1 is not one of the two permitted first-person places.
- **§1 carries no Bodh material**: no Bodh numeral, no Bodh label, no Bodh corpus line. The page's
  whole-product numbers live in §5.
- **§1 states no metric at all** — measured or unmeasured. THIS SITE is the only measurement scope
  named here, and §1 names the scope without stating a value for it. See §5 of this file for why.
- **§1's inventory**: eyebrow · headline · formation + caption above the fold; the THIS SITE strip
  and the curl below it. Nothing else — no subline, no measured line, no terminal. §2 is the page's
  only terminal.
- **Strings are recorded here as authored, not as rendered.** The page's mono label treatment sets
  `.t-label` and `.t-micro` runs in tracked uppercase, so several of the strings below reach the
  reader in a case they are not written in. What ships in the markup is the string exactly as this
  file writes it.
- **Word counting convention**: words are whitespace-delimited tokens containing at least one letter or
  digit; numerals and compounds count as one word each; standalone punctuation and separators (`·`,
  `→`, an em-dash between spaces) count as zero. Counts below are script-measured, not eyeballed.
- **Locked strings are verified by equality**, not budgeted as prose — the headline, the eight role
  names, the scope label, the chip, the curl, and the eyebrow may not vary, and a budget on a string
  that may not vary is an assertion that cannot fail.

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
- Bus-bar plates: `Developer` · `UI/UX` · `QA` · `Content` · `Marketing` · `Legal` · `Research`
- Caption (5 words): `8 AI agents · 1 operator`

| Claim | Source |
|---|---|
| The eight role names | `copy-rules.md` scope table (the enumeration's single home) |
| 8 AI agents, 1 operator | Seed rule 8 ("8 agents, 1 operator"); R8's attribution shape, set as a label |

The caption is the hero's only statement of the 8/1 fact — §1 has no subline, so the caption does that
work alone. It is a **roster** label and R8 permits it only because the formation diagram it sits under
is the roster; the count of roles that actually ran this build is the footer's sentence, and the two
never collide because each names its scope.

## 5. The THIS SITE strip

Two strings and one link. §1 names the scope this site will be measured over, and states nothing
about the measurement.

| Element | String |
|---|---|
| Scope label | `THIS SITE · SPEC → LIVE` |
| Chip, visible text | `VERIFY ⎘` |
| Chip, accessible name | `Verify these numbers — VERIFY.md` |

- **The strip carries no cell, no value, no dash and no launch promise.** An unmeasured value reads
  as a promise only beside a measured twin; alone at the top of the page it reads as a gap in the
  page's evidence, which is the opposite of what a dash is for. The twin lives in §5 of the page,
  where the one dash sits beside `4.8 h` and `bodh.day` and two figures in prose — so
  `measured at launch` occurs exactly once on the page, and not here.
- **The scope label stays.** It is the page's first scope declaration, and it costs nothing to keep
  honest: *spec → live* is a statement about the span this site will be measured over, not about a
  result. It is also what stops a reader from carrying §5's BODH figures back up to the hero.
- **The chip is §1's only interactive element and the page's proof link.** Its `href` is the same
  string as the footer's `VERIFY` receipt, byte-for-byte (`footer-copy.md` §3) — one link in two
  seats, and a drift between them is a 404 on the page's own evidence.
- **The strip is the section's only R4 surface, and it satisfies R4 by stating nothing.** R4 governs
  how an unmeasured metric renders; §1 renders none, so no placeholder, estimate or stand-in can
  arise here by construction.

## 6. The curl (one string, byte-identical everywhere it appears)

```
curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product
```

Identical by string equality to the verified form in `copy-rules.md` R12. The hero shows the command
alone; the blinking cursor belongs to the §6 curl, which owns the page's only cursor.

## 7. Verification statement

The numerals in §1 are `v4` (eyebrow, verbatim from seed §1) and `8` · `1` (caption, seed rule 8).
No Bodh numeral, label, or corpus line appears anywhere in the section; the wave totals (~64 min,
$24.73) appear nowhere in §1 copy. No number is rounded or given precision its source lacks. §1
states no build metric, measured or unmeasured — it names the THIS SITE scope, links the method,
and leaves every value to §5, so R4 has nothing to render and no dash appears in the section. The
one team claim is a roster label seated on the roster diagram, which is the single place R8 permits
it. No banned adjective, no exclamation mark, no "proven," no human-cost baseline, no second CTA.
First person appears nowhere. The announced headline string contains no struck text. The curl was
verified by string equality against `copy-rules.md`, not by fetching.
