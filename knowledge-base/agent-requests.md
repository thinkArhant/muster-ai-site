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
**Status:** in-review
**Reviewers:**
- [ ] PM — pending (Wave 1 design review, then founder gate)

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

### 2026-07-25 HO-001 — Bodh corpus verified; §2 beat inventory derived
**Type:** handoff
**Producer:** Developer
**Deliverable:** `knowledge-base/design-specs/web/section-02-beat-inventory.md`
**Status:** in-review
**Reviewers:**
- [x] UI/UX — **accepted as pacing input**, 2026-07-25. Reviewed as the consumer: spot-re-derived the
  beat windows from the corpus session starts (all six tile the chain, each boundary lands on a stated
  session start) and confirmed the four pacing hazards are real — L9/L10 simultaneity at 21:35:09,
  B2+B5 carrying ~43% of the clock, B3 as shortest-yet-most-important beat, and L12 outside the
  timeline. The handle convention (L1–L12, render from corpus only) is exactly what the replay spec
  needs to avoid a drift path. Will consume with the v1.1 corrections applied inline per the queue's
  PM note (span 3858 s, B6 = 486 s; B1–B5 unchanged) — shares shift <0.2%, hazards stand.
- [x] PM — **accepted with one superseded figure**, 2026-07-25. The re-verification is what was asked
  for: every figure re-derived mechanically rather than confirmed by restating the Wave 0 pass, and the
  two caveats it added (the chain end was derived not printed; the 12 s between the two routes is
  rounding, and bounds idle rather than proving it zero) are both correct and were not in the upstream
  check. Declining to resolve the 8-versus-7 count by inference was the right call — it was answered at
  source instead. Spot-checked rather than accepted on summary: the six per-beat durations tile the
  chain and each boundary lands on a stated session start.
  **Superseded by corpus v1.1 (`025842c`), through no fault of the deliverable**: the derived chain end
  `21:43:09` / 3852 s is now measured at `21:43:15` / 3858 s. One beat moves — B6, 480 s → 486 s;
  B1–B5 are unaffected. Beat shares shift under 0.2 %, so the Pacing hazards section stands. Also now
  false: "289 calls and $24.73 not independently derivable" — v1.1's per-session columns tile both
  exactly. Trued up by HO-009; the running UI/UX step carries the corrected figures inline so it is not
  blocked.

**Outcome:** All six of the seed's §2 beats are supported by the corpus. **No gaps, no HALT.** All twelve
terminal lines are assigned to a beat; none is unused. The corpus is unmodified (verified with
`git diff --stat HEAD` against the three founder-authored files — empty).

**Independent re-verification — agreement, with two caveats the Wave 0 pass did not state.** Every figure
was re-derived mechanically from the corpus timestamps, not confirmed by restating the upstream check.
Agreement on all four claims: the 8 stated durations sum to 64 min; the span 20:38:57 → 21:43:09 is
64 m 12 s; the terminal-inventory timestamps match the session table line for line; and sessions 4–6
(content, legal, marketing) form the seed's step 4. Added rigour:
- **The chain-end timestamp is derived, not printed.** No second-precision end time exists in the corpus.
  21:43:09 = session 8 start (stated) + ~8 m (stated). The corpus corroborates it only to the minute
  (`21:43` on the gate line). Every span figure inherits that one rounding.
- **The two routes to "64 minutes" differ by 12 s, and that is exactly the rounding.** Stated durations
  give 3840 s; the measured span gives 3852 s. The 12 s is the accumulated nearest-minute rounding across
  sessions 1–7. Both routes support "~64 minutes"; neither contradicts the other. Also confirmed
  back-to-back execution per-session: no gap-versus-duration divergence exceeds 29 s, inside the ±30 s
  tolerance a `~N m` figure carries. Note this *bounds* idle rather than proving it zero.

**New for downstream:** per-beat durations that tile the chain exactly (454 + 786 + 441 + 824 + 867 + 480
= 3852 s), their shares of the chain, and four pacing hazards — chiefly that the QA-PASS line and the
PM-acceptance line are the **same instant** (21:35:09), so they must neither render with a gap nor be
merged; and that the "wow" beat is the **shortest** in the chain (7m21s), so real-duration pacing gives
the most important beat the least screen time.

**Build convention established:** the deliverable references terminal lines by handle (`L1`–`L12`, a
derived index) and does **not** reproduce their text — the corpus stays the single source of every
rendered character, so there is no drift path between what is verified and what ships. Render from the
corpus, never from the inventory. The two timestamp precisions are also not interchangeable: the
minute-precision forms are the ones the corpus marks safe to render; second-precision timestamps are
pacing input only and must not reach the page.

**Not independently derivable:** 289 API calls and $24.73 are stated chain totals with no per-session
breakdown. Quotable as supplied; no downstream step should claim arithmetic corroboration.

**One founder question raised** (parked in `orchestration-queue.md` → Founder Decisions, non-blocking):
the session table carries 8 sessions, DEC-023 reports "7 agent steps."

**Revision log:**
- 2026-07-25: Filed. Self-review caught one internal contradiction before filing — the shortest beat was
  described as the second-shortest (B3 at 441 s is shorter than B1 at 454 s); corrected.

**Observations:**
- OBS-001 — Model plan disagrees across two files   Severity: low
  Evidence: `current-sprint.md:55` names `claude-opus-4-8` as the sprint default; DEC-004 and every
  `Model:` line in `orchestration-queue.md` name `claude-opus-5`.
  Suggested action: PM aligns `current-sprint.md` with DEC-004.
- OBS-002 — Roster size and roles that ran differ   Severity: med
  Evidence: corpus terminal line 1 reads "8 roles standing by"; seven distinct roles actually executed
  (research did not run in this chain).
  Suggested action: none needed for the inventory — recorded as F2 so copy cannot imply all eight roles
  worked the wave.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->
