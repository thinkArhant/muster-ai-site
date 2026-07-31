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

**Status: CONSUMED 2026-07-30 — every finding below (F-B1 through F-B6) was fixed, reviewed and
resolved. The re-gate packet is at the bottom of this file, and the verdict you write goes there,
not here.**

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

**Founder answers, 2026-07-29 — the verdict's findings are complete (DEC-056):**

1. **Repo URLs supplied**: this site `https://github.com/thinkArhant/muster-ai-site` · the
   framework `https://github.com/thinkArhant/muster-ai`. These feed the footer links and F-B6's
   chip target (`https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md`).
2. **No raw email on the page** — founder ruling, amending his own seed's footer spec: the GitHub
   profile link is the contact path; the profile carries the email for anyone who wants it. No
   scraper bait, one click.
3. **The participation line is Content's call, no gate** — the founder pre-approves whatever
   Content writes against "five roles on this build" (pm · developer · ui-ux · qa · content ran;
   marketing · legal · research did not — measured from this branch's commits).
4. **The overnight fact is delegated**: the agents decide whether and where the
   works-while-you-sleep fact earns a place. Guardrail unchanged — R2 bans wall-clock framing, so
   the mechanism ("the run doesn't need the operator present; gates are the only places it waits")
   is the claimable form, evidenced by night-stamped commits in the public repo. Declining is a
   valid outcome.

**Deferred to the re-gate, deliberately**: the three phone checks (§2's full 48 s playback with
toolbars — the hard launch blocker; find-in-page; snap feel *if* snapping survives F-B2). Checking
them once, on the fixed page, spends the founder's phone pass where it counts.

**ROUTED 2026-07-29 (DEC-056)**: the fix round is in the queue — Content HO-034 → UI/UX HO-035 →
Developer HO-036 → QA scoped re-run HO-037 → PM review, which promotes the re-gate. The founder
runs `muster/scripts/muster-sprint-run.sh` directly. If a resume-spawned PM reads this: the
verdict is consumed — verify the queue matches and change nothing.

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

---

# RE-GATE — Gate B, second pass (2026-07-30)

**Open `index.html` at 1280 or wider, dark theme, and scroll top to bottom once.** Your six findings
are all closed; what follows is one line each on what changed, then the three phone checks you
deferred on purpose. Two of the six were answered in a way you may want to argue with, and those two
are marked. Nothing else here needs you.

## What changed, per finding

- **F-B1 — alignment is now one system.** The formation no longer sits on its own axis: it spans the
  container, so the hub's centre *is* the page's centre. I measured it on the shipped build, not on
  the proposal — **hub centre − axis = 0.0px at 1280 and at 1440**, and the left rail is a single
  number for every block on the page (128 at 1280; 24 at 375, footer included). Reverting the
  diagram to its old intrinsic width reproduces what you saw, at **−173.81px**.
- **F-B2 — section snapping is gone.** The document scroller computes `none`, no section declares a
  snap alignment, and scrolling to an arbitrary mid-section offset stays exactly there (I scrolled to
  1337px and it rested at 1337px). **↯ One scoping call to check:** §4's horizontal track keeps its
  own left-right snap — it is what makes the sheets rest composed instead of parked mid-crop, and it
  is part of the F-B3 fix. If you meant "entirely" to cover that too, say so; it is one declaration.
- **F-B3 — §4's cut now lands on the physical screen edge.** The 128px strip of bare ground that made
  sheet 2 read as broken is gone: the track spans the viewport, sheet 1 still rests on the rail, and
  sheet 2 runs off the frame. Confirmed in **both engines** — WebKit shows the same. Each sheet also
  carries a `SHEET n OF 4` ordinal, so a reader knows there are four. **↯ The phone half went the
  other way, and you should know it:** you said the stacked §4 is far too long, and it is now
  *longer* — **3042px at 375**, against the 2957 you judged, the ordinal's cost. Every shrinking
  alternative was measured and rejected because each hides content (the accordion hides 12 of 16 rows
  from the Find-on-Page you are about to test). The stack's problem was judged to be anonymity, not
  height. Argue with that if you disagree — it is a taste call answered with measurement, not a fix.
- **F-B4 — decision 1's trade-off now states the mechanism** instead of denying it: *"Questions
  between roles travel as files — written, routed, auditable — and each costs a session."*
- **F-B5 — the overnight fact ships as mechanism**, in decision 4: *"The run doesn't need me present
  — it waits only at gates, for a written verdict."* No hour span, no wall-clock, anywhere in the
  shipped set — I grepped for it.
- **F-B6 + the footer — the placeholder is gone and the footer ships true.** *"Specced, written, and
  reviewed by Muster's AI team — 5 of 8 agents, 1 operator. PM, Developer, UI/UX, QA, and Content ran
  this build; Marketing, Legal, and Research were never invoked."* I re-derived that from `git log`
  rather than trusting it: **pm 49 · developer 14 · ui-ux 10 · qa 8 · content 6 · marketing 0 · legal
  0 · research 0.** Six receipt links, the framework link, and your GitHub profile as the contact
  path. **No email anywhere in any shipped file** — swept file-wide, including `mailto:`. The VERIFY
  chip points at the blob URL and is asserted byte-equal to the footer's VERIFY receipt, so the two
  cannot drift apart.

## The three phone checks — the only thing I need from you

On your iPhone, in Safari, **with the toolbars showing**:

1. **§2's full playback — the hard launch blocker.** Let §2 scroll into view fresh and watch the
   whole **48 seconds**. Both layers — the terminal and the narration card — must stay on screen for
   the entire chain. `100dvh` under disappearing toolbars is the risk and no harness on this machine
   can take that measurement. A screenshot of the end state does not close it; the guarantee is about
   *during*.
2. **Find on Page** for a phrase mid-page — `scarcest` or `commit-days`. Does the match land on
   screen? Chrome always does (0 of 165 text leaves land off screen); Safari's alignment is the one
   case my ruling leaves unverified.
3. **Scroll feel** — snapping is gone, so this is now just "does the page scroll like a page." Flick
   through §4 sideways too, since its track is the one thing that still snaps.

## Already green — do not spend attention here

All three runners re-run by me on the shipped tree, cold: `scripts/test.sh` **GREEN both engines,
282/282 + 27/27** · `qa-independent-audit.mjs` **exit 0, 108/108** · `qa-fullpage-sweep.mjs` **exit 0,
42/42**. And I planted two violations myself rather than reading anyone's plant list: a one-word drift
in the footer's team line turned exactly one check red naming the team line, and zeroing the track's
bleed turned two red printing *"ground between the track's end and the screen: 128px"* — your dead
strip, reproduced by the harness as a measurement. Tree reverted clean after each.

## Carried, so nothing is rediscovered later

Two durable specs describe a build that has moved (DEC-058, ruled — no pixel changes, not launch
blockers): `footer-copy.md` §3's lowercase-labels sentence, and `section-01-hero.md`'s two chip
clauses still naming the old relative `VERIFY.md` href. Both are one-line amendments and land in
whichever step follows your verdict.

## Re-gate verdict — write here

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

**Status: CONSUMED 2026-07-31 — all ten findings are closed, reviewed and ruled. The FINAL GATE
packet is at the bottom of this file, and the verdict you write goes there, not here.**

**F-R1 — §2: the founder wants the overnight wave visible, and wants options, not a build.** The
muster-site build's own waves ran 22:45 → 05:40 while the founder slept, and that is the thing that
impresses him most. He floated one shape — §2 restructured toward §4's idiom, one card holding the
two current cards, scrolling — and explicitly wants **UI/UX to think, weigh pros and cons, and
report back** before anything is built, **reading its skill files first** (founder's instruction).
Hard constraints the options must respect: §2 is BODH-wave scope and THIS SITE material must not
blend into it (A-005); R2 bans wall-clock build-time framing; THIS SITE metrics stay dashes
(DEC-005). The overnight *fact* is real and evidenced by night-stamped public commits — the
question is where and how it earns a seat, or whether it waits for launch telemetry.

**F-R2 — §3: "context engineering" cannot take rust, measured.** Founder asked; the answer is a
number: rust on ground is 4.19:1 dark / 4.35:1 light, both under the 4.5:1 floor for body-size
text — the same measurement that forced §4's zero-rust-text rule. If emphasis is wanted, the
permitted forms are ink bold or the accent-mark idiom; UI/UX rules whether §3 gets either or stays
plain.

**F-R3 — §4's page indicator must become premium.** With overlay scrollbars hidden (the default)
there is no persistent signal; when visible, the bar runs edge-to-edge and reads misaligned with
the sheets. Founder wants an always-visible, Apple-quality indicator, aligned with the track —
rust welcome if it is not too much. UI/UX designs it (this is the F-B3 affordance, round two:
ordinals + edge-cut landed, the indicator is the missing piece).

**F-R4 — §5's provenance line is FALSE AS WRITTEN and cannot ship. Blocking.** *"…from a
production iOS app"* — the founder's claim-check: Arogh is nearing MVP, App Store soon, **not in
production**. On this page an untrue claim is the one unrecoverable failure, and this one is in
the founder's own voice. The line is founder-supplied; he amends it at his gate. Truthful
replacement candidates for his pick (the second clause stays true either way):
**RESOLVED 2026-07-30 — the founder picked (a)**, and it ships exactly as: *"Muster was extracted
mid-build from a real iOS app — the framework existed as working practice before it existed as a
repo."* One word changes ("production" → "real"); the line stays founder-supplied and verbatim
thereafter.

**F-R5 — §5's three prose lines need a premium hierarchy.** UI/UX to guide — currently three
same-weight lines; the founder wants the section to read designed.

**F-R6 — §6: signal the model-agnostic direction without promising it. RESOLVED 2026-07-30 — the
founder supplied the roadmap picture, and it draws the claim line exactly.** The "(yet)" dies: it
is a forward promise, and the roadmap's own author says "runs on any model / works beyond Claude
Code" must NOT be claimed until its Wave 5 lands. **What IS safe today, verbatim from the vision**:
*"Muster's gates are deterministic bash over markdown — zero model tokens, model-proof by design;
the framework's correctness doesn't depend on which model runs it."* Content drafts §6's line from
that material only — present tense, no roadmap, no "coming soon" — and may lean on the page's
existing holds-on-cheap-models thread (§3's close, brand VP2), which this claim strengthens rather
than repeats. Claude Code remains stated as the prerequisite, because it is one.

**F-R7 — the mark is too small to read as a mark.** Founder ruling, superseding the badging
restraint for one seat: the **header lockup becomes a real brand logo at legible size**; the five
section separators keep their current size (once the header teaches the shape, small reads as the
logo); and the **footer boundary is missing its separator mark** — add it. UI/UX sizes optically;
DEC-031/037's other rules (never on a pole, clip-path route, no new colour) stand.

**F-R8 — repetition audit, whole page.** What repeats, does each instance earn its seat, and what
space comes back (or what more useful thing takes it)? Content runs the audit with PM; findings
ruled at the next review, not silently applied.

**F-R9 — the footer's two sentences become one.** The team line and the authorship line ("designed
and built by …, solo, shipping his own products") merge into a single sentence that covers
everything with the right emphasis first — Apple-level; UI/UX and Content together. Layout goal:
one paragraph, the receipt links beneath, one final link.

**F-R10 — the receipt links must land on populated, stable artifacts. Blocking on the queue link.**
Founder's exact concern: the queue link currently points at the live `orchestration-queue.md`,
which is rewritten every sprint and reads near-template between runs — a reader landing there sees
scaffolding, which refutes the receipt. Intent of the links, stated: each one is a checkable
artifact of HOW this page was built (the org chart in file form, the handoff ledger, the decision
record, the verification index). PM's proposed mechanism, founder to confirm: **pin the four
receipt links to commit-SHA permalinks** (GitHub `blob/<sha>` URLs) captured at a moment the files
are full — e.g. the Gate B review commit — so they never rot, never show a template, and stay
byte-checkable forever. The live-file links can additionally exist in VERIFY.md where a reader
expects "current state."

**RESOLVED 2026-07-30 — approved, with a founder criterion that governs the selection: each
snapshot must be a demo in itself.** Pick the commit where the file is at its most demonstrative,
not merely non-empty — e.g. the queue frozen at a moment when a long list of steps is QUEUED
(sprint freshly planned or a fix round freshly routed), never the current nearly-done state where
most work sits in the run log. Per file: queue → richest planned backlog; handoffs → the ledger at
its fullest filed state; decision log → current depth is already the demo; VERIFY → the launch
state. The executing step inspects `git log` for each file, states the chosen SHA and why, and the
founder sees the four links land at the next pass.

---

# FINAL GATE — Sprint 2 (2026-07-31)

**Open `index.html` at 1280 or wider, dark theme, and scroll top to bottom once.** All ten re-gate
findings are closed. What follows is one line each on what shipped, then the two things that are
actually yours: **one pick** (§2's overnight wave — F-R1) and **the three phone checks**, one of
which is the last hard launch blocker on this page.

Everything else here is stated so you are not surprised, not so you rule on it.

## What shipped, per finding

- **F-R1 — §2's overnight wave: nothing was built, and that is the answer being recommended, not a
  deferral by default.** UI/UX priced four options against your own constraints. **You pick one —
  the memo is below.**
- **F-R2 — §3's hook takes ink bold.** Rust was measured and is dead for body text (4.19:1 dark /
  4.35:1 light against the 4.5 floor — the same number that forced §4's zero-rust rule). *context
  engineering* now carries 700 at the paragraph's own size: the page's existing weight pair, no
  third weight, no new voice.
- **F-R3 — §4 has a real indicator.** Four segments, one per sheet, 2px, spanning **x 128 → 1152**
  at 1280 — the page's own rail, the same edges a resting sheet composes to, which is why the
  misalignment you judged cannot come back by drift. Segment 1 lit in rust, three at hairline,
  **zero motion on all four** (transition 0s, animation none — I measured each). The native
  scrollbar is retired. A continuous rail-and-thumb gauge was rendered and rejected: it reads as a
  loading bar.
- **F-R4 — the false word is gone.** §5's provenance line ships your resolved string, and it is
  byte-identical (125 bytes) in the shipped page, the copy file, and your string here. `production`
  survives nowhere near it — its only remaining instances are inside §2's replay corpus, 300+ lines
  away.
- **F-R5 — §5 reads designed.** The provenance line is the section's primary at 700; the other two
  lines stay 400. The lead-scale candidate was rendered and rejected — it dressed your testimony as
  a heading. **Worth knowing:** the obvious build of this broke the page. Weighting the paragraph
  itself resolved its `64ch` column **8.7% wider** than its neighbours' and went ragged; the
  emphasis rides a run inside the sentence instead, so all three lines hold **one column edge** —
  685.31px each, confirmed in both engines.
- **F-R6 — §6 claims model-proofing without promising it.** 30 words, drawn only from your
  safe-today material. `(yet)` is dead. No forward promise renders anywhere on the page — the eight
  instances of *yet / will / roadmap* in the source are all inside comments, two of them the
  annotation explaining why the words do not ship.
- **F-R7 — the mark is a masthead.** Wordmark 18px, pennant **9 × 13.5** — held at 0.5em × 0.75em
  of the word, so re-sizing the lockup is one declaration. **`--bar-h` is unmoved at 48px**, which
  is the part that mattered: the hero fold arithmetic, §2's phone visibility budget and
  `--scroll-pad` all stand. Separators keep 6 × 9; the footer boundary gained its mark.
  **Your own artwork was weighed and rejected on a number, not a preference** — the cream glyph
  composites at ~1.08:1 on the light ground, i.e. invisible, and one image asset cannot follow the
  theme the way the clip-path box does.
- **F-R8 — the repetition audit is ruled** (twelve items; DEC-061). Eleven verdicts accepted: the
  page's repetition is almost entirely load-bearing idiom — scope labels, readout keys, §2's
  two-voice design, ordinals — and nothing is cut where the second instance does a different job.
  **One I declined and re-ruled:** §5 says "Muster" three times inside one screen (the heading, your
  line, and the attribution line beneath it), and the audit called that "tolerable" without testing
  the cut. §5's attribution line drops *with Muster* — the heading two lines above already supplies
  it. **Ruled, not yet applied**, per the standing rule that rulings get a builder rather than a
  hand-edit: it rides the build step after your verdict, so the page you are looking at still says
  it. It does not gate launch.
- **F-R9 — the footer is one sentence and a signature.** 35 words at lead scale, one terminal
  period, four blocks on the rail under a boundary separator, six receipts at micro, contact last.
  Body scale was rendered and read as fine print.
- **F-R10 — the four receipts are pinned, and I read every one at its SHA rather than trusting the
  link.** All four SHAs are real commits here; all four paths exist **at their own commit** (a pin
  to a real commit that never held the file is the one way a receipt 404s while looking correct):

  | Link | SHA | What you actually land on |
  |---|---|---|
  | queue | `9b26788` | 786 lines · **16 steps queued** under a live Next Step — a planned backlog, not a template. Your demo criterion, met. |
  | handoffs | `bded0dd` | **11 open entries — 3 requests and 8 handoffs**, both entry types on one screen. |
  | decision log | `b41ed56` | 31 decisions ending at DEC-060. Current depth, which you said is its demo. |
  | VERIFY | `14bceef` | **Ruled to change — the page in front of you still has the old pin.** See below. |

  **VERIFY's link is ruled to change, and like the §5 cut it is not applied yet** — the page you
  are looking at still points at `14bceef`, so the receipt you click today is the frozen copy. The
  pin had a circular problem: that copy predates VERIFY.md's own section explaining why pinned and
  live links differ, so the receipt lands you on the copy without the explanation. More to the
  point, your criterion for this one file is *the launch state*, and `main` at launch **is** that
  state. **Ruling: it ships as `blob/main/VERIFY.md`** — no re-pin step a later session can forget,
  and it survives a squash merge where the three pinned links do not. The §1 chip moves with it in
  the same edit; the two are asserted byte-equal, so the harness fails if only one moves. Builds
  after your verdict, with the §5 cut.

## The one thing to pick — F-R1, §2's overnight wave

You asked for options, not a build. Four were priced against your own constraints (§2 is BODH-wave
scope and THIS SITE material must not blend into it; R2 bans wall-clock framing; THIS SITE metrics
stay dashes until your snapshot). **Reply with a number.**

- **1 — Restructure §2 now toward §4's idiom**, one card holding both layers, overnight material in
  the freed room. *The largest blast radius on the page*: §2's playback machinery re-based (48 s
  chain timing, corpus fidelity byte-checks, the 12px equality invariant, the phone visibility
  budget), Content rewrite, Developer re-assert, QA re-run, cross-engine on the whole section —
  **and your phone playback check, the hard launch blocker below, is spent and must be re-spent.**
- **2 — A scope-labelled overnight line inside §2**, no restructure. Medium radius: §2's strip
  layout and its assertions, one Content string, a QA re-run.
- **3 — Recommended: the wave becomes visible when it can be shown rather than said.** Today the
  fact already ships in its only claimable form (§4 decision 4 — mechanism, no wall-clock), and the
  night-stamped commits are one click away through the receipts row. At launch, your snapshot
  arrives and §2 takes your own card shape as a **wave rack** — a BODH card and a THIS SITE card,
  each scope-labelled by construction — with the overnight wave rendered as a real card whose
  numbers exist. Blast radius now: **zero**.
- **4 — Do nothing**; leave the fact in §4 decision 4.

**Why 3 and not your shape:** R2 reduces options 1 and 2 to the mechanism sentence the page
*already ships in §4*, so both pay §2's entire machinery to print a duplicate a scroll apart — and
both park THIS SITE material inside the BODH-scoped section, which is this page's likeliest factual
failure. Your shape is right; it is the timing that is wrong. Option 3 is your shape, built once,
on material that has its receipt. If you want it visible now anyway, say 1 or 2 and it gets built —
this is a recommendation, not a refusal.

## The three phone checks — the only thing I need from you

On your iPhone, in Safari, **with the toolbars showing**. Unchanged from the last pass; you
deliberately saved them for the fixed page, and this is it.

1. **§2's full playback — the hard launch blocker.** Let §2 scroll into view fresh and watch the
   whole **48 seconds**. Both layers — terminal and narration card — must stay on screen for the
   entire chain. `100dvh` under disappearing toolbars is the risk, and no harness on this machine
   can take that measurement. A screenshot of the end state does not close it; the guarantee is
   about *during*.
2. **Find on Page** for a mid-page phrase — `scarcest` or `commit-days`. Does the match land on
   screen? Chrome always does (0 of 165 text leaves land off screen); Safari's alignment is the one
   case the ruling leaves unverified.
3. **Scroll feel.** Page snapping is gone, so this is just "does it scroll like a page." Flick
   through §4 sideways too — its track is the one thing that still snaps, and it is what makes the
   sheets rest composed instead of parked mid-crop.

## Already green — do not spend attention here

All three runners re-run by me, cold, on the shipped tree: `scripts/test.sh` **GREEN both engines,
295/295 + 27/27** · `qa-independent-audit.mjs` **exit 0, 108/108** · `qa-fullpage-sweep.mjs`
**exit 0, 43/43**. Every changed surface rendered and looked at in **both** engines — masthead, §4's
indicator, §5, the footer — and the load-bearing numbers re-measured by me rather than read off a
handoff (bar 48px · mark 9 × 13.5 = 0.5em × 0.75em · segments 128 → 1152 with zero motion · §5's
three lines on one column edge · footer border-top 0, one sentence, 35 words).

**And I planted three violations of my own.** Two went red exactly where they should: drifting the
§1 chip's SHA off the footer receipt turned two checks red naming the drift, and a typo'd receipt
SHA turned one red naming the differing URL.

**The third passed, and that is the finding.** Writing a fabricated SHA into the page *and* its copy
file together — the two agreeing with each other — passes **295/295 and 43/43**, because the
existence check that reads git's object store covers the §1 chip only. A link that 404s for every
reader, green everywhere. **No link on the page is wrong today** — I read all four at their SHAs.
But that coordinated edit is precisely what a re-pin makes, so it is now a hard item in
`pre-launch-checklist.md` with the fix named (widen the check to all four receipts) and the
click-check kept, because only a real fetch proves reachability after a push.

## Carried, so nothing is rediscovered later

**Two rulings above are deliberately NOT on the page yet** — rulings get a builder rather than a
hand-edit at a review, so nothing here was quietly typed into the shipped tree:

- **§5's `with Muster` cut** (F-R8 item 12) — ruled above, builds after your verdict.
- **VERIFY's link → `blob/main/VERIFY.md`** (chip + footer receipt, one edit) — same build step.
- **Squash-merge reachability** — the three pinned receipts reach the public repo only if the final
  merge preserves history. In `pre-launch-checklist.md`, hard, gated at launch.
- **`brand-guidelines.md` §4** — recorded the header pennant at the separator's size and said the
  footer carried no mark. Both now describe the shipped page (DEC-061). No pixels moved.

## Final gate verdict — write here

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. -->

**Two things, then you are done:**

1. **F-R1** — reply with a number: **1 · 2 · 3 · 4** (3 recommended).
2. **The three phone checks** — pass/fail each, and describe any failure in the phrasing you would
   use to a person, not to a harness. Check 1 is a launch blocker; if it fails, say what you saw
   disappear and when.

Plus anything the scroll-through turns up. **APPROVE** with a number for F-R1 and three passes ends
Sprint 2; a bug list routes a fix round per bug.

**Write your verdict below this line, then run `muster/scripts/muster-sprint-resume.sh`.**

## Final-gate verdict — IN PROGRESS

**Recorded 2026-07-31 in the interactive gate session (DEC-062).** Settled here:

- **F-R1: option 4.** Nothing builds; the overnight fact stays in §4 decision 4 and the receipts.
- **The cost posture (DEC-062)**: §5's cards re-key to OPERATOR ATTENTION + SHIPPED, both cards
  symmetric; Bodh's `9.3 hours / $147` moves into Bodh's prose line; the site's full economics
  publish in VERIFY.md with method and rate context; no derived rate, no human baseline on the
  page; §1's remnant strip re-keys or slims (UI/UX picks from renders); commit-days off the cards.

**Still outstanding, arriving in the founder's next session (on `claude-opus-5`, per the lean
mandate):** the founder's remaining visual feedback on the final-gate build, and the three phone
checks — §2's full 48 s playback (the last hard launch blocker), Find on Page, scroll feel.

**Build list already ruled and awaiting the closing build** (no new founder input needed):
DEC-061's two items (VERIFY receipt + §1 chip → `blob/main`, §5 loses one `with Muster`) and
DEC-062's cascades above.

**Execution mode for everything until launch (founder mandate, DEC-062 decision 5):** interactive
warm-tab sessions on `claude-opus-5`, targeted assertions per change, ONE terminal QA sweep +
review before launch. The driver runs only that final verification pass.
