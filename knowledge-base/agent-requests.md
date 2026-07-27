# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

_None — Wave 1's eight handoffs were reviewed as one batch and swept below._

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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

- 2026-07-27 — HO-024 (Developer): **accepted, no revision.** The Gate 3 defect is closed by removing a
  CSS value rather than choosing a better one, which is why nothing adjacent moved. PM did not take the
  fail-when-violated claim on trust and re-planted both breaks independently: `--mark-clear: 0ch` turns
  R2 red at all three states (`L4 0px · L9 0px`), and `--mark-inset: 8px` turns R1 red reporting
  `terminal 8px / narration 12px … expected 8px read from --mark-inset` — the expected figure followed
  the token and the check still failed, on the inequality. That is DEC-032's property demonstrated
  directly rather than asserted, and it is the answer to the acceptance criterion's real question: these
  assertions cannot be satisfied by moving the value they were written against. Tree reverted clean;
  `bash scripts/test.sh` re-run by PM, GREEN both engines. The WebKit lockup check's stated limit — it
  protects the mark's rendered position, not the `align-self` keyword, because `center` renders
  identically — is the right thing to protect and the right thing to have disclosed.

- 2026-07-27 — HO-023 (Content): **accepted, no revision.** "Tightened, not rewritten" was re-derived
  from the seed by PM with an independent word-level diff rather than read off the report: 420 → 415,
  −5 words, 30 → 30 sentences, exactly three rows differing and exactly the four edits named. Per-decision
  totals confirmed (−4 / −1 / 0 / 0), so `section-04-decisions.md`'s measured line counts hold as
  measurements rather than ceilings. Every stated word budget across all five copy files was recounted
  and every one matches, none over budget. Three rulings: **the `ACTIVE BUILD 9.3 h` repeat in §5 stays**
  — a figure for what the operator spent needs the build figure beside it as a denominator, and the
  pre-authored fallback would leave operator attention without one; **§4's 7–8 sentences against the
  seed's own "~4–6" goes to the founder**, because closing it means cutting founder copy and only he can
  authorise that, with PM's recommendation to ship as-is since each sentence carries a distinct claim;
  **decision 4's stamp must never gain a date** — agreed, and the one-text-slot construction already
  makes that structural rather than a rule someone has to remember. The `curl`'s byte-equality was
  re-verified across all four files independently. See DEC-041, DEC-042.

- 2026-07-27 — HO-022 (UI/UX): **accepted, no revision.** Four lines of CSS, no JavaScript touching the
  scroll position, and §2's exemption proven as a property — the engine moved not one of the 20 sampled
  rest positions where the playback core is ≥90% visible. The three named harness traps are the value of
  this handoff: `y proximity` serialising as `"y"` would have failed a correct build, the padding asserted
  as bar-height + `--rhythm` rather than as 72, and real key events rather than `scrollBy` (the
  programmatic form reports a top-of-page trap a reader never experiences). REQ-007 answered below.

- 2026-07-27 — REQ-006 + REQ-007 (UI/UX → PM): **both ruled, both PM-alone.** REQ-006 — the omission ran
  the way UI/UX suspected: DEC-031 enumerates four seats and the footer is not among them, so
  `brand-guidelines.md` §4's "Header **and footer** lockup" row is the stale one. Amended to "Header
  lockup" with the exclusion stated in prose; its `~8px` pennant figure was stale against DEC-037's 6 × 9
  in the same row and is corrected too — leaving it would have been the same defect a line lower.
  REQ-007 — **manual check, recommendation (2) accepted.** `qlmanage` renders a static thumbnail and
  cannot scroll, so WebKit parity for a *behaviour* is unreachable here; driving Safari needs a founder
  admin authorisation plus new harness surface in a sprint with none budgeted, which is scope this run
  has no authority to add. It becomes a manual pass, recorded as manual and never reported as a
  mechanical result, and the one sentence UI/UX proposed is added to the Gate B iPhone ask. The two
  downstream steps' cross-engine criteria are amended so they are satisfiable as written. See DEC-042.

- 2026-07-27 — HO-021 (UI/UX): **accepted, no revision.** The spec is buildable from itself and HO-025
  proved it — an independent build measured 685.31px prose in a 903.31px card and a 12.00px mark inset,
  matching §6.2's own rendered figures exactly, which is the spec confirming itself against a second
  party rather than against its author. Zero rust text is the right answer to a failed contrast pair
  (ink-on-rust measures 3.43 / 2.79 — PM recomputed all eight stated pairs from the locked hex and every
  one is exact), and the stamp-as-one-text-slot makes the no-date case structural instead of a rule.

- 2026-07-27 — HO-020 (UI/UX): **accepted, no revision.** The fold is falsifiable — 461.8px measured
  bottom against 553px, 91.2px clear — and landscape phone is named as the case that cannot hold the
  full stack rather than smoothed into "every viewport." The display floor being wrong against real
  strings is exactly what the copy-before-design resequencing was for, and it was caught by measurement
  at spec stage rather than at build. §1's element inventory was checked against seed §1 item by item by
  PM: all nine present, including the eyebrow verbatim and the `VERIFY ⎘` chip. OBS-004 triaged.

- 2026-07-27 — HO-019 (UI/UX): **accepted, no revision.** Five named relationships with one assertion
  each, and the deliberate refusal to make the hanging indent a sixth — it kept moving the other five —
  is the ruling that made the build subtractive. Every figure HO-024 later measured is the figure this
  spec predicted, which is the test of whether a spec was buildable or aspirational. The ten re-base
  sites were listed by file and line and all ten landed. OBS-005 triaged.

- 2026-07-27 — HO-018 (Content): **accepted, no revision.** Four headline candidates with their announced
  strings supplied at copy stage is what made the hero spec measurable against real text rather than a
  hypothesis. §3's competitor clause ships named on the seed's own instruction, with the 63-word cut
  pre-authored so "cut, not softened" is executable without reopening copy. SP3's 24 → 19 words closed
  the deferred 320px pre-launch item on measured evidence. OBS-001 through OBS-003 triaged.

