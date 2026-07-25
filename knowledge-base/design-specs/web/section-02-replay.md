# §2 — Watch It Ship: the two-layer replay

**Surface type**: page section (§2 of 6) — the page's centerpiece and highest-risk asset
**Consumers**: Content (writes narration against §6's sync contract), Developer (builds playback from §5–§10), QA (derives validation scope from this file directly)
**Inherits**: every token in `page-shell.md`. No new colours, sizes, or motion tokens are introduced here.

**The acceptance bar this spec is built to**: the replay must stand on pacing and plain-English narration alone, independent of the visual frame. It is judged with the styling mentally subtracted. Timing is therefore specified to the tenth of a second — pacing is a design decision, not a developer guess. A non-technical reader follows the narration; a technical reader reads the terminal lines; both reach `bodh.day · LIVE`.

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
5. Chain totals readout (scope-labelled, always visible)
6. Replay controls

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

**Model: fixed 60-second chain, comprehension-weighted.** Real-proportional compression is the honest default, deviated from deliberately, beat by beat, where comprehension needs air — and each deviation is stated against the real share. The always-visible "condensed" label plus the real clock stamps on every line keep the compression honest: the real durations remain readable in the data itself.

Chain playback: **60.0 s** (compression ≈ 64:1 — one real minute per second). Terminal state (L12) sits outside the 60 s, exactly as the real deploy sat outside the chain.

| Beat | Dwell | Design share | Real share | Deviation rationale |
|---|---|---|---|---|
| B1 | 8.0 s | 13.3% | 11.8% | Near-proportional; two lines + orientation |
| B2 | 9.0 s | 15.0% | 20.4% | Compressed — one line; narration carries the content |
| B3 | **12.0 s** | **20.0%** | 11.4% | **The wow beat, expanded ~1.75×.** The replay's most important fact gets its longest single dwell |
| B4 | 12.0 s | 20.0% | 21.4% | Proportional; three roles land on a steady 4 s cadence |
| B5 | 6.35 s | 10.6% | 22.5% | Most compressed. Two lines whose drama is the wait — 6 s of visible suspense already reads long at replay scale |
| B6 | 12.65 s | 21.1% | 12.6% | Expanded. The run stopping itself at a human gate is the product's thesis — the held silence is the point |

### 5.1 Playback schedule (authoritative — offsets in seconds from chain start)

| t | Event | Notes |
|---|---|---|
| 0.00 | L1 reveals | `20:38 · muster` — replay begins on autoplay trigger (§8) |
| 0.35 | L2 reveals | Same-stamp pair: one `--reveal` cadence after L1 — reads as the same moment, stays two lines |
| 8.00 | L3 reveals | B2 opens |
| 17.00 | L4 reveals | **B3 opens — key-beat emphasis (§9) on the re-verify line** |
| 29.00 | L5 reveals | B4 opens |
| 33.00 | L6 reveals | |
| 37.00 | L7 reveals | |
| 41.00 | L8 reveals | B5 opens — QA working line; the ellipsis hangs |
| 47.00 | L9 reveals | PASS — key-beat emphasis |
| 47.35 | L10 reveals | **Zero-gap rule**: one `--reveal` cadence after L9, identical `21:35` stamp — simultaneous, distinct |
| 52.50 | L11 reveals | `Role: halt · awaiting operator` — the cursor sits and blinks |
| 52.50 → 60.00 | **The gate hold** | 7.5 s of stillness. Longest silence in the replay, by design: the run stopped itself and waited for a human |
| 60.00 | Divider + L12 | Terminal state, **outside the chain clock**: the corpus's `─────` divider, then `deploy · bodh.day · LIVE` at large scale (§9), no timestamp. The "three days later" fact lands in the caption slot (§6, SP8) |

Cadence rules for the Developer: line reveals use `--reveal` (350 ms, opacity + 4px rise — the shell's single micro-reveal token); the same-stamp pairs (L1/L2, L9/L10) use exactly one cadence of separation; no other easing, no scroll animation — twelve lines fit the terminal without scrollback, and every revealed line persists.

## 6. Narration sync contract

Narration slots are pinned to line reveals. Content writes to these slots; the Developer triggers each slot at its anchor's reveal. Word budgets derive from time-to-next-slot at ~3.5 words/s — a budget overrun is a spec violation, not a style choice, because it breaks the pacing this section is judged on.

| Slot | Anchor / t | Read window | Word budget | What the slot must carry (brief to Content) |
|---|---|---|---|---|
| SP1 | L2 · 0.35 | 7.65 s | ≤ 26 | The setup: a real run, one evening, the queue advances; UI/UX files the production spec |
| SP2 | L3 · 8.0 | 9.0 s | ≤ 31 | Developer productionizes — real handoff, timezone-parity detail available if it fits |
| SP3 | L4 · 17.0 | 12.0 s | ≤ 42 | **The wow beat, fullest narration**: the PM re-checked the developer's work with its own screenshots — never trusting the developer's |
| SP4 | L5 · 29.0 | 12.0 s | ≤ 42 total | Content → Legal → Marketing each validate and hand off. May split into three ~13-word micro-captions landing at 29.0 / 33.0 / 37.0 |
| SP5 | L8 · 41.0 | 6.0 s | ≤ 21 | QA re-derives the date math with its own formula — 24 dates × 3 timezones |
| SP6 | L10 · 47.35 | 5.15 s | ≤ 18 | PASS, zero bugs, 11/11; the PM accepts — same instant, both true |
| SP7 | L11 · 52.5 | 7.5 s | ≤ 26 | **The honest headline lands here, at the gate**: no human touched this until the deploy button. The run stops itself |
| SP8 | L12 · 60.0 | persistent | ≤ 35 | `bodh.day`, live — and the honest scope: deploy landed three days later; the gate waited. Chain totals framing per copy-rules (exact numbers, wave scope only) |

Slot behavior: **desktop** — entries accumulate in the narration rail, all full-ink once revealed; the active entry carries a 2px `--accent` left bar + its beat tag; the rail never dims past entries (full-ink rule). **Mobile** — the current entry renders as a caption card below the terminal, replaced per slot; the complete list renders in the end state.

Beat indicator: `BEAT 03 / 06 · PM RE-VERIFIES` — `--text-label`, `--muted`, above the narration layer, updates as each beat opens. Beat display names are Content's (≤ 3 words each, uppercase).

Every narration claim must trace to a corpus line (Content cites; QA diffs). The Safari-only SVG catch is either absent or explicitly a founder-directed polish pass — it does not belong to this chain and has no slot inside the 60 s.

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
   ~64 MIN ACTIVE · 289 API CALLS · $24.73    ⏭ SHOW FULL LOG (7)(8)
   BODH SPRINT 4 · WEBSITE WAVE ONLY
```

Two columns above `--bp-wide`: terminal ~60% / narration rail ~36ch, `--gap-block` between. Terminal height fixed to fit all twelve lines + chrome (no scrollback, no layout shift as lines reveal — lines occupy space from load; reveal is opacity only).

### Wireframe — mobile (375px)

```
──┤ §02 · WATCH IT SHIP ├──────────────
   BEAT 03 / 06 · PM RE-VERIFIES
  ┌─────────────────────────────────┐
  │ ○ CONDENSED FROM THE REAL       │
  │   BUILD LOG               ● RUN │
  │─────────────────────────────────│
  │ 20:38  muster   sprint/auto ·   │
  │        8 roles standing by      │  ← soft wrap, hanging
  │ 20:38  ui-ux    production      │    indent to detail col;
  │        spec + assets · HO-027   │    never truncate
  │ …                               │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ ▌ N3 — the PM re-checked the    │  current narration
  │   developer's work with its     │  caption card (replaced
  │   own screenshots …             │  per slot; full list in
  └─────────────────────────────────┘  end state)
   ~64 MIN ACTIVE · 289 API CALLS ·
   $24.73 — WEBSITE WAVE ONLY
   ⏭ SHOW FULL LOG
```

### Annotations

| # | Element | Spec |
|---|---|---|
| 1 | Section tag | Shell motif — `<h2>` `§02 · WATCH IT SHIP` (final wording: Content) |
| 2 | Beat indicator | `--text-label` `--muted`; updates per beat; `aria-hidden` (state is announced by content itself, §11) |
| 3 | Terminal | `--surface`, 1px `--hair` border, sharp corners, registration `+` marks at two corners. Chrome bar: `--text-micro` label + live indicator (the shell's pulse dot — motion element 2's terminal instance) |
| 4 | Log lines | `--text-terminal`. Stamp `--muted` · role `--ink` · detail `--ink` (the log is content here, not ambience) · key-beat emphasis per §9. `<ol>`, one `<li>` per corpus line |
| 5 | Narration entries | `--text-body`, `--ink` always (never muted, never dimmed). Sans — the plain-English track is visually the *readable* layer against the mono terminal |
| 6 | Active marker | 2px `--accent` left bar + beat tag `--text-micro` `--muted`. Position/shape channel — colour is not the sole indicator |
| 7 | Chain totals readout | Shell readout-cell motif, always visible, static values (no count-up here — §2's numbers are evidence in a log context, and the cells are visible mid-playback; count-up stays on §1/§5 readouts). Values `--accent` `--text-readout`; scope label `--text-micro` `--muted` mandatory. Copy: Content, per copy-rules (exact numbers; wave scope; never wall-clock framing) |
| 8 | Controls | Ghost buttons, `--text-label`, `--hair` border, `--ink` text, 44px hit area. `⏭ SHOW FULL LOG` during playback → `⟲ REPLAY` in end state |

## 8. States

| State | Behavior |
|---|---|
| **Idle (above the fold not yet reached)** | All 12 lines + all narration present in DOM, visually unrevealed (opacity). No timers running |
| **Playback** | Autoplays **once per page load** when the terminal reaches 50% viewport visibility. Schedule per §5.1. Playback pauses if the section leaves the viewport (>50% out) or the document is hidden; resumes where it left off |
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
- **< `--bp-wide`**: stacked; caption-card narration. Terminal font may drop to 12px minimum; lines soft-wrap with hanging indent aligned to the detail column — **truncation or ellipsis is forbidden** (rendered characters must diff clean against the corpus).
- Landscape phone (667×375): verified — stacked layout holds; terminal fits with internal rhythm tightened one step (`--gap-hairline`). iPad portrait: single column at wider gutter; two-column engages only above `--bp-wide`.
- 200% zoom: reflows to the stacked layout; no horizontal scroll (the terminal's wrap rule covers its own overflow).

## 11. Accessibility

- Section: `<section aria-labelledby="s2-heading">`; terminal `<ol>` labelled "Build log, condensed from the real build log"; narration `<ol>` labelled "Narration".
- **No `aria-live` during playback** — the full transcript is in the DOM from load, so screen readers read the complete content in document order without twelve timed interruptions. The reveal is visual-only (`opacity`), never `display:none`/`visibility:hidden` (which would hide content from AT), and never DOM insertion.
- Controls are `<button>`s with visible focus rings and 44px targets; the replay never traps focus or scroll.
- Playback pauses on `visibilitychange` — no motion runs unwatched.
- `bodh.day` in SP8/L12 context may link out (plain `<a>`, no prefetch — zero runtime requests holds until a user navigates).
- Colour-alone check: beats are indicated by text (indicator, tags); key beats by weight + glyph + tick; the live dot pairs with the "RUN" word.

## 12. Developer/QA fidelity checklist

- [ ] Every rendered log line diffs byte-clean against the corpus terminal inventory (QA blocking on any delta)
- [ ] Only minute-precision timestamps appear anywhere in the DOM; no `t=` offset, no second-precision value, no derived duration renders
- [ ] "Condensed from the real build log" label always visible in terminal chrome
- [ ] L9→L10 and L1→L2 reveal at exactly one `--reveal` cadence; identical stamps rendered on both lines of each pair
- [ ] Gate hold: no event fires between t=52.85 (L11 reveal completes) and t=60.00 except the cursor blink
- [ ] L12 renders after the corpus divider, unstamped, outside the 60 s chain; the three-days-later fact appears in SP8
- [ ] Reduced-motion and no-JS paths render the complete transcript (12 lines + all narration + totals)
- [ ] Replay plays once per load; skip and replay controls work by keyboard
- [ ] Zero external requests during and after playback (product claim)
- [ ] Cross-engine: WebKit **and** Blink, playback timing and both themes — evidence per engine
- [ ] Narration word counts within §6 budgets (measured, not eyeballed)

## 13. Provenance

From the seed (locked): the two-layer structure, the six-beat sequence, the "condensed" label, the honest-beat requirement, the no-overclaim boundary, scripted HTML/CSS/JS with no tooling dependency, ending on `bodh.day` live. From the beat inventory (measured): all real durations, hazards, and line-to-beat mapping, with the chain end at the corpus's measured `21:43:15`. Designed here (the craft): the 60 s comprehension-weighted compression model, per-beat dwells and their stated deviations, the gate hold, the sync contract and word budgets, the emphasis system, caption-card mobile narration. From the direction reference (feel only): terminal chrome density and feed rhythm — its muted feed text and rust feed words are deliberately not inherited (see `page-shell.md` §13).

## 14. Open questions

1. **Total chain duration 60 s** is the design's judgment call (comprehension floors at ~64:1 compression). If review finds it slow, the schedule compresses uniformly to 48 s (×0.8) with word budgets scaled the same — the structure, ratios, and hazards handling survive rescaling; only §5.1/§6 numbers change.
2. **§2 totals readout without count-up** (annotation 7): chosen so the evidence strip reads as log data, not showpiece. If the founder wants motion element 3 to cover these cells too, it is one attribute — no layout change.
