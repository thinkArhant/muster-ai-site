# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-29 HO-034 — Gate B fix round: footer strings, §4's two amended rows, the overnight call
**Type:** handoff
**Producer:** content
**Deliverable:** `knowledge-base/design-specs/web/footer-copy.md` (new) · amended
`knowledge-base/design-specs/web/section-04-copy.md` · `VERIFY.md` consistency edit · two
verdict-routed prose fixes (`section-05-copy.md`, `section-06-copy.md`)
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**What ships, per finding:**

- **Footer (F-B6 + founder answers, DEC-056)**: `footer-copy.md` carries every string and every URL.
  The team line keeps the seed's construction, amended to the measured truth: *"Specced, written,
  and reviewed by Muster's AI team — 5 of 8 agents, 1 operator. PM, Developer, UI/UX, QA, and
  Content ran this build; Marketing, Legal, and Research were never invoked."* (30 words, ≤35
  ceiling). Naming the three that did not run is deliberate: it makes the count auditable role by
  role against the receipts row one line below, and candor about limits is the brand. The
  authorship line is seed-verbatim (14 words); **no email string exists anywhere in the file** —
  the GitHub profile link (`github.com/thinkArhant`) is the contact path. Six receipt links with
  exact founder-supplied URLs, all stated as strings, nothing fetched (R12); the VERIFY blob URL is
  byte-equal to the chip target HO-036 builds.
- **F-B4**: decision 1's trade-off row is now *"Questions between roles travel as files — written,
  routed, auditable — and each costs a session."* The mechanism is stated, not denied; the cost
  survives (each exchange spends a session). 14 words; sheet total **44** of 45, per-row
  12/11/14/7 — script-recounted under the file's stated convention.
- **F-B5 — ruled IN, in decision 4's mechanism row**: *"The run doesn't need me present — it waits
  only at gates, for a written verdict."* Why: decision 4's subject is attention, and
  operator-absence is that decision's payoff stated as mechanism — near-verbatim the founder's own
  claimable form (DEC-056), no "overnight," no hour span, no wall-clock anywhere (R2). The room was
  paid inside the sheet (problem/trade-off trims recorded in the file's §6); sheet total **44** of
  45, per-row 9/10/10/15. The dropped curation corollary ("gates carry *only* the judgment calls")
  is named in §6 so the cut is visible.
- **VERIFY.md** now states the five-role participation in the same terms as the footer line, and
  keeps the roster-not-participation qualifier phrase the sweep asserts on.
- **Verdict-routed prose fixes (Content-owned per the Gate B packet)**: `section-05-copy.md` §6's
  R4 line now says four em-dashes (OBS-011 of HO-028); `section-06-copy.md`'s aside now matches
  §1's ruled one-element interactive inventory (OBS-007 of HO-026).

**Verification**: copy-rules matrix run on every touched file (verification statements updated
in-file; banned-word/email/fictional-host greps clean). Full-page sweep re-run: **42/42, exit 0**.
`scripts/test.sh`: **272/273 — one red, by design**: "§4 ships exactly the four decisions …
verbatim" fails because the copy file now leads the page; HO-036 swaps the §4 strings and re-bases.
Same spec-ahead-of-build state the previous fix round shipped in.

**For HO-035 (UI/UX)**: `section-04-decisions.md:313`'s layout sketch still shows the old
trade-off string ("Agents never talk …") — that file is yours and this round amends it anyway.
The footer now exists as copy; it inherits your F-B1 alignment ruling.

**Revision log:**
- 2026-07-29: Self-review caught that the first VERIFY.md rewording would have broken
  `qa-fullpage-sweep.mjs`'s string-asserted roster qualifier; rephrased to keep the asserted
  phrase while adding the footer pointer, sweep re-run green.

### 2026-07-29 HO-035 — Gate B fix round: the alignment system, snap removed, §4's affordance rebuilt
**Type:** handoff
**Producer:** ui-ux
**Deliverable:** amended `knowledge-base/design-specs/web/page-shell.md` (§7.1 rewritten, §7.2 new)
· `section-01-hero.md` (§6.1, §9, §13.7, §15) · `section-04-decisions.md` (§3, §5, §6.2, §8.1,
§10, §12, §13, §14) · DEC-057 · rendered decision records `samples/gate-b-proposed.html` +
`samples/gate-b-renders/` (before/after PNGs + measurement JSONs — never ship)
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Every ruling was measured on the real page at 375 and 1280 (plus 1440/1600/320) before it was
written, and re-measured on a rendered proposed state.** `before-report.json` /
`after-report.json` carry the numbers; the PNGs show each state under test.

- **F-B1 — one system: two edges and one axis** (`page-shell.md` §7.2). The founder's finding
  reproduced exactly: every measured block on the page hangs on the rail (left 128 at 1280, 208
  at 1440 — eyebrow, h1, caption, remnant, curl, §2 layers, §3, §5 cards, §6, tags, footer inner)
  except the formation, whose intrinsic width (676.4px) put its hub on an orphan axis — 546.2
  against the 720 shared by the headline block and THIS SITE strip at 1440. Ruling: **the
  formation spans the container** (bus = plate row = container content width, plates
  space-between) so the hub's center IS the page's axis — measured delta **0.0px at
  1280/1440/1600** (`after-hero-*.png`). Exactly one axis-bound element may exist, and only
  because its parent's edges are the rail and rail-end. Phone unchanged (ladder is rail-bound).
  Harness rule stated as relationships, never pixels (hero §13.7, shell §7.2).
- **F-B2 — removal wins the binary, on measurement.** Full section paging requires every section
  to fit one snapport; four of six exceed the 553px phone fold (§1 1240 · §2 794.2 · §4 2957 ·
  §5 1776.9) and §5 (1151.5px) exceeds even 700 at desktop — so paging needs `mandatory`
  (unreachable oversized interiors, broken 200% zoom) or scripted scroll (banned and asserted
  against). Removal costs zero content, zero layout. `--scroll-pad` stays. **Every assertion and
  clause dispositioned by name** in §7.1's retirement inventory (A1 inverts, A2/A8/A9 keep,
  A3/A4/A10/A11 re-base, A5 re-scopes, A6/A7 retire, `.section--no-snap` leaves the markup) with
  the harness sites listed (`verify-shell.mjs` ~`:2953`, `qa-fullpage-sweep.mjs` ~`:386–470`).
  DEC-040 amended not deleted; DEC-051's track clause amended in §8.1; DEC-053's two shipped
  checks landed as the amended §7.1 A11 and §12.16 (closing the assignment from the Gate B
  packet). **Scoping stated plainly**: the binary was ruled on section scrolling; §4's track
  keeps its x snap as part of F-B3 (it is what makes the track rest composed instead of parked
  mid-crop). If the founder reads "entirely" as the track too: one declaration, named fallback.
- **F-B3 — three affordance channels in the section's own grammar, and the phone stack gains
  orientation.** The judged cut's anatomy, measured: sheet 2 amputated at the container edge
  with a 128px (1280) / 208px (1440) dead strip of bare ground before the screen edge. Ships:
  (1) **the cut moves to the physical screen edge** — the track's scrollport spans the viewport
  via a token-derived `--track-bleed`; sheet 1 rests on the rail at `scrollLeft` 0, sheet 4
  fully-scrolled rests on the rail-end, document `scrollWidth` stays clean at every measured
  width; (2) **`SHEET n OF 4` ordinal** on each sheet's meta line — real spec-sheet grammar,
  `aria-hidden` (the `<ol>` announces position natively), numerals self-verifying against DOM
  position (§12.18), width-independent; (3) **the gauge** — the track's scrollbar as a thin rust
  rail (`scrollbar-width`/`scrollbar-color`), enhancement-only with degradation named. Zero JS,
  zero new machinery. **Phone re-ruled: stacked stays** — every shrinking alternative measured
  and disqualified in the spec (phone track: 650.8–679.7px sheets vs a 553 fold = two-axis
  navigation; exclusive accordion: hides 12/16 rows from Safari find-in-page, a committed reader
  path and a founder re-gate check, and demands taps DEC-043 bars; un-carding: 6.5% for a broken
  motif). The stack's real defect was anonymity, not height: the ordinal gives extent and
  progress at +28.5px/sheet — **3071px at 375, measured**, against 2957 judged.

**Two traps found by measuring, recorded for the build:** (1) percentage-based bleed fails
silently — padding `%` resolves against the containing block but `scroll-padding` `%` against
the scrollport, and the mismatch let the track's own snap pull sheet 1 to the viewport edge on
first layout (`--track-bleed` is token-derived for exactly this reason, §8.1); (2) the harness
launches Chrome with `--hide-scrollbars`, so **no headless render can ever show the gauge** —
§12.19 asserts computed style, and the visible thumb belongs to the headed cross-engine look.

**Verification:** `scripts/test.sh` re-run on this tree — **272/273, the one red being
HO-034's designed spec-ahead-of-build red** (§4 page fidelity awaits the build's string swap);
no shipped file touched by this handoff. Cross-engine note: the rulings were measured in Blink;
the gauge's WebKit rendering and the phone feel are named for the headed pass the build owes
anyway, and the three deferred phone checks stay at the re-gate.

**Apple-quality bar: would Apple ship this? — Yes.** The full-bleed track cut at the screen
edge is Apple's own carousel construction; the formation on the page's true axis is the symmetry
their hero compositions never miss; the ordinal is quiet document grammar instead of carousel
furniture; and removing the page snap returns scrolling to the platform, which is the most
Apple-like ruling of the three. The one honest hesitation — §4's phone length — is the content's
size, and the alternatives all hide founder testimony; orientation was the premium fix available
without hiding anything.

**For HO-036 (Developer):** the work-list is §7.1's retirement inventory + §12.14/15/18/19's new
assertions (each to be planted red per standing practice) + hero §13.7's amended formation
assertion. The override CSS in `samples/gate-b-proposed.html` is the reference implementation of
all three rulings — derived from the shipped page, byte-identical markup except the meta
line/ordinal and the injected style block.

**Revision log:**
- 2026-07-29: Self-review durability pass stripped finding IDs and handoff IDs from all three
  durable specs (rejected-alternative framing + DEC-057 citations instead). Self-review also
  caught the first bleed prototype's rail miss (sheet 1 at viewport edge) before any spec text
  was written — the scroll-padding percentage trap above; the shipped formula is the corrected,
  re-measured one.

### 2026-07-29 HO-036 — Gate B fix round built: the footer ships, the page stops snapping, §4 pages at the screen edge
**Type:** handoff
**Producer:** developer
**Deliverable:** `index.html` · `styles/base.css`, `styles/chrome.css`, `styles/sections.css` ·
`tests/verify-shell.mjs`, `tests/qa-fullpage-sweep.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**All three runners green on the shipped tree, run here**: `scripts/test.sh` GREEN both engines
(**282/282 + 27/27**), the independent audit exit 0 at **108/108**, the full-page sweep exit 0 at
**42/42**. HO-034's designed spec-ahead-of-build red is closed — §4's strings now match the copy
file. Cross-engine looked at, not assumed: WebKit renders of the formation, §4's track and the
footer (QuickLook) against the Blink fullpage renders; both agree on all three rulings.

**Per finding:**

- **F-B6 + the footer (DEC-054/056)** — the placeholder is gone; the hard launch blocker is
  closed, and the sweep's own placeholder report now reads *"none — the footer carries real
  copy."* Team line and authorship line are byte-equal to `footer-copy.md`, the six receipts carry
  its labels **and** its URLs in order, and the chip's `href` is now the blob URL and is asserted
  **byte-equal to the VERIFY receipt** — the two drift the moment one is edited alone. The
  contact link is the GitHub profile. **No email anywhere in the shipped set**, swept over every
  shipped file rather than over the footer, because an address arriving in a comment or a
  meta-description is what the footer checks would never see.
- **The network guard, re-proven after the href change** — a fetching `<img src="https://…">`
  planted into the footer turned five checks red naming `index.html:484 img[src]`, with all nine
  `<a href>` navigations still permitted. The guard is narrowed, not weakened.
- **F-B1, the alignment system** — the formation spans the container: bus = plate row = container
  content width, plate 1 on the rail, plate 7 on the rail-end, **hub centre − axis = 0.0px** at
  1280. Asserted as those relationships and never as an x. Reverting the diagram to
  `fit-content` reproduces the founder's finding exactly — **delta −173.81px**, the orphan axis.
- **F-B2, snap removed** — every one of §7.1's eleven assertions is dispositioned by name in the
  harness, with the inventory written into the block header so a later reader sees which
  inverted, which re-based and which retired. A1 now asserts the document scroller computes
  `none` (re-introducing snap turns it and the stray sweep red). A3 re-bases to the landing
  readers actually have and answers for **five** sections rather than four. **A11 re-bases to its
  natural form and is the round's real gain**: a start-aligned landing is now exact for *every*
  text leaf in *both* motion states (0 of 132/131/122/130), where it previously held only with
  snapping off — the cost DEC-053 priced is gone rather than absorbed. A6 and A7 retire; the
  `.section--no-snap` class and its comment left the markup with them.
- **F-B3, §4's affordance** — the token-derived `--track-bleed` lands the cut on the physical
  screen edge (**dead strip 0.0px**, against 128px on the judged build), sheet 1 rests on the rail
  at `scrollLeft` 0, the fully-scrolled track rests sheet 4 on the rail-end, and the document
  leaks no page-level x scroll. `SHEET n OF 4` ordinals are `aria-hidden` and **self-verifying** —
  both numerals read from the DOM, never from the spec — and they survive the phone un-track at
  all four widths. The gauge is asserted as declarations. §4's track keeps its x snap as ruled.
- **§4's copy (HO-034)** — decision 1's trade-off and decision 4's problem, trade-off and
  mechanism all swapped; the whole 16-value inventory is compared against the copy file.

**Every new assertion was planted and watched go red** — three batches, tree restored and
verified clean between each: the axis, the ordinal (drifted and re-ordered), the gauge, both
halves of the bleed, the screen-edge cut, the phone no-bleed clause, the footer's four checks, the
email guard, the fetching reference, A1, A2, A3, A4, A5 and A10.

**Three harness defects found by planting, and fixed** — each printed a constant where a
measurement belonged, which is OBS-015's shape:
1. `scroll-snap-stop` printed the literal `"all normal"`, so planting `always` turned the check
   red while its evidence still said every area was normal.
2. The start-aligned landing check reported only one of the two alignments it tests, so a
   centred-alignment failure showed four zeroes and no cause.
3. The ordinal check printed only the ordinal's text, so a re-ordered meta line failed while
   showing four matching strings.

**One real defect the audit caught, not the author** — the new footer's six receipt links and the
contact link missed the 44px coarse-pointer floor (13px and 20px tall). Fixed by joining the
existing `.chip/.control/.link-block` hit-area rule and by lifting the contact link onto its own
line as §6's link is — which is also what stops a 44px tap target overlapping the sentence's other
lines. Audit back to 108/108.

**Two build decisions, stated rather than buried:**
1. **The receipts row renders tracked uppercase**, like every other mono label on the page
   (eyebrow, stencil tags, remnant keys). The source strings are byte-equal to `footer-copy.md`,
   the casing is transform-only, and what a reader copies is the label — the same construction
   §4's labels and stamps already use. The alternative was to fork `--text-micro`'s transform for
   six words; that seemed the worse trade. If Content reads §3's "labels ship lowercase" as a
   *rendering* instruction rather than a source-string one, this is a one-line change.
2. **The two footer sentences are `--text-body` full ink**, not muted micro. A-007 is explicit
   that a paragraph meant to be read is `--ink`, and the scale has no smaller reading size; a
   30-word muted micro sentence would have been a muted paragraph.

**For QA's scoped re-run:** the retirement inventory is in `verify-shell.mjs`'s §7.1 block header,
one line per old assertion. The gauge's visible thumb is observable in **neither** render path on
this machine — headless Chrome runs with `--hide-scrollbars` and QuickLook composites without
scrollbars — so it is asserted as computed style only, and the visible rail belongs to the
founder's headed pass. That limit is HO-035's own and is restated here rather than quietly
inherited.

**Observations for PM:**
- **OBS-016** — `section-01-hero.md` carries two clauses the founder's F-B6 ruling superseded: the
  markup sketch at `:238` and assertion 9 at `:419` both still say the chip's `href` is a
  same-origin relative `VERIFY.md`. The build follows DEC-056 and the harness asserts the blob
  URL; the spec is UI/UX-owned, so this is flagged rather than edited.

**Revision log:**
- 2026-07-29: Self-review caught that the first footer draft put the contact link inline inside
  the authorship sentence, which the independent audit then failed on the 44px floor — the fix
  (own line, §6's pattern) is what shipped, and the audit found it before any handoff was written.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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

- 2026-07-28 — HO-032 (UI/UX): **accepted, no revision.** The sparse hero was recomposed with a real
  design pass on the formation and a fold budget that is rendered rather than derived, every figure
  re-rendered and reproduced before being relied on. §4's one-screen ruling is judged from three
  candidates rendered with the shipping strings, and the two rejected are rejected on measurement
  (2060.6px stacked, 1256.9px at 2×2, against 612.1px paged). The phone cost is stated as a cost rather
  than smoothed. Both observations were DEC-046 cascade gaps in PM-owned files and are now fixed by PM:
  `brand-guidelines.md` §4 and `foundational-assumptions.md` A-007 both carried the retired
  three-live-elements count and the "eight plates" motif row.

- 2026-07-28 — HO-031 (Content): **accepted, no revision.** All four copy files carry the Gate A verdict.
  §1 is the settled headline with zero Bodh material; §3 is the closed 90/90 block byte-exact; §4 is
  re-authored plain from DEC-044's four with every core trade-off intact and the two trimmed corollaries
  named in the file so the cut is visible rather than silent; §5 takes the `$147` cost row. Counts
  re-derived by PM at the §4 build review and reproduced exactly. OBS-001 is answered by HO-032 as a
  design choice (a dash without its key asserts nothing), not an oversight.

- 2026-07-27 — REQ-008 (Developer → PM): **ruled — the audit is repaired in two moves, in the order the
  Developer recommended.** (1) `tests/lib/cdp.mjs`'s `send()` gains a timeout, and it lands in the
  §1-and-§6 build step, which is already amending the harness: a harness that can hang forever cannot
  report, and this converts a silent 20-minute stall into a named red check with a method on it. That is
  worth doing on its own merits regardless of what is causing the spin. (2) The renderer diagnosis — why
  Chrome saturates at 375 × 553 under the injected 250 ms sampler — lands with the QA sweep, which owns
  the audit. Splitting it this way answers the Developer's own objection: the party whose work the audit
  checks fixes the transport, not the assertions. The three downstream steps' criteria are amended to
  match. **PM did not run the audit cold**; the diagnosis is specific and measured (Node at 0% CPU,
  Chrome at ~105%, `send()` with no timeout at `:115–123` — confirmed by reading the file), and
  `scripts/test.sh` is green on the same tree, so no shipped check is unverified — what is missing is the
  cross-check, and that is stated as not-green in the Gate A packet rather than papered over.
  Test-infrastructure quality is PM-alone under the Decision Autonomy Matrix. See DEC-042.

- 2026-07-27 — HO-025 (Developer): **accepted, no revision.** The sample was re-run by PM rather than
  read — `node tools/gate-a-report.mjs` 51/51, exit 0, and all four announced strings match their ruling
  word-exact out of the AX tree. Both of its open items are ruled: (a) candidate B's four lines at 320px
  with a lone `WITH` is a real composition wart and a wrong figure in `section-01-hero.md` §4.1, and it
  goes to the founder at Gate A with the actual line breaks printed rather than a line count — the
  handoff's judgment that it cannot be fixed by widening the break unit is correct and was the reason to
  gate it rather than patch it; (b) `styles/tokens.css`'s pre-amendment `--text-display` floor **lands
  with §1, not now** — no harness asserts the clamp (verified by grep), and landing an unguarded token
  change ahead of the assertion that guards it is the drift this project exists to prevent. The
  self-caught blind check — a per-pane overflow probe that could not fail because `.pane` carried
  `overflow: hidden`, found by planting a 220-character element — is the standard this sprint is trying
  to hold, and it was met without being asked for. The stale `verify-shell.mjs` coordinates it reports
  (`:650` shipped-set glob, `:660` the http(s) check) are confirmed correct and were already carried into
  the §1-and-§6 step. One figure does not reproduce exactly: WebKit ink measured 5.59% against the
  handoff's 5.69% — run-to-run antialiasing, not a defect, noted so a later reader does not chase it.
