# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-28 HO-026 — §1 and §6 built: the sparse hero, the command, and the proof link
**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html` (§1, §6), `styles/sections.css` (new), `styles/tokens.css`,
`VERIFY.md` (new, repo root), `tests/verify-shell.mjs`, `tests/lib/cdp.mjs`,
`tests/qa-independent-audit.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] QA — consumes the built page and the amended guards at the full-page sweep (not a review gate)

**What shipped**

- **§1, the sparse hero.** Eyebrow · headline · formation above the fold; the THIS SITE remnant
  strip and the curl below it. Nothing else — no measured line, no BODH row, no terminal. The
  section's whole element inventory is asserted, negatively as well as positively: within `#hero`
  none of `9.3`, `4.8`, `$147`, `$24.73`, `289`, `~64`, `bodh` occurs, there is no `<ol>` and no
  terminal/log element, and the only digits in the section's text are the eyebrow's `4` and the
  caption's `8` and `1`.
- **The headline announces what it should.** Rendered text is
  `Ship a product with a human an AI team.`; the computed accessible name, read from
  `Accessibility.getFullAXTree` rather than asserted, is `SHIP A PRODUCT WITH AN AI TEAM.` — the
  struck phrase absent from the name and present in the render. The comparison is
  case-insensitive and word-exact: Blink computes the name from rendered (uppercased) text and
  WebKit from source text.
- **The formation announces the architecture it draws** — group → `PM` → a list of exactly seven
  specialists in the locked order, verified out of the AX tree; the hub's distinction is border
  colour **and** weight 700 **and** position; bus, spine, stems and registration marks reach the
  AX tree nowhere. At ≥`--bp-wide` the seven plates share one row and the bus's rendered width
  equals the plate row's, measured — 676.38px against 676.38px. Below it the ladder stacks.
- **The fold contract holds, read off the elements rather than off the spec's figures.** At
  375 × 553 the hub (331.17) and four whole plates (plate 4 at 518.36) are above the fold, with
  plate 5 cut at 565.16 — the designed scroll cue. At 320 × 553 the hub (360.56) and three plates
  (500.95). No horizontal scroll at 320/360/375/390.
- **§6.** The lead line, the exact `curl` with the page's only cursor, `cd my-product && claude`
  adjacent and unannotated, and one GitHub link whose visible text is its destination. §6's
  interactive inventory is exactly one element.
- **The curl is one string in three places** — `copy-rules.md` R12, §1, §6 — asserted by reading
  R12 off disk at test time and comparing bytes, never by fetching.
- **`VERIFY.md` at repo root**, which the §1 chip resolves to: the method in five lines, the three
  scopes stated separately with THIS SITE dashed, an index of what is committed in this repo and
  what each artifact holds, and the two commands a reader can run. This closes a hard launch
  blocker (`pre-launch-checklist.md`); it is developer-authored and has had no content pass.
- **The `--text-display` floor landed with its assertion, not alone.** `clamp(1.75rem, 6.5vw,
  4.25rem)` in `styles/tokens.css`, guarded by the relationship it exists for rather than by its
  literal value: the headline sets without overflow at 320/360/375/390 — 3L, 3L, 2L, 2L at 28px,
  h1 overflow 0 at every width — and both treated phrases report exactly one client rect at each,
  so no strike or accent can break mid-phrase.

**The `http(s)` ruling, implemented as a narrowing (DEC-034)**

The check was **amended, never deleted**, and it is now default-deny. Every `http(s)` occurrence in
a shipped file is classified from what precedes it; exactly two classes pass — a URL as inert text
(a comment included), and the value of an `href` on an anchor. `url()`, `@import`, `src`, `srcset`,
`poster`, `data`, `<link href>`, `<script src>` and a `fetch()` argument are fetching references and
fail. The DOM-side guard needed the same narrowing and got it, plus a new one: a cross-origin `href`
passes only on an `<a>`, and **any prefetch/preload/preconnect hint fails**, because it would fetch
without a click and would otherwise walk straight through the anchor allowance.

**The guard was proven to fail.** A planted `<img src="https://…">` and `url("https://…")` turned
the run red naming both sites exactly (`index.html:313 img[src]`, `styles/sections.css:22 css
url()/@import`) alongside three zero-external-request failures. Tree reverted clean, re-run green;
the permitted §6 anchor stayed permitted throughout.

**The two Wave 1 rulings that landed here (DEC-042)**

1. **`cdp.mjs`'s `send()` has a deadline.** Every reply is awaited under a 180 s ceiling and
   rejects naming the method, the elapsed time and the message id. The ceiling is deliberately far
   above any legitimate call — this harness awaits a real 48-second replay chain inside one
   `Runtime.evaluate` — so it catches a transport that has stopped answering rather than bounding
   how long a page may take.
2. **The display floor** — above, with its assertion.

**The independent audit — reported as a result, not a pending item**

`node tests/qa-independent-audit.mjs` **completes and exits zero**, run twice consecutively
(107/107, ~2m55s each). It did not hang, and no CDP timeout fired — the stall did not reproduce on
this build once the transport deadline was in place. On its first run after §1/§6 landed it exited 1
with eight named failures; two were real defects in this build and six were assertions whose subject
had changed. All eight are resolved:

- **Real defect** — the `VERIFY` chip and §6's link measured 79×26 and 300×14 on a coarse pointer.
  §6's link now carries the shell's `.link-block` idiom; both measure ≥44 × 44.
- **The coarse-pointer probe was blind.** A mobile viewport is not a coarse pointer:
  `matchMedia("(pointer: coarse)")` reported **false**, so the hit-area rule never matched and the
  check measured the fine-pointer visual — it would have passed a page with no such rule at all.
  Measured three ways: mobile viewport false, `setEmulatedMedia` with a `pointer` feature false,
  `setTouchEmulationEnabled` true. It now uses touch emulation and **asserts it is on** first.
- **The full-ink rule** read `classList`, so §1's eyebrow — four `<li>` facts inside a `.t-label`
  list, inheriting muted from it — read as four muted paragraphs. Now `closest`: a muted *reading*
  paragraph still fails, which is the rule.
- **The small-rust rule** had one named graphical exemption (the corpus ✓). The chip's `⎘` is the
  second, named by `page-shell.md` §8's chip motif. Both are asserted with what makes them safe —
  aria-hidden or redundant with ink text beside them, each against the 3:1 non-text floor in both
  themes. Three contrast checks partition the same way.
- **The animation inventory** reads pulse ×6 **plus exactly one `cursor-blink`** and fails on
  anything else.
- **The tab-order check** asserted a fixed three-stop list. Two things defeat a list: the stop set
  grows as sections ship, and §2's narration list is a scroll container, which Chrome makes
  keyboard-focusable **with no `tabindex` attribute at all** — unenumerable by any attribute
  selector, and only a scroll container in some states. It now drives real Tab keys and compares
  each stop with the last by `compareDocumentPosition`: focus advances in document order and never
  revisits. A trap or a reorder still fails.
- **The replay control's focus ring** depended on the input modality an unrelated earlier block
  happened to leave the engine in — `:focus-visible` on a programmatically focused element is
  modality-dependent, so a real focus regression could have hidden behind a reordering. One real
  key press now sets keyboard modality first.
- **The reading-measure probe** read `#hero .instrument p`, which left with the section. It follows
  a rendered body paragraph now, and the `.instrument` inset probe was decoupled from it. That
  inset check also gained a length guard: with no `.instrument` present its `every()` would have
  reported a pass on nothing measured.

**Verification**

- `bash scripts/test.sh` **GREEN, both engines** — 197/197 Blink, 15/15 WebKit (was 168/168 + 15/15;
  29 checks added).
- `node tests/qa-independent-audit.mjs` **exit 0, 107/107, twice consecutively.**
- **Cross-engine, looked at rather than inferred**: `tests/artifacts/blink-dark-hero-1280.png`,
  `blink-dark-hero-375.png`, `webkit-dark.png` and `webkit-dark-s06-check.png` (§6 rendered alone
  through QuickLook, since the WebKit thumbnail only reaches the top of the page). Both engines
  render the strike, the rust substitution, the hub/bus/regmark construction, the ladder cut at the
  fold, the remnant's dashes and chip, and §6's cursor identically.
- Registration-mark sparseness is now grouped by the surface each mark hangs on rather than by the
  `.instrument` class, so §1's remnant is covered the moment it ships instead of sitting outside
  the rule: `remnant 2 · terminal 2 · slot 2 · slot 2 · slot 2`.

**Would Apple ship this?** Yes. The first screen is one claim, one diagram, and nothing that needs
explaining — and the claim edits itself in front of the reader, which is the whole argument in one
gesture. The page asks to be checked and then hands over the file that lets you do it. What is
deliberately unpolished: `VERIFY.md` is a developer's index and reads like one.

**Revision log:**
- 2026-07-28: Filed. Self-review caught and fixed: one overclaim in `VERIFY.md` (that every scope's
  figures come from the meter — the wave's per-step figures come from the sprint driver); a
  first-draft "who built this" line that read `8 agents, 1 operator` as a description of *this*
  build, which is roster size stated as wave participation — the exact scope slip the file exists to
  catch; and five archaeology phrasings in code comments (Rule 15) re-cut to current truth. Two
  AX-name comparisons were written case-sensitive and failed on Blink's uppercasing; both now match
  the cross-engine rule the hero spec states.

**Observations** (non-blocking, for PM):
- OBS-006 — the queued QA step (audit repair, HO-033) is premised on an unbounded renderer bisect,
  and the audit now exits zero twice with no timeout fired.   Severity: med
  Evidence: `.test-logs/audit-post-s01e.log`, `audit-post-s01f.log` — exit 0, 107/107 both runs,
  ~2m55s each; the first post-§1 run (`audit-post-s01.log`) also completed, at 175 s, with eight
  named failures and no CDP timeout.
  Suggested action: PM rules at the build-review step whether that step still has a subject. The
  queue was not touched — scope changes are not this step's to make.
- OBS-007 — `section-06-copy.md` §4.2 states "§1's interactive inventory is exactly two elements and
  §6's is one"; `section-01-hero.md` §12 rules §1's inventory at exactly one, the `VERIFY ⎘` chip.
  Severity: low
  Evidence: the two spec files; the build follows the hero spec and asserts the chip is `#hero`'s
  only focusable element.
  Suggested action: PM reconciles the copy file's aside at review.
- OBS-008 — the audit's `.instrument` inset check loses its subject when the last shell placeholder
  leaves (after §5 lands).   Severity: low
  Evidence: the check now fails loudly with "no .instrument surface on the page — re-target this
  probe" rather than passing vacuously on an empty set.
  Suggested action: PM routes the re-target to whichever step retires the final placeholder.

### 2026-07-28 HO-031 — Gate A fix round: four copy files re-cut to the verdict
**Type:** handoff
**Producer:** Content
**Deliverable:** `knowledge-base/design-specs/web/section-01-copy.md`, `section-03-copy.md`,
`section-04-copy.md`, `section-05-copy.md`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] UI/UX — consumes §4's measured lengths and §1's settled strings at HO-032 (layout input, not a review gate)

**What shipped, per file:**
- **§1** — the settled headline is the only candidate: visible `Ship a product with ~~a human~~ an AI
  team.` (struck `a human` in ink, `aria-hidden`; rust on `an AI` only; plain ink `team.`), announced
  `Ship a product with an AI team.`, with the gate's measured line counts recorded (3/3/2/2/2 at
  320/360/375/390/1280 — no orphan word at any width). Deleted: the subline, the measured line, the
  readout's BODH row, the terminal chrome labels. Kept byte-exact (verified by script): eyebrow,
  formation labels + caption, all THIS SITE row strings with `measured at launch` and `VERIFY ⎘`,
  the curl. §1 now contains zero Bodh material (DEC-045/046).
- **§3** — rewritten to the closed block: K1 kicker (6 words) + the 90/90 paragraph
  **byte-identical to the verdict's final string** (confirmed by exact-substring check; 90 words by
  the stated counting convention). The named-competitor ruling and its fallback are gone (DEC-047);
  the kicker's sentence-boundary wrap rule is stated for the build with `page-shell.md` named as its
  spec home; the hook rides the curated-slice sentence, once, nowhere else on the page.
- **§4** — re-authored from DEC-044's four decisions in DEC-044's order (tiered reading 2026-04-24 ·
  determinism + economics 2026-06-13 · growth caps 2026-04-12 · attention architecture 2026-06-07),
  plain language per DEC-043, first person as the founder's. **Measured counts, script-verified:
  row bodies 44 / 42 / 44 / 44 against the ≤45 ceiling; titles 10 / 9 / 11 / 9 against ≤12.** Every
  core trade-off survives (no shared conversation · floors can't flex · history lost from view · no
  mid-run steering); two secondary maintenance corollaries were trimmed by the ceiling and are named
  in the file's §6 so the cut is visible. No decision was unfittable — nothing is flagged. The
  six-line-title-at-320px watch item retires: longest title is now 11 words. Stamps are the four
  verified dates exactly; §4's only numerals.
- **§5** — both cards gain key 4 `COST · API LIST` → `$147` (BODH) / `—` under `measured at launch`
  (THIS SITE), per DEC-048. The three stale rationales named at the verdict's §5 close are cleaned
  (subline reference → formation caption; "repeats §1" → §5 as the primary byte-equality site for
  `9.3 h`/`$147`; the "no cost figure in §5" note → R3 framing carried by the key label). No other
  shipping string changed.
- **Copy-rules matrix run on all four files by script**: no banned word, no exclamation mark, no
  "proven" outside negations, no `muster.build`, no rounded number, no wave-scope numeral in §1/§5,
  curl byte-equal to R12's verified form, "context engineering" exactly once on the page (§3),
  first person confined to §4 (and §5's provenance line, untouched).

**Revision log:**
- 2026-07-28: Filed. Self-review caught and fixed one durability violation (a "prior draft"
  comparison in §4's count table — archaeology moved out of the durable file; the retirement of the
  six-line title is reported here instead). No open questions; no founder dependency.

**Observations** (non-blocking):
- OBS-001 — §1's remnant readout keeps three cell labels (`ACTIVE BUILD` · `COST · API LIST` ·
  `SHIPPED`) over dashes with no measured row beside them.   Severity: low
  Evidence: `section-01-copy.md` §5; the verdict records the honest cost that the dash idiom lost
  its self-evident contrast when the BODH row left §1.
  Suggested action: UI/UX's HO-032 remnant-form ruling may fold labels into something smaller; the
  strings are supplied either way. PM decides nothing here — noted so the label-over-dash reading
  is a design choice, not an oversight.

### 2026-07-28 HO-032 — Gate A fix round: the sparse hero recomposed, §4's one-screen layout ruled
**Type:** handoff
**Producer:** UI/UX
**Deliverable:** `knowledge-base/design-specs/web/section-01-hero.md` (rewritten),
`section-04-decisions.md` (amended), `page-shell.md` (kicker wrap rule homed; motion §10 re-cut;
§7.1 A4 re-scoped), plus cross-reference sync in `section-02-replay.md` and `brand-seats.md`.
Decision records (never ship): `samples/s01-hero-recomposed.html`, `samples/s04-one-screen.html`.
**Status:** in-review
**Reviewers:**
- [ ] PM — pending (review scheduled at the build-review step)
- [ ] Developer — consumes both specs at the §1+§6 and §3+§4 build steps (input, not a review gate)

**What shipped:**
- **§1 recomposed to the sparse hero** (DEC-045/046): above the fold eyebrow · headline ·
  formation + caption, nothing else; no Bodh material anywhere in the section; below the fold the
  THIS SITE remnant and the curl. The scope-adjacency system is deleted, not rewritten — no
  wave/whole-product adjacency exists in §1 to manage. **§1 is ruled fully static**: the page's
  motion budget re-states at two live ambient elements (pulse, §5 count-up) + the §6 cursor; the
  count-up/`aria-live` decision moves to §5 with the page's only counting cells.
- **The formation got its design pass** — hub `PM` on a 1px accent border at weight 700 (position,
  order, weight, border: never colour alone), seated over a bus-bar that spans exactly the plate
  row's width with regmark terminals; seven full-name specialist plates; announced as group → `PM`
  → a 7-item list (the hub/bus hierarchy told structurally). Below `--bp-wide`: a 12px spine
  ladder, 24px stems, 50.4px plate pitch, spine terminating at the last stem — at the 375 fold it
  runs through the cut, which is the scroll cue.
- **New fold budget, rendered not derived** — at 375 × 553: eyebrow, headline (2L), hub + four
  whole plates (plate 4 bottom 536.3); the fold cuts plate 5 and the first measured figure arrives
  on scroll, as the founder accepted. At 320: three plates (515.3), headline 3 whole-phrase lines,
  no overflow. At 1280 × 700: the entire first screen with 194.1px clear. Landscape phone named as
  the case that cannot hold the formation. **Every figure re-rendered this session and reproduced
  exactly** (`/tmp` drivers against both samples, headless Blink, real tokens).
- **The remnant ruled: a one-row instrument strip** — labels kept over the dashes (a dash without
  its key asserts nothing; this answers HO-031's OBS-001 as a design choice), `measured at launch`
  once, `VERIFY ⎘` chip as §1's only focusable element; the lost-contrast cost of DEC-046 carried
  openly with §5 restoring the side-by-side one scroll later.
- **§4's one-screen layout ruled: a horizontal paged track at desktop** — judged from three
  candidates rendered with the shipping strings: track content bottom 612.1px (fits 1280 × 700
  snapped, 684.1 of 700); stacked 2060.6px and 2×2 1256.9px both fail DEC-043. Discoverability
  cost paid: 360px of sheet 2 visible as the affordance, x-proximity snap scoped to the track
  (page-shell A4 amended accordingly; no harness snap check exists yet — verified by grep), track
  as the section's single named tab stop, snap off under reduced motion. **Phone ruled stacked**
  with the cost measured and stated: sheets 631.8–660.7px at 375, section ≈ five phone screens;
  paging rejected because a sheet exceeds the 553 fold (two-axis navigation of clipped cards).
  `--sheet-pad` 24px everywhere is load-bearing for the budget. The no-date stamp special case is
  removed — all four stamps carry DEC-044's verified dates, byte-asserted.
- **The §3 kicker wrap rule homed in `page-shell.md` §3**: sentence-as-`inline-block` (the
  headline's mechanism family), wrap-preferred not unbreakable — one line at desktop,
  sentence-boundary break at 375, internal wrap without overflow at 320.
- **Assertions, DEC-032 practice**: hero — 12, one per relationship (announced name, phrase units,
  fold guarantee read from elements, stack integrity, the sparse negative, formation integrity and
  modes, remnant honesty, chip, static section, curl equality, eyebrow silence). §4 — 17, adding
  one-screen-at-snap-rest, track mechanics + reduced-motion, the peek, every-sheet-reachable via
  real key events, and phone un-track. Re-base tables updated in both files (the audit's 64ch
  probe re-targets §3's paragraph — §4's track prose renders ~46 rendered ch by design).
- `bash scripts/test.sh` re-run after all edits: **GREEN** — the step changed no shipped file.

**Would Apple ship this?** Yes. The hero is one claim, one diagram, one command — the restraint is
the design, and every remaining element earns its seat with a measured figure behind it. The §4
track is the honest answer to "one screen" that adds zero chrome: the affordance is the content
itself, cropped. The phone costs are stated as costs, not smoothed.

**Revision log:**
- 2026-07-28: Filed. Self-review caught and fixed: two wave-archaeology item references in the
  hero spec's provenance (re-pointed to the copy file's recorded rulings); stale `--sheet-pad`
  split and mark-clearance figures in §4's §6.4/§7.4 after the 24px-everywhere ruling. All baked
  sample figures independently re-rendered and reproduced exactly before being relied on. No open
  questions; no founder dependency.

**Observations** (non-blocking, for PM — both are DEC-046 cascade gaps in PM-owned files):
- OBS-002 — `brand-guidelines.md` §4 still records "Motion — three live elements" including the
  hero terminal, and its motifs row still says "PM hub + eight plates".   Severity: med
  Evidence: brand-guidelines.md lines ~138–144 vs DEC-046 and the amended `page-shell.md` §10.
  Suggested action: PM amends the motion row to two live elements + cursor and the formation row
  to hub + seven specialist plates, at the build-review step.
- OBS-003 — `foundational-assumptions.md` A-007's notes still say "Exactly three live motion
  elements plus the curl cursor — a fourth is a deviation."   Severity: med
  Evidence: A-007 Notes vs DEC-046. The specs cite A-007 by its principle (a new ambient element
  is a deviation), which survives the count change.
  Suggested action: PM updates A-007's notes to the two-element count with the same touchpoints.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-27 — REQ-008 (Developer → PM): **ruled — the audit is repaired in two moves, in the order the
  Developer recommended.** (1) `tests/lib/cdp.mjs`'s `send()` gains a timeout, and it lands in the
  §1-and-§6 build step, which is already amending the harness: a harness that can hang forever cannot
  report, and this converts a silent 20-minute stall into a named red check with a method on it. That is
  worth doing on its own merits regardless of what is causing the spin. (2) The renderer diagnosis — why
  Chrome saturates at 375 × 553 under the injected 250 ms sampler — lands with the QA sweep, which owns
  the audit. Splitting it this way answers the Developer's own objection: the party whose work the audit
  checks fixes the transport, not the assertions. The three downstream steps' criteria are amended to
  match. **PM did not run the audit cold**; the diagnosis is specific and measured (Node at 0% CPU,
  Chrome at ~105%, `send()` with no timeout at `:115–123` — confirmed by reading the file), and
  `scripts/test.sh` is green on the same tree, so no shipped check is unverified — what is missing is the
  cross-check, and that is stated as not-green in the Gate A packet rather than papered over.
  Test-infrastructure quality is PM-alone under the Decision Autonomy Matrix. See DEC-042.

- 2026-07-27 — HO-025 (Developer): **accepted, no revision.** The sample was re-run by PM rather than
  read — `node tools/gate-a-report.mjs` 51/51, exit 0, and all four announced strings match their ruling
  word-exact out of the AX tree. Both of its open items are ruled: (a) candidate B's four lines at 320px
  with a lone `WITH` is a real composition wart and a wrong figure in `section-01-hero.md` §4.1, and it
  goes to the founder at Gate A with the actual line breaks printed rather than a line count — the
  handoff's judgment that it cannot be fixed by widening the break unit is correct and was the reason to
  gate it rather than patch it; (b) `styles/tokens.css`'s pre-amendment `--text-display` floor **lands
  with §1, not now** — no harness asserts the clamp (verified by grep), and landing an unguarded token
  change ahead of the assertion that guards it is the drift this project exists to prevent. The
  self-caught blind check — a per-pane overflow probe that could not fail because `.pane` carried
  `overflow: hidden`, found by planting a 220-character element — is the standard this sprint is trying
  to hold, and it was met without being asked for. The stale `verify-shell.mjs` coordinates it reports
  (`:650` shipped-set glob, `:660` the http(s) check) are confirmed correct and were already carried into
  the §1-and-§6 step. One figure does not reproduce exactly: WebKit ink measured 5.59% against the
  handoff's 5.69% — run-to-run antialiasing, not a defect, noted so a later reader does not chase it.

- 2026-07-27 — HO-024 (Developer): **accepted, no revision.** The Gate 3 defect is closed by removing a
  CSS value rather than choosing a better one, which is why nothing adjacent moved. PM did not take the
  fail-when-violated claim on trust and re-planted both breaks independently: `--mark-clear: 0ch` turns
  R2 red at all three states (`L4 0px · L9 0px`), and `--mark-inset: 8px` turns R1 red reporting
  `terminal 8px / narration 12px … expected 8px read from --mark-inset` — the expected figure followed
  the token and the check still failed, on the inequality. That is DEC-032's property demonstrated
  directly rather than asserted, and it is the answer to the acceptance criterion's real question: these
  assertions cannot be satisfied by moving the value they were written against. Tree reverted clean;
  `bash scripts/test.sh` re-run by PM, GREEN both engines. The WebKit lockup check's stated limit — it
  protects the mark's rendered position, not the `align-self` keyword, because `center` renders
  identically — is the right thing to protect and the right thing to have disclosed.

- 2026-07-27 — HO-023 (Content): **accepted, no revision.** "Tightened, not rewritten" was re-derived
  from the seed by PM with an independent word-level diff rather than read off the report: 420 → 415,
  −5 words, 30 → 30 sentences, exactly three rows differing and exactly the four edits named. Per-decision
  totals confirmed (−4 / −1 / 0 / 0), so `section-04-decisions.md`'s measured line counts hold as
  measurements rather than ceilings. Every stated word budget across all five copy files was recounted
  and every one matches, none over budget. Three rulings: **the `ACTIVE BUILD 9.3 h` repeat in §5 stays**
  — a figure for what the operator spent needs the build figure beside it as a denominator, and the
  pre-authored fallback would leave operator attention without one; **§4's 7–8 sentences against the
  seed's own "~4–6" goes to the founder**, because closing it means cutting founder copy and only he can
  authorise that, with PM's recommendation to ship as-is since each sentence carries a distinct claim;
  **decision 4's stamp must never gain a date** — agreed, and the one-text-slot construction already
  makes that structural rather than a rule someone has to remember. The `curl`'s byte-equality was
  re-verified across all four files independently. See DEC-041, DEC-042.

- 2026-07-27 — HO-022 (UI/UX): **accepted, no revision.** Four lines of CSS, no JavaScript touching the
  scroll position, and §2's exemption proven as a property — the engine moved not one of the 20 sampled
  rest positions where the playback core is ≥90% visible. The three named harness traps are the value of
  this handoff: `y proximity` serialising as `"y"` would have failed a correct build, the padding asserted
  as bar-height + `--rhythm` rather than as 72, and real key events rather than `scrollBy` (the
  programmatic form reports a top-of-page trap a reader never experiences). REQ-007 answered below.

- 2026-07-27 — REQ-006 + REQ-007 (UI/UX → PM): **both ruled, both PM-alone.** REQ-006 — the omission ran
  the way UI/UX suspected: DEC-031 enumerates four seats and the footer is not among them, so
  `brand-guidelines.md` §4's "Header **and footer** lockup" row is the stale one. Amended to "Header
  lockup" with the exclusion stated in prose; its `~8px` pennant figure was stale against DEC-037's 6 × 9
  in the same row and is corrected too — leaving it would have been the same defect a line lower.
  REQ-007 — **manual check, recommendation (2) accepted.** `qlmanage` renders a static thumbnail and
  cannot scroll, so WebKit parity for a *behaviour* is unreachable here; driving Safari needs a founder
  admin authorisation plus new harness surface in a sprint with none budgeted, which is scope this run
  has no authority to add. It becomes a manual pass, recorded as manual and never reported as a
  mechanical result, and the one sentence UI/UX proposed is added to the Gate B iPhone ask. The two
  downstream steps' cross-engine criteria are amended so they are satisfiable as written. See DEC-042.

- 2026-07-27 — HO-021 (UI/UX): **accepted, no revision.** The spec is buildable from itself and HO-025
  proved it — an independent build measured 685.31px prose in a 903.31px card and a 12.00px mark inset,
  matching §6.2's own rendered figures exactly, which is the spec confirming itself against a second
  party rather than against its author. Zero rust text is the right answer to a failed contrast pair
  (ink-on-rust measures 3.43 / 2.79 — PM recomputed all eight stated pairs from the locked hex and every
  one is exact), and the stamp-as-one-text-slot makes the no-date case structural instead of a rule.

- 2026-07-27 — HO-020 (UI/UX): **accepted, no revision.** The fold is falsifiable — 461.8px measured
  bottom against 553px, 91.2px clear — and landscape phone is named as the case that cannot hold the
  full stack rather than smoothed into "every viewport." The display floor being wrong against real
  strings is exactly what the copy-before-design resequencing was for, and it was caught by measurement
  at spec stage rather than at build. §1's element inventory was checked against seed §1 item by item by
  PM: all nine present, including the eyebrow verbatim and the `VERIFY ⎘` chip. OBS-004 triaged.

- 2026-07-27 — HO-019 (UI/UX): **accepted, no revision.** Five named relationships with one assertion
  each, and the deliberate refusal to make the hanging indent a sixth — it kept moving the other five —
  is the ruling that made the build subtractive. Every figure HO-024 later measured is the figure this
  spec predicted, which is the test of whether a spec was buildable or aspirational. The ten re-base
  sites were listed by file and line and all ten landed. OBS-005 triaged.

- 2026-07-27 — HO-018 (Content): **accepted, no revision.** Four headline candidates with their announced
  strings supplied at copy stage is what made the hero spec measurable against real text rather than a
  hypothesis. §3's competitor clause ships named on the seed's own instruction, with the 63-word cut
  pre-authored so "cut, not softened" is executable without reopening copy. SP3's 24 → 19 words closed
  the deferred 320px pre-launch item on measured evidence. OBS-001 through OBS-003 triaged.

