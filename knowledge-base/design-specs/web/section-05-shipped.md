# §5 — Shipped with Muster: treatment

**Surface type**: §5's design ruling — the hierarchy of the four prose lines and the composition of
the two readout cards.
**Consumers**: Developer (builds the treatment), QA (derives the §5 hierarchy and card checks)
**Inherits**: every token in `page-shell.md`, and its §8.1 readout cell. No new size, weight outside
the page's 400/700 pair, colour, or motion token is introduced here.
**Sources**: strings are `section-05-copy.md`'s and are not restated here.

---

## 1. The prose hierarchy

**§5 runs four prose lines at `--text-body`, and exactly one carries the section's emphasis: the
provenance line, `--font-sans`, weight 700, full `--ink`.** The other three sit at 400.

The ranking, per the content-hierarchy method: if a reader takes one sentence from §5, it is the
provenance line — the founder-supplied claim that the framework existed as working practice before
it existed as a repo. The two Bodh lines introduce the exhibit and price it; the this-page line ties
the dashed card to the meter. All three are context for the claim, not the claim. Weight is the
right lever because scale is not free here: the section already carries two instrument cards and a
heading, and a second display-scale voice would compete with them. A second weighted line would make
§5 two primaries and neither.

**Bold-at-body is the page's own strongest-line grammar** — §4's sheets carry their bolded title
sentence at 700 and the mechanism rows bold their labels; §5's strongest line takes the same weight
and earns the same read.

**The emphasis rides a run inside the paragraph, never the paragraph.** `--read-max` is `64ch` and
`ch` is the advance of the element's own zero, so weighting the `<p>` resolves its column ~8.7%
wider than its neighbours' and the block goes ragged. Bolding a run spanning the sentence leaves the
paragraph's own font — and therefore the column — untouched. Measured on the proposed state, Blink
1280×700 and 1600×900, dark: all four lines start on the rail and compute a 685.31px column.

**No prose figure takes the instrument treatment.** Rust and the readout size are what makes a cell
an instrument; a figure moving from a labelled cell into a sentence does not bring them with it.
§5's prose block computes zero accent-coloured elements — measured, not assumed.

## 2. The cards — two cells each, cards side by side

**Each card stacks its two cells vertically, with a `--hair` rule between them, and the pair sits
side by side above `--bp-wide`.** Cell treatment is `page-shell.md` §8.1 in full: answered values
rust at `--text-readout`, the unanswered one an ink em-dash, each sub-line under the value it
qualifies, every cell reserving its sub-line row, no card-level caption.

The side-by-side pairing *is* the section's argument. Both cards ask the same two keys in the same
order, so the reader compares them cell for cell across a 24px gutter without moving down the page —
and the reserve keeps every key, value and rule on one row across the pair, so the comparison is
never read across a step.

**Two cells still read as an instrument, and the sub-line asymmetry reads as deliberate.** Judged
from renders in both engines: the surface, the border, the registration marks, the micro keys and
the readout values carry the instrument register on their own; the cell count was never what carried
it. Each card's sub-line sits the same distance below its own value — 42.0px, measured, in both
cards — so a sub-line under card one's second cell and card two's first reads as a matrix answered
on a diagonal, not as one card missing something. Removing either sub-line to make the pair
symmetric would delete a qualifier that belongs to a specific value.

**Measured, Blink, dark, on the proposed state** — card heights equal at 361.8px (1280×700 and
1600×900) and 301.8px (375×553 and 320×568); corresponding keys and values on identical block-starts
across the pair at every width; card one and the prose block on the rail. WebKit renders the same
composition, values and alignment at its own scale. No WebKit evidence exists at phone widths — the
only WebKit on this machine cannot be given a viewport.

### 2.1 The alternative, measured and rejected

| Composition | Verdict |
|---|---|
| **Cells stacked, cards side by side** | **Ships.** The two scopes are adjacent, the comparison is horizontal and short, and each card is a 500 × 362 surface with no dead quadrant |
| Cells side by side, cards stacked full width | Rejected on measurement: 225.8px per card plus the gap is **475.6px against 361.8px**, 113.8px taller for a worse read. Each card becomes a 1024px-wide box holding two short cells, so the lower half of every card is empty ground; and the two scopes stop being adjacent, so the comparison the section exists to make crosses a card boundary |

## 3. What does not change

- Line order, the `.shipped__line` rhythm, the 64ch cap, and full-ink colour.
- The line's markup emphasis is style-scoped (a class or `<b>` per `page-shell.md` §3's in-passage
  emphasis rule); the announced string is unchanged, byte-equal to the copy file's.
- No rust in the prose: the emphasis system is weight, never colour (`page-shell.md` §2.3).

## 4. Assertions

Each protects a relationship:

1. **One primary line.** The four `.shipped__line` elements share one computed font-size
   (`--text-body`), and exactly one — the provenance line, matched by its string — computes weight
   700; the other three compute 400. Fails if the hierarchy flattens, migrates, or a size fork
   sneaks in with the weight.
2. **The emphasis is weight alone.** The provenance line's computed `color` equals the other lines'
   (`--ink`), and no element inside §5's prose block computes the accent as `color`.
3. **One column edge.** All four lines compute equal inline-start and equal width. Fails if a
   weighted `<p>` re-resolves its own `ch`.
4. **The pair is comparable.** The two cards compute equal block-size; the *n*th key and the *n*th
   value compute equal block-start across the pair; each sub-line's offset below its own value is
   equal across the pair; card-level captions total zero. Never assert a literal height.
5. **The dash is inert.** The unanswered value computes `--ink`, `animation: none` and
   `transition-duration: 0s` in the default path and under `prefers-reduced-motion: reduce`, and
   renders its final glyph with scripts stripped.

## 5. Provenance

Decided here: the provenance line as the primary and weight at body size as the lever; the run-level
emphasis that keeps the column; the two-cell card composition and the side-by-side pairing, chosen
against a rendered and measured alternative. From the direction reference: nothing.
