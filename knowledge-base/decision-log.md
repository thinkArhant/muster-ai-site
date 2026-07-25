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

## Archive Reference
<!-- Older decisions archived in decision-log-archive.md -->
