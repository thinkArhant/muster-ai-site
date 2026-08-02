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

- [x] **THIS SITE measured numbers replace dashes** — RESOLVED 2026-08-01, Source: pm, Added: 2026-07-24
  - The founder ran `muster-meter.py` once over both project paths and the snapshot is committed at
    `telemetry/2026-08-01-meter.md`. §5's THIS SITE card reads **`7.5 h`** under `OPERATOR ATTENTION`
    — `7h 30m` converted exactly to decimal hours, matching the format of BODH's `4.8 h` in the same
    card because the two cells sit under one key.
  - Comparable by construction: the same instrument and the same definition produced both figures —
    the meter's operator-attention metric is gap-capped time over human-typed prompts only.
  - `measured at launch` now renders nowhere on the page, and §5 carries no unmeasured value.
  - **No cost figure from that run is published.** `claude-opus-5` returned `UNPRICED`, so the run's
    `$365.92` covers Fable only against 4,211 unpriced Opus calls. The snapshot file carries that
    warning; `VERIFY.md`'s driver-log floor is untouched and remains the site's published cost
    material.

- [x] **The footer ships real copy, not the shell placeholder** — RESOLVED 2026-08-01, Source: pm, Added: 2026-07-29
  - The placeholder is gone. The footer ships four blocks: one closing sentence, the six-link
    receipts row, and the GitHub profile as the contact path. No email renders anywhere on the page.
  - The sentence states true participation rather than the seed's roster line, which five roles
    could not have been transcribed into: *"Specced, written, and reviewed by Muster's AI team — 5
    of 8 agents, the other three never invoked, 1 operator — on a framework designed and built by
    Kanwar Sandhu, solo, shipping his own products with it."* Its authorship clause is scoped to the
    **framework**, which is the claim that is true of it.
  - Asserted, not eyeballed: the string is parsed out of `footer-copy.md` and compared byte-for-byte
    against the page, the participation count is re-derived from `git log`, and two nowrap units keep
    the founder's name whole at 375 and 320.

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

- [x] **§2's mobile layout checked on a real iPhone** — RESOLVED 2026-07-31 (DEC-063), Source: pm, Added: 2026-07-25
  - The founder ran it at the final gate: iPhone, Safari, toolbars showing. **The full 48-second
    playback held both layers on screen throughout.** The `100dvh` residual did not reproduce —
    the budget's widened slack (32.6px at 375 × 553, DEC-026 + DEC-029) was enough. Find on Page
    lands its matches on screen and scroll feel is good, including §4's sideways track.
  - This was the round's last hard launch blocker and the one measurement no harness on this
    machine could take. The original entry follows, for the record of what was at risk.
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

- [ ] **The four receipt permalinks resolve on github.com after the final push** — Blocker: hard,
  Source: pm (re-gate stress test), Added: 2026-07-30
  - The footer's queue · handoffs · decision-log · VERIFY links are pinned to commit SHAs chosen on
    the sprint branch (F-R10, demo-in-itself criterion). Those SHAs reach the public repo **only if
    the final merge preserves history — a squash merge 404s all four silently.**
  - Resolve at launch: merge with history (merge commit, not squash), push, then the founder
    click-checks all four links once. If squash is preferred, the links must be re-pinned to
    post-merge SHAs before deploy.
  - **The harness cannot catch a wrong SHA that both files agree on**, proven by planting one:
    `verify-shell.mjs` checks the six receipt URLs against `footer-copy.md`, and the sweep's
    `git cat-file` existence check covers the **§1 chip only** — so a fabricated SHA written into
    the page *and* its copy file together passes 295/295 and 43/43 while 404ing for every reader.
    That is exactly the edit a re-pin makes. Two ways to close it, and the first is cheap: extend
    the sweep's `refExists` check to all four pinned receipts (ref exists as a commit **and** path
    exists at that commit — the check that catches a pin to a commit that never held the file), and
    keep the click-check as the second, because only a real fetch proves reachability after a push.
  - Milestone gate: launch

- [ ] **The texture is invisible to every contrast check** — Blocker: soft, Source: qa/pm (DEC-068),
  Added: 2026-08-01
  - Both contrast probes resolve a background by walking ancestors for a `background-color`, and
    `.texture` is a fixed **sibling** — so no check has ever measured contrast as it actually
    composites. Proven by planting `--grain-alpha: 0.90`: the sweep returned **45/45 with both
    contrast checks green** on a value that would destroy ground legibility.
  - **The bound, which is narrower than the finding alone suggests**: the alpha *token* IS guarded
    (`verify-shell` caps it at 8% dark / 4% light), so the planted value would have gone red there.
    What is exposed is a texture change that legitimately passes the alpha cap while degrading real
    contrast — a different filter, pigment or frequency at the same alpha.
  - Not a launch blocker: today's composited ratios clear 4.5:1 in both themes on two independent
    measurements (5.14 dark / 4.82 light governing, the conservative of the two).
  - Fix shape for whoever closes it: composite the fixed-position texture into the sampled pixel
    rather than resolving a background colour from the ancestor chain.
  - Milestone gate: post-launch

- [ ] **`section-01-copy.md` is parsed by no harness** — Blocker: soft, Source: qa (DEC-068),
  Added: 2026-08-01
  - Five of the six copy specs are string-coupled to `verify-shell.mjs`; this one is not, and it is
    the one that drifted silently from the shipped page until a human read it.
  - Accepted for launch on its small surface — §1 holds an eyebrow, a headline, plate names, a
    scope label, a chip and the curl, and every one is asserted against the page elsewhere.
  - Milestone gate: post-launch

- [x] **VERIFY's receipt and the §1 chip point at `blob/main/VERIFY.md`** — RESOLVED 2026-07-31,
  Source: pm (DEC-061), Added: 2026-07-31
  - Both seats moved together and are asserted byte-equal, so the harness goes red if only one moves.
  - The other three receipts pin to SHAs because their demo moment is in the past. VERIFY's demo
    moment is the launch state, which `main` is by construction — a live link needs no re-pin step a
    later session could forget, and `blob/main` survives a squash where the pinned three do not.
  - Whether it resolves on github.com after the push is tracked by the receipt-permalinks item above,
    which is the founder's click-check; nothing local can prove reachability.
