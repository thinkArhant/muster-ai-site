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

**Two timestamp precisions exist and are not interchangeable.** The session table and the measured
chain end carry seconds (`20:38:57`, `21:43:15`); the terminal inventory carries minutes (`20:38`).
The minute-precision forms are the ones the corpus marks safe to render. Second-precision timestamps
are analysis input for pacing — they are not display strings and must not appear on the page.

**The same rule applies to the span.** The chain is now measured to the second (3858 s), but the
per-session durations it is checked against are rounded to the minute. Published copy says
"~64 minutes" and never a second-precision span. The precise figure is pacing input only.

## Beat map

Beat numbers are the seed's §2 sequence. Roles named below are Bodh's agents in the replayed run.

| Beat | Seed step | Lines | Sessions | Window (derived) | Duration |
|---|---|---|---|---|---|
| B1 | Queue advances → UI/UX files production spec + assets | L1, L2 | 1 | 20:38:57 → 20:46:31 | 7m34s |
| B2 | Developer productionizes the static site | L3 | 2 | 20:46:31 → 20:59:37 | 13m06s |
| B3 | PM independently re-verifies with its own screenshots | L4 | 3 | 20:59:37 → 21:06:58 | 7m21s |
| B4 | Content → Legal → Marketing each validate and hand off | L5, L6, L7 | 4, 5, 6 | 21:06:58 → 21:20:42 | 13m44s |
| B5 | QA full validation — PASS, zero bugs, 11/11 | L8, L9 | 7 | 21:20:42 → 21:35:09 | 14m27s |
| B6 | Single human gate → deploy → `bodh.day` live | L10, L11, L12 | 8 | 21:35:09 → 21:43:15 | 8m06s |

Beat windows run start-of-first-session to start-of-next-beat, so they tile the chain without gaps or
overlap. B6 closes at the measured chain end (see Derivations, D2). Every window in this table is
derived from timestamps the corpus measures; no window is estimated.

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

Every figure below is computed from the corpus's own timestamps. Values the corpus measures and
prints are marked **stated**; anything computed here is marked **derived**. The line between the two
columns is not fixed: the corpus's "Measurement precision notes" moved the chain end from derived to
stated, and D2, D3, D5 and D10 below record where that boundary now sits.

**D1 — stated durations sum.** `8 + 13 + 7 + 5 + 4 + 5 + 14 + 8 = 64` min. Matches the corpus's stated
~64 minutes.

**D2 — the chain end is measured at source, not derived here.** The corpus states it to the second:
**21:43:15**, session 8's last trace event. It is a **stated** figure, and the corpus corroborates it
to the minute independently — L11 carries `21:43`.

This matters beyond one timestamp. Because the end is measured rather than reconstructed from session
8's `~8 m`, that duration is checkable against a measurement instead of being the input that produced
one (D4, row 8), and the chain span rests on two measurements with no rounded duration inside it (D3).

**D3 — chain span.** `21:43:15 − 20:38:57 = 64m18s` (3858 s). Both endpoints are **stated**, so the
span is derived from measurements only — no rounded duration enters it. Publish it as "~64 minutes"
(see "How to use this file").

**D4 — start-to-start gaps versus stated durations.** Each gap is derived; each duration is stated.
Row 8 has no following session, so it measures session 8 against the chain end instead.

| Sessions | Gap (derived) | Nearest minute | Stated | Agree |
|---|---|---|---|---|
| 1 → 2 | 7m34s | 8 | ~8 m | yes |
| 2 → 3 | 13m06s | 13 | ~13 m | yes |
| 3 → 4 | 7m21s | 7 | ~7 m | yes |
| 4 → 5 | 4m52s | 5 | ~5 m | yes |
| 5 → 6 | 4m21s | 4 | ~4 m | yes |
| 6 → 7 | 4m31s | 5 | ~5 m | yes |
| 7 → 8 | 14m27s | 14 | ~14 m | yes |
| 8 → end | 8m06s | 8 | ~8 m | yes |

All eight stated durations are the correct nearest-minute rounding of the measured interval. No
divergence exceeds 29 s, which is inside the ±30 s tolerance a `~N m` figure carries.

**D5 — the two independent routes to 64 minutes agree to 18 seconds.** Summing stated durations gives
3840 s; measuring the span gives 3858 s. The 18 s divergence is exactly the accumulated rounding from
D4: `3372 s` of measured intervals against `3360 s` of stated durations for sessions 1–7, plus 6 s for
session 8. Every second of the divergence is accounted for by a measured interval; none of it is
unexplained. Both routes support "~64 minutes"; neither contradicts the other.

**D6 — back-to-back execution.** Each session's stated duration accounts for the entire gap to the next
session's start, within the rounding tolerance in D4. No gap is large enough to read as idle time. This
supports the "active build equals elapsed for this chain" reasoning; note the evidence bounds idle
rather than proving it zero, because the durations are stated as approximate.

**D7 — L9 and L10 are simultaneous.** Session 7 start + its measured 867 s = 21:35:09 = session 8 start.
QA's PASS line and the PM's acceptance line are the same instant, not a sequence with a gap.

**D8 — beat proportions.** Beat durations tile the chain exactly: `454 + 786 + 441 + 824 + 867 + 486 =
3858 s`, equal to D3. As shares of the chain:

| Beat | Seconds | Share |
|---|---|---|
| B1 | 454 | 11.77% |
| B2 | 786 | 20.37% |
| B3 | 441 | 11.43% |
| B4 | 824 | 21.36% |
| B5 | 867 | 22.47% |
| B6 | 486 | 12.60% |

Shares sum to 100.00%. These are offered as pacing input, not as a mandate — a replay that preserves
real proportion under compression stays honest to the run without being bound to it. Beat timing is a
design decision.

**D9 — handoff count.** Six handoffs appear in the session table (HO-027, 028, 029, 030, 031, 032),
matching the corpus header's `HO-027→032`. Sessions 3 and 8, both PM, carry no handoff artifact — also
consistent.

**D10 — calls and cost are corroborated, not merely quoted.** The corpus carries per-session Calls and
$ columns, and both tile their stated totals exactly:

- `37 + 50 + 40 + 21 + 26 + 27 + 45 + 43 = 289` API calls, **derived**, matching the stated 289.
- `2.99 + 5.16 + 2.61 + 2.10 + 2.02 + 2.02 + 4.04 + 3.79 = 24.73`, **derived**, matching the stated
  $24.73 at API list price. No rounding slack: the eight values sum to the cent.

Downstream copy may say these totals are checked, not just supplied. Attribution to
beats follows the beat map without further arithmetic — B4 aggregates sessions 4–6 at 74 calls and
$6.14; every other beat is a single session. Scope is unchanged: these are the website wave's numbers
only, never the whole product's.

## Findings

**F1 — session count and step count are both true and different.** The session table carries eight
sessions; DEC-023 reports "7 agent steps." The corpus states the reconciliation: 8 traced sessions =
7 agent work-steps + the PM review/retro session, which is session 8 and does not count itself.
**Rule for downstream copy:** write "8 sessions" or "7 agent steps plus PM review," never a bare "7"
set against an "8."

**F2 — eight roles stood by; seven ran.** L1's "8 roles standing by" is roster size; seven roles
actually executed this wave — ui-ux, developer, pm (twice), content, legal, marketing, qa. Research did
not run. Stated at source, and confirmed here against the session table. Copy must not imply that all
eight roles worked on this wave.

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
2. **Two beats carry most of the clock.** B5 (14m27s) and B2 (13m06s) are 42.85% of the chain between
   them. Linear real-time playback stalls there; proportional compression does not.
3. **B3 is the "wow" beat and the shortest beat in the chain.** At 7m21s (441 s) it is shorter than
   every other beat, though only by 13 s against B1 (454 s), the next-shortest. A replay paced purely
   on real duration gives the most important beat the least screen time.
4. **L12 sits outside the timeline** (F4). It is a terminal state, not a timed beat.

## Verification statement

The corpus was read only. No part of it was edited, reformatted, extended, or regenerated. Every
timestamp above is either quoted as it appears or computed from quoted values with the computation
shown. No line, timestamp, or number was invented, and no gap was closed by inference. All arithmetic
was re-derived independently from the corpus rather than confirmed by restatement.

**One precision caveat applies, and it is the corpus's own:** per-session durations are rounded to the
minute (D4, D5), so any span reassembled from them inherits that rounding. The chain's own span does
not — both of its endpoints are measured at source.

Content surfaced here is limited to queue lines, handoff artifacts, decision-log entries and
timestamps. No conversation content appears.
