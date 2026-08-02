# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-08-01 HO-052 — OG preview image ruled: the render spec Developer builds from (round 1 of 2)
**Type:** handoff
**Producer:** UI/UX
**Deliverable:** this entry (the render spec) + contact sheet at `samples/og/sheet.html` (gitignored — absolute path: `/Users/kanwarsandhu/Desktop/TA-muster-ai-site/samples/og/sheet.html`; candidate renders and the throwaway scripts sit beside it)
**Status:** in-review
**Reviewers:**
- [ ] Developer — pending (builds the generator + meta tags, round 2)
- [ ] PM — pending

**The ruling (DEC-070), exact and buildable:**

1. **Crop**: headless Blink (the harness's own `tests/lib/cdp.mjs` path), shipped `index.html` via
   `file://`, **viewport 1000 × 525 CSS px, `deviceScaleFactor: 1.2`, `mobile: false`**, scroll 0,
   full-viewport capture, **no clip rect** → output exactly **1200 × 630**. In frame: status bar,
   eyebrow, headline (strike + rust edit whole — both spans single-fragment at this width), full
   formation, `8 AI AGENTS · 1 OPERATOR` caption, 32.6px air below it. Remnant/VERIFY/curl are
   deliberately out of frame (mush at card size — proven on the sheet, candidate F).
2. **Theme**: dark — `Emulation.setEmulatedMedia` `prefers-color-scheme: dark`.
3. **Deterministic state**: emulate **`prefers-reduced-motion: reduce`** — the page's own complete
   static path (pulse solid core, §5 count-up final values so no mid-roll figure can ever be framed,
   cursor solid). Wait `document.fonts.ready` + rAF + ~150ms before capture. Chrome flags as the
   harness: `--force-color-profile=srgb --disable-lcd-text --hide-scrollbars`.
4. **Format / DPR / bytes**: **JPEG quality 90 → 88,021 bytes measured** (`Page.captureScreenshot
   {format:"jpeg", quality:90}`). 1×, never 2× (2× PNG measured 855 KB for zero display gain). PNG
   fallback if the founder rejects JPEG at the sheet: same frame, 301,706 bytes — at the ~300 KB line.
5. **Meta geometry** (strings themselves are Content's): `og:image` **absolute**
   `https://muster.works/og.jpg` · `og:image:width 1200` · `og:image:height 630` ·
   `og:image:type image/jpeg` · `og:url https://muster.works/` (founder-approved) ·
   `twitter:card summary_large_image`. An `og:image:alt` slot is required — Content writes the
   string; it should describe the render (the edited headline + the formation), not say "screenshot".

**Couplings found by reading, for round 2:**
- `tools/build-dist.sh` must copy the image into `dist/` — and its missing-reference check greps
  only `(href|src)=`, so a `content=` meta URL is invisible to it; extend the check or the image
  can 404 silently after a refactor.
- DEC-034's URL guard permits inert URLs and bans fetching references — a `<meta content>` is
  inert, but grep the guard's actual pattern before assuming it passes.
- CSP needs no change (`img-src 'self'` already covers it; unfurlers fetch server-side and are not
  governed by the page's CSP). Zero-runtime-request claim untouched — assert the page still makes
  zero fetches with the tags present.
- Generator determinism is **per-machine**: system-mono glyph metrics differ across OSes, so the
  line composition ruled here (headline 2 lines at 1000px) is measured on macOS SF Mono/Menlo. The
  generator should assert the frame's load-bearing relationships after render — h1 spans
  single-fragment, caption bottom < 525, remnant top > 525 — rather than trusting the crop blind.
- This ships the repo's **first binary asset** (the favicon is a data URI precisely to avoid one).
  Priced and accepted in DEC-070 at 88 KB; `og:image` cannot be a data URI — unfurlers won't parse it.

**Sheet contents** (founder rules in one look): five crops dark, two light, each at full size +
500px + 300px inside simulated light/dark message-card chrome; JPEG-vs-PNG full-size pair; byte
table; grain-carry measurement. Recommendation named on the sheet: **C dark, JPEG q90**.

**Would Apple ship this?** Yes — the card is the product's five-second verdict at message-bubble
size: one readable claim, one recognizable structure, nothing that turns to noise at 4× downscale.
The simpler alternative (full first screen, no zoom) was rendered and reads worse where cards are
actually seen.

**Revision log:**
- 2026-08-01: Filed after rendering 9 candidates + downscales; recommendation judged at 300px.

## Resolved (Last 10)

- 2026-08-01 — HO-051 (Developer): **accepted, no revision — the last build, and it did not coast.**
  `7.5 h` ships counting, in both engines, and the round's hardest part was handled honestly: when a
  cell stops being unmeasured, several assertions lose their subject, and a check that passes because
  its subject vanished is the silent-failure class this sprint found five times. **One check was
  retired outright** — *the dash never animates*, which can no longer exist on the page — and the
  property re-homed on the count-up fixture rather than left as a green line about nothing. Its
  **vacuity plant is the round's best work**: emptying the sub-line inventory on both sides produced a
  vacuously matching comparison, and the check **still went red** on its inventory guards, with seed
  byte-equality catching it independently. Five plants, each red on its owner, tree clean between.
  It also **found a coupling Content's list missed** — `verify-webkit`'s §5 check *required* an ink
  dash and would have gone red on the correct build. Counts move for stated reasons: verify-shell
  308→307 (one retirement), sweep 45→47 (two additions covering the measured VERIFY row and keeping
  `42h 24m`/commit-days off the page). No WebKit evidence for the count-up in any condition, stated.


- 2026-08-01 — HO-050 (Content): **accepted, no revision — and it refused a bad instruction.**
  PM's brief passed the founder's phrase *"48-second build chain"* straight through; Content declined
  to write it, because the chain ran ~64 minutes and 48s is the playback compression — verbatim would
  have been a wall-clock claim on the one file that exists to prevent them. It wrote the accurate form
  instead. Second conservative call: the meter reports both *7 distinct active days* and *9
  commit-days*, and it published only commit-days — git-checkable and VERIFY's own stated method —
  rather than print two day-counts it could not reconcile without re-deriving. The why landed as an
  extension of the existing *"hours are the whole of the difference"* passage rather than as a second
  explanation, with no defence and no reader instruction, exactly as ruled. Its eighteen-item coupling
  list saved Developer a rediscovery pass and missed one item, which Developer found by running.
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->



- 2026-08-01 — HO-049 (QA): **accepted, no revision. SHIP, with two named residuals.** The step was
  briefed to hunt a class rather than re-confirm counts, and it did: six independent plants, all
  reverted clean. It **corrected this PM's own brief** — 5 of 6 copy specs *are* harness-coupled and
  only `section-01-copy.md` is unparsed, which is precisely the one that drifted. It found a third
  texture-blind contrast check nobody had named (an algebraic vignette-floor check), confirmed
  `findGroundPatch` can pass by relocating, and reproduced HO-045's and DEC-065's regimes exactly
  rather than taking them on trust. **`cdp.mjs`'s unref'd send deadline is fixed and proven in
  isolation first** — the unref'd shape exits 13 with no error, the fixed shape rejects naming the
  method — so the launch gate's own failure-reporting path is no longer the broken thing.
  Its texture measurement (5.61–5.75 dark / 5.13 light) does not reconcile with HO-048's
  (5.14 / 4.82); it said so plainly instead of picking a number. Both clear 4.5, and **the
  conservative pair governs**. Unreconciled measurement is a residual, not a blocker.



- 2026-08-01 — HO-048 (Developer): **accepted, no revision.** The grain ships coarse at
  `baseFrequency 0.18`, and the one silent failure mode available here was closed by construction:
  the built data-URI was decoded attribute by attribute **and** checked byte-identical to the
  variant UI/UX measured, so no transcription error inside a URL-encoded SVG could survive. It
  confirmed rather than assumed that nothing needed re-basing (repo-wide grep for any literal naming
  frequency, tile or paint box), and re-measured composited contrast itself knowing no runner can
  see the texture. *Ledger note: this entry was dropped from Active without a disposition during a
  later sweep and is restored here — a handoff may be closed, never deleted.*



- 2026-08-01 — HO-045 (Developer): **accepted, no revision — it corrected the brief it was given.**
  PM's diagnosis said the rail's overflow was a resting clip; it measured and found the overflow is
  the 350ms reveal transform, which means **the containment assertion PM specified would have gone
  red on 4 rows of 40 and become the second assertion in a row to pass while the founder's defect
  survived**. It asserted resting clearance against the reveal's own measured displacement instead —
  24 of 40 red. Ruled paging-forward over always-top-aligning on the ground that the latter destroys
  the accumulating transcript the desktop rail exists for. Four assertions, each watched red first,
  including one planting a reader's own scroll to prove the rail never hauls them backwards.



- 2026-08-01 — HO-044 (Developer): **accepted, no revision.** Built every DEC-062/063/064 ruling and
  re-based eleven harness couplings around them. **Both bug hypotheses in its brief were wrong and it
  measured rather than accepted them**: §4's indicator failed on a visibility *tie* broken by document
  order from 1600px up — so the last segment could never light on a wide screen at any scroll
  position — and §2's terminal already reset, the narration rail being the pane at fault, at desktop
  only. Eighteen plants, each watched red on the check that owns it. Its most valuable find was a
  check going **blind rather than red**: the sweep's contrast probe skipped selectors it could not
  resolve, so retiring a surface silently dropped it from a check still claiming to measure it.



- 2026-08-01 — HO-047 (UI/UX): **accepted, no revision — the round that found the answer.** It was
  scoped to test one hypothesis and it tested exactly that: only `baseFrequency` varied, alphas and
  both vignettes held, so a positive result could not be confounded by intensity. The finding is
  worth more than the pick — **measured spread rises only ×1.27 while perceptibility moves
  decisively**, which means standard deviation was never the quantity that tracked what a reader
  sees; autocorrelation length is. Two earlier rounds optimised the number that barely moves. Three
  disclosures earn the acceptance as much as the recommendation: 0.09 disqualified on judgement
  (8px reads as staining, the point where texture becomes a defect), the two-layer form disqualified
  on its own measurement rather than quietly dropped, and the honest ceiling stated — the direction
  reference's ruggedness is an *intensity* property at ~10× our effective alpha, so it is not
  reachable inside the 4.5:1 floor at any frequency. It also said plainly that no frequency fixes
  the light theme, making the pick a dark-theme fix rather than letting it read as a whole-page win.



- 2026-08-01 — HO-046 (UI/UX): **accepted, and its rejected recommendation was the right work.**
  The founder rejected STRONGER, but the round earned that outcome: it measured the shipped grain at
  **2.0 levels of 255 on the light ground** — one step of 8-bit quantisation, so not faint but
  absent — which confirmed the founder's premise and understated it. It priced its own
  recommendation honestly (a third of the light theme's margin) and named the cost no one asked
  about: on a near-black ground, making grain visible *is* lightening it. Two findings outlived the
  round and both are now standing: **no shipped runner can see the texture at all** — contrast
  probes resolve a background by walking ancestors and `.texture` is a fixed sibling, so the sweep
  prints 5.13:1 for a pair compositing at 4.83 — and `findGroundPatch` **can pass by relocating**,
  scanning until a patch fits rather than failing. It also caught its own first WebKit answer being
  wrong before shipping it: `qlmanage` box-averaged the noise into a false ×1.01.



- 2026-07-31 — HO-043 (UI/UX): **accepted, no revision.** Every ruling was chosen from a rendered
  proposed state and each names its engine and viewport, which is the standard this project asks for
  and does not always get. Three things earn the acceptance beyond the rulings themselves: the
  two-cell card was *measured* rather than assumed safe (card heights equal at 361.8px, sub-lines on a
  shared reserved track at 42.0px, so the diagonal asymmetry reads as a matrix answered rather than as
  an omission — contradicting this brief's premise that it would need fixing); the alternative
  composition was disqualified on measurement, not taste (475.6px against 361.8px); and the `THIS PAGE`
  colour ruling checked its own consistency argument and reported that it did not survive — §1 rendered
  that string in ink because a spec once flattened all three strip values, never as a ruling about the
  string. Two defects were found that nobody asked it to look for: the registration mark overlapping
  the chip's border box, and the footer breaking the founder's name across lines at 375 and 320. The
  contact sheet earned the founder's verdict in one sitting, which was its whole job.



- 2026-07-31 — HO-042 (Content): **accepted, no revision.** The two prose defects PM ruled were built
  as ruled, and the form Content chose over PM's draft is better than the draft: naming Bodh in the
  measured line rather than opening bare — because the nearest antecedent above it is *its website
  wave*, the one scope those figures are not — removes the page's most dangerous ambiguity for one
  repeated word, and `Bodh, idea to live:` matches the card label verbatim so prose and card bind
  without a sentence saying so. VERIFY.md's economics landed with the scope trap handled: the driver
  figures are labelled a floor, twice, and cannot be read as filling the page's dashes. The handoff's
  eleven-item coupling list was accurate and saved Developer a rediscovery pass, and the one item it
  flagged as a *finding* rather than a re-base — the four-em-dash check that would have passed for the
  wrong reason after the rebuild — is exactly the class of blindness this round was hunting.


