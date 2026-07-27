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

One idea per screen. Full-width hairline section rules span the viewport; content sits in the container; reading passages sit in the 64ch column. Layouts must reflow at 200% zoom without horizontal scroll; `user-scalable` is never disabled. §7.1 turns *one idea per screen* from a composition rule into a scrolling behaviour.

### 7.1 Section scrolling — proximity snap

**One idea per screen, expressed as where the page comes to rest.** The reader scrolls the page; the page then settles on a section start rather than halfway through a heading. That is the whole feature. It is CSS scroll-snap on the document scroller, it runs entirely in the user agent, and **no JavaScript in this project reads, writes, or intercepts the page's scroll position.** Any implementation that does is not this spec.

#### The declarations — the entire feature

```
:root {
  --bar-h:      3rem;                              /* the sticky status bar, §9 */
  --scroll-pad: calc(var(--bar-h) + var(--rhythm));

  scroll-snap-type:           y proximity;
  scroll-padding-block-start: var(--scroll-pad);
}

.section           { scroll-snap-align: start; }   /* scroll-snap-stop stays normal */
.section--no-snap  { scroll-snap-align: none; }    /* §2 — see below */

@media (prefers-reduced-motion: reduce) {
  :root { scroll-snap-type: none; }
}
```

`--bar-h` and `--scroll-pad` are tokens because the status bar's `block-size` and this padding are the same measurement twice; §9's bar takes `block-size: var(--bar-h)` so the two cannot drift.

The exemption is a **modifier class on §2's `<section>`**, matching `.section--hero`, rather than an id selector: the page's stylesheets carry no id selectors, and a developer restructuring §2 should meet the exemption in the markup they are editing rather than in a stylesheet they have no reason to open. It is the one markup change this feature needs.

#### Where the declarations go, and the trap under them

`scroll-snap-type` goes on `:root`. It does **not** propagate from `body` to the viewport the way `overflow` does — and `body` carries `overflow-x: hidden` here, which *does* propagate, so the viewport is the scroller and `body` is not. Putting either declaration on `body` or on `<main>` is silent: nothing errors, nothing snaps. The harness asserts the declaration sits on the element that actually scrolls (A1) rather than that it exists somewhere.

#### `scroll-padding-block-start` — the value and why it is not 48px

The sticky bar is 48px, so `scroll-snap-align: start` without scroll-padding rests every section start *underneath* it. But the bar's own hairline is not the only line in play: each section opens with a full-width `--hair` rule carrying its stencil tag, and that rule's line sits 7.89px below the section's top edge. Padding of exactly the bar height would park a section's rule 7.89px under the bar's rule — two parallel hairlines reading as one accidental double rule, which is the page's own separator motif turned into a seam.

The padding is therefore **the bar plus one `--rhythm`**: 72px. Measured on the shell, that leaves **32.2px of clear ground at 1280×900 and 31.67px at 375×553** between the bar's rule and the section's rule. The binding property is the clearance, not the 72 (A3).

This declaration is not part of the snap feature and does not come out with it. It governs where *any* scroll-into-view lands — anchors, the skip link, and the browser's own find-in-page — all of which otherwise land under a sticky bar. It stays under reduced motion, and it stays if snapping is ever removed.

#### The snap set, and §2's exemption

Five of the six sections carry `scroll-snap-align: start`. **§2 carries `scroll-snap-align: none` through `.section--no-snap`, stated explicitly rather than left to fall out of its height.** The exemption is written rather than inferred: §2 measures taller than the snapport at every viewport, which by itself makes its interior a free resting region under CSS scroll-snap's rules for oversized areas — but that follows from a height, and a height is not a promise. A section whose playback guarantee depends on not being repositioned says so in a declaration.

**Why §2 in particular.** Its playback core is sized to the viewport less the status bar, and its playback gate is a visibility threshold — below `--bp-wide` the chain starts at ≥95% visibility of the core and pauses below 90%. A snap position anywhere near that core competes with the gate rather than serving it: proximity snapping is user-agent-thresholded, so it cannot be relied on to *deliver* 95%, and a snap that lands the reader at 94% is worse than no snap at all — the section silently never plays.

**What happens either side of it.** Nothing snaps from the hero's snap range through to §3's. Measured on the shell by sweeping every rest position across the transition at a 40px step: **of every sampled position where §2's core is ≥90% visible — 15 at 1280×900, 5 at 375×553 — the user agent moved not one.** The exemption is verified as a property (A7), not asserted as an intention.

The boundaries themselves behave as the mechanism implies. Approaching §2, the hero's snap range still attracts: at 1280×900 the hero is shorter than the snapport and attracts to scroll 0; at 375×553 it is taller, so its snap positions form a range and the attracting one is the position where its bottom edge meets the fold. Leaving §2, §3's start attracts from roughly a third of a viewport out — by which point §2's core is off screen and playback has already paused on its own threshold. If a future engine's proximity range were wide enough to violate A7, the fix is bounded and named: **§3 takes `.section--no-snap` as well and the snap set begins at §4.**

#### Proximity, never mandatory

`mandatory` is not a stronger version of this feature; it is a different one, and it breaks three things this page has already committed to:

1. **Content taller than the snapport becomes unreachable.** §4's four spec-sheets and §1 exceed a phone viewport; under `mandatory` the middle of an oversized section is not a valid rest.
2. **200% zoom is the same failure, everywhere.** At 200% every section is taller than the snapport, so `mandatory` would make the whole page unreadable at the zoom level §7 promises to reflow at.
3. **Find-in-page lands on a match and is then pulled off it.** Proximity's bounded, direction-aware pull is what keeps a match on screen.

`scroll-snap-stop` stays at its initial `normal`. **`always` is scroll-jacking by declaration** — it forces a stop at every section and takes the fling gesture away from the reader. It is the obvious "improvement" here and it is banned (A5).

#### Reduced motion: snapping is off

`prefers-reduced-motion` does not disable scroll-snap; CSS does nothing automatic here, so this is a ruling and it is made once, in one media query. **Under `prefers-reduced-motion: reduce`, snapping is off.**

The thing being suppressed is not the snap *position* — it is the glide to it. Every engine animates that adjustment, and no author declaration bounds it: `scroll-behavior` governs author-initiated scrolls, not the user agent's snap correction. Every other motion on this page is capped by a token (`--pulse-period`, `--countup-duration`, `--reveal`); this one cannot be. It is also post-gesture — it begins after the reader has stopped — and it moves the entire viewport, which is the largest surface the page can move. Unrequested, unbounded, viewport-scale, after the reader stopped: that is the profile the media query exists for.

Turning it off costs no content. No section moves, no composition changes, nothing is hidden, and the reduced path here simply *is* the page. That matches the rule every other reduced path on this page follows.

The counter-argument, stated and rejected: snapping is position selection rather than animation, and a reader who uses it for orientation loses an aid. Rejected because the aid is a refinement on a composition that already separates sections by 96–168px of air and a full-width ruled tag. Orientation does not depend on it. `--scroll-pad` stays on regardless, so anchors and find-in-page still land clear of the bar.

#### Phone and desktop both

Snapping applies at every viewport. The mechanism and its bound are identical on both, and the pull is a fixed fraction of the snapport, so it scales with the screen rather than needing a rule per screen. Gating it on `--bp-wide` would key an interaction decision to a page-*chrome* breakpoint; the honest reasons to exclude phones — fling momentum and dynamic browser toolbars — are pointer and platform properties, not width, and neither changes whether the resting position is the right one. On a phone, section boundaries are also where snapping earns the most: it is the arrival at a new section, under a sticky bar, that is otherwise half-scrolled.

#### Measured behaviour (Blink, on this shell)

| Property | 1280×900 | 375×553 | 360×640 | 720×450 @200% |
|---|---|---|---|---|
| Proximity range — furthest rest the UA still pulls in | 275px | 159px | 189px | 123px |
| …as a fraction of the snapport | 0.306 | 0.288 | 0.295 | 0.273 |
| Bar rule → section rule clearance when snapped | 32.2px | 31.67px | — | — |
| Rest positions with §2's core ≥90% visible that were moved | 0 of 15 | 0 of 5 | — | — |

The pull is ≈0.3 of the viewport height and consistent across four viewports; it is a user-agent constant, not a value this spec sets, and nothing in the design may depend on its exact size.

Keyboard, driven with real key events: ten `ArrowDown` presses from the top of the page produce ten strictly increasing positions at both viewports — identical to the snap-off sequence at 1280×900, and differing at 375×553 by a single 16px adjustment on one press before resuming its 40px step. `PageDown` reaches the document end with no backward step and no section skipped; on the phone the later presses land exactly on section starts, which is the feature doing its job. **Section heights change as sections land, so these are evidence of the mechanism rather than constants** — every figure is re-derived from the page by the harness.

#### It takes no slot in the motion budget

Scroll-snap is not one of §10's three live elements and does not become a fourth. That budget governs *ambient* motion — what runs because the page is open. Snapping runs only in direct response to the reader's own scroll, stops when they stop, and is off entirely under reduced motion.

#### Assertions — relationships, not values

| # | Assertion | Fails when |
|---|---|---|
| A1 | `document.scrollingElement` is the root element and its computed `scroll-snap-type` is exactly `"y"` | the declaration is moved to `body`/`<main>` (silently inert), the axis changes, or someone sets `mandatory`. **`y proximity` serialises as `"y"`** — `proximity` is the initial strictness and is omitted; an assertion on the literal `"y proximity"` fails a correct build, and `mandatory` serialises in full, so this one string covers both properties |
| A2 | computed `scroll-padding-block-start` = measured `.statusbar` height + computed `--rhythm` | the bar's height and the padding drift apart. Never hardcode 72 |
| A3 | with a section snapped, its `.rule__line` top − `.statusbar` bottom ≥ `--gap-hairline` | the section's rule creeps back into the bar's rule |
| A4 | exactly the `.section` elements other than §2 compute `start`; §2 computes `none`; **no other element in the document computes a non-`none` `scroll-snap-align`** | a snap-align is added inside §4, the terminal, or a card |
| A5 | every snap area computes `scroll-snap-stop: normal` | `always` is introduced |
| A6 | §2's terminal log — the `<ol>` that carries its own `overflow` and `tabindex` — computes `scroll-snap-type: none` | the section's own scrollback starts quantising. `scroll-snap-type` is not inherited, so this holds by default; the assertion is there because a nested scroller silently gaining snap is invisible until a reader is inside it |
| A7 | sweeping rest positions across §2, every sampled position where the playback core is ≥90% visible rests where it was put | the exemption is weakened or a neighbouring snap position moves close enough to disturb playback |
| A8 | ten `ArrowDown`s strictly increase the scroll position; `PageDown` reaches the document end with no backward and no zero step | scrolling is trapped or a section is skipped. **Drive this with real key events (`Input.dispatchKeyEvent`), never `window.scrollBy`** — programmatic and input-driven snapping differ in Blink, and the programmatic version reports a trap the reader never experiences |
| A9 | at 720×450 CSS with `deviceScaleFactor: 2`, each section's last child scrolls fully into view and clear of the bar | oversized content becomes unreachable at 200% zoom |
| A10 | under `prefers-reduced-motion: reduce`, `scroll-snap-type` is `none` and `scroll-padding-block-start` is unchanged | the ruling above is lost, or the padding is switched off with it |
| A11 | `scrollIntoView()` on the last paragraph of §4 settles fully inside the viewport with its top below the bar | a snap adjustment steals a scroll-into-view target — the mechanical stand-in for find-in-page |

**What A11 does not cover, stated plainly.** The browser's find UI is not scriptable, so A11 exercises the same scroll-into-view-then-snap path the find uses without being the find. Real find-in-page is a manual check in both engines and belongs in the verification record as one.

#### Cross-engine

The WebKit half of this project's gate renders static thumbnails through QuickLook, which does not scroll — so **scroll behaviour is the one thing the existing WebKit harness cannot verify.** WebKit's support for these properties is not in question; its *behaviour* under momentum scrolling is, and iOS is where a proximity pull is most likely to read as the page fighting the reader. Until a driven WebKit path exists on this project, WebKit verification for this feature is a named manual check — Safari on desktop, and one pass on a real iPhone — recorded with the same weight as a harness result and never reported as a mechanical pass.

#### Removal path

The feature is `scroll-snap-type` on `:root`, two `scroll-snap-align` declarations, and the reduced-motion query — one block, four lines. Deleting them removes it completely with **zero layout consequence**: no element's size, position, or rhythm depends on it, and `.section--no-snap` left on §2's markup is inert. `--bar-h`, `--scroll-pad`, and `scroll-padding-block-start` are not part of that block and stay — they serve anchors, the skip link, and find-in-page whether or not anything snaps.

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
| **Roster formation** | PM hub + eight plates on a bus-bar — hero-scoped; ships with the hero spec. The bus-bar `+` terminals reuse registration-mark styling |

## 9. Status bar (shell chrome)

Sticky at top, `block-size: var(--bar-h)` (3rem), opaque `--ground`, 1px `--hair` bottom rule. The height is a token because §7.1's `--scroll-pad` is derived from it — the bar's height and the distance every scroll keeps clear of it are the same measurement, and a literal in one of the two places lets them drift. Contents, all `--text-label`:

| Slot | Element | Owner |
|---|---|---|
| Left | Brand lockup — the 6×9px pennant, the `MUSTER` wordmark in mono uppercase `--ink`, and a **static** rust underscore. Both marks are `aria-hidden`, so the header's accessible name is exactly `MUSTER`. Geometry and rationale: `brand-seats.md` §4 | Content (the wordmark string), `brand-seats.md` (treatment) |
| Right | `⟨pulse dot⟩ OPERATIONAL` — dot per §10.2, word in `--muted` | this spec |

The lockup carries two graphical marks and no accent *text* — rust at `--text-label` would measure
4.19/4.35 and fail AA small text (§2.3.2). The underscore is a drawn 2px bar rather than a typed `_`
because a typed one sets at `--hair` weight and at a font-dependent depth across the mono fallback stack;
`brand-seats.md` §4 states that ruling and its accessible-name consequence.

**No theme control ships.** Theme selection is the reader's system preference, honoured via
`prefers-color-scheme` (§2.1). Both themes are first-class, and neither is something the reader is asked
to choose on arrival: the page's argument is restraint — one CTA, no badges, no furniture — and a control
that adds a decision nobody asked to make cuts against it. The `:root[data-theme]` escape hatch in §2.1
stays in the CSS for QA to force either theme; nothing in the UI sets it.

## 10. Motion — exactly three live elements, plus the curl cursor

The complete motion inventory of the page. **A fourth live element is a deviation (A-007).** Every path is `prefers-reduced-motion`-gated and every reduced path renders complete content.

**Scope (settled): the §2 replay is content playback, not a live element.** The "exactly three" budget governs *ambient* page motion — the motion that runs because the page is open. The replay is user-facing content mandated by §2 itself: scroll-triggered, plays once, holds a complete end state, and renders its full transcript with motion off. It is specified in `section-02-replay.md` and occupies no slot here. The budget is closed at three plus the curl cursor.

**Section snapping is not a live element either** (§7.1). It is the user agent settling a scroll the reader started, it stops when they stop, and it is off entirely under reduced motion — ambient it is not.

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

### 10.1 Hero terminal stream (element 1)
Streams the real run-log with rust *markers* on key beats. Specified in `section-01-hero.md` §7; it inherits the terminal component and emphasis rules from `section-02-replay.md` §9, including the §9.2 left-edge system.

### 10.2 OPERATIONAL pulse (element 2)
Appears in the status bar and as the terminal live indicator. **Clearly alive at a glance — subtlety is a defect here:**

- Core: 8px circle, solid `--accent`, never below 85% opacity.
- Ring: expanding `--accent` ring from the core edge to +8px radius, opacity 0.55 → 0, over `--pulse-period`; a second ring launches at 50% phase so the lamp is never still.
- Core brightness oscillates 100% → 85% → 100% in the same period.
- Reduced motion: static solid `--accent` core at 100% + the `OPERATIONAL` word — state fully communicated without the animation (text channel, not colour-alone).

### 10.3 Scroll-triggered count-up (element 3)
Readout metric values count from 0 to their exact value over `--countup-duration`, ease-out cubic, triggered once per page load at ≥55% cell visibility. Scope: the hero dual readout and the shipped-with cards; the replay section's totals strip is deliberately static (see `section-02-replay.md` §7, annotation 7).

- **Decimals roll as decimals**: 9.3 animates 0.0 → 9.3 with one decimal place preserved throughout; the final frame renders the exact source string.
- Tabular numerals; the cell is sized by its final value — zero layout shift.
- Digits are flat `--accent`. No gradient, no glow — a tinted number reads as marketing, a flat one reads as measured.
- Dashes (unmeasured metrics) never animate.
- Reduced motion: final values render immediately.

### 10.4 Curl cursor (permitted extra)
8×17px block, `--accent`, after the curl command; blinks at `--cursor-period`, `steps(1)`. Reduced motion: solid, static. `aria-hidden`.

### Reduced-motion summary table

| Element | Default | `prefers-reduced-motion: reduce` |
|---|---|---|
| Hero stream | streams | complete log rendered static |
| Pulse | double-ring pulse | solid lamp + label |
| Count-up | rolls to exact value | exact value immediately |
| Cursor | blinks | solid block |
| Header underscore | static | static — the same mark, unchanged |
| §2 replay | timed playback | complete transcript (see replay spec) |
| Section snapping | proximity snap on section starts | off — the reader's scroll rests exactly where they left it (§7.1) |

## 11. Accessibility foundation

- **Landmarks**: `<header>` (status bar) · `<main>` (all six sections) · `<footer>`. Every section is `<section aria-labelledby>` a heading it contains — the hero by its `<h1>`, §02–§06 by their stencil-tag `<h2>`.
- **Heading tree**: one `<h1>` (hero headline) → five `<h2>` (the §02–§06 stencil tags, §12) → `<h3>` only inside components that need it. No skipped levels. The hero carries no stencil tag; its `<h1>` is the section's heading.
- **Skip link**: first focusable element, "Skip to content" → `#main`; hidden until focused, then `--surface` card + focus ring at top-left.
- **Focus**: 2px solid `--accent` outline, 3px offset, on all interactive elements (§2.3.5). Never `outline: none` without this replacement.
- **Touch targets**: ≥44×44px on coarse pointers — small chrome (chips, replay controls) extends its hit area via padding while the visual stays small.
- **Forced colors**: every interactive element carries a real border; icons are inline SVG or glyphs (no background-image icons); state never rides on background colour alone. Verify with `forced-colors: active` emulation.
- **Colour is never the sole channel**: rust marks pair with glyph shape, weight, or text (e.g. pulse + "OPERATIONAL"; ✓ + "match").
- **200% zoom** reflows without horizontal scroll or clipped content, and every section's content stays reachable — which is why section snapping is `proximity` and never `mandatory` (§7.1).
- **Scrolling stays the reader's** (§7.1): no script touches the scroll position; keyboard paging, arrow-key stepping, and find-in-page all survive snapping, each asserted rather than assumed. `scroll-padding-block-start` keeps anchors, the skip link, and find-in-page matches clear of the sticky bar whether or not anything snaps.

## 12. Page skeleton

```
┌─────────────────────────────────────────────┐
│ STATUS BAR  ▌MUSTER_        ● OPERATIONAL   │ sticky, opaque
├─────────────────────────────────────────────┤
│  §1 HERO (h1, roster formation, curl,       │
│      terminal preview, dual readout)        │
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

**Locked by the seed (authoritative):** all twelve hex values · mono/sans pairing and duties · tracked-uppercase stencil labels · metrics in tabular mono rust · grain + top vignette · all motifs in §8 · matte/sharp/opaque surface rules · exactly three motion elements + cursor · 64ch reading column · full-width section rules · spacious as overriding constraint.

**Founder-authored, not seed-locked:** the pennant and its five-point geometry, supplied as artwork in `design-specs/brand/`, and the four rulings about where it seats. Sizing at each seat is craft and is decided in `brand-seats.md` §2 — the artwork gives a silhouette and a ratio, not a page size.

**Designed here (the craft):** the section-snap system — proximity on the document scroller, `--scroll-pad` derived from the bar so a section's rule never abuts the bar's rule, §2's declared exemption and the sweep that verifies it, the reduced-motion ruling, and the eleven relationship assertions. The reference has no scroll behaviour of any kind.

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
