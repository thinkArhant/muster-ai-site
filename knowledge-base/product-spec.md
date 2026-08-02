# Product Specification — Muster website

<!-- Full product specification. PM owns this file. -->
<!-- Structure follows PM's product-spec-writing skill (muster/team/pm/skills/generic/product-spec-writing.md) -->
<!-- Authoritative source: knowledge-base/product-spec-seed.md (founder-authored, read-only).
     Where this file and the seed disagree, the seed wins. -->

## 1. Overview

**Product**: Muster website — anchor headline available: *"Ship a product. Without a team."*

The public one-page website for Muster, the open-source multi-agent product framework for Claude Code
(`github.com/thinkArhant/muster-ai`). It shows what Muster is, how it works, and demonstrates with
measured data and real build artifacts that one person plus a governed AI team ships real products. It
ends in a single `curl`.

**Key differentiators of the page itself:**

- It is an exhibit of what it describes — built with Muster, by Muster's AI team, with its own repo,
  queue, handoffs, decision log, and build telemetry public.
- Every performance and cost claim is a measured number with a published method, not an adjective.
- One CTA. No newsletter, no Discord, no stars badge, no testimonials, no pricing, no community
  furniture.

**The bar**: a bloated or sloppy page refutes the product; a signal-dense, restrained one *is* the
product.

## 2. Target Users

**Primary persona — the skeptical technical cold reader.** A founder or builder evaluating Muster who
gives the page a five-second skim and decides whether to keep reading. Technical enough to read a
terminal log and to distrust round numbers. Has seen multi-agent framework claims before and discounts
them by default. Wants to know what it actually does, whether it works, and what it costs — in that
order, fast.

Design consequence: the page must stand alone, land its proof inside the skim, and reward depth for
whoever scrolls. The measured line is visible without scrolling.

**Secondary personas:**

- The non-technical builder who can follow a narrated story but not a raw log — the §2 narration layer exists for them.
- The returning evaluator who came back to check the numbers — the verification path exists for them.

**Anti-personas** (explicitly not designed for): enterprise procurement evaluators, contributors
looking for a community to join, and anyone shopping on price.

## 3. MVP Features

The MVP is one page, six sections, plus footer. Feature IDs are section-scoped.

| ID | Section | Description |
|---|---|---|
| F-SITE-1 | §1 Hero | The measured line, anchor headline, eight named roles on the concept visual (PM command hub + bus-bar formation — this IS the roster, no separate roster section), one `curl`, a terminal streaming the real run-log, the dual build readout with a `VERIFY ⎘` chip, eyebrow facts (open source · runs in Claude Code · v4 · MIT) |
| F-SITE-2 | §2 Watch it ship | Two-layer annotated replay of the Bodh Sprint-4 website wave fused with the case study. Terminal layer = real queue/handoff/decision lines; narration layer = synchronized plain English. Ends on `bodh.day`, live |
| F-SITE-3 | §3 The insight | Kicker + one paragraph: a team you govern, not a chat you hope converges. Context-routing over message-passing; deterministic floor as the reason it holds on cheap models |
| F-SITE-4 | §4 The decisions behind it | Four founder-authored decisions as spec-sheets (Decision / Problem / Trade-off / Mechanism), strongest first, dates as small stamps. Second design centerpiece |
| F-SITE-5 | §5 Shipped with Muster | Bodh, the provenance line, this site. Readout cards. Growing list, no hype |
| F-SITE-6 | §6 Get started | The verified `curl`, then `cd my-product && claude`. One GitHub link. Blinking cursor. Nothing else |
| F-SITE-7 | Footer | Authorship, AI-team attribution, links: repo · queue · handoffs · decision log · VERIFY |

**Acceptance criteria are per-section and live in `current-sprint.md` for the sections in flight.** The
two that bind every section:

- Zero external network requests at runtime. Asserted by QA; this is a product claim, not a preference.
- Both themes first-class, contrast ≥4.5:1 for body text, reduced-motion paths rendering complete content.

**§2's own acceptance bar** (seed → Sequencing): a non-technical reader can follow the narration; a
technical reader can read the terminal lines; both reach `bodh.day · LIVE`. The replay must stand on
pacing and narration alone, independent of the visual frame.

## 4. User Flows

There is one flow, and its failure mode is abandonment.

**The five-second skim** → hero lands *one person plus a governed AI team ships real products, here's
the measured proof*. The measured line is above the fold. Exit or continue.

**The scroll** → §2 proves it by replay → §3 explains why it works → §4 shows the judgment behind it →
§5 shows it produced real shipped things → §6 costs one command.

**The verification detour** → any measured number → `VERIFY ⎘` chip → `VERIFY.md` → the committed
metrics files and a runnable method. This path exists because the primary persona discounts unverified
claims by default; it is load-bearing, not a footnote.

**The conversion** → copy the `curl`. That is the only conversion event on the page.

## 5. Technical Constraints

- **Stack**: static HTML/CSS + minimal vanilla JS. No framework, no build system beyond simple
  assembly, no webfonts.
- **Zero external requests at runtime.** Self-contained assets — inline SVG, CSS-generated texture.
- **Type**: system monospace (SF Mono/Menlo) for display, labels, and system chrome in tracked
  uppercase; system-ui humanist sans for reading passages; metrics in tabular mono, rust.
- **Cross-engine**: WebKit **and** Blink verified at every visual milestone (`qlmanage`/Safari +
  headless Chrome). Inline-SVG/WebKit divergence is a known failure class on this project.
- **Motion**: exactly three live elements — hero terminal stream, OPERATIONAL rust pulse, scroll-triggered
  metric count-up (decimals supported) — plus the blinking cursor after the curl. All
  `prefers-reduced-motion`-gated, with reduced paths rendering complete content.
- **Accessibility**: semantic landmarks, real focus states, contrast ≥4.5:1 body text in both themes.
- **Deploy**: Cloudflare Pages from this repo. Domain arrives from the founder mid-build; until then
  the curl uses the GitHub raw URL.
- **Repo is public from commit one.** Its history is part of the product — commit subjects follow
  `<role>: <outcome>`.

## 6. Monetization

None. Muster is MIT-licensed open source and the page sells nothing. There is no pricing section, no
tiers, no gating, and no signup. The single conversion event is copying the `curl`.

## 7. Success Metrics

The page's job is to convert a skeptical skim into a `curl`. Metrics follow from that and are
deliberately few.

Measurement is **host-side only**. Cloudflare Pages provides server-side request analytics, which
requires zero client instrumentation and therefore leaves the zero-external-requests claim (A-004) fully
intact. Nothing is added to the page to obtain these numbers.

**Measurable — host-side request analytics:**

| Metric | Target | Why it matters |
|---|---|---|
| Visits | — (measured at launch) | Top of funnel; the denominator for everything else |
| `VERIFY.md` fetches | — | Whether the verification path is doing the trust work it exists for — and the closest available proxy for reader skepticism converting into a check |

**Unmeasured by design** — these need client-side instrumentation, which the zero-external-requests
constraint forbids. The constraint is a published product claim; these metrics are internal curiosity,
so the collision resolves in favour of the constraint:

- **Scroll depth / reaches §2** — the hero's five-second-skim verdict is not observable. Accepted.
- **`curl` copied** — the page's only conversion event is not observable. Accepted.

The practical consequence: visits and VERIFY fetches are known; whether the hero earns the scroll is
not. Targets are dashes by the same rule that governs page copy — no invented numbers — and are set from
launch baselines rather than guessed at now.

## 8. Data Model

No user data, no backend, no storage, no cookies, no beacons. The page's only "data" is build-derived
and static:

- **Measured build telemetry** — founder-supplied snapshots committed at milestones. No session
  generates them.
- **The §2 replay corpus** — `bodh-sprint4-corpus.md`, founder-authored, read-only, the sole permitted
  source for every line and timestamp the replay renders.

### Measurement scopes — three, never conflated

Scope confusion is the page's most likely factual failure, so the scopes are enumerated here as the
single source of truth. Every published number carries its scope label.

| Scope | Span | Numbers |
|---|---|---|
| **BODH** | idea → live | 9.3 h active build · $147 API list price · 4.8 h operator attention (supporting stat) · 4 commit-days (Jul 11–18) · whole product, including the iOS app |
| **BODH SPRINT-4 WEBSITE WAVE** | the §2 chain, one evening | ~64 min across 8 traced sessions · 289 API calls · $24.73 API list price · 7 agent steps · zero revision rounds · zero bugs · 11/11 QA acceptance |
| **THIS SITE** | spec → live | — (measured at launch) |

Hard rules on these:

- Never mix two scopes in one claim. The wave's $24.73 is not Bodh's $147 and neither is this site's.
- Never attribute the aggregate Bodh numbers to the website wave alone.
- The wave's deploy landed 2026-07-18, three days after the chain ran, because the gate waited on
  Apple. Never imply the deploy happened at the end of the chain.

## 9. Content Strategy

Content types: the six section briefs, the four founder-authored decision spec-sheets, the §2
narration layer, and the footer.

- **Voice**: product voice throughout, with exactly two first-person exceptions — the provenance line
  in §5 and the decisions in §4, both founder-supplied. Content may tighten founder passages, never
  inflate them.
- **The team is AI and says so**: "by Muster's AI team — 8 agents, 1 operator." Never imply humans did
  the work; never say "the Muster team" unqualified.
- **Vocabulary**: Muster's own coinages — *tokens are the currency · the queue is the org chart ·
  growth caps · prose for judgment, scripts for mechanics*. One recognition hook permitted: "context
  engineering." Insider terms (cascade lag, cold-start sufficiency) earn their meaning in §4, not at
  hero altitude.
- **Version**: page copy carries the major version only ("v4"). A minor release must never require
  touching the site.

The enforceable form of the seed's twelve non-negotiable rules is
`knowledge-base/agent-skills/content/copy-rules.md`. Content and PM both work from that file.

## 10. Legal & Compliance

- **License**: MIT. Stated in the hero eyebrow facts.
- **Privacy**: the page collects nothing. No cookies, no storage, no beacons, no third-party requests.
  This is asserted mechanically by QA rather than claimed in a policy — the same standard the Bodh wave
  held itself to.
- **No privacy policy or terms are required** at current scope, because there is no data collection,
  no account, and no transaction. Revisit if analytics are ever added — which would also break the
  zero-external-requests claim.
- **Published evidence discipline**: telemetry snapshots and commit-date lists only. Token counts and
  timestamps, never conversation content.
- **Attribution**: authorship credited to Kanwar Sandhu with AI-team attribution stated plainly. The
  source app from which Muster was extracted stays unnamed.
