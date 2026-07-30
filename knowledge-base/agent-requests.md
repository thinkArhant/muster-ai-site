# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

_None — the Gate B fix round (HO-034 · HO-035 · HO-036 · HO-037) is reviewed and resolved below._

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
