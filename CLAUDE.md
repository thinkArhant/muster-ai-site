<!-- MUSTER BOOTSTRAP — DO NOT REMOVE -->
**First tool call this session: Read `knowledge-base/agent-context/.populated`.** Do not LS/Grep/Glob first — the file is the routing signal.

Then run session-start housekeeping: `bash muster/scripts/muster-housekeeping.sh` (idempotent — prunes stale bind files >1 day old, rotates bind log if >500 lines). Skip if the script is missing (uninitialized project — routing below will halt).

**Each bootstrap Bash call must be a separate tool call** — do not chain with `&&` or `;` (housekeeping, env-var check, and bind script each match their own pre-approval pattern; chains don't match).

Route on `.populated` (JSON: `onboarded_at`, `onboarding_complete_at`, `agents.<name>` — each timestamp-or-null):
- `onboarded_at` is a timestamp AND `onboarding_complete_at` is null → **existing-project onboarding active**. Bind PM via Bash: `bash muster/scripts/muster-bind.sh pm onboarding` (writes bind file, appends bind log). Then read `muster/team/pm/skills/generic/reverse-discovery.md` and run it (Phase 1 first). No picker. Do NOT load `.claude/agents/pm.md` — onboarding is self-contained in the discovery skill.
- `onboarded_at` is null AND `agents.pm` is null → **greenfield first session**. Bind PM via Bash: `bash muster/scripts/muster-bind.sh pm onboarding` (writes bind file, appends bind log). Then read `muster/team/pm/skills/generic/greenfield-discovery.md` and fire Stage 1 welcome. No picker. Do NOT load `.claude/agents/pm.md` — the discovery skill drives PM behavior through Stage 1.3.
- `onboarded_at` is null AND `agents.pm` is a timestamp → **greenfield ongoing**. Read `muster/CLAUDE.md` and follow Role Binding. **CRITICAL**: before firing the picker, run Bash `echo "${MUSTER_ROLE:-UNSET}"` to check the env var per Role Binding step 1 — if set to a valid role, skip picker entirely. Do NOT re-read `greenfield-discovery.md`.
- `onboarded_at` AND `onboarding_complete_at` both timestamps → **steady-state** (null `agents.*` entries trigger JIT populate, NOT re-onboarding). Read `muster/CLAUDE.md` and follow Role Binding. **CRITICAL**: before firing the picker, run Bash `echo "${MUSTER_ROLE:-UNSET}"` to check the env var per Role Binding step 1 — if set to a valid role, skip picker entirely. Do NOT read `reverse-discovery.md`.
- File missing/invalid → halt: *"Muster setup incomplete. Run `scripts/setup-existing-project.sh --resume` or `scripts/setup-project.sh <name>` at repo root."*
<!-- END BOOTSTRAP -->

# Muster website

## Muster Framework

Multi-agent framework. Every session picks ONE role at start (picker or `MUSTER_ROLE` env var). Roles: PM, Developer, UI/UX, QA, Content, Marketing, Legal, Research. PM coordinates; specialists do domain work; `Agent({subagent_type: "<role>"})` for parallel/throwaway work.

Authoritative rules, role binding, agent protocols: `muster/CLAUDE.md`. System guide, agent roster, skill index: `muster/system-guide.md`. This file holds only project-specific content (sections below).

**Framework guide**: `/muster` — setup, modes, knobs, stuck runs, upgrades.

## Product Information

**Product**: Muster website — anchor headline available: "Ship a product. Without a team."

The public one-page website for Muster, the open-source multi-agent product framework for Claude Code (`github.com/thinkArhant/muster-ai`). It shows what Muster is, how it works, and demonstrates with measured data and real build artifacts that one person plus a governed AI team ships real products. It ends in a single `curl`.

- **Platforms / surfaces**: Web — one static page
- **Tech stack**: static HTML/CSS + minimal vanilla JS. No framework, no build system, no webfonts, zero external requests at runtime
- **Target user**: the skeptical technical cold reader — a founder or builder who gives the page a five-second skim and discounts unverified claims by default
- **Monetization**: none. MIT-licensed open source; nothing is sold. One conversion event: copying the `curl`
- **Team model**: Solo founder + AI agents

See `knowledge-base/product-spec.md` for full spec, `knowledge-base/brand-guidelines.md` for brand, `knowledge-base/current-sprint.md` for sprint status.

<!-- Add shared UI library, design system, or other cross-cutting technical details below if they affect multiple agents. -->

**The page is an exhibit of what it describes.** It is built with Muster, by Muster's AI team, and says so — its repo, queue, handoffs, decision log, and build telemetry are public. A sloppy page refutes the product. Read `knowledge-base/foundational-assumptions.md` before any deliverable; A-001 through A-009 bind every role.

## Project-Specific Rules

<!-- Rules that replace, add to, or are orthogonal to Muster framework rules.
     Do NOT copy framework rules here — they live in muster/CLAUDE.md. Empty section = default behavior.
     Format each as current-truth ("Rule X (this project): ..." / "[Preference]: ..."). No archaeology.
     Examples: "Rule 9 (this project): shared UI components go through design-system review";
     "Package manager: pnpm"; "Testing: new endpoints require integration + unit tests". -->

**Founder-authored source files are read-only to every agent**: `knowledge-base/product-spec-seed.md`, `knowledge-base/bodh-sprint4-corpus.md`, `knowledge-base/design-specs/direction-reference.html`. Quote, verify, and build from them; never edit, reformat, extend, or regenerate them. The founder announces when a new one lands — don't poll for it. QA treats a modification as a blocking finding.

**No agent measures this build**: never run `muster/scripts/muster-meter.py`. Build telemetry snapshots are founder-supplied and committed at milestones. Steps needing a metric read a committed snapshot.

**No invented numbers, ever**: an unmeasured metric renders as a dash with "measured at launch," never a placeholder. Three measurement scopes exist and are never conflated — see `knowledge-base/product-spec.md` §8. Copy claims are governed by `knowledge-base/agent-skills/content/copy-rules.md`.

**Zero external network requests at runtime** is a published product claim, not a preference. It outranks instrumentation: the page carries no analytics, which makes its own funnel metrics unmeasurable client-side. That collision resolves in favour of the constraint.

**Cross-engine verification is mandatory**, not optional: WebKit **and** Blink at every visual milestone. Inline-SVG/WebKit divergence is a known failure class here. A Chrome-only pass is not a pass.

**`.gitignore` is correct as written**: `.muster-sprint-logs/*.jsonl` excludes only the bulky transcripts; `.metrics` files and run logs in that directory already commit. Do not "fix" it.

**`design-specs/direction-reference.html` never ships** — it is a feel reference for mood, density, and rhythm. Its markup, class names, and measurements are not a build target.
