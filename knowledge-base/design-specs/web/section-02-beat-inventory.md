# §2 Beat Inventory — the Bodh Sprint-4 corpus mapped to the six beats

Source: `knowledge-base/bodh-sprint4-corpus.md` (founder-authored, read-only) and
`knowledge-base/product-spec-seed.md` §2 (the six-beat sequence).

This file is the pacing and provenance layer between the corpus and §2's specs. It answers three
questions: which corpus material belongs to which beat, how long each beat really took, and which
numbers are measured versus derived.

## How to use this file

**Render from the corpus, never from this file.** The verbatim terminal strings live in the corpus's
"Terminal-line inventory" and are not reproduced here — this file references them by handle so the
corpus stays the single source of every rendered character. Copying the strings into a second file
would create a drift path between what is verified and what ships.

**Line handles (`L1`–`L12`) are a derived index, not corpus notation.** The corpus does not number
its terminal lines. `L1`–`L12` number them top to bottom for reference only.

**Two timestamp precisions exist and are not interchangeable.** The session table carries seconds
(`20:38:57`); the terminal inventory carries minutes (`20:38`). The minute-precision forms are the
ones the corpus marks safe to render. Second-precision timestamps are analysis input for pacing —
they are not display strings and must not appear on the page.

## Beat map

Beat numbers are the seed's §2 sequence. Roles named below are Bodh's agents in the replayed run.

| Beat | Seed step | Lines | Sessions | Window (derived) | Duration |
|---|---|---|---|---|---|
| B1 | Queue advances → UI/UX files production spec + assets | L1, L2 | 1 | 20:38:57 → 20:46:31 | 7m34s |
| B2 | Developer productionizes the static site | L3 | 2 | 20:46:31 → 20:59:37 | 13m06s |
| B3 | PM independently re-verifies with its own screenshots | L4 | 3 | 20:59:37 → 21:06:58 | 7m21s |
| B4 | Content → Legal → Marketing each validate and hand off | L5, L6, L7 | 4, 5, 6 | 21:06:58 → 21:20:42 | 13m44s |
| B5 | QA full validation — PASS, zero bugs, 11/11 | L8, L9 | 7 | 21:20:42 → 21:35:09 | 14m27s |
| B6 | Single human gate → deploy → `bodh.day` live | L10, L11, L12 | 8 | 21:35:09 → 21:43:09 | 8m00s |

Beat windows run start-of-first-session to start-of-next-beat, so they tile the chain without gaps or
overlap. B6 closes at the derived chain end (see Derivations, D2).

### Line-to-beat assignment

Every one of the twelve terminal lines is assigned. **No line is unused.**

| Line | Stamp | Role token | Beat | What it carries |
|---|---|---|---|---|
| L1 | 20:38 | `muster` | B1 | Driver reads the queue; roster standing by |
| L2 | 20:38 | `ui-ux` | B1 | Production spec + assets filed (HO-027) |
| L3 | 20:46 | `dev` | B2 | `web/` built; rotation port parity across UTC-positive and UTC-negative (HO-028) |
| L4 | 20:59 | `pm ✓` | B3 | Independent re-verify with its own screenshots; match |
| L5 | 21:06 | `content` | B4 | Copy on-voice; one meta edit (HO-029) |
| L6 | 21:11 | `legal` | B4 | Data-not-collected confirmed at code level (HO-030) |
| L7 | 21:16 | `mkt` | B4 | Share card written (HO-031) |
| L8 | 21:20 | `qa` | B5 | Rotation re-derivation under way — 24 dates × 3 timezones |
| L9 | 21:35 | `qa` | B5 | 11/11 acceptance, PASS, zero bugs (HO-032) |
| L10 | 21:35 | `pm` | B6 | Handoffs accepted; deploy packet to the founder |
| L11 | 21:43 | `gate` | B6 | `Role: halt`, awaiting operator |
| L12 | *(none)* | `deploy` | B6 | `bodh.day` live — **three days later, 2026-07-18** |

**One assignment is a judgment call, stated so it can be overridden.** L10 is placed in B6 rather than
B5. The seed's beat 6 opens at the human gate, and L10 is the run stopping itself to create that gate —
gate-facing, not QA-facing. The defensible alternative is to close B5 with L10 as the acceptance of
QA's handoff. Nothing downstream breaks either way; the timing is identical because L9 and L10 share a
timestamp.

### Non-terminal material, also mapped

Quotable source lines beyond the terminal inventory, so nothing in the corpus sits unaccounted for:

| Material | Beat | Note |
|---|---|---|
| Session rows 1–8 | B1–B6 per the map above | Each row's role, duration and artifact |
| DEC-019 — autonomous authoring, build-time placeholders | B1 | The chain's premise: nothing stops mid-build |
| DEC-022 — three-layer visual verification | B3 | The source of the beat-3 claim |
| DEC-023 — retro: clean run, zero revision rounds, zero bugs, 11/11 | B5 / B6 | Written in session 8; reports on the whole chain |
| DEC-027 — Bodh v1.0 launched, `bodh.day` live | B6 | Pairs with L12 |
| Chain totals — ~64 min, 289 API calls, $24.73 | whole chain | Scope: the website wave only. Never the whole product |

## Coverage report

Per the seed's six steps. Support means the corpus carries the event, its timestamp, and enough
specificity to narrate it without inference.

| Beat | Supported | Evidence |
|---|---|---|
| 1 — queue advances → UI/UX spec + assets | **Yes** | L1, L2; session 1; HO-027; DEC-019 |
| 2 — Developer productionizes, rotation port, PWA, timezone parity | **Yes** | L3; session 2; HO-028 |
| 3 — PM independently re-verifies with its own screenshots | **Yes** | L4; session 3; DEC-022 |
| 4 — Content → Legal → Marketing validate and hand off | **Yes** | L5, L6, L7; sessions 4–6; HO-029/030/031 |
| 5 — QA full validation, PASS, zero bugs, 11/11 | **Yes** | L8, L9; session 7; HO-032; DEC-023 |
| 6 — single human gate → deploy → live | **Yes** | L10, L11, L12; session 8; DEC-027; deploy date 2026-07-18 |

**No gaps. No beat is unsupported.** Nothing was inferred, reconstructed, or approximated to reach
this result.

The seed's beat 4 names three roles in sequence; the corpus supplies them as sessions 4, 5 and 6 in
that order, which is the mapping the seed's structure implies and the timestamps confirm.

## Derivations — the arithmetic, shown

Every figure below is computed from the corpus's own timestamps. Verbatim corpus values are marked
**stated**; anything computed is marked **derived**.

**D1 — stated durations sum.** `8 + 13 + 7 + 5 + 4 + 5 + 14 + 8 = 64` min. Matches the corpus's stated
~64 minutes.

**D2 — the chain end is derived, not printed.** No second-precision end timestamp exists in the corpus.
Session 8 starts 21:35:09 (stated) and runs ~8 m (stated) → **21:43:09 (derived)**. The corpus
independently corroborates it to the minute: L11 carries `21:43`. Every span figure below therefore
inherits the rounding of one stated `~8 m` duration.

**D3 — chain span.** `21:43:09 − 20:38:57 = 64m12s` (3852 s), **derived**.

**D4 — start-to-start gaps versus stated durations.** Each gap is derived; each duration is stated.

| Sessions | Gap (derived) | Nearest minute | Stated | Agree |
|---|---|---|---|---|
| 1 → 2 | 7m34s | 8 | ~8 m | yes |
| 2 → 3 | 13m06s | 13 | ~13 m | yes |
| 3 → 4 | 7m21s | 7 | ~7 m | yes |
| 4 → 5 | 4m52s | 5 | ~5 m | yes |
| 5 → 6 | 4m21s | 4 | ~4 m | yes |
| 6 → 7 | 4m31s | 5 | ~5 m | yes |
| 7 → 8 | 14m27s | 14 | ~14 m | yes |

All seven stated durations are the correct nearest-minute rounding of the measured gap. No divergence
exceeds 29 s, which is inside the ±30 s tolerance a `~N m` figure carries.

**D5 — the two independent routes to 64 minutes agree to 12 seconds.** Summing stated durations gives
3840 s; measuring the span gives 3852 s. The 12 s divergence is exactly the accumulated rounding from
D4 (`3372 s` of measured gaps against `3360 s` of stated durations for sessions 1–7). Both routes
support "~64 minutes"; neither contradicts the other.

**D6 — back-to-back execution.** Each session's stated duration accounts for the entire gap to the next
session's start, within the rounding tolerance in D4. No gap is large enough to read as idle time. This
supports the "active build equals elapsed for this chain" reasoning; note the evidence bounds idle
rather than proving it zero, because the durations are stated as approximate.

**D7 — L9 and L10 are simultaneous.** Session 7 start + its measured 867 s = 21:35:09 = session 8 start.
QA's PASS line and the PM's acceptance line are the same instant, not a sequence with a gap.

**D8 — beat proportions.** Beat durations tile the chain exactly: `454 + 786 + 441 + 824 + 867 + 480 =
3852 s`, equal to D3. As shares of the chain:

| Beat | Seconds | Share |
|---|---|---|
| B1 | 454 | 11.79% |
| B2 | 786 | 20.40% |
| B3 | 441 | 11.45% |
| B4 | 824 | 21.39% |
| B5 | 867 | 22.51% |
| B6 | 480 | 12.46% |

Shares sum to 100.00%. These are offered as pacing input, not as a mandate — a replay that preserves
real proportion under compression stays honest to the run without being bound to it. Beat timing is a
design decision.

**D9 — handoff count.** Six handoffs appear in the session table (HO-027, 028, 029, 030, 031, 032),
matching the corpus header's `HO-027→032`. Sessions 3 and 8, both PM, carry no handoff artifact — also
consistent.

**Not independently derivable:** 289 API calls and $24.73 are stated chain totals with no per-session
breakdown in the corpus. They are quotable as supplied; this file cannot corroborate them by
arithmetic, and no downstream step should claim it did.

## Findings

**F1 — session count and the retro's step count differ, and both are quotable.** The session table
carries eight sessions; DEC-023 reports "7 agent steps." The most defensible reconciliation is that
DEC-023 is the retrospective written *inside* session 8 and does not count itself — seven executing
steps plus one closeout. That reading is consistent but unconfirmed, so it is not asserted here.
**Safe rule for downstream copy:** neither count is required by the narration. If one is published, use
the corpus's own framing ("8 sessions" for the chain) and never place it next to DEC-023's "7 agent
steps" without the founder's reconciliation. Raised for founder confirmation.

**F2 — eight roles stood by; seven ran.** L1's "8 roles standing by" is the roster size. Seven distinct
roles actually executed: ui-ux, developer, pm (twice), content, legal, marketing, qa. Research did not
run in this chain. Copy must not imply that all eight roles worked on this wave.

**F3 — "max two rounds" is a bound that was never spent.** DEC-022 specifies a bounded revision loop of
at most two rounds; the chain totals and DEC-023 report zero revision rounds. The mechanism existed and
was not needed. Copy that mentions the bound must not imply rounds occurred.

**F4 — the deploy line is outside the chain's clock.** L12 carries no timestamp by design. Deploy landed
2026-07-18, three days after the 2026-07-15 chain, because the gate waited. No pacing, animation, or
copy may place the deploy inside the 64 minutes or imply it closed the run at 21:43.

**F5 — the corpus's own word for the 64 minutes is "wall-clock."** Published copy is governed by the
project's copy rules, which permit "64 minutes of agent work" and forbid wall-clock framing. The
corpus's internal wording is not a licence for the page's wording.

## Pacing hazards

For whoever specs the replay's timing:

1. **L9 and L10 are zero seconds apart** (D7). They must not render with a visible gap, and must not be
   merged — different roles, different facts. Same hazard, lower stakes, for L1 and L2 at `20:38`.
2. **Two beats carry most of the clock.** B5 (14m27s) and B2 (13m06s) are 42.9% of the chain between
   them. Linear real-time playback stalls there; proportional compression does not.
3. **B3 is the "wow" beat and the shortest beat in the chain.** At 7m21s (441 s) it is shorter than
   every other beat. A replay paced purely on real duration gives the most important beat the least
   screen time.
4. **L12 sits outside the timeline** (F4). It is a terminal state, not a timed beat.

## Verification statement

The corpus was read only. No part of it was edited, reformatted, extended, or regenerated. Every
timestamp above is either quoted as it appears or computed from quoted values with the computation
shown. No line, timestamp, or number was invented, and no gap was closed by inference. All arithmetic
was re-derived independently rather than confirmed by restatement; the derivations agree with the
corpus throughout, subject to the two precision caveats in D2 and D5 and the one verification limit
noted after D9.

Content surfaced here is limited to queue lines, handoff artifacts, decision-log entries and
timestamps. No conversation content appears.
