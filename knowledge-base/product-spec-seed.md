# Muster website — product spec

> Product brief from the founder (product owner) to the Muster team. This is the settled spec — the
> thinking is done; the job is executing it excellently. Seeded into `muster-site` at project start.
> First-person passages below are founder-supplied copy, marked as such.

## What this product is

The public website for **Muster** — the open-source multi-agent product framework for Claude Code
(`github.com/thinkArhant/muster-ai`). One page. It shows what Muster is, how it works, and proves —
with measured data and real build artifacts — that one person plus a governed AI team ships real
products. It ends in a single `curl`.

**Audience:** founders and builders evaluating Muster — including the skeptical, technical cold
reader who gives the page a 5-second skim and decides whether to keep reading. Design for that cold
skim: the page must stand alone, land its proof fast, and reward depth for whoever scrolls.

**The bar:** the site itself is an exhibit of what Muster produces. It is built *with* Muster, by
Muster's AI team, and says so — its own build repo, queue, handoffs, decision log, and build
telemetry are public. A bloated or sloppy page refutes the product; a signal-dense, restrained one
IS the product.

## Non-negotiable rules

1. **Measured, never vague.** Every performance/cost claim is a measured number stated **exactly**
   ($147, 9.3 h, 4.8 h — never rounded to $150/"~10 h"; exact numbers read as measured, round ones
   read as marketing). No adjectives-as-argument ("blazing fast" is banned; the number does the work).
2. **Time is "active build," never "built in N hours."** Active build = inter-event gaps capped at
   5 min from session logs. Elapsed (commit-days) is the checkable fallback. Never imply wall-clock.
3. **Cost framing:** API-list-price cost-to-replicate, never subscription spend. Never print a
   human/agency-cost baseline — state our number, let the reader run the comparison.
4. **No invented numbers, ever.** Unmeasured metrics render as dashes ("measured at launch"), never
   placeholder values.
5. **Scope labels on build metrics:** BODH = *idea → live*; THIS SITE = *spec → live*. Never imply
   the same span.
6. **"Measured — method and data published," never "proven."** Verification is granularity +
   runnable method, and the page's language stays inside what the artifacts support.
7. **First person in exactly two places:** the provenance line (§5) and the decisions section (§4) —
   both founder-supplied. Everything else is product voice.
8. **The team is AI and says so:** "by Muster's AI team — 8 agents, 1 operator." Never imply humans
   did the work; never say "the Muster team" unqualified.
9. **One CTA:** the `curl` + one GitHub link. No newsletter signup, no Discord, no stars badge, no
   testimonials, no pricing, no invitation section, no community furniture.
10. **Version rule:** page copy carries the **major version only** ("v4"). A minor release must
    never require touching the site.
11. **Vocabulary:** Muster's own coinages (*tokens are the currency · the queue is the org chart ·
    growth caps · prose for judgment, scripts for mechanics*). One recognition hook permitted:
    "context engineering." Insider terms (cascade lag, cold-start sufficiency) earn their meaning in
    §4, not at hero altitude.
12. **Real URLs only.** The curl is copy-paste-verified against the live repo. No fictional hosts.

## Page structure — single page, 6 sections

### §1 Hero
Message to land in 5 seconds: *one person plus a governed AI team ships real products — here's the
measured proof.* Carries: the measured line — **"this build: 9.3 hours of active build, $147 in AI
tokens"** (Bodh, whole product); anchor text available: **"Ship a product. Without a team."**
(Content arranges headline vs. subline; the number must be visible without scrolling); the **eight
named roles as labels** on the concept visual (PM command hub + bus-bar formation — this IS the
roster; no separate roster section); one `curl`; a terminal streaming the **real Sprint-4 run-log**
(previews §2); the **dual build readout** — THIS SITE (dashes until measured) above BODH
(9.3 h active · $147 · bodh.day), scope-labeled per rule 5, with one small **`VERIFY ⎘`** chip
linking to `VERIFY.md` in this repo. Eyebrow facts: open source · runs in Claude Code · v4 · MIT.

### §2 Watch it ship — the replay fused with the Bodh case study *(build this first — see Sequencing)*
A two-layer annotated replay of a real autonomous sprint: **Bodh's website wave (Sprint 4)** — chosen
because it ran fully autonomous end-to-end with a single human gate at deploy, ended live at
`bodh.day`, and is itself a website build (the viewer watches Muster do exactly what produced the
page they're on). Label: **"condensed from the real build log."** Faithful reconstruction from real
artifacts (30 decision-log entries, 12 handoffs, full queue + sprint history, 2 run traces) — never
staged, never embellished.

The sequence (real steps → real handoffs → real decisions):
1. Queue advances → **UI/UX** files production spec + assets (HO-027).
2. → **Developer** productionizes the static site — exact rotation-logic port, PWA, timezone parity
   (HO-028).
3. → **PM independently re-verifies** with its *own* screenshots — never trusting the developer's;
   visual parity, rotation, trackers, placeholders (the "wow" beat).
4. → **Content → Legal → Marketing** each validate and hand off (HO-029/030/031) — copy on-voice,
   privacy "Data Not Collected" confirmed at code level, share card written.
5. → **QA full validation** (HO-032): **PASS — zero bugs, 11/11 acceptance** (rotation re-derived
   across 24 dates × 3 timezones, byte-identical data, offline smoke test, tracker-free, a11y at
   code level).
6. Single human gate → deploy → **`bodh.day` live**.

The honest headline beat, for the non-technical viewer: *"the PM re-checked the developer's work
with its own screenshots, QA passed all 11 checks — no human touched this until the deploy
button."* That is true for this run. **Do not overclaim:** the later Safari-only SVG catch (an
independent cross-engine re-check) happened in a founder-directed polish pass — if used, narrate it
as exactly that, never as part of the untouched run. The aggregate Bodh numbers (9.3 h, $147) are
the **whole product** — never imply the website wave alone cost that.

Two layers: terminal layer = real queue/handoff/decision lines scrolling; narration layer =
synchronized plain English. Ends on the shipped artifact: `bodh.day`, live. Format: scripted
HTML/CSS/JS terminal built from the real log lines (no asciinema, no tooling dependency). Narration
is product-voice.

### §3 The insight
Message: *a team you govern — not a chat you hope converges. The leverage is in how the work is
wired, not the model.* Short: kicker + one paragraph. Lead with governed-team + determinism;
context-routing supports ("every multi-agent framework optimizes how agents talk to each other;
Muster optimizes what each one *reads* — the ceiling is the context window, not the conversation");
fold the CrewAI/AutoGen contrast into one clause, no comparison table. Close on the deterministic
floor: mechanics run in scripts, judgment in prose — which is why it holds on cheap models.

### §4 The decisions behind it *(centerpiece — founder-supplied copy, first person, dates as small stamps)*
Four decisions, each rendered as a spec-sheet (Decision / Problem / Trade-off / Mechanism rows —
each decision ends in the mechanism it produced). Order: strongest first. Keep each ~4–6 sentences.
The copy below is locked draft — Content may tighten, never inflate.

**1. I optimized what each agent *reads*, not how they talk.** *(framework — 2026-05-05)*
- Decision: each agent reads only what its current task needs — a small always-on tier, everything
  else on demand, most of it never; the PM routes context to whoever needs it.
- Problem: every multi-agent framework I looked at optimized message-passing. But the thing that
  actually breaks is the context window — put eight agents in a room and let them all read
  everything, and each one drowns in context meant for someone else. Quality falls as the window fills.
- Trade-off: I gave up the simple thing — every agent sees everything — for a PM that decides what
  each agent reads. That costs coordination discipline: one role has to own context routing.
- Mechanism: the three-tier reading model + the PM as context-translator. The bottleneck was never
  agent communication; it was agent memory.

**2. If a rule can be checked by a script, it isn't allowed to live in prose.** *(framework — 2026-06-13)*
- Decision: mechanics go in bash; prose is reserved for judgment. Anything a script can verify, a
  script must.
- Problem: prose instructions degrade by model tier — a weaker model skips a rule a stronger one
  follows. And every rule in prose costs tokens on every read and dilutes the instructions around it.
- Trade-off: I gave up "just tell the model what to do" and paid upfront for deterministic checks —
  so the rules stop depending on which model is running.
- Mechanism: deterministic gates — size budgets, lints, guard scripts, CI. The payoff is a claim few
  agent frameworks can make: it runs safely on small, cheap models, because the floors don't move.

**3. I capped the size of every file the agents read each session — before I wrote almost anything
else.** *(framework — 2026-04-12, first commit)*
- Decision: the always-read surface has hard budgets, enforced in CI. When a shared file hits its
  cap, something gets archived or trimmed — the cap doesn't quietly move.
- Problem: multi-agent systems rot over weeks. Shared files accumulate, and one day the system
  spends its whole context budget re-reading its own history before doing any real work.
- Trade-off: I gave up append-forever convenience for forced discipline. Hitting a cap is friction,
  on purpose.
- Mechanism: pillar-budget regression in CI. It was the first thing I built, because the failure it
  prevents is invisible until it's terminal.

**4. Building a real app with it, I removed the one feature every competitor adds.** *(product — Bodh)*
- Decision: Bodh shows one mental model a day, and the reader never picks a category — not a filter,
  not a preference, not an onboarding choice.
- Problem: the obvious feature is topic choice. But self-selection is confirmation bias at the
  library level — people deselect exactly the categories they need most.
- Trade-off: I gave up the feature users would ask for, and the personalization story, for the thing
  that actually works — non-chosen exposure. Choice can be added later; taking it away is a betrayal.
- Mechanism: breadth is absorbed at the library's admission bar, not by user filtering. The same
  restraint as the framework, applied to a product that ships.

*(A fifth, site-build decision may be added after this site ships — a real decision from its own
build log. Not before.)*

### §5 Shipped with Muster (~4 lines + readout cards)
Message: real products come out of this, the list is growing, and this page is one of them.
- **Bodh** — shipped iOS app + web landing, live at `bodh.day` (the case study above).
- **Provenance line (first person, founder-supplied):** Muster was extracted mid-build from a
  production iOS app — the framework existed as working practice before it existed as a repo. (The
  source app stays unnamed; no status, no "coming soon.")
- **This site** — built with Muster by its own team; its measured line (dashes → real numbers at
  launch).
No "more coming soon" hype. The growing-list format returns as products ship.

### §6 Get started
Message: starting costs one command — no signup, no framework install, no API wiring; markdown files
+ Claude Code. The command (copy-paste-verified):
`curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product`
then `cd my-product && claude`. One GitHub link. Blinking cursor after the curl. Nothing else.

### Footer
"**Specced, written, and reviewed by Muster's AI team — 8 agents, 1 operator**" + links: repo ·
queue · handoffs · decision log · VERIFY. Authorship: "**Designed and built by Kanwar Sandhu, solo,
while shipping his own products with it**" + `thinkArhant@gmail.com` + GitHub profile. No bio, no
photo, no social row.

## Measured data (current truth)

| | BODH (idea → live) | THIS SITE (spec → live) |
|---|---|---|
| Active build | 9.3 h | — (measured at launch) |
| Cost (API list) | $147 | — |
| Operator attention | 4.8 h (supporting stat) | — |
| Commit-days | 4 (Jul 11–18) | — |
| Shipped | bodh.day — App Store + web | this page |

Bodh measured by `muster/scripts/muster-meter.py` from the build's session logs, deduped,
cross-checked. This site's numbers come from the same meter over this repo's own build — commit the
`--json` snapshots into `telemetry/` as the build progresses.

## Verification (the numbers earn a click)

- `.muster-sprint-logs/` is **committed in this repo** (un-gitignore it) — per-run metrics land
  interleaved with each sprint's commits.
- Meter snapshots (`telemetry/*.json`) committed as the build progresses; the method is
  `muster/scripts/muster-meter.py` in the submodule this repo carries.
- **`VERIFY.md`** at repo root: the method in ~5 lines, links to the metrics files, "rerun it
  yourself." The hero card's `VERIFY ⎘` chip links here.
- Published Bodh evidence: derived telemetry snapshot + commit-date list (token counts and
  timestamps only — no conversation content, ever).

## Design direction (locked — execute with craft, don't re-derive)

**Concept:** a spacious, mil-spec field manual rendered as a calm, *live* operations terminal.
Terminal × military ("muster" = assemble into formation) × mechanical-trust × **spacious** (the
overriding constraint — generous air, one idea per screen).

- **Palette — single accent RUST.** Dark (primary): ground `#13140D`, surface `#1B1D13`, ink
  `#E6E3D3`, drab-sage muted `#8C9075`, hairline `#2C2F22`, accent `#C05A32`. Light (olive field
  canvas, deliberately not cream): ground `#DBD8C6`, surface `#E7E4D4`, ink `#191B10`, muted
  `#55583F`, line `#BDB9A3`, accent `#A0451F`. Both themes first-class.
- **Type:** system monospace (SF Mono/Menlo — no webfonts) for display/labels/system chrome in
  tracked uppercase (crate-stencil); system-ui humanist sans for reading passages; metrics in
  tabular mono, rust. Any paragraph meant to be *read* is full-ink and legible — muted tone is for
  labels/captions only.
- **Texture:** subtle rugged grain over the ground + whisper top vignette (CSS/SVG-generated).
- **Motion — three live elements, nothing else** (all `prefers-reduced-motion`-gated): (1) the hero
  terminal streaming the real run-log with rust highlights on key beats; (2) the OPERATIONAL dot —
  rust pulse (header + terminal live indicator); (3) scroll-triggered count-up on the readout
  metrics (decimals supported — 9.3 rolls as 9.3). Plus the blinking cursor after the curl.
- **Motifs:** stencil section tags (`§01 · THE INSIGHT`); hairline rules with machined end-ticks;
  registration `+` marks; instrument-readout metric cells; decisions as spec-sheets
  (Problem/Trade-off/Mechanism rows); the roster as a formation (PM hub + eight plates on a
  bus-bar); an `OPERATIONAL` status bar.
- **Surface:** fully matte, sharp corners, opaque cards — no glass, no gradients-as-decoration, no
  rounded-friendly styling.
- **Layout:** one idea per screen; reading column ~64ch; full-width hairline section rules.

A reference mockup exists for *feel* (hand it to UI/UX as input, not as the build): the production
version should exceed it with the team's own craft.

## Tech, deploy, telemetry practice

- **Stack:** static HTML/CSS + minimal vanilla JS. No framework, no build system beyond simple
  assembly, no webfonts, no external requests at runtime (QA asserts zero network — this is a
  product claim, not a preference). Self-contained assets (inline SVG / CSS-generated texture).
- **Cross-engine:** verify WebKit AND Blink every visual milestone (`qlmanage`/Safari + headless
  Chrome) — inline-SVG/WebKit divergence is a known failure class. QA: `skills/web/web-testing.md`.
- **Deploy:** Cloudflare Pages from this repo. Domain arrives from the founder mid-build — until
  then the curl uses the GitHub raw URL above.
- **Accessibility:** semantic landmarks, real focus states, reduced-motion paths rendering complete
  content, contrast ≥4.5:1 body in both themes.
- **This repo is public from commit one.** Its history is part of the product: commit subjects
  follow Rule 16 (`role: outcome`) — the log should read as the build's story.
- **Telemetry practice:** prefer autonomous sprints (native per-step metrics, clean attribution);
  keep ad-hoc interactive tinkering minimal — it muddies attribution and inflates the number this
  site publishes about itself.

## Sequencing

1. **Prototype §2 first** — the fused case-study + replay is the highest-leverage, highest-risk
   asset; if it underdelivers, the page falls back to template-with-good-copy and we learn that in
   week one. Acceptance: a non-technical reader can follow the narration; a technical reader can
   read the terminal lines; both reach `bodh.day · LIVE`.
2. Then the remaining sections against this spec; §4's spec-sheet rendering is the second design
   centerpiece.
3. Content writes final copy from the section briefs above (founder-supplied passages verbatim or
   tightened, never inflated).
4. Measure the build with the meter throughout; fill THIS SITE's card with real numbers at launch —
   until then, dashes.
