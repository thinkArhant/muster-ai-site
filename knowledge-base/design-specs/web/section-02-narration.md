# §2 Narration — the plain-English track

**Surface type**: narration layer of the §2 two-layer replay (copy deliverable)
**Consumers**: Developer (builds these strings verbatim into the narration layer), PM (reviews line by
line against the copy rules), QA (validates sync and fidelity against this file)
**Inherits**: the sync contract, anchors, read windows, and word budgets in `section-02-replay.md` §6.
Nothing here changes a time, an anchor, or a budget.
**Sources**: every factual claim traces to `bodh-sprint4-corpus.md` (founder-authored, read-only) and
is cited per slot below. Copy is governed by `agent-skills/content/copy-rules.md`.

---

## 1. Rules this file is written under

- **Product voice throughout.** §2 is not one of the two permitted first-person places. No "we," "our,"
  or "I" appears in any slot.
- **Compression is permitted; invention is not.** Lines merge and compress corpus facts; no event,
  number, or timestamp is invented. A claim the corpus does not support is cut, not softened.
- **The Safari-only SVG catch is omitted.** It belongs to a founder-directed polish pass at the deploy
  gate, not to this chain, and it has no slot inside the 48 s. Omission is the cleaner of the two
  permitted treatments.
- **Scope discipline**: every number in this file is a website-wave number (~64 min, 8 sessions,
  289 API calls, $24.73). The whole-product aggregates (9.3 h, $147) appear nowhere in §2.
- **Word counting convention** (how the budgets below are measured): words are whitespace-delimited
  tokens containing at least one letter or digit. Numerals and compounds count as one word each —
  `11/11`, `$24.73`, `134`, `date-rotation`, `bodh.day` are one word apiece. Standalone punctuation
  (an em-dash between spaces) counts as zero. Counts below are script-measured, not eyeballed.

## 2. Slot summary

| Slot | Anchor · t | Beat | Budget | Written | Read time @3.5 w/s | Window |
|---|---|---|---|---|---|---|
| SP1 | L2 · 0.35 | B1 | ≤ 21 | 20 | 5.71 s | 6.05 s |
| SP2 | L3 · 6.40 | B2 | ≤ 25 | 20 | 5.71 s | 7.20 s |
| SP3 | L4 · 13.60 | B3 | ≤ 33 | 24 | 6.86 s | 9.60 s |
| SP4 | L5/L6/L7 · 23.20/26.40/29.60 | B4 | ≤ 33 total, ≤ 11 each | 29 (8+11+10) | ≤ 3.14 s each | 3.20 s each |
| SP5 | L8 · 32.80 | B5 | ≤ 23 | 21 | 6.00 s | 6.60 s (closes at L9) |
| SP6 | L10 · 39.75 | B6 | ≤ 12 | 10 | 2.86 s | 3.45 s |
| SP7 | L11 · 43.20 | B6 | ≤ 16 | 15 | 4.29 s | 4.80 s |
| SP8 | L12 · 48.00 | end state | ≤ 35 | 31 | persistent | persistent |

Timed slots total 139 words against the contract's 163-word ceiling. Every slot reads inside its
window at 3.5 words/s. **SP7 landed inside its 16-word budget without going flat — no relief from
SP6 is requested.**

## 3. The narration, slot by slot

Text inside the fences is final and verbatim — punctuation, capitalization, and the literal strings
`bodh.day`, `PASS`, `11/11` included. The Developer renders these exactly.

### SP1 — the setup (anchor L2, t=0.35 · B1 · 20 words)

```
A real run, replayed: Bodh's website wave — one evening, AI agents, unattended. The queue advances; UI/UX files the production spec.
```

| Claim | Corpus source |
|---|---|
| Real run, one evening, unattended | "What Sprint 4 was": planned fully autonomous end-to-end, single human gate at deploy — "It did." |
| Bodh's website wave | Corpus title + "What Sprint 4 was" (the Bodh *website* wave) |
| The queue advances | Terminal L1 (`sprint/auto · queue read`) |
| UI/UX files the production spec | Terminal L2; session row 1 (production spec + assets, HO-027) |

### SP2 — the developer builds (anchor L3, t=6.40 · B2 · 20 words)

```
The developer builds the deployable site — an exact port of the app's date-rotation logic, verified on both sides of UTC.
```

| Claim | Corpus source |
|---|---|
| Deployable site built | Session row 2 ("Deployable `web/`: index + /privacy…") |
| Exact port of the app's rotation logic | Session row 2 ("exact port of the app's rotation logic") |
| The rotation is date math | Session row 7 (rotation re-derived "across 24 dates") — "date-rotation" compresses the two |
| Verified on both sides of UTC | Session row 2 ("rotation parity verified in UTC-positive AND UTC-negative timezones") |

### SP3 — the wow beat (anchor L4, t=13.60 · B3 · 24 words)

```
One agent auditing another: the PM re-checks the developer's work with its own screenshots — never trusting the developer's. Visual parity, rotation, trackers, placeholders. Accepted.
```

| Claim | Corpus source |
|---|---|
| PM re-checks with its own screenshots, never the developer's | Session row 3; DEC-022 ("PM independently re-verifies with its own screenshots, never trusting the developer's"); narration-facts bullet 2 |
| Visual parity, rotation, trackers, placeholders | Session row 3 (the four checked items, verbatim) |
| Accepted | Session row 3 ("Accepted") |

Written at 24 of 33 words deliberately: the dwell was expanded so this fact can be absorbed, not so
more words fit. 6.86 s of reading in a 9.60 s window leaves the air the expansion bought.

### SP4 — three roles, three micro-captions (anchors L5/L6/L7 · B4 · 8 + 11 + 10 = 29 words)

Landing at t=23.20 / 26.40 / 29.60. The split renders on **all** viewports (the contract makes it
optional on desktop; using it everywhere keeps one copy set and one sync behavior).

```
Content polishes the copy — on-voice, one meta-description edit.
```

```
Legal confirms 'Data Not Collected' in code, not in a policy.
```

```
Marketing writes the share card — 134 characters, no competitor mention.
```

| Claim | Corpus source |
|---|---|
| Copy polish, on-voice, one meta-description edit | Session row 4 ("Copy polish: on-voice, ships as-is; one surgical meta-description edit") |
| "Data Not Collected" confirmed in code, not a policy | Session row 5 (privacy verified at code level); narration-facts bullet 4 ("not by reading a policy") |
| Share card, 134 characters, no competitor mention | Session row 6 ("134 chars, on-voice, no competitor mention") |

### SP5 — QA re-derives (anchor L8, t=32.80 · B5 · 21 words)

```
QA doesn't re-run the developer's tests — it re-derives the date math with its own formula, across 24 dates and 3 timezones.
```

| Claim | Corpus source |
|---|---|
| Re-derived with its own formula, not the port's | Session row 7 ("own formula, not the port's"); narration-facts bullet 3 |
| 24 dates × 3 timezones | Session row 7; terminal L8 |

### SP6 — the verdict, and the acceptance (anchor L10, t=39.75 · B6 · 10 words)

```
PASS — 11/11, zero bugs. The PM accepts, the same instant.
```

| Claim | Corpus source |
|---|---|
| PASS, 11/11, zero bugs | Session row 7; terminal L9; DEC-023 |
| The PM accepts | Terminal L10; session row 8 ("All handoffs accepted") |
| The same instant | L9 and L10 share the `21:35` stamp; session row 8 starts at 21:35:09, exactly session 7's start plus its measured duration (derivation shown in `section-02-beat-inventory.md`, D7) |

### SP7 — the operator's arc, at the gate (anchor L11, t=43.20 · B6 · 15 words)

```
The operator planned the sprint, left the agents running, and returns to a deploy-ready site.
```

| Claim | Corpus source |
|---|---|
| The operator planned the sprint | "What Sprint 4 was" ("Planned to run **fully autonomous** end-to-end … with a **single human gate at deploy**"); DEC-019 ("Sprint 4 authored to run end-to-end autonomously with a single `Role: halt` at deploy") |
| Left the agents running — the chain ran unattended | "What Sprint 4 was" ("It did."); narration-facts bullet 1 ("No human touched this until the deploy button" — true for THIS chain, sessions 1–8, single halt) |
| Returns — the gate waits on the operator | Terminal L11 (`Role: halt · awaiting operator`); session row 8 ("Run stops itself: `Role: halt` — the deploy gate is the founder's") |
| A deploy-ready site | Session row 8 ("founder deploy packet assembled"); session row 2 ("Deployable `web/`: index + /privacy…") |

Fifteen words read in 4.29 s of the 4.80 s hold. The line is the page's thesis, told as the arc the
reader has just watched: the operator plans, leaves the agents to run, and the terminal it lands on
reads `awaiting operator`. The tense turn — planned, left, *returns* — is the gate itself: everything
before the comma is done, and the one human act left is the deploy. "Deploy-ready" is the packet's
state, not praise; the deploy itself is SP8's fact, three days later, so nothing here attaches the
deploy to the chain's end. The seed's honest-headline fact — no human touched the chain until the
deploy gate — is carried whole, stated as what the operator did rather than what no one did. The
12-word relief available in SP6 is not needed.

### SP8 — end state (anchor L12, t=48.00 · persistent · 31 words)

```
bodh.day, live. The deploy landed three days later — the gate waited on Apple. This wave: 64 minutes of agent work across 8 sessions, 289 API calls, $24.73 at API list price.
```

| Claim | Corpus source |
|---|---|
| bodh.day live | Terminal L12; DEC-027; deploy line ("`bodh.day` live 2026-07-18") |
| Three days later — the gate waited on Apple | Terminal-inventory note ("the deploy line is three days later in reality — the gate waited on Apple"); chain date 2026-07-15 vs deploy 2026-07-18 |
| 64 minutes of agent work across 8 sessions | Chain totals; the corpus-sanctioned phrasing (per copy-rules R2 — agent-work framing, never wall-clock, deploy explicitly detached) |
| 289 API calls, $24.73 at API list price | Chain totals ("289 API calls · $24.73 at API list price"); per-session columns tile both totals exactly |

## 4. Beat display names

For the beat indicator (`BEAT 03 / 06 · PM RE-VERIFIES`) and the active-entry beat tags. Uppercase,
≤ 3 words each:

| Beat | Display name |
|---|---|
| B1 | `QUEUE ADVANCES` |
| B2 | `DEVELOPER BUILDS` |
| B3 | `PM RE-VERIFIES` |
| B4 | `THREE HANDOFFS` |
| B5 | `QA FULL VALIDATION` |
| B6 | `THE HUMAN GATE` |

## 5. Section chrome copy (Content-owned strings in §2)

- **Section heading (`<h2>`)**: `§02 · WATCH IT SHIP` — confirmed final.
- **Terminal chrome label, ≥ `--bp-wide`**: `BODH · SPRINT 4 — CONDENSED FROM THE REAL BUILD LOG`
- **Terminal chrome label, < `--bp-wide`**: `CONDENSED FROM THE REAL BUILD LOG`
  (the required label is present verbatim in both forms, always visible)
- **Live indicator word**: `RUN` (pairs with the pulse dot — colour is not the sole channel)
- **Chain totals strip, line 1**: `~64 MIN AGENT WORK · 289 API CALLS · $24.73`
- **Chain totals strip, line 2 (scope label, mandatory)**: `BODH SPRINT 4 · WEBSITE WAVE ONLY`
- **Controls**: `⏭ SHOW FULL LOG` during playback · `⟲ REPLAY` in the end state (as spec'd)

The totals strip uses the corpus's own agent-work framing with the tilde preserved (`~64 MIN`), and
its scope label rides directly beneath the values — the strip never renders without it.

## 6. End-state grouping (reduced-motion / no-JS transcript)

The complete-transcript views group narration by beat, in this order, under the beat display names:
B1 — SP1 · B2 — SP2 · B3 — SP3 · B4 — the three micro-captions in landing order · B5 — SP5 ·
B6 — SP6, then SP7 · then SP8 with the L12 terminal treatment. Reading the static transcript top to
bottom reproduces the playback's argument without motion.

## 7. Verification statement

The corpus was read only — not edited, reformatted, extended, or regenerated. Every claim above cites
its corpus source in place; no claim rests on material outside the corpus. Word counts were measured
by script under the convention in §1. The whole-product aggregates (9.3 h, $147) do not appear in any
slot. "Measured" language is used nowhere near "proven." No exclamation marks, no banned adjectives,
no rounded or precision-inflated numbers: `$24.73`, `289`, `11/11`, `134`, `24`, `3`, `8`, and
`~64`/`64 minutes of agent work` are exactly as the corpus states them.
