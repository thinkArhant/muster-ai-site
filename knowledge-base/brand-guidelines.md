# Brand Guidelines — Muster

<!-- Brand identity and visual direction. PM owns this file. -->
<!-- Structure follows PM's brand-guidelines skill (muster/team/pm/skills/generic/brand-guidelines.md) -->
<!-- Visual direction is LOCKED in knowledge-base/product-spec-seed.md → "Design direction".
     This file records it; it does not re-derive it. Where the two disagree, the seed wins. -->

## 1. Brand Identity

**Mission**: make a governed AI team a practical way for one person to ship real products.

**Brand promise**: the leverage is in how the work is wired, not in the model. Follow the mechanics and
the floor holds — even on cheap models.

**What Muster is**: an open-source multi-agent product framework for Claude Code. Eight roles, one
operator, markdown files and scripts. Not a chat you hope converges.

**Proof posture**: every claim is measured, the method is published, and the artifacts are public. The
brand's credibility rests on checkability, not on assertion. "Measured — method and data published,"
never "proven."

## 2. Brand Personality

**Archetype**: the field engineer. Competent, plain-spoken, unimpressed by its own work.

**Traits**: exact · restrained · mechanical · candid · unhurried.

**Tone attributes:**

- **Exact over emphatic.** A number does the work an adjective would. Exact numbers read as measured;
  round ones read as marketing.
- **Restrained over enthusiastic.** No exclamation, no hype, no superlatives. Confidence comes from
  precision.
- **Candid about limits.** Where a claim's scope is narrow, the copy says so. Overclaiming is the one
  unrecoverable brand failure, because the whole proposition is verifiability.
- **Mechanical trust.** The voice of something that was tested, not something that was promised.

**What the brand never sounds like**: a launch announcement, a pitch deck, a community invitation, or a
framework that needs you to be excited.

## 3. Messaging Framework

**Positioning statement**: Muster is the multi-agent framework that optimizes what each agent *reads*
rather than how agents talk — because the ceiling is the context window, not the conversation.

**Core value propositions:**

1. **A team you govern, not a chat you hope converges.** Determinism first: mechanics in scripts,
   judgment in prose.
2. **It holds on cheap models.** The deterministic floor doesn't move with model tier, because anything
   a script can check lives in a script.
3. **It produces shipped products, and the receipts are public.** Real repos, real queues, real
   handoffs, real telemetry.

**Anchor headline available**: *"Ship a product. Without a team."*

**Elevator pitch**: One operator, eight AI roles, and a queue that acts as the org chart. Muster runs
in Claude Code, costs tokens rather than salaries, and has shipped real products — with the build logs
committed so you can check the numbers yourself.

**Message hierarchy for the five-second skim**: measured proof first, mechanism second, philosophy
third. Never lead with architecture.

## 4. Visual Direction

### The mark — the pennant

A cream swallowtail banner: the standard a formation musters under. Founder-authored, supplied at
`knowledge-base/design-specs/brand/` — `muster-mark-tile.svg` (cream on rust, the house tile),
`muster-glyph-cream.svg` (dark grounds), `muster-glyph-ink.svg` (light grounds), `favicon.svg`.

**Where the mark appears**

| Seat | Treatment |
|---|---|
| Header lockup | Pennant + `MUSTER_` — rust pennant (6 × 9px), the wordmark, and a **static** rust underscore |
| Section separators | Pennant replaces the square, at section-tag scale |
| Favicon, social tile, avatars | The supplied artwork as authored |

**The footer carries no lockup.** The header plus five section separators already seat the mark six
times; a seventh a few rhythm units below the fifth does nothing the provenance line has not already
done. The footer's authorship line is the closing signature.

**The underscore never blinks.** The `curl` owns the only cursor on the page; the header's underscore
is a static mark, not a cursor effect.

**Never render the pennant on a pole.** The mark is the banner alone.

**Geometry.** The pennant is a five-point polygon — `M0 0 L470 0 L470 703 L235 575 L0 703 Z` — so at
page scale it is drawn as a `clip-path` on a plain box rather than as inline SVG:
`polygon(0 0, 100% 0, 100% 100%, 50% 81.79%, 0 100%)`. That keeps the page free of SVG in these seats,
which is deliberate: it costs no network request and avoids the inline-SVG rendering divergence this
project treats as a known failure class.

**Proportion is a design decision, not arithmetic.** The pennant is ~1:1.5 portrait where a square is
1:1, so a mark set to the same width sets half again as tall. Section tags and the header lockup are
sized optically. At 8–12px the mark reads as punctuation; at display sizes it becomes badging, which the
page's restraint does not carry.

**Colour.** Rust, per the accent rules — rust is permitted on graphical marks at any size. The mark
introduces no new palette value.

**Concept**: a spacious, mil-spec field manual rendered as a calm, *live* operations terminal.
Terminal × military ("muster" = assemble into formation) × mechanical-trust × **spacious** — spacious
being the overriding constraint. Generous air, one idea per screen.

**Palette — single accent, RUST.** Both themes first-class.

| Token | Dark (primary) | Light (olive field canvas) |
|---|---|---|
| Ground | `#13140D` | `#DBD8C6` |
| Surface | `#1B1D13` | `#E7E4D4` |
| Ink | `#E6E3D3` | `#191B10` |
| Muted | `#8C9075` (drab sage) | `#55583F` |
| Hairline | `#2C2F22` | `#BDB9A3` |
| Accent | `#C05A32` | `#A0451F` |

These twelve values are the palette. A thirteenth colour is a deviation requiring written
justification, not a judgment call. The light theme is an olive field canvas — deliberately not cream.

**Typography:**

- System monospace (SF Mono/Menlo — no webfonts) for display, labels, and system chrome, set in tracked
  uppercase for a crate-stencil feel.
- System-ui humanist sans for reading passages.
- Metrics in tabular mono, rust.
- **Any paragraph meant to be read is full-ink and legible.** Muted tone is for labels and captions
  only — never for body copy.

**Texture**: subtle rugged grain over the ground plus a whisper top vignette, CSS/SVG-generated.

**Surface**: fully matte, sharp corners, opaque cards. No glass, no gradients-as-decoration, no
rounded-friendly styling.

**Motifs**: stencil section tags (`§01 · THE INSIGHT`) · hairline rules with machined end-ticks ·
registration `+` marks · instrument-readout metric cells · decisions as spec-sheets · the roster as a
formation (PM hub + eight plates on a bus-bar) · an `OPERATIONAL` status bar.

**Motion — three live elements, nothing else**, all `prefers-reduced-motion`-gated: the hero terminal
streaming the real run-log with rust highlights on key beats; the OPERATIONAL dot's rust pulse; and
scroll-triggered count-up on readout metrics (decimals roll as decimals). Plus the blinking cursor
after the curl. Reduced-motion paths render complete content, never a degraded subset.

**Layout**: one idea per screen; reading column ~64ch; full-width hairline section rules.

## 5. Naming Conventions

**Product terminology** — Muster's own coinages, used as-is:

- *tokens are the currency*
- *the queue is the org chart*
- *growth caps*
- *prose for judgment, scripts for mechanics*

**Permitted recognition hook**: "context engineering" — exactly one, for reader orientation.

**Insider terms** (*cascade lag*, *cold-start sufficiency*): permitted only where they earn their
meaning. §4 was that place; with §4 ruled plain-language (DEC-043), no section on the page satisfies
the condition, so the terms do not appear on the page. Reversible on founder request. Never at hero
altitude in any case.

**Attribution naming — non-negotiable:**

- ✅ "by Muster's AI team — 8 agents, 1 operator"
- ❌ "the Muster team" unqualified — implies humans
- ❌ any phrasing that lets a reader assume a human wrote the deliverables

**Version naming**: major version only in page copy ("v4"). Never "v4.2" — a minor release must never
require touching the site.

**Time vocabulary**: "active build," never "built in N hours," never wall-clock framing. Elapsed
commit-days are the checkable fallback.

**Cost vocabulary**: API list price cost-to-replicate. Never subscription spend. Never print a human or
agency cost baseline — state the number and let the reader run their own comparison.

**Do not use**: "blazing fast" or any adjective-as-argument · "proven" · "revolutionary" ·
"seamless" · "effortless" · "coming soon" · exclamation marks.

## 6. Competitive Positioning

**The differentiator, in one clause**: every multi-agent framework optimizes how agents talk to each
other; Muster optimizes what each one *reads*.

**The contrast with CrewAI / AutoGen** folds into a single clause in §3 — no comparison table, no
teardown, no named-competitor scoreboard. The restraint is itself positioning: a page that argues
against competitors is a page that isn't showing its own proof.

**Where the moat actually is:**

1. **Context routing** — a small always-on tier, everything else on demand, most of it never; the PM
   routes context to whoever needs it. The bottleneck was never agent communication; it was agent
   memory.
2. **The deterministic floor** — anything a script can verify, a script must. This is why the framework
   holds on small, cheap models, a claim few agent frameworks can make.
3. **Public receipts** — shipped products with committed build logs. Competitors demo; Muster publishes
   the run.

**What the brand deliberately doesn't compete on**: breadth of integrations, model-agnostic
abstraction layers, community size, or star count.
