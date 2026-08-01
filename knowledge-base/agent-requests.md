# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

## Resolved (Last 10)

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


- 2026-07-31 — HO-041 (QA): **accepted, no revision.** The re-run's worth is not its three green counts —
  PM reproduced all of them cold anyway (**295/295 + 27/27**, **108/108**, **43/43**) — it is **plant 11**,
  the plant that did *not* go red and was reported as such. Lighting a second segment in the markup turns
  nothing red in `verify-shell.mjs`, because the observer repairs the state before any rendered check
  looks; rather than quietly dropping the plant, the handoff names the division that makes it safe
  (**source truth in the sweep, rendered truth in the shell**) and proves the rendered half genuinely
  falsifiable from CSS. A round that reports a negative result and then shows why it is not a hole is the
  standard this sprint has been trying to reach. Two disclosures earn the same credit: a
  `\b`-escaping bug that made the forward-promise matcher return zero hits for **every** word — the
  blind-by-construction class, caught by self-testing against a known-present word — and two plants first
  aimed at the runner that does not own the assertion, re-run against the one that does. The cross-engine
  claim is scoped honestly: masthead **scale** is asserted in Blink only, and the handoff says so instead
  of letting 27/27 imply otherwise.

