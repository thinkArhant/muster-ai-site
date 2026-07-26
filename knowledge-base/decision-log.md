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

### DEC-001 — Discovery Stages 2–3 skipped; build from the founder's settled spec (2026-07-24)

**Decision**: Skip greenfield Discovery Stage 2 (market research) and Stage 3 (go/no-go evaluation).
Proceed directly from `product-spec-seed.md` to Stage 4 drafts and Stage 5 sprint planning. Research is
unstaffed.

**Rationale**: Stages 2–3 exist to de-risk an unvalidated hypothesis — is there a market, do users want
this, should we build it at all. None of those questions are open. Muster exists at v4, Bodh shipped to
the App Store and `bodh.day`, and the founder supplied a complete settled spec whose own framing is
"the thinking is done; the job is executing it excellently." Full product-validation research would have
produced a market-landscape file nobody reads and a go/no-go score on a decision already made. A narrow
positioning-research pass was offered as a middle option and declined. Cost of being wrong: if §3's
CrewAI/AutoGen contrast turns out to need external grounding, an incremental research request via
`research/change-log.md` reopens it cheaply.

**Impact**: Research (unstaffed), PM, Content (§3 copy proceeds from the seed's framing).

**Touched**: `research/product-brief.md`, `product-spec.md`, `brand-guidelines.md`, `current-sprint.md`,
`orchestration-queue.md`.

---

### DEC-002 — Sprint 1 scope: page shell built alongside the §2 replay (2026-07-24)

**Decision**: Sprint 1 delivers the locked design foundation (both themes) *and* the §2 replay
prototype, rather than the replay alone. Sequenced as design spec → founder gate → shell build →
narration → replay build.

**Rationale**: The seed's Sequencing section orders §2 first as the highest-leverage, highest-risk asset.
The initial recommendation was §2 alone, to defer commitment until the risky asset proved out — but that
argument was weaker than stated: the seed locks the palette to exact hex values and names the type
pairing and motifs, so the foundation is not a speculative bet the replay's outcome could invalidate.
The page needs that palette regardless. Building the shell first gives §2 its real visual context. The
residual risk — that a beautiful frame flatters a mediocre replay — is closed by the founder's added
acceptance criterion rather than by deferring the shell.

**Trade-off accepted**: one extra look-and-approve cycle, in exchange for judging §2 in context.

**Impact**: UI/UX, Developer, QA, Content, PM.

**Touched**: `current-sprint.md`, `orchestration-queue.md`,
`agent-context/{ui-ux,developer,qa,content}.md`.

---

### DEC-003 — The §2 replay must stand on pacing and narration alone (2026-07-24)

**Decision**: Founder-added acceptance criterion, non-negotiable: the §2 replay must be excellent on
run-log timing and plain-English narration independent of the visual frame. At the wave gate the founder
judges it with the styling mentally subtracted.

**Rationale**: A terminal replay is judged largely on timing, pacing, and whether the narration lands —
none of which the palette affects. A rust-on-charcoal frame can make an only-adequate asset feel
acceptable, and shipping an only-adequate centerpiece is the specific failure the seed's
prototype-§2-first sequencing exists to catch in week one.

**Mechanism**: beat timing becomes an explicit UI/UX spec deliverable paced against measured intervals
from the corpus, not a developer's feel. QA reports measured beat intervals factually so the founder's
judgment has data beside it. The criterion is carried in the sprint board header, the §2 implementation
step's first acceptance bullet, and the Wave 3 gate text.

**Impact**: UI/UX, Developer, QA, PM.

**Touched**: `current-sprint.md`, `orchestration-queue.md`, `agent-context/{ui-ux,developer,qa}.md`.

---

### DEC-004 — Model plan: Opus 5 default, Fable 5 on two foundation-critical steps (2026-07-24)

**Decision**: `claude-opus-5` is the default for all queue steps. `claude-fable-5` is used for exactly
two: the UI/UX design foundation and the Content §2 narration.

**Rationale**: Per `sprint-planning.md`, the deterministic gates guarantee correctness mechanically, so
premium spend buys judgment rather than correctness — reserved for foundation-critical creation and
requiring explicit founder acceptance. The two selected steps qualify: one authors the token system the
whole page inherits, the other authors the centerpiece voice that DEC-003's criterion judges. Founder
verified empirically that `claude-opus-5` serves and is priced identically to `claude-opus-4-8`
($5/$25), so the default carries no cost penalty over the older tier.

**Impact**: all staffed agents (execution model), PM (planning).

**Touched**: `orchestration-queue.md`, `current-sprint.md`.

---

### DEC-005 — Build telemetry is founder-supplied; agents never measure (2026-07-24)

**Decision**: No session runs `muster/scripts/muster-meter.py`. Telemetry snapshots are founder-supplied
and committed at milestones. Steps needing a metric read a committed snapshot. THIS SITE metrics stay
dashed in all page copy until launch.

**Rationale**: Attribution integrity. The seed notes that ad-hoc interactive tinkering muddies
attribution and inflates the number this site publishes about itself — and that number is a published
claim governed by the no-invented-numbers rule. Agent-generated measurements taken mid-build would
measure a partly hand-driven process while presenting as a clean one.

**Also settled here**: `.gitignore` is correct as written. `.muster-sprint-logs/*.jsonl` excludes only
the bulky transcripts; `.metrics` files and run logs in that directory already commit, which satisfies
the seed's requirement that per-run metrics land interleaved with each sprint's commits. An earlier PM
reading of this as a contradiction was wrong, and the resulting `.gitignore` task was dropped.

**Impact**: Developer, QA, PM.

**Touched**: `foundational-assumptions.md` (A-002), `orchestration-queue.md`, `current-sprint.md`,
`agent-context/{developer,qa}.md`, `CLAUDE.md`, `pre-launch-checklist.md`.

---

### DEC-006 — Founder-authored source files are read-only to every agent (2026-07-24)

**Decision**: `product-spec-seed.md`, `bodh-sprint4-corpus.md`, and
`design-specs/direction-reference.html` are read-only. Agents quote, verify, inventory, and build from
them; never edit, reformat, extend, regenerate, or clean up. QA treats any modification as a blocking
finding. The founder announces when a new source file lands; agents do not poll for it.

**Rationale**: These files are the page's provenance. The §2 replay's central claim is that its terminal
lines are real, so an agent silently "improving" the corpus would convert a true story into a false one
while leaving no trace in the deliverable. Making the files read-only and adding an integrity check to
QA closes that path mechanically rather than by instruction alone.

**Consequence for the Developer ingest step**: reshaped from *extract and reconstruct a corpus* to
*verify the supplied corpus and derive a beat inventory*. The wiring of corpus into rendered output
moved to the §2 build step, where the data shape is known from the replay spec.

**Impact**: Developer, Content, QA, UI/UX, PM.

**Touched**: `foundational-assumptions.md` (A-001), `orchestration-queue.md`, `current-sprint.md`,
`agent-context/{developer,content,qa,ui-ux}.md`, `agent-skills/content/copy-rules.md`, `CLAUDE.md`.

---

### DEC-007 — Three measurement scopes, enumerated and never conflated (2026-07-24)

**Decision**: Three scopes are the single source of truth for every published number. BODH (idea →
live): 9.3 h active build, $147, 4.8 h operator attention, 4 commit-days. BODH SPRINT-4 WEBSITE WAVE
(one evening's chain): ~64 min across 8 sessions, 289 API calls, $24.73. THIS SITE (spec → live):
dashes until launch. No claim mixes two.

**Rationale**: The corpus introduced a third scope the seed's Measured data table did not carry, which
makes scope confusion the page's most likely factual failure. Seed rule 5 already forbids implying a
shared span; enumerating the scopes in one place turns that from a judgment call into a lookup.

**Two sub-rulings settled here.** First, the corpus labels the wave's ~64 minutes "wall-clock," which
appears to collide with rule 2's ban on wall-clock framing. It does not: the eight session durations sum
to 64 min and the span 20:38:57 → 21:43:09 is 64 m 12 s, because an autonomous chain runs back-to-back
with no idle gaps. For this chain active build and elapsed are the same measurement, and the corpus
itself sanctions "64 minutes of agent work." Permitted phrasings and banned ones are enumerated in
`copy-rules.md` → R2. Second, the wave's deploy landed 2026-07-18, three days after its chain, because
the gate waited on Apple — no copy may imply the deploy closed the chain.

**Impact**: Content, PM, QA, Marketing (when staffed).

**Touched**: `product-spec.md` §8, `foundational-assumptions.md` (A-005),
`agent-skills/content/copy-rules.md`, `agent-context/{content,qa}.md`, `CLAUDE.md`.

---

### DEC-008 — The direction reference is a feel input and never ships (2026-07-24)

**Decision**: `design-specs/direction-reference.html` informs mood, density, and rhythm only. Its
markup, class names, and measurements are not a build target. UI/UX must state which choices came from
it as feel cues versus from the seed's locked values. Developer builds from `page-shell.md`, never from
the reference.

**Rationale**: A concrete mockup adjacent to a locked spec will be treated as the spec unless explicitly
fenced off. Three divergences in the current reference make that risk live: it uses `#abae90`, which is
not one of the twelve locked palette values (the dark muted token is `#8C9075`); its `curl` points at
`https://muster.build/setup.sh`, a host that does not exist and would violate seed rule 12 on real URLs;
and its `amber` class name aliases the rust accent, which would carry the wrong colour vocabulary into
any spec derived from it.

**Impact**: UI/UX, Developer, Content (R12), PM.

**Touched**: `foundational-assumptions.md` (A-003), `agent-context/{ui-ux,developer}.md`,
`agent-skills/content/copy-rules.md` (R12), `brand-guidelines.md`, `CLAUDE.md`.

---

### DEC-009 — Waves 0–1 interactive, autonomous run launches at Wave 2 (2026-07-24)

**Decision**: Waves 0–1 run in warm interactive tabs, with the founder executing the UI/UX
design-foundation step personally. The autonomous driver launches only after the Wave 1 founder gate,
starting at Wave 2. Wave 2 carries no founder gate; Wave 3 does.

**Rationale**: The design foundation is the highest-judgment artifact in the sprint and the one most
likely to need iteration, which a headless run handles poorly. Wave 2's output is machine-verifiable
against an approved spec — contrast ratios, cross-engine parity, zero network requests, reduced-motion
completeness — so a human gate there would spend founder attention where the machine substitutes.
Wave 3's output is taste, so it gates. This follows `sprint-planning.md`'s conditional-gate rule and its
preference for running high-context PM synthesis in-session.

**Impact**: all staffed agents, PM.

**Touched**: `orchestration-queue.md` (Execution Mode), `current-sprint.md`.

---

### DEC-010 — Domain undecided; `muster.build` is fictional (2026-07-24)

**Decision**: The production domain is undecided. `muster.build` is a fictional host until the founder
says otherwise. §6 ships the GitHub raw URL:
`curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product`
and the command is swapped at launch if a domain lands.

**Rationale**: Founder ruling. The direction reference's `https://muster.build/setup.sh` raised the
question of whether it signalled an intended domain; it does not. Seed rule 12 permits only real,
copy-paste-verified URLs, so an unacquired host cannot ship regardless of intent — the ruling makes the
ban unconditional rather than provisional, which removes the temptation to pre-write copy against a
domain that may never exist.

**Impact**: Content (R12), UI/UX, Developer, PM.

**Touched**: `orchestration-queue.md` (Founder Decisions), `agent-skills/content/copy-rules.md` (R12),
`foundational-assumptions.md` (A-003), `pre-launch-checklist.md`.

---

### DEC-011 — Measurement is host-side only; two metrics known, two unmeasured by design (2026-07-24)

**Decision**: Success metrics are measured host-side via Cloudflare Pages' server-side request
analytics. **Measurable**: visits, `VERIFY.md` fetches. **Unmeasured by design**: scroll depth / reaches
§2, and `curl` copied.

**Rationale**: Founder ruling, partially overruling PM's earlier position that the page could measure
nothing. Host-side request analytics require zero client instrumentation, so the zero-external-requests
claim (A-004) is untouched — the distinction that matters is what the page requests at runtime, not what
the host observes about requests to it. PM's original framing conflated the two and needlessly discarded
the two metrics that were available for free.

**Accepted consequence**: the hero's five-second-skim verdict and the page's only conversion event remain
unobservable. Both would need client-side instrumentation, and the constraint outranks the curiosity.
`VERIFY.md` fetches serve as the closest available proxy for skepticism converting into a check.

**Impact**: PM, QA (the zero-requests assertion is unchanged and still blocking), Marketing (when staffed).

**Touched**: `product-spec.md` §7, `foundational-assumptions.md` (A-004),
`orchestration-queue.md` (Founder Decisions).

---

### DEC-012 — R2's wall-clock resolution accepted (2026-07-24)

**Decision**: The reasoning reconciling the corpus's "~64 minutes wall-clock" with seed rule 2's ban on
wall-clock framing is accepted as reasoned. `copy-rules.md` → R2 stands as written, including its
enumerated permitted and banned phrasings.

**Rationale**: Founder ruling. The reconciliation rests on the eight session durations summing to 64 min
and the span 20:38:57 → 21:43:09 measuring 64 m 12 s — they agree because an autonomous chain runs
back-to-back with no idle gaps, making active-build and elapsed the same measurement for this chain only.
Recorded as a decision so the reasoning is not re-derived, and so the "for this chain only" scoping is
not silently generalised to future measurements.

**Impact**: Content, PM, QA.

**Touched**: `agent-skills/content/copy-rules.md` (R2), `decision-log.md`.

---

### DEC-013 — Corpus v1.1 supersedes derived figures; session and roster counts settled (2026-07-25)

**Decision**: Corpus v1.1 (founder commit `025842c`) is the current source of truth. Three things it
settles are now binding:

1. **Chain end is measured, not derived**: `21:43:15`, span **64 m 18 s (3858 s)**. This supersedes
   HO-001's derived `21:43:09` / 3852 s. Exactly one beat changes — B6, 480 s → 486 s. Publish
   "~64 minutes" only; second-precision figures are pacing input and never reach the page.
2. **Sessions versus steps**: 8 traced sessions = 7 agent work-steps + the PM review/retro session
   (session 8, which wrote DEC-023 and does not count itself). Copy says "8 sessions" or "7 agent steps
   plus PM review", never a bare "7" against "8".
3. **Roster versus wave**: L1's "8 roles standing by" is roster size; **seven roles ran this wave** —
   research did not. "Eight agents, one operator" describes Muster, not this chain.

**Rationale**: The Developer's HO-001 re-verification surfaced both the missing second-precision end time
and the 8-versus-7 discrepancy, and correctly declined to resolve either by inference — parking the
question rather than guessing. The founder answered at the source rather than in a decision, which is the
right layer: the corpus is what every downstream step reads, so a fix there cannot be missed by a step
that skips the decision log.

**Also resolved**: v1.1 adds per-session Calls and $ columns that tile 289 and $24.73 exactly (verified
independently: `37+50+40+21+26+27+45+43 = 289`; the $ column sums to `24.73`). HO-001 recorded these
totals as "not independently derivable" — that is now false, and `copy-rules.md` → R2 marks them
corroborated rather than merely asserted.

**Mechanism**: the UI/UX step carries the corrected figures inline so the running step is not blocked; a
Developer amendment step (HO-009) trues up the inventory file itself. PM does not edit the inventory —
it is a Developer deliverable.

**Impact**: Developer, UI/UX, Content, QA, PM.

**Touched**: `orchestration-queue.md` (Founder Decisions, UI/UX step, new amendment step),
`agent-skills/content/copy-rules.md` (scope table, R1, R2), `triage-log.md`, `agent-requests.md`
(HO-001 review note).

---

### DEC-014 — Model plan misalignment corrected in the sprint board (2026-07-25)

**Decision**: `current-sprint.md` → Model plan now names `claude-opus-5`, matching DEC-004 and every
`Model:` line in the queue.

**Rationale**: PM error. When the founder switched the default from `claude-opus-4-8` to `claude-opus-5`,
the change was applied to the queue with a targeted `sed` and the verification grep that followed checked
only the queue file — so the sprint board's prose kept the superseded ID for a day. Caught by the
Developer as OBS-001, not by PM's own cascade check.

**Process consequence worth keeping**: the Cascade Lag Prevention Protocol's keyword scan says to grep the
**full repository** for the old term, not the file being edited. A `sed` on one file plus a grep on that
same file proves nothing about cascade. Future value swaps get the repo-wide grep before the decision is
called complete.

**Impact**: PM.

**Touched**: `current-sprint.md`, `triage-log.md`.

---

### DEC-015 — Wave 1 gate approved; three design questions settled (2026-07-25)

**Decision**: The design foundation and §2 replay spec are approved with amendments; the autonomous run
launches at Wave 2. Three open questions settled:

1. **The §2 replay is content playback, not a fourth live motion element.** The seed's "exactly three
   live elements" governs ambient page motion; the replay is mandated by §2 itself, scroll-triggered,
   runs once, and holds a complete end state. The motion budget stays closed at three plus the cursor.
2. **The theme control is dropped.** The page respects `prefers-color-scheme` and adds no controls the
   reader didn't ask for. `page-shell.md` §9 loses its theme row.
3. **The §2 chain-totals strip stays static.** It reads as log evidence rather than showpiece, and it is
   visible mid-playback where a count-up would compete with the replay for the same attention. Count-up
   (motion element 3) stays scoped to the §1 and §5 readouts.

**Rationale on the theme control**, the one place PM disagreed with UI/UX: the disagreement was scope,
not execution. The seed never asks for a theme control, and "both themes first-class" is already
satisfied by `prefers-color-scheme`. On a page whose argument is restraint — one CTA, no badges, no
community furniture — a control that adds a decision the reader did not ask to make cuts against the
thesis, and a non-persistent one silently resets every visit. Founder concurred.

**Impact**: UI/UX, Developer, QA.

**Touched**: `wave-review.md`, `orchestration-queue.md`, `agent-context/ui-ux.md`, `current-sprint.md`.

---

### DEC-016 — §2 amendments: narration-first on mobile, 48 s chain, QA beat restored (2026-07-25)

**Decision**: Three founder amendments to `section-02-replay.md`, resolving finding F1 and rebalancing
the pacing.

**1. Mobile is narration-first (resolves F1).** The small-viewport reader is exactly the non-technical
reader the narration exists for, so on mobile the terminal is texture and the narration is the payload.
Mechanically: §7 moves to per-viewport visible-line counts rather than a fixed all-twelve-lines terminal;
long terminal lines scroll inside the terminal's own container while the page body never scrolls
horizontally; the narration card stays in view for the full playback.

*Why this direction over the alternatives*: it resolves the constraint collision without touching
fidelity — horizontal scroll inside the container preserves every character byte-clean, where soft-wrap
plus a fixed height could not fit. It also inverts the right priority. PM's measurement showed the
section core reaching ~646px of a 667px viewport at the spec'd 12px minimum, which pushed narration
off-screen — the layer that carries the reader the founder's acceptance criterion is written for.

*Consequence to carry*: §5.1's "twelve lines fit without scrollback, every revealed line persists" no
longer holds on mobile and must be amended there too, not only in §7 and §10. Line persistence becomes a
desktop guarantee with a windowed equivalent on small viewports.

**2. The replay rescales to 48 s**, uniform ×0.8. Structure, beat ratios, hazard handling and the sync
contract all survive rescaling; §5.1 offsets and §6 word budgets scale by the same factor.

**3. B5 rebalance — the wow beat is funded from the gate hold, not from QA.** B3 stays at 20%. B5 (QA
full validation) is restored from 10.6% to ~14.5%. B6 absorbs the difference at ~17.2%.

*Rationale*: QA is where "zero bugs" is earned rather than asserted. The beat has to carry "re-derived
the date math with its own formula, 24 dates × 3 timezones" plus "11/11 PASS" — two distinct claims, and
the first is what makes the second credible to a skeptical reader. Compressing the proof harder than
anything else on the page inverted the section's own argument.

*Worked target at 48 s* (UI/UX owns the final schedule; these must tile to exactly 48.00):

| Beat | Old share | New share | Old dwell @60 s | New dwell @48 s |
|---|---|---|---|---|
| B1 | 13.3% | 13.3% | 8.00 s | ~6.38 s |
| B2 | 15.0% | 15.0% | 9.00 s | ~7.20 s |
| B3 | 20.0% | 20.0% | 12.00 s | ~9.60 s |
| B4 | 20.0% | 20.0% | 12.00 s | ~9.60 s |
| B5 | 10.6% | **14.5%** | 6.35 s | **~6.96 s** |
| B6 | 21.1% | **17.2%** | 12.65 s | **~8.26 s** |

**The rebalance works as intended**: B5 gains absolute time (+0.61 s) despite the chain shortening 20%.

**Consequence stated, accepted**: B6 loses 4.39 s. If L10's dwell simply scales ×0.8 to 4.12 s, the gate
hold falls from 7.5 s to ~4.14 s — a 45% cut to the beat previously described as the product's thesis
rendered as pacing. This follows directly from the founder's instruction to fund B3 from the hold, and is
recorded so it is a known trade rather than a discovered one. **UI/UX has latitude inside B6**: the
internal split is not mandated, so compressing L10's dwell harder than ×0.8 preserves more of the hold.
If the hold stops reading as deliberate stillness at its new length, say so rather than shipping a pause
that reads as a stall.

**Impact**: UI/UX, Content (word budgets scale ×0.8), Developer, QA.

**Touched**: `wave-review.md`, `orchestration-queue.md`, `agent-context/{ui-ux,content}.md`,
`current-sprint.md`, `agent-requests.md` (HO-002).

---

### DEC-017 — Rust usage bound by measured contrast; §2 paced as a comprehension-weighted chain (2026-07-25)

**Decision**: Four design calls settled inside the locked direction while producing the design
foundation:

1. **Rust usage rules from measured ratios.** The accent measures 3.86–4.35:1 against grounds and the
   dark surface — below the 4.5:1 small-text floor. Rust is therefore bound to large metric numerals
   (≥24px, or ≥19px bold), graphical marks, borders, and focus rings; body links render ink with a rust
   underline; terminal key-beat emphasis is bold ink + a rust mark, not rust words. No thirteenth colour
   introduced (A-006 holds).
2. **One rhythm token, one-sided.** All vertical spacing is a multiple of `--rhythm` applied as
   `margin-block-start` only, so gaps can never stack or double. Section padding 96–168px.
3. **Replay pacing model.** The §2 chain plays as a comprehension-weighted rather than real-proportional
   compression, every per-beat deviation stated against the real share: the PM-re-verify beat expanded to
   20% of screen time (11.4% real), a gate hold of deliberate stillness, the deploy line outside the
   clock. Narration is an eight-slot sync contract with word budgets at 3.5 words/s. *The chain length
   decided here (60 s) is superseded by DEC-016's uniform ×0.8 rescale to 48 s; the pacing model itself
   survives the rescale unchanged.*
4. **Playback is opacity-only reveal over a complete DOM.** All lines and narration exist in the DOM
   from load, so reduced-motion, no-JS, and screen-reader paths render the complete transcript by
   construction — no parallel fallback content to drift.

**Rationale**: 1 is forced by arithmetic once the palette is locked — the alternative (small rust text)
fails the page's own accessibility claim. 2 pre-empts a known spacing-stacking failure mode. 3 exists
because real-proportional pacing starves the most important beat (shortest in the chain) and stalls on
the two longest; the always-visible "condensed from the real build log" label plus real clock stamps on
every line are what keep non-linear compression honest. 4 makes the completeness requirement structural
instead of tested-for.

**Impact**: Developer, QA, Content, PM.

**Touched**: `design-specs/web/page-shell.md`, `design-specs/web/section-02-replay.md`,
`agent-requests.md` (HO-002), `orchestration-queue.md` (Done, Next Step, Founder Decisions).

---

### DEC-018 — §2's mobile height budget and the final 48 s schedule (2026-07-25)

**Decision**: Four calls made inside the latitude DEC-016 granted, all now binding on the build.

1. **The B6 internal split: L10 dwells 3.45 s, the gate hold is 4.80 s.** DEC-016 projected ~4.14 s if
   L10 simply scaled ×0.8; compressing L10 harder buys the hold 0.66 s more (+16%), making the cut from
   7.5 s a 36% one rather than 45%. SP6 pays 18 → 12 words for it.
2. **The gate hold is argued on deceleration, not duration.** It is not and never was the longest
   interval in the replay — ranked by length it was 4th of 11 at 60 s and is 5th of 11 at 48 s. What
   marks it as a stop is that B6 opens on the chain's fastest interval (the 0.35 s L9/L10 same-instant
   pair) and closes on the 4.80 s hold — a 13.7× spread inside one beat — and that the hold is the only
   stretch of the chain with no event in it.
3. **The mobile height budget is 424.4px of fixed core against a 375 × 553 visual viewport** — an
   iPhone SE in mobile Safari with toolbars shown, deliberately not the 667px device height. Visible
   terminal lines = `floor((visual VH − 424.4) / 24.7)`, clamped [3, 12]; the two-layer guarantee holds
   down to 499px of visual viewport height, below which the totals strip drops below the fold first and
   the narration card is last to go. Simultaneity is enforced, not hoped for: mobile playback starts at
   ≥95% core visibility and pauses below 90%.
4. **The terminal's horizontal scroll is a scoped WCAG 1.4.10 exception with a 2.1.1 obligation
   attached.** An aligned-column log is content requiring two-dimensional layout, so wrapping it would
   destroy the alignment that makes it readable; the exception is contained to one region, which carries
   `tabindex="0"` and its own accessible name so arrow keys reach the ends of long lines. Related:
   `--text-terminal` stays 13px on every viewport, since horizontal scroll — not smaller type — is what
   handles long lines.

**Rationale**: 2 is a correction that matters more than the rescale it came from — the pacing claim the
spec was defending was not true before the rescale either, so restating a smaller version of it would
have preserved a wrong argument for a right beat. 3 exists because the finding it resolves was caused by
asserting a fit instead of budgeting one; a budget stated against device height rather than visual
viewport would have repeated the same error one layer down. 4 is the cost of the fidelity-preserving
solution, and it is cheap only if the keyboard obligation ships with it.

**Consequence to carry**: SP7 — the honest headline, the page's thesis — drops from ≤26 to ≤16 words. It
fits with zero slack (a worked 16-word line reads in 4.57 s of the 4.80 s window), but there is no room
for a run-up. If it needs relief after the replay is seen running, the cheapest source is SP6's 12 words
inside the same beat, which requires no reschedule.

**Impact**: Developer, QA, Content, PM.

**Touched**: `design-specs/web/page-shell.md`, `design-specs/web/section-02-replay.md`,
`agent-requests.md` (HO-010), `orchestration-queue.md`.

### DEC-019 — Wave 2 specs accepted; two pacing-rationale claims corrected (2026-07-25)

**Decision**: The amended `page-shell.md` and `section-02-replay.md` are accepted and are the build
inputs for Waves 2 and 3. The B6 internal split stands as UI/UX set it — the gate hold at 4.80 s, L10 at
3.45 s — and no founder ruling is sought on it.

**The push-back is upheld on the merits, and DEC-016's own framing understates the case for it.** Against
the alternative DEC-016 projected (L10 scaled ×0.8, hold ~4.14 s), the chosen split gives SP7 — the
honest headline, the page's thesis — a **16-word budget rather than 14**, while also buying the hold
0.66 s. It is better for the thesis line on both counts. SP7's real loss is against the 60 s chain's ≤26
words, which the 48 s decision had already spent.

**Two claims in the pacing rationale were wrong and are corrected here, not carried.** Both were written
for this amendment, and both are the same class of error as the "longest silence" claim the amendment
correctly removed:

1. **The hold does not "arrive 0.35 s after the fastest interval."** The L9/L10 pair closes at t=39.75
   and the hold opens at t=43.20 — 3.45 s later, with L11's interval between them. The 13.7× figure is
   real but it is a *beat-level* spread, not an adjacency: B6 opens on the 0.35 s pair and closes on the
   4.80 s hold. Restated that way in `section-02-replay.md` §5.1 and in DEC-018 item 2. The design does
   not move by a millisecond; only the argument for it is now true.
2. **The 6.60 s L8→L9 ellipsis is the third-longest interval, not the second.** L4→L5 (9.60 s) and
   L3→L4 (7.20 s) are longer. Corrected in §5.1 with both named.

**Why PM applied these rather than requesting a revision**: neither correction contains a design call —
no dwell, budget, or layout value changes — and a revision cycle costs a full session for two sentences
(`deliverable-review.md`: accept-with-notes is underused). The edits are disclosed in the HO-010 verdict
so the record does not read as PM reviewing its own text.

**Also verified and standing**: dwells tile to 48.000 s; the six design shares sum to 100.00%; all seven
word budgets equal `floor(window × 3.5)` and total 163 of 168; B5 lands at 14.48% funded entirely by B6
(21.08% → 17.19%) with B3 held at 20.00% and B5 itself paying nothing; every row of the 424.4px mobile
core recomputes from a `page-shell.md` token; the corpus is unmodified at the founder's commit `025842c`.

**Consequence to carry** (unchanged from DEC-018, restated because it is the live one): SP7 at ≤16 words
has zero slack. If it needs relief once the replay is seen running, the source is SP6's 12 words inside
the same beat. Content writes to ≤16 and flags rather than overruns.

**Impact**: Developer, QA, Content, UI/UX, PM.

**Touched**: `design-specs/web/section-02-replay.md`, `decision-log.md` (DEC-018 item 2),
`agent-requests.md` (HO-010, HO-009, HO-002), `current-sprint.md`, `agent-context/{ui-ux,developer,content}.md`,
`orchestration-queue.md`.

### DEC-020 — Visual milestones are gated by a dependency-free two-engine harness (2026-07-25)

**Decision**: Cross-engine verification runs as committed code, not as a per-session procedure.
`tests/verify-shell.mjs` drives headless Chrome over the DevTools Protocol for Blink;
`tests/verify-webkit.mjs` drives QuickLook for WebKit. Both are re-runnable by any role, exit non-zero on
failure, and write their evidence to `tests/artifacts/`.

**Why it is code and not a checklist**: the page's central claims — zero external requests, measured
contrast in both themes, complete reduced-motion content, cross-engine parity — are exactly the claims a
human eye passes by default. A checklist item that reads "verified in Safari" is indistinguishable from
one that was skipped. A harness that fails the build is not.

**No dependencies, by design**: no `package.json`, no installed packages. Node's global `WebSocket`
speaks CDP directly and Node's `zlib` decodes the screenshots; Chrome and QuickLook are already on the
machine. A dependency manifest in this repo would be the first crack in "no build system," which is a
published property of the page, not a preference.

**The grain check is pixel-level on purpose.** Inline-SVG/WebKit divergence is this project's known
failure class, and a filter that silently fails to rasterise in one engine passes every computed-style
assertion ever written. Both harnesses locate a patch of bare page ground *by luminance* — so the two
engines need not lay out identically — and compare its pixel spread. A flat fill scores zero.

**Consequence to carry**: a new section extends the existing harness rather than adding its own runner.
A check that only runs when someone remembers to run it is not a check.

**Impact**: Developer, QA, PM.

**Touched**: `tests/`, `knowledge-base/architecture.md` §11, `agent-requests.md` (HO-003).

### DEC-021 — Reading measure, phone insets, and what WebKit is allowed to claim (2026-07-25)

**Decision**: The shell is accepted. Four calls settle the two findings and the two constraints QA
surfaced with it; one of the four goes to the founder because it turns on what a founder-authored word
means, and the wave releases regardless — nothing here blocks §2.

**1. `.instrument`'s phone inset steps down, and the constraint that blocked it was false.** Below
`--bp-wide` the instrument inset must not exceed `--gap-flow` (24px); desktop keeps `--gap-block` (48px).
No new named breakpoint — a fluid `clamp()` between the two rhythm multiples is the preferred expression,
since it also removes the cliff a hard query would put at 960px.

*The blocker both the Developer and QA cited does not exist.* Both left the padding alone on the reasoning
that `section-02-replay.md` §7.1 budgets §2's mobile core to the tenth of a pixel off shell tokens, so a
responsive change here would invalidate a signed-off budget. §7.1 does not inherit this value: its rows
read *Terminal body padding 12 + 12 = 24.0* and *Narration card … + 24 pad*. If `.instrument`'s 48px
applied, the core would be 424.4 + 72 + 72 = 568.4px against a 553px viewport — the budget PM re-derived
clean in DEC-019 would already be busted. §2 sets its own inset by construction, so the change is free
with respect to it. The reasoning was carried through two handoffs and into a queue step before anyone
checked it against the table it cited.

*Why this is PM's call and not UI/UX's*: `page-shell.md` §8 specifies the instrument cell as surface +
hairline border + sharp corners and states no padding. The 48px is a build-level choice, not a locked
design value, so A-007 is not engaged.

**2. The 45-character floor in the QA audit is arithmetically unsatisfiable and is replaced, not
loosened.** The check `prose column does not collapse below 45 characters at the narrowest supported
width` cannot pass at 320px under any padding: at 17px `--font-sans` the average prose character advance
is 7.615px (measured 685.31px ÷ 90 characters), so 45 characters need 342.7px — more than the 320px
viewport itself, before gutters, borders, or a card. With a zero-inset card the ceiling at 320px is ~36
characters and at 375px is ~43. The floor is unreachable on every phone.

This is deliberately **not** the tolerance-loosening pattern `decision-making.md` warns about, and the
distinction is load-bearing: the build is being fixed *as well*, so red does not go green by moving a
goalpost. What replaces the floor is a check that can actually fail — at ≤375px the instrument's total
horizontal inset must be ≤20% of the card width (48/272 = 17.6% passes, today's 96/272 = 35.3% fails) —
plus the measured character count **reported, not asserted**, the same treatment the narration card's
line count already gets. Geometry is deterministic; a character count folds in font metrics and
line-break raggedness, which is why QA's own 320px figure (18) sits well under that width's ~23-character
capacity.

**3. The reading column goes to the founder — the diagnosis is settled, the resolution is not.**
`--read-max: 64ch` resolves to 685.31px and renders ~90 prose characters, because `ch` is the advance of
`0` (10.281px) and prose averages 7.615px. The build matches the spec and the spec matches the seed; the
gap is between `64ch` and what `64ch` renders.

PM is confident on the diagnosis and deliberately not on the fix, because "reading column ~64ch" (seed
line 228) has two honest readings that produce materially different pages: the CSS unit, under which the
build is already correct, or the typographic measure, under which it is wrong by ~40%. Everything around
it in the seed — *one idea per screen*, *spacious* as the overriding constraint — argues for the measure,
which is why PM recommends honouring it. But it is a founder-authored value about the page's central
reading experience, and that is where founder attention is worth spending. Parked non-halting in
`## Founder Decisions` with a hard `pre-launch-checklist.md` backstop so it cannot ship unresolved.

*It blocks nothing now.* No body copy renders in that column yet — the shell's paragraphs are
`data-shell-placeholder` scaffolding. §2's narration is not affected either: `section-02-replay.md` §7
sets the narration rail at ~36ch on desktop and the card is viewport-width on mobile, so §2's prose never
enters `--read-max`. The first real consumer is §3, which is Sprint 2. The queue step's premise that this
wanted settling before §2 was wrong on that point.

**4. §2's cross-engine criterion is narrowed to what the tooling can prove, and the residual is named.**
`qlmanage` is the only WebKit here; QA proved with committed probes that it executes no JavaScript and
ignores the requested size, rendering at a fixed ~1024². So:

- **WebKit must prove the no-JS/reduced-motion complete transcript** — all twelve corpus lines verbatim,
  L12's large-rust treatment, the §9 emphasis system, terminal chrome, grain and vignette parity, both
  themes. This is load-bearing rather than a consolation: DEC-017 item 4 makes playback an opacity reveal
  over a complete DOM, so what `qlmanage` renders *is* the page's no-JS fallback, on the engine whose
  inline-SVG divergence is this project's known failure class.
- **Blink proves everything else** — playback timing, the visibility gate, the windowed terminal,
  media-query behaviour, horizontal-scroll containment, and all evidence at 375px, 320px, and 200% zoom.
- **Mobile evidence is Blink-only and HO-007 says so in those words**, never "verified cross-engine".
- **The residual is one named item**: mobile-Safari viewport behaviour, chiefly `100dvh` inside
  `max-height: calc(100dvh - 3rem)`, which is both unverifiable on this tooling and the load-bearing
  mechanism of §7.1's entire budget. Carried as a hard pre-launch device check and flagged to the founder
  as a look worth taking at the Wave 3 gate, where a real iPhone is the only instrument that settles it.

Not resolved by installing a browser: DEC-020's zero-dependency property is a published claim about this
repo, and it outranks the convenience.

**Rationale for releasing rather than halting**: none of the four gates §2. Three are PM's under the
matrix (a build-level value, test-infrastructure quality, an acceptance criterion that asserted evidence
the tooling cannot produce) and the fourth is non-halting by construction. Halting a cleared autonomous
run on a latent defect in a column no copy occupies yet would spend the founder's gate on something a
checklist item holds just as firmly.

**Impact**: Developer, QA, UI/UX, Content, PM.

**Touched**: `design-specs/web/page-shell.md` §11, `agent-requests.md` (HO-003, HO-004),
`orchestration-queue.md` (Next Step, Upcoming §2 developer + QA steps, Founder Decisions, Done),
`current-sprint.md`, `agent-context/{developer,qa}.md`, `pre-launch-checklist.md`, `triage-log.md`,
`founder-notices.md`.

### DEC-022 — §2 narration accepted; the totals strip gets one string and one scale (2026-07-25)

**Decision**: `section-02-narration.md` is accepted with no revision and is the verbatim build input
for §2's narration layer. Three calls settle everything the review raised; none of them changes a word
of the narration.

**1. SP4's three micro-captions render on all viewports.** The sync contract made the split optional
above `--bp-wide` and required below it. Rendering it everywhere costs one rail entry's worth of
layout and buys a single copy set, a single sync behaviour, and one artifact for QA to diff instead of
two. A desktop-only 33-word variant would have been a second string to keep true forever.

**2. The chain totals strip has one authoritative string, and it is Content's.** Line 1 is
`~64 MIN AGENT WORK · 289 API CALLS · $24.73`; line 2 is the mandatory scope label
`BODH SPRINT 4 · WEBSITE WAVE ONLY`. The replay spec's two wireframes carried `~64 MIN ACTIVE` and
were the Developer's other source; they now match. "AGENT WORK" is the corpus's own sanctioned
phrasing where "ACTIVE" is merely R2-compliant, and annotation 7 already assigned this copy to
Content — so this was a cascade of an accepted deliverable, not a copy call PM made.

**3. The strip's value scale was specified two ways in one file, and §7.1 wins on mobile.**
Annotation 7 renders values at `--text-readout`; §7.1's height budget prices the whole strip at
`2 × (--text-micro 11px × 1.5) = 33.0px`. At 375px `--text-readout` clamps to 24px, so one value line
alone is 24px and the strip becomes 40.5px — **7.5px over a budget that has 5.1px of slack**, which
busts the 553px core before a single log line is placed. Below `--bp-wide` the strip is therefore two
`--text-micro` lines; `--text-readout` stands at `≥ --bp-wide`, where the column has room and nothing
is budgeted against it.

*Why §7.1 and not annotation 7*: the budget is the artifact the mobile two-layer guarantee rests on,
every row of it was re-derived from a shell token at DEC-019, and QA holds a hard assertion against
it. A token reference inside an annotation table is the looser of the two statements. Ruled rather
than escalated because it is a scale choice inside a signed-off budget, not a design value — the same
class as DEC-021.1.

**A related risk is routed, not ruled.** The accepted string is 43 characters. In `--font-mono` at
11px that is ~284px bare and ~350px with `--track-micro` (0.14em), against ~327px of content width at
375px. So **tracking, not the four added characters, is what would wrap line 1 to a third line** and
cost 16.5px the budget does not have. The Developer sets tracking on the value line within the micro
treatment; QA measures and reports the rendered line count either way. Copy does not move for this —
reaching for the shorter string would have been fixing a typographic setting by editing a fact.

**Two claims were chased before accepting, and both held.** SP6's "the same instant" looked like
precision added over two minute-stamped lines; it is measured at source — session 7 starts 21:20:42
and its measured duration of 867 s lands on 21:35:09, session 8's stated start — and it descends from
beat-inventory D7 through the replay spec's own SP6 brief. And the seed's honest headline beat, which
the seed states as one sentence, is delivered whole rather than dropped: SP3 carries the PM re-check,
SP6 the 11/11 PASS, SP7 "no human touched this until the deploy button," landing at the gate.

**Impact**: Developer, QA, Content, UI/UX.

**Touched**: `design-specs/web/section-02-replay.md` (annotation 7, both wireframes),
`agent-requests.md` (HO-005), `orchestration-queue.md`, `current-sprint.md`, `wave-review.md`,
`agent-context/{content,developer,qa}.md`, `founder-notices.md`.

---

### DEC-023 — The reading column is `64ch` as written; the band check is retired (2026-07-26)

**Decision**: Founder ruling at the Wave 3 gate. `--read-max: 64ch` ships unchanged. The seed's
"reading column ~64ch" means the CSS value, not a rendered character count. The independent audit's
45–75-character band check is retired as an assertion and re-scoped to a reported measurement.

**Rationale**: The founder compared the shipped width against 70-character and 65-character
alternatives rendered in the page's own tokens and chose the shipped one. That settles the only
question that was open — the build, the spec and the seed already agreed with each other; the ambiguity
was solely whether `ch` meant the unit or the measure. PM recommended the opposite (honour the measure,
express it in `rem`) and is overruled on the founder's eye, which is the right instrument for a
typographic call the seed left to taste.

**The consequential half is the check, not the token.** A test asserting a standard the product has
deliberately declined does not become harmless by being known — it keeps `qa-independent-audit.mjs`
exiting non-zero indefinitely, and an audit that is always red is an audit nobody reads. Retiring it to
a reported measurement keeps the number visible without the false signal. Same disposition as the
45-character floor in DEC-021: replace a wrong threshold, never loosen it.

**Closes** the last hard item held in `pre-launch-checklist.md` on this question.

**Impact**: QA (retire the check), Developer (no change), UI/UX (no change), PM.

**Touched**: `wave-review.md`, `pre-launch-checklist.md`, `orchestration-queue.md`,
`tests/qa-independent-audit.mjs` (on the QA step).

---

### DEC-024 — SP7 is reframed to the operator's arc, with the inflation risk named (2026-07-26)

**Decision**: SP7 — §2's thesis line — is rewritten from its negative framing ("no human touched this
until the deploy button") to the active human arc: the operator plans the sprint, leaves while the
agents run, and returns to work ready to deploy. SP6's 12 unspent words in the same beat are the
available relief. Content revises; PM reviews line by line before the rebuild.

**Rationale**: The current line states the thesis by negation, asking the reader to infer the story
rather than see it. The founder's arc is what a first-time reader pictures, and it is factually
supported — the corpus records the chain running unattended with a single human gate at deploy — so
this is a framing change, not a new claim. That distinction is what makes it approvable at all.

**The risk is recorded because it was in the ask.** The request was framed as "something a VC would
want to hear that would amaze them." Taken literally that instructs adjectives-as-argument, which
`copy-rules.md` forbids and which this page's thesis cannot survive: a site arguing *every number here
is checkable* cannot carry a sentence reaching for awe. The arc is approved; amazement is not a
technique to apply. The line earns its effect the way SP3 does — from a fact that is specific and true.
A revision landing the arc inside the rules is the deliverable; one landing it by inflating is a
blocking finding at PM review.

**Budget**: SP7's window is the 4.80 s gate hold, `floor(4.80 × 3.5)` = 16 words; the current line
spends 15. SP6's 12 words are the only relief and cost no reschedule.

**Impact**: Content, PM, Developer, QA.

**Touched**: `wave-review.md`, `orchestration-queue.md`, `current-sprint.md`,
`design-specs/web/section-02-narration.md` (on the Content step).

---

### DEC-025 — Mobile terminal: the founder wants no horizontal scroll; fidelity is not the payer (2026-07-26)

**Decision**: The founder's stated goal is that a phone reader never scrolls horizontally to read a
terminal line. UI/UX owns the mechanism. Two constraints bind the solution and are not negotiable:
byte-clean corpus fidelity (no truncation, no ellipsis, no paraphrase) and the 553px core budget.
Whatever ships, the cost is paid in visible line count or type scale — never in fidelity.

**Rationale**: This reopens the resolution the founder approved at the Wave 1 gate, which is
legitimate: F1 was settled on measurement, but the founder is now reading it on a real phone, and that
is the instrument the gate exists to apply.

**The arithmetic, so the trade is chosen rather than discovered.** At 375px the terminal's inner width
is ~301px ≈ 38 characters at `--text-terminal`. The longest corpus line (L3) is 74 characters ≈ 577px,
so it currently needs ~276px of horizontal scroll. Removing that scroll has exactly three payers:
- **Soft-wrap.** Most lines become two rows. The core has ~53px of slack against its 553px budget and
  one line box is 24.7px, so wrapping supports roughly **five rows total — about 2–3 log lines
  visible instead of 5.** That is the honest price.
- **Type scale.** Fitting 74 characters in 301px needs ~4px per character, roughly a 5px font. Not
  viable; it fails legibility long before it fails the budget.
- **Truncation.** Forbidden — it converts §2's central claim from true to false.

**PM position**: soft-wrap with a hanging indent, accepting 2–3 visible lines, is the only variant that
honours the request. It is defensible precisely because the spec already ruled that *on mobile the
terminal is texture and the narration is the payload* — if that ruling is right, trading terminal lines
for readability is consistent with it rather than a retreat from it. A hybrid (wrap the newest line,
scroll the rest) is worth costing but risks a layout shift on every reveal, which the opacity-only
playback model exists to avoid. UI/UX decides and states the measured budget either way.

**Impact**: UI/UX (owns it), Developer, QA, PM.

**Touched**: `wave-review.md`, `orchestration-queue.md`, `current-sprint.md`,
`design-specs/web/section-02-replay.md` (§7, §10 — on the UI/UX step).

---

### DEC-026 — The phone terminal wraps, and the totals strip pays for it (2026-07-26)

**Decision**: §2's log lines soft-wrap at every viewport (`white-space: pre-wrap` plus a 2ch hanging
indent) and nothing scrolls horizontally anywhere. The chain totals strip moves out of the mobile
playback core to immediately below it, which buys the 45.0px the wrap costs. At 375 × 553 the terminal
shows **3 whole lines** instead of 5.

**Rationale**: DEC-025 set the goal and the two constraints and left UI/UX the mechanism. Measured on
the built page rather than derived: the line region at 375px is 325px — 41 characters — and eleven of
the twelve corpus lines are longer than that, so a phone that does not wrap can show no complete log
line at all. Three wrapped lines carry ~170 readable characters against ~205 clipped ones; the section's
claim is that these are the real log lines, and a line the reader cannot finish does not carry it.

**The payer was chosen, not discovered.** The totals strip is static evidence, not one of the two
layers the mobile guarantee is about, and §7.1's own priority order already named it first when the
core runs short. It stays present from load and moves one thumb-flick down. Fidelity, type scale, the
narration card and the section's spacing rhythm are all untouched — soft-wrap inserts no character, so
the byte-clean diff is unaffected, which is exactly why wrapping can be the payer and truncation cannot.

**Three consequences to carry:**

1. **The guarantee floor improves** from 499px to 478.2px of visual viewport height, and the budget
   case gains 20.3px of slack (5.1 → 25.4) against the still-unproven `100dvh` behaviour in mobile
   Safari. Taller phones lose lines: 360 × 640 goes 8 → 5, the 659–667px band 9 → 5.
2. **Landscape inverts its column split** — the terminal takes the wider column (~54/42), sized by the
   41-column requirement rather than by a share. Width is the only thing that decides whether a log
   line reads without a gesture; narration set narrower simply runs taller, and height is what
   landscape has to spare. Narration-first survives as a priority.
3. **§2 claims no WCAG 1.4.10 exception.** The scoped exception for the terminal's horizontal scroll is
   retired rather than narrowed.

**Two figures corrected in passing**: the line region is 325px / 41 columns, not ~301px / 38
characters, and the current horizontal scroll is 268px, not ~276px. DEC-025's direction is unaffected;
anything quoting its arithmetic should quote these instead.

**Impact**: Developer (build), QA (validate — the mobile checklist rows in §12 all move), UI/UX, PM.

**Touched**: `design-specs/web/section-02-replay.md` (§3, §5.1, §7, §7.1, §10, §11, §12, §13),
`agent-requests.md` (HO-011), `orchestration-queue.md`, `founder-notices.md`.
`agent-context/{developer,qa,ui-ux}.md` are PM's to cascade at the HO-011 review step.

### DEC-027 — Both fix-wave deliverables accepted; the rebuild's inputs are closed (2026-07-26)

**Decision**: HO-011 (mobile terminal) and HO-012 (SP7) are accepted with no revision. The two
authoritative files — `section-02-replay.md` and `section-02-narration.md` — are final for the rebuild,
and nothing in either is open. Four items are disposed below; none of them gates the build.

**Rationale**: Both deliverables were re-derived rather than re-read. SP7 recounts to 15 words of 16
(4.29 s of the 4.80 s hold) with SP6's relief genuinely unspent at 10 of 12, and the mobile budget sums
to 379.4px item by item, giving 3 lines at 375 × 553 with 25.4px of slack — every viewport row, both
landscape columns and the 478.2px floor reproduce, and the two build measurements land on the arithmetic
to 0.01px. The claim the whole trade rests on was checked at the corpus itself: eleven of the twelve
lines exceed 41 columns and **all of L1–L11 cost exactly two rows there**, with no exceptions, so the
window is deterministic as specified rather than approximately.

**DEC-024's guardrail is met on the merits.** SP7 carries no adjective-as-argument; "deploy-ready" is
the packet's recorded state, not praise for it, and the line's effect comes from tense landing on a
terminal that reads `awaiting operator`. The deploy boundary holds — deploy-ready, never deployed.

**The trade is accepted as a trade.** Three log lines on a phone is thin, and the reason it is still
right is that the alternative was never five lines: at 41 columns a non-wrapping phone shows five
*first halves*, and §2's claim is that these are the real log lines.

**Four dispositions:**

1. **SP3 overflows the narration card at 320px — DEFERRED to Sprint 2, with the fix already known.**
   Pre-existing and width-driven: the card is budgeted at six lines and SP3 sets six at 375px with zero
   margin, so the seventh line is bought by narrowing below the budgeted width, not by the wrap change.
   Fixing it this wave means re-opening SP3 (Content, not open this wave) or a taller card that costs
   the terminal a line at the budget case — trading a guaranteed viewport for an unbudgeted one. §7.1's
   own priority order pays for it when it lands: dropping the beat indicator returns 28.5px against a
   28.9px line. Held in `pre-launch-checklist.md` so it cannot ship unnoticed.
2. **The totals strip's 320px wrap stays carried and is no longer load-bearing**, now that the strip
   sits outside the playback core. A copy-fit question for Sprint 2, not a guarantee question.
3. **Annotation 7 gains the lever it was missing.** It stated that the 43-character value string must
   set on one line but not what makes it: at `--track-micro` the string sets 351.7px against a 327px
   column and overflows; at `0.02em` it sets 295.0px. DEC-022 ruled tracking as the lever and the build
   implements it, but a rebuild from the spec alone could have reintroduced the wide tracking and
   re-broken a fixed defect. Now stated in the spec.
4. **§7.1's 49.4px line constant is a budget shorthand, not a build instruction.** It is exact at
   ≥375px and a ceiling below, where the two longest lines cost three rows; implementing it literally
   at 320px would place a third line and clip it, which rule 2 forbids. Rule 3's measured quantisation
   is the mechanism, and the rebuild step now says so.

**Impact**: Developer (builds against both files), QA (re-validates), UI/UX, Content, PM.

**Touched**: `agent-requests.md`, `design-specs/web/section-02-replay.md` (§6 SP7 brief, annotation 7),
`orchestration-queue.md`, `current-sprint.md`, `wave-review.md`, `pre-launch-checklist.md`,
`founder-notices.md`, `agent-context/{developer,qa,ui-ux,content}.md`.

---

### DEC-028 — SP7 is final; the phone's log needs entry separation and one accent inset (2026-07-26)

**Decision**: At the §2 re-gate the founder approved SP7 as written and sent the phone back. Two
blocking findings, both visual, both on mobile:

1. **Wrapped log lines must group into visible entries** at 375 × 553. `.log__line` carries no
   `margin-block-start`, so an entry's continuation row and the next entry's first row are equally
   spaced and eight rows read as eight things rather than four.
2. **The rust accent gets one consistent inset** across the terminal and the narration card, or a
   stated reason why they differ. The narration entry is inset 12px by its card's
   `padding: var(--gap-hairline)`; `.log` is `padding-inline: 0`, so the key-beat tick is flush against
   the card border.

**Rationale**: This is the pattern this project keeps catching — a fix that satisfies its stated
criterion while breaking something the criterion did not name. DEC-025 required that no line need a
sideways gesture, and the wrap delivered exactly that. Nothing in it measured whether the wrapped
result was still *readable as a log*, so the regression shipped inside a green harness: every
fidelity, budget and parity check passed, because none of them can see grouping. The founder read it on
the device and PM confirmed both causes in the built CSS rather than by eye.

**Both findings trace to the same scarce resource.** The wrap fix spent the terminal's horizontal
gutter (the wide-viewport rule that insets the tick carries a comment saying the phone "cannot afford"
it), and it spent most of the vertical slack. So F-R1 and F-R2 are the two edges of the same trade, and
whoever fixes them is working inside 25.4px of height and no horizontal room. Fidelity and the
no-horizontal-scroll guarantee are not available to pay — the payer is `--lead-terminal`, visible line
count, or an explicitly stated new budget.

**Requirements are stated as outcomes, not mechanisms**: entry boundaries visible at a glance; one
accent relationship across both cards. UI/UX picks the means and states the measured budget; a reasoned
refusal with an alternative is an acceptable answer for either.

**Settled and not reopened**: SP7 (final at 15 of 16 words), passes 1–3, the 48.00 s schedule,
fidelity, and the no-horizontal-scroll guarantee.

**Impact**: UI/UX, Developer, QA, PM. Content is done with §2.

**Touched**: `wave-review.md`, `orchestration-queue.md`, `current-sprint.md`.

## Archive Reference
<!-- Older decisions archived in decision-log-archive.md -->
