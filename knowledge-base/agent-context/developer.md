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

**Sprint 2 — six steps. Two blocks of work either side of Gate A.**

### Wave 1

**1. Shell — spacing system and brand mark → HO-024.** Runs before the Gate A sample so the sample
renders in final tokens, and it retires the §2 defect class before a gate is spent (DEC-034).

**This step re-bases existing assertions; it does not only add new ones.** Moving the tick off
`border-inline-start` and decoupling the hanging indent breaks roughly ten checks that currently pass —
`verify-shell.mjs` at 676, 709 (tick read via border colour), 617/783/811/1021 (**accent-pair checks that
hardcode `12`** — the value-not-relationship anti-pattern DEC-032 exists to end), 716 and 997 (the
negative `text-indent` and the hanging indent), 372 (`tagMark` asserted 8×8, but the pennant is ~1:1.5),
and 880/1126/1186/1268/1298 (column counts computed by subtracting `border-inline-start-width`, so
removing the border silently widens the region by 2px against the **37-column floor**). Plus
`qa-independent-audit.mjs:735,825-828`, which asserts `/^2px/` on the tick — **and that file is not run
by `scripts/test.sh`**, so run it separately or QA finds the red three steps later.

Re-base each so it still fails when its relationship is violated. **Never delete an assertion.** Preserve
the 12px equality invariant and the 37-column floor; prove both.

**2. Gate A sample render → `samples/gate-a.html`, HO-025.** Self-contained, inline CSS. **Add no file
under `styles/` or `scripts/`** — `verify-shell.mjs:527` globs those directories, so a new file there
joins the shipped set and the zero-request surface. Report each headline candidate's **computed
accessible name** mechanically via `Accessibility.getFullAXTree` (`tests/lib/cdp.mjs` exposes a raw CDP
`call`), not by assertion. Scope it to the headline and one spec-sheet — no header chrome, no separators.
This never ships.

### Wave 2

**3. §1 and §6 → HO-026.** **Read the ruling in your queue step before starting**:
`verify-shell.mjs:533` fails any shipped file containing an `http(s)` URL, and §6 must ship the GitHub
`curl` and one GitHub link. **Amend the check, never delete it** — a URL as inert text or a clickable
`href` is permitted; `src`, `@import`, `url()`, `<link>`, `<script src>` stay banned. A-004's claim is
about what the page *requests at runtime*, not what it displays. Deleting the guard would remove the
mechanical protection on the page's most load-bearing claim.

Also here: verify the chosen headline's computed accessible name from the AX tree; decide the count-up
cells' **`aria-live` posture** and re-verify against real page cells rather than the fixture; and **write
`VERIFY.md`** at repo root — a hard launch blocker, and the §1 chip 404s without it.

**4. §3 and §4 → HO-027.** §4 must render **as approved at Gate A** — divergence from the judged sample
is a defect. Title sentence, category, four rows, and the no-date stamp case per spec. §3's prose at
`64ch` (DEC-023).

**5. §5 → HO-028.** Readout cards on the shell motif; THIS SITE dashed; count-up is motion element 3,
already in budget; same `aria-live` posture as §1.

**6. Scroll-snap → HO-029.** Last deliberately. Proximity snapping, never JavaScript scroll-jacking;
`scroll-padding-block-start` against the 48px sticky bar; keyboard paging, find-in-page and 200% zoom
each **asserted in the harness**, not claimed; **§2 exempt** with its playback and phone budget verified
untouched.

**Every step**: zero runtime network requests, cross-engine WebKit **and** Blink before filing, all
motion `prefers-reduced-motion`-gated with complete content, `scripts/test.sh` green **and**
`qa-independent-audit.mjs` exiting zero. Extend the existing harness, never add a second runner
(DEC-020). Never run `muster-meter.py`; never write a THIS SITE metric.

**If blocked**: never set `Role: halt`. File the blocker addressed to PM and re-point `## Next Step` to a
`Role: pm` assessment step.
