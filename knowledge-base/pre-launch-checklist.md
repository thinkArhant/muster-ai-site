# Pre-Launch Checklist
<!-- Deferred items that must be resolved before release milestones. -->
<!-- Any agent can append items. PM reviews at milestone gates (beta, submission, launch). -->
<!-- PM blocks progress on unresolved "hard" blockers. -->

## Items

<!-- ENTRY TEMPLATE:
- [ ] **[Item]** — Blocker: [hard/soft], Source: [agent], Added: [date]
  - [Description of what needs to be resolved]
  - Milestone gate: [beta / submission / launch]
-->

- [ ] **`VERIFY.md` at repo root** — Blocker: hard, Source: pm, Added: 2026-07-24
  - `product-spec-seed.md` → Verification requires `VERIFY.md`: the measurement method in ~5 lines,
    links to the committed metrics files, and "rerun it yourself." The §1 hero's `VERIFY ⎘` chip links
    to it, so a missing file ships a dead proof link on the one claim the page asks readers to check.
  - Deferred out of Sprint 1 because §1 is not in scope. Lands with §1 in Sprint 2.
  - Milestone gate: launch

- [ ] **THIS SITE measured numbers replace dashes** — Blocker: hard, Source: pm, Added: 2026-07-24
  - The dual build readout ships dashes ("measured at launch") until real numbers exist. Per seed
    rule 4 these are never placeholder values, and per the project's telemetry practice the snapshots
    are founder-supplied — no agent generates them.
  - At launch: commit the founder's final telemetry snapshot and fill the THIS SITE column, scope-labelled
    *spec → live* per rule 5 so it is never conflated with BODH's *idea → live*.
  - Milestone gate: launch

- [ ] **Curl command copy-paste-verified against the live repo** — Blocker: hard, Source: pm, Added: 2026-07-24
  - Seed rule 12 (real URLs only) and §6. The command must be run and confirmed working, not assumed.
    If the founder's domain has landed by launch, confirm which URL ships — the GitHub raw URL is the
    stated fallback until then.
  - Milestone gate: launch
