# Brand Seats — where the pennant goes, at what size, and what it is called

**Surface type**: cross-cutting brand treatment — the mark's every seat on the page
**Consumers**: Developer (builds every seat from this file), QA (derives brand validation scope), Content (owns the wordmark string; this file owns its treatment)
**Inherits**: every token in `page-shell.md`. No new colour, size, or motion token is introduced here.
**Authority**: `brand-guidelines.md` §4 records the mark and its geometry; the artwork in `design-specs/brand/` is founder-authored and read-only. This file decides seats, sizes, and accessible names — the things a build cannot infer.

---

## 1. The mark

A cream swallowtail pennant: the standard a formation musters under. Five points, no pole, no staff, no
shadow.

**Geometry** — the authored path is `M0 0 L470 0 L470 703 L235 575 L0 703 Z` on a 470 × 703 viewBox. At
page scale it is not an SVG. It is a `clip-path` on a plain box:

```css
clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 81.79%, 0 100%);
```

81.79% is `575 / 703` — the notch apex — and it is a percentage rather than a length precisely so the
silhouette is identical at every seat size. **The mark is painted with `background-color`, never with
`color`.** That is not a stylistic preference: `qa-independent-audit.mjs` builds its small-rust-text
audit by collecting elements whose *`color`* resolves to the accent, and a mark painted with `color`
would enter that set and be judged as rust text below AA.

**Why no SVG.** The seats that existed before this file were 8 × 8 rust boxes painted with
`background-color`, which is why they have never had a cross-engine problem. `clip-path` on the same box
keeps that property: no new file, no request, and the inline-SVG/WebKit divergence class this project
treats as a known failure mode is avoided rather than tested for. Inline SVG in these seats is a defect.

**Never on a pole.** The mark is the banner alone. Nothing is drawn to its left, no staff, no flagpole,
no mast.

## 2. Size — the ruling, and what decided it

**Two sizes, by seat** (DEC-060, founder-ruled). The header lockup is the page's one brand-scale
seat: wordmark `1.125rem` (18px), mark **9 × 13.5px**. Every separator seat — the five section
tags and the footer boundary (§5) — stays at **6 × 9px**. The founder ruled the header lockup a
real, legible brand logo, superseding the punctuation-scale restraint for that seat alone;
separators keep their size because once the masthead teaches the silhouette, small reads as the
logo rather than as a stray glyph.

### 2.1 The header at brand scale — chosen from renders

The whole lockup derives from one declaration — the wordmark's `font-size` — with the mark at
**0.5em wide × 0.75em tall**: the shipped 12px seat's own 6/12 × 9/12 proportions carried up, so
one ratio governs every seat. Five candidates were rendered in the real status bar, both themes,
both engines (WebKit and Blink), and judged from the renders:

| Candidate | Verdict |
|---|---|
| 12px word, 6 × 9 mark | The judged baseline: reads as a label with a fleck beside it, not as a mark |
| 16px word, 8 × 12 mark | Legible, halfway — still reads as a bigger label; the step to 18px buys a masthead at no cost inside the bar |
| **18px word, 9 × 13.5 mark** | **Ships.** Reads as a brand logo; the swallowtail notch is legible at a glance; the brand block sets ~25px inside the 48px bar with air both sides |
| Founder's cream glyph as data-URI `<img>` | Rejected on measurement: cream `#E6E3D3` on the light ground `#DBD8C6` is ~1.08:1 — the artwork vanishes in the light theme, and a single image asset cannot follow the theme tokens; designing and shipping a second variant would buy nothing the clip-path box does not already give |
| House tile as data-URI `<img>` | Rejected: the tile is the icon seat's form (§6); in the chrome it reads as an app-icon badge and puts a second brand form on a page that otherwise carries one silhouette everywhere |

The `<img>` route was weighed seriously, not dismissed: a data-URI image is zero-network-compliant
(A-004) and is not the inline-SVG/WebKit divergence class. It loses on theme mechanics — the
clip-path box paints `--accent` in both themes with no second asset, keeps the
never-had-a-cross-engine-problem construction, and its silhouette is the authored path restated in
percentages, so nothing of the artwork is lost. The cross-engine renders show the lockup identical
in WebKit and Blink at every candidate size.

### 2.2 What holds at brand scale, unchanged

- **Vertical placement**: the mark's bottom edge sits on the wordmark's baseline
  (`align-self: baseline`). The top overhang above the caps grows in proportion (~0.9px at 18px)
  and keeps the marker-set-against-the-line read.
- **Mark to words**: `--gap-hairline`, at every seat. Re-tuning an adjacent value to compensate
  for a mark's proportions is the failure mode DEC-032 names.
- **The underscore's thickness does not scale**: 2px is the page's single accent-mark weight at
  any lockup size (§4). Its 1ch length follows the wordmark's own resolved face and size, so the
  bar stays exactly one character position wide with no new value.
- **The bar does not move: `--bar-h` stays 3rem (48px).** Measured with the 18px lockup in the
  real bar: bar height 48px, brand block ~25px, vertically centred. Everything derived from the
  bar — the hero fold arithmetic (144 = 48 + 96), §2's phone visibility budget, `--scroll-pad` —
  stands untouched.

### 2.3 The separator scale, kept

The pennant is ~1:1.5 portrait (470:703 = 1:1.4957). At the separator seats 6 × 9 ships, decided
against an 8 × 8 square and two larger candidates rendered in both themes:

1. **9px is the section rule's own end-tick height.** `.rule__tick` is 1 × 9px, and the separator
   construction is a tick, a tag, and a tick. Setting the mark to the same 9px makes the rule read as one
   machined assembly rather than three unrelated parts — the vertical measure is shared, so a change to
   one is a change to the other, which is the relationship a value would have hidden.
2. **A shape carries presence a neutral mark does not.** 6 × 9 puts 23% less ink on the page than an
   8 × 8 square and still reads stronger, because the silhouette is recognisable where a square is not.
   On a page whose overriding constraint is restraint, less ink for more identity is the right direction.
   At 6 × 9 the mark is punctuation at the separator seats, and the page carries the brand shape
   at every section boundary with no extra weight for it.

**The tag's rendered block size must not change** because of its mark: baseline alignment inside a
flex line can grow the line box, and the separator construction is vertically centred in a grid
row, so a 1px growth would shift every section tag off its rule. That is an assertion, not a hope
(§11).

## 3. Seat inventory

| Seat | Count | Treatment | Ships in this sprint |
|---|---|---|---|
| Header lockup | 1 | Pennant 9 × 13.5 + `MUSTER` at 1.125rem + static rust underscore (§4) | Yes |
| Section separators | 5 | Pennant 6 × 9 ahead of the stencil tag (§5) | Yes |
| Footer boundary separator | 1 | Pennant 6 × 9 in the rule construction, no tag (§5) | Yes |
| Favicon | 1 | The supplied house tile, restated at a 16-unit viewBox (§6) | Yes |
| Social tile / avatars | — | `muster-mark-tile.svg` as authored, outside the page (§7) | No |
| **Footer lockup** | **0** | **Ruled out (§8)** | **No** |

## 4. Header lockup

```
  ▌ MUSTER_                                        ● OPERATIONAL
  ↑ ↑      ↑
  1 2      3
```

| # | Element | Spec |
|---|---|---|
| 1 | Pennant | 9 × 13.5px (0.5em × 0.75em of the wordmark's font-size), `--accent`, `clip-path` per §1, bottom edge on the wordmark's baseline, `aria-hidden="true"` |
| 2 | Wordmark | `MUSTER` — `1.125rem` (18px) mono, uppercase, `--track-label`, `--ink`, brand scale per §2.1. Copy is Content's; the string is unchanged by this file |
| 3 | Underscore | A **drawn** rust bar: 1ch long (at the wordmark's own size), 2px thick, top edge 1px below the wordmark's baseline and bottom edge 3px below it. `--accent`. Static — it never blinks. `aria-hidden="true"` |

**Structure.** The underscore is **inside the wordmark's own text run**, not a sibling of the pennant:

```html
<span class="brand">
  <span class="brand__mark" aria-hidden="true"></span>
  <span class="brand__word">MUSTER<span class="brand__rule" aria-hidden="true"></span></span>
</span>
```

`.brand` is `display: inline-flex; gap: var(--gap-hairline)`. An underscore placed as a third flex item
picks up that 12px gap and renders as a rust dash floating clear of the R — measured, rendered, and
rejected. Inside `.brand__word` it is separated from the R only by the wordmark's own `--track-label`
trailing letter-space (0.18em — 3.24px at the 18px brand scale), which is exactly the next character
position. **Do not cancel that
letter-space**; it is what makes the mark read as a prompt caret rather than as an underline.

**Why the underscore is drawn and not typed.** A literal `_` was rendered against the same lockup for
comparison. In `--font-mono` at 12px it sets about 1px thick — `--hair` weight, not accent-mark weight —
and its thickness and its depth below the baseline are decided by whichever face resolves from
`ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono"`. The brand lockup would then look different
on every platform. Drawn, the bar's thickness is 2px everywhere — the page's single accent-mark weight,
the same 2px as the key-beat tick and the narration bar — and only its *position* comes from the font,
via the baseline, which every face has. Its 1ch length tracks the resolved face's character width, so
the mark stays the width of one character position whatever font wins.

**The underscore is not a motion element.** It is static. The `curl` cursor owns the only blink on the
page (DEC-031, DEC-015), and the motion budget stays closed at two plus that cursor. A blinking header
underscore is a new live element and a deviation.

### 4.1 The accessible name — ruled

**The header's accessible name is exactly `MUSTER`.** Both marks are `aria-hidden="true"`; neither the
pennant nor the underscore is announced.

The alternative — the underscore as an announced text character — was considered and rejected on three
grounds. It is not information: the wordmark already carries everything the mark carries. Its
verbalisation is not portable: `_` is announced as "underscore", as "line", or as nothing at all
depending on the screen reader and its punctuation verbosity, so the page's first landmark would greet
different readers with different strings. And the brand's name is Muster, not `MUSTER_` — announcing the
mark would put a typographic device into the product's spoken name on every page.

This also settles it mechanically: because the underscore is a drawn box rather than a character, there
is no text node to announce. The ruling and the mechanism agree, which is why the name cannot drift.

## 5. Section separators — five tagged, one bare

Six separator seats: one per `<h2>` stencil tag (`§02` … `§06`), plus the **footer boundary**. The
pennant is the tag's leading mark and the rest of the construction — line, end-ticks, label — is
`page-shell.md` §8's.

- 6 × 9px, `--accent`, `clip-path` per §1, `aria-hidden="true"`.
- Bottom edge on the tag label's baseline (§2.3).
- `--gap-hairline` between the mark and `§02 · WATCH IT SHIP`.
- The 1 × 9px `--hair` end-ticks either side of the tag share the mark's 9px, deliberately (§2.3).
- `.tag`'s rendered block size is its `--text-label` line box — the mark fits inside it and does not set
  it (§11).

**The footer boundary separator** marks the page's last boundary — main content to footer — with
the same construction minus the label: line, tick, pennant, tick, line, seated where the tag would
start (the container's content edge, per the alignment system). It replaces the footer's plain
`--hair` top rule — two stacked rules at one boundary would be the accidental double line the
scroll-padding ruling exists to avoid. No heading rides it (the footer is not a section and gets no
stencil tag); the whole construction is `aria-hidden`. Every other boundary on the page carries the
mark, and its absence at the last one read as a missing part, which is the founder's finding it
answers. Layout detail is `footer-layout.md`'s.

The hero carries no stencil tag and therefore no separator pennant — its `<h1>` is the section's heading
(`page-shell.md` §11). Six separator pennants, and the header's brand-scale mark is the seventh and
largest mark on the page.

## 6. Favicon

DEC-031 rule 3 keeps icon seats **as supplied**, so the favicon is the founder's house tile — rust
ground, cream pennant — not a re-composition. `design-specs/brand/favicon.svg` authors it on a 1024
viewBox; the page ships it as an inline `data:` URI at a 16-unit viewBox, which is the tile's own
coordinates divided by 64.

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23C05A32'/%3E%3Cpath d='M4.33 2.34L11.67 2.34L11.67 13.33L8 11.33L4.33 13.33Z' fill='%23E6E3D3'/%3E%3C/svg%3E">
```

Decoded, that is a 16 × 16 rust field with the pennant at x 4.33 → 11.67 (7.34 wide) and y 2.34 → 13.33
(10.99 tall) — 1:1.497, the authored ratio — with the notch apex at (8, 11.33), which is 0.818 of the
height. Rendered at 16, 32 and 64px the silhouette reads at every size; the notch is legible from 16px
up.

Four things about this seat that a build gets wrong if they are not written down:

- **Inline, not a file.** A `/favicon.ico` on disk means a network probe on every page load, and zero
  external requests at runtime is a published product claim (A-004). The `data:` URI is the reason there
  is no probe, and it is why this seat does not go through `styles/` or a new asset.
- **It is the rust tile, not a rust pennant on the page ground.** The tile reads at 16px in either
  browser chrome; a cream pennant on `#13140D` would be a thin sliver on near-black, and a rust pennant
  on the ground would be a thin sliver on near-black in rust. A favicon cannot follow
  `prefers-color-scheme` reliably, so it must be legible without a theme, and the supplied tile already
  is.
- **The two hex literals are permitted here and nowhere else.** `verify-shell.mjs:533` exempts lines
  matching `data:image/svg` from the raw-hex ban precisely for this seat. The exemption is what makes the
  seat legal; do not "fix" the hexes into tokens — a `data:` URI cannot reference a custom property.
- **`xmlns='http://www.w3.org/2000/svg'` is required and is already exempt** from the `http(s)` check
  (`verify-shell.mjs:533` excludes lines matching `xmlns=`). It resolves nothing at runtime.

## 7. Social tile and avatars

`muster-mark-tile.svg` as authored, at its 1024 viewBox. These seats live outside the page — a repo
avatar, a social card — and **the page ships no `og:image` today**. If one is ever added it is a real
file in the repo, not a `data:` URI, and it is a crawler fetch rather than a runtime request; nothing
about that seat is decided here. Recorded so the seat is known to exist and nobody invents artwork for
it.

## 8. The footer lockup — still ruled out; the boundary takes a separator instead

`brand-guidelines.md` §4's seat table reads *"Header **and footer** lockup"*. DEC-031 enumerates four
rulings and the footer is not among them. **The footer takes no lockup** — no wordmark, no
underscore, no brand block. What it gains is the boundary separator (§5, DEC-060): the pennant in
the page's own rule grammar, marking the last boundary the way every section boundary is marked.
A separator is not a lockup — it is punctuation in the rule construction, not a second masthead.

The design reason the lockup stays out is unchanged: the footer's closing sentence names Muster and
carries the signature; a wordmark above that line says the same thing twice, less well. The
boundary separator does different work — it closes the page's rule system rather than restating the
brand — which is why one is in and the other stays out.

`brand-guidelines.md` is PM-owned, so its table row is PM's to reconcile against this ruling; it is not
amended from here.

## 9. Both themes

The mark is `--accent` in both themes and introduces no thirteenth palette value (A-006). DEC-017
permits rust on graphical marks at any size, and every seat here is graphical:

| Pair | Dark | Light | Floor | Verdict |
|---|---|---|---|---|
| `--accent` on `--ground` (header pennant, underscore, separator pennant) | 4.19 | 4.35 | 3:1 graphical | ✓ both |
| Favicon: cream `#E6E3D3` on rust `#C05A32` | 3.43 | same (theme-independent) | 3:1 graphical | ✓ |

The favicon is the one seat that does not follow the theme, and that is deliberate (§6). Its 3.43:1 is
above the 3:1 graphical floor and would not be acceptable for text — nothing in that seat is text.

## 10. Accessibility

- Every mark in every seat is `aria-hidden="true"`: pennant, underscore, favicon. The header's
  accessible name is `MUSTER` (§4.1) and the stencil tags' accessible names are unchanged —
  `§02 · WATCH IT SHIP` and its four siblings.
- **Colour is never the sole channel** and these marks carry no channel at all: they are decoration
  beside text that already says what the element is. Removing every one of them loses no information,
  which is the test.
- **Forced colors**: the marks are `background-color` on a box, so `forced-colors: active` will drop
  them. That is correct — they are decorative, and `page-shell.md` §11 requires state never to ride on
  background colour alone. Nothing here carries state.
- The marks are not focusable, not hit targets, and carry no title or tooltip.

## 11. Assertions

Five assertions cover these seats. Each is written as the relationship it protects rather than as the
number it happens to measure.

**Separator marks are the pennant at punctuation scale.** One check, three clauses per separator
seat (the five tag marks and the footer boundary's): it measures 6 × 9, its height **equals
`.rule__tick`'s height**, and its `clip-path` is not `none`. Binding the height to the tick
rather than to the literal 9 is the part that carries weight — the two then move together or the check
fails, which is the shared measure §2.3 chose.

**The header lockup is at brand scale, and the bar did not move.** Three clauses: the header
mark's block-size equals **0.75 × the wordmark's computed font-size** (and its inline-size is ⅔ of
its block-size — the authored ratio, read as a relationship so one declaration scales the lockup);
the wordmark's computed font-size is `1.125rem`; and the status bar's block-size still equals
`--bar-h` with the brand's border box inside it. The last clause is the cascade guard — the hero
fold arithmetic, §2's phone budget and `--scroll-pad` all derive from the bar, so the lockup
growing the bar is the silent failure this assertion exists to catch.

**The tag's vertical construction is set by its type, not by its mark.** `.tag`'s rendered block size is
its `--text-label` line box (16.8px). This is the check that catches baseline alignment growing the flex
line and shifting every section tag off its rule — the separator is vertically centred in a grid row, so
a single pixel of growth is visible across five sections at once.

**Every mark is hidden from assistive tech.** The decorative sweep in `qa-independent-audit.mjs` collects
`.rule__line, .rule__tick, .tag__mark, .regmark, .brand__mark, .pulse` and asserts each is
`aria-hidden`. `.brand__rule` belongs in that set: it is the one mark on the page whose accessible name is
a real question rather than an obvious one (§4.1), so it is the one that most needs asserting. The
footer boundary's construction joins the sweep — its whole rule, mark included, is decorative.

**The underscore is static.** No animation, no transition, and no `--cursor-period` reference on
`.brand__rule`, in the default path and under `prefers-reduced-motion`. The motion inventory is closed at
three plus the curl cursor, and a mark that looks like a terminal caret is the element most likely to be
"improved" into a fourth.

**Cross-engine.** `clip-path: polygon()` on a `background-color` box is the reason this ships without
SVG, and it is well-supported in both engines — but **`align-self: baseline` on an empty flex item is
the one construction here with real WebKit divergence risk**, because there is no text to synthesise a
baseline from. Verify the mark's bottom edge against the text baseline in WebKit **and** Blink, in both
themes, at the header and at one separator. A Blink-only pass is not a pass.

## 12. Provenance

**Founder-authored (read-only, quoted not re-derived)**: the pennant itself and all four artwork files;
the five-point path and its 81.79% notch; the four DEC-031 rulings — header lockup is pennant +
`MUSTER_`, five separators take the pennant, icon seats as supplied, never on a pole; the underscore
never blinks. The two DEC-060 rulings amending them: the header lockup is a real brand logo at
legible size, and the footer boundary carries its separator mark.

**Decided here (the craft)**: the header's brand scale — 1.125rem wordmark, mark at 0.5em × 0.75em
so one declaration scales the lockup — and the rejection of both `<img>` routes on theme
mechanics; 6 × 9 as the separator-seat size and the two reasons for it; the mark's
bottom edge on the baseline; the underscore as a drawn 1ch × 2px bar three pixels under the baseline and
inside the wordmark's own run; the ruling that the header's accessible name stays `MUSTER`; the favicon
restated at a 16-unit viewBox with the tile's own coordinates; the footer boundary separator as the
rule construction minus the tag; the footer lockup ruled out.

**Measured, not derived**: every figure in §2's candidate tables — the brand-scale candidates were
rendered in the real status bar in both themes and both engines and judged from the renders, and
the separator-scale treatments were rendered at 6× against the real tokens in both themes before
one was chosen.

**From the direction reference: nothing.** The reference predates the pennant and contains no brand mark
at all, so no choice in this file traces to it — stated because A-003 requires every spec to say which of
its choices are reference feel cues, and here the honest answer is none.

Nothing in this file is open.
