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

- [x] **Reading column resolved to a real measure** — RESOLVED 2026-07-26, Source: pm, Added: 2026-07-25
  - Founder ruled at the Wave 3 gate after comparing the shipped width against 65- and 70-character
    alternatives rendered in the page's own tokens: **`64ch` ships as written**. The seed's "reading
    column ~64ch" means the CSS value, not a rendered character count. No change to `--read-max`.
  - Carried consequence, tracked on the QA fix step: the audit's 45–75-character band check is retired
    as an assertion and re-scoped to a reported measurement, so `qa-independent-audit.mjs` stops exiting
    non-zero on a standard the product has deliberately declined. See DEC-023.

- [ ] **§2's mobile layout checked on a real iPhone** — Blocker: hard, Source: pm, Added: 2026-07-25
  - `qlmanage` is the only WebKit on this machine; it executes no JavaScript and renders at a fixed
    ~1024² regardless of the requested size, so **no WebKit evidence can exist at mobile widths**
    (QA proved both with committed probes). The residual that matters is `100dvh` inside
    `max-height: calc(100dvh - 3rem)` — `section-02-replay.md` §7.1's entire 379.4px budget rests on it,
    and dynamic viewport units with a showing/hiding toolbar are exactly where mobile Safari diverges.
    The budget now carries 32.6px of slack at 375 × 553 rather than 5.1px (DEC-026, widened by
    DEC-029's leading split) — real margin against this exact risk, but margin is not proof.
  - Resolution is a device look, not a harness: open §2 on an iPhone in Safari with the toolbars shown
    and confirm both layers stay on screen for the whole playback. Everything else in §2 is machine-
    verified on Blink. See DEC-021.4.
  - Milestone gate: launch

- [x] **§2's narration card overflows at 320px** — RESOLVED 2026-07-26, Source: content, Added: 2026-07-26
  - Was: SP3 set 7 rendered lines into a 6-line card at 320px (202.3px of text in a 173.4px text
    area). The resolution was deferred to §3's copy work, when SP3 would be open and the copy-length
    lever available (DEC-027.1).
  - Lever pulled: SP3 shortened 24 → 19 words / 183 → 134 characters with the beat preserved
    (DEC-035), applied to `section-02-narration.md` and `index.html` together. Measured, not
    estimated: `qa-independent-audit.mjs` reports **5 lines of SP3 in the 232px text column at 320px
    against the 6-line / 199.4px card — no overflow at this width**; 106/106 checks green, exit 0;
    `scripts/test.sh` green. The totals-strip third-line wrap at 320px reported by DEC-027.2 also no
    longer reproduces (audit reports the value line at 2 lines, 246.34px of 272px).

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
