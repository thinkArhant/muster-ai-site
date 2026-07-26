# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-25 HO-010 — Gate amendments applied: narration-first mobile, 48 s chain, B5 restored
**Type:** handoff
**Producer:** UI/UX
**Deliverable:** `knowledge-base/design-specs/web/page-shell.md`, `knowledge-base/design-specs/web/section-02-replay.md`
**Status:** open
**Reviewers:**
- [ ] PM — pending

**Outcome:** All four gate amendments are in the specs, and F1 — the one that was a real design problem —
is resolved with a mobile height budget the Developer can build to and QA can measure, rather than with
another assertion that it fits.

**Where each amendment landed.**
- **A1 — theme control dropped.** `page-shell.md` §9: the row is gone, replaced by an explicit "no theme
  control ships" statement so nobody adds one back. The theme *system* is untouched — both palettes,
  `prefers-color-scheme`, and the `:root[data-theme]` attribute, the last now named as QA's mechanism for
  forcing a theme in a test. §11's touch-target example no longer cites a control that does not exist.
- **A2 — motion budget closed.** `page-shell.md` §10: settled statement with its reasoning — the "exactly
  three" budget governs *ambient* motion, and the replay is mandated content. Closed at three plus cursor.
- **A3 — narration-first mobile.** New `section-02-replay.md` §7.1, threaded through §3, §5.1, §8, §10,
  §11, §12.
- **A4 — 48 s chain, B5 restored.** `section-02-replay.md` §5, §5.1, §6.
- Both specs' "Open questions" sections are gone — every question is closed in the section that owns it.

**A4 — re-derived, not scaled.** Dwells 6.40 / 7.20 / 9.60 / 9.60 / 6.95 / 8.25 tile to exactly 48.00 s;
shares 13.33 / 15.00 / 20.00 / 20.00 / **14.48** / **17.19** sum to 100.00%. B5 is inside the 14–15% band
and gains absolute time (6.35 → 6.95 s) despite the chain losing 20%. B6 funded it (21.1% → 17.19%); B3
held at 20.00% and QA paid nothing. All seven timed budgets are `floor(window × 3.5)` recomputed from the
new windows — SP1 ≤21 · SP2 ≤25 · SP3 ≤33 · SP4 ≤33 · SP5 ≤23 · SP6 ≤12 · SP7 ≤16, totalling 163 of a
168-word ceiling. **SP5 is the only budget that grew (21 → 23)** — a bigger beat with the same word count
would just be a longer pause.

Two offsets deliberately do **not** scale, both stated in §5.1: the **0.35 s pair separation** (L1/L2,
L9/L10 are one `--reveal` cadence apart at any chain length — a structural rule about simultaneity, not a
share of the clock), and consequently **SP1's window is 6.05 s, not ×0.8 of 7.65** — costing SP1 0.07 s
and one word. Flagged because it is the one row where ×0.8 arithmetic does not reproduce the table.

**A3 — the height budget: 424.4px fixed core against 375 × 553.** The assumed viewport is an iPhone SE in
mobile Safari *with toolbars shown* — the visual viewport, not the 667px device height. Budgeting against
device height is how a spec asserts a fit the reader never sees, which is close to how F1 happened. Every
row derives from a shell token (§7.1). Visible lines = `floor((visual VH − 424.4) / 24.7)`, clamped
[3, 12]: **5 lines at 375×553** (5.1px slack), 8 at 360×640, 9 at 393×659 / 390×664 / 375×667 (20.3px
slack). The criterion is met with margin at 375×667 and still met at the stricter 553 case. The guarantee
holds down to 499px of visual VH; below that §7.1 states the degradation order — totals strip below the
fold first, narration card last.

Fidelity is preserved by *not wrapping*: `white-space: pre` with `overflow-x: auto` on the terminal's line
region only, so the page body never scrolls horizontally. At 375px the terminal shows ~38 characters and
the longest corpus line (L3, 74 chars, ~577px) is reached with ~276px of scroll inside the container — no
truncation, no ellipsis, byte-clean. And simultaneity is enforced rather than hoped for: §8 gates mobile
playback on **≥95% core visibility, pausing below 90%**, so a beat cannot play with a layer off-screen.

**§5.1 was amended, not just §7 and §10.** Line persistence is now a desktop guarantee (twelve lines, no
scrollback, nothing moves once placed) with a stated small-viewport equivalent: every revealed line stays
in the DOM and rendered for the whole playback and stays reachable in the terminal's own vertical
overflow, but *simultaneous visibility* of all twelve does not survive, and the file says so plainly.

**The landscape claim did not survive re-verification — a correction, not a confirmation.** Same method:
Safari's landscape toolbars leave ~331px of visual viewport against the 424.4px core, so the stacked
layout overflows before a single log line is placed. §10 now specifies **two columns with narration in the
wider one** (~55% of 667px ≈ 40 chars/line, so the 33-word worst case sets 5 lines ≈ 170px), 7 visible
terminal lines from `(242.5 − 67.5) / 24.7`, 27px of slack in the narration column. Narration-first
survives the rotation; the stacking does not. Note the shape of the original error: portrait was asserted
and failed; landscape was asserted as "verified" and also failed. Both are numbers now.

**Desktop did not change** — two columns, twelve-line terminal, accumulating rail, persistence guarantee,
all as specified. I added the one measurement that was missing: at 1280px the terminal's inner width is
~667px against a 577px longest line, so no desktop line wraps or scrolls. That claim is now measured too.

**Two things I found that were not asked for.** (1) The horizontal scroll is a WCAG 1.4.10 exception and
needs arguing, not assuming — §10 states the argument (an aligned-column log is content requiring
two-dimensional layout; wrapping destroys the alignment that makes it legible), and §11 adds the
obligation that comes with it: the container is `tabindex="0"` with its own accessible name so arrow keys
reach the ends of long lines (WCAG 2.1.1). A keyboard-inaccessible scroll region would have shipped as a
real defect under a resolved finding. (2) `--text-terminal` now stays 13px on every viewport — the 12px
step-down existed to make soft-wrapped lines fit, and with scroll doing that job it bought ~3 characters
at a legibility cost on the screens least able to afford it.

**Push-back on the gate hold — not the version DEC-016 anticipated.** I used the latitude and compressed
L10's dwell to 3.45 s instead of scaling it to 4.12 s, leaving the hold at **4.80 s rather than ~4.14 s**
— +0.66 s (+16%), a 36% cut from 7.5 s rather than 45%. SP6 pays 18 → 12 words, which its content fits.

Then I checked whether the hold still reads as deliberate and found something that changes the question.
**§5.1's claim that the hold was "the longest silence in the replay" was not true at 60 s either.** Ranked
by interval length it was 4th of 11 at 60 s (behind 12.0, 9.0, 7.65) and is 5th of 11 at 48 s (behind
9.60, 7.20, 6.60, 6.05). It lost one rank, not a standing it never had. So I removed the claim rather than
restating a smaller version of it, and the spec now argues the hold on what actually makes it read as a
stop: it arrives 0.35 s after the *fastest* interval in the replay (the L9/L10 pair) — a 13.7×
deceleration — and it is the only stretch where the terminal does nothing at all.

**My judgment: the hold survives at 4.80 s and I am not asking to change it.** Residual stillness after
the narration is read is 0.23 s, against 0.07 s at 60 s — marginally better, since reading time was always
what filled the hold.

**The real cost landed on Content, not on the hold.** SP7 carries the page's thesis in ≤16 words, down
from ≤26. Achievable with zero slack — *"No human touched this. The run stopped itself and waited for a
person to press deploy."* is exactly 16 words, reading in 4.57 s of the 4.80 s window — but there is no
room for a run-up, and 26 words is the kind of budget a writer uses to make a line *land* rather than
merely fit. **If one budget is worth revisiting after the replay is seen running, it is SP7; the cheapest
source is SP6's 12 words, inside the same beat, needing no reschedule.** Raised now so it is a known trade
at the Wave 3 gate rather than a discovery.

**Would Apple ship this?** The mobile model, yes — it inverts the right priority and is measured rather
than asserted, which is the specific failure it replaces. My least comfortable number is the 5.1px of
slack at 375×553: positive and derived from real tokens, but one line-height from failing, and it rests on
my estimate of the narration card's worst case (6 lines for a 33-word slot at ~35 chars/line). **QA should
measure the rendered card against SP3's actual copy once Content files it** — at 7 lines the terminal drops
to 4 visible lines at 553px, which the design absorbs, but the budget table would then be wrong and should
be corrected rather than quietly tolerated.

**Note for PM:** `muster-requests-lint.sh` sits at its 300-line budget. Nothing here is closed to sweep —
HO-009 awaits your review and HO-002's box is correctly unticked pending this handoff.

**Revision log:**
- 2026-07-25: Filed. Self-review caught (a) six Rule 15 violations I had introduced while making the specs
  explain their own changes — "the earlier permission is withdrawn", "this replaces the earlier claim",
  "unchanged by the mobile amendment", "the only slot whose budget grew", "the two calls that were once
  judgment", and a "rulings this spec executes" framing in Provenance. The specs state current truth; the
  before/after belongs here. (b) A duplicated "the emphasis system" in §13's designed-here list. (c) The
  WCAG 1.4.10 exception and its keyboard obligation, which the brief did not mention and which the
  horizontal-scroll solution creates.
- Every number in both specs was re-derived mechanically before filing: dwells tile to 48.000, shares sum
  to 100.00%, all seven budgets equal `floor(window × 3.5)`, every beat-opening line lands on its beat
  boundary, and every row of the height budget recomputes from its shell token.

### 2026-07-25 HO-009 — Beat inventory trued up to corpus v1.1
**Type:** handoff
**Producer:** Developer
**Deliverable:** `knowledge-base/design-specs/web/section-02-beat-inventory.md`
**Status:** open
**Reviewers:**
- [ ] PM — pending

**Outcome:** The inventory's derived figures are now the measured ones, and two things it could
previously only flag as limits are closed: the chain end is measured at source, and the calls and cost
totals are corroborated by arithmetic rather than quoted on trust. Every figure in the file was
re-derived from the corpus, not adjusted from the earlier results.

**What changed, and what did not.** One measurement moved — the chain end, `21:43:15`, span 3858 s.
Exactly one beat duration follows it: **B6, 480 s → 486 s**. B1–B5 derive from session start times,
which v1.1 leaves untouched, so their seconds are unchanged. Their *shares* all moved anyway, because
the denominator moved: B6 by +0.14 points, the other five by 0.02–0.04 points each. Every share is
under the 0.2-point threshold the amendment step predicted, no beat changes rank, and the six shares
still sum to 100.00%.

**Verified rather than accepted.** Confirmed independently rather than taking the amendment brief's
figures: the span is 3858 s from the corpus's own endpoints; the six beats tile it exactly
(`454 + 786 + 441 + 824 + 867 + 486`); and both totals tile to the unit —
`37+50+40+21+26+27+45+43 = 289` calls, and the $ column sums to `$24.73` to the cent, no rounding slack.

**Two derivations got stronger, not just corrected.**
- **D2/D3.** The chain end was previously reconstructed from session 8's stated `~8 m`, which made the
  span partly a product of a rounded duration. Both endpoints are now measured, so the span contains no
  rounding at all. The reconstruction was 6 s short — exactly the error a `~N m` figure carries.
- **D4/D5.** Session 8's duration was the *input* that produced the old end timestamp, so it could not
  be checked against anything. It now can: D4 gains an eighth row (8m06s measured against a stated
  ~8 m, agreeing). That also resolves the old D5's circularity — the two routes to "64 minutes" now
  diverge by 18 s, and every second of it is accounted for by a measured interval (12 s across sessions
  1–7, 6 s at session 8) rather than partly by construction.

**Pacing hazards hold, stated explicitly rather than left silent.** All four survive the true-up with
their conclusions intact. Two numbers inside them moved: B5+B2 is 42.85% of the chain (was 42.9%), and
B3 remains the shortest beat. No hazard was created, retired, or reordered.

**Self-review caught one error, and it was mine, not the corpus's.** Adding a margin to hazard 3, I
wrote that B3 is 45 s clear of "B6, the next-shortest." B6 is not the next-shortest — **B1 is, at
454 s**, so the real margin is 13 s. The mechanical check failed on it before filing; the hazard now
reads that B3's lead over the field is 13 s, which makes the hazard *sharper* than the original
unquantified claim, not weaker. Worth flagging to whoever paces §2: B3's shortness is a near-tie with
B1, not a wide gap.

**F1 and F2 are no longer open.** F1 was raised for founder confirmation and is answered at source: 8
traced sessions = 7 agent work-steps + the PM review/retro session. F2's roster-versus-wave reading is
confirmed. Both are now stated as settled rules for downstream copy — "8 sessions" or "7 agent steps
plus PM review," never a bare "7" against an "8."

**No downstream drift.** `section-02-replay.md` already carries 3858 s and B6 at 486 s, and its
one-decimal shares (11.8 / 20.4 / 11.4 / 21.4 / 22.5 / 12.6) all round correctly from the amended
figures. The two files agree; nothing in the replay spec needs a follow-up edit from this amendment.

**Scope discipline.** A mechanical correction, not a re-derivation of the whole inventory: the beat
map, line-to-beat assignment, coverage report, D1/D6/D7/D9 and F3–F5 are untouched. The corpus is
unmodified (verified via `git status`, and it remains at the founder's commit `025842c`).

**No new decision.** DEC-013 already records this true-up and names HO-009 as its mechanism; this step
executes that decision rather than adding one.

**Revision log:**
- 2026-07-25: Filed. Self-review caught (a) the hazard-3 margin error above; (b) three Rule 15
  violations I had introduced while making the file explain itself — before/after framings ("under
  v1.0", "42.9% →", a paragraph of superseded arithmetic in D2). The amendment brief asked for the
  shares shift and the hazards confirmation to be stated explicitly; that belongs in this handoff, not
  in a durable design spec. The file states current truth; the archaeology is here.

### 2026-07-25 HO-002 — Design foundation + §2 replay spec
**Type:** handoff
**Producer:** UI/UX
**Deliverable:** `knowledge-base/design-specs/web/page-shell.md`, `knowledge-base/design-specs/web/section-02-replay.md`
**Status:** needs-revision
<!-- Scope of the revision is narrow and named: finding F1 only (§2 mobile layout, §7 + §10). The design
     direction, token system, and pacing model are accepted and the Wave 2 shell build proceeds from
     page-shell.md as written. Revision is queued as HO-010 ahead of the §2 build in Wave 3. -->
**Revision requested:** F1 — mobile two-layer simultaneity (see PM review below). Queued as HO-010.
**Reviewers:**
- [ ] PM — **reviewed 2026-07-25: revision requested (F1). Cleared for the founder gate and for the
  Wave 2 shell build in the meantime; re-tick when HO-010 lands.** The box stays open because the
  deliverable still needs a change, not because the review is unfinished — the review is complete and is
  below. Verified rather than accepted on summary.

  **Re-derived mechanically, all clean.** (a) All sixteen contrast ratios recomputed from the locked hex
  under WCAG 2.1 — every one matches to two decimals, including the three that fail their floors. The
  rust-usage rules in §2.3 are therefore derived from real measurements, not asserted, which is the part
  that mattered: a wrong ratio there would have propagated into every emphasis decision on the page.
  (b) Beat durations tile the chain at 3858 s against v1.1, with B6 at 486 s — the correction was
  applied, not just acknowledged. (c) All six real shares and all six design shares reproduce to 0.1%.
  (d) The playback schedule reconciles: every beat's cumulative dwell lands exactly on its opening
  line's `t`, and the chain closes at 60.00. (e) All seven finite word budgets equal their window × 3.5
  w/s. Nothing in the timing is hand-waved.

  **Traceability.** Every hex matches the seed verbatim. Motion inventory is closed at three plus the
  cursor. The full-ink rule is enforced structurally (muted bound to two label-scoped type tokens), not
  just stated. §13's three-way provenance split — seed-locked / reference-feel / deliberately-not-inherited
  — is the strongest part of the deliverable: all four divergences PM fenced off are listed as
  non-inherited, and it self-reports three more found during the work (`JetBrains Mono`, muted feed text,
  the blurred status bar). That is the reference being read for feel and not leaking in as spec.

  **Finding F1 — mobile: the two layers cannot be seen together during playback. Blocking for the
  Developer's §2 step; not blocking for the founder gate or the shell build.**
  §7 fixes the terminal to fit all twelve lines with no scrollback, and §10 forbids truncation and
  ellipsis, requiring soft-wrap with hanging indent. Those three rules are individually right and jointly
  unsatisfiable on a 375px viewport. Measured against the real corpus lines (longest 74 chars): at the
  spec'd 12px minimum, ~44 chars/row gives 22 rendered rows ≈ 502px of log, and with terminal chrome,
  the totals strip and the beat indicator the section core reaches ~646px — the whole 667px viewport,
  before the narration caption card, the `<h2>` tag, or `--gap-section`'s 96px floor. At 13px it is
  ~712px.
  The consequence is not cosmetic: the narration caption card sits below the terminal and is therefore
  off-screen while the terminal plays. That contradicts this spec's own content hierarchy item 1 ("the
  two layers are one idea at a time") and, more seriously, the founder's acceptance criterion — narration
  is what carries the non-technical reader, and on mobile they cannot read it while watching the beat it
  annotates.
  Not a defect in the pacing model, which is sound; it is the one place where three correct constraints
  collide and the spec asserts a fit it does not demonstrate ("landscape phone: verified" is claimed, but
  portrait 375×667 is the harder case and is not). Resolution is a design call for UI/UX, not for PM to
  make: a viewport-anchored (sticky-bottom) caption card keeps both layers visible at once and costs no
  fidelity, but a windowed terminal that follows the active line, or an explicitly sequential mobile
  reading model, are also defensible. Whichever is chosen, mobile height needs a stated budget the
  Developer can build to and QA can measure.

  **Deferred to their owners, not resolved here:** the three open questions are founder calls and go to
  the gate packet with PM recommendations (confirm the replay is content playback; drop the theme control;
  keep the totals strip static). The 60 s duration is a taste call the gate is the right place for — the
  spec's uniform ×0.8 rescale path means deciding it late costs one multiplier, not a redesign.

**Outcome:** The locked design direction is executed as a complete token system (both themes, every value
traced to the seed) and the §2 replay is specified to the tenth of a second — pacing is a design
decision the Developer implements, not a guess.

**Page shell.** Six semantic colour tokens at the seed's twelve exact hex values; raw hex may appear
only in the token block. Contrast measured and stated per token pair in both themes: body ink 12.15:1
minimum, muted labels 5.13:1 minimum. The measurement surfaced one real collision and the spec resolves
it: rust measures 3.86–4.35:1 against grounds/surfaces (dark), below the 4.5 small-text floor — so rust
is bound to large metric numerals, graphical marks, borders, and focus rings, never small running text;
body links are ink with a rust underline. Spacing derives from a single rhythm token applied one-sided
(`margin-block-start` only) so gaps can never stack — section padding 96–168px, spacious as the
overriding constraint. Motion inventory is closed at the seed's three elements plus the curl cursor,
each with a complete-content reduced path; the OPERATIONAL pulse is specified to be unmissable
(double-ring relaunch at 50% phase — never still). Glass excluded explicitly: the reference's blurred
status bar is replaced by an opaque one.

**§2 replay.** Real intervals from the beat inventory with the v1.1-corrected chain (3858 s, B6 486 s).
Playback model: fixed 60 s chain, comprehension-weighted, ~64:1 compression, every per-beat deviation
from real share stated with rationale — the wow beat (PM re-verify) expanded to 20% of screen time from
11.4% real; the gate hold is 7.5 s of deliberate stillness; L9/L10 and L1/L2 render one 350 ms cadence
apart (same-instant hazard); L12 sits outside the 60 s clock with the three-days-later fact mandated in
its caption slot. Narration is a sync contract: eight slots anchored to line reveals with word budgets
derived at 3.5 words/s — a budget overrun is a spec violation. All 12 lines and all narration live in
the DOM from load; playback is opacity-only reveal, so reduced-motion, no-JS, and screen-reader paths
get the complete transcript by construction.

**Would Apple ship this?** Yes — because the system is small and total: six colours, six type steps, one
rhythm token, three motions, and every number in it is either the seed's or measured. The one place I
hesitated was the replay's 60 s length; I kept it because comprehension carries the founder's acceptance
bar, and the spec states exactly how to rescale to 48 s if review judges it slow (one multiplier, not a
redesign).

**Open questions** (also parked in `orchestration-queue.md` → Founder Decisions):
1. Confirm the replay is content playback, not a fourth live motion element (interpretation stated in
   `page-shell.md` §10 scope note).
2. Theme control in the status bar: recommended include, non-persistent (no storage, A-008). Drop if
   unwanted — one row.
3. §2 chain-totals strip is static by design (log evidence, not showpiece). Extend count-up to it if
   preferred — one attribute.

**Revision log:**
- 2026-07-25: Filed. Self-review caught: (a) count-up scope ambiguity between shell §10.3 and the
  replay's static totals strip — reconciled with an explicit scope note; (b) the light-theme vignette at
  the reference's strength would composite muted labels below 4.5:1 — cap derived and stated (≤5%
  alpha); (c) rust-at-terminal-size AA failure — resolved via the ink-bold + rust-mark emphasis system
  rather than inheriting the reference's rust feed words.


## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-25 — HO-001 (Developer): Bodh corpus verified, §2 beat inventory derived. All six seed
  beats supported, no gaps, no HALT; all twelve terminal lines assigned. Accepted by UI/UX (as pacing
  input) and PM (with one figure superseded by corpus v1.1 — derived chain end `21:43:09`/3852 s is
  now measured `21:43:15`/3858 s, moving B6 480→486 s). Trued up by HO-009. Full detail in git history.
