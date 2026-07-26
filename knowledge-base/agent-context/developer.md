# Developer Context — Muster website
<!-- PM-MANAGED — Only the PM modifies this file. Agents read it at startup for filtered product context. -->

## Product Context

**Product**: Muster website — the public one-page site for Muster, the open-source multi-agent
framework for Claude Code. It proves with measured data and real build artifacts that one person plus a
governed AI team ships real products, and ends in a single `curl`.

The page is an exhibit of what Muster produces. Build quality is the argument.

- **Tech stack**: static HTML/CSS + minimal vanilla JS. **No framework, no build system** beyond simple
  assembly, no webfonts, no package manager required.
- **Architecture**: single page, no backend, no storage, no auth, no data layer. Assets self-contained —
  inline SVG, CSS-generated texture.
- **Hard constraint — zero external network requests at runtime** (A-004). No webfonts, no CDN, no
  analytics, no beacons. QA asserts this mechanically; it is a published product claim, not a
  preference. It also means the page carries no instrumentation — that collision resolves in favour of
  the constraint.
- **Type**: system monospace (SF Mono/Menlo) for display, labels, and system chrome in tracked
  uppercase; system-ui humanist sans for reading passages; metrics in tabular mono, rust.
- **Both themes first-class** (A-006), twelve exact palette values, contrast ≥4.5:1 body text in both.
- **Cross-engine is a known failure class here**: verify WebKit **and** Blink at every visual milestone
  (`qlmanage`/Safari + headless Chrome). Inline-SVG/WebKit divergence has bitten this project's sibling
  build before — it is not hypothetical.
- **Motion**: exactly three live elements plus the curl's blinking cursor. All
  `prefers-reduced-motion`-gated, and **the reduced path renders complete content**, never a degraded
  subset.
- **Accessibility**: semantic landmarks, real focus states, contrast ≥4.5:1 body text both themes.
- **Deploy**: Cloudflare Pages from this repo. Domain arrives from the founder mid-build; the GitHub raw
  URL is the fallback in the curl until then.
- **Repo is public from commit one.** Commit subjects follow `<role>: <outcome>` — the log is part of
  the product.

### Rules that will trip you if unread

- **Founder-authored files are read-only** (A-001): `product-spec-seed.md`, `bodh-sprint4-corpus.md`,
  `design-specs/direction-reference.html`. Quote, verify, and build from them; never edit, reformat,
  extend, or regenerate them. QA treats a modification as a blocking finding.
- **Never run `muster/scripts/muster-meter.py`** (A-002). Build telemetry is founder-supplied and
  committed at milestones. No step generates a metric.
- **`direction-reference.html` is not a build input** (A-003). Build from `design-specs/web/page-shell.md`.
  The reference contains `#abae90` (not a locked palette value) and `https://muster.build/setup.sh` (a
  host that does not exist) — inheriting either would ship a defect.
- **Never write a THIS SITE metric.** Those stay dashed until launch (A-005).
- **`.gitignore` is correct as written.** `.muster-sprint-logs/*.jsonl` excludes only the bulky
  transcripts; `.metrics` files and run logs in that directory already commit. Do not "fix" it.

### Cross-Cutting References

- `knowledge-base/product-spec.md` §5 — technical constraints
- `knowledge-base/product-spec-seed.md` → "Tech, deploy, telemetry practice" and "Design direction"
- `knowledge-base/foundational-assumptions.md` — A-001 through A-005 all bind your work
- `knowledge-base/design-patterns.md`, `knowledge-base/design-system-reference.md`

### Cross-Agent Dependencies

- **You depend on UI/UX**: `design-specs/web/page-shell.md` and `design-specs/web/section-02-replay.md`. Implement everything in them; a task's listed criteria are non-exhaustive examples and never override the handoff.
- **You depend on Content**: `design-specs/web/section-02-narration.md`, used verbatim.
- **You provide to UI/UX and Content**: `design-specs/web/section-02-beat-inventory.md` — the corpus mapped to beats with measured intervals. Both of them pace their work against it.
- **You provide to QA**: the built artifacts, plus the beat inventory QA uses as a fidelity baseline.

## Project Skills
<!-- PM-MANAGED: Product-specific skill files that supplement muster methodology skills. -->

None yet for this role.

## Current Tasks
<!-- PM-MANAGED: PM updates at sprint planning, task completion, priority changes -->

### 1. Bodh corpus verification + beat inventory — Priority: HIGH, Effort: S, Platform: web

**Deliverable**: `knowledge-base/design-specs/web/section-02-beat-inventory.md`; HO-001 in `agent-requests.md`.

Map `bodh-sprint4-corpus.md` onto the six §2 beats in `product-spec-seed.md` §2, and derive the pacing
data downstream steps need. The corpus already ships a "Terminal-line inventory" — do not duplicate it.
Your value-add is the beat mapping, the interval arithmetic, and an independent consistency check.

**Dependencies**: none — the corpus is in the repo.

**Acceptance criteria**:
- **Read-only on the corpus.** No edits, no reformatting, no cleanup, no extension
- Every corpus terminal line either assigned to a beat or explicitly listed as unused — nothing silently dropped
- Timestamps preserved verbatim; inter-beat intervals shown as derived, with the arithmetic visible
- Coverage report per beat: supported by which lines, or reported as a gap. **Gaps are reported, never filled**
- Independent consistency check recorded: session durations against the chain total, session timestamps against the terminal inventory, and the corpus's own totals
- Zero conversation content surfaced — queue lines, handoffs, decisions, timestamps only

**Known mapping** (verify, don't assume): the corpus's 8 sessions collapse onto the seed's 6 beats, with
sessions 4–6 (content, legal, marketing) forming the seed's step 4.

**HALT if**: the coverage report finds a beat the corpus does not support. File the report as-is, re-point
`## Next Step` to a `Role: pm` step naming the unsupported beats, and stop. Do not invent, infer, or
approximate a line or timestamp — a fabricated line refutes the page's central claim.

**Key refs**: `bodh-sprint4-corpus.md` · `product-spec-seed.md` §2 + Verification ·
`muster/team/developer/skills/generic/plan-first-discipline.md`

**Status**: DONE — HO-001 accepted, trued up to corpus v1.1 as HO-009 and accepted 2026-07-25. The
inventory is final: chain 3858 s, B6 486 s, both endpoints measured at source.

---

### 2. Page shell implementation — Priority: HIGH, Effort: L, Platform: web

**Deliverable**: `index.html`, `styles/`, `scripts/` — shell only, no section content. HO-003.

**Dependencies**: `design-specs/web/page-shell.md` (UI/UX, HO-002), approved at the founder gate.
**The spec is now final and PM-accepted** — the Wave 1 amendments landed as HO-010 (accepted 2026-07-25).
Build from the file as it stands; nothing in it is open. Two things changed since the gate: **no theme
control ships** (§9 — build the theme *system*, both palettes and `prefers-color-scheme`, and keep the
`:root[data-theme]` attribute so QA can force a theme, but put no control in the UI), and §10's motion
budget is closed at three elements plus the curl cursor, with the §2 replay explicitly outside it.

**Acceptance criteria**:
- Both palettes at exact hex values, both themes first-class; mono display / humanist-sans reading split
- Grain texture + top vignette CSS/SVG-generated; stencil section tags, hairline rules with machined end-ticks, registration marks, OPERATIONAL status bar
- **Zero external network requests at runtime**, evidenced
- Matte surfaces, sharp corners, opaque cards; reading column ~64ch; semantic landmarks, real focus states
- All motion reduced-motion-gated, reduced path renders complete content
- WebKit and Blink verified before filing
- Implement everything in HO-002; the above is non-exhaustive

**Key refs**: `design-specs/web/page-shell.md` · `product-spec-seed.md` → Design direction + Tech ·
`muster/team/developer/skills/web/{web-best-practices,web-accessibility,web-performance-engineering}.md`

**Status**: DONE — HO-003 accepted 2026-07-25. 79/79 Blink + 7/7 WebKit, re-run at review. One
shell-level fix carried forward into task 3 rather than reopening this one: `.instrument`'s phone inset
(DEC-021.1).

---

### 3. §2 replay implementation — Priority: HIGH, Effort: L, Platform: web

**Deliverable**: the §2 section built into the shell, corpus wired into the terminal layer. HO-006.

**Dependencies**: beat inventory (HO-001), replay spec (HO-002), narration (HO-005, PM-approved).

**Acceptance criteria**:
- **Founder criterion**: the replay must stand on pacing and plain-English narration alone, independent of the visual frame. The founder judges timing and narration with styling mentally subtracted
- Terminal layer renders corpus lines verbatim, labelled "condensed from the real build log" — nothing staged, embellished, or invented
- Narration synchronized to the beats per the replay spec's timing; ends on `bodh.day`, live
- Scripted HTML/CSS/JS only — no asciinema, no tooling dependency, zero external requests
- Reduced-motion path renders complete content
- WebKit and Blink verified before filing, within the ceiling below
- Implement everything in HO-002 and HO-005; the above is non-exhaustive
- **§2's chrome strings come from `section-02-narration.md` §5 (DEC-022).** That file is the authority
  on §2 copy — h2, terminal label, live indicator word, totals strip, controls, beat display names. The
  replay spec's wireframes were cascaded to match it; if any third spelling of a string turns up, the
  narration file wins. Narration slot text is final and rendered verbatim
- **The chain-totals strip's value scale is per-viewport (DEC-022.3).** `--text-readout` at
  `≥ --bp-wide`; `--text-micro` below it. §7.1 prices the whole strip at `2 × (--text-micro 11px × 1.5)
  = 33.0px`, and at 375px `--text-readout` clamps to 24px — one value line alone would be 24px, making
  the strip 40.5px against a budget with 5.1px of slack, which busts the 553px core. Applied to
  annotation 7 already; build to the file
- **Keep the mobile strip at two lines — the lever is tracking, not copy (DEC-022.4).** Line 1 is 43
  characters: in `--font-mono` at 11px that is ~284px bare but ~350px with `--track-micro` (0.14em),
  against ~327px of content width at 375px. Set tracking on the value line within the micro treatment
  and assert the rendered line count in the harness. Do not shorten the string — it is accepted copy
- **Fix `.instrument`'s phone inset while you are in these files (DEC-021.1).** Below `--bp-wide` the
  total inset must not exceed `--gap-flow` (24px a side); desktop keeps `--gap-block` (48px). Today it is
  a flat 48px everywhere, so a 320px phone spends 96px of a 272px card on padding and the prose column is
  174px. No second named breakpoint — `page-shell.md` §7 keeps `--bp-wide` as the only one, and a fluid
  `clamp()` between the two rhythm multiples both satisfies that and avoids a cliff at 960px. Extend the
  existing harness with the assertion (DEC-020). *This is the OBS-001 you deliberately left alone because
  §7.1's budget is token-derived — that constraint does not hold: §7.1 budgets its own insets (12+12
  terminal, 24 card), and at 48px its core would compute to 568.4px against a 553px viewport. §2 is
  unaffected by the change.*
- **The WebKit ceiling is measured, not a hypothesis (DEC-021.4).** `qlmanage` executes no JavaScript and
  renders at a fixed ~1024² regardless of the requested size. WebKit's evidence for §2 is therefore the
  no-JS/reduced-motion complete transcript — twelve lines verbatim, L12's treatment, the §9 emphasis
  system, chrome, grain and vignette parity, both themes — which is load-bearing because DEC-017 item 4
  makes playback an opacity reveal over a complete DOM. Everything else is Blink evidence and is labelled
  as Blink evidence in HO-006. Do not spend the session fighting it and do not install a browser
  (DEC-020)

**HALT if**: the corpus lacks a line the replay spec calls for. Do not invent, paraphrase, or
reconstruct it. Re-point `## Next Step` to a `Role: pm` step naming the missing line and stop.

**Key refs**: `design-specs/web/section-02-replay.md` · `design-specs/web/section-02-narration.md` ·
`bodh-sprint4-corpus.md` · `design-specs/web/section-02-beat-inventory.md` · `product-spec-seed.md` §2

---

## Current task — rebuild §2 to the amended spec and copy (2026-07-26)

`section-02-replay.md` and `section-02-narration.md` are both final and accepted (DEC-027). Build from
them; where any other file spells a §2 string differently, the narration file wins.

**Two changes, and only two.** Timing is untouched — the 48.00 s schedule, the ten reveal offsets and
the 4.80 s gate hold are not in scope.

1. **SP7's string changed** (DEC-024): *"The operator planned the sprint, left the agents running, and
   returns to a deploy-ready site."* Render it verbatim from the narration file — never retyped. The
   built page still carries the superseded line, so the independent audit reds on SP7 until this lands.
2. **The phone terminal wraps and the totals strip moves** (DEC-026, amended by DEC-029).
   `white-space: pre-wrap` with a **1ch** hanging indent (`padding-inline-start: 1ch; text-indent: -1ch`)
   at **every** viewport — it is inert on desktop, where no line reaches the column. The 12px that used
   to be the line's other half now sits on the log as the accent gutter, so a first character does not
   move. `overflow-wrap: break-word` as a backstop only.
   Nothing scrolls horizontally anywhere: not the terminal's region, not the page body, at any width.
   The chain totals strip sits **immediately below** the playback core on mobile, not inside it — that
   is what buys the 45.0px the wrap costs. Desktop keeps it in the two-column core.

**Numbers you will be measured against** (current — the log's leading has split, so every figure that
used a uniform 24.7px line box is retired): fixed core **379.4px**, unchanged; below `--bp-wide` a row
inside an entry is **19.5px** (`--text-terminal` × `--lead-micro`), an **entry box is 39.0px**, and the
**entry pitch — box plus the `--gap-hairline` separator — is 51.0px**. At 375 × 553 the window is
**3 whole entries** in 141.0px of line region, core used 520.4px, slack **32.6px**. The guarantee floor
is **469.4px** of visual viewport height. The log carries a 12px accent gutter at every viewport and the
hanging indent is **1ch**, giving **39 first-row columns / 38 continuation** at 375px. Desktop keeps
`--lead-terminal` and gains no separator.

**The horizontal floor is 37/36 columns**, not whatever a viewport happens to give — verified by
simulating the corpus, where all of L1–L11 hold at two rows down to exactly that and L3 (74 characters)
breaks first below it. The floor has no rounding margin in it, and 360px sits 5.7px above it — under one
column — so **measure the row count at 360 / 375 / 390 / 393 rather than trusting the table.** If any of
L1–L11 sets three rows, the gutter yields — in both layers together, so §9.1's single inset survives —
never fidelity and never the entry count.

**The one trap, wearing a new number.** 51.0px is a *ceiling*, exactly as 49.4px was: L12 sets a
different box (1.25rem, outside the chain) and below 375px a chain line is three rows. Build §7.1 rule
4's mechanism — quantise the flex remainder down to whole **entries** by measurement — so the count
falls out of real heights. The window must come to rest on an entry's own box edge and never inside a
separator, which would show a fragment of gap at the top and read as a clipped entry.

**Three implementation facts the spec states as outcomes and the stylesheet gets wrong by default.**
(1) The desktop rail's inset has two sources: `.narration`'s padding *and*
`.replay[data-state] .narration__list { inset: var(--gap-flow) }`. The second wins while playback runs,
so changing only the padding fixes the static transcript and leaves the live chain at 24px. (2)
`--line-box` in `.replay` is `--text-terminal × --lead-terminal` and is wrong below `--bp-wide` the
moment the leading splits. (3) The continuation indent halves, 2ch → 1ch, as the entry cue strengthens —
so the indent no longer stands alone and the separator has to be asserted as its own property.

**Two landscape figures in the spec are derived, not measured, and are yours to confirm**: the chrome
bar at a 324px column (budgeted conservatively at two lines / 58px; it may fall to 41.5px) and the
worst-case narration slot at ~29 characters per line (budgeted 7 lines / 228.3px). Both have slack above
them; if either exceeds it, §7.1's priority order drops the beat indicator first. Landscape's first row
is derived at 40 columns with under a tenth of a column of headroom — §12 binds at the 37 floor and asks
for the measured number, so a 39 there is margin spent, not a defect.

**The totals strip's tracking is spec, not styling.** `0.02em` on the value line, not `--track-micro` —
at the wide tracking the 43-character string sets 351.7px against a 327px column and wraps to a third
strip row. The scope label keeps `--track-micro`.

Fidelity is unchanged and structurally so: a soft wrap inserts and removes no character, so all twelve
lines still diff byte-clean. Reduced-motion and no-JS paths still render the complete transcript.
`bash scripts/test.sh` must be green on both engines — extend it, never add a second runner (DEC-020).
