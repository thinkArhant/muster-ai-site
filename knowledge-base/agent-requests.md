# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### HO-042 — Content: §5's cost posture in strings, the final footer sentence, and the site's economics published in VERIFY.md

**From**: Content · **Reviewers**: UI/UX (`pending` — composes the two-cell card and §1's remnant
against these strings), Developer (`pending` — builds every string and re-bases the couplings
below), PM (`pending` — line-by-line copy-rules review)
**Status**: open · **Filed**: 2026-07-31

**Scope**: strings only. Three files written — `design-specs/web/section-05-copy.md`,
`design-specs/web/footer-copy.md`, `VERIFY.md`. No markup, no CSS, no test file touched.

#### 1. Every string that changed

**§5 — prose. Four lines now, not three.** Lines 1, 3 and 4 are byte-unchanged; line 2 is new and
sits between the Bodh identity line and the provenance line.

```
Bodh, idea to live: 9.3 hours of active build, $147 in AI tokens at API list price.
```

17 words against a ≤ 20 budget, script-measured. It renders at prose weight in ink — §5's single
primary is still the provenance line, and §5's prose block still carries no accent-coloured
element. Rationale for four lines over one merged line, and for naming Bodh twice, is in
`section-05-copy.md` §3.2 and ruling 1.

**§5 — cards. Two keys each, symmetrical.** `ACTIVE BUILD`, `COMMIT-DAYS` and `COST · API LIST` are
gone from both cards; commit-days appear nowhere on the page after this.

| Slot | Card 1 | Card 2 |
|---|---|---|
| Card label | `BODH · IDEA → LIVE` | `THIS SITE · SPEC → LIVE` |
| Key 1 | `OPERATOR ATTENTION` | `OPERATOR ATTENTION` |
| Value 1 | `4.8 h` | `—` |
| Sub-line 1 | (none) | `measured at launch` |
| Key 2 | `SHIPPED` | `SHIPPED` |
| Value 2 | `bodh.day` | `THIS PAGE` |
| Sub-line 2 | `App Store + web` | (none) |

Two rulings inside that table that Developer and QA need as one answer, not two:

- **`measured at launch` attaches to the dash, not to the card.** Card 2 carries one unmeasured
  value beside one measured one, so a card-level caption would say the `SHIPPED` answer is
  unmeasured too. Both cards therefore have **zero** card-level captions and **one** cell-level
  sub-line each, in different cells.
- **`THIS PAGE` is uppercase, in every seat.** Readout values take no CSS transform, so the copy
  file's string is what renders. §1's remnant already ships `THIS PAGE`; if it keeps a `SHIPPED`
  cell it renders the same string byte-identically. Its twin `bodh.day` stays lowercase because a
  hostname is a literal a reader may type — the asymmetry is ruled, not drift
  (`section-05-copy.md` ruling 6).

**Footer — the closing sentence, founder-ruled and final.** Byte-exact, 35 words script-measured
against a ≤ 40 ceiling:

```
Specced, written, and reviewed by Muster's AI team — 5 of 8 agents, the other three never invoked, 1 operator — on a framework designed and built by Kanwar Sandhu, solo, shipping his own products with it.
```

The A/B/C candidate structure is retired from `footer-copy.md`; the ruling is made. The receipts
row and the contact link are untouched.

**`VERIFY.md`** gains one section between the scope table and the receipts: *"What this site has
cost so far — a floor, and not the THIS SITE row"*, plus a *"The rate, with its inputs"*
sub-section. It publishes $594 / 51 step-sessions / ~27.3 driver-hours, the tier split, the
under-10% waste share, and the $21.8/hr rate against the wave's $23.2/hr — every figure quoted
from the committed record, none re-derived. The three-scope table is untouched and THIS SITE stays
dashed.

#### 2. The scope guard, and one accuracy note that needs a founder answer

The published economics are **driver-log scope** — what the committed autonomous step-sessions
cost. VERIFY.md labels them a floor twice, up front, and states plainly that nothing in the
section answers *spec → live*. The dashes are not quietly filled.

**The accuracy note**: the tree today carries more `.metrics` lines than the snapshot those
figures were read from, so a reader who sums the committed files gets a larger number than $594.
VERIFY.md says so in the section's own preamble rather than leaving the reader to find it. Whether
a fresh snapshot replaces these figures at launch is a founder call — logged in Founder Decisions.

#### 3. Harness couplings this breaks — all in `tests/`, all Developer's to re-base

`qa-fullpage-sweep.mjs` **45/45** and `qa-independent-audit.mjs` **108/108** are green right now,
both re-run after the writes. `verify-shell.mjs` **does not go red — it aborts**, at
`tests/verify-shell.mjs:2129`, before any check runs. That is designed (copy leads the build) but
it is a hard abort rather than a set of reds, so it is stated first:

1. **`verify-shell.mjs` §5 copy parser, lines ~2116–2138 — CRASHES.** Two causes, both live.
   (a) It finds the prose by `/^## 3\. The three prose lines/`; the heading now reads **four**, so
   `at` is `-1` and `prose` parses empty. (b) It hard-reads `Key 1..4` / `Value 1..4`; rows 3 and 4
   no longer exist, so `cellOf(undefined, col)` throws. Fix shape: match the heading on
   `/^## 3\. The \w+ prose lines/`, walk `Key N` until the row is absent, and treat a cell with no
   backticked run as `null` — the table's `(none)` slots are authored for exactly that.
2. **`verify-shell.mjs`: "§5 ships the three prose lines verbatim"** — `prose.length === 3` and
   `lines.length === 3` both re-base to **4**.
3. **"§5 renders two cards and only two"** — `shipped__line` count 3 → **4**, and
   `cells.length === 4` → **2**.
4. **"§5's four BODH figures are byte-equal to the seed's Measured data table"** — `SEED_KEYS` now
   maps `OPERATOR ATTENTION` → `Operator attention` and `SHIPPED` → `Shipped` only. The `SHIPPED`
   assertion must reconstitute the seed cell rather than compare the value alone:
   `value + " — " + sub === seed.value` gives `bodh.day — App Store + web`, byte-exact.
5. **"§5 carries the commit-day window the seed states"** — retires. Its replacement is the
   `App Store + web` sub-line under card 1's `SHIPPED`; the "exactly one cell carries a sub-line
   per card" property survives and is worth keeping as the re-based form.
6. **"§5 unmeasured values are ink em-dashes with one card-level sub-line"** — re-bases hard:
   `cards[1].caption` is now `null`, `captions === 0` on **both** cards, and the
   `measured at launch` string is asserted as the sub-line of card 2's `OPERATOR ATTENTION` cell.
7. **"§5 is the page's only site for 9.3 h, $147 and 4.8 h"** — keeps its counts, changes its
   evidence: `9.3 h` and `$147` are now substrings of §5's prose, not cell values. `"9.3 hours"`
   contains `"9.3 h"`, so `siteOf` still finds exactly one of each; worth a comment so a later
   reader does not think the check went stale.
8. **§5's count-up a11y block, lines ~2440–2495** — §5 now has **one** counting cell (`4.8 h`).
   `ax5Names.includes("9.3 h")` / `includes("$147")` and `settled.text === "9.3 h"` all re-base to
   the surviving cell; `s05Copy.cards[0].values.every(...)` in the roll check re-bases to two
   values, one of which (`bodh.day`) never counts.
9. **`qa-fullpage-sweep.mjs` "§5's THIS SITE card is four em-dashes" (`dashCells >= 4`)** — this
   one **will still pass, for the wrong reason**, and that is the finding. After the rebuild §5
   holds exactly four em-dashes: one dash cell plus three in prose (`Bodh — `, the provenance
   line's, `This page — `). The check would then measure the section's punctuation, not its dash
   cell. Re-base it to count `.readout__value--unmeasured` cells in card 2 and assert **1**.
10. **`verify-shell.mjs` footer sentence check, ~line 3505** — string equality re-bases
    automatically from `footer-copy.md`; no code change needed. Any hard-coded **35** word-count
    assertion Developer adds should be measured with the file's stated convention
    (whitespace-delimited tokens containing a letter or digit — em-dashes count zero).
11. **`index.html` §5 markup** — the section's comment block and cell structure carry the
    four-key shape; the `data-countup` attribute leaves the `9.3 h` and `$147` cells with them.

#### 4. Open for the round-2 and round-3 owners

- **UI/UX**: `verify-shell.mjs` aborts until Developer re-bases it — `qa-fullpage-sweep.mjs` and
  `qa-independent-audit.mjs` both run clean and are the usable baseline for the proposal round.
- **UI/UX**: §1's remnant strip still carries `ACTIVE BUILD` and `COST · API LIST` keys against a
  §5 that has neither. Whichever way the remnant is ruled (re-key to match, or slim to the chip),
  its `SHIPPED` value string is `THIS PAGE` — that one is settled here so it is not re-decided.
- **Developer**: §5's prose figures must not take the accent. Rust and the readout size are the
  instrument treatment; the harness already asserts zero accent-coloured elements in §5's prose
  block and that assertion should stay exactly as it is.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-31 — HO-041 (QA): **accepted, no revision.** The re-run's worth is not its three green counts —
  PM reproduced all of them cold anyway (**295/295 + 27/27**, **108/108**, **43/43**) — it is **plant 11**,
  the plant that did *not* go red and was reported as such. Lighting a second segment in the markup turns
  nothing red in `verify-shell.mjs`, because the observer repairs the state before any rendered check
  looks; rather than quietly dropping the plant, the handoff names the division that makes it safe
  (**source truth in the sweep, rendered truth in the shell**) and proves the rendered half genuinely
  falsifiable from CSS. A round that reports a negative result and then shows why it is not a hole is the
  standard this sprint has been trying to reach. Two disclosures earn the same credit: a
  `\b`-escaping bug that made the forward-promise matcher return zero hits for **every** word — the
  blind-by-construction class, caught by self-testing against a known-present word — and two plants first
  aimed at the runner that does not own the assertion, re-run against the one that does. The cross-engine
  claim is scoped honestly: masthead **scale** is asserted in Blink only, and the handoff says so instead
  of letting 27/27 imply otherwise.

- 2026-07-30 — HO-040 (Developer): **accepted, no revision.** Every ruling ships and PM re-measured the
  load-bearing ones on the shipped tree rather than reading them: masthead **18px word · 9 × 13.5 mark =
  0.5em × 0.75em**, separator pennant 6 × 9, `--bar-h` **48px unmoved**; the indicator's four segments at
  **x 128 → 1152**, the page's own rail, segment 1 in `--accent` and three at hair, **transition 0s and
  animation none on all four**; §5's three lines on **one column edge** (685.31px each) with the 700 run
  covering the whole claim; the footer's plain border gone (`border-top: 0`), one sentence, 35 words at
  lead scale. **The most valuable thing in the handoff is the sixth plant**, which found that stripping
  `is-active` broke nothing because the observer restores it — a page shipping four dead segments for the
  no-JS reader passed every rendered check. The fix asserts the guarantee in the source and only there.
  §5's `64ch` defect is the same discipline pointed at the author's own first draft: weighting the `<p>`
  resolved its column **8.7% wider** than its neighbours', and the harness caught it, not a reading.
  Both caveats — squash-merge reachability and VERIFY's provisional pin — were flagged rather than buried;
  **the pin is ruled in DEC-061**, and PM's own stress test found the gap beside it (below).

- 2026-07-30 — HO-039 (UI/UX): **accepted, no revision.** Five candidates rendered for one lockup, and the
  founder's own artwork **rejected on measurement** — the cream glyph composites at ~1.08:1 on the light
  ground, invisible — is the round declining a founder-floated shape with a number instead of a
  preference. The cascade clause is the discipline: `--bar-h` is asserted unmoved, so the hero fold
  arithmetic, §2's phone visibility budget and `--scroll-pad` all stand, and PM confirmed 48px on the
  shipped build. The indicator is chosen against a rendered alternative (the continuous thumb reads as a
  loading bar) and is aligned **by construction** — rail → rail-end are the same edges the resting sheet
  composes to, which is why the founder's misalignment cannot return by drift. F-R2 is settled by the
  contrast number rather than by taste, and the accent-mark idiom is recorded as **declined without a
  render**, which the revision log corrected before filing. The F-R1 memo prices its own options
  honestly, including that option 1 re-spends the founder's phone check — **PM's ruling and
  recommendation ride to the founder in the final packet.**

- 2026-07-30 — HO-038 (Content): **accepted, no revision.** The false word is gone from the copy that owns
  it, and the fix is stated as an application of the founder's resolved string rather than a rewrite — one
  word, 21 words unchanged, and QA later proved it **byte-identical (125 bytes) across all three seats**.
  §6's line does the harder thing: it draws a model-proof claim from the founder's safe-today material with
  **no forward promise anywhere in rendered text**, and strengthens §3's thread instead of repeating it.
  The two deliberate drops ("over markdown", "zero model tokens") show the repetition audit being applied
  to the author's own new sentence while it is being written, which is the right place for it. **F-R8 is
  filed as a memo with nothing applied**, exactly as asked — the discipline that made it rulable at this
  review. PM's ruling: eleven verdicts accepted, item 12 declined and re-ruled (DEC-061). One accuracy
  note, not a revision: the memo's `Muster` row counts "×7 prose" where **five** render — two of the
  seven are `<title>`/meta, which the memo's own scope excludes. The verdict is unaffected.

- 2026-07-30 — HO-037 (QA): **accepted, no revision.** The value of this re-run is not its three green
  counts — it is that **both alignment assertions were watched to fail on their own plant**, and the
  formation one reproduces the founder's F-B1 finding to the hundredth of a pixel (−173.81px), so the
  check measures what he saw rather than a proxy for it. The footer was verified by a script that parses
  `footer-copy.md` instead of retyping its strings, participation was re-derived from `git log` rather
  than read off the copy file it is meant to check, and the cross-engine result is labelled per engine
  with WebKit's 0.5px antialiasing delta stated rather than rounded away. The discarded method in the
  revision log — a widest-inked-row bus-bar scan defeated by the dark theme's grain — is disclosed with
  the note that no number from it survives into the handoff; that is the standard. The active-line budget
  it flagged is cleared by this review. OBS-017 ruled — see DEC-058.


- 2026-07-30 — HO-036 (Developer): **accepted, no revision.** PM re-ran all three runners cold on the
  shipped tree (suite GREEN both engines **282/282 + 27/27**, audit exit 0 at **108/108**, sweep exit 0 at
  **42/42**) and then **planted two violations of its own** rather than reading the handoff's plant list.
  A one-word drift into the footer's team line turned exactly one check red, naming the team line and
  printing `team line equal: false` — the measurement, not a constant. Zeroing `--track-bleed` turned two
  red and printed *"ground between the track's end and the screen: 128px"* — the founder's judged dead
  strip, reproduced by the harness as a number. Both reverted, tree clean. The three harness defects the
  step found by planting are each the OBS-015 shape (a constant where a measurement belongs), and it found
  them in its own new code. The 44px coarse-pointer miss the audit caught rather than the author is
  disclosed instead of folded in quietly. Two build decisions are stated rather than buried; the uppercase
  receipts transform is ruled in DEC-058. OBS-016 ruled there too.


- 2026-07-30 — HO-035 (UI/UX): **accepted, no revision.** Every ruling was measured before it was written,
  and PM re-measured each on the **shipped** build rather than on the proposal: hub centre − axis **0.0px**
  at 1280 *and* 1440, and the rail is one number for every block on the page (eyebrow, h1, formation and
  curl all at 128 at 1280; all at 24 at 375, footer included). F-B2 is ruled on measurement, not taste —
  paging fails because four of six sections exceed the 553px phone fold. **F-B3's phone half is the one
  place this round does not do what the finding asked**: the founder said §4 stacked is far too long, and
  the section got *longer* — PM measures **3042.1px at 375** against the 2957 he judged, the ordinal's
  cost. (The 3071px in DEC-057 is the *proposed* state's figure, measured on
  `samples/gate-b-proposed.html`; 3042.1 is the shipped build. Both stand — different artifacts —
  noted so a later reader does not chase the 29px.) The handoff says so instead of smoothing it, and disqualifies every shrinking alternative on
  measurement (the accordion hides 12 of 16 rows from the find-in-page the founder is about to test). That
  is a defensible answer to a taste finding, and it goes to the re-gate labelled as one. The
  scroll-padding-percentage trap found by prototyping is the class of thing that ships silently broken.


- 2026-07-30 — HO-034 (Content): **accepted, no revision.** The footer line is the one string on this page
  a skeptic can audit role by role, and it names the three roles that did **not** run rather than only the
  five that did. PM re-derived the counts from `git log` on this branch — pm 49 · developer 14 · ui-ux 10 ·
  qa 8 · content 6 · **marketing 0 · legal 0 · research 0** — and "5 of 8 agents, 1 operator" is true as
  written. The email is gone from **every shipped file**, not only from the footer: swept file-wide for
  addresses and `mailto:`, zero hits. F-B5 ships as mechanism with no wall-clock anywhere in the shipped
  set (grepped for hour spans, "overnight", "through the night" — none), which is the founder's own
  claimable form and R2's line. F-B4's rewritten trade-off states the file-based mechanism instead of
  denying it, and PM read it on the rendered page rather than in the copy file. The first person in
  decision 4's mechanism row is inside R7's two permitted places (§4's decisions are founder-supplied), so
  it is not a violation. The self-caught VERIFY.md rewording that would have broken the sweep's asserted
  roster qualifier is the standard. **One departure from the seed was checked rather than assumed**:
  the receipts row carries six links where the seed's footer names five, and the sixth — the framework
  repo — is founder-supplied in DEC-056's answer 1, so it is authorized source, not an addition. The
  drift this review *did* find is in PM's own file, not Content's: `copy-rules.md` R8 still blessed the
  superseded "8 agents, 1 operator" and R9 still said "one GitHub link" — both fixed in place, DEC-058.


- 2026-07-29 — HO-030 (QA): **accepted, no revision.** The sweep is the instrument six criteria had no
  instrument for, and PM re-ran it cold — 42/42, exit 0 — rather than reading its summary. Its most
  valuable act is the one it was not asked for: it found that its own §2-exemption evidence prints a
  constant (OBS-015), disclosed that the figure HO-029 quotes as evidence is that constant, and declined
  to edit another role's file to hide it. That is the standard. **PM reproduced the finding firsthand**
  by planting §2's exemption away: the check went red while printing "0 of 13 gated rests moved," and the
  zero-request checks printed "none external" while listing a planted `x.png`. Verdict recorded before
  accepting HO-029, so that handoff's §2 bullet was read as "the check was green," never as a
  measurement. The decision to report the footer placeholder rather than assert it is also right — a red
  check would have misreported a known open item as a sweep failure.


- 2026-07-29 — HO-033 (QA): **accepted, no revision.** The step's literal deliverable was satisfied on
  arrival and the handoff says so in its first paragraph instead of claiming a repair it did not make.
  It then found the real subject — a harness that can hang silently is not fixed by a run that happened
  to finish — and closed it with the one unbounded external wait bounded and named, proven by planting a
  stalling `qlmanage` (pre-fix: 120 s blocked, zero output, killed; post-fix: red in 60 s naming the
  render). **The brief's own leading hypothesis was bisected and refuted rather than confirmed**, and the
  handoff states plainly that the original hang does not reproduce from the committed tree instead of
  inventing a culprit. Companion fix to `verify-webkit.mjs` disclosed rather than folded in quietly.
  OBS-014 accepted as closing OBS-006's question: the step did have a subject, and this was it.
