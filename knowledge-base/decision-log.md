# Decision Log
<!-- Every product decision with rationale and affected files. PM owns; any agent can append. -->
<!-- Archive entries when count exceeds 50 → move to decision-log-archive.md -->

<!-- ENTRY TEMPLATE:
### DEC-[ID] — [Title] ([DATE])
**Decision**: [What was decided]
**Rationale**: [Why — constraints, tradeoffs, alternatives considered]
**Impact**: [Which agents are affected]
**Touched**: [List of files updated as a result]
-->

## Active Decisions

### DEC-031 — The pennant: where the mark goes and where it never goes (2026-07-26)

**Decision**: The brand mark is the pennant — a cream swallowtail banner, founder-supplied at
`knowledge-base/design-specs/brand/` (tile, glyph-cream for dark grounds, glyph-ink for light, favicon
source). Four rulings:

1. **Header lockup is pennant + `MUSTER_`** — the ~8px rust pennant, the wordmark, and a **static**
   rust underscore. All three. The underscore never blinks: the `curl` owns the only cursor on the page
   (motion budget, DEC-015).
2. **The five section separators take the pennant**, replacing their 8px rust squares. It reads as a
   bookmark marking a new section and carries brand identity through the page.
3. **Icon seats keep the mark as supplied** — favicon, social tile, avatars.
4. **Never render the pennant on a pole.**

**Rationale**: The founder's first ruling was icon-seats-only with a typed wordmark in the header; the
second put the mark in the header and at every separator. The second supersedes, and the header
ambiguity it created (does the underscore survive?) was resolved directly: it does.

**Implementation route, which is why this is cheap.** The existing marks are 8×8px rust squares drawn
as `background-color` on a plain box — no SVG anywhere, which is why they have never had a cross-engine
problem. The pennant is a five-point polygon (`M0 0 L470 0 L470 703 L235 575 L0 703 Z`), so it
expresses as `clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 81.79%, 0 100%)` on the same box. No SVG,
no new file, no network request, and the inline-SVG/WebKit divergence class is avoided entirely rather
than tested for.

**Constraints checked, all clear**: DEC-017 permits rust on graphical marks, so a rust pennant needs no
palette exception (A-006 holds). The favicon is already an inline data-URI — chosen to avoid a
`/favicon.ico` probe — so swapping in the pennant is a content change, not a new request.

**The one real design task**: the pennant is ~1:1.5 portrait where the square is 1:1, so at 8px wide it
sets ~12px tall. That changes the optical weight of every section tag and the header lockup. UI/UX sizes
it optically, not mechanically. Six recognisable brand shapes also carry more presence than six neutral
squares — at 8–12px that stays punctuation; at 24px it would become badging.

**Impact**: UI/UX, Developer, QA.

**Touched**: `brand-guidelines.md` §4, `agent-context/ui-ux.md`, `current-sprint.md`,
`orchestration-queue.md`.

---

### DEC-032 — The terminal's left edge is specified as a system, not patched a value at a time (2026-07-26)

**Decision**: The key-beat tick colliding with the timestamp (gate-3 finding F-G3) is not fixed as a
fourth single-value round. Sprint 2's first build step specifies the terminal's left edge as one
coherent system: all five relationships named and measured (tick↔card, tick↔text, row↔row, entry↔entry,
text↔wrap edge), the tick moved **out of the text flow** into a positioned mark in the log's 12px
gutter, and **one harness assertion per relationship**. No section builds until those assertions land.

**Rationale**: Three consecutive rounds fixed their stated criterion and disturbed an adjacent
relationship — horizontal scroll → entry grouping → tick spacing. The cause is structural, not
carelessness: five relationships derive from two or three shared CSS values, so moving one to satisfy a
finding moves others silently, and every harness passes because it asserts the named value rather than
the relationship. The hanging indent makes it certain: `padding-inline-start: 1ch` with
`text-indent: -1ch` puts the first row at 0 from the border, and on a key beat the border is the tick.

**Cost of the alternative, stated**: each of those rounds cost ~$42 and consumed a founder gate. A
fourth would likely disturb a fifth relationship. Decoupling the tick from text indentation removes the
shared lever entirely, so the class cannot recur rather than being caught next time.

**Also recorded**: PM confirmed this round against a BEAT 01 render, which reveals no key beat and was
therefore structurally incapable of showing the defect. Standing correction for all reviewers — verify
against a render of the state under test, never an arbitrary frame.

**Impact**: UI/UX, Developer, QA, PM.

**Touched**: `wave-review.md`, `current-sprint.md`, `orchestration-queue.md`,
`agent-context/{ui-ux,developer,qa}.md`.

---

### DEC-033 — Sprint 2 runs on two founder gates, and Gate A is rendered (2026-07-26)

**Decision**: Sprint 2 delivers §1, §3, §4, §5, §6 behind exactly **two founder gates**. Gate A is a
combined copy-and-render review before any section is built; Gate B is the assembled page. Everything
else runs autonomously and never reaches the founder.

**Rationale**: Founder ruling — his attention is the scarce resource, and §2's three gates do not scale
to five sections. He refined it usefully: gate density follows *taste*, not section count. §2 earned
its gates (motion, pacing, narration timing); §3, §5 and §6 are text into shell patterns that already
exist.

**Gate A is rendered, and that is the load-bearing part.** Judging §1's headline as text in a file is
impossible — the founder's preferred direction is a typographic device (struck "human", accented "AI
agents"), and "does it land in five seconds" is a visual question wearing copy's clothes. Likewise §4's
spec-sheet copy is inseparable from its rendering. So Wave 1 ends with a Developer step that builds the
headline candidates and one real §4 spec-sheet as a static sample. This converts Gate A from imagining
to looking, at a fraction of a step's cost, and it resolves the §4 tension — the seed calls §4 the
second design centerpiece, so its rendering gets founder judgment without spending a third gate.

**Three sections get no design spec.** §3 (prose in the reading column), §5 (readout cards) and §6 (the
`curl`) are shell patterns already built and validated. Only §1 and §4 carry real design work.

**Scroll-snap builds last.** It cannot be validated before sections exist to snap between, and it is the
likeliest thing to be rejected at Gate B on feel or accessibility, so building it last minimises sunk
cost. Specified with the constraints named: proximity snapping, never JavaScript scroll-jacking, and
§2 exempted — its core already fills most of a phone viewport.

**Settled at planning rather than escalated**: no second §2-style replay. The founder's two-layer
instinct is served by §4's spec-sheets and §5's readout cards — the same show-the-real-artifact DNA in
different form. A second replay would need a corpus DEC-005 forbids agents to generate, and it would
make the first one ordinary.

**Honest cost estimate**: ~$130–150 across thirteen steps, plus fix rounds from two gates. An
earlier ~$80 figure was optimistic — it compared against §2's $97, which also bought the shared design
foundation and the one-time corpus work.

**Accepted risk**: batching gates raises rework exposure if something foundational is wrong and later
work is stacked on it. Mitigated by gate *placement* at dependency boundaries — copy before build,
assertions before sections — not by adding gates back. The founder accepted this explicitly.

**Impact**: all staffed agents, PM.

**Touched**: `current-sprint.md`, `orchestration-queue.md`, `agent-context/*`, `sprint-archive.md`.

## Archive Reference
<!-- Older decisions archived in decision-log-archive.md -->
