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

- [x] **`VERIFY.md` at repo root** — RESOLVED 2026-07-29, Source: qa, Added: 2026-07-24
  - `product-spec-seed.md` → Verification requires `VERIFY.md`: the measurement method in ~5 lines,
    links to the committed metrics files, and "rerun it yourself." The §1 hero's `VERIFY ⎘` chip links
    to it, so a missing file ships a dead proof link on the one claim the page asks readers to check.
  - The file ships (77 lines) and the chip resolves to it: §1's `href` reads `VERIFY.md` and the
    target exists in the repo, asserted rather than eyeballed. Its own text was run through the copy
    matrix — three scopes stated separately, THIS SITE dashed with no numeral in its row, no
    cross-scope aggregate, the curl byte-equal to the page's, and the `8 AI agents · 1 operator` line
    qualified as roster size rather than this build's participation.

- [ ] **THIS SITE measured numbers replace dashes** — Blocker: hard, Source: pm, Added: 2026-07-24
  - The dual build readout ships dashes ("measured at launch") until real numbers exist. Per seed
    rule 4 these are never placeholder values, and per the project's telemetry practice the snapshots
    are founder-supplied — no agent generates them.
  - At launch: commit the founder's final telemetry snapshot and fill the THIS SITE column, scope-labelled
    *spec → live* per rule 5 so it is never conflated with BODH's *idea → live*.
  - Milestone gate: launch

- [ ] **The footer ships real copy, not the shell placeholder** — Blocker: hard, Source: pm, Added: 2026-07-29
  - `Provenance line and links ship with their own spec.` currently renders as the last string a cold
    reader meets after the curl. No sprint step ever owned footer copy. See DEC-054.
  - `product-spec-seed.md` → Footer specifies the content in full — authorship line,
    `thinkArhant@gmail.com`, GitHub profile, and links to repo · queue · handoffs · decision log ·
    VERIFY. No design question is open; this needs Content for voice and Developer for the build.
  - Blocked on the Gate B ruling for the seed's "8 agents, 1 operator" line: five roles built this
    page, so that line cannot be transcribed as written (R7 bars inflating a founder-supplied passage).
  - Milestone gate: launch

- [x] **Curl command copy-paste-verified against the live repo** — RESOLVED 2026-07-29, Source: qa, Added: 2026-07-24
  - Seed rule 12 (real URLs only) and §6. The command must be run and confirmed working, not assumed.
  - Run against the live repo, not assumed: `HTTP 200`, 16377 bytes, no redirect — the effective URL is
    the one the page prints. What comes back is a real bash script (`#!/usr/bin/env bash`,
    `set -euo pipefail`) and it parses clean under `bash -n`. It was **not executed**: proving the URL
    serves the setup script does not require running a project generator. §6's GitHub link also
    answers 200.
  - Still open at launch if the founder's domain lands: confirm which URL ships. The GitHub raw URL is
    the stated fallback and is what is verified above.

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

- [x] **Count-up cells have an `aria-live` posture** — RESOLVED 2026-07-29, Source: developer, Added: 2026-07-25
  - Was OBS-004: the engine could only be verified against `tests/fixtures/count-up.html`, because the
    page instantiated no `[data-countup]` element. Assistive tech reaching a cell during the 1.2s roll
    would have announced an intermediate number.
  - **The posture is no live region at all**, and silence alone was not enough. A polite region
    re-announces every frame; an assertive one interrupts. So the rolling digits leave the
    accessibility tree instead: while a cell rolls it is `aria-hidden` and a visually hidden stand-in
    carries the exact final string, both removed when it settles. The cell's accessible text is the
    measured value at every instant.
  - Verified against §5's real cells, not the fixture, and during playback rather than off the markup:
    the visible string takes 100 distinct states across a roll while the announced string takes one,
    and the accessibility tree read mid-roll carries `9.3 h` and no intermediate. Both halves were
    watched to go red with the shroud removed.

- [ ] **Deploy serves only the page's own files** — Blocker: soft, Source: developer, Added: 2026-07-25
  - Cloudflare Pages deploying the repo root would publish `knowledge-base/`, `tests/`, `muster/`, and
    `scripts/test.sh` alongside the page. The repo is public by design so nothing leaks, but the
    deployed site should still be the site — a 404-able `tests/artifacts/` is noise on an exhibit whose
    argument is restraint.
  - Resolve at the deploy step: either a build output directory containing `index.html`, `styles/`,
    `scripts/*.js`, and the verification artifacts the page links to, or an exclusion list. Note that
    `scripts/` holds both shipped page JS and the project's test runner.
  - Milestone gate: launch
