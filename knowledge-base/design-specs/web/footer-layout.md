# Footer — layout

**Surface type**: the footer's composition — the boundary separator, one closing sentence, the
receipts row, the contact link. Strings are `footer-copy.md`'s (Content-owned) and are quoted here
only to name which candidate ships.
**Consumers**: Developer (builds the composition), QA (derives the footer layout checks), PM
(reviews against the alignment system)
**Inherits**: every token in `page-shell.md`; the alignment system in `page-shell.md` §7.2; the
boundary separator geometry in `brand-seats.md` §5. No new token.

---

## 1. The composition — four blocks, top to bottom

```
──┤▸├──────────────────────────────────────────   1 boundary separator (full-width)
  Specced, written, and reviewed by Muster's       2 closing sentence — --text-lead
  AI team — 5 of 8 agents, the other three
  never invoked, 1 operator — on a framework
  designed and built by Kanwar Sandhu, solo,
  shipping his own products with it.
  REPO · QUEUE · HANDOFFS · DECISION LOG ·         3 receipts row — --text-micro
  VERIFY · FRAMEWORK
  github.com/thinkArhant                           4 contact link — --text-body
```

1. **The boundary separator** — the section-rule construction minus the tag: line, tick, pennant
   (6 × 9), tick, line, seated at the container's content edge, entirely `aria-hidden`. It
   **replaces** the footer's plain `--hair` top border — one boundary, one rule
   (`brand-seats.md` §5 owns the ruling and geometry).
2. **The closing sentence** — `footer-copy.md` §2's string, set at **`--text-lead` / `--lead-lead`,
   `--font-sans`, 400, full `--ink`**, capped at the reading column. Lead scale is the ruling: the
   page's closing statement in the same voice as its section intros — a signature, not fine print.
   At body scale the sentence rendered as legal-notice furniture; at lead it reads as the page's
   last deliberate sentence. It carries two nowrap units — §2 below.
3. **The receipts row** — six links, `--text-micro` mono labels, uppercase by the page's shared
   mono-label transform, separated by `·`, wrapping freely at narrow widths. Directly under the
   sentence at `--gap-flow`: the receipts are the sentence's own evidence and sit with it.
4. **The contact link** — `github.com/thinkArhant` on its own line at `--gap-block`, `--text-body`,
   the page's standard body-link treatment (ink text, 1px accent underline). Last block on the
   page.

**Alignment**: all four blocks hang on the rail; no counterweight, no centered element
(`page-shell.md` §7.2). Vertical rhythm is one-sided per the shell: separator → sentence at
`--gap-block`, sentence → receipts at `--gap-flow`, receipts → contact at `--gap-block`; the
footer's own block padding comes from `--gap-section`'s floor, not a new value.

## 2. How the sentence sets — measured, and the two units it holds

Measured in Blink on the shipped tokens, dark, at four widths: **3 lines at 1600 and 1280** (20px on
a 32px lead, 799.16px column), **5 at 430**, **6 at 375**, **7 at 320** (17px on 27.2px). WebKit sets
the same three lines at desktop scale with its own break points. No WebKit evidence exists at phone
widths — the only WebKit on this machine cannot be given a viewport.

**Two runs are held as nowrap units: the founder's name, and `never invoked`.** Untreated, the
sentence breaks **`Kanwar / Sandhu`** across lines at 375 and at 320 — a personal name split in two
in the page's closing signature — and at 1280 it breaks between the adverb and its verb inside the
participation aside. Both units cost **zero lines at every measured width** (1280 stays 3 at 96px;
375 stays 6 at 163.13px), and both move their break onto a phrase boundary instead of into a unit.

The mechanism is the page's own: a style-only span, as the headline's phrase units and the kicker's
sentence spans are. The text content and the announced string are untouched, so the byte equality
`footer-copy.md` asserts is unaffected — which is the whole reason the fix is a span and not a
non-breaking space inside the string.

A name is treated as unbreakable for the same reason a scope label is: it is one token to a reader
even though it is two to a line-breaker.

## 3. Both themes, contrast

Every pair is the shell's measured table (`page-shell.md` §2.2): sentence and contact link
`--ink` on `--ground` (14.37 / 12.15 ✓ AAA); receipts labels `--muted` at micro scale
(5.61 / 5.13 ✓ — labels); link underlines and the separator's lines/ticks are the standing
treatments. The separator's pennant is `--accent` graphical (4.19 / 4.35 ≥ 3:1 ✓). No new pair.

## 4. Assertions

Each protects a relationship:

1. **One boundary, one rule** — the separator construction renders exactly once above the footer,
   `aria-hidden` throughout, its pennant 6 × 9 with height equal to `.rule__tick`'s; and the
   footer's own `border-block-start` is retired (no second rule within a rhythm unit of the
   separator). Fails if the plain border returns and doubles the boundary.
2. **The signature scale** — the closing sentence computes `--text-lead`'s size (read the token,
   compare computed-to-computed), while the receipts row computes `--text-micro`'s; the sentence
   is the largest text in the footer. Fails if the footer flattens back to body-and-micro.
3. **No lockup** — the footer contains no `.brand`, no wordmark, no underscore
   (`brand-seats.md` §8). Fails if a footer lockup sneaks in.
4. **Rail alignment** — each of the four blocks' border-box inline-start equals the container's
   content inline-start (the shell's §7.2 relationship, asserted per block, footer included).
5. **The units hold** — the founder's name and `never invoked` each report exactly one client rect
   at 1280, 375 and 320. Fails the moment either splits across a line, which is the defect the
   spans exist to prevent. The sentence's `textContent` stays byte-equal to the copy file's, so a
   span that leaked a character would fail that check instead.

String equality, link hrefs, and the no-email sweep are `footer-copy.md`'s checks and stay there.

## 5. Provenance

Decided here: the four-block composition; lead scale for the closing sentence, judged from renders
against the body-scale alternate; the separator replacing the plain top border; the two nowrap
units, chosen from measured line-break output rather than from a reading. Strings: `footer-copy.md`
(Content). Separator geometry: `brand-seats.md` (founder-ruled seat). From the direction reference:
nothing — its footer predates the receipts row and the participation truth.
