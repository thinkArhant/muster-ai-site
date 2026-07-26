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

- [ ] **Reading column resolved to a real measure** — Blocker: hard, Source: pm, Added: 2026-07-25
  - `--read-max: 64ch` resolves to 685.31px and renders **~90 prose characters per line**, because `ch`
    is the advance of `0` (10.281px) while prose averages 7.615px. The common typographic band is 45–75
    and WCAG 2.1 SC 1.4.8 (AAA) caps a reading block at 80. The build matches the spec and the spec
    matches seed line 228 — the gap is between `64ch` and what `64ch` renders.
  - Awaiting the founder's reading of "~64ch" (the CSS unit, or the measure). Parked in
    `orchestration-queue.md` → Founder Decisions with a PM recommendation; see DEC-021.3. It gates
    nothing before §3, which is why it is here rather than halting the run — this item is the backstop
    that stops it shipping unanswered.
  - Milestone gate: launch

- [ ] **§2's mobile layout checked on a real iPhone** — Blocker: hard, Source: pm, Added: 2026-07-25
  - `qlmanage` is the only WebKit on this machine; it executes no JavaScript and renders at a fixed
    ~1024² regardless of the requested size, so **no WebKit evidence can exist at mobile widths**
    (QA proved both with committed probes). The residual that matters is `100dvh` inside
    `max-height: calc(100dvh - 3rem)` — `section-02-replay.md` §7.1's entire 424.4px budget rests on it,
    and dynamic viewport units with a showing/hiding toolbar are exactly where mobile Safari diverges.
  - Resolution is a device look, not a harness: open §2 on an iPhone in Safari with the toolbars shown
    and confirm both layers stay on screen for the whole playback. Everything else in §2 is machine-
    verified on Blink. See DEC-021.4.
  - Milestone gate: launch

- [ ] **Count-up cells have an `aria-live` posture** — Blocker: soft, Source: qa, Added: 2026-07-25
  - OBS-004: the count-up engine is verified against `tests/fixtures/count-up.html` because the shell
    instantiates no `[data-countup]` element yet. A mid-roll value carries no `aria-live` guard, so
    assistive tech reaching a cell during the 1.2s roll would announce an intermediate number.
  - Decide when a real readout cell ships with §1 or §5 (Sprint 2), and re-verify the engine against
    page cells rather than the fixture at the same time.
  - Milestone gate: launch

- [ ] **Deploy serves only the page's own files** — Blocker: soft, Source: developer, Added: 2026-07-25
  - Cloudflare Pages deploying the repo root would publish `knowledge-base/`, `tests/`, `muster/`, and
    `scripts/test.sh` alongside the page. The repo is public by design so nothing leaks, but the
    deployed site should still be the site — a 404-able `tests/artifacts/` is noise on an exhibit whose
    argument is restraint.
  - Resolve at the deploy step: either a build output directory containing `index.html`, `styles/`,
    `scripts/*.js`, and the verification artifacts the page links to, or an exclusion list. Note that
    `scripts/` holds both shipped page JS and the project's test runner.
  - Milestone gate: launch
