# Bodh Sprint 4 — the real build log, condensed (§2 replay corpus)

> Founder-supplied source material for §2 "Watch it ship." Every line below is drawn from the real
> Bodh build artifacts (queue, handoffs HO-027→032, decision log, and the autonomous run's session
> traces). The replay is a **faithful reconstruction from this material, labeled "condensed from the
> real build log"** — compress and select freely; never invent an event, a number, or a timestamp.
> Anything not in this file is not in the replay.

## What Sprint 4 was
The Bodh *website* wave: productionize and validate `bodh.day` (static site + PWA companion to the
shipped iOS app). Planned to run **fully autonomous** end-to-end under the sprint driver with a
**single human gate at deploy**. It did.

## The autonomous chain — real timeline (2026-07-15, local time; all 8 sessions traced)

| # | Time | Role | Dur | What actually happened | Artifact |
|---|------|------|-----|------------------------|----------|
| 1 | 20:38:57 | ui-ux | ~8 m | Production spec + assets: breakpoints, 16 render states, a11y, favicon/PWA/og-image set; toolchain machine-verified | HO-027 |
| 2 | 20:46:31 | developer | ~13 m | Deployable `web/`: index + /privacy, byte-identical models.json, exact port of the app's rotation logic, PWA/service-worker; rotation parity verified in UTC-positive AND UTC-negative timezones | HO-028 |
| 3 | 20:59:37 | pm | ~7 m | **Independent re-verify with its own screenshots — never the developer's**: visual parity, rotation, trackers, placeholders. Accepted | — |
| 4 | 21:06:58 | content | ~5 m | Copy polish: on-voice, ships as-is; one surgical meta-description edit | HO-029 |
| 5 | 21:11:50 | legal | ~4 m | Privacy verified at **code level**: "Data Not Collected" holds — no cookies/storage/beacons, zero trackers, only same-origin fetch | HO-030 |
| 6 | 21:16:11 | marketing | ~5 m | OG/share-card copy written — 134 chars, on-voice, no competitor mention | HO-031 |
| 7 | 21:20:42 | qa | ~14 m | **Full validation: PASS — zero bugs, 11/11 acceptance green.** Rotation independently re-derived (own formula, not the port's) across 24 dates × 3 timezones incl. both DST boundaries; live offline service-worker smoke test (server killed, site still renders); tracker-free; a11y code-level; no visual regression from the copy edits | HO-032 |
| 8 | 21:35:09 | pm | ~8 m | All handoffs accepted; founder deploy packet assembled; sprint retrospective run. **Run stops itself: `Role: halt` — the deploy gate is the founder's** | — |

**Chain totals (measured from these 8 session traces):** ~64 minutes wall-clock · 289 API calls ·
**$24.73 at API list price**. Zero revision rounds, zero bugs.
Deploy: founder swapped the placeholders, connected Cloudflare Pages → **`bodh.day` live 2026-07-18**.

## Real decision-log lines (quotable)
- **DEC-019** — Sprint 4 authored to run end-to-end autonomously with a single `Role: halt` at
  deploy; all founder-dependent values are build-time placeholders (`__DOMAIN__`, `__APPSTORE_URL__`,
  `__SUPPORT__`) so nothing stops mid-build.
- **DEC-022** — three-layer visual verification, all mechanical: developer self-verifies
  (screenshot mockup vs build, iterate until indistinguishable) → **PM independently re-verifies
  with its own screenshots, never trusting the developer's** (bounded revision loop, max two
  rounds) → QA re-screenshots after the copy steps and fails on any regression.
- **DEC-023** (retro) — the run executed clean: 7 agent steps, **zero revision rounds, zero bugs,
  QA PASS on all 11 acceptance items**; all six pre-run risk findings had been fixed at planning
  time, and the clean run validated them.
- **DEC-027** — Bodh v1.0 LAUNCHED; `bodh.day` live.

## Terminal-line inventory (derived from the real events — safe to render)
```
20:38  muster   sprint/auto · queue read · 8 roles standing by
20:38  ui-ux    production spec + assets · HO-027 filed
20:46  dev      web/ built · rotation port parity ✓ (UTC+ / UTC−) · HO-028
20:59  pm ✓     independent re-verify · own screenshots · match
21:06  content  copy on-voice · one meta edit · HO-029
21:11  legal    data-not-collected · confirmed at code level · HO-030
21:16  mkt      share card written · HO-031
21:20  qa       re-deriving rotation · 24 dates × 3 timezones …
21:35  qa       11/11 acceptance · PASS · zero bugs · HO-032
21:35  pm       handoffs accepted · deploy packet → founder
21:43  gate     Role: halt · awaiting operator
─────  deploy   bodh.day · LIVE
```
(Select/merge lines as pacing needs; timestamps and facts must stay as above. The deploy line is
three days later in reality — the gate waited on Apple; never imply deploy happened at 21:43.)

## Narration facts — every claim below is TRUE and sourced above
- "No human touched this until the deploy button" — true for THIS chain (sessions 1–8, single halt).
- "The PM re-checked the developer's work with its own screenshots" — DEC-022, session 3.
- "QA didn't re-run the developer's tests — it re-derived the date math with its own formula, across
  24 dates and 3 timezones" — HO-032.
- "Legal confirmed the privacy claim at code level, not by reading a policy" — HO-030.
- "One evening: 64 minutes of agent work, $24.73 in tokens" — chain totals above.
- "Zero revision rounds, zero bugs" — DEC-023.

## Do-not-overclaim boundary
- The later Safari-only SVG bug catch (HO-033) and all polish rounds happened in **founder-directed
  interactive passes at the deploy gate** — NOT part of the untouched chain. If used, narrate as "an
  independent cross-engine re-check caught a Safari-only bug Chrome missed" in a founder-directed
  polish pass. Never fold it into the autonomous run.
- Aggregate Bodh numbers (9.3 h active, $147, whole product incl. the iOS app) attach to the broad
  Bodh framing only. This wave's own numbers are the chain totals ($24.73, ~64 min). Never mix the
  two scopes in one claim.
- The chain ran on the framework's then-current version; the driver, queue, and handoff mechanics
  shown are real and unchanged in kind.
