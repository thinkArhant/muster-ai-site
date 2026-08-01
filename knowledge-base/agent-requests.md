# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### HO-044 — Developer: §5 priced in prose, §1 slimmed to its posture, two phone bugs closed, and the harness re-based around all of it

**From**: Developer · **Reviewers**: QA (`pending` — the terminal sweep runs on this tree),
PM (`pending` — review against HO-042, HO-043 and DEC-061…064)
**Status**: open · **Filed**: 2026-07-31

**Commit**: `f166dfb developer: the page prices Bodh in prose and asks one question twice`

#### 1. Runner counts, on the shipped tree, tree clean

| Runner | Result |
|---|---|
| `node tests/verify-shell.mjs` (Blink) | **304/304** |
| `node tests/verify-webkit.mjs` (WebKit, via `scripts/test.sh`) | **27/27** |
| `node tests/qa-independent-audit.mjs` | **108/108** |
| `node tests/qa-fullpage-sweep.mjs` | **45/45**, 3 measurements reported |

`verify-shell.mjs` was aborting before check one when this round opened; the first fix was its §5
copy parser, and the parser now **discovers** the cell inventory instead of re-hard-coding it — it
walks `Key N` until the row is absent and matches the prose heading on its shape rather than on the
number it spells. Planted against: a copy file re-keyed to three cells makes the runner go **red on
the cell-count check with `2/2 cells against the deliverable's 3`**, which is what it should have
done in the first place, instead of crashing.

#### 2. Files changed

| File | What changed |
|---|---|
| `index.html` | §5's four prose lines and two-cell cards; §1's strip slimmed to the head row with one top-left mark; the footer's re-ruled sentence with two nowrap spans |
| `styles/sections.css` | The remnant's dead cell rules and `.shipped__caption` retired; §5's comment block re-stated for four lines and two keys |
| `styles/chrome.css` | `.pagefoot__unit` — the style-only nowrap run |
| `scripts/replay.js` | Both panes rewind on replay (`rewindPanes`), and the rail is addressed by name rather than through `parentElement` |
| `scripts/sheet-indicator.js` | Rest resolved from geometry, with the end of the track as its own case, and a passive scroll listener beside the observer |
| `tests/verify-shell.mjs` | The parser, plus every §5 / §1 / footer coupling below |
| `tests/qa-independent-audit.mjs` | The readout rule's unanswered test |
| `tests/qa-fullpage-sweep.mjs` | The dash-cell finding, `WHOLE_PRODUCT`, the count-up cell, the blind contrast probe |
| `tests/verify-webkit.mjs` | §5's ink-dash count compared against Blink's rather than restated |
| `design-specs/web/section-01-hero.md` | Form A deleted; §7 re-written as the ruled single-row strip with its why; assertion 8 re-based; the stale re-base table retired (rule 15) |

#### 3. The two bugs, with the assertion each one lands with

**Bug 1 — §2's replay did not reset both panes.** `restart()` now calls `rewindPanes()` after the
state attribute lands, so the rewind is written against the idle layout rather than the end-state
one. Assertion: *"§2 replay returns BOTH panes to the top — terminal and narration"*, driven through
the **rendered control** (`.replay__controls button`), at 1280 × 900 and 375 × 553, printing each
pane's before → after against its own scrollable extent so a pane that never moved cannot be read as
a pass. Measured before the fix: **narration 990 of 991 at 1280, unchanged by the press**.

**One correction to the brief's premise, measured rather than assumed.** The brief says neither pane
returned to top. In Blink, the terminal already did — `restart()` was setting `log.scrollTop = 0`,
and at 375 the log went **480 → 0** before any change of mine. What did not reset was the
**narration rail**, and only at desktop, where it is the pane that scrolls. The fix covers both
because which pane scrolls depends on the viewport; the assertion exercises both and the evidence
line says which one was actually parked at each width.

**Bug 2 — §4's indicator stopped at slot 3.** Root cause found by measurement, and it is neither a
rounding error nor a short `max-scrollLeft`: at the track's end the last **two** sheets are both
wholly visible from **1600px up**, visibility ties, and the tie was broken by document order — so
the last segment could never light, at any scroll position, on any screen that wide. Below 1600 the
last sheet wins the ratio outright and the bug is invisible. Measured at the track's end before the
fix: `1600px [0,0,100,100]% → slot 3` · `1728px → slot 3` · `1920px → slot 3` · `1280px → slot 4`.

Two things had to change. Rest is now resolved from geometry — most visible, earliest on a tie,
because with `scroll-snap-align: start` the earlier of two equally visible sheets is the one on the
snap line — **with the end of the track as its own case**, recognised from the boxes (the last
sheet's end edge plus the scrollport's end padding sitting on the scrollport's end edge, while the
first sheet is no longer whole). The last sheet's own snap point lies past the maximum scroll, so
nothing aligns there and what the reader has arrived at is simply the end. And an observer alone
cannot see it: across the entire run between "the last sheet became whole" and the end of the track,
**no intersection ratio changes**, so there is nothing to fire on — a passive, rAF-coalesced scroll
listener drives the same resolution. Neither path reads or writes a scroll position, so the shell's
"no script touches the scroll" assertion holds as written.

Assertion: *"§4 (d2) at the track's end the LAST segment is the lit one — including where the last
two sheets are both whole"* — programmatic scroll to the end, at **1280 and 1600**, expecting the
last segment for the last sheet (both counts read from the DOM, never from a share heuristic of the
harness's own). It prints each sheet's visible share and how many are whole, so the evidence shows
the tie regime being exercised. Verified after the fix at every snap point at 960 / 1280 / 1440 /
1600 / 1728 / 1920: **1 → 2 → 3 → 4** at every width.

#### 4. Couplings re-based

HO-042's eleven, all landed: the parser; prose 3 → 4 (asserted as *the deliverable's count*, not as
`4`); `cells.length` → the deliverable's slot count; `SEED_KEYS` down to two, with `SHIPPED`
reconstituted as `value + " — " + sub` and diffed byte-exact against the seed's
`bodh.day — App Store + web`; the commit-day check retired into a stronger property — **each card
carries exactly one cell-level sub-line, on the cell the copy file attaches it to**, which is the
diagonal the composition rests on; card-level captions **0 on both**, with `measured at launch`
asserted as the sub-line of card 2's dash; `siteOf` re-based to the prose figures; §5's count-up
block down to one counting cell (derived from the copy file's values, not listed here); the footer's
string equality (no change needed); §5's markup.

HO-043's six, all landed: `SHIPPED` values are accent — the split is now asserted as the
**answered/unanswered channel** (every answered value rust, exactly one ink em-dash) in both themes
and in WebKit; card comparability as four relationships, never a literal height, including each
sub-line's **hang below its own value**; one column edge across all four prose lines; the strip's
marks; the footer's units; the sweep's dash count.

**Content's finding is closed as Content described it.** `dashCells >= 4` would have passed after
the rebuild for the wrong reason — §5 does hold exactly four em-dashes, three of them prose
punctuation. It now counts `.readout__value--unmeasured` **elements** inside the card found by its
scope label and asserts **1**, and the evidence line prints both numbers side by side so the
distinction stays visible.

`WHOLE_PRODUCT` is re-based from strings to patterns (`/9\.3\s*(?:h\b|hours?\b|hrs?\b)/gi` and
friends), because `9.3 h` no longer renders as that string and an exact-string check would have gone
**blind, not red**. Planted: a second rendering in a *different* format elsewhere on the page —
`9.3 hours` in §6 — is caught (`shipped-with-muster ×1 · get-started ×1`). The old check could not
have seen it.

#### 5. Five couplings the brief did not list, found by running

1. **`verify-shell.mjs`: "registration marks: two per instrument surface"** — a hard
   `every(s => s.marks === 2)`. Form B gives the remnant one mark, so this went red. Re-based to the
   ruled relationship: two per surface, **one where the end corner is let to an interactive
   element**, which is `page-shell.md` §8's own wording.
2. **`qa-independent-audit.mjs`: the readout rule derived "unmeasured" from "has no digit."**
   `bodh.day` and `THIS PAGE` have no digits, so the check demanded ink for both and failed the
   ruled treatment. Re-based to the em-dash as the unanswered glyph — and strengthened: the page
   carries **exactly one** unanswered value, which is the relationship the dash's meaning rests on.
3. **`qa-fullpage-sweep.mjs`: "§1's remnant says `measured at launch`"** — true before this round,
   false by ruling now. Replaced with its inverse plus the page-wide count: §1 makes no unmeasured
   claim, and `measured at launch` occurs **exactly once page-wide**.
4. **`qa-fullpage-sweep.mjs`'s contrast probe went BLIND, not red.** It read `#hero .remnant__key`
   and skipped missing selectors with `if (!el) continue`, so retiring the strip's cells silently
   dropped a surface from a check that still claimed to measure it. Every selector must now resolve;
   an absent one is reported as `ABSENT — probe found nothing` and fails. Re-targeted to
   `.remnant__scope` and extended to §5's key and sub-line. Planted by renaming the class: red, both
   themes.
5. **`verify-webkit.mjs` asserted `inkDashes.length === 4`.** Re-based to compare against the count
   **Blink measured in the same run**, read out of `blink-report.json` — the claim this file uniquely
   owns is that WebKit paints the dash in ink, not how many there are.

#### 6. Every plant, and what went red

Each was applied to the committed tree, run, and reverted; `git status` was clean between plants and
is clean now.

| # | Plant | Runner | What went red |
|---|---|---|---|
| 1 | `measured at launch` moved from the dash's cell to a card-level caption | shell | sub-line-attachment (`card 2: [null,null] against ["measured at launch",null]`), the one-dash check (`captions 0+1`), pair comparability (`sub-line hangs 12 vs px`) |
| 2 | `readout__value--unmeasured` dropped from the dash | shell · audit · sweep · WebKit | shell: dash computes `rgb(192,90,50)`, and the light-theme split · audit: `"—" #C05A32 ← content and modifier disagree`, both themes · sweep: R4 · **WebKit: `0 ink cluster(s) … rust dashes 1 · Blink counted 1`** |
| 3 | `data-countup` added to `bodh.day` | shell | counting-cells (`SHIPPED/bodh.day: static`) and the roll check |
| 4 | `App Store + web` → `App Store + Web` | shell | seed byte-equality, on the reconstituted cell |
| 5 | §5's new prose line deleted | shell | prose verbatim (`3 rendered against 4 authored`), the primary line, the card/line count, and `siteOf` (`activeBuild "9.3" ×0 · cost "$147" ×0`) |
| 6 | The bottom-right mark restored to the strip | shell | mark count (`{"on":"remnant","marks":2}`), **and the collision clause: `regmark--br overlap 3.13px²`, 1 element on the chip's border box, at 1280 and at 320/360/375/390** |
| 7 | A readout put back into §1 | shell | `strip reads "THIS SITE · SPEC → LIVE VERIFY OPERATOR ATTENTION — measured at launch"` |
| 8 | `.pagefoot__unit` set to `white-space: normal` | shell | `"never invoked" ×2 rect` at 1280, `"Kanwar Sandhu" ×2 rect` at 375 and 320 — the founder-visible defect, reproduced |
| 9 | `footer-copy.md`'s published count 35 → 36 | shell | `35 words rendered against 36 published` — the check reads the file |
| 10 | The narration rail's rewind removed | shell | `1280px: narration 990→990 of 991` |
| 11 | The indicator's end-of-track case removed | shell | `1600px: … (2 whole), segment 3 of 4 lit` while 1280 still passed — the exact regime |
| 12 | A `Key 3` row added to `section-05-copy.md` | shell | cell count (`2/2 cells against the deliverable's 3`) — **and no crash**, which was the point |
| 13 | The cell's reserved sub-line row removed | shell | key-for-key alignment and pair comparability, with the ragged heights printed |
| 14 | `font-weight: 700` on the primary `<p>` | shell | one column edge — `widths [685.31, 685.31, 744.81, 685.31]`, the 64ch defect reproduced |
| 15 | A transition on the dash under reduced motion | shell | the dash-inert check (`static none/1s`) |
| 16 | A second `9.3 hours` added to §6 | sweep | `shipped-with-muster ×1 · get-started ×1` |
| 17 | `$147` removed from §5's prose | sweep | the figure's site check, and the mid-roll AX check (`the prose 9.3 hours` — only one of two) |
| 18 | `.remnant__scope` renamed | sweep | contrast, both themes: `ABSENT — probe found nothing` |

#### 7. Cross-engine

Rendered and looked at, not merely asserted. **Blink**: §1, §5, the footer and §2-after-replay at
1280 and 375 in **both themes**; §4's track end at 1600. **WebKit** (`qlmanage`): §1 whole, and §5
and the footer isolated, in both themes — same composition, same values, same ink/rust split, the
`APP STORE + WEB` sub-line under `bodh.day` and `MEASURED AT LAUNCH` under the dash, and the footer
setting three lines with both units whole.

**No WebKit evidence exists at any phone width, and none for §4's track end or §2's replay in any
condition.** `qlmanage` is the only WebKit on this machine: it executes no JavaScript and renders at
a fixed ~1024² whatever size is requested. Every phone number in this handoff is Blink's and is
labelled as such; the two JS-driven behaviours are Blink-only by construction, and that is a gap in
the evidence rather than something the runners cover.

#### 8. Measured versus judged

**Measured**: every runner count; the indicator's slot at each snap point across six widths; both
panes' scroll offsets before and after the press at two viewports; the mark/chip overlap in px² and
per axis; the footer's client rects and line counts at 1280/375/320; §5's card heights, row tops,
sub-line hangs, column widths and computed colours in both themes; the WebKit ink/rust clusters.

**Judged, not measured**: that removing the dead `.remnant__*` and `.shipped__caption` rules is
right rather than out of scope (HO-043 said the strip needs no CSS change, which is true of the
render; leaving ~60 lines of unreachable CSS on a page that argues from build quality is not); that
retiring `section-01-hero.md`'s stale re-base table is durability discipline rather than deletion of
someone's work; that the end-of-track clause is a principle rather than a special case.

#### 9. Two findings, neither a launch blocker

1. **`section-05-copy.md` ends with a stray `</content>\n</invoke>` (2 lines).** A tool-call artifact
   in a Content deliverable, present before this round. It is outside every parsed section so no
   check reads it and nothing ships from it, but it is in a public repo that the page's footer links
   to as a receipt. Swept the rest of `design-specs/`, `VERIFY.md` and `knowledge-base/*.md` — this
   is the only file affected. **Not fixed here**: it is Content's file, and this round writes its own.
2. **`section-01-copy.md` §5 still specifies §1 strings that no longer ship** — `ACTIVE BUILD`,
   `COST · API LIST`, the two dashes and the `measured at launch` caption. The `THIS SITE · SPEC →
   LIVE` label and the chip are correct. Nothing is coupled to it (no runner reads the file) and
   nothing ships from it, so this is documentation drift, not a page defect. Left for Content for
   the same reason.

**One accuracy note on HO-043 and DEC-064**, offered because I built on it and checked it. The
bottom-right mark's overlap with the chip is real and I reproduced it — `0.63px × 5px = 3.13px²` at
1280, 375, 320 — but **only on the single-row strip**. On the strip as it actually shipped before
this round, the mark sat **147.67px below** the chip and the boxes never intersected. So the
overlap was a property of the proposed form, not of the page "today"; HO-043's own gloss (*"it only
became visible as the strip shrank"*) is the accurate half. The ruling is unaffected — the mark is
gone either way, and the harness now fails if it returns.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-31 — HO-043 (UI/UX): **accepted, no revision.** Every ruling was chosen from a rendered
  proposed state and each names its engine and viewport, which is the standard this project asks for
  and does not always get. Three things earn the acceptance beyond the rulings themselves: the
  two-cell card was *measured* rather than assumed safe (card heights equal at 361.8px, sub-lines on a
  shared reserved track at 42.0px, so the diagonal asymmetry reads as a matrix answered rather than as
  an omission — contradicting this brief's premise that it would need fixing); the alternative
  composition was disqualified on measurement, not taste (475.6px against 361.8px); and the `THIS PAGE`
  colour ruling checked its own consistency argument and reported that it did not survive — §1 rendered
  that string in ink because a spec once flattened all three strip values, never as a ruling about the
  string. Two defects were found that nobody asked it to look for: the registration mark overlapping
  the chip's border box, and the footer breaking the founder's name across lines at 375 and 320. The
  contact sheet earned the founder's verdict in one sitting, which was its whole job.

- 2026-07-31 — HO-042 (Content): **accepted, no revision.** The two prose defects PM ruled were built
  as ruled, and the form Content chose over PM's draft is better than the draft: naming Bodh in the
  measured line rather than opening bare — because the nearest antecedent above it is *its website
  wave*, the one scope those figures are not — removes the page's most dangerous ambiguity for one
  repeated word, and `Bodh, idea to live:` matches the card label verbatim so prose and card bind
  without a sentence saying so. VERIFY.md's economics landed with the scope trap handled: the driver
  figures are labelled a floor, twice, and cannot be read as filling the page's dashes. The handoff's
  eleven-item coupling list was accurate and saved Developer a rediscovery pass, and the one item it
  flagged as a *finding* rather than a re-base — the four-em-dash check that would have passed for the
  wrong reason after the rebuild — is exactly the class of blindness this round was hunting.

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
