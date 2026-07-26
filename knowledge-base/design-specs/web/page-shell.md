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
| `--text-display` | `clamp(2.4rem, 6.5vw, 4.25rem)` / 1.05 | mono bold, uppercase, tracking .01em | Hero headline only |
| `--text-kicker` | `clamp(1.5rem, 3.5vw, 2.25rem)` / 1.3 | sans | Section statements, `--ink` |
| `--text-lead` | `clamp(1.0625rem, 1.9vw, 1.25rem)` / 1.6 | sans | Hero lead, section intros, `--ink` |
| `--text-body` | `1.0625rem` (17px) / 1.7 | sans | Paragraphs, `--ink`, max 64ch |
| `--text-label` | `0.75rem` (12px) / 1.4 | mono, uppercase, tracking .18em | Stencil tags, chrome, `--muted` |
| `--text-micro` | `0.6875rem` (11px) / 1.5 | mono, uppercase, tracking .14em | Captions, readout keys, `--muted` |
| `--text-terminal` | `0.8125rem` (13px) / 1.9 | mono | Terminal log lines (component-scoped) |
| `--text-readout` | `clamp(1.5rem, 3vw, 1.875rem)` / 1 | mono, tabular-nums | Metric values, `--accent` — floor 24px keeps rust at AA-large |

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

One idea per screen. Full-width hairline section rules span the viewport; content sits in the container; reading passages sit in the 64ch column. Layouts must reflow at 200% zoom without horizontal scroll; `user-scalable` is never disabled.

## 8. Motifs

| Motif | Spec |
|---|---|
| **Stencil section tag** | `§02 · WATCH IT SHIP` — `--text-label`, `--muted`, preceded by an 8×8px `--accent` square. Semantically the section's `<h2>` (visually a label; the heading tree is real) |
| **Hairline rule with machined end-ticks** | 1px `--hair` line, full-width, with 9×1px perpendicular ticks at both ends of the centered tag. Decorative: `aria-hidden` on the rule construction, never information-bearing |
| **Registration marks** | `+` glyphs, `--muted`, `--text-micro`, at the outer corners of instrument surfaces (terminal, readout strips). Sparse — two per surface maximum, `aria-hidden` |
| **Instrument readout cell** | `--surface` card, `--hair` 1px border, sharp corners. Key: `--text-micro` `--muted`. Value: `--text-readout` `--accent` flat, tabular. Sub-line: `--text-micro` `--muted`. Unmeasured value: `--ink` em-dash + sub-line "measured at launch" — dashes never count up |
| **Chip** | `--text-micro`, 1px border. Default: `--hair` border, `--muted` text. Emphasis (e.g. `VERIFY ⎘`): `--accent` border, **`--ink` text**, rust glyph — rust text at chip size would fail AA (§2.3) |
| **Spec-sheet rows** | Label column `--text-label` `--muted` + `--hair` row rules; value cells `--ink`. Mechanism row value in `--accent` at ≥19px bold, or ink with rust marker. Full detail ships with the decisions-section spec |
| **`OPERATIONAL` status bar** | See §9. Sticky, opaque, hairline-ruled |
| **Roster formation** | PM hub + eight plates on a bus-bar — hero-scoped; ships with the hero spec. The bus-bar `+` terminals reuse registration-mark styling |

## 9. Status bar (shell chrome)

Sticky at top, `height: 3rem`, opaque `--ground`, 1px `--hair` bottom rule. Contents, all `--text-label`:

| Slot | Element | Owner |
|---|---|---|
| Left | Brand wordmark — mono, uppercase, `--ink`, one accent glyph permitted | Content (copy), this spec (treatment) |
| Right | `⟨pulse dot⟩ OPERATIONAL` — dot per §10.2, word in `--muted` | this spec |

**No theme control ships.** Theme selection is the reader's system preference, honoured via
`prefers-color-scheme` (§2.1). Both themes are first-class, and neither is something the reader is asked
to choose on arrival: the page's argument is restraint — one CTA, no badges, no furniture — and a control
that adds a decision nobody asked to make cuts against it. The `:root[data-theme]` escape hatch in §2.1
stays in the CSS for QA to force either theme; nothing in the UI sets it.

## 10. Motion — exactly three live elements, plus the curl cursor

The complete motion inventory of the page. **A fourth live element is a deviation (A-007).** Every path is `prefers-reduced-motion`-gated and every reduced path renders complete content.

**Scope (settled): the §2 replay is content playback, not a live element.** The "exactly three" budget governs *ambient* page motion — the motion that runs because the page is open. The replay is user-facing content mandated by §2 itself: scroll-triggered, plays once, holds a complete end state, and renders its full transcript with motion off. It is specified in `section-02-replay.md` and occupies no slot here. The budget is closed at three plus the curl cursor.

Motion tokens:

```
--pulse-period: 2.2s;
--cursor-period: 1.15s;      /* steps(1) */
--countup-duration: 1.2s;    /* ease-out cubic */
--reveal: 350ms ease-out;    /* single micro-reveal used by replay line entries */
```

### 10.1 Hero terminal stream (element 1 — slot reserved)
Streams the real run-log with rust *markers* on key beats. Full spec ships with the hero section spec; it inherits the terminal component and emphasis rules from `section-02-replay.md` §9.

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
| §2 replay | timed playback | complete transcript (see replay spec) |

## 11. Accessibility foundation

- **Landmarks**: `<header>` (status bar) · `<main>` (all six sections) · `<footer>`. Every section is `<section aria-labelledby>` a heading it contains — the hero by its `<h1>`, §02–§06 by their stencil-tag `<h2>`.
- **Heading tree**: one `<h1>` (hero headline) → five `<h2>` (the §02–§06 stencil tags, §12) → `<h3>` only inside components that need it. No skipped levels. The hero carries no stencil tag; its `<h1>` is the section's heading.
- **Skip link**: first focusable element, "Skip to content" → `#main`; hidden until focused, then `--surface` card + focus ring at top-left.
- **Focus**: 2px solid `--accent` outline, 3px offset, on all interactive elements (§2.3.5). Never `outline: none` without this replacement.
- **Touch targets**: ≥44×44px on coarse pointers — small chrome (chips, replay controls) extends its hit area via padding while the visual stays small.
- **Forced colors**: every interactive element carries a real border; icons are inline SVG or glyphs (no background-image icons); state never rides on background colour alone. Verify with `forced-colors: active` emulation.
- **Colour is never the sole channel**: rust marks pair with glyph shape, weight, or text (e.g. pulse + "OPERATIONAL"; ✓ + "match").
- **200% zoom** reflows without horizontal scroll or clipped content.

## 12. Page skeleton

```
┌─────────────────────────────────────────────┐
│ STATUS BAR  MUSTER          ● OPERATIONAL   │ sticky, opaque
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
