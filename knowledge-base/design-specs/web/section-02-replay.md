# §2 — Watch It Ship: the two-layer replay

**Surface type**: page section (§2 of 6) — the page's centerpiece and highest-risk asset
**Consumers**: Content (writes narration against §6's sync contract), Developer (builds playback from §5–§10), QA (derives validation scope from this file directly)
**Inherits**: every token in `page-shell.md`. No new colours, sizes, or motion tokens are introduced here.

**The acceptance bar this spec is built to**: the replay must stand on pacing and plain-English narration alone, independent of the visual frame. It is judged with the styling mentally subtracted. Timing is therefore specified to the hundredth of a second — pacing is a design decision, not a developer guess. A non-technical reader follows the narration; a technical reader reads the terminal lines; both reach `bodh.day · LIVE`.

---

## 1. Sources and fidelity rules (binding)

- **Every rendered character comes from `bodh-sprint4-corpus.md`** (founder-authored, read-only). The terminal layer renders the corpus's twelve terminal-inventory lines **verbatim** — never edited, paraphrased, truncated, or reconstructed. Line handles `L1`–`L12` below are the index defined in `design-specs/web/section-02-beat-inventory.md`; render from the corpus, never from the inventory or from this file.
- **Displayed timestamps are the corpus's minute-precision forms** (`20:38` … `21:43`), exactly as printed. Second-precision timestamps are pacing input only and never reach the page. Every `t=` value in this spec is a playback offset — a design parameter, not content.
- **The section carries the label "condensed from the real build log"** in the terminal chrome, always visible. That label is what licenses non-linear compression.
- If any line the layout calls for is missing from the corpus, building halts to PM — nothing is invented to fill a gap.
- Copy in every slot is governed by `agent-skills/content/copy-rules.md`; scope labels per `product-spec.md` §8.

## 2. What the section is

A two-layer annotated replay of Bodh's Sprint 4 website wave — a real autonomous run: eight sessions, one evening, a single human gate at deploy, ending live at `bodh.day`.

- **Terminal layer** (mono): the twelve real log lines appearing on a replay schedule.
- **Narration layer** (sans, full-ink): synchronized plain English for the non-technical reader.

The viewer watches Muster do exactly what produced the page they are on.

## 3. Content hierarchy

1. The narration + terminal beat currently playing (the two layers are one idea at a time)
2. The "condensed from the real build log" label — the honesty anchor
3. The ending: `bodh.day · LIVE` — the shipped artifact
4. Beat position indicator (`BEAT 03 / 06`)
5. Chain totals readout (scope-labelled, static, present from load — never revealed on a schedule)
6. Replay controls

**On small viewports the two layers are not equal.** The terminal is texture and the narration is the payload — the reader who cannot fit both at full size is exactly the non-technical reader the narration layer exists for. When space runs out, the terminal loses height; the narration card does not, and fidelity never does (§7.1).

## 4. Real timing (the measured input)

Beat durations derive from the corpus session-start timestamps; the chain end is the corpus's measured `21:43:15` (v1.1 "Measurement precision notes"), giving a chain of **3858 s (64 m 18 s)**:

| Beat | Content | Lines | Real duration | Real share |
|---|---|---|---|---|
| B1 | Queue advances → UI/UX files spec + assets | L1, L2 | 454 s | 11.8% |
| B2 | Developer productionizes the site | L3 | 786 s | 20.4% |
| B3 | **PM independently re-verifies — own screenshots** | L4 | 441 s | 11.4% |
| B4 | Content → Legal → Marketing validate | L5, L6, L7 | 824 s | 21.4% |
| B5 | QA full validation — PASS, 11/11 | L8, L9 | 867 s | 22.5% |
| B6 | Run halts itself → human gate → deploy | L10, L11, L12 | 486 s | 12.6% |

Hazards this spec designs around (from the beat inventory):
- L9 and L10 are the **same instant** (QA's PASS and PM's acceptance) — no visible gap, never merged. Same rule, lower stakes, for L1/L2.
- B5 + B2 hold ~43% of the real clock — linear playback stalls there.
- B3 is the most important beat and the **shortest** — real-proportional pacing starves it.
- L12 sits **outside the chain's clock**: deploy landed 2026-07-18, three days after the 2026-07-15 chain, because the gate waited. Nothing may imply deploy closed the run at 21:43.

## 5. Designed timing (the pacing decision)

**Model: fixed 48-second chain, comprehension-weighted.** Real-proportional compression is the honest default, deviated from deliberately, beat by beat, where comprehension needs air — and each deviation is stated against the real share. The always-visible "condensed" label plus the real clock stamps on every line keep the compression honest: the real durations remain readable in the data itself.

Chain playback: **48.00 s** (compression ≈ 80:1 — roughly four real minutes per three seconds). Terminal state (L12) sits outside the 48 s, exactly as the real deploy sat outside the chain.

| Beat | Dwell | Design share | Real share | Deviation rationale |
|---|---|---|---|---|
| B1 | 6.40 s | 13.33% | 11.8% | Near-proportional; two lines + orientation |
| B2 | 7.20 s | 15.00% | 20.4% | Compressed — one line; narration carries the content |
| B3 | **9.60 s** | **20.00%** | 11.4% | **The wow beat, expanded ~1.75×.** The replay's most important fact gets its longest single dwell |
| B4 | 9.60 s | 20.00% | 21.4% | Proportional; three roles land on a steady 3.2 s cadence |
| B5 | 6.95 s | 14.48% | 22.5% | Compressed, but the least it can be. Two lines carrying two claims — QA re-derived the date math with its own formula, and 11/11 PASS. The first is what makes the second credible to a reader who discounts assertions, so the beat is not squeezed to the point where only the verdict survives |
| B6 | 8.25 s | 17.19% | 12.6% | Expanded. The run stopping itself at a human gate is the product's thesis — the held silence is the point. Funds B3's expansion, which is why it is expanded less than the beat it pays for |

Dwells tile to exactly 48.00 s (6.40 + 7.20 + 9.60 + 9.60 + 6.95 + 8.25); design shares sum to 100.00%.

### 5.1 Playback schedule (authoritative — offsets in seconds from chain start)

| t | Event | Notes |
|---|---|---|
| 0.00 | L1 reveals | `20:38 · muster` — replay begins on autoplay trigger (§8) |
| 0.35 | L2 reveals | Same-stamp pair: one `--reveal` cadence after L1 — reads as the same moment, stays two lines |
| 6.40 | L3 reveals | B2 opens |
| 13.60 | L4 reveals | **B3 opens — key-beat emphasis (§9) on the re-verify line** |
| 23.20 | L5 reveals | B4 opens |
| 26.40 | L6 reveals | |
| 29.60 | L7 reveals | |
| 32.80 | L8 reveals | B5 opens — QA working line; the ellipsis hangs for 6.60 s, the third-longest interval in the chain, behind L4→L5 (9.60 s) and L3→L4 (7.20 s) |
| 39.40 | L9 reveals | PASS — key-beat emphasis |
| 39.75 | L10 reveals | **Zero-gap rule**: one `--reveal` cadence after L9, identical `21:35` stamp — simultaneous, distinct. B6 opens |
| 43.20 | L11 reveals | `Role: halt · awaiting operator` — the cursor sits and blinks |
| 43.20 → 48.00 | **The gate hold** | 4.80 s in which the terminal does nothing at all — the only stretch of the chain with no event in it. B6 opens on the chain's fastest interval (the 0.35 s L9/L10 pair) and closes on this hold: a 13.7× spread inside one beat, and that deceleration is what marks the hold as a stop rather than a gap |
| 48.00 | Divider + L12 | Terminal state, **outside the chain clock**: the corpus's `─────` divider, then `deploy · bodh.day · LIVE` at large scale (§9), no timestamp. The "three days later" fact lands in the caption slot (§6, SP8) |

**Pair separation does not scale.** L1/L2 and L9/L10 are separated by exactly one `--reveal` cadence — 0.35 s, the shell's token — at any chain length. It is a structural rule about simultaneity, not a share of the clock, so it is the one offset in this table that is not derived from a beat dwell.

Cadence rules for the Developer: line reveals use `--reveal` (350 ms, opacity + 4px rise — the shell's single micro-reveal token); the same-stamp pairs use exactly one cadence of separation; no other easing, and no *animated* scrolling anywhere.

**Line persistence** — a desktop guarantee with a stated small-viewport equivalent:

- **≥ `--bp-wide`**: all twelve lines fit the terminal without scrollback. Every revealed line stays visible from its reveal to the end state; nothing moves once placed.
- **< `--bp-wide`**: the terminal is a window of *N* whole lines (§7.1 derives *N* per viewport — **3 at the 375 × 553 budget case**), showing the most recent *N* revealed lines. A line that wraps counts as one line and is shown whole or not at all; the window never clips a line part-way through its rows. Persistence is preserved in two weaker but real senses: every revealed line remains in the DOM and rendered for the whole playback, and every one stays reachable by scrolling the terminal's own vertical overflow. What is not preserved is *simultaneous visibility* of all twelve — that is the cost of the narration card holding its place on screen and of every line reading complete without a sideways gesture, and it is the right cost to pay (§7.1).
- The window advances by whole lines as an instant position change (`scroll-behavior: auto`), never an animated scroll. The reveal itself is still opacity-only, so a line occupies its rows from load and nothing reflows when it is revealed.

## 6. Narration sync contract

Narration slots are pinned to line reveals. Content writes to these slots; the Developer triggers each slot at its anchor's reveal. Word budgets derive from time-to-next-slot at ~3.5 words/s — a budget overrun is a spec violation, not a style choice, because it breaks the pacing this section is judged on.

| Slot | Anchor / t | Read window | Word budget | What the slot must carry (brief to Content) |
|---|---|---|---|---|
| SP1 | L2 · 0.35 | 6.05 s | ≤ 21 | The setup: a real run, one evening, the queue advances; UI/UX files the production spec |
| SP2 | L3 · 6.40 | 7.20 s | ≤ 25 | Developer productionizes — real handoff, timezone-parity detail available if it fits |
| SP3 | L4 · 13.60 | 9.60 s | ≤ 33 | **The wow beat, fullest narration**: the PM re-checked the developer's work with its own screenshots — never trusting the developer's |
| SP4 | L5 · 23.20 | 9.60 s | ≤ 33 total | Content → Legal → Marketing each validate and hand off. Splits into three ≤ 11-word micro-captions landing at 23.20 / 26.40 / 29.60 — optional on desktop, **required on mobile**, where the caption card shows one entry at a time |
| SP5 | L8 · 32.80 | 6.60 s | ≤ 23 | QA re-derives the date math with its own formula — 24 dates × 3 timezones. This is the claim that earns "zero bugs" rather than asserting it, so the budget is deliberately generous for a two-line beat |
| SP6 | L10 · 39.75 | 3.45 s | ≤ 12 | PASS, zero bugs, 11/11; the PM accepts — same instant, both true |
| SP7 | L11 · 43.20 | 4.80 s | ≤ 16 | **The honest headline lands here, at the gate**: no human touched this until the deploy button. The run stops itself |
| SP8 | L12 · 48.00 | persistent | ≤ 35 | `bodh.day`, live — and the honest scope: deploy landed three days later; the gate waited. Chain totals framing per copy-rules (exact numbers, wave scope only) |

Read windows run anchor-to-next-anchor, with one deliberate exception: **SP5's window closes at L9** (39.40), not at SP6's anchor, because the PASS line landing is the visual event that ends the QA suspense. The seven timed budgets total 163 words against a 168-word ceiling at 48 s × 3.5 w/s.

Slot behavior: **desktop** — entries accumulate in the narration rail, all full-ink once revealed; the active entry carries a 2px `--accent` left bar + its beat tag; the rail never dims past entries (full-ink rule). **Mobile** — the current entry renders in a fixed-height caption card that holds its place on screen for the whole playback, replaced per slot; the complete list renders in the end state. The card's height is budgeted for the longest slot (§7) and never reflows between slots.

Beat indicator: `BEAT 03 / 06 · PM RE-VERIFIES` — `--text-label`, `--muted`, above the narration layer, updates as each beat opens. Beat display names are Content's (≤ 3 words each, uppercase).

Every narration claim must trace to a corpus line (Content cites; QA diffs). The Safari-only SVG catch is either absent or explicitly a founder-directed polish pass — it does not belong to this chain and has no slot inside the 48 s.

## 7. Layout

### Wireframe — desktop (1280px)

```
──┤ §02 · WATCH IT SHIP ├──────────────────────────────────── (1) h2 tag + rule
   BEAT 03 / 06 · PM RE-VERIFIES                              (2) beat indicator
  ┌──────────────────────────────────┐  ┌───────────────────┐
  │ + TERMINAL                     + │  │ NARRATION RAIL    │
  │ ○ BODH · SPRINT 4 — CONDENSED    │  │                   │
  │   FROM THE REAL BUILD LOG  ● RUN │  │ ▌N1 …setup…       │ (5) accumulated,
  │──────────────────────────────────│  │  N2 …developer…   │     full-ink
  │ 20:38  muster   sprint/auto · …  │  │ ▌N3 …the PM re-   │ (6) active = rust
  │ 20:38  ui-ux    production spec… │  │    checked with   │     bar + tag
  │ 20:46  dev      web/ built · …   │  │    its own        │
  │ 20:59  pm ✓     independent re-… │◄─┼── (4) key-beat    │
  │ █                                │  │    screenshots…   │
  │                                  │  │                   │
  │ (revealed lines persist;         │  │ (rail follows     │
  │  12 lines fit, no scrollback)    │  │  active entry)    │
  └──────────────────────────────────┘  └───────────────────┘
   ~64 MIN AGENT WORK · 289 API CALLS · $24.73  ⏭ SHOW FULL LOG (7)(8)
   BODH SPRINT 4 · WEBSITE WAVE ONLY
```

Two columns above `--bp-wide`: terminal ~60% / narration rail ~36ch, `--gap-block` between. Terminal height fixed to fit all twelve lines + chrome (no scrollback, no layout shift as lines reveal — lines occupy space from load; reveal is opacity only).

**The desktop terminal is at least 74 columns at every width from `--bp-wide` up**, which is what makes the twelve-lines-fit guarantee hold: the rail takes a fixed width rather than a share, so the terminal's line region measures **78 columns at `--bp-wide` and 79 from ~1200px up** at `--text-terminal` (a `0` advance of 7.847px at 13px). The longest corpus line (L3) is 74 characters. Every line therefore sets one row on desktop, the wrap rule in §7.1 is inert there, and nothing scrolls in either axis. **Any change that makes the terminal column proportional rather than fixed puts this guarantee at risk and must re-derive it at `--bp-wide`, not at 1280px.**

Everything above §7.1 is the desktop layout and applies only at `--bp-wide` and wider.

### 7.1 Mobile: narration-first (< `--bp-wide`)

**The terminal is texture on mobile; the narration is the payload.** The small-viewport reader is the non-technical reader the narration layer exists for, so when the viewport cannot hold both layers at full size, the terminal gives up height — never the narration card, and never fidelity.

Three rules follow from that priority. Together they resolve a real collision: a fixed twelve-line terminal, a no-truncation rule, a no-sideways-gesture rule, and a 375px viewport cannot all be satisfied at once. The fixed terminal is what gives — a phone reader gets fewer log lines, and every one of them reads complete.

1. **Lines soft-wrap. They never truncate and they never scroll sideways.** The line region is `white-space: pre-wrap` — which preserves the corpus's own inter-column padding exactly while permitting a break at a space — with a **2ch hanging indent** (`padding-inline-start: 2ch; text-indent: -2ch`) so a continuation row is visibly a continuation and cannot be misread as a new log entry. Neither the terminal's own region nor the page body scrolls horizontally, at any viewport.

   **Wrapping is not a fidelity cost, and that is the whole reason it is the payer.** A soft wrap inserts no character and removes none: the rendered text still diffs byte-clean against the corpus, where truncation and ellipsis would not. `overflow-wrap: break-word` is set as a backstop only — the longest token in the corpus is 18 characters against a narrowest specified column of 34, so it never fires; if a future line did force it, a broken token is still preferable to an overflow.

   At 375px the terminal's line region measures **325px — 41 characters** at `--text-terminal`. Eleven of the twelve corpus lines are longer than that, so on a phone **every log line but the terminal-state line sets exactly two rows**. That constant is what makes the window below deterministic, and it is measured, not assumed.

2. **The terminal is a window of *N* whole lines**, showing the most recent *N* revealed lines, with *N* derived per viewport from the budget below. A wrapped line is one line: it is shown whole or not at all, never clipped part-way through its rows. Earlier lines scroll up out of the window and stay reachable in the terminal's own vertical overflow (§5.1).

3. **The playback core fits the viewport by construction.** Beat indicator + terminal + narration card form one flex column with `max-height: calc(100dvh - 3rem)` (the sticky status bar). The terminal window is the flex remainder, quantised down to whole wrapped lines. Both layers are therefore on screen together whenever the core is on screen, which §8 makes a precondition of playback rather than a hope.

   **The chain totals strip sits immediately below the core, not inside it.** It is static evidence, not a playback layer — it reads identically before, during and after the chain, and the two-layer guarantee is about the terminal and the narration, which are the two layers. Lifting it out of the core is what pays for the wrap: 45.0px, or nearly two line boxes, bought back from the item §3 ranks lowest of the three.

**Mobile height budget — the assumed viewport is 375 × 553**, an iPhone SE in mobile Safari with the toolbars shown. That is the *visual* viewport, not the 667px device height: budgeting against device height would assert a fit the reader never sees.

| Item | Derivation | px |
|---|---|---|
| Sticky status bar | shell §9, `height: 3rem` | 48.0 |
| Beat indicator | `--text-micro` 11px × 1.5 | 16.5 |
| Indicator → terminal gap | `--gap-hairline` | 12.0 |
| Terminal chrome bar | 16.5 + 12 + 12 pad + 1px rule | 41.5 |
| Terminal body padding | 12 + 12 | 24.0 |
| Terminal borders | 1 + 1 | 2.0 |
| Terminal → card gap | `--gap-flow` (see note) | 24.0 |
| Narration card | 6 × (`--text-body` 17px × 1.7 = 28.9) + 24 pad + 2 border | 199.4 |
| Bottom clearance | `--gap-hairline` | 12.0 |
| **Fixed core** | everything except log lines | **379.4** |

One `--text-terminal` line box is 24.7px (13px × 1.9); at 375px and wider one wrapped corpus line is **two** of them, 49.4px. The window is therefore sized in whole lines, not in rows:

**Visible lines = `floor((visual viewport height − 379.4) / 49.4)`, clamped to [2, 12]**, and the terminal's line region is that many × 49.4px.

| Viewport | Visual VH | Columns | Visible lines | Core used | Slack |
|---|---|---|---|---|---|
| 375 × 553 — iPhone SE, Safari, toolbars shown (**the budget case**) | 553 | 41 | **3** | 527.6 | 25.4 |
| 360 × 640 — small Android portrait | 640 | 39 | 5 | 626.4 | 13.6 |
| 393 × 659 — Pixel 8, Chrome, toolbars shown | 659 | 43 | 5 | 626.4 | 32.6 |
| 390 × 664 — iPhone 15, Safari, toolbars shown | 664 | 43 | 5 | 626.4 | 37.6 |
| 375 × 667 — SE with toolbars hidden | 667 | 41 | 5 | 626.4 | 40.6 |

Columns are `floor((viewport width − 48 gutter − 2 border) / 7.847)`. **At 375px and wider the line count above is exact**, because every corpus line costs exactly two rows there. **Below 375px it is a ceiling**: at 320px the region is 34 columns and the longest lines cost three rows, so the window shows 2 whole lines rather than 3. 320px sits below the width any row of this budget is derived at, and the two-line floor is what the clamp guarantees there.

**The guarantee holds down to 478.2px of visual viewport height** (379.4 + 2 wrapped lines). Below that the core cannot fit and the priority order decides what goes: the beat indicator drops first, then the terminal falls to a single wrapped line. The narration card is the last thing standing.

Three notes on the budget itself. The terminal → card gap is `--gap-flow` rather than `--gap-block`: on mobile the two layers are one idea at a time (§3), so the tighter rhythm is what the content means, and the section's spaciousness is carried by `--gap-section`, which is untouched. `--text-terminal` stays 13px on every viewport, with no small-screen step down — the type scale is the one payer this section will not spend, because fitting the longest line on one row needs roughly a 5px font and legibility fails long before the budget does. And the 25.4px of slack at the budget case is deliberate margin, not room to spend: `100dvh` behaviour in mobile Safari is the mechanism this entire budget rests on, and it is the one behaviour no harness in this project can prove.

**Why three complete lines is the right shape, stated so the trade can be checked.** Eleven of the twelve corpus lines are longer than the 41 columns a 375px phone gives, so a phone that does not wrap can show no complete line at all — only the first 41 characters of each. Three wrapped lines put about 170 characters on screen where five clipped ones put about 205, and every one of the 170 belongs to a line the reader can finish. The section's claim is that these are the real log lines; a line the reader cannot reach the end of does not carry that claim, however many of them are on screen.

### Wireframe — mobile (375 × 553)

```
   BEAT 03 / 06 · PM RE-VERIFIES              beat indicator
  ┌─────────────────────────────────┐
  │ ○ CONDENSED FROM THE REAL       │
  │   BUILD LOG               ● RUN │
  │─────────────────────────────────│
  │ 21:06  content  copy on-voice · │  windowed: last 3 revealed
  │   one meta edit · HO-029        │  lines, each wrapping to two
  │ 21:11  legal    data-not-       │  rows. Continuation rows are
  │   collected · confirmed at code │  indented 2ch. Nothing is
  │   level · HO-030                │  truncated and nothing scrolls
  │ 21:16  mkt      share card      │  sideways — the line region is
  │   written · HO-031              │  41 characters wide here
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ ▌ N3 — the PM re-checked the    │  narration card: fixed
  │   developer's work with its     │  6-line height, holds its
  │   own screenshots, never        │  place on screen for the
  │   trusting the developer's.     │  whole playback
  │                                 │
  └─────────────────────────────────┘
  ─ ─ ─ ─ ─ ─ fold at 553px ─ ─ ─ ─ ─
   ~64 MIN AGENT WORK · 289 API CALLS ·  totals strip, static, present
   $24.73                                from load. Sits BELOW the core
   BODH SPRINT 4 · WEBSITE WAVE ONLY     — it is evidence, not a layer.
                                         Two lines, both --text-micro;
   ⏭ SHOW FULL LOG                       line 1 must not wrap to a third

                                         controls below the strip; not
                                         part of the two-layer guarantee
```

The section `<h2>` and `--gap-section` padding sit above the core and scroll away as the reader arrives — the core is what must be simultaneously visible, not the whole section.

The wrapped rows above are illustrative of the shape, not of where the break falls: the break point is whatever the 41-character region produces, and the rendered characters are the corpus's, unchanged.

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Section tag | Shell motif — `<h2>` `§02 · WATCH IT SHIP` (final wording: Content) |
| 2 | Beat indicator | `--text-label` `--muted`; updates per beat; `aria-hidden` (state is announced by content itself, §11) |
| 3 | Terminal | `--surface`, 1px `--hair` border, sharp corners, registration `+` marks at two corners. Chrome bar: `--text-micro` label + live indicator (the shell's pulse dot — motion element 2's terminal instance) |
| 4 | Log lines | `--text-terminal`. Stamp `--muted` · role `--ink` · detail `--ink` (the log is content here, not ambience) · key-beat emphasis per §9. `<ol>`, one `<li>` per corpus line. `white-space: pre-wrap` with a 2ch hanging indent at every viewport (§7.1 rule 1) — inert on desktop, where no line reaches the column width |
| 5 | Narration entries | `--text-body`, `--ink` always (never muted, never dimmed). Sans — the plain-English track is visually the *readable* layer against the mono terminal |
| 6 | Active marker | 2px `--accent` left bar + beat tag `--text-micro` `--muted`. Position/shape channel — colour is not the sole indicator |
| 7 | Chain totals readout | Shell readout-cell motif, static values present from load (no count-up here — §2's numbers are evidence in a log context; count-up stays on §1/§5 readouts). Scope label `--text-micro` `--muted` mandatory. **Position is per-viewport**: inside the two-column core at ≥ `--bp-wide`; immediately below the playback core under it, where it is evidence rather than a playback layer (§7.1 rule 3). **Value scale is per-viewport**: `--text-readout` at ≥ `--bp-wide`, where the column has the room; `--text-micro` below it, on width — the value string is 43 characters against a 327px column at 375px, and it must set on one line without wrapping to a third strip row. Where this row and §7.1 disagree, §7.1 wins — the mobile guarantee rests on that budget. Copy: the strings in `section-02-narration.md` §5, which is authoritative for §2's chrome, per copy-rules (exact numbers; wave scope; never wall-clock framing) |
| 8 | Controls | Ghost buttons, `--text-label`, `--hair` border, `--ink` text, 44px hit area. `⏭ SHOW FULL LOG` during playback → `⟲ REPLAY` in end state |

## 8. States

| State | Behavior |
|---|---|
| **Idle (above the fold not yet reached)** | All 12 lines + all narration present in DOM, visually unrevealed (opacity). No timers running |
| **Playback** | Autoplays **once per page load** on a visibility trigger, then follows §5.1. **≥ `--bp-wide`**: starts at 50% terminal visibility, pauses if the section goes >50% out of viewport. **< `--bp-wide`**: starts at **≥95% visibility of the playback core** and pauses below 90% — the tighter threshold is what makes "both layers visible during playback" a guarantee rather than a hope, since the core is sized to fit the viewport (§7.1). Either way it resumes where it left off, and pauses when the document is hidden |
| **End state** | Complete log + divider + L12 at scale + full narration list (mobile included) + `⟲ REPLAY` control. This is also the state a returning scroller finds — the section never re-plays uninvited |
| **Skip** | `SHOW FULL LOG` jumps to the end state instantly at any point |
| **Reduced motion** | No playback, no reveals, no autoplay: the complete annotated transcript renders immediately — all 12 lines, all narration grouped by beat, L12 terminal treatment, totals readout. Complete content, not a degraded subset. Controls are absent (nothing to control) |
| **No JS** | Identical to reduced motion — the DOM is the transcript; playback is pure enhancement |

## 9. Emphasis system (terminal layer)

Derived from the shell's measured rust rules — rust at 13px would sit below AA small-text in dark theme, so key-beat emphasis never relies on small rust text:

- **Key-beat lines (L4, L9)**: role token and verdict word (`pm ✓` / `PASS`) in **bold `--ink`**; the glyph mark (`✓`) in `--accent` (graphical, ≥3:1 ✓); a 2px `--accent` left tick on the line. Fact in ink at AA, rust as the flag.
- **L12 (terminal state)**: rendered at `1.25rem` bold — large-text class — so `bodh.day · LIVE` may set in `--accent` at AA-large (3.86/4.89 ≥ 3:1 ✓ both themes). The ending gets scale as well as colour; text content stays verbatim corpus.
- **All other lines**: stamp `--muted`, content `--ink`. No other colour appears in the log.

## 10. Responsive behavior

- **≥ `--bp-wide`**: two-column layout per wireframe. Rail scrolls its own overflow only if narration exceeds terminal height (it should not at spec'd budgets — verify).
- **< `--bp-wide`, portrait**: stacked, narration-first, per §7.1 — windowed terminal of whole lines, soft-wrap with a 2ch hanging indent, no horizontal scrolling in any region, fixed-height caption card, totals strip below the core. **Truncation and ellipsis remain forbidden**: every rendered character must diff byte-clean against the corpus, and soft-wrap is precisely what preserves that, because it adds and removes nothing.
- **Landscape phone (667×375): two columns, and the terminal takes the wider one.** The stacked layout cannot hold here — measured by the same method as §7.1, Safari's landscape toolbars leave ~331px of visual viewport, so the stacked core overflows before a log line is placed. **The column split is set by the wrap rule, not by a share**: the terminal column is sized so its line region is at least 41 characters (321.7px at `--text-terminal`), which is **324px** of the 600.3px content width at 667px — about 54% — leaving the narration ~252px, about 42%, at ~29 characters per line. This inverts the portrait priority for one reason and it is a width reason, not a rank reason: width is the only thing that decides whether a log line reads without a gesture, whereas narration set narrower simply runs taller, and height is what landscape has to spare. The vertical budget is 331 − 48 status bar − 28.5 indicator − 12 clearance = **242.5px per column**: the terminal spends 58 chrome + 2 border + 24 padding + 148.2 lines = 232.2px, giving **3 visible terminal lines** with 10.3px spare, and the worst-case narration slot sets 7 lines ≈ 228.3px with 14.2px of slack. Both columns fit; the totals strip sits below the core as it does in portrait. Narration-first survives the rotation as a priority; the stacking does not.
- iPad portrait: single column at wider gutter, and the §7.1 core comfortably fits — two-column engages only above `--bp-wide`.
- 200% zoom: reflows to the stacked layout. **Nothing scrolls horizontally anywhere — not the page body, not the terminal.** §2 claims no WCAG 1.4.10 exception: the log wraps like any other text, and the stamp/role/detail alignment that makes it readable as a log survives because the wrap is a soft break at a space with a hanging indent, so every entry still opens on its own timestamp. Where the zoomed visual viewport falls under 478.2px, §7.1's priority order applies and the beat indicator drops before the terminal does.

## 11. Accessibility

- Section: `<section aria-labelledby="s2-heading">`; terminal `<ol>` labelled "Build log, condensed from the real build log"; narration `<ol>` labelled "Narration".
- **No `aria-live` during playback** — the full transcript is in the DOM from load, so screen readers read the complete content in document order without twelve timed interruptions. The reveal is visual-only (`opacity`), never `display:none`/`visibility:hidden` (which would hide content from AT), and never DOM insertion.
- Controls are `<button>`s with visible focus rings and 44px targets; the replay never traps focus or scroll.
- **The terminal's scroll container is keyboard-operable** (WCAG 2.1.1): on viewports where the window holds fewer than twelve lines it carries `tabindex="0"` and its own accessible name, so arrow keys reach the earlier lines above the window. It scrolls in one axis only — there is no horizontal scroll to reach — and it takes a visible focus ring like any other focusable element.
- Playback pauses on `visibilitychange` — no motion runs unwatched.
- `bodh.day` in SP8/L12 context may link out (plain `<a>`, no prefetch — zero runtime requests holds until a user navigates).
- Colour-alone check: beats are indicated by text (indicator, tags); key beats by weight + glyph + tick; the live dot pairs with the "RUN" word.

## 12. Developer/QA fidelity checklist

- [ ] Every rendered log line diffs byte-clean against the corpus terminal inventory (QA blocking on any delta)
- [ ] Only minute-precision timestamps appear anywhere in the DOM; no `t=` offset, no second-precision value, no derived duration renders
- [ ] "Condensed from the real build log" label always visible in terminal chrome
- [ ] L9→L10 and L1→L2 reveal at exactly one `--reveal` cadence; identical stamps rendered on both lines of each pair
- [ ] Gate hold: no event fires between t=43.55 (L11 reveal completes) and t=48.00 except the cursor blink
- [ ] Beat dwells tile to exactly 48.00 s; measured line-reveal offsets match §5.1 to ±100 ms
- [ ] L12 renders after the corpus divider, unstamped, outside the 48 s chain; the three-days-later fact appears in SP8
- [ ] Reduced-motion and no-JS paths render the complete transcript (12 lines + all narration + totals)
- [ ] Replay plays once per load; skip and replay controls work by keyboard
- [ ] Zero external requests during and after playback (product claim)
- [ ] Cross-engine: WebKit **and** Blink, playback timing and both themes — evidence per engine
- [ ] Narration word counts within §6 budgets (measured, not eyeballed)
- [ ] **Mobile, at 375×553**: terminal window shows 3 whole lines; narration card and terminal are both fully visible for the entire playback; core height measured ≤553px including the sticky bar
- [ ] **No corpus line requires a horizontal gesture to read in full** at 320 / 360 / 375 / 390 / 393px — every line's last character is on screen once its rows are
- [ ] **Mobile fidelity**: no truncation, no ellipsis, no re-flowing of the corpus's own inter-column padding. Soft-wrap inserts and removes no character — each line's text content still diffs byte-clean
- [ ] Continuation rows carry the 2ch hanging indent; no continuation row can be mistaken for a new entry (no row but an entry's first begins at the left edge)
- [ ] **Nothing scrolls horizontally** — neither the page body nor the terminal's own region — at 375px, 320px, and 200% zoom
- [ ] The window never clips a wrapped line part-way through its rows
- [ ] The totals strip renders below the playback core on mobile, above it in the desktop two-column layout, and its value line never wraps to a third strip row
- [ ] Desktop is unchanged: the terminal's line region measures ≥74 columns at `--bp-wide` and above, no line wraps, and all twelve fit without scrollback
- [ ] Landscape phone (667×375) renders the two-column arrangement with the terminal in the wider column at ≥41 characters, 3 terminal lines visible
- [ ] The terminal scroll container is focusable and arrow-key scrollable in the vertical axis, with an accessible name

## 13. Provenance

From the seed (locked): the two-layer structure, the six-beat sequence, the "condensed" label, the honest-beat requirement, the no-overclaim boundary, scripted HTML/CSS/JS with no tooling dependency, ending on `bodh.day` live. From the beat inventory (measured): all real durations, hazards, and line-to-beat mapping, with the chain end at the corpus's measured `21:43:15`. Designed here (the craft): the 48 s comprehension-weighted compression model, per-beat dwells and their stated deviations, the gate hold, the sync contract and word budgets, the ink-plus-mark emphasis system, the narration-first mobile model and its height budget. From the direction reference (feel only): terminal chrome density and feed rhythm — its muted feed text and rust feed words are deliberately not inherited (see `page-shell.md` §13).

Founder-set: the 48 s chain length; the beat shares that give QA's validation 14.48% and fund the wow beat from the gate hold rather than from QA; narration-first as the mobile priority order; the totals strip's stillness; **that a phone reader never makes a sideways gesture to finish a log line** — the constraint the mobile window is sized around.

Nothing in this file is open.
