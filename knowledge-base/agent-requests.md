# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

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
