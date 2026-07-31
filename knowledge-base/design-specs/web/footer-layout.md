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
  never invoked, 1 operator — and designed and
  built by Kanwar Sandhu, solo, shipping his
  own products with it.
  REPO · QUEUE · HANDOFFS · DECISION LOG ·         3 receipts row — --text-micro
  VERIFY · FRAMEWORK
  github.com/thinkArhant                           4 contact link — --text-body
```

1. **The boundary separator** — the section-rule construction minus the tag: line, tick, pennant
   (6 × 9), tick, line, seated at the container's content edge, entirely `aria-hidden`. It
   **replaces** the footer's plain `--hair` top border — one boundary, one rule
   (`brand-seats.md` §5 owns the ruling and geometry).
2. **The closing sentence** — `footer-copy.md` §2's recommended candidate, ruled from renders
   (§2 below), set at **`--text-lead` / `--lead-lead`, `--font-sans`, 400, full `--ink`**, capped
   at the reading column. Lead scale is the ruling: the page's closing statement in the same
   voice as its section intros — a signature, not fine print. At body scale the sentence rendered
   as legal-notice furniture; at lead it reads as the page's last deliberate sentence.
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

## 2. Which sentence ships — ruled from renders

`footer-copy.md` §2 supplies three candidates. All three were rendered in the page's real tokens
(dark, 1280 and 375, both engines) and the recommended candidate was judged against its
alternates:

| Candidate | Verdict |
|---|---|
| **A — team truth first, counts as an aside, authorship closing (33 words)** | **Ships.** Reads in one breath as a signature; "solo" lands beside "AI team"; the audited claim leads |
| B — all eight role names in-sentence (40 words) | Rejected from the render: the name run reads as a recital and the aside swallows the signature; the names live one line below (receipts → queue/ledger) and in `VERIFY.md` |
| C — authorship first (32 words) | Rejected: leads the page's closing line with the human on a page whose thesis is what the AI team shipped; the audited participation claim lands mid-sentence |

Content's recommendation and the render judgment agree; A ships. The string is `footer-copy.md`'s
verbatim and is asserted by byte equality there, not restated here.

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

String equality, link hrefs, and the no-email sweep are `footer-copy.md`'s checks and stay there.

## 5. Provenance

Decided here (DEC-060): the four-block composition; lead scale for the closing sentence, judged
from renders against the body-scale alternate; the separator replacing the plain top border;
candidate A confirmed from renders. Strings: `footer-copy.md` (Content). Separator geometry:
`brand-seats.md` (founder-ruled seat). From the direction reference: nothing — its footer predates
the receipts row and the participation truth.
