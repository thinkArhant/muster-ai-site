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
