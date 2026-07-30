# Wave Review
<!-- File-mediated I/O contract between the autonomous sprint loop and the founder at a wave gate. PM-owned. Tier-2: read on demand only (at a wave gate / on resume), never a startup read. -->
<!-- The loop does NOT parse this file. PM writes the Output block at the gate; the founder writes the Verdict block; PM reads the verdict on resume (muster/scripts/muster-sprint-resume.sh). Keeping human feedback here — not in the orchestration queue — is the seam a future remote/mobile bridge plugs into. -->

> **This is the GATE B packet — the assembled page.** Gate A closed on 2026-07-28; its four rulings
> are durable in `decision-log.md` (DEC-043 through DEC-049) and are not re-opened here. Sprint 1's
> §2 verdicts are likewise closed and live in the decision log.

## Current Wave

**Wave:** Sprint 2, Wave 2 — the whole page built, §1 through §6, plus the brand mark, the spacing
system and scroll-snap.
**Build at:** the autonomous worktree on `sprint/auto-20260725-163930`. The live page is `index.html`
at that worktree root — open that file directly; it runs from `file:` with no server.
**Under review:** HO-026 · HO-027 · HO-028 · HO-029 · HO-030 · HO-031 · HO-032 · HO-033 — all eight
reviewed and accepted before this packet was written. Nothing below waits on a verdict from me.

**What this gate is for:** the page is machine-green everywhere a machine can reach. What is left is
taste, one phone-only measurement no harness on this machine can take, and one honest claim that
needs your word because it is about you and your build, not about pixels.

## Open this first

Open `index.html` at 1280 or wider, in the dark theme, and scroll from top to bottom once without
stopping. Do that before reading anything below. The page is composed to be met that way, and the
first pass is the only one you will ever have that resembles a cold reader's.

Then come back and spend attention in this order:

1. **§1, the first screen** (5 s). One claim, one diagram. Does the headline's self-edit land, and
   does the formation read as an architecture rather than a logo?
2. **§2, the replay** (48 s, all the way through). This is the page's proof. Watch the terminal and
   the narration card together.
3. **§4, the decisions track** (30 s). Four sheets, one screen, sheet 2 cropped as the affordance.
   Does the crop read as "there is more" or as "something broke"?
4. **§5, the two readout cards** (20 s). BODH measured in rust, THIS SITE dashed in ink.
5. **§6 and the footer** (10 s). The curl, the link — and the footer, which is item 1 below.
6. **The whole page again on your phone**, which carries the two asks in the next section.

## Three things need your word

### 1. The footer ships a placeholder, and no sprint step ever owned it

The last string a cold reader meets, immediately after the curl, is:

> PROVENANCE LINE AND LINKS SHIP WITH THEIR OWN SPEC.

That is shell scaffolding rendering as content. On a page whose entire argument is that a governed AI
team ships finished work, a visible TODO in the footer refutes the page more efficiently than any
critic could. **It cannot ship.** I am not asking whether to fix it — I am asking you to confirm the
content, because the fix collides with item 2.

The seed already specifies the footer in full (`product-spec-seed.md` → Footer): an authorship line,
`thinkArhant@gmail.com`, a GitHub profile, and links to repo · queue · handoffs · decision log ·
VERIFY. No design question is open. **Your word needed:** does the footer ship the seed's copy as
written, given item 2 below?

### 2. "8 agents" is the page's own claim, and five roles actually ran

Measured, not estimated. `git log` on this branch, by commit subject:

| role | commits |
|---|---|
| pm | 43 |
| developer | 13 |
| ui-ux | 9 |
| qa | 7 |
| content | 5 |
| **marketing · legal · research** | **0 — never invoked; `agent-context/.populated` has all three null** |

**Five roles built this page. Not eight.** Three places touch this:

- **§1's caption** reads `8 AI agents · 1 operator`, sitting directly under a diagram whose eight
  plates are visibly *role names*. Read as a label for the diagram it is true — Muster has eight
  roles. Read as "eight agents built this," it is false, and that reading is available to a reader
  who has just read a headline about shipping with an AI team.
- **`VERIFY.md` already carries the qualifier** — "The hero's `8 AI agents · 1 operator` describes
  Muster's roster, not the participation in any one build." The Developer caught this himself and the
  sweep asserts the qualifier stays. But the reader meets the page long before `VERIFY.md`.
- **The seed's footer line** — "Specced, written, and reviewed by Muster's AI team — 8 agents, 1
  operator" — is the participation reading stated outright, and as written it is not true of this
  build. Content may tighten founder-supplied passages but may never inflate them (R7), so the fix
  round cannot simply transcribe it.

**My recommendation:** keep §1's caption (it captions the diagram, and the diagram is the roster), and
rewrite the footer line to the true participation — five roles named, or "Muster's AI team, five roles
on this build." The page's credibility comes from being countable, and this is the one number on it a
skeptic can count in thirty seconds using the artifacts we ourselves published. **Your word needed:**
roster framing, true-participation framing, or both stated separately.

### 3. Section snapping, and one find-in-page behaviour — the phone half only

This is the manual check ruled at REQ-007/DEC-042, and it is the only claim in the packet with no
mechanical result behind it. `qlmanage` cannot scroll, so WebKit scroll behaviour is unmeasurable on
this machine. Two asks, both on your iPhone in Safari **with the toolbars showing**:

- **Does section snapping fight your scroll?** Flick down the page normally. It should come to rest
  on section starts and never fight a fling. iOS momentum is exactly where a proximity pull is most
  likely to feel wrong.
- **⌘F / Find on Page for a phrase in the middle of §4 or §5** — say `scarcest` or `commit-days`.
  Does the match land on screen? In Chrome it always does (0 of 165 text leaves land off screen,
  measured). Safari's find may use a different alignment, and that is the one case my ruling below
  leaves unverified.

**And the hard launch blocker only your device can close:** open §2 on the phone, let it scroll into
view fresh, and **watch the whole 48-second playback**. Both layers — the terminal and the narration
card — must stay on screen for the entire chain. `100dvh` under mobile Safari's disappearing toolbars
is the risk, and no harness here can take that measurement. A screenshot of the finished state does
not close it; the guarantee is about *during*.

## Already green — machine-verified, do not spend attention here

Every line below was re-run by me in this session, not read off a handoff summary. Three independent
runners, all clean on the shipped tree:

- `bash scripts/test.sh` — **GREEN both engines, 273/273 Blink + 27/27 WebKit**
- `node tests/qa-independent-audit.mjs` — **exit 0, 108/108**
- `node tests/qa-fullpage-sweep.mjs` — **exit 0, 42/42**

- **Zero external network requests** — 10 loads, all `file:`/`data:`, dark and light and through a
  full playback. I planted a fetching `<img src="https://…">` myself and watched four checks go red
  naming `index.html:131 img[src]` exactly; the permitted §6 anchor stayed permitted throughout. The
  guard is a narrowing, not a deletion, and it works.
- **Contrast** — eight text pairs recomputed from resolved colours in both themes, every one over
  4.5:1 (dark 14.37 / 13.23 / 5.61 / 5.16; light 12.15 / 13.64 / 5.76 / 5.13).
- **Accessibility** — one `h1`, six sections each labelled by a heading they contain, header/main/
  footer siblings, `lang=en`, seven keyboard stops each painting a 2px focus ring under real Tab
  presses.
- **Reduced motion and JavaScript off** — all six sections character-identical to the motion path.
  Two strings differ on purpose and are measured rather than diffed away: the playback control (the
  spec says it is absent because there is nothing to control) and the beat indicator, which parks on
  beat 6, the end state.
- **The headline announces the edited sentence** — the accessible name computes to
  `SHIP A PRODUCT WITH AN AI TEAM.` while the render shows the strike. Read from the AX tree, not
  asserted.
- **§2 fidelity** — all twelve log lines and ten narration slots byte-clean against the corpus, and
  `git` proves no agent has touched your source files: the corpus's whole history is two commits,
  both yours.
- **§5's numbers** — `9.3 h`, `4.8 h`, `4` commit-days and `$147` each appear exactly once on the
  page, all in §5, and all four are diffed against the seed's own Measured data table rather than
  against the copy file that transcribes it. THIS SITE is four ink em-dashes under one
  `measured at launch`, with no numeral in the card.
- **The count-up never lies to a screen reader** — across one roll the visible string takes 76
  distinct states and the announced string takes exactly one. No element on the page carries a live
  region (DEC-052).
- **The curl was really run** — HTTP 200, no redirect, 16377 bytes, and what comes back parses clean
  as bash. Not executed, deliberately.
- **The scroll-snap claims that *can* be measured** — PageDown walks the page to its end in 7 presses
  with no dead press, every section start rests clear of the bar, 200% zoom leaves no horizontal
  scroll and no section's last content stranded.
- **Relationship assertions, not values** — I re-planted two violations myself and watched the
  harness go red, then reverted clean. QA planted eight more across three batches; thirteen checks
  went red on the first.

## Settled without you — stated for visibility, not for a ruling

Three items were mine to rule and are ruled. They are recorded here so nothing is held only in a
session transcript.

- **The snap / reveal trade (OBS-009 + OBS-013) — one ruling: amend the specs, spend no mechanism.**
  Two spec clauses (`page-shell.md` §7.1 A11 and `section-04-decisions.md` §12.16) ask that a
  start-aligned `scrollIntoView()` land its target fully visible. With proximity snapping on it does
  not — the pull carries it up to 180px past. The clauses were written against a hypothesis about how
  find-in-page works, and the measurement says the hypothesis is wrong about the alignment: Chrome's
  find uses centre-if-needed, under which **0 of 165 text leaves land off screen**. The page ships
  exactly one start-aligned mechanism — fragment links — and every fragment target is a section start,
  which is itself a snap position, so `#main` lands at +0px. The failing case is a target deep inside
  a section reached start-aligned, **which nothing on this page does**. Buying that case would mean
  putting script on the scroll position, which is precisely what §7.1 forbids; the cure is worse than
  the disease. The two shipped checks become the contract. The one thing this ruling does not cover is
  Safari's find alignment — hence the ⌘F ask in item 3.
- **A-007's motion count was stale and is corrected** (OBS-003, OBS-002). The assumption still read
  "exactly three live motion elements plus the curl cursor," which DEC-046 retired when the hero
  terminal left §1. Measured off the built page: the pulse motif at two seats, the count-up, and the
  §6 cursor — the two-elements-plus-cursor budget. `foundational-assumptions.md` A-007 and
  `brand-guidelines.md` §4 (both motion and the "eight plates" motif row) are amended to match. The
  page was right; the documents had drifted.
- **OBS-015 — a failure detail that cannot report a failure.** `tests/verify-shell.mjs:3130` prints
  `0 of N gated rests moved` with the `0` as a string literal instead of the measured count, so the
  §2-exemption check's evidence line reads identically whether it passes or fails. I confirmed this
  firsthand: with §2's exemption planted away the check went red **while still printing "0 of 13
  gated rests moved."** The verdict is sound and the assertion is genuinely falsifiable — that plant
  proved both — but the figure HO-029 quoted as evidence is a constant, and I discounted it
  accordingly when accepting that handoff. The zero-request checks print `none external` on a red run
  the same way. One-line fix, routed to the fix round below. Nothing about the page changes.

## Not green, stated plainly

Two things. Neither is a failing check; both are named rather than omitted.

1. **The footer placeholder** — item 1 above. It ships today and must not.
2. **WebKit has no behavioural coverage at all.** Everything computed, timed, emulated or scrolled is
   Blink-only, because `qlmanage` renders at a fixed size and runs no JavaScript. WebKit carries real
   geometry (the pennant sits 0px off the wordmark's baseline in both themes; §4's marks measure
   0.486 of the card padding; §5 renders 14 rust clusters and 4 ink dashes with no JS run at all) —
   but the replay, the count-up, snapping and every mobile measurement have no WebKit result. That is
   the structural reason item 3 asks for your phone, and it does not go away by testing harder here.

## Verdict

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

### Gate B — 2026-07-29

**Three things need your word**, plus anything the scroll-through turns up.

1. **Footer** — the seed's copy as written, or amended for item 2?
2. **"8 agents"** — roster framing, true-participation framing, or both stated separately?
3. **Phone** — does snapping fight your scroll; does Find land its match; and do §2's two layers stay
   on screen for the whole 48 seconds?

**Status: IN PROGRESS — first pass recorded 2026-07-29 ("feedback so far"); the phone's §2
playback watch and find-in-page check are still outstanding.**

**Findings:**

**F-B1 — Horizontal alignment is not a system. UI/UX decides.** The formation is not centered
against the THIS SITE strip below it, nor against the headline above. Founder ruling: UI/UX decides
the horizontal alignment of **all elements on the page** — one system, not per-element patches.

**F-B2 — Scroll-snap does not read premium. UI/UX decides between exactly two outcomes:**
(a) **remove it entirely**, or (b) **full section paging** — one section per view, a scroll moves
the whole section to the next/previous, the new section takes the whole space, with a small
indicator that there is more. No middle state. Evidence for (a): §5 does not fit one screen top to
bottom, and the phone scroll feels wrong. Whichever way, the phone experience is part of the
ruling.

**F-B3 — §4's cropped second card reads broken, not inviting. UI/UX designs a premium affordance**
that tells the reader to move horizontally — the current half-card reads as "something broke."
Related, from the phone: **§4 stacked vertically makes the section far too long** — the phone
treatment is re-ruled together with the affordance.

**F-B4 — §4 decision 1's trade-off overstates.** "Agents never talk directly — every question
between roles costs a file and a session" is not quite true: agents do communicate through
agent-request files. Content rewords so the mechanism is stated smartly, not denied. (The
underlying fact is the strength: communication is written, routed and auditable — not a chat.)

**F-B5 — The overnight run is a checkable fact worth carrying.** Founder: the system works through
the night after a sprint is planned — the last driver ran ~23:00 to ~05:00 while he slept. Content
judges where it earns a place (likeliest §4 decision 4, whose subject is attention). **Guardrail
unchanged (DEC-043): a checkable fact stated plainly, never a flaunt** — "runs while the operator
sleeps" is measured by committed run logs; "works tirelessly all night" is marketing.

**F-B6 — the VERIFY chip's production target.** Ruled (PM answer, founder aware): the chip keeps
working after launch by pointing at the **site repo's GitHub blob URL** for `VERIFY.md` — a
rendered, readable page; an href click is permitted under A-004 (no runtime fetch). The relative
`VERIFY.md` href would serve raw markdown on a static host. Needs the public repo URL (below), and
lands with the footer build.

**Settled: "8 agents" ships as roster + true participation.** Founder accepted the
recommendation: §1's caption stays (it labels the roster diagram); the **footer** states the true
participation — five roles on this build. Content writes the line; the seed's "8 agents, 1
operator" footer phrasing is superseded by the founder for this build's truth (the DEC-043
mechanism: the author amends at his gate).

**Footer — what PM needs from the founder (item 1):**
1. The **public URL of this site's repo** (for the footer links — repo · queue · handoffs ·
   decision log · VERIFY — and F-B6's chip target).
2. Confirm **`thinkArhant@gmail.com` ships on the page** (it is in your seed's footer spec;
   published email invites scraping — your call to keep or drop).
3. The participation line's shape: Content drafts against "five roles on this build" per the
   settled item above — one word from you approves the draft at the re-gate, or name the exact
   phrasing now if you have one.

<!-- Founder: add any remaining findings below; the phone checks from item 3 are still open. -->

---

**Already queued for the fix round regardless of your verdict** — recorded so resume's PM does not
have to rediscover them:

- The footer placeholder (item 1), which needs Content for the strings and Developer for the build.
- `tests/verify-shell.mjs:3130` — replace the literal `0` with the measured `r.moved.length`, and give
  the zero-request checks the same treatment (OBS-015).
- `page-shell.md` §7.1 A11 and `section-04-decisions.md` §12.16 — amend to the two checks that
  shipped, per the ruling above. UI/UX owns both files.
- `section-05-copy.md` §6's R4 line says "THIS SITE is three em-dashes"; the table it describes
  carries four since DEC-048 added the cost row. The table is what ships and what the harness parses,
  so nothing is wrong on the page — the prose describing it is stale (OBS-011). Content owns it.
- `section-06-copy.md` §4.2 says §1's interactive inventory is two elements; `section-01-hero.md` §12
  rules it at one, and the build asserts one (OBS-007). Content owns the aside.

**Any fix round must end with a scoped QA re-run** of the relationship assertions plus cross-engine on
whatever was touched. Three Sprint-1 fix rounds each satisfied their stated criterion and broke
something adjacent; a fix chain with no verification behind it is how that happened.
