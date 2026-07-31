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

---

### DEC-034 — The Sprint 2 plan is resequenced after an adversarial audit (2026-07-26)

**Decision**: Three fresh-context agents audited the Sprint 2 queue by reading only what each step hands
its executor. Their findings are applied. Four rulings and one model change:

1. **Copy runs before design.** §1/§3 copy is now step 1; §1 hero design is step 3. The hero spec must
   specify a headline treatment *and its accessible name* against real candidate strings — the original
   order asked a premium model to design a treatment for strings that did not exist yet.
2. **The shell build moves into Wave 1, ahead of the Gate A sample.** The sample renders in the page's
   real tokens, so the tokens must be final first; otherwise the build diverges from the artifact the
   founder judged, and step "§3 and §4" declares that divergence a defect. It also retires the §2 defect
   class before the founder spends a gate rather than after.
3. **The `http(s)` harness collision is ruled here, not discovered mid-run.**
   `verify-shell.mjs:533` fails any shipped file containing an `http(s)` URL, and §6 must ship the
   GitHub `curl` plus one GitHub link. The check is **amended, never deleted**: a URL as inert text or
   as a clickable `href` is permitted; `src`, `@import`, `url()`, `<link>` and `<script src>` stay
   banned. A-004's claim is about what the page *requests at runtime*, not what it displays. Left
   unruled, the cheapest fix for a blocked agent is to delete the guard on the page's most load-bearing
   published claim.
4. **DEC-032's prescribed mechanism is withdrawn and replaced by an outcome.** DEC-032 said to put the
   key-beat tick "in the log's 12px gutter" — but that gutter *is* the 12px inset, so a mark inside it
   would sit at less than 12px and break the equality invariant the founder accepted at Gate 3. The
   horizontal budget is also only 5.7px at 360px before a corpus line goes to three rows. The
   requirement is now the outcome: the tick clears the timestamp, the 12px equality survives, the
   37-column floor holds — and a reasoned refusal naming which one is traded is an acceptable answer.

**Model change**: `claude-fable-5` now runs **three** steps, not two — §1/§3 copy, §1 hero design, and
**§4 spec-sheet rendering**. §4 qualifies under DEC-004's two-clause test: the seed calls it the second
design centerpiece, and its rendered output is a Gate A artifact the founder explicitly accepts. Its
acceptance criterion — *buildable from itself, a Developer builds one without asking a question* — is a
judgment test, and it is exactly where a lesser tier ships a spec that reads complete and is not.

**Deliberately NOT upgraded**: the terminal spacing system. The instinct is loud because it remediates
the class that failed three times, and it is wrong — DEC-004 is explicit that premium buys judgment, not
correctness, and this step is correctness. DEC-032's own diagnosis is that the harness asserted values
instead of relationships; an assertion either can fail or it cannot, and no model tier changes that. The
leverage is PM's verification step, which now requires proving each assertion fails when violated.

**Rationale for auditing at all**: the previous plan looked sound to its author. The audit found that
two of five sampled steps were not executable by a fresh session, that HO-021 was orphaned in the
numbering, that the eight role names §1 must render **existed nowhere in the knowledge-base**, that
`copy-rules.md`'s scope table had the THIS SITE row stranded outside it, and that the shell step would
silently break roughly ten passing assertions across two harness files — one of which `scripts/test.sh`
does not even run. None of that was visible from inside the plan.

**Also fixed**: the blocked-path instruction lived only in HTML comments outside the fenced blocks, so
every specialist received a payload with no blocked-path rule; it is now inside every step. `VERIFY.md`
and the curl verification move into this sprint rather than an unscheduled Wave 3 — the §1 chip would
otherwise 404 at Gate B on a page whose argument is checkable claims. The count-up `aria-live` posture is
decided at §1, the only sprint where real readout cells make it decidable. Both gates now instruct the
founder to resume via `muster-sprint-resume.sh`, because that is what converts a verdict into fix steps,
and Gate B requires any fix round to end with a scoped QA re-run.

**Impact**: all staffed agents, PM.

**Touched**: `orchestration-queue.md` (full rewrite), `current-sprint.md`, `copy-rules.md` (scope table
repaired, the eight role names recorded), `decision-log.md`.

### DEC-036 — The key-beat mark leaves the text flow; 0.5ch is the clearance the floor holds (2026-07-26)

**Decision**: the terminal's left edge is specified as five relationships, each reachable from exactly
one CSS value (`section-02-replay.md` §9.2). The key-beat mark stops being a `border-inline-start` on the
log line and becomes a real, empty, `aria-hidden` element positioned outside the text flow; the log's
inline-start padding opens the room it sits in. The mark's distance from its card stays **12px** in both
layers and its clearance from the text is **0.5ch (3.91px)**.

**Rationale**: the tick collided with the timestamp because the mark and the hanging indent were the same
CSS value — `padding-inline-start: 1ch` with `text-indent: -1ch` puts the first row at 0 from the border,
and on a key beat the border *is* the mark. Positioning the mark against the line's box rather than
drawing it on the line's edge removes the shared lever, so the class cannot recur rather than being caught
next time. The indent is deliberately **not** counted as a sixth relationship: it was the thing that kept
moving the other five, and listing it would invite the next change to be costed against them again.

**The trade, stated.** At 360px — the tightest viewport — the mark's whole footprint may not exceed
17.7px before L3 breaks to a third row and the phone entry guarantee collapses. 12px is the equality
invariant the founder accepted at Gate 3 and §7.1 forbids fidelity or the entry count to pay; 2px is the
mark. 0.5ch is the largest half-column the remainder holds, leaving 2.4px. The alternative — dropping the
invariant to 8px to buy 8px of clearance — was rejected: it spends a founder-accepted value, drags the
narration card's padding with it to keep the two equal, and lands on the same margin.

**Measured, not derived.** Before/after at 320 / 360 / 375 / 390 / 393 / landscape / `--bp-wide` / 1440,
plus a rendered key-beat frame at 375px and at desktop. The mark holds at 12.00px in both layers
everywhere; clearance goes 0 → 3.91px; row pitch, entry separator, the 2.85× grouping ratio and the
hanging indent do not move; **no column is lost** at 360, 375, 390 or `--bp-wide`, all of L1–L11 still
set exactly two rows, and 320px is unchanged at two whole entries. Two counts fall by one — 393px to 41,
which is the figure §7.1's table already carried, and the landscape column to 39, which §12 had already
pre-authorised as margin spent. The shaped advance measures **7.83px**, not the 7.847 the tables derived
on, which is why assertions now bind on column counts and report pixels.

**Impact**: Developer, QA, PM.

**Touched**: `design-specs/web/section-02-replay.md` (§7, §7.1 rule 1, §9, §9.1, new §9.2, annotation 4,
§12, §13), `agent-requests.md`.

---

### DEC-037 — The pennant seats at 6×9, the underscore is drawn, and the footer takes no lockup (2026-07-26)

**Decision**: four rulings, in `design-specs/web/brand-seats.md`.

1. **One page-seat size: 6 × 9px** — header lockup and all five section separators. 9px is the section
   rule's own end-tick height, so the separator reads as one machined assembly rather than three
   unrelated parts; and at 6 × 9 the mark puts 23% *less* ink on the page than the 8 × 8 square it
   replaces while reading stronger, because a silhouette carries identity a square does not. 8 × 12 was
   rendered and rejected as badging — it out-weighs the caps it introduces by 43%.
2. **The underscore is a drawn 1ch × 2px rust bar**, three pixels under the wordmark's baseline, inside
   the wordmark's own text run rather than as a third flex item of the lockup. A typed `_` sets ~1px at
   `--text-label` — `--hair` weight — at a depth decided by whichever face resolves from the mono
   fallback stack, so the lockup would look different on every platform. Drawn, only its baseline
   position comes from the font.
3. **The header's accessible name stays exactly `MUSTER`.** Both marks are `aria-hidden`. `_` is
   announced as "underscore", as "line", or as nothing depending on the screen reader and its verbosity
   setting, so an announced underscore would greet different readers with different strings on the page's
   first landmark — and the product is named Muster, not `MUSTER_`. Because the mark is a drawn box there
   is no text node to announce, so the ruling and the mechanism agree and the name cannot drift.
4. **No footer lockup.** `brand-guidelines.md` §4's seat table says "header **and footer** lockup";
   DEC-031 enumerates four seats and the footer is not one. DEC-031 wins, and the design reason outranks
   the precedence: the header plus five separators already put the mark on the page six times, and a
   seventh instance a few rhythm units below the fifth does no work the provenance line has not already
   done. DEC-031's guard against badging is stated as a scale limit; the equivalent failure at the footer
   is frequency.

**Rationale for sizing optically at all**: DEC-031 left it open deliberately — the artwork gives a
silhouette and a 1:1.4957 ratio, not a page size, and a mark set to the square's width sets half again as
tall. Three candidates were rendered at 6× against the real tokens in both themes, at the real wordmark
and the real stencil tag, before one was chosen.

**Also ruled**: the favicon is the founder's house tile restated at a 16-unit viewBox — the tile's own
coordinates divided by 64 — because a favicon cannot follow `prefers-color-scheme` reliably and must read
without a theme. A cream pennant on the near-black ground would be a sliver.

**Impact**: Developer, QA, Content (wordmark string unchanged), PM (`brand-guidelines.md` §4 amendment,
REQ-006).

**Touched**: `design-specs/web/brand-seats.md` (new), `design-specs/web/page-shell.md` (§8, §9, §10, §12,
§13), `agent-requests.md`.

---

### DEC-038 — The hero: display floor re-measured against real strings; the stream plays once; the formation builds hub-is-PM (2026-07-26)

**Decision**: four rulings, in `design-specs/web/section-01-hero.md`.

1. **`--text-display`'s floor is amended to 1.75rem** (`page-shell.md` §3). The 2.4rem floor predated
   any real headline string; measured against the candidates it yields a 14-character display line on
   phones — candidate B sets four to five broken lines and **overflows the 320px viewport inside the
   unbreakable struck phrase**, a horizontal-scroll defect no wrap rule can fix. At 28px, measured in
   Blink at 320/360/375/390: A and C set 2 lines, B and D set 3 whole-phrase lines, nothing overflows.
   Slope and ceiling untouched; rendered size is identical above ~431px. This is the case DEC-034
   sequenced copy before design to catch: a treatment specified against a hypothesis instead of a
   string.
2. **The hero terminal streams all twelve corpus lines once per page load and never loops.** Uniform
   1.40s cadence; the same-stamp pairs keep §2's one-`--reveal` separation; the pre-L12 gap is 2×
   cadence — the gate in miniature. ~15s total, resting on `deploy · bodh.day · LIVE`. A real log that
   replays itself reads as a screensaver; the reader who wants it again has §2's replay with controls.
   Below `--bp-wide` it is a 3-entry window with §2's whole-entry semantics; the two-column hero
   engages at 1200px with a **fixed** 623px terminal column (74 columns + the §9.2 gutter), the same
   guarantee mechanism as §2's desktop rail.
3. **The formation builds to the hub-is-PM reading** — hub plate `PM`, seven specialist plates, no
   role twice — per the recommendation standing in Founder Decisions. Both label sets are final in
   `section-01-copy.md` §6, so the alternative ruling is a label change, not a redesign.
4. **The fold is a contract**: at 375 × 553 the measured line's bottom edge measures 461.8px — 91.2px
   above the fold — with the **primary** measured-line form at every viewport (the compact form stays
   unspent as the named fallback). Asserted against the element, not the figure.

**Measured, not derived**: rendered probes in headless Blink against the real tokens at
320/360/375/390/667-landscape/1280, both floor values, plus computed accessible names from the AX
tree — candidate B announces `Ship a product with AI agents.` with the struck phrase absent. One
cross-engine fact recorded for the build: Blink computes AX names from *rendered* text (uppercase via
`text-transform`), WebKit from source text — announced-string assertions must be case-insensitive.

**Impact**: Developer, QA, PM.

**Touched**: `design-specs/web/section-01-hero.md` (new), `design-specs/web/page-shell.md` (§3,
§10.1), `agent-requests.md`, `orchestration-queue.md`.

---

### DEC-035 — Two copy rulings: SP3 shortened to clear the 320px card; §3's competitor clause ships named (2026-07-26)

**Decision 1 — SP3 is 19 words.** The one-time copy-length lever DEC-027.1 deferred to this step is
pulled: SP3 drops its four-item enumeration ("Visual parity, rotation, trackers, placeholders") and
ships as *"One agent auditing another: the PM re-checks the developer's work with its own screenshots —
never trusting the developer's. Accepted."* — 24 → 19 words, 183 → 134 characters. The beat (the
independent re-check) is intact; the enumeration was texture, and it survives in the corpus. Applied to
`section-02-narration.md` and `index.html` in the same commit because the harness asserts the strings
are identical. **Measured resolved, not estimated**: the audit reports 5 lines of SP3 at 320px against
the 6-line card — the overflow that was 7-into-6 is gone; timed narration total is now 134 of 163;
106/106 audit checks green, `scripts/test.sh` green.

**Decision 2 — §3 names CrewAI and AutoGen; no research request is opened.** The seed instructs the
fold ("fold the CrewAI/AutoGen contrast into one clause") and itself supplies the only thing the copy
attributes to them — that they optimize how agents talk to each other. No number, scoreboard, or
quality claim is made about either, so there is nothing external research would verify that the
founder-authored source does not already state. Guard against the alternative outcome: the cut variant
(seed's generalization, names removed, 63 words) is pre-authored in `section-03-copy.md` §5, so if
review rules otherwise the clause ships cut, not softened, with no copy session reopened.

**Impact**: content, ui-ux, developer, qa, pm.

**Touched**: `section-02-narration.md`, `index.html`, `section-01-copy.md`, `section-03-copy.md`,
`pre-launch-checklist.md` (320px item resolved), `decision-log.md`. PM cascade note: stale SP3 counts
(24 words / 139 total) remain in `agent-context/content.md` (PM-owned) — flagged in HO-018.

---

### DEC-039 — §4's spec-sheets: the value column is the reading column; rust marks, never rust text; the stamp is one slot (2026-07-26)

**Decision 1 — what `64ch` means for a two-column label/value construction.** The reading-column
ruling (DEC-023) governs the prose being read, not the artifact containing it: the sheet's value
column takes `max-inline-size: var(--read-max)` and the card exceeds 64ch by exactly the fixed 6rem
label column + gap + padding (measured 903.31px card / 685.31px prose at 1280). The declined
alternative — the whole card inside 64ch — would cut the actual prose measure to ~50ch, inverting
what the ruling protects.

**Decision 2 — the emphasis system under the failed pair.** `--ink` on `--accent` measures 3.43/2.79
and bans filled rust; §4 goes further: **zero rust text in the section**. The mechanism row is marked
by a 2px `--accent` bar inset `--gap-hairline` (12px) from its card's inner edge — the accent-mark
idiom's third seat (§2's log and narration are the first two) — plus the label in ink bold. The mark
paints with `background-color`, never `color`, so the audit's small-rust-text sweep never sees it.
It is not a member of §2's two-layer inset equality; that invariant stays scoped to its two
synchronized layers.

**Decision 3 — the stamp is a single text slot, not a structured date field.** All four seed stamp
shapes (three with dates, `product — Bodh` without) render as one text run in `--text-micro`; the
no-date case renders exactly as supplied — no invented date, no dash (the dash idiom is for
unmeasured metrics; a stamp is provenance). The seed's enclosing parentheses do not render: the
stamp construction is the enclosure.

**Decision 4 — first person, typographically.** The founder's voice (titles, row prose) renders in
`--font-sans`, sentence case, full-ink — titles bold at `--text-kicker`; the machine grammar around
it (labels, stamps, rules, mark) stays mono tracked uppercase. No quotation marks, pull-quote
styling, or per-sheet attribution — decoration would convert testimony into testimonial. The
`≥19px-bold rust` branch in the shell's motif table is declined and the table now records the
surviving branch.

**Rationale**: All four rulings follow from constraints already on record — DEC-023, the shell's
measured contrast table, rule 4 (no invented values), and R7 — executed against rendered
measurements (probe at 320–1280, both themes, Blink AX tree for announced structure).

**Impact**: developer (builds §4 and the Gate A sample from the spec), qa (assertion list §12,
audit-sweep note §13), content (§4 copy supplies title/stamp/rows per the spec's copy contract), pm.

**Touched**: `design-specs/web/section-04-decisions.md` (new), `design-specs/web/page-shell.md` (§8
motif row), `agent-requests.md` (HO-021), `orchestration-queue.md`, `decision-log.md`.

### DEC-040 — Section scrolling: proximity snap on the document scroller, §2 exempt by declaration, off under reduced motion (2026-07-26)

**Decision 1 — the scroll padding is the bar plus one `--rhythm`, not the bar.** `scroll-padding-block-start`
is `calc(var(--bar-h) + var(--rhythm))` = 72px, and the status bar's height becomes `--bar-h` so the two
cannot drift. The rejected value is the obvious one: at exactly the bar's 48px, a section's opening
hairline rule — whose line sits 7.89px below the section's top edge — parks 7.89px under the status bar's
own rule, and the page's separator motif reads as an accidental double line. Measured clearance at 72px:
32.2px at 1280×900, 31.67px at 375×553. The binding property is the clearance; 72 is its value.

**Decision 2 — §2 is exempt through a `.section--no-snap` modifier, and the exemption is verified as a
property.** §2's playback gate is a visibility threshold (≥95% of the core to start, pause below 90%), and
a snap position near that core competes with the gate rather than serving it — proximity is user-agent
thresholded, so it cannot be relied on to *deliver* 95%, and a snap landing at 94% means the section
silently never plays. Sweeping every rest position across the §1→§2→§3 transition at a 40px step: of the
sampled positions where the core is ≥90% visible — 15 at 1280×900, 5 at 375×553 — none was moved. The
exemption is declared rather than left to fall out of §2's height, and the contingency if a future engine
widens its proximity range is named in the spec (§3 takes the modifier and the set begins at §4).

**Decision 3 — snapping is OFF under `prefers-reduced-motion: reduce`.** The media query does not disable
scroll-snap on its own, so this is a ruling. What is suppressed is not the snap position but the glide to
it: every engine animates that adjustment and no author declaration bounds it (`scroll-behavior` governs
author-initiated scrolls, not the UA's snap correction), so it is the one motion on this page that no
token caps. It is post-gesture, viewport-scale, and unrequested. Turning it off costs zero content, which
is the standard every other reduced path here meets. The stated and rejected counter: snap is position
selection, and a reader may use it to orient — rejected because the composition already separates sections
by 96–168px of air and a ruled tag. `scroll-padding-block-start` stays on under reduce; it serves anchors,
the skip link and find-in-page, not motion.

**Decision 4 — both phone and desktop, and `proximity` is a mechanism choice, not a preference.** Gating on
`--bp-wide` would key an interaction decision to a page-chrome breakpoint; the honest reasons to exclude
phones (fling momentum, dynamic toolbars) are pointer and platform properties, not width, and the pull is
a fraction of the snapport so it already scales. `mandatory` is rejected on three grounds that are already
committed elsewhere: oversized sections become unreachable, 200% zoom makes every section oversized, and
find-in-page matches get pulled off screen. `scroll-snap-stop` stays `normal` — `always` is scroll-jacking
by declaration.

**Rationale**: measured in headless Blink at 1280×900 / 375×553 / 360×640 / 720×450@200% against the real
page. The proximity range is a user-agent constant of ≈0.3 of the snapport (275 / 159 / 189 / 123px) that
nothing in the design depends on. Keyboard behaviour was driven with real key events rather than
`window.scrollBy`, which matters: the programmatic form reports a trap at the top of the page that a real
reader never meets, so the assertion specifies the input path.

**Impact**: developer (builds §7.1 and its eleven assertions; one markup change — the modifier on §2),
qa (assertion list, and the find-in-page and WebKit limits are manual by construction), pm (REQ-007 asks
for a ruling on the WebKit method for a scroll behaviour), content (none).

**Touched**: `design-specs/web/page-shell.md` (§7.1 new; §7, §9, §10, §11, §13 amended),
`agent-requests.md` (HO-022, REQ-007), `orchestration-queue.md`, `decision-log.md`.

---

### DEC-041 — §4 tightened by five words; §5 renders two cards and no growth sentence; §6's "nothing else" is an inventory (2026-07-26)

**Decision 1 — the §4 tightening is five words, and the number is reported rather than engineered.**
The founder's locked draft loses four constructions across 420 row words: a nominalization (`the thing
that actually breaks` → `what actually breaks`), one `and` in a three-clause series, `has to own` →
`must own`, and `reserved for judgment` → `for judgment`. Sentence count is unchanged at 30 — no
sentence deleted, split, merged, or moved — and all four titles and stamps are untouched, so §4's
measured line counts hold exactly rather than as ceilings. The rejected alternative was a larger,
better-looking delta: reaching it means cutting clauses the founder wrote deliberately, which is
rewriting under a tightening label. Verification is a word-level diff of all 16 seed rows against all
16 shipped rows, not a claim.

**Decision 2 — §5 renders two readout cards, and the provenance line is prose.** A readout cell is an
instrument surface with a key and a value; the provenance line has neither, and framing founder
testimony as telemetry is the error §4's spec already refuses when it keeps registration marks off the
spec-sheets. The section is three prose lines plus two cards.

**Decision 3 — §5's cards carry operator attention and commit-days, the two measured figures the page
otherwise never shows.** `OPERATOR ATTENTION 4.8 h` and `COMMIT-DAYS 4` (`Jul 11–18`) are the seed's
supporting stats, and commit-days are additionally the named checkable fallback for elapsed time.
`ACTIVE BUILD 9.3 h` repeats §1 deliberately as the denominator the other two are read against, and
must render byte-identically to §1's string — two renderings of one measurement is the drift this page
cannot afford. No ratio, percentage, or difference is printed: the cells sit side by side and the
reader does the arithmetic. The fallback if the repeat is judged wrong is pre-authored — drop
`ACTIVE BUILD` from both cards, no other string changes.

**Decision 4 — "the list is growing" is carried by the card format, never by a sentence.** The seed
asks for the growing-list message and in the same breath bans the hype; a sentence asserting future
growth is an unmeasured claim about the future on a page whose entire proposition is checkability. A
list that can take a third card is the claim. No placeholder card, no "next", no ghost slot.

**Decision 5 — §6's "Nothing else" is stated as an inventory.** §6 is the lead line, the `curl`,
`cd my-product && claude`, and one GitHub link. Excluded by name so the exclusions can be checked: no
`VERIFY ⎘` chip (§6 makes no measured claim for one to verify), no copy-to-clipboard control, no
license line, no requirements list, no second CTA. A rendered `$` prompt glyph is decorative —
`aria-hidden`, outside the selectable command text — because a `$` inside the copied string breaks the
command.

**Rationale**: the seed's §4 guidance ("~4–6 sentences") is not met by its own locked draft, which runs
7–8; that gap is reported for a founder ruling rather than closed by deleting sentences. Every other
call above follows from rules already committed: R4 and R5 on dashes and scope labels, R8 on naming the
team as AI ("its own team" → "its own **AI** team", one word), R9 on the single CTA, and R12 verified
by string equality across four files rather than by fetching.

**Impact**: developer (builds §4, §5 and §6 from these strings; §5 has no separate design spec, so its
copy file is the content inventory), ui-ux (none — §4's spec predates and matches this copy), qa
(scope labels, dashes, `curl` byte-equality, and §4's stamp-has-no-digit case), pm (three review items:
§4's sentence-count divergence, §4's no-date stamp, and §5's `ACTIVE BUILD` repeat), content (none).

**Touched**: `design-specs/web/section-04-copy.md`, `design-specs/web/section-05-copy.md`,
`design-specs/web/section-06-copy.md`, `agent-requests.md` (HO-023), `orchestration-queue.md`,
`decision-log.md`.

### DEC-042 — Wave 1 accepted whole; four rulings that keep the founder gate to taste (2026-07-27)

**Decision 1 — the independent audit is repaired in two moves, split across two owners.** A CDP client
whose `send()` has no timeout turns a renderer stall into an unbounded silence, so
`tests/lib/cdp.mjs` gains one, and it lands in the next build step — which is already amending the
harness — rather than waiting for the party that will need it. A harness that can hang forever cannot
report, and this is worth doing whatever is causing the spin. The diagnosis proper — why headless
Chrome saturates at 375 × 553 under the audit's injected 250 ms sampler — lands with the QA sweep,
which owns the audit. The split answers the objection the Developer raised in filing it: the party
whose work the audit checks repairs the transport, never the assertions. Rejected: fixing only the
timeout (it converts the stall into a red check without removing it) and fixing only the renderer
(it leaves every future hang silent). Three downstream steps' acceptance criteria are amended so a
completed-but-red audit is a result and a hang is a failure, rather than both being twenty minutes of
nothing.

**Decision 2 — WebKit parity for a scroll behaviour is a manual check, and is labelled as one.**
`qlmanage` renders a static thumbnail and cannot scroll, so there is nothing for the existing WebKit
harness to measure. The alternative — `safaridriver --enable` plus a WebDriver client — needs an
admin authorisation only the founder can give and adds harness surface this sprint has not budgeted,
which is scope an autonomous run has no authority to add. Scroll-snap's WebKit half is therefore a
manual pass, recorded as manual in the QA handoff and never reported as a mechanical result, with the
question folded into the Gate B iPhone ask that already exists. The Blink half stays measured.
Separately, the WebKit harness *can* read rendered geometry out of a QuickLook PNG by colour-clustering
— that widens what "cross-engine" can mean for **static** geometry, and does not rescue a behaviour.

**Decision 3 — the display-type token lands with §1, not ahead of it.** `styles/tokens.css` carries the
pre-amendment `--text-display` floor while the amended value is the one measured and specified. No
harness asserts the clamp at all, so moving the token now would put an unguarded value into the shipped
set ahead of the assertion that guards it — the exact drift this project's relationship rule exists to
prevent. It lands in the §1 build step together with an assertion, or not at all.

**Decision 4 — §5's `ACTIVE BUILD 9.3 h` repeat stays.** A figure for what the operator spent needs the
build figure beside it as a denominator; the pre-authored fallback would leave operator attention and
commit-days without one. It renders byte-identically to §1's string, which §1's harness already asserts.

**Rationale**: the gate's job is taste, so everything else was settled or measured first. What reaches
the founder is four items — the headline, the §4 sheet as an artifact, all five sections' copy, and the
formation reading. What did not reach him: five machine check families re-run rather than read, every
stated word budget recounted, all eight contrast pairs recomputed from the locked hex, the §4 seed diff
re-derived independently, and both spacing assertions re-planted and watched to go red. The one thing
that is *not* green — the audit — is stated as not green in the packet rather than omitted, because
"51/51 and green" would otherwise have been an incomplete sentence on a page whose proposition is that
its claims are checkable.

**Also settled, no founder time spent**: `brand-guidelines.md` §4 no longer names a footer lockup
(DEC-031 enumerates four seats and the footer is not among them) and its stale `~8px` pennant figure is
corrected to DEC-037's 6 × 9 in the same row; §4's 7–8-sentences-against-the-seed's-~4–6 divergence goes
to the founder as a density question against a rendered sheet rather than as a spec violation, with the
recommendation to ship as-is.

**Impact**: developer (the `cdp.mjs` timeout and the `--text-display` token both land in the §1-and-§6
step; the amended audit criteria), qa (owns the renderer diagnosis, the manual WebKit pass, and the
audit's two stale report labels; the widened static-geometry door), ui-ux (REQ-006 and REQ-007 both
answered; no spec change), content (`agent-context/content.md` refreshed — SP3 was carried as an open
defect in three places after it closed), pm (the Gate A packet), marketing/legal/research (stub).

**Touched**: `wave-review.md`, `agent-requests.md`, `brand-guidelines.md`, `agent-context/content.md`,
`triage-log.md`, `orchestration-queue.md`, `retrospective.md`, `founder-notices.md`, `decision-log.md`.

---

### DEC-043 — §4 is written for a non-technical reader; the rest of the page is not (2026-07-27)
<!-- Originally misnumbered DEC-035, which belongs to the 07-26 SP3/§3 copy rulings. Renumbered 2026-07-27; both external DEC-035 references (pre-launch-checklist, queue run log) mean the original. -->


**Decision**: Founder ruling at Gate A. **§4 only** is rewritten for a non-technical audience — VC
readers and people evaluating the founder to hire — in their language and materially shorter. Every
other section keeps `product-spec.md`'s target reader, *the skeptical technical cold reader*. §4 must
also fit **one screen**, and its layout is chosen only after the rewrite, against the real word count.

**Rationale**: §4's job in the scroll is *"shows the judgment behind it"* — it is where a reader decides
whether to trust the person who built the thing, which is exactly what a VC or a hiring manager is
there to decide. So a different reader for this one section is coherent rather than a compromise. §2 is
proof and §3 is mechanism; both stay technical, and a page-wide audience change was explicitly
considered and rejected because it would cascade into §1's headline, §3's argument and the copy rules.

**The guardrail, recorded because the ask has a dangerous shape.** "Write it for VCs" is the same
instruction shape as "something a VC would want to hear that would amaze them," which nearly inflated
SP7 in Sprint 1 (DEC-024). **Plainer words, not bigger claims.** Every trade-off in the seed's locked
draft survives the rewrite — a decision that loses its cost stops being a decision and becomes a boast.
An inflated §4 is a blocking finding at PM review, however well it reads.

**Consequence for the locked draft.** Seed §4 is founder-authored and previously "tighten only, never
inflate." This ruling supersedes that for §4 alone: Content may now restructure and cut substantially.
The four decisions, their order (strongest first), and every stated trade-off are still fixed.

**Cascade, settled by the seed's own logic rather than by override.** Seed rule 11 permits insider terms
(*cascade lag*, *cold-start sufficiency*) "only where they earn their meaning," and `product-spec.md`
records §4 as where they earn it. With §4 in plain language, no section on the page satisfies rule 11's
condition, so the terms drop out under the rule rather than against it. §3 is the only alternative home
and is one paragraph long. Reversible on founder request.

**Layout is sequenced, not deferred.** Copy length determines which layouts are available: four sheets
at 4–6 sentences cannot share a screen by any arrangement; at two or three short lines a 2×2 grid may
fit at desktop. Horizontal scroll is **not** barred by DEC-025 — that removed sideways dragging *within
a line of text*, whereas scrolling *between discrete cards* is a different pattern — but it costs
discoverability and adds machinery to a page arguing for restraint. UI/UX decides against the rewritten
length and states the measured height.

**Impact**: Content, UI/UX, Developer, QA, PM.

**Touched**: `wave-review.md`, `orchestration-queue.md`, `current-sprint.md`,
`agent-context/{content,ui-ux}.md`, `agent-skills/content/copy-rules.md` (R11 consequence),
`product-spec.md` (§4 reader).

---

### DEC-044 — §4's four decisions are selected from ten candidates; every date verified in the framework repo (2026-07-27)

**Decision**: the DEC-043 re-selection is complete. Ten candidate decisions were generated and
stress-tested in a founder-run session outside this project's telemetry (per the Gate A item 2C
sourcing plan); PM adopted the stress-tested four and made the two rulings that round left open.
The shipping four, strongest first:

1. **Tiered reading** — *"I optimized what each agent reads, not how they talk"* — architecture.
   Stamp: **2026-04-24** (`03ba0ce`, "slim bootstrap: keep routing behavior, cut ~600 tokens/session").
2. **Determinism + model economics, merged** — a rule a script can check may not live in prose, and
   *therefore* premium models buy judgment, not correctness — systems thinking. Stamp: **2026-06-13**
   (`c7bbde8`, pillar-budget gate + CI).
3. **Growth caps** — every file the agents read was capped in the first commit, before the failure was
   ever experienced — systems thinking. Stamp: **2026-04-12** (`216fa50`, initial extraction; the
   commit itself contains the growth-cap rule).
4. **Attention architecture** — human attention is the scarcest input, so the run halts at designed
   gates and never asks mid-flight; specialists cannot escalate past PM to the founder — architecture.
   Stamp: **2026-06-07** (`78490b7`, "Muster v4 — autonomous sprint execution (#29)").

**Ruling 1 — the tiered-reading stamp is 2026-04-24, not the seed's 2026-05-05.** Both commits are
real; the choice is which a hostile reader clicks through to. `03ba0ce` *is* the claim — a measured
optimization of what agents read, with the number in the commit message. `11164fd` (05-05) is a
16-skill batch a skeptic would have to interpret. On a page whose argument is checkability, the
cleaner click-through wins. 04-12 was declined for this slot because slot 3 already owns the
first-commit stamp, and two identical dates would dilute the independent-arrival story the stamps
tell silently.

**Ruling 2 — slot 4 is attention architecture; the feedback loop is the named alternate.** The
founder's own bar for this section was explicit: the reader must see that he understands *tokens and
human time*. Slots 1–3 are all token economy; without slot 4 the human-attention half of the bar is
uncovered. It also explains a number already on the page — §5's 4.8 h operator attention — so the
page starts reading as designed rather than assembled, and framed as attention economics it does not
restate §2's on-screen `Role: halt` (the redundancy that disqualified the plain "halt design"
candidate). The feedback loop (sprint retro → GitHub issue → next framework release; three public
releases titled from field retros) is the strongest cut and the documented swap-in if the founder
prefers to signal compounding over attention discipline.

**Merge accepted in slot 2**: model inversion ("once correctness was mechanical, I stopped paying
premium models to be careful," 2026-06-12) is a corollary of determinism with an adjacent date; as a
separate slot the pair read as one thought told twice. Merged, its payoff line lands inside the
determinism entry, which is the single strongest this-person-understands-the-AI-game signal of the ten.

**Evidence is verified, not inherited.** PM ran `git log` against the framework repo
(`~/Desktop/TA-muster-ai`) for all five load-bearing commits — `216fa50` · `03ba0ce` · `11164fd` ·
`c7bbde8` · `78490b7` — and every hash, date and message matches the research. The remaining six
candidates and their evidence are preserved in the Gate A record (wave-review.md item 2C) for the
Content step.

**Consequences.** The seed's decision 4 (Bodh) is out per DEC-043; no shipping decision is dateless,
so DEC-039's no-date stamp special case retires with it. All four stamps now carry dates —
UI/UX's one-slot stamp construction is unchanged, only its no-date branch goes unused. Coverage
holds: architecture (1, 4), systems thinking (2, 3). Content writes the four in plain language under
DEC-043's guardrail — plainer words, not bigger claims; every trade-off survives.

**Impact**: Content, UI/UX, Developer, QA, PM.

**Touched**: `decision-log.md`, `wave-review.md` (Gate A item 2C), `brand-guidelines.md` (§5
insider-terms cascade per DEC-043).

---

### DEC-045 — The sparse hero: §1's first screen is the headline and the formation (2026-07-27)

**Decision**: founder ruling at Gate A, made against rendered candidates
(`samples/s01-sparse-hero.html`, fold rulers at 553/700px). §1's above-the-fold composition is
**eyebrow · headline · formation** — Option A. The subline is deleted outright; the measured line
is deleted from §1 (Bodh's numbers remain in §1's below-fold readout and in §5). Below the fold,
§1's inventory is unchanged: dual build readout with `VERIFY ⎘`, streaming terminal, curl. The
formation becomes the section's centerpiece and receives its real design pass at the UI/UX fix
step — the founder explicitly deferred visual refinement to that step.

**What the founder was shown before ruling, so this is never read as un-costed**: on desktop both
options fit whole (A with 194px of air); on a phone the formation ladder is ~370px tall, so the
fold cuts it mid-ladder and Option A's first screen carries **no number**. The founder picked A
with that measurement in front of him. UI/UX's independent opinion recommended keeping one compact
proof line (Option B); the founder's simplicity bar outranked it, which is exactly what a founder
gate is for.

**Supersessions, named**:
- Seed §1's "measured line visible without scrolling" guarantee is superseded. The seed is
  founder-authored and read-only inside the sprint; his gate ruling is the amendment mechanism,
  same as DEC-043 for §4.
- `brand-guidelines.md` §3's skim hierarchy ("measured proof first") bends for §1 only: the hero
  leads with the claim and the team visual, and measured proof lands at the first scroll. Recorded
  in the guidelines as a founder-accepted deviation rather than left as a contradiction for QA to
  trip on.
- The 8/1 subline/caption repetition (verdict-stack sample, Exhibit 3) resolves itself: only the
  caption remains.

**Impact**: UI/UX (hero recomposition, formation design pass, new fold budget, §10 scope-adjacency
rewrite), Content (`section-01-copy.md` loses the subline and measured line), Developer, QA
(fold assertions re-base), PM.

**Touched**: `wave-review.md` (Gate A item 3, §1), `brand-guidelines.md` §3,
`samples/s01-sparse-hero.html`, `samples/s01-verdict-stack.html` (decision records, never ship).

---

### DEC-046 — All of Bodh leaves §1; §2 becomes the page's only terminal (2026-07-27)

**Decision**: the founder exercised DEC-045's recorded override — *"all of bodh out of section 1"* —
and closed §1. Three removals beyond DEC-045, each with the later home the founder's rationale
("already shown later") points at: the readout's BODH row (§5's cards carry 9.3 h / $147 /
bodh.day), and the **hero streaming terminal** (it streams the Bodh Sprint-4 corpus under a
`BODH · SPRINT 4` label; §2's replay immediately below is the same material at full fidelity).
§1 now contains no Bodh numeral, no Bodh label, no Bodh corpus line.

**§1's final inventory**: eyebrow · headline · formation + caption above the fold; THIS SITE
readout remnant (dashes, `measured at launch`, `VERIFY ⎘`) and the curl below it. The remnant's
form at one row is UI/UX's call at the fix step. Honest cost recorded: the dashes lose the measured
row whose contrast made the dash idiom self-evident.

**What this dissolves**: hero §10's scope-adjacency system (no wave/whole-product adjacency exists
in §1 anymore — the page's likeliest factual failure class shrinks); the hero terminal's seat in the
motion budget (three live elements drops toward two, UI/UX re-states the budget); the wave-scope
chrome-label pair in `section-01-copy.md` §9.

**Impact**: UI/UX, Content, Developer, QA, PM.

**Touched**: `wave-review.md` (Gate A item 3 — §1 CLOSED), `decision-log.md`.

---

### DEC-047 — §3 contrasts with bare Claude Code; no named competitor exists on the page (2026-07-27)

**Decision**: founder ruling at Gate A, produced with an out-of-band critique session. (1) **No
named competitors anywhere on the page** — the CrewAI/AutoGen clause dies, and so does the
pre-authored generalized fallback, because "every multi-agent framework optimizes talk" is a
universal claim one counterexample kills. (2) **§3's contrast becomes Muster vs bare Claude Code**:
used bare, the operator is the memory system and the re-briefing grows with the product; Muster
moves that job into the system (knowledge base + curated per-role slice + capped reads). The
compounding claim — *the product grows; what a session reads stays bounded* — is the section's
spine. The framework-field contrast survives once, unnamed, as §4 decision 1's title.

**Supersedes**: DEC-035 decision 2 (clause ships named) and the Gate A packet's "Settled without
you" item 5. The seed's §3 instruction to fold the CrewAI/AutoGen contrast is superseded by its
author at his gate, the DEC-043/045 mechanism.

**Honesty boundaries carried into the copy**: mechanism claims only, no comparative benchmarks vs
bare Claude Code (unmeasured); never a capability dig at Claude Code (Muster runs on it; bare
Claude Code has CLAUDE.md); scaling rendered as architecture, not promise.

**Starting material**: founder-supplied kickers (K1 "The product grows. The briefing doesn't." —
his pick · K2 · K3) and a 90-word paragraph, verified 90/90 words, zero numerals, banned words,
first person. Full text and the watched sensitive sentence in `wave-review.md` Gate A item 3.
The open sub-decision (spend or drop the "context engineering" hook) was **resolved 2026-07-28**:
hook IN — measured to cost zero rendered lines, funded to 90/90 by three PM trims recorded in
`wave-review.md`; K1 confirmed with a sentence-boundary wrap rule; the watched sentence kept.
**§3 is closed.**

**Impact**: Content (rewrite `section-03-copy.md` from this material), UI/UX (none — §3 has no
design spec by ruling), Developer, QA (the copy-rules R11 hook check re-bases), PM.

**Touched**: `wave-review.md`, `brand-guidelines.md` §6, `agent-context/content.md`,
`decision-log.md`, `samples/s03-insight.html`.

---

### DEC-048 — §5 takes the cost row; the page's $147 comes home (2026-07-28)

**Decision**: founder rulings at Gate A — the provenance line ships verbatim as supplied, and §5's
readout cards gain a fourth key: `COST · API LIST` → `$147` on the BODH card, `—` with
`measured at launch` on THIS SITE.

**Why the row exists**: DEC-046 removed §1's readout, which was the page's only `$147`. Without
this row, "shipped for $147" — the page's most quotable number — existed nowhere on the page.
§5's copy-file rule "no cost figure appears in §5" was written when §1 carried the figure and is
superseded with its premise. R3's vocabulary carries over intact: API list price, never
subscription spend, no baseline, label byte-identical to §1's former cell (`COST · API LIST`).

**Stress-test recorded**: against the seed's §5 message with §5 now bearing all whole-product
numbers — every message clause has a carrier; the growing list remains format-not-sentence; 9.3 h
and $147 sit beside 4.8 h as its denominators; `bodh.day` lives in the Bodh prose line. §5 needs
nothing else. Byte-equality harness for `9.3 h`/`$147` re-bases from §1 onto §5 as the primary
site.

**Impact**: Content (card strings + three stale rationales listed in `wave-review.md`), Developer,
QA (assertion re-base), PM.

**Touched**: `wave-review.md` (Gate A item 3 — §5 CLOSED), `decision-log.md`.

---

### DEC-049 — The Gate A fix round is routed at the gate, and the plan is re-cut to the rulings (2026-07-28)

**Decision 1 — routing happens interactively, not on resume.** `muster-sprint-resume.sh` spawns a
headless PM (up to 150 turns) to translate the verdict into fix steps. This verdict spans six
decisions and cross-section cascades; a cold PM re-deriving it is the most expensive and
highest-risk path available. The interactive PM — holding full gate context — routed it instead:
two fix steps inserted (Content HO-031 → UI/UX HO-032, in that order because §4's layout is decided
against measured copy lengths), the Gate A halt step retired, and the founder runs
`muster-sprint-run.sh` directly. The queue's resolved-comment block records that the steps ARE the
verdict's consumption, so any accidentally-spawned resume PM verifies and changes nothing.

**Decision 2 — four build briefs re-cut, because a stale brief is how rework happens.** §1+§6:
sparse-hero inventory with explicit negatives (no measured line, BODH value, or terminal), fold
assertions re-based, the `aria-live` bullet removed. §3+§4: treatment-vs-copy-vs-layout separated —
the Gate A sample stays authoritative for *treatment only*; DEC-044 copy; HO-032 layout; kicker
wrap asserted. §5: four-key cards, and it inherits both the count-up/`aria-live` decision and the
`9.3 h`/`$147` byte-equality anchor (the page's only counting cells and only whole-product numbers
live there now). QA/PM review: handoff ranges extended to HO-032, Gate A negatives added to the
copy matrix, and the §4 inflation check made explicit.

**Decision 3 — the two fix steps run premium (`claude-fable-5`) under DEC-004's two-clause test.**
Both are foundation-critical creation the founder explicitly judges: HO-031's core is §4's copy —
the section aimed at VCs and hiring, re-authored from scratch; HO-032 is the hero recomposition
with the formation's real design pass, which the founder explicitly deferred to this step. The
four build steps stay `claude-opus-5`: they are correctness against specs, which no model tier
changes.

**Impact**: content, ui-ux, developer, qa, pm.

**Touched**: `orchestration-queue.md` (two new steps, four briefs, preamble, Founder Decisions,
Done), `wave-review.md` (routing note), `current-sprint.md`, `decision-log.md`.

---

### DEC-050 — An external stress test finds seven gaps; all seven are fixed in the plan (2026-07-28)

**Decision**: the founder ran the re-cut plan through an out-of-band reviewer session (repo access,
no stake in the plan). It returned seven findings; PM triaged all seven as real and applied them
before the run:

1. **VERIFY.md gets a content review** — it was developer-authored with only existence checks;
   now it is in QA's copy-rules matrix and PM review reads its contents. The verification index
   carrying a scope slip was the exact failure the page exists to avoid.
2. **§4's ceiling is numeric**: ≤ 45 words per sheet across the row bodies, title ≤ 12, derived
   from the verdict's own fit math — "materially shorter" without a number let a premium step
   write unfittable copy.
3. **§4's phone behaviour must be ruled** by HO-032 explicitly — Gate B judges both surfaces and
   only desktop was bound.
4. **The motion budget is enumerated at the sweep**, a count against HO-032's stated budget, not
   an impression.
5. **The counting cells' live-region behaviour is verified during playback** against HO-028's
   stated posture — it was decided and self-verified inside the same step.
6. **The four §4 stamps are byte-asserted** in the text matrix — the independent-arrival argument
   was load-bearing and unasserted.
7. **The audit repair is its own step (HO-033)** ahead of the sweep — an unbounded bisect inside
   the sweep risked a context-starved matrix; mechanical debugging and full-page judgment now
   never share a window. Sweep and PM-review ranges extend to HO-033; every filing step states its
   exact HO ID so the fix round's out-of-order 031/032 is never "corrected" by a cold agent.

**Impact**: content, ui-ux, developer, qa, pm.

**Touched**: `orchestration-queue.md`, `retrospective.md` (FF-001 addendum), `decision-log.md`.

### DEC-051 — §4 ships as a horizontal paged track at desktop, stacked on the phone (2026-07-28)

**Decision**: exercising the layout call DEC-043 delegated to UI/UX, §4's four sheets ride a
horizontal paged track at ≥ `--bp-wide` — `--sheet-w: 40rem` pages, x-proximity snap scoped to the
track, 360px of the next sheet visible as the paging affordance, the track as the section's single
named tab stop — and stack at `--gap-major` below it. Decided against the rewritten copy's real
lengths from three candidates rendered with the shipping strings (`samples/s04-one-screen.html`):
the track's content bottom measures 612.1px at 1280 × 700 (684.1px snapped under the bar — one
screen); stacked measures 2060.6px (~3 screens) and a 2×2 grid 1256.9px (~1.8), both failing
DEC-043. Horizontal card paging is permitted ground — DEC-025 barred in-line text dragging, not
paging between discrete cards.

**Phone, ruled explicitly**: stacked, cost stated — sheets measure 631.8–660.7px at 375, the
section about five phone screens. Paging was rejected on the phone because a sheet exceeds the
553px fold, and horizontally paging cards that also scroll vertically is two-axis navigation of
clipped documents.

**Cascades**: `page-shell.md` §7.1 A4 re-scoped (the track is the page's one nested snap
container; its snap turns off under reduced motion with the page's); `--sheet-pad` = 24px at every
viewport is part of the one-screen budget; the audit's 64ch reading-measure probe re-targets §3's
paragraph, since §4's track prose renders ~46 rendered characters by design.

**Impact**: Developer (§3+§4 build), QA (track assertions join the sweep), PM.

**Touched**: `design-specs/web/section-04-decisions.md`, `design-specs/web/page-shell.md`,
`agent-requests.md` (HO-032).

### DEC-052 — The counting cells carry no live region; the rolling digits leave the accessibility tree (2026-07-29)

**Decision**: exercising the posture call the §5 step delegated to the build, no element on this page
carries `aria-live`, `aria-atomic`, or a live-region role — and the count-up's accessible text is the
measured value at every instant regardless. While a cell rolls, its digits are `aria-hidden` and a
visually hidden stand-in holds the exact final string; both are removed when the roll settles.

**Why neither of the obvious options**: a polite region over a 1.2s ease-out roll re-announces every
frame — measured at 100 distinct rendered values in one roll — so a screen reader would hear dozens
of numbers that were never true and the measured one last. Assertive interrupts. But plain silence is
not enough either: a reader landing on the cell mid-roll is read whatever is on screen, and on a page
whose entire proposition is that its figures are exact, announcing `5.2 h` for `9.3 h` is the failure
this page can least afford. Taking the digits out of the tree for exactly as long as they are wrong
resolves both — the value is announced once, in document order, like any other text.

**Verified during playback, against §5's real cells rather than the fixture**: across one roll the
visible string takes 100 distinct states and the announced string takes one; the accessibility tree
read mid-roll (`Accessibility.getFullAXTree`) carries `9.3 h` and `4.8 h` and no intermediate. Both
halves were watched to go red with the shroud removed, and the live-region sweep with an
`aria-live="polite"` planted on a cell.

**Cascades**: closes the `pre-launch-checklist.md` count-up item (OBS-004). The unmeasured dash is
untouched — a value with no digits never animates, so it is never shrouded.

**Impact**: Developer (the engine and every future readout cell), QA (the sweep verifies the posture
during playback, not off the markup), PM.

**Touched**: `scripts/count-up.js`, `styles/base.css`, `index.html` (§5), `tests/verify-shell.mjs`,
`pre-launch-checklist.md`, `agent-requests.md` (HO-028).

### DEC-053 — Proximity snap keeps its bounded pull; the two spec clauses that assume otherwise are amended (2026-07-29)

**Decision**: `page-shell.md` §7.1's A11 and `section-04-decisions.md` §12.16 both require that a
start-aligned `scrollIntoView()` land its target fully visible. With proximity snapping on it does
not — the pull carries a target up to 180px past on the y-axis, and leaves 46% of §4's off-canvas
value visible on the x-axis. Both clauses are amended to the two checks that shipped. **No mechanism
is spent, and snapping is not weakened.**

**Why the clauses are wrong rather than the build.** They were written against a hypothesis about
what find-in-page does, and the hypothesis is wrong about the alignment. Chrome's find uses
centre-if-needed, under which **0 of 165 text leaves land off screen** — a centred match sits half a
viewport from either edge, which is more than the pull can spend. The page ships exactly one
start-aligned mechanism, fragment links, and every fragment target it has is a section start, which
is itself a snap position: `#main` lands at +0px at both viewports, asserted. The residual is a
target deep inside a section reached start-aligned, **which nothing on this page does**.

**Why not buy it.** The only cures are script on the scroll position or per-element scroll margins.
The first is what §7.1 forbids outright and what "no script reads, writes or intercepts the page's
scroll position" is asserted against; the second prices every future element against a case no
reader meets. Removing snapping entirely would cost the composition's own rule — one idea per
screen, true of where the page stops — to satisfy a clause describing no real interaction.

**What is honestly not covered**: Safari's find alignment is unmeasured, because `qlmanage` cannot
scroll. It is added to the Gate B phone ask rather than assumed to match Blink. If Safari uses
start-alignment the ruling is revisited with a real measurement behind it.

**Consequences**: OBS-009 and OBS-013 are one ruling, not two — they are the x- and y-axis halves of
the same trade. The spec amendments are UI/UX's to make and land in the Gate B fix round; the build
is correct as shipped and needs no change.

**Impact**: UI/UX (owns both spec files), Developer, QA, PM.

**Touched**: `decision-log.md`, `wave-review.md` (Gate B packet), `agent-requests.md` (HO-027,
HO-029 verdicts).

---

### DEC-054 — The footer placeholder cannot ship, and the page's "8 agents" needs the founder's word (2026-07-29)

**Decision**: the footer's shell placeholder is a launch blocker and is recorded as one. The
adjacent question — whether the page may say eight agents built it — is a founder call and goes to
Gate B rather than being settled here.

**The placeholder.** `Provenance line and links ship with their own spec.` renders as the last string
a cold reader meets after the curl. No sprint step ever owned footer copy. On a page whose argument
is that a governed AI team ships finished work, a visible TODO in the footer refutes the page more
efficiently than a critic could. `product-spec-seed.md` → Footer already specifies the content in
full, so no design question is open; the fix needs Content for voice and Developer for the build.

**The count, measured.** `git log` on this branch by commit subject: pm 43 · developer 13 · ui-ux 9 ·
qa 7 · content 5 · marketing, legal and research **zero — never invoked, all three null in
`agent-context/.populated`**. **Five roles built this page, not eight.** The seed's footer line
("Specced, written, and reviewed by Muster's AI team — 8 agents, 1 operator") states the
participation reading outright and is not true of this build. §1's caption `8 AI agents · 1 operator`
captions a diagram of eight role names and is defensible as roster size; `VERIFY.md` already carries
that qualifier, and the sweep asserts it stays. But the reader meets the hero long before
`VERIFY.md`, and R7 bars Content from inflating a founder-supplied passage — so the fix round cannot
simply transcribe the seed.

**Why this is the founder's and not PM's**: it is a claim about him and his build, the seed is
founder-authored and read-only, and the two defensible framings (roster size versus true
participation) are a voice decision, not a correctness one. What PM owes the gate is the measured
count, and that is supplied. **PM's recommendation is recorded in the packet**: keep §1's caption,
rewrite the footer line to the true participation.

**Consequences**: OBS-012 accepted and escalated. Also routed to the fix round, each with its file
and line: OBS-015 (`tests/verify-shell.mjs:3130` prints a literal `0` where the measured
`r.moved.length` belongs, so the §2-exemption check's evidence reads identically red and green —
reproduced firsthand by PM), OBS-011 (`section-05-copy.md` §6's R4 prose says three em-dashes where
the table it describes carries four; the table is what ships and what the harness parses) and
OBS-007 (`section-06-copy.md` §4.2's inventory aside disagrees with `section-01-hero.md` §12 and
with the build).

**Impact**: Content, Developer, UI/UX, QA, PM.

**Touched**: `decision-log.md`, `wave-review.md` (Gate B packet), `pre-launch-checklist.md`,
`agent-requests.md` (HO-026, HO-028, HO-030 verdicts).

---

### DEC-055 — A-007's motion budget is corrected to the count the built page actually runs (2026-07-29)

**Decision**: `foundational-assumptions.md` A-007 and `brand-guidelines.md` §4 are amended to the
two-live-elements-plus-cursor budget. Both still carried "exactly three live motion elements plus
the curl cursor," which DEC-046 retired when the hero terminal left §1, and `brand-guidelines.md`
additionally still described the formation as "PM hub + eight plates."

**Measured off the built page, not read off a spec** (the first time that has been done): three
looping seats, all pulse or cursor — `#header` pulse, `#watch-it-ship` pulse, `#get-started` cursor —
which is the pulse *motif* at two seats, plus the JS count-up as ambient element two. §2's 44 running
transitions are its one-shot opacity reveal, which ends, and which DEC-015 already rules is not an
ambient element. The page is inside budget; the documents had drifted.

**Why it mattered enough to fix now**: A-007 is a cross-cutting assumption every role checks its
deliverable against. Left stale, an agent measuring the page against A-007 as written would either
report a false deviation or accept a real one. The assumption's *principle* — a new ambient element
is a deviation — is unchanged, which is why the specs that cite A-007 by principle need no edit.

**Consequences**: closes OBS-002 and OBS-003. Both were cascade gaps in PM-owned files, so PM fixed
them directly rather than routing them.

**Impact**: UI/UX, Developer, QA, Content, PM.

**Touched**: `foundational-assumptions.md` (A-007), `brand-guidelines.md` (§4 motion + motifs rows),
`decision-log.md`, `agent-requests.md` (HO-032 verdict).

---

---

### DEC-056 — Gate B's verdict is complete and routed; the footer loses the email and gains the truth (2026-07-29)

**Founder rulings recorded**: (1) repo URLs supplied — site
`https://github.com/thinkArhant/muster-ai-site`, framework
`https://github.com/thinkArhant/muster-ai`; the `VERIFY ⎘` chip's production target is the site
repo's blob URL for `VERIFY.md` (F-B6). (2) **No raw email on the page** — the GitHub profile link
is the contact path; the founder amended his own seed's footer spec at his gate (the DEC-043
mechanism). (3) The participation line is **Content's call with no gate** — pre-approved against
"five roles on this build." (4) The overnight fact is **delegated to the agents** under the
standing guardrail: mechanism claims evidenced by night-stamped public commits, never wall-clock
framing (R2), declining valid.

**Routing, same shape as DEC-049**: the interactive PM consumed the verdict at the gate instead of
resume's headless PM. Five steps queued — Content HO-034 (fable: the participation line ships
without a gate and the overnight ask has the exact instruction shape that inflates, so the
judgment bar is highest) → UI/UX HO-035 (fable: three page-level design rulings the founder will
re-judge) → Developer HO-036 → QA scoped re-run HO-037 → PM review, which writes the re-gate
packet and promotes the halt. The three phone checks (§2's 48 s playback — the remaining hard
launch blocker — find-in-page, snap feel) are deliberately deferred to the re-gate so the
founder's phone pass is spent once, on the fixed page.

**Impact**: content, ui-ux, developer, qa, pm.

**Touched**: `orchestration-queue.md`, `wave-review.md`, `decision-log.md`.

### DEC-057 — Gate B design rulings: one alignment system, section snapping removed, §4's affordance rebuilt (2026-07-29)

**Three rulings, exercising the design calls F-B1/F-B2/F-B3 delegated to UI/UX at Gate B. Every
figure below is measured on the rendered page (before) or the rendered proposed state
(`samples/gate-b-proposed.html`, after); the renders and reports are in
`samples/gate-b-renders/`.**

**Decision 1 — F-B1: the page has one horizontal alignment system, two edges and one axis**
(`page-shell.md` §7.2). Every element binds to the rail (the container's content inline-start),
the rail-end (line-level counterweights only), or the axis (the container's center). The founder's
finding reproduced exactly: the formation was intrinsic-width (676.4px) with its hub centered on
that block alone — an orphan axis at x 546.2 against the 720 shared by the headline block and the
THIS SITE strip at 1440. The fix is not to centre the block but to **make the formation span the
container** — bus = plate row = container content width, plates distributed edge to edge — so the
hub's centre *is* the page's axis: measured delta 0.0px at 1280/1440/1600, with plate gaps opening
from 12px to ~70px in the bargain (*spacious*). Exactly one element on the page may bind to the
axis, and only because its parent's edges are the rail and rail-end. Phone unchanged — the ladder
is rail-bound and no axis-bound element exists below `--bp-wide`.

**Decision 2 — F-B2: section snapping is removed entirely.** The founder's binary was remove or
full section paging; paging loses on measurement, not taste — it requires every section to fit one
snapport, and four of six exceed the 553px phone fold (§1 1240px · §2 794.2px · §4 2957px · §5
1776.9px) while §5 (1151.5px) exceeds even the 700px desktop fold. One-section-per-view over this
content needs `mandatory` snapping (unreachable oversized interiors, broken 200% zoom — DEC-040's
own grounds) or scripted paging (banned and asserted against). Removal costs zero content and zero
layout. `--scroll-pad`/`scroll-padding-block-start` stay — they serve anchors, the skip link and
find-in-page. Every §7.1 assertion is dispositioned in a retirement inventory (keep / invert /
re-base / retire — nothing left asserting a retired behaviour); DEC-040 is amended, not deleted.
**Scoping stated plainly: the binary was ruled on the page's section scrolling; §4's track keeps
its x-proximity snap as part of Decision 3** — it is what guarantees the track rests composed
instead of parked mid-crop. If the founder's re-gate reads "entirely" as covering the track, the
fallback is one declaration and the rest of the affordance stands.

**Decision 3 — F-B3: §4's affordance becomes three channels in the section's own grammar, and the
phone stack gains orientation instead of hiding content.** The judged build cut sheet 2 at the
container edge with a dead strip of bare ground to the screen edge (128px at 1280, 208px at 1440)
— the anatomy of "reads broken." Ships: (1) the track's scrollport spans the viewport via a
token-derived bleed (`--track-bleed`; percentages are wrong twice there — padding % resolves
against the containing block, scroll-padding % against the scrollport, and the mismatch measurably
let the track's own snap pull sheet 1 off the rail on first layout), so the cut lands on the
physical screen edge, sheet 1 rests on the rail, sheet 4 fully scrolled rests on the rail-end, and
the document leaks no x scroll; (2) a `SHEET n OF 4` ordinal on each sheet's meta line —
authentic spec-sheet grammar, `aria-hidden` (the `<ol>` announces position natively), numerals
self-verifying against DOM position, the width-independent channel; (3) the track's scrollbar
styled as a thin rust gauge (`scrollbar-width`/`scrollbar-color` — enhancement only, degradation
named). **Phone re-ruled: the stack stays.** Every shrinking alternative was measured and
disqualified: a phone track pages 650.8–679.7px sheets across a 553px fold (two-axis navigation of
clipped documents, DEC-051 upheld); an exclusive accordion halves the height but hides 12 of 16
rows from Safari's find-in-page — a committed reader path and one of the founder's own re-gate
phone checks — and demands taps DEC-043 bars; un-carding saves 6.5% and breaks the motif. What was
wrong with the judged stack was anonymity, not height: four near-identical cards with no extent or
progress. The ordinal fixes that at +28.5px per sheet (3071px total at 375, measured), and F-B2's
removal retires the scroll-fight half of the phone complaint in the same round.

**Also landed with this round**: `page-shell.md` §7.1 A11 and `section-04-decisions.md` §12.16
amended to the two checks that shipped, closing DEC-053's assignment; §4's layout sketch updated
off the retired trade-off string (HO-034's pointer).

**Impact**: developer (HO-036 builds all three; the retirement inventory and §12.14/15/18/19 are
its assertion work-list), qa (HO-037 re-runs scoped; the new alignment assertion must be proven
able to fail), content (none — the ordinal is chrome, stamp strings untouched), pm (re-gate
packet).

**Touched**: `design-specs/web/page-shell.md` (§7 intro, §7.1 rewritten, §7.2 new, §9 unchanged,
§10, §11, §13), `design-specs/web/section-01-hero.md` (§6.1, §9, §13.7, §15),
`design-specs/web/section-04-decisions.md` (§3, §5, §6.2, §8.1, §10, §12, §13, §14),
`samples/gate-b-proposed.html` + `samples/gate-b-renders/` (decision records, never ship),
`agent-requests.md` (HO-035), `orchestration-queue.md`, `decision-log.md`.

---

### DEC-058 — Two durable specs describe a build that has moved; the build is right and the specs are amended (2026-07-30)

**Both are spec-versus-build drifts surfaced by the fix round's own authors rather than by a check.
Neither changes a pixel. Ruled together because the disposition is the same: the shipped page is
correct, and the durable file that describes it is the thing that is wrong.**

**Ruling 1 — the footer's receipts render uppercase, and `footer-copy.md` §3 is amended to say so
(OBS-017).** The sentence reads *"Labels ship lowercase as the seed writes them"*; the page renders
all six receipts tracked uppercase by transform, so the distinction the sentence draws is invisible
to a reader. The **rendering stays**: every mono label on this page is uppercase by the same
transform — the eyebrow, the stencil tags, §4's row labels, the remnant keys — and forking
`--text-micro` for six words would buy a lowercase footer row that matches nothing else on the page.
What the sentence is actually stating is a **source-string** convention, and it is true of the source
strings, which are byte-equal to the copy file and are what a reader copies. It gains one clause
saying which of the two it means. Content owns the file; the amendment is one line.

**Ruling 2 — `section-01-hero.md`'s chip clauses are amended to the production href (OBS-016).** The
markup sketch (§6.1) and assertion 9 both still specify a same-origin relative `VERIFY.md` href,
which F-B6 superseded at Gate B (DEC-056): the chip ships
`https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md`, and the harness asserts it
byte-equal to the footer's VERIFY receipt so the two cannot drift apart. The spec is wrong about the
build, not the reverse — a relative href would serve raw markdown on a static host, which is the
defect F-B6 was raised to fix. Both clauses take the blob URL; the A-004 rationale stays as written,
because an href click is user navigation either way and no runtime request is added. While in there,
the sketch's class name is corrected to the shipped `chip--emphasis`. UI/UX owns the file.

**Why neither is a launch blocker**: nothing a reader meets is affected, and both files' *shipped*
consequences are already asserted by the harness. They are carried, named, in the re-gate packet's
standing fix list so they land in whichever step follows the founder's verdict rather than being
rediscovered.

**Ruling 3 — `copy-rules.md`'s R8 and R9 had drifted off the shipped page, and PM fixed them in
place.** Found while checking the footer against the rules that govern it, not filed by anyone. R8's
✅ example still blessed *"by Muster's AI team — 8 agents, 1 operator"* — the exact phrasing the
founder superseded for the footer — so a Content session reading the rule would have been pointed
back at the string this sprint just removed. It now carries the shipped line and the principle behind
it: a team claim states participation, not roster size, wherever a reader could take it as a claim
about who built the thing in front of them; roster size is sayable only as a label on the roster
itself, which is what §1's caption is. R9 read *"the `curl` plus one GitHub link,"* which is now
literally false of a page carrying seven footer links. The rule's subject was always the single
**ask**, so it is restated that way, with provenance links named as explicitly out of scope: they let
a skeptic check the page, which is the opposite of an invitation to act. PM owns
`agent-skills/`, so this is fixed rather than routed — the same disposition A-007's stale motion
count got at Gate B.

**Also checked and cleared, since the footer departs from the seed**: the shipped receipt row carries
six links where the seed's footer spec names five. The sixth (the framework repo) is founder-supplied
— DEC-056 answer 1 names both URLs and says they feed the footer links — so it is authorized source,
not Content inflating a founder-authored passage. Recorded because "the seed wins" is the standing
tie-break, and a reader comparing the two would otherwise find an unexplained extra link.

**Impact**: content (ruling 1's one-line amendment), ui-ux (ruling 2's two clauses plus the class
name), developer (none — the build is correct as shipped), qa (none — no assertion changes), pm
(ruling 3, done in this session).

**Touched**: `agent-skills/content/copy-rules.md` (R8, R9), `agent-requests.md` (HO-034 through
HO-037 reviewed and resolved), `wave-review.md` (re-gate packet), `orchestration-queue.md`,
`current-sprint.md`, `decision-log.md`.

---

---

### DEC-059 — The re-gate round is routed: ten findings, two resolved at the gate, one held as a consult (2026-07-30)

**Decision**: the founder's re-gate desktop pass produced findings F-R1–R10 (recorded in
`wave-review.md`); the interactive PM routed them at the gate, the third use of the DEC-049
mechanism. Resolved before routing: **F-R4** — the provenance line was false as written
("production"); it ships as *"a real iOS app"*, one word changed, founder's pick. **F-R6** — the
"(yet)" idea dies against the founder's own roadmap (model-agnostic must not be claimed before its
Wave 5); §6 draws from the roadmap's safe-today claim — deterministic bash over markdown,
model-proof by design — present tense only. **F-R10** — receipt links become commit-SHA
permalinks chosen by the founder's criterion that *each snapshot must be a demo in itself* (the
queue pinned at a fully-planned backlog, never the nearly-done state). **F-R2** — rust on
"context engineering" is dead by measurement: 4.19:1 dark / 4.35:1 light against the 4.5 floor.

**Held deliberately**: F-R1 (the overnight wave in §2) is a UI/UX **consult** — options with pros,
cons and scope-safety, founder decides at the final gate; nothing builds this round. The three
phone checks ride to the final gate so the founder's phone pass is spent once.

**Routing**: Content HO-038 (fable — the footer's single closing sentence and §6's claim line are
founder-trusted judgment) → UI/UX HO-039 (fable — five design rulings plus the consult; the
founder's read-your-skill-files instruction is in the brief) → Developer HO-040 → QA HO-041 → PM
review, which rules the repetition-audit memo and promotes the final gate.

**Impact**: content, ui-ux, developer, qa, pm.

**Touched**: `orchestration-queue.md`, `wave-review.md`, `decision-log.md`.

### DEC-060 — Re-gate design rulings: the masthead, the indicator, two hierarchies, and every one chosen from renders (2026-07-30)

**Decision**: five rulings answering the re-gate's design findings, each judged from candidate
renders in the page's real tokens, both themes where colour is in play, both engines
(`samples/re-gate-proposed.html`, renders in `samples/re-gate-renders/`):

1. **The header lockup ships at brand scale** (F-R7, founder-ruled seat): wordmark `1.125rem`
   (18px), pennant 9 × 13.5px — the mark held at 0.5em × 0.75em of the wordmark so one declaration
   scales the lockup. `--bar-h` stays 48px (measured), so the hero fold arithmetic, §2's phone
   budget and `--scroll-pad` are untouched. The founder's artwork as a data-URI `<img>` was weighed
   and rejected on measurement, not legality: the cream glyph is ~1.08:1 on the light ground —
   invisible — and a single image asset cannot follow the theme tokens, where the clip-path box
   paints `--accent` in both themes with no second asset. The house tile reads as an app-icon
   badge in the chrome. Separators keep 6 × 9; the **footer boundary gains its separator mark**
   (rule construction minus the tag), replacing the footer's plain top border; the footer lockup
   stays ruled out — a separator is punctuation, not a second masthead.
2. **§4's position channel becomes a real indicator** (F-R3): one 2px segment per sheet spanning
   rail → rail-end under the track — aligned with the sheets by construction, always visible,
   active segment `--accent` (4.19/4.35 ≥ 3:1 graphical), inactive `--hair` with extent carried
   in the ordinals' text. Discrete class toggle via IntersectionObserver — no transition, no
   animation, no scroll-position read or write, motion budget closed. The styled-scrollbar gauge
   retires (`scrollbar-width: none`): overlay default rendered it absent, classic rendered it
   edge-to-edge and misaligned — the founder's finding, confirmed on the shipped render.
3. **§3's recognition hook takes ink bold** (F-R2): *context engineering* in `<b>` at 700 — the
   page's existing weight pair, no third weight, no rust (dead at 4.19/4.35 vs the 4.5 floor).
   Recorded as the shell's in-passage emphasis rule.
4. **§5's provenance line is the section's primary** (F-R5): 700 at `--text-body`, the other two
   lines 400 — the §4 bolded-title grammar applied to the section's strongest sentence. The
   lead-scale candidate was rendered and rejected: founder testimony in display dress.
5. **The footer composes as four blocks at signature scale** (F-R9): boundary separator, closing
   sentence at `--text-lead` (candidate A — team truth first, 33 words — confirmed from renders
   against B's recital and C's authorship-first), receipts row at micro, contact link last; all
   on the rail.

F-R1 is a consult, not a ruling — the options memo rides in HO-039 for the founder's pick at the
final gate; nothing builds.

**Impact**: ui-ux, developer (builds HO-039's rulings at the next step), qa (new indicator, logo,
§5 and footer relationships), content (`section-05-copy.md`'s "no separate design spec" note is
superseded by `section-05-shipped.md` — one-line amendment), pm (`brand-guidelines.md` §4's seat
table and mark-scale prose are PM-owned and now need reconciling with the brand-scale header and
the footer-boundary separator).

**Touched**: `design-specs/web/brand-seats.md`, `page-shell.md`, `section-04-decisions.md`,
`section-05-shipped.md` (new), `footer-layout.md` (new), `section-01-hero.md` (DEC-058's chip
amendment landed with the round), `agent-requests.md` (HO-039), `orchestration-queue.md`.

### DEC-061 — The repetition audit is ruled, VERIFY's pin stops being provisional, and the receipts' own guard is scoped (2026-07-31)

**Decision**: three rulings closing the re-gate round, plus one PM-owned cascade.

**1 — The repetition audit (F-R8): eleven verdicts accepted, one declined and re-ruled.**
Items 1–11 are accepted as filed. The page's repetition is load-bearing idiom, and the audit is
right that most of it is structural rather than verbal: scope labels that would become punctuation
without their key (5), readout keys that ARE the cross-scope comparison mechanism (6), §2's
terminal-vs-narration two-voice design (7), ordinal frames whose values differ (9). Nothing is cut
on repetition grounds where the second instance does a different job — the `curl` bookend (1), the
roster-vs-participation split on `1 operator` (11), the two `THIS SITE` dash clusters (4).

Item 2 — the wave totals twice in §2 — is **kept, and its reserve retires**. The audit held sp8's
totals clause as §2's one reclaimable seat *if* the overnight-wave work needed room; ruling 3 below
means §2 builds nothing this sprint, so the room is not needed and the clause stays. It becomes
live again only if the founder picks option 1 or 2 at the final gate.

Item 12 — `Muster` — is **declined as filed and re-ruled**. "Tolerable" is a weaker verdict than
every other row's, and the row does not test the one cut available to it. §5 seats the word three
times inside one screen: the section heading (`§05 · SHIPPED WITH MUSTER`), the founder's
provenance line, and the page-attribution line directly beneath it. The heading supplies the
subject two lines above, so the third instance is carried by the section frame, not by the
sentence. **Ruling: §5's page-attribution line drops `with Muster`** — "This page — built by its
own AI team, and measured with the same meter." R8's AI qualifier survives in both attribution
seats, so item 3 is unaffected, and the founder's line is untouched. **Not applied at this review**
— rulings are not hand-applied — it rides the build step after the founder's final verdict and
does not gate launch. Accuracy note recorded rather than actioned: the row counts "×7 prose" where
five render; two of the seven are `<title>`/meta, which the memo's own scope excludes.

**2 — The VERIFY receipt and the §1 chip re-point to `blob/main/VERIFY.md`; the pin is retired,
not deferred.** The founder's demo criterion for this one file is *the launch state*, and `main`
at launch **is** that state by construction — which makes a SHA pin here a snapshot that must be
re-taken later, rather than a receipt that cannot rot. Three things follow and all point the same
way: a live target needs no re-pin step and therefore cannot be forgotten at launch; `blob/main`
survives any merge strategy, where the other three links do not; and the pinned copy predates
VERIFY.md's own "the four receipts, live" section, so the receipt that explains why pinned and
live differ currently lands a reader on the copy that does not contain the explanation. The other
three receipts stay pinned — their demo moments are in the past and a snapshot is exactly right
for them. The chip and the footer receipt move together and stay byte-equal, as asserted.

**3 — F-R1 (§2's overnight wave) goes to the founder as a pick, with option 3 recommended.** The
consult's reasoning holds under review: R2 permits only the mechanism sentence, which §4 decision 4
already ships, so options 1 and 2 pay §2's whole machinery for a duplicate — and option 1 re-spends
the founder's phone playback check, which is the round's one hard launch blocker. This is the
founder's call, not PM's; the memo rides in the final packet with its blast radii intact.

**4 — PM cascade (DEC-060's open Impact item), applied.** `brand-guidelines.md` §4 recorded the
header pennant at the separator's 6 × 9 and stated the footer carries no mark. Both now describe
the shipped page: the header lockup is bound to the wordmark in `em`, the footer boundary is listed
as a seat, and the punctuation-scale rule says which seats it governs and which one is sized to be
read instead.

**Rationale for what is NOT ruled here**: the harness gap found by this review (below) is a
verification finding, not a page defect — all four shipped SHAs are real commits and every path
exists at its own commit, read at the SHA. It lands in `pre-launch-checklist.md`, where the launch
re-pin will meet it.

**Stress test — a fabricated receipt SHA passes every runner if the copy file agrees with it.**
Planted by PM and reverted clean: `verify-shell.mjs` asserts the six receipt URLs against
`footer-copy.md`, and `qa-fullpage-sweep.mjs` asserts SHA existence via `git cat-file` **for the §1
chip only**. Changing the queue receipt's SHA on the page alone goes red (one check, naming the
differing URL); changing it in the page **and** its copy file together passes **295/295 and 43/43**
— a link that 404s for every reader, green everywhere. Not a defect today; it is precisely the
mutation the launch re-pin performs.

**Impact**: content (item 12's cut and §5's copy file — build step after the founder's verdict),
developer (item 12's string, VERIFY/chip re-point, and extending the sweep's `refExists` check to
all four pinned receipts), qa (re-verify the re-pointed chip/receipt byte-equality and the widened
SHA guard), ui-ux (none — no layout consequence), pm (`brand-guidelines.md` applied above;
`pre-launch-checklist.md` extended).

**Touched**: `brand-guidelines.md`, `pre-launch-checklist.md`, `agent-requests.md` (HO-038 heading
restored, four handoffs resolved), `wave-review.md` (final gate packet), `orchestration-queue.md`.

---

### DEC-062 — The cost posture: attention on the cards, price in prose, economics in VERIFY; the closing round runs lean (2026-07-31)

**Context, measured before deciding**: the committed driver logs show **$594 across 51
step-sessions and ~27.3 driver-hours** (fable 14 steps / $209; opus 37 / $385; true waste from
error runs under 10%). That is a floor — interactive sessions add more. Bodh's card says $147 /
9.3 h for a whole product; the site's rate ($21.8/hr) matches Bodh's own website wave ($24.73 /
~64 min ≈ $23.2/hr), but the TOTAL beside $147 reads as failure, and any reader can do the
division. The founder ruled the totals do not get headlined.

**Decision 1 — §5's cards change the question, symmetrically.** Both cards re-key to
`OPERATOR ATTENTION` (BODH `4.8 h` · THIS SITE `—` / `measured at launch`) plus the `SHIPPED`
slot (`bodh.day` · `THIS PAGE`). Commit-days is dropped from the cards (founder: low value).
Cost cells are gone from BOTH cards — never one card dodging its twin.

**Decision 2 — Bodh's price moves to Bodh's prose line**, where product prose naturally differs:
*"Bodh — a shipped iOS app and web landing, live at bodh.day: 9.3 hours of active build, $147 in
AI tokens."* (The measured line DEC-046 removed from §1, homed in the receipts section.)

**Decision 3 — the site's full economics publish in `VERIFY.md`**, with method and the rate
context (same $/hr as the product's own website wave; more hours because the build carried four
founder gates and its own verification apparatus). **The page prints no derived rate and no human
cost baseline** — both bans reaffirmed after explicit founder exploration; the deck and meetings
are the genre for the $/hr-vs-humans story. VERIFY may state the measured rate WITH its inputs, as
a measurement report.

**Decision 4 — F-R1 closes as option 4.** The overnight fact stays in §4 decision 4 and the
receipts; the launch "wave rack" idea is retired for now because it would headline per-wave costs
this posture declines to headline. Revivable if launch telemetry pleases.

**Decision 5 — the closing round runs LEAN, by founder mandate.** Remaining work to launch runs
interactively in a warm tab on `claude-opus-5` (PM included — no further fable), with **one**
full QA sweep + review at the very end instead of per-wave re-runs. Risk accepted with eyes open:
per-wave QA caught three Sprint-1 regressions, so every interactive change keeps its targeted
assertion, and nothing merges to launch without the terminal sweep going green.

**Cascades**: §1's THIS SITE remnant strip re-keys to match or slims to the VERIFY chip (UI/UX
renders both, picks); §5's copy file re-keys; the dash-promise (`measured at launch`) now points
at attention, a number the founder is glad to fill.

**Impact**: content, ui-ux, developer, qa, pm.

**Touched**: `wave-review.md` (final-gate verdict), `retrospective.md` (FF-004),
`decision-log.md`.

---

### DEC-063 — The final gate closes: the phone passes, the closing round runs Assisted, and two of DEC-062's own strings are corrected (2026-07-31)

**1 — The gate is closed and the last hard launch blocker with it.** All three phone checks pass
on a real iPhone in Safari with the toolbars showing. §2's **full 48-second playback held both
layers on screen throughout** — the residual `100dvh` risk that `section-02-replay.md` §7.1's
entire 379.4px budget rested on, and the one measurement no harness on this machine could take
(`qlmanage` executes no JavaScript and renders at a fixed ~1024² at any requested size). Find on
Page lands its matches on screen; scroll feel is good and §4's sideways track rests composed.
`pre-launch-checklist.md`'s §2-mobile item resolves.

**2 — Three findings from the scroll-through, folded into the closing round as work, not steps.**

- **§2's replay control does not reset either pane's scroll** (Developer). After activation new
  lines render out of view, because neither the terminal nor the narration container returns to
  top. Replay must scroll **both** to top on activation. Assertion: trigger replay → `scrollTop`
  0 in both panes.
- **§4's indicator never reaches slot 4** (Developer), stopping at 3 at full track end — likely a
  last-index rounding error or a `max-scrollLeft` short of the final snap point. Assertion:
  programmatic scroll to track end → indicator state = slot 4. This is the second defect in the
  same component the re-gate round already found shipping four dead segments to a no-JS reader,
  which is why the assertion is on the END state rather than on a mid-track position.
- **The footer attribution line is re-ruled, final** (Content). It becomes exactly: *"Specced,
  written, and reviewed by Muster's AI team — 5 of 8 agents, the other three never invoked, 1
  operator — on a framework designed and built by Kanwar Sandhu, solo, shipping his own products
  with it."* This fixes the double-`and` and scopes "designed and built" to the **framework**,
  which `footer-copy.md`'s own note on the two authorship claims already intended but the shipped
  string did not say. Lands byte-equal in `footer-copy.md` and `index.html`, and the footer's
  word-count coupling re-bases — the "one sentence, 35 words" measure changes with the string.

**3 — Two of DEC-062's own quoted strings are corrected before they build.** DEC-062 decision 2
quoted a replacement for §5's Bodh line. Building it verbatim would have shipped two regressions,
and both are ruled here rather than carried into the brief as open questions:

- **§5's scope sentence stays.** DEC-062's line deletes *"The replay above is its website wave."*
  `section-05-copy.md` §3.1 documents that sentence as load-bearing: it tells the reader the
  64-minute chain they watched in §2 is a **wave inside** this product, not the whole of it —
  A-005's failure mode pre-empted in the one place on the page where the two scopes sit closest.
  DEC-062's line makes that job **harder**, not redundant, because it introduces a whole-product
  `$147` two screens below a wave-scoped `$24.73`. Deleting the guard while adding the hazard is
  the wrong direction; the sentence stays.
- **R3's framing moves with the figure it governs.** `$147` currently sits under the
  `COST · API LIST` key, and `section-05-copy.md` §6 records that the key *is* where R3's framing
  lives — API list price, cost-to-replicate, never subscription spend. DEC-062 deletes that key
  and its quoted prose says only "$147 in AI tokens", which carries no framing at all. **A figure
  may not shed its scope qualifier by changing which element renders it**: the prose must carry
  the API-list framing the deleted key was carrying.

Both are copy-rules calls inside PM's autonomy (`decision-making.md`), ruled at brief-writing time
so no round-trip is spent mid-flight. The **substance** is ruled here; the **form** — exact
wording, and whether §5 runs three prose lines or four within the seed's "~4 lines" budget — is
Content's to rule.

**4 — The closing round runs Muster's Assisted mode, three invocations, founder-approved.**
DEC-062 d5's lean mandate constrains **sessions and QA cadence** (one warm tab, `claude-opus-5`,
no driver runs, one terminal sweep instead of per-wave re-runs). PM initially read it as also
constraining **role separation** and began building specialist work directly; the founder stopped
that. The two are separable: Assisted mode is one PM tab spawning subagents, which satisfies every
clause of the lean mandate. The deciding argument is not process hygiene but **the exhibit's own
claim** — the footer publishes *"specced, written, and reviewed by Muster's AI team"* beside a
linked, public git log, so a closing mile of `pm:` commits doing design, copy and code would refute
the page on the one surface a sceptic checks. Secondary: PM reviewing PM removes the second reader
that caught three Sprint-1 regressions, and durable specs would get written by the wrong owner
(`muster/CLAUDE.md` rule 1).

Exactly three invocations — Content, UI/UX, Developer — each writing its own files and committing
under its own role per rule 16. Founder time is spent exactly twice: one batched render look, and
the post-push VERIFY click-check.

**5 — Sequence to launch, with PM's one amendment.** Content → UI/UX (renders proposals) →
**founder's batched render look** → Developer (builds everything, including the pick) → terminal
QA sweep → launch merge with history preserved → founder's VERIFY click-check on the live page.
The amendment: the founder's stated sequence put Developer before the render look, which would
have needed a fourth invocation to build in the pick. Developer therefore runs **last**, and the
founder's look is taken on UI/UX proposal renders in the page's real tokens — the established
pattern for taste calls here (DEC-057's `samples/gate-b-proposed.html`, and all five of DEC-060's
rulings). This also satisfies DEC-062 d5's own condition that nothing merges on a sweep predating
the last change.

**Impact**: content (§5 strings, VERIFY.md economics, the footer ruling), ui-ux (2-cell card
composition, §1 remnant options), developer (all markup, the two bugs, every harness coupling),
qa (terminal sweep), pm (this entry, `wave-review.md`, `pre-launch-checklist.md`, the briefs).

**Touched**: `wave-review.md`, `decision-log.md`, `pre-launch-checklist.md`,
`orchestration-queue.md`.

## Archive Reference
<!-- Older decisions archived in decision-log-archive.md -->
