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

## Archive Reference
<!-- Older decisions archived in decision-log-archive.md -->
