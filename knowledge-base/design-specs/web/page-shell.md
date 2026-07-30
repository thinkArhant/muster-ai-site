# Page Shell — Design Foundation

**Surface type**: page shell — tokens, type, texture, motifs, section chrome, motion system, both themes
**Consumers**: Developer (builds the shell from this file), QA (derives validation scope), Content (copy slots and owners), the §2 replay spec (inherits every token defined here)
**Authority**: `product-spec-seed.md` → "Design direction (locked)" is the source of every value below. This file executes that direction; it never re-derives it. Where this file and the seed disagree, the seed wins.

---

## 1. Concept

A spacious, mil-spec field manual rendered as a calm, live operations terminal. Terminal × military × mechanical-trust × **spacious** — spacious is the overriding constraint. Generous air, one idea per screen, a reading column of ~64ch. The page must read as something that was *measured and stamped*, not marketed: flat rust numerals, stencil labels, hairline rules, matte surfaces. A gradient-tinted number reads as marketing; a flat one reads as measured. Every choice below serves that distinction.

## 2. Token System

Adaptation note: the design-system methodology's two-tier token discipline applies, compressed for a six-value palette — the seed's twelve hex values are the primitives, and the six semantic names below are the only tokens any rule, spec, or line of CSS may reference. **Raw hex appears exactly once in the codebase: in the token block. Anywhere else it is a defect.** A thirteenth colour is a deviation requiring written justification (foundational assumption A-006).

### 2.1 Colour tokens (locked — seed → Design direction, verbatim)

| Token | Dark (primary) | Light (olive field canvas) | Role |
|---|---|---|---|
| `--ground` | `#13140D` | `#DBD8C6` | Page background |
| `--surface` | `#1B1D13` | `#E7E4D4` | Cards, terminal, readout cells — always opaque |
| `--ink` | `#E6E3D3` | `#191B10` | All reading text, headings, terminal content |
| `--muted` | `#8C9075` (drab sage) | `#55583F` | Labels and captions ONLY — never body copy |
| `--hair` | `#2C2F22` | `#BDB9A3` | Hairline rules, borders, ticks |
| `--accent` | `#C05A32` (rust) | `#A0451F` (rust, deep) | The single accent. Metrics, markers, focus, pulse |

Theme mechanics: dark is default and primary. Light activates via `@media (prefers-color-scheme: light)` and explicitly via `:root[data-theme="light"]` / `"dark"` (the explicit attribute wins). `color-scheme: dark light` is declared so form controls and scrollbars follow.

**Derived tints (states of the accent, not new colours):**

| Token | Definition | Use |
|---|---|---|
| `--accent-selection` | accent at 30% alpha over `--ground` | `::selection` background; text stays `--ink` |
| `--accent-wash` | accent at 12% alpha | Active-state fills (e.g. active narration marker track). Never a text background |

Texture pigments (pure black / pure white at low alpha inside the grain and vignette, §5) are texture, not palette.

### 2.2 Measured contrast — stated per token pair, both themes (WCAG 2.1 ratios, computed from the locked hex)

| Pair | Dark | Light | Verdict |
|---|---|---|---|
| `--ink` on `--ground` | **14.37** | **12.15** | AAA. Body text passes everywhere |
| `--ink` on `--surface` | **13.23** | **13.64** | AAA |
| `--muted` on `--ground` | **5.61** | **5.13** | AA at any size — labels/captions safe |
| `--muted` on `--surface` | **5.16** | **5.76** | AA at any size |
| `--accent` on `--ground` | **4.19** | **4.35** | AA **large text** (≥24px, or ≥19px bold) and UI/graphics (3:1). **Below 4.5 — not for small text** |
| `--accent` on `--surface` | **3.86** | **4.89** | Dark: large-text/UI only. Light: passes small text |
| `--ink` on `--accent` | 3.43 | 2.79 | **Fails body floors — no filled-rust containers with text** |
| `--hair` on `--ground` | 1.36 | 1.38 | Decorative separators only; never information-bearing alone |

Body text ≥4.5:1 in both themes: satisfied at 12.15:1 or better, because body text is always `--ink`.

### 2.3 Rust usage rules (derived from the measured ratios — binding)

1. **Rust numerals render flat and large.** Metric values: tabular mono, `--accent`, ≥24px regular or ≥19px bold. No gradient, no glow, no tint — flat rust is the whole page's credibility signal.
2. **Rust never sets body or small running text.** At label/terminal sizes rust appears only as *graphical marks* (✓, ▸, ticks, the pulse dot, borders, underlines) — 3:1 UI floor, measured 3.86–4.89 ✓ — or as duplicated emphasis whose fact is also carried in ink at AA.
3. **Body links are `--ink` with a 1px `--accent` underline** (3px offset). Hover: underline thickens to 2px. Rust-as-link-text at 17px would measure 4.19/4.35 and fail AA — the underline carries the linkness instead.
4. **No text on filled rust.** Emphasis inverts weight and scale, never plates text on the accent.
5. **Focus ring is solid `--accent`**: 2px outline, 3px offset, on every interactive element (≥3:1 in both themes ✓).

## 3. Typography

No webfonts — zero external requests is a product claim.

| Token | Stack | Duty |
|---|---|---|
| `--font-mono` | `ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` | Display, labels, system chrome, terminal, metrics — tracked uppercase, crate-stencil |
| `--font-sans` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Reading passages only |

Type scale — six steps, plus two component-scoped sizes (deliberate; the components are instruments, not prose):

| Token | Size / leading | Face | Use |
|---|---|---|---|
| `--text-display` | `clamp(1.75rem, 6.5vw, 4.25rem)` / 1.05 | mono bold, uppercase, tracking .01em | Hero headline only |
| `--text-kicker` | `clamp(1.5rem, 3.5vw, 2.25rem)` / 1.3 | sans | Section statements, `--ink` |
| `--text-lead` | `clamp(1.0625rem, 1.9vw, 1.25rem)` / 1.6 | sans | Hero lead, section intros, `--ink` |
| `--text-body` | `1.0625rem` (17px) / 1.7 | sans | Paragraphs, `--ink`, max 64ch |
| `--text-label` | `0.75rem` (12px) / 1.4 | mono, uppercase, tracking .18em | Stencil tags, chrome, `--muted` |
| `--text-micro` | `0.6875rem` (11px) / 1.5 | mono, uppercase, tracking .14em | Captions, readout keys, `--muted` |
| `--text-terminal` | `0.8125rem` (13px) / 1.9 | mono | Terminal log lines (component-scoped) |
| `--text-readout` | `clamp(1.5rem, 3vw, 1.875rem)` / 1 | mono, tabular-nums | Metric values, `--accent` — floor 24px keeps rust at AA-large |

**The display floor is a measured value, not a taste value.** 1.75rem (28px) is the largest floor at which the longest real headline candidate sets on three whole-phrase lines at 360px with no overflow at 320px; a 2.4rem floor produces a 14-character display line on phones, which breaks any nine-word headline into four or more lines and overflows inside an unbreakable phrase. The slope and ceiling are untouched — rendered size is identical above ~431px. The hero spec (`section-01-hero.md` §4) owns the wrap system the floor is measured against.

**Kicker sentences wrap at sentence boundaries.** A multi-sentence kicker renders each sentence as
an `inline-block` span — the headline's phrase-unit mechanism family (`section-01-hero.md` §4.2)
applied at kicker scale. `inline-block` is wrap-preferred, not unbreakable: a line break lands at a
sentence boundary wherever the viewport allows, and a sentence wider than the viewport wraps
internally rather than overflowing. Measured on §3's two-sentence kicker (*The product grows. The
briefing doesn't.*): one line at desktop, a sentence-boundary break at 375px, internal wrap with no
overflow at 320px. The spans are style-only — sentence punctuation already separates them, so the
announced string is unchanged.

**The leading in a component-scoped pairing is the one-row case.** `--text-terminal` is scaled for an instrument entry that sets one row, and 1.9 is the leading for that entry. Where a component's entry sets more than one row, a single leading value cannot both separate rows inside an entry and separate one entry from the next — it gives identical whitespace on both sides of an entry boundary, and the entries stop reading as entries. Such a component states its own row pitch and its own entry separator, and the pairing above is the default it departs from. The size never moves and no token is added; only the leading is component-overridable, and only where an entry wraps. `section-02-replay.md` §7.1 rule 2 is the instance.

**Full-ink rule (binding, A-007):** any paragraph meant to be read — body, lead, kicker, narration — is `--ink`. `--muted` is for `--text-label` and `--text-micro` elements only. A muted paragraph is a defect.

Numerals: `font-variant-numeric: tabular-nums` on every metric, timestamp, and count-up target — animated digits must not reflow layout.

## 4. Spacing — one rhythm token, one-sided

All spacing derives from a single rhythm token:

```
--rhythm: 1.5rem;   /* 24px */
```

| Token | Value | Use |
|---|---|---|
| `--gap-hairline` | `calc(var(--rhythm) / 2)` | Label-to-content, tag-to-rule gaps |
| `--gap-flow` | `var(--rhythm)` | Paragraph rhythm |
| `--gap-block` | `calc(var(--rhythm) * 2)` | Between components inside a section |
| `--gap-major` | `calc(var(--rhythm) * 3)` | Between idea groups |
| `--gap-section` | `clamp(calc(var(--rhythm) * 4), 14vh, calc(var(--rhythm) * 7))` | Section vertical padding — 96px floor, 168px ceiling |

**One-sided application (binding):** vertical space is applied as `margin-block-start` on the following element (or via `* + *` owl selectors) — **never** `margin-bottom`, never both sides. Gaps can then never stack or double. Sections use `padding-block` from `--gap-section` and own no external margins. Any `margin-bottom` in shell CSS is a defect.

**Spacious is the overriding constraint.** When a section feels efficiently packed, open it up: prefer the next rhythm multiple up. One idea per screen; air is part of the design, not slack in it.

## 5. Texture

Both layers CSS/SVG-generated, self-contained, `aria-hidden`, `pointer-events: none`, behind all content.

- **Grain**: subtle rugged noise over `--ground`. Peak per-pixel alpha ≤ 8% (dark) / ≤ 4% (light), biased faint with occasional grit, rendered at ~1.4× scale so it reads as tooth, not static. Implementation is the Developer's choice (SVG `feTurbulence` data-URI or painted canvas) — **cross-engine parity WebKit + Blink is required evidence either way** (inline-SVG/WebKit divergence is this project's known failure class).
- **Top vignette**: a whisper — radial darkening from the top edge, black at ≤ 16% alpha (dark theme) and **≤ 5% alpha (light theme)**. The light cap is derived, not taste: at 16% over the light ground, `--muted` labels in the vignette zone would composite below 4.5:1 (≈3.6:1); at 5% they hold ≥4.5. QA should measure the worst-case composited pair in both themes.
- Texture never carries information and never lifts a stated contrast pair below its table value.

## 6. Surface rules

- **Fully matte. Sharp corners. Opaque cards.** `border-radius: 0` on every surface; the only circles are status lamps.
- No glass: no `backdrop-filter`, no translucent panels over content. The sticky status bar is **fully opaque** `--ground` with a `--hair` bottom rule — the direction reference blurs it; that treatment is glass and is not inherited.
- No gradients as decoration. The only radial in the system is the vignette; the only fills are flat token values.
- No shadows. Elevation is communicated by `--hair` borders and `--surface` value shifts.

## 7. Layout

| Token | Value |
|---|---|
| `--page-max` | `72rem` (1152px) content container |
| `--read-max` | `64ch` reading column (seed-locked) |
| `--gutter` | `clamp(1.5rem, 5vw, 4rem)` |
| `--bp-wide` | `60rem` — the single page-chrome breakpoint (two-column contexts engage above it) |

One idea per screen. Full-width hairline section rules span the viewport; content sits in the container; reading passages sit in the 64ch column. Layouts must reflow at 200% zoom without horizontal scroll; `user-scalable` is never disabled. §7.1 governs where any scroll lands; §7.2 states the page's one horizontal alignment system.

### 7.1 Scroll landing — the page does not snap

**The reader's scroll rests exactly where the reader leaves it.** Section snapping — proximity snap on the document scroller — was judged by the founder on the rendered page as not reading premium, and is **removed entirely** (DEC-057). The founder's ruling was binary — remove, or full section paging — and removal wins on measurement, not taste:

- **Full section paging requires every section to fit one snapport, and four of six do not.** Measured on the shipped page: at 375×553 — §1 1240px, §2 794.2px, §3 728.5px, §4 2957px, §5 1776.9px, §6 590.6px — every section exceeds the phone fold; at 1280×700, §1 (866.5px), §2 (792.9px) and §5 (1151.5px) exceed the desktop fold. One-section-per-view is not implementable over this content without `mandatory` snapping or scripted paging: `mandatory` makes the interior of an oversized section an invalid rest (unreachable content, and at 200% zoom every section is oversized), and scripted paging is what "no script reads, writes, or intercepts the page's scroll position" — asserted against the shipped source — exists to ban. Paging would also be the heaviest interaction machinery on a page whose §4 argues restraint.
- **Removal costs zero content and zero layout.** No element's size, position, or rhythm depended on snapping; deleting the declarations changes no rendered frame. What snapping bought — arriving composed at a section start — the composition already provides with 96–168px of section air and a full-width ruled tag, which is the same reason the reduced-motion path was ruled to drop snap in the first place. The phone scroll, where the founder judged the pull as fighting the reader, simply becomes the platform's own scroll.

**What snapping was, for the record**: `scroll-snap-type: y proximity` on `:root`, `scroll-snap-align: start` on five sections, §2 exempt via `.section--no-snap` (its playback gate is a visibility threshold a snap position could silently starve), off under reduced motion. DEC-040 holds the full design; it is amended by DEC-057, not deleted — its `mandatory` rejection and its §2-exemption reasoning are why paging lost the binary above.

#### What stays — the landing system

```
:root {
  --bar-h:      3rem;                              /* the sticky status bar, §9 */
  --scroll-pad: calc(var(--bar-h) + var(--rhythm));

  scroll-padding-block-start: var(--scroll-pad);
}
```

`scroll-padding-block-start` was never part of the snap feature and does not leave with it. It governs where *any* scroll-into-view lands — anchors, the skip link, and the browser's own find-in-page — all of which otherwise land under the sticky bar. The padding is **the bar plus one `--rhythm`** (72px), not the bar's 48px: each section opens with a full-width `--hair` rule whose line sits 7.89px below the section's top edge, and padding of exactly the bar height would park that rule 7.89px under the bar's rule — the page's own separator motif turned into an accidental double line. Measured clearance at the padding: 32.2px at 1280×900, 31.67px at 375×553. The binding property is the clearance, not the 72. `--bar-h` and `--scroll-pad` are tokens because the bar's `block-size` and this padding are the same measurement twice; §9's bar takes `block-size: var(--bar-h)` so the two cannot drift.

**The one snap container that remains is §4's sheet track** — x-axis proximity, scoped to the track, within-section paging between discrete cards. It is part of §4's paging affordance, it is ruled and owned in `section-04-decisions.md` §8.1, and it is off under reduced motion. Nothing else on the page declares snap anywhere.

#### Retirement inventory — every §7.1 assertion, dispositioned

The previous §7.1 shipped eleven assertions (A1–A11), built in `tests/verify-shell.mjs` ("Section scrolling" block, ~`:2953`) with keyboard/find/zoom companions in `tests/qa-fullpage-sweep.mjs` (~`:386–470`). None may be left asserting a behaviour that no longer exists:

| Old | Was | Disposition |
|---|---|---|
| A1 | root computes `scroll-snap-type: "y"` | **Inverts**: the document scroller computes `scroll-snap-type: none` in the default path — snapping must not silently return |
| A2 | `scroll-padding-block-start` = bar height + `--rhythm` | **Keeps**, unchanged |
| A3 | snapped section's rule clears the bar's rule by ≥ `--gap-hairline` | **Re-bases**: navigate to each section start via fragment/`scrollIntoView()` (the landing path readers actually have) and assert the same clearance |
| A4 | snap set = five sections, §2 exempt; no stray snap areas | **Re-bases**: no element anywhere computes a non-`none` `scroll-snap-align` except §4's sheets, whose nearest scroll container is the track, never the document |
| A5 | every snap area computes `scroll-snap-stop: normal` | **Re-scopes** to the track's sheets — the only snap areas left |
| A6 | §2's log computes `scroll-snap-type: none` | **Retires** — subsumed by the re-based A4/A1 sweep (no snap outside the track) |
| A7 | §2 rest-position sweep, 0 moved | **Retires** — nothing exists to move a rest position. The `.section--no-snap` class and its markup comment leave with it |
| A8 | ArrowDown strictly increases; PageDown reaches the end | **Keeps** as a no-trap property of the page (real key events, as before) |
| A9 | 200% zoom: every section's last child reachable, clear of the bar | **Keeps**, unchanged |
| A10 | reduced motion: snap off, padding unchanged | **Re-bases** to its surviving half: `scroll-padding-block-start` unchanged under reduce. The track's reduced-motion half lives in §4's assertions |
| A11 | `scrollIntoView()` on §4's last paragraph lands whole (amended by DEC-053 to the shipped fragment-landing check) | **Re-bases to its natural form**: with no y snap, `scrollIntoView()` on any section-interior target settles fully visible below the bar — the pull DEC-053 priced no longer exists on the y axis. Its x-axis half stays in `section-04-decisions.md` §12.16 as DEC-053 amended it |

The sweep's scroll-snap-titled checks (`qa-fullpage-sweep.mjs`) keep their subjects — keyboard paging, find-in-page under centre-if-needed, 200% zoom — and drop the word "snap" from their claims; they were always assertions about the reader's paths surviving, and those paths outlive the feature. **Find-in-page on a real phone remains a named manual check at the re-gate** (it was deferred there deliberately; nothing mechanical here replaces it).

### 7.2 Horizontal alignment — two edges and one axis

**Founder-delegated ruling (DEC-057): every element on the page binds to one of exactly three references — the rail, the rail-end, or the axis.** No fourth reference exists, and nothing is centered "within its own box" on an axis of its own.

- **The rail** — the container's content inline-start edge. Every block hangs on it: eyebrow, headline, formation, caption, remnant, curl, §2's layers, §3's kicker and paragraph, §4's sheet 1 at the track's rest, §5's lines and cards, §6's lead, commands and link, both footer lines, the header lockup, every stencil tag (`.rule` already seats the tag on the container's content edge). Reading passages keep their 64ch cap — a capped block still *starts* on the rail.
- **The rail-end** — the container's content inline-end edge. Line-level counterweights right-align to it: `OPERATIONAL` in the bar, the `VERIFY ⎘` chip in the remnant's head row, §4's sheet ordinals inside their own padding edges. A counterweight is always the second element on an existing line, never a floated block.
- **The axis** — the container's center, which exists only as the midpoint of the two edges. **Exactly one element binds to it: the formation's hub** (≥ `--bp-wide`), and only because the formation spans the full container — bus = plate row = container content width — so the hub's center *is* the midpoint of the rail and rail-end. Centered-within-a-narrower-block is the composition the founder rejected from the rendered page (a hub centered on an intrinsic-width block sits at x 546.2 against the strip's and headline's 720 at 1440 — a 173.8px orphan axis) and is banned: an element may only center on the axis if its parent's edges are the rail and rail-end.

Measured on the proposed render (`samples/gate-b-proposed.html`, headless Blink): hub center − axis = **0.0px at 1280, 1440 and 1600**, bus spanning rail→rail-end exactly at all three, with every other measured block's inline-start on the rail (`samples/gate-b-renders/after-report.json`). Below `--bp-wide` no axis-bound element exists — the formation is the ladder, hub on the rail — so the phone system is the two edges alone.

**The harness asserts relationships (DEC-032), not pixels**: (1) per section, the first rendered block's border-box inline-start equals the container's content inline-start; (2) the formation's bus width equals the plate row's width equals the container's content width, and |hub center − (rail + rail-end)/2| ≤ 1px; (3) the set of axis-bound elements is exactly the hub. Never assert a literal x.

The footer inherits this system as-is: both lines and the receipts row on the rail, no counterweight, no centered element (`footer-copy.md` owns the strings; this file owns the alignment).

## 8. Motifs

| Motif | Spec |
|---|---|
| **Brand mark — the pennant** | The 6×9px `--accent` pennant, drawn as a `clip-path` on a plain box, `aria-hidden`. It seats in the header lockup and at all five section separators. Full spec — geometry, sizing, the header lockup and its underscore, the favicon, and the seats it deliberately does **not** take — is `design-specs/web/brand-seats.md` |
| **Stencil section tag** | `§02 · WATCH IT SHIP` — `--text-label`, `--muted`, preceded by the pennant at `--gap-hairline`. Semantically the section's `<h2>` (visually a label; the heading tree is real) |
| **Hairline rule with machined end-ticks** | 1px `--hair` line, full-width, with 9×1px perpendicular ticks at both ends of the centered tag. Decorative: `aria-hidden` on the rule construction, never information-bearing |
| **Registration marks** | `+` glyphs, `--muted`, `--text-micro`, at the outer corners of instrument surfaces (terminal, readout strips). Sparse — two per surface maximum, `aria-hidden` |
| **Instrument readout cell** | `--surface` card, `--hair` 1px border, sharp corners. Key: `--text-micro` `--muted`. Value: `--text-readout` `--accent` flat, tabular. Sub-line: `--text-micro` `--muted`. Unmeasured value: `--ink` em-dash + sub-line "measured at launch" — dashes never count up |
| **Chip** | `--text-micro`, 1px border. Default: `--hair` border, `--muted` text. Emphasis (e.g. `VERIFY ⎘`): `--accent` border, **`--ink` text**, rust glyph — rust text at chip size would fail AA (§2.3) |
| **Spec-sheet rows** | Label column `--text-label` `--muted` + `--hair` row rules; value cells `--ink`. Mechanism row: ink text with a rust graphical mark — never rust text (the ≥19px-bold rust branch is declined; §4 is body prose). Full detail: `design-specs/web/section-04-decisions.md` |
| **`OPERATIONAL` status bar** | See §9. Sticky, opaque, hairline-ruled |
| **Roster formation** | PM hub seated over a bus-bar carrying the seven specialist plates — hero-scoped; ships with the hero spec (`section-01-hero.md` §6). The bus-bar `+` terminals reuse registration-mark styling |

## 9. Status bar (shell chrome)

Sticky at top, `block-size: var(--bar-h)` (3rem), opaque `--ground`, 1px `--hair` bottom rule. The height is a token because §7.1's `--scroll-pad` is derived from it — the bar's height and the distance every scroll keeps clear of it are the same measurement, and a literal in one of the two places lets them drift. Contents, all `--text-label`:

| Slot | Element | Owner |
|---|---|---|
| Left | Brand lockup — the 6×9px pennant, the `MUSTER` wordmark in mono uppercase `--ink`, and a **static** rust underscore. Both marks are `aria-hidden`, so the header's accessible name is exactly `MUSTER`. Geometry and rationale: `brand-seats.md` §4 | Content (the wordmark string), `brand-seats.md` (treatment) |
| Right | `⟨pulse dot⟩ OPERATIONAL` — dot per §10.1, word in `--muted` | this spec |

The lockup carries two graphical marks and no accent *text* — rust at `--text-label` would measure
4.19/4.35 and fail AA small text (§2.3.2). The underscore is a drawn 2px bar rather than a typed `_`
because a typed one sets at `--hair` weight and at a font-dependent depth across the mono fallback stack;
`brand-seats.md` §4 states that ruling and its accessible-name consequence.

**No theme control ships.** Theme selection is the reader's system preference, honoured via
`prefers-color-scheme` (§2.1). Both themes are first-class, and neither is something the reader is asked
to choose on arrival: the page's argument is restraint — one CTA, no badges, no furniture — and a control
that adds a decision nobody asked to make cuts against it. The `:root[data-theme]` escape hatch in §2.1
stays in the CSS for QA to force either theme; nothing in the UI sets it.

## 10. Motion — exactly two live elements, plus the curl cursor

The complete motion inventory of the page. **A third live element is a deviation requiring written
justification (A-007).** Every path is `prefers-reduced-motion`-gated and every reduced path renders
complete content. No stream element exists anywhere: §2 is the page's only terminal (DEC-046), its
replay is content playback (below), and §1 is fully static (`section-01-hero.md` §10).

**Scope (settled): the §2 replay is content playback, not a live element.** The budget governs *ambient* page motion — the motion that runs because the page is open. The replay is user-facing content mandated by §2 itself: scroll-triggered, plays once, holds a complete end state, and renders its full transcript with motion off. It is specified in `section-02-replay.md` and occupies no slot here. The budget is closed at two plus the curl cursor.

**The page has no section snapping** (§7.1, DEC-057). The one snap container is §4's sheet track — the user agent settling a scroll the reader started inside one section, off under reduced motion — and it holds no seat here for the same reason the page's snap never did: ambient it is not.

**The header underscore is not a live element and never becomes one.** It is a static rust bar in the
brand lockup (§9). The `curl` cursor owns the only blink on the page, and animating the underscore — the
obvious "improvement" to make, since it looks like a terminal caret — is a fourth live element and a
deviation. `brand-seats.md` §11 asserts it carries no animation and no transition, in the default path as
well as under reduced motion.

Motion tokens:

```
--pulse-period: 2.2s;
--cursor-period: 1.15s;      /* steps(1) */
--countup-duration: 1.2s;    /* ease-out cubic */
--reveal: 350ms ease-out;    /* single micro-reveal used by replay line entries */
```

### 10.1 OPERATIONAL pulse (element 1)
Appears in the status bar and as the terminal live indicator. **Clearly alive at a glance — subtlety is a defect here:**

- Core: 8px circle, solid `--accent`, never below 85% opacity.
- Ring: expanding `--accent` ring from the core edge to +8px radius, opacity 0.55 → 0, over `--pulse-period`; a second ring launches at 50% phase so the lamp is never still.
- Core brightness oscillates 100% → 85% → 100% in the same period.
- Reduced motion: static solid `--accent` core at 100% + the `OPERATIONAL` word — state fully communicated without the animation (text channel, not colour-alone).

### 10.2 Scroll-triggered count-up (element 2)
Readout metric values count from 0 to their exact value over `--countup-duration`, ease-out cubic, triggered once per page load at ≥55% cell visibility. Scope: §5's shipped-with cards — the page's only counting cells. §1's remnant renders inert dashes that never animate (`section-01-hero.md` §7), and the replay section's totals strip is deliberately static (see `section-02-replay.md` §7, annotation 7). The count-up engine's `aria-live` posture is decided and verified against §5's real cells.

- **Decimals roll as decimals**: 9.3 animates 0.0 → 9.3 with one decimal place preserved throughout; the final frame renders the exact source string.
- Tabular numerals; the cell is sized by its final value — zero layout shift.
- Digits are flat `--accent`. No gradient, no glow — a tinted number reads as marketing, a flat one reads as measured.
- Dashes (unmeasured metrics) never animate.
- Reduced motion: final values render immediately.

### 10.3 Curl cursor (permitted extra)
8×17px block, `--accent`, after the curl command; blinks at `--cursor-period`, `steps(1)`. Reduced motion: solid, static. `aria-hidden`.

### Reduced-motion summary table

| Element | Default | `prefers-reduced-motion: reduce` |
|---|---|---|
| Pulse | double-ring pulse | solid lamp + label |
| Count-up | rolls to exact value | exact value immediately |
| Cursor | blinks | solid block |
| Header underscore | static | static — the same mark, unchanged |
| §2 replay | timed playback | complete transcript (see replay spec) |
| §4 sheet track snap | x proximity within the track | off — paging by plain scroll unaffected (`section-04-decisions.md` §8.1) |

## 11. Accessibility foundation

- **Landmarks**: `<header>` (status bar) · `<main>` (all six sections) · `<footer>`. Every section is `<section aria-labelledby>` a heading it contains — the hero by its `<h1>`, §02–§06 by their stencil-tag `<h2>`.
- **Heading tree**: one `<h1>` (hero headline) → five `<h2>` (the §02–§06 stencil tags, §12) → `<h3>` only inside components that need it. No skipped levels. The hero carries no stencil tag; its `<h1>` is the section's heading.
- **Skip link**: first focusable element, "Skip to content" → `#main`; hidden until focused, then `--surface` card + focus ring at top-left.
- **Focus**: 2px solid `--accent` outline, 3px offset, on all interactive elements (§2.3.5). Never `outline: none` without this replacement.
- **Touch targets**: ≥44×44px on coarse pointers — small chrome (chips, replay controls) extends its hit area via padding while the visual stays small.
- **Forced colors**: every interactive element carries a real border; icons are inline SVG or glyphs (no background-image icons); state never rides on background colour alone. Verify with `forced-colors: active` emulation.
- **Colour is never the sole channel**: rust marks pair with glyph shape, weight, or text (e.g. pulse + "OPERATIONAL"; ✓ + "match").
- **200% zoom** reflows without horizontal scroll or clipped content, and every section's content stays reachable (§7.1 keeps this asserted).
- **Scrolling stays the reader's** (§7.1): the page does not snap, and no script touches the scroll position. Keyboard paging and arrow-key stepping are asserted as no-trap properties; `scroll-padding-block-start` keeps anchors, the skip link, and find-in-page matches clear of the sticky bar.

## 12. Page skeleton

```
┌─────────────────────────────────────────────┐
│ STATUS BAR  ▌MUSTER_        ● OPERATIONAL   │ sticky, opaque
├─────────────────────────────────────────────┤
│  §1 HERO (h1, roster formation, THIS SITE   │
│      remnant, curl)                         │
│ ──┤ §02 · WATCH IT SHIP ├────────────────── │ rule + stencil tag (h2)
│  §2 the replay …                            │
│ ──┤ §03 · THE INSIGHT ├──────────────────── │
│  §3 kicker + one paragraph                  │
│ ──┤ §04 · THE DECISIONS ├────────────────── │
│  §4 four spec-sheets                        │
│ ──┤ §05 · SHIPPED WITH MUSTER ├──────────── │
│  §5 readout cards                           │
│ ──┤ §06 · GET STARTED ├──────────────────── │
│  §6 curl + cursor + one GitHub link         │
├─────────────────────────────────────────────┤
│ FOOTER  provenance · links                  │
└─────────────────────────────────────────────┘
```

Section internals ship with their own specs; the shell builds the chrome above with §2's slot present.

## 13. Provenance — reference feel vs. seed lock

The direction reference (`design-specs/direction-reference.html`) was read for mood, density, and rhythm only. It is not a build target and none of it ships.

**Locked by the seed (authoritative):** all twelve hex values · mono/sans pairing and duties · tracked-uppercase stencil labels · metrics in tabular mono rust · grain + top vignette · all motifs in §8 · matte/sharp/opaque surface rules · a closed, exactly-enumerated motion budget + cursor (§10 holds the count at two — the founder's §1 gate ruling, DEC-046, retired the stream seat the seed's count included) · 64ch reading column · full-width section rules · spacious as overriding constraint.

**Founder-authored, not seed-locked:** the pennant and its five-point geometry, supplied as artwork in `design-specs/brand/`, and the four rulings about where it seats. Sizing at each seat is craft and is decided in `brand-seats.md` §2 — the artwork gives a silhouette and a ratio, not a page size.

**Designed here (the craft):** the scroll-landing system — `--scroll-pad` derived from the bar so any landing's rule never abuts the bar's rule — and the two-edges-one-axis alignment system (§7.2), each with its relationship assertions. Section snapping was designed here, judged by the founder on the rendered page, and removed (§7.1, DEC-057); the record of what it was stays in DEC-040. The reference has no scroll behaviour of any kind.

**Taken from the reference as feel cues (re-derived here, own values):** the calm density and section rhythm · tag-above-kicker composition · terminal chrome with dot caps and label bar · end-tick rule construction · registration-mark sparseness · pulse-lamp concept (execution deliberately stronger, §10.2) · grain rendered as faint tooth rather than visible noise.

**Present in the reference and deliberately NOT inherited:**

| Reference item | Why it does not ship |
|---|---|
| `#abae90` muted | Not one of the twelve locked values. Dark muted is `#8C9075` |
| `https://muster.build/setup.sh` | Host does not exist. The curl uses the GitHub raw URL until the founder supplies a domain |
| `amber` class name | The accent is RUST. No spec, class, or token may say amber |
| `backdrop-filter` blurred status bar | Glass — violates the matte/opaque surface rule. Ours is fully opaque |
| `"JetBrains Mono"` in the mono stack | Seed locks system monospace (SF Mono/Menlo + platform fallbacks) |
| Muted-toned feed text | The log is content on this page, not ambience — terminal detail renders `--ink` (replay spec §9) |
| Rust feed words at 12.5px | Measures 3.86:1 on dark surface — below AA small text. Replaced by the §2.3 emphasis system |
| Accent switcher widget | Preview-only tooling; the accent is locked |

## 14. Pattern inventory

No shared component library exists on this project (static page); patterns above are defined here and built by the Developer directly. `ui-component-requests.md`: no entries required.

Nothing in this file is open. Every value in it is either the seed's or measured here.
