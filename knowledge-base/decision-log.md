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

## Archive Reference
<!-- Older decisions archived in decision-log-archive.md -->
