# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-31 HO-041 — Scoped re-run on the re-gate round: every criterion passes, and the one check that did not go red is the right one not to
**Type:** handoff
**Producer:** qa
**Deliverable:** this entry — per-finding pass/fail with evidence. No shipped file touched; the
tree is byte-identical to `847b99d` at close.
**Status:** in-review
**Reviewers:**
- [ ] PM — pending (re-gate review step)

**All three runners re-run here, on the shipped tree, by me** — not read off HO-040:
`scripts/test.sh` **GREEN, 295/295 Blink + 27/27 WebKit** · `qa-independent-audit.mjs` **exit 0,
108/108** · `qa-fullpage-sweep.mjs` **exit 0, 43/43**. Every figure HO-040 reported reproduces.

**Per criterion.**

**1 — the provenance line, byte-equal.** PASS. Compared as bytes, not read: the shipped `<b>` run,
`section-05-copy.md` §3.2, and the founder's resolved string in `wave-review.md` are all **125
bytes and hex-identical**. `production` survives exactly twice in the shipped set, and both are
inside §2's replay markup (`log__line` L2 and narration SP1) — corpus material, 300+ lines from
§5's claim. Zero hits anywhere near the provenance line.

**2 — §6 carries no forward promise.** PASS, and **the first matcher I wrote was blind**. A
`\b`-escaping error made it return zero hits for every word including ones I knew were present; a
self-test on a known-present word and a known-absent word caught it before it reached this entry.
The corrected matcher finds **8 source hits — `yet` ×2, `will` ×5, `roadmap` ×1 — and every one is
inside an HTML, CSS or JS comment**, including the two in §6's own annotation explaining why the
words do not ship. Rendered text carries none. The §6 lead is present verbatim in
`section-06-copy.md` (32 whitespace tokens, 30 words — the two extra tokens are the em-dashes,
which is the gap between this count and HO-038's; both are under the ≤32 budget either way).

**3 — the four permalinks.** PASS. All four resolve by string to
`github.com/thinkArhant/muster-ai-site/blob/<sha>/<path>`; all four SHAs exist here
(`git cat-file -e <sha>^{commit}`, local, nothing fetched); **all four paths also exist at their
own commit** — a pinned link to a real commit that never held the file is the one way this receipt
404s while looking correct. A fabricated SHA (`deadbee`) is rejected by the same call that accepted
the four. Each snapshot read at its SHA:

| Link | SHA | What a reader actually lands on |
|---|---|---|
| queue | `9b26788` | 786 lines · **16 steps under `## Upcoming` plus a live Next Step** — a planned backlog, not a template. The founder's demo criterion is met. |
| handoffs | `bded0dd` | **11 active entries — 3 requests and 8 handoffs**, both entry types on one screen, as claimed. |
| decision log | `b41ed56` | 31 `DEC-` entries, ending at DEC-060. Current depth. |
| VERIFY | `14bceef` | 78 lines against the live file's 95. **The pinned copy predates the "four receipts, live" section this round added** — so the link that explains why pinned and live differ lands on the copy that does not contain the explanation. |

VERIFY's pin is the one open item, and **HO-040 flagged it rather than burying it**; I confirm the
condition exists and is exactly as described. PM rules it — it is a provisional pin awaiting a
launch commit, not a defect in this round's work.

**4 — the footer.** PASS. The shipped sentence is **byte-equal (197 bytes) to candidate A parsed
out of `footer-copy.md` §2**, not retyped into the check. It is one sentence by measurement — one
terminal period, at the end, 35 words. **No fragment of the retired two-sentence form survives** in
any shipped file. Email: **zero**, scanned with a general address pattern rather than one known
string, so a new address would be caught too; the matcher was self-tested against a known address
first.

**5 — the new assertions, each watched to fail. Thirteen plants, mine, tree reverted clean after
every one.**

| # | Plant | Went red on |
|---|---|---|
| 1 | one segment removed from the markup | sweep — *"3 segments authored, 1 lit"* |
| 2 | a second segment lit in the markup | sweep — *"4 segments authored, 2 lit"* |
| 3 | a `transition` added to the segments | shell — §4 (e), **and 3 more**: §3/§4 static, §4 reduced-motion, indicator-under-reduced-motion |
| 4 | `is-active` stripped from the markup | sweep — *"4 segments authored, 0 lit, first one lit: false"* |
| 5 | segment stroke 2px → 5px | shell — §4 (c), *"5px against the mechanism mark's 2px"* |
| 6 | masthead mark unbound from the wordmark (fixed px) | shell — the derivation check **and** the punctuation-scale check |
| 7 | masthead shrunk to label scale | shell — *"separator 6×9 · masthead 5.5×8.25"* |
| 8 | separator pennant 6×9 → 12×18 | shell — 4 red, including the footer's boundary check |
| 9 | indicator inset off the rail | shell — §4 (b), *"indicator 192–1088 against the rail 128–1152"* |
| 10 | a segment removed (rendered) | shell — §4 (a), *"3 segments against 4 sheets"* |
| 11 | **a second segment lit in the markup** | shell — **0 red.** See below. |
| 12 | `scrollbar-width: none` → `auto` | shell — §4 (f), *"scrollbar-width auto"* |
| 13 | every segment lit by CSS | shell — §4 (d), *"accent · accent · accent · accent"*, plus §4's zero-rust check |

**Plant 11 is the one worth reading.** Lighting a second segment *in the markup* turns **nothing**
red in `verify-shell.mjs` — the observer repairs the state within a frame of load, so the rendered
check §4 (d) never sees the defect. That is the same blindness HO-040 found with `is-active`, and
it is **already covered**: the identical mutation turns the sweep's source assertion red (plant 2),
and §4 (d) is genuinely falsifiable where the observer cannot reach — plant 13 lights the segments
from CSS and (d) goes red naming all four. So the division is correct by construction rather than
by luck: **source truth is asserted in the sweep, rendered truth in the shell**, and a defect in
either is caught by exactly one of them. No gap; stated so it is not rediscovered as one.

**6 — the live motion inventory, counted on the built page.** PASS, and counted independently
rather than read off the sweep's own check: a walk of **all 396 elements** plus every `::before`
and `::after`, reading `animation-name`, iteration count and transition duration.

- **7 looping animation instances across exactly 3 seats** — `pulse-ring` ×4 and `pulse-core` ×2
  (the header status dot and §2's terminal `LIVE` dot: **one motif, two seats**), `cursor-blink` ×1
  (§6's curl cursor). `document.getAnimations()` at rest agrees: 7.
- **0 finite keyframe animations declared** anywhere.
- count-up: 8 cells, JS, gated, one-shot per load — ambient element 2.
- **The indicator: 5 elements, 0 of them carrying any animation or any non-zero transition.** It is
  a repaint, not a member of the budget.

Against A-007's budget — *"exactly two live motion elements — the pulse motif and the readout
count-up — plus the curl cursor; a third is a deviation"* — **the built page is the budget
exactly**, and the indicator did not enter it silently. §2's reveal stays outside the budget as
A-007 provides for: a one-shot chain that ends, and the census finds zero finite keyframe
animations declared anywhere.

**7 — §2 playback untouched.** PASS. Fidelity byte-clean: **12/12 rendered log lines identical to
the corpus**, 679 characters, codepoints matching, and byte-clean again at all five phone widths;
10/10 narration slots verbatim. The corpus itself is unmodified — **2 commits ever touched it, both
the founder's, working tree clean** (`025842c`). Chain timing green: a real 48-second playback
reveals all twelve lines within **16.7 ms worst drift** of spec §5.1, the beat indicator walks all
six beats, and the chain holds the same timing on the windowed phone layout.

**8 — cross-engine, labelled per engine.**

- **Blink** — `verify-shell.mjs` 295/295 and the sweep 43/43 carry every measurement assertion:
  masthead ratio and scale, indicator (a)–(f), footer composition, §5's column, §3's hook.
- **WebKit** — 27/27, plus four surface renders I generated and looked at
  (`tests/artifacts/regate-webkit-{head,s04,foot,s05}.png`, 1280 dark, via
  `samples/re-gate-renders/render-webkit-surfaces.mjs`). The masthead reads as a masthead with the
  pennant on the wordmark's baseline; §4's four segments sit rail → rail-end with **segment 1 lit
  and the other three at hairline**; the footer composes as four blocks under its boundary
  separator, one sentence at lead scale, six receipts at micro, contact last; and **§5's three
  lines hold one column edge with the bold line among them** — the `64ch` defect HO-040 found,
  confirmed fixed in the engine that did not measure it.
- **Scoped honestly**: WebKit's pennant scan was re-based this round from a 6×9 size match to a 2:3
  silhouette match, which is right for identifying the mark at two seats — but it means **masthead
  *scale* is asserted in Blink only**. Plant 7 confirms Blink catches a shrunk masthead; WebKit
  would not. Not a defect, and not a claim I will let stand as cross-engine when it is one engine.

**Nothing re-points to PM.** Every acceptance criterion passes; the queue advances to the re-gate
review step as planned.

**Two items for PM, neither blocking this round:**
1. **VERIFY's provisional pin** (criterion 3) — the pinned copy predates the section that explains
   the pin. HO-040 asks for the same ruling.
2. **`muster-requests-lint.sh` is red before this entry** — active sections at 365 lines against a
   300 budget, closed handoffs accumulating. Reconciliation is PM's at the review step.

**Revision log:**
- 2026-07-31: Filed. Self-review caught three things. (1) The forward-promise matcher returned zero
  hits for every word — an escaping bug, found by self-testing it against a word I knew was present,
  and the corrected matcher now self-tests before reporting. This is the blind-by-construction class
  this project has been caught by before; it nearly reached a handoff as a pass. (2) Plants 3 and 5
  were first pointed at the sweep, which does not own those two assertions, and read as 0 FAIL; both
  were re-run against `verify-shell.mjs`, which owns them, and both go red. A plant that fails to go
  red is a claim about the wrong runner until the runner is checked. (3) My first §2 fidelity check
  matched only the 9 plainly-classed `log__line` elements and missed the 3 carrying a modifier —
  the audit's 12/12 is the authoritative figure and is quoted as such rather than my narrower count.
  No shipped file touched: 13 plants applied and reverted, `git status` clean on `index.html`,
  `styles/`, `scripts/` at close. Durability: F-R IDs and plant detail stay in this ledger; nothing
  entered a durable spec.

---

### 2026-07-30 HO-040 — Re-gate build: the rulings ship, and the receipts stop pointing at a moving target
**Type:** handoff
**Producer:** developer
**Deliverable:** `index.html`, `styles/sections.css`, `styles/chrome.css`, new
`scripts/sheet-indicator.js`, `VERIFY.md`; amended `tests/verify-shell.mjs`,
`tests/verify-webkit.mjs`, `tests/qa-fullpage-sweep.mjs`; the SHA selections recorded in
`footer-copy.md` §3 and `section-01-hero.md`.
**Status:** in-review
**Reviewers:**
- [x] QA — reviewed at HO-041: all three runners re-run cold on the shipped tree and every figure
  reproduces (295/295 + 27/27, 108/108, 43/43); the four SHAs verified as objects and as paths at
  their own commits; thirteen violations planted independently and each new assertion watched to
  fail. No revision requested. Two items carried to PM: VERIFY's provisional pin, and the
  source-vs-rendered split the indicator's assertions rely on (see HO-041, plant 11).
- [ ] PM — pending (re-gate review step)

**All three runners green, both engines, run here on the shipped tree**: `scripts/test.sh` GREEN
(295/295 Blink + 27/27 WebKit), audit exit 0 at 108/108, sweep exit 0 at **43/43** — one more
than it carried, and the extra check is the one the plants forced into existence (below).

**What shipped, finding by finding.**

- **F-R4 — the provenance word.** `real`, byte-equal to the founder's resolved string. The last
  `production iOS app` in a shipped file is gone.
- **F-R2 — §3's hook.** `context engineering` at 700, ink, once, at the paragraph's own size.
- **F-R6 — §6's lead.** HO-038's 30-word line, and the harness now reads it off
  `section-06-copy.md` instead of holding a retyped copy: a claim about model-agnostic
  correctness should be checked against the file that owns it.
- **F-R5 — §5's primary.** Shipped, and the build **found a defect in the obvious form of it**:
  `--read-max` is `64ch`, and `ch` is the advance of the element's own "0". Weighting the `<p>`
  itself resolves its 64ch **8.7% wider** than its neighbours' (744.81px against 685.31px,
  measured) — the three-line block goes ragged and §5's own column check went red. The emphasis
  therefore rides on a `<b>` spanning the sentence, which is the shell's own in-passage
  emphasis route; the paragraph's font, and so the column, is untouched. The assertion reads the
  weight a READER sees and additionally requires the run to cover the whole claim, so a phrase-level
  hook cannot pass as a primary.
- **F-R3 — the indicator.** Four segments, rail → rail-end, 2px, one lit, zero motion, native
  scrollbar retired. The observer (`scripts/sheet-indicator.js`) reads no scroll position and
  writes none — it keeps a per-sheet visibility table from an `IntersectionObserver` rooted on
  the track and toggles one class, so the shell's no-script-touches-scroll assertion holds as
  written. Segment count comes from the DOM at every seam: the markup, the script, and all six
  assertions.
- **F-R7 — the masthead.** 18px word, mark derived at 0.5em × 0.75em, `--bar-h` unmoved. The
  harness asserts the RATIO, not the pixels — re-sizing the masthead is one CSS edit and no test
  edit. Separator pennants keep 6 × 9, bound to the rule's own end tick.
- **F-R9 — the footer.** One sentence at lead scale, boundary separator replacing the plain top
  border, receipts at micro, contact last, four blocks on the rail.
- **DEC-058's amendments** were already applied upstream (`footer-copy.md` §3's
  lowercase-labels sentence at HO-038, `section-01-hero.md`'s chip clause at HO-039). Verified,
  not re-applied.

**F-R10 — the four SHAs, and why each one.** `git log` was walked per file and the states
measured, not eyeballed:

| Link | SHA | Why this commit is the demo |
|---|---|---|
| `queue` | `9b26788` | **16 steps queued** ahead of the run, 786 lines — the audited Sprint-2 plan at its fullest. The currently-pinned `392ee05` was the planning commit at 14 steps; this is two steps richer and three hardening passes later. |
| `handoffs` | `bded0dd` | **11 entries filed and open at once**, and **both entry types on one screen** — three inter-agent requests and eight handoffs awaiting review. `5fc6a31` is 80 lines longer but carries 8 entries, all one type; the protocol is better demonstrated than described. |
| `decision log` | `b41ed56` | Current depth, per the founder's own note that this file's demo is now. |
| `VERIFY` | `14bceef` | The last frozen state. **Flagged, not silently accepted**: the founder's criterion for this one is *the launch state*, which does not exist yet. See the caveat below. |

**Two caveats, both stated rather than buried.**

1. **Reachability.** These SHAs live on the sprint branch. They reach the public repo only if the
   final merge preserves history — **a squash merge 404s all four links.** Recorded beside the
   table in `footer-copy.md` §3 so the constraint travels with the URLs. PM carries the
   post-push verification to `pre-launch-checklist.md`.
2. **VERIFY is provisional.** Pinning it now freezes it before the state its criterion names, and
   the pinned copy predates the live-file section this round added to `VERIFY.md`. It must be
   re-pointed at the launch commit. The §1 chip follows the same string by ruling
   (`section-01-hero.md`), so **both move together** — one edit, two seats, and the harness fails
   if only one of them moves.

`VERIFY.md` gained the live-file links the ruling asked for, with one line on why the two forms
differ: the pinned link is the receipt, the live one is the running file, and the diff between
them is the build since.

**Six violations planted and watched, tree reverted clean.** Five went red on exactly the check
that owns them: the masthead shrunk to label scale (*"separator 6×9 ... masthead 6×9"* — the
punctuation-scale check caught it, not the ratio check, which is correct), a 3px segment
(*"segments 3px against the mechanism mark's 2px"*), the footer's plain border restored
(*"footer border-top 1px"*), §5's emphasis narrowed to a phrase (*"1 run"* against the whole
line), and §3's hook unbolded.

**The sixth found a real gap and is the most useful thing in this handoff.** Removing
`is-active` from the shipped markup broke **nothing** — the observer restores it within a frame of
load, so every rendered check passed on a page that shipped four dead segments. That is exactly
wrong for the reader with JavaScript off, which the spec promises to serve. The sweep now asserts
the guarantee **in the source and only in the source** (`the indicator ships segment 1 lit in the
markup`), and it was proven red on that same plant before the revert.

**Cross-engine, per surface.** WebKit renders of §4, the footer, §5 and the header at 1280 dark
(`tests/artifacts/regate-webkit-*.png` — the harness's own ignored artifact directory, so these
are regenerated rather than committed; `samples/re-gate-renders/render-webkit-surfaces.mjs`
reproduces them, Quick Look route): the masthead reads as a masthead, the
indicator's four segments sit rail → rail-end with segment 1 lit, the footer's separator and its
four blocks compose as specced, and §5's three lines hold **one column edge** with the bold line
among them — the defect above, confirmed fixed in the engine that did not measure it. The WebKit
pennant scan was re-based from a 6×9 size match to a **2:3 silhouette** match, so it identifies
the mark by shape and covers both seats.

**Revision log:**
- 2026-07-30: Filed. Self-review caught three things. (1) The first draft weighted §5's `<p>`
  directly — the column defect above; found by the harness, not by reading. (2) The §6 lead was
  initially re-based by retyping the new string into `verify-shell.mjs`; changed to parse
  `section-06-copy.md`, since a hardcoded copy of a claim is a copy that can drift with the build
  that changes it. (3) The footer separator shipped with `aria-hidden` on the wrapper only; the
  independent audit failed it, and the markup now mirrors the section rules per-element rather
  than the audit being loosened. Open question for PM, not blocking: VERIFY's pin (caveat 2).
  Durability: F-R IDs and SHA rationale stay in this ledger and in the code comments that explain
  the construction; no finding ID entered a durable spec.

---

### 2026-07-30 HO-039 — Re-gate design round: the masthead, the indicator, two hierarchies, the footer, and the §2 consult
**Type:** handoff
**Producer:** ui-ux
**Deliverable:** `knowledge-base/design-specs/web/brand-seats.md` (F-R7), `page-shell.md` (F-R2's
emphasis rule, motif/status-bar/footer-alignment amendments), `section-04-decisions.md` (F-R3),
`section-05-shipped.md` — new (F-R5), `footer-layout.md` — new (F-R9), `section-01-hero.md`
(DEC-058's chip amendment, landed with the round), the F-R1 options memo below, and DEC-060.
Candidate sample `samples/re-gate-proposed.html` with renders + measurement JSONs in
`samples/re-gate-renders/` (samples never ship).
**Status:** in-review
**Reviewers:**
- [ ] PM — pending (re-gate review step)
- Developer consumes every ruling at HO-040 (F-R1 excluded — consult only, nothing builds)

**Every ruling was chosen from renders, per the step's standard and the founder's instruction.**
Skill files read before ruling: `web-iconography-and-visual-language.md` (brand mark vs functional
icon; design-twice-for-dark-mode; never auto-invert), `web-content-hierarchy.md` (the four levers;
two weights at one size = hierarchy, three = noise), `web-marketing-and-conversion-pages.md`
(footer as load-bearing signature), `plan-first-discipline.md`. Candidates were rendered in the
page's real tokens (the sample links the shipped `styles/`), dark and light, **WebKit and Blink**
(Blink via the harness's CDP renderer at 2×; WebKit via the audit's Quick Look route — lockups,
segments, §5 and footer zones all rendered in both engines, identical).

**F-R7 — the header lockup becomes a real logo; the instrument was genuinely open and the renders
closed it.** Five candidates: the shipped 12px baseline, clip-path at 16px and 18px, the founder's
cream glyph as a data-URI `<img>`, and the house tile as a data-URI `<img>`. **Ships: clip-path at
18px word / 9 × 13.5 mark** — reads as a masthead, notch legible at a glance. The `<img>` route
lost on measurement, not on the inherited ruling: the cream glyph composites at **~1.08:1 on the
light ground — invisible** (the light render shows it gone), and a single image asset cannot
follow the theme tokens, where the clip-path box paints `--accent` in both themes with no second
asset (the skill's design-twice rule satisfied by tokens rather than assets). The tile reads as an
app-icon badge in the chrome. **Cascade clause, measured: `--bar-h` does not change — the bar
renders 48px with the 18px lockup, brand block ~25px, so the hero fold arithmetic (144 = 48 + 96),
§2's phone visibility budget and `--scroll-pad` all stand. One line: nothing derived from the bar
moves.** Separators keep 6 × 9; the footer boundary gains its separator mark (rule construction
minus the tag, replacing the footer's plain top border — one boundary, one rule); the footer
lockup stays out (`brand-seats.md` §8 — a separator is punctuation, not a second masthead).

**F-R3 — the §4 indicator: four segments, aligned by construction, discrete by design.** Two
candidates rendered at rest and mid-track: a continuous rail-and-thumb gauge, and one segment per
sheet. **Segments ship**: the continuous thumb reads as a loading bar and needs continuous scroll
tracking; the segments are the `SHEET n OF 4` grammar at a glance, honest about the track's four
rest states, and aligned because the row spans rail → rail-end — the same edges the resting sheet
composes to, which kills the misalignment the founder judged. 2px tall (the mechanism mark's own
stroke, bound in the assertion), active `--accent` (4.19/4.35 ≥ 3:1 graphical), inactive `--hair`
with extent always carried in the ordinals' text. State moves by IntersectionObserver class
toggle — **no transition, no animation (asserted both paths), no scroll-position read or write**,
so the motion budget stays closed and the shell's no-script-touches-scroll assertion holds as
written. Native scrollbar retired (`scrollbar-width: none`). Spec: `section-04-decisions.md` §8.1,
§12.19 (six clauses, each a relationship).

**F-R2 — ink bold, and the measurement did the ruling.** Rust is dead at 4.19/4.35 vs the 4.5
floor (the founder's own answer). Rendered plain vs ink-bold: bold on *context engineering* gives
the skimmer's eye the hook without a new voice — 700, the page's existing weight pair, no third
weight (the hierarchy skill's two-weights rule). The accent-mark idiom was declined without a
render: a rust tick is instrument-row grammar; in running prose it is furniture. Recorded as the
shell's in-passage emphasis rule (`page-shell.md` §3).

**F-R5 — §5's primary is the provenance line, at body weight 700.** Both treatments rendered:
lead-scale bold dominates the section and dresses founder testimony as a heading — rejected; bold
at body size reads as the strongest sentence in a passage, the same grammar as §4's bolded titles.
New `section-05-shipped.md` carries the ruling and two relationship assertions (one primary line;
emphasis is weight alone). **Flag for Content (one line, your file):** `section-05-copy.md`'s
header note "§5 has no separate design spec" is superseded by `section-05-shipped.md`.

**F-R9 — the footer is four blocks, and the sentence ships at lead scale.** Candidate A confirmed
from renders (the recommendation and the render judgment agree): team truth first, "solo" beside
"AI team", 33 words in one breath — B's name run reads as a recital, C leads the page's last line
with the human. Rendered at body vs lead: body reads as fine print; **lead reads as the page's
last deliberate sentence** — the signature the finding asked for. Composition in new
`footer-layout.md`: boundary separator (F-R7), sentence at `--text-lead`, receipts at micro,
contact link last, all on the rail, four assertions.

**Would Apple ship this? — yes.** The masthead is one silhouette at three scales rather than a
new asset; the indicator is the paging model made visible with two colours and zero motion; both
hierarchies spend exactly one lever (weight, then scale); the footer closes the page in the same
voice it opens with. Every choice is the removal of a weaker alternative that was actually
rendered, which is the simpler-not-more-chrome test passing.

**PM cascade flag**: `brand-guidelines.md` §4 (PM-owned) still records punctuation-scale-everywhere
and no footer-boundary mark; DEC-060's Impact field carries the reconciliation.

---

**F-R1 — the §2 overnight-wave consult (memo only; founder picks at the final gate; nothing
builds this round).**

The fact: this build's own waves ran while the founder slept, evidenced by night-stamped commits
in the public repo. The constraints every option must clear: §2 is **BODH-wave scope** and THIS
SITE material must not blend into it (A-005 — the page's likeliest factual failure); **R2 bans
wall-clock framing**, so "22:45 → 05:40" may not ship — the claimable form is the mechanism
sentence ("the run doesn't need the operator present; gates are the only places it waits"),
which **already ships in §4 decision 4** (the Gate B round put it there); THIS SITE metrics stay
dashes until the founder supplies a snapshot (DEC-005). §2 is also the page's most expensive
surface: three Sprint-1 fix rounds live in its playback timing, corpus fidelity byte-checks, the
§9.1 12px equality invariant and the §7.1 phone visibility budget.

**Option 1 — the founder's shape, now: §2 restructured toward §4's idiom, one card holding the
two layers, overnight material in the freed room.**
*Pros*: the most visible seat on the page; the card idiom is proven; one card is less chrome than
two. *Cons*: R2 strips the seat to the mechanism sentence the page already ships, so the rebuild
buys a duplicate; with THIS SITE dashed until launch, the seat is a claim beside dashes — a claim
without its receipt, on the page that argues receipts. *Scope safety*: THIS SITE material inside
the BODH-wave section survives only as a hard-labelled separate block — A-005's adjacency risk
made permanent. *Blast radius — the largest on the page*: §2 layout + playback machinery re-based
(48 s chain timing, fidelity byte-checks, the 12px invariant, the phone visibility budget and its
3-entries-at-375 guarantee), Content narration rewrite, Developer re-assert, QA scoped re-run,
cross-engine on the whole section — **and the founder's phone playback check, the hard launch
blocker, is spent and must be re-spent on the rebuilt section.**

**Option 2 — a scope-labelled overnight line inside §2, no restructure** (the F-R8 audit reserved
sp8's totals clause as §2's one reclaimable seat if room is needed).
*Pros*: visible near the replay's close; the smallest §2-resident form; the seat is already
priced. *Cons*: R2 still reduces it to the mechanism sentence — a duplicate of §4 decision 4 a
scroll apart; two scope labels a few lines apart is A-005's failure mode standing on the page.
*Blast radius — medium*: §2's strip layout + its assertions, Content string, QA scoped re-run;
narration re-timing only if sp8's clause is cut.

**Option 3 — recommended: the wave becomes visible when it can be shown rather than said.** Today
the fact ships in its only claimable form (§4 decision 4 — mechanism, no wall-clock), and the
night-stamped commits are one click away through the receipts row. At launch the founder's meter
supplies the THIS SITE snapshot DEC-005 already anticipates — and §2 then takes **the founder's
own card shape as a wave rack**: the BODH wave card and a THIS SITE wave card, each scope-labelled
by construction (per-card labels are A-005-safe where in-section adjacency is not), the overnight
wave rendered as a real replay/summary card whose numbers exist. *Pros*: scope-safe by
construction; the impressive thing arrives with its receipt instead of ahead of it; §2's rebuild
is spent once, on real material, priced then. *Cons*: nothing new is visible this sprint; depends
on the launch snapshot arriving. *Blast radius now*: **zero.**

**Option 4 — amplify the existing seat only**: leave the fact in §4 decision 4 and do nothing
else. *Pros*: zero cost, already true. *Cons*: does not answer "visible" — sheet 4 of a paged
track is the least visible seat on the page.

**Recommendation: Option 3.** Options 1 and 2 each pay §2's machinery to display a sentence R2
only lets the page whisper, and both park a scope hazard in the section built to be trusted. The
overnight wave is the page's best future exhibit — it deserves its receipt, and the receipt
arrives at launch.

---

**Revision log:**
- 2026-07-30: Filed. All render evidence in `samples/re-gate-renders/` (crops at 2×, both
  themes, both engines; measurement JSONs `shipped-report.json` + `cand-report.json` — bar height
  48px confirmed at every lockup candidate, gauge/segment geometry, §5 line weights). Self-review
  notes: (1) an earlier draft of the shell's emphasis rule claimed the accent-mark treatment was
  "chosen from renders against" — it was declined on grammar without a render; the sentence now
  says so plainly. (2) The step brief's own words "three phone checks" and the §2 cost history
  were cross-checked against `wave-review.md` and the queue rather than recalled. (3) Cross-refs
  spot-checked: `brand-seats.md` §5 ↔ `footer-layout.md` §1, `page-shell.md` §7.2 ↔
  `footer-layout.md` §4.4, `section-04-decisions.md` §12.19 ↔ §8.1's construction block. (4) No
  shipped file touched — `index.html` and `styles/` changes are HO-040's; the two new spec files
  and five amended ones are the deliverable. (5) Durability: findings are cited as founder
  rulings/DEC-060 in durable files; F-R IDs stay in this ledger and the queue.
**Type:** handoff
**Producer:** content
**Deliverable:** `knowledge-base/design-specs/web/section-05-copy.md` (F-R4),
`knowledge-base/design-specs/web/section-06-copy.md` (F-R6),
`knowledge-base/design-specs/web/footer-copy.md` (F-R9 + DEC-058 ruling 1), and the F-R8
repetition-audit memo below
**Status:** in-review
**Reviewers:**
- [x] UI/UX — reviewed at HO-039: the three footer candidates were rendered in the page's real
  tokens and candidate A confirmed from the renders (recommendation and render judgment agree);
  the §6 line is consumed as copy input with no layout consequence beyond the standing lead
  treatment. No revision requested.
- [ ] PM — pending (rules the F-R8 memo at the re-gate review step)

**F-R4 — applied, not re-derived.** The provenance line in `section-05-copy.md` §3.2 is now
byte-equal to the founder's resolved string: *"Muster was extracted mid-build from a real iOS app —
the framework existed as working practice before it existed as a repo."* One word changed
("production" → "real"), every other word identical, 21 words as before; the file states it ships
verbatim thereafter. The remaining "production iOS app" instances are `index.html:370` (HO-040
swaps it) and `samples/gate-b-proposed.html` (a UI/UX sample, not a shipped file — QA's
"production appears nowhere near it" grep should scope to shipped files).

**F-R6 — §6's lead line, drawn from the resolved material only.** Budget restated: **≤ 32 words**
(was ≤ 18; the founder-ruled claim needs a second sentence — two lines at desktop column, three at
phone). Written, **30**: *"One command. No signup, no framework install, no API wiring — markdown
files and Claude Code. The gates are deterministic bash — the framework's correctness doesn't
depend on which model runs it."* Both new clauses are verbatim from the founder's safe-today claim;
present tense; no "(yet)", no roadmap, no "coming soon"; Claude Code stays stated as the
prerequisite in sentence one. Deliberately dropped from the source: "over markdown" (a third
"markdown" within two sentences) and "zero model tokens" (the mechanism clause already carries the
fact). The line strengthens §3's holds-on-cheap-models close rather than repeating it: §3 says the
floor holds, this says why.

**F-R9 — three candidates in `footer-copy.md` §2, recommendation A.**
- **A (recommended, 33 words)**: *"Specced, written, and reviewed by Muster's AI team — 5 of 8
  agents, the other three never invoked, 1 operator — and designed and built by Kanwar Sandhu,
  solo, shipping his own products with it."* Team truth first (the page's audited claim), the
  counts as an em-dash aside, authorship closing as the signature; "solo" lands beside "AI team" —
  the thesis in four words. The role names leave the sentence but stay one click away (the receipts
  row directly beneath) and enumerated in `VERIFY.md`.
- **B (40 words, at the ceiling)**: keeps all eight names in-sentence — auditable without a click,
  but reads as a recital.
- **C (32 words)**: authorship-first — leads the closing line with the human on a page whose thesis
  is what the AI team shipped.
Ceiling set at ≤ 40: the split form ran 44 (30 + 14); a merge at or past that has not earned the
merge. UI/UX rules from renders per the taste-call standard. **VERIFY.md consistency checked under
all three candidates**: its "Who built this" names the five and the three and says "the footer
states the participation" — counts agree, no contradiction, no edit needed; with the names out of
the footer, VERIFY.md's enumeration becomes the on-record naming, which is the right place for it.

**DEC-058 ruling 1 — landed upstream.** `footer-copy.md` §3's lowercase-labels sentence now states
it is a source-string convention and that the rendered row uppercases by the page's shared
mono-label transform. Also recorded in §3: F-R10's permalink ruling (the four artifact links pin to
founder-criterion SHAs; `repo` and `framework` stay), so the copy file and HO-040's build cannot
drift.

---

**F-R8 — repetition-audit memo (recommendations only; nothing applied; PM rules).**
Scope: rendered visible strings in `index.html`, including aria-hidden decorative text; exact
phrases or labelled values appearing 2+ times; single common words excluded; HTML comments and
`<title>`/meta noted but out of scope (not on the page).

| # | Repeated string | Instances | Verdict |
|---|---|---|---|
| 1 | The `curl` command | §1 close · §6 CTA | **Earns both.** Deliberate bookend; harness asserts byte-equality. |
| 2 | The wave totals (`64 min · 289 API calls · $24.73`) | §2 sp8 narration · §2 totals strip | **The page's one true content repetition** — same three figures twice, a few lines apart. Each earns differently today: sp8 is the playback's spoken close, the strip is static scope-labelled evidence readable without playback. **Keep — but this is §2's one reclaimable seat**: if F-R1's overnight-wave option needs room, cut sp8's totals clause (the strip already carries all three figures + scope label; sp8 would end at the Apple-gate fact). Returns ~14 narration words and one timed beat's reading load. Blast radius: §2 fidelity/timing assertions re-base — Content rewrite + Developer re-assert; not free. |
| 3 | Page attribution (AI team built this page) | §5 line 3 · footer sentence | **Keep both.** Different jobs: §5 seats the page in the shipped list and ties the dashed card to the meter; the footer carries the measured count. R8 requires the AI qualifier in both seats. The F-R9 merge already returns 11 words from the footer half. |
| 4 | THIS SITE readout (dashes) | §1 remnant · §5 card 2 | **Earns.** DEC-046's designed pair: remnant is the smallest honest form; §5 owns the full card beside the BODH contrast. |
| 5 | `measured at launch` + `THIS SITE · SPEC → LIVE` | ×2 each | **Required.** Each instance labels its own dash cluster; a dash without its label is punctuation (R4, A-005). |
| 6 | Readout keys (`ACTIVE BUILD`, `COST · API LIST`) | ×3 each | **Earns.** Identical keys are the cross-scope comparison mechanism — the columns read key-for-key. |
| 7 | §2 layer pairs (`bodh.day · LIVE`/sp8, `zero bugs`, `11/11`) | log line + narration | **By construction.** Terminal-vs-narration is the section's two-voice design; the narration narrates the log. |
| 8 | Narration slot tags (`THREE HANDOFFS` ×3, `THE HUMAN GATE` ×2 + beat indicator) | §2 | **Earns.** Grouping labels, aria-hidden; they tell the reader which beat a card belongs to. |
| 9 | `SHEET n OF 4` frame | ×4 | **Earns.** Ordinal grammar is the paging channel; values differ, the frame repeats. |
| 10 | `Claude Code` | eyebrow · §3 · §6 (+2 metadata) | **Earns.** Badge, argument subject, prerequisite — three jobs; the platform's name has no pronoun. Guard applied this round: the §6 redraw dropped "over markdown" so "markdown files" stays at ×2 (§3 mechanism, §6 prerequisite). |
| 11 | `1 operator` | §1 caption · footer | **Earns.** Roster label vs participation — the scope split is deliberate (R8). |
| 12 | `Muster` | ×7 prose + wordmark + §5 heading | **Tolerable.** Density peaks in §5 (heading + two lines), but each sentence needs its subject and pronouns would blur the two authorship scopes §5 must keep apart. |

**Memo conclusion**: the page's repetition is almost entirely load-bearing idiom — scope labels,
readout keys, §2's two-layer design, ordinals. One true content repetition (#2) and one attribution
overlap (#3), both judged earning their seats. The only space worth reclaiming is sp8's totals
clause, and only if F-R1 needs the room in §2. No cut is recommended on repetition grounds alone.

**Revision log:**
- 2026-07-30: Filed. Self-review caught two things fixed before filing: the footer source table
  briefly carried a "while/—" hedge instead of stating that the founder's DEC-059 phrasing (no
  "while") governs the merged authorship clause; and `section-05-copy.md` §1 still said the
  provenance line is preserved "as the seed supplies it" — now "as the founder supplies it," since
  he amended his own seed word at the gate. All five stated word counts script-measured (21 / 30 /
  33 / 40 / 32); the provenance string diffed byte-equal against the founder's resolved string in
  `wave-review.md`. No shipped file touched — `index.html` changes are HO-040's.
- 2026-07-30: All three runners run after the amendments: `scripts/test.sh` **280/282 with exactly
  two designed reds** — "§5 ships the three prose lines verbatim" (page still says "production";
  HO-040 swaps it) and "the footer ships the team line and the authorship line, byte-equal to the
  deliverable" (page still ships the split form; HO-040 builds the ruled sentence). Both reds are
  the copy files leading the build, the same designed-red pattern as the Gate B fix round. Audit
  **exit 0, 108/108**; sweep **exit 0, 42/42**.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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

- 2026-07-29 — HO-029 (Developer): **accepted, no revision.** Scroll-snap is four declarations entirely
  in the user agent, with "no script touches the page's scroll position" asserted against the shipped
  source rather than stated. PM re-ran the suite (273/273 + 27/27) and independently planted §2's
  exemption away to confirm the exemption check is genuinely falsifiable — it is. The two harness defects
  the step found on its own are the substance of the handoff: a §2 sweep that compared a number against
  itself and therefore could not fail, and a gate check that had stopped creating the condition it
  asserted. Both are the failure class this sprint exists to catch, and both were found by the author of
  the code they check. OBS-013 is ruled with OBS-009 as one ruling — see DEC-053; the spec amendment
  lands in the fix round, and the build is correct as shipped.

- 2026-07-29 — HO-028 (Developer): **accepted, no revision.** §5 is the page's one home for the
  whole-product numbers, and every figure is diffed against the founder-authored seed's Measured data
  table, not merely against the copy file that transcribes it — so a drift in transcription is caught
  rather than blessed. `9.3 h`, `4.8 h`, `4` and `$147` each asserted to appear exactly once on the page
  with the carrying section named. **DEC-052's live-region posture is the right call and is verified the
  hard way** — 100 visible states against one announced, read from the AX tree mid-roll against real page
  cells, with the two checks shown independent by removing the shroud. The self-caught defect (an
  unmeasured rule keyed on a CSS class, so a rust-painted dash passed the audit) is exactly the
  content-versus-presentation trap, found and re-planted. OBS-011 and OBS-012 both ruled — see DEC-054.

- 2026-07-29 — HO-027 (Developer): **accepted, no revision.** §3 reads as one passage with zero numerals
  asserted, and its kicker wrap is asserted as a rule rather than a line count, which is DEC-032 applied
  without being asked. §4 ships DEC-044's four decisions verbatim and in order on the Gate A treatment —
  **PM re-derived the word counts independently (row bodies 44/42/44/44 against the ≤45 ceiling, titles
  10/9/11/9 against ≤12) and they reproduce exactly** — in HO-032's paged track, with the 360.0px peek
  and the one-screen budget measured off live elements. DEC-043's guardrail holds under inspection: all
  four trade-offs are genuine losses (no direct agent conversation · floors that cannot flex · history
  lost from view · no mid-run steering), not costless humility. Nothing was inflated away. The latent
  crash the step found in the Blink contrast probe — a `find()` returning `undefined` once the last
  placeholder left — would have taken out the harness rather than failed it.

- 2026-07-28 — HO-026 (Developer): **accepted, no revision.** §1 is the sparse hero and nothing more:
  PM checked the section's whole above-fold inventory against DEC-045/046 element by element — eyebrow,
  headline, formation, and no Bodh material, no `<ol>`, no terminal — and confirmed it in the 375×553
  render, where the hub and four whole plates sit above the fold with plate 5 cut as the designed scroll
  cue. The `http(s)` guard was **narrowed, not deleted**, per DEC-034, and PM re-proved it by planting a
  fetching `<img src="https://…">`: four checks red naming `index.html:131 img[src]`, with the permitted
  §6 anchor still permitted. `VERIFY.md` closes a hard launch blocker and passes its judgment review —
  three scopes stated separately, THIS SITE dashed, no cross-scope aggregate, cost framed as list price
  to replicate. Its self-caught roster-scope slip is the same defect the seed's footer line still
  carries, which is now a Gate B item. OBS-007 routed to the fix round; OBS-008 closed — §5's two
  `.instrument` cards keep that probe's subject.
