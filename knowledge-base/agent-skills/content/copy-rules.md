# Copy Rules — Muster website (project skill)

Enforceable form of the twelve non-negotiable rules in `knowledge-base/product-spec-seed.md`. Content
writes against this file; PM reviews against it line by line. Where this file and the seed disagree, the
seed wins.

These are pass/fail checks, not style preferences. A violation is a blocking finding, not a nit —
the page's entire proposition is that its claims are checkable, so an overclaim is a product defect.

## The scope table — memorize this before writing any number

Three measurement scopes exist. Mixing two in one claim is the most likely factual failure on this page.

| Scope label | Span | Numbers |
|---|---|---|
| **BODH** | idea → live | 9.3 h active build · $147 · 4.8 h operator attention · 4 commit-days (Jul 11–18) · whole product, incl. the iOS app |
| **BODH SPRINT-4 WEBSITE WAVE** | the §2 chain, one evening | ~64 min across 8 traced sessions · 289 API calls · $24.73 · zero revision rounds · zero bugs · 11/11 QA |
| **THIS SITE** | spec → live | — (measured at launch) |

**Sessions versus steps — both true, different things.** 8 traced sessions = 7 agent work-steps + the PM
review/retro session (session 8, which wrote DEC-023 and does not count itself). Say **"8 sessions"** or
**"7 agent steps plus PM review."** Never a bare "7" set against an "8" — that reads as one of them being
wrong, on a page whose thesis is numeric honesty.

**Roster size is not wave participation.** Terminal line L1 reads "8 roles standing by" — that is the
roster. **Seven roles ran this wave**; research did not. Narration must not imply all eight worked it.
"Eight agents, one operator" remains correct as a description of Muster; it is not a description of this
chain.

**The eight roles, named** (needed for §1's formation labels; enumerated nowhere else in the
knowledge-base): **PM · Developer · UI/UX · QA · Content · Marketing · Legal · Research.**

- Never mix scopes in one claim.
- Never attribute 9.3 h or $147 to the website wave.
- Never attribute ~64 min or $24.73 to Bodh as a whole.

## R1 — Measured, never vague

- Every performance or cost claim is a measured number, stated **exactly** as the source states it.
- `$147` never `$150` or `~$150`. `9.3 h` never `~10 h`. `$24.73` never `$25`. `4.8 h` never `5 h`.
- **Preserve the source's own precision — don't add it and don't remove it.** The corpus writes
  `~64 minutes`; ship it with the tilde or as "64 minutes across 8 sessions." Never "exactly 64
  minutes." Exact numbers read as measured; round ones read as marketing; falsely-precise ones read as
  fabricated.
- No adjective-as-argument. "Blazing fast" is banned. The number does the work.

**Check**: every numeral on the page traces to `product-spec-seed.md` → Measured data or
`bodh-sprint4-corpus.md`. Cite the line.

## R2 — Time is "active build," never wall-clock

- Say "active build." Never "built in N hours." Never imply wall-clock elapsed time.
- Active build = inter-event gaps capped at 5 min from session logs. Elapsed commit-days are the
  checkable fallback.

**The one resolved tension.** The corpus labels the wave's ~64 minutes "wall-clock," which reads as a
collision with this rule. It isn't, and here is the reasoning to reuse rather than re-derive: the eight
stated session durations sum to 64 min (3840 s), and the measured span 20:38:57 → 21:43:15 is 64 m 18 s
(3858 s). They agree because an autonomous chain runs back-to-back with no idle gaps — so for this chain,
active build and elapsed are the same measurement. The 18 s between the two routes is the accumulated
nearest-minute rounding in the per-session durations, not idle time. The corpus itself sanctions the
phrasing "64 minutes of agent work."

**Never publish a second-precision figure.** `21:43:15`, `64 m 18 s`, and `3858 s` are pacing input for
the build, not copy. The corpus is explicit: publish "~64 minutes" only. The minute-precision timestamps
in the terminal-line inventory are the ones marked safe to render.

Permitted: *"64 minutes of agent work across 8 sessions"* · *"one evening"* · *"~64 minutes"* ·
*"$24.73 across 289 API calls"* (per-session Calls and $ columns tile both totals exactly in corpus
v1.1, so these are corroborated, not merely asserted).
Banned: *"built in 64 minutes"* · *"64 minutes from start to live"* · any phrasing attaching 64 min to
the deploy.

**Hard boundary**: the wave's deploy landed **2026-07-18**, three days after the chain ran, because the
gate waited on Apple. Never imply the deploy happened at the end of the chain. The corpus's final
terminal line (`deploy · bodh.day · LIVE`) is three days later in reality.

## R3 — Cost framing

- API list price, cost-to-replicate. Never subscription spend.
- **Never print a human or agency cost baseline.** State our number; let the reader run the comparison.
  No "versus $40k of contractor time," no implied multiple, not even as a rhetorical question.

## R4 — No invented numbers, ever

- An unmeasured metric renders as a dash with "measured at launch." Never a placeholder value, never an
  estimate, never a plausible-looking stand-in.
- THIS SITE's entire column stays dashed until real numbers exist. Telemetry is founder-supplied; no
  agent generates it.

## R5 — Scope labels on build metrics

- BODH = *idea → live*. THIS SITE = *spec → live*. The wave = its own chain.
- Never imply two scopes share a span. See the scope table above.

## R6 — "Measured," never "proven"

- Permitted: "measured — method and data published."
- Banned: "proven," "guaranteed," "validated" as a claim about the framework's merit.
- Verification is granularity plus a runnable method. The page's language stays inside what the
  artifacts support.

## R7 — First person in exactly two places

- The provenance line in §5, and the decisions in §4. Both founder-supplied.
- **Everything else is product voice** — including all of §2's narration.
- Content may tighten founder-supplied passages. Content may never inflate them.

## R8 — The team is AI and says so

- ✅ "by Muster's AI team — 5 of 8 agents, 1 operator"
- ❌ "the Muster team" unqualified
- Never imply humans did the work. Never let a reader assume a human wrote a deliverable.
- **A team claim states participation, not roster size**, wherever a reader could take it as a claim
  about who built the thing in front of them. Roster size is only sayable as a label on the roster
  itself — the formation diagram's caption is the one place that reads as a label. Everywhere else,
  count what ran and say that number.

## R9 — One CTA

One conversion event: the `curl`. No newsletter signup, no Discord, no stars badge, no testimonials, no
pricing, no invitation section, no community furniture.

**Provenance links are not CTAs and are not capped.** The footer carries the receipt set the seed
specifies — repo · queue · handoffs · decision log · VERIFY — plus the framework repo and the contact
profile. They exist so a skeptic can check the page's claims, which is the opposite of an invitation
to act. What R9 bans is a second *ask*.

## R10 — Major version only

"v4." Never "v4.2." A minor release must never require touching the site.

## R11 — Vocabulary

**Use as-is**: *tokens are the currency* · *the queue is the org chart* · *growth caps* · *prose for
judgment, scripts for mechanics*.

**One recognition hook permitted**: "context engineering."

**Insider terms** (*cascade lag*, *cold-start sufficiency*): only in §4, where they earn their meaning.
Never at hero altitude.

## R12 — Real URLs only

- The `curl` is copy-paste-verified against the live repo. No fictional hosts.
- Current verified form:
  `curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product`
- **Known trap**: `design-specs/direction-reference.html` contains `https://muster.build/setup.sh`.
  That host is not real and must never ship. The reference is a feel mockup, not a copy source.
- The founder's domain arrives mid-build; the GitHub raw URL is the stated fallback until then.

## §2-specific: the do-not-overclaim boundary

Every claim below is true and sourced in `bodh-sprint4-corpus.md`. Use these; don't improvise near them.

**Safe to say:**

- "No human touched this until the deploy button" — true for this chain, sessions 1–8, single halt.
- "The PM re-checked the developer's work with its own screenshots" — DEC-022, session 3.
- "QA didn't re-run the developer's tests — it re-derived the date math with its own formula, across 24
  dates and 3 timezones" — HO-032.
- "Legal confirmed the privacy claim at code level, not by reading a policy" — HO-030.
- "Zero revision rounds, zero bugs" — DEC-023.
- "11/11 acceptance, PASS" — HO-032.

**The Safari catch.** The Safari-only SVG bug was found in a **founder-directed interactive pass at the
deploy gate** — not in the autonomous chain. If used at all, narrate it exactly as "an independent
cross-engine re-check caught a Safari-only bug Chrome missed" in a founder-directed polish pass. Never
fold it into the autonomous run. Folding it in would be the single most damaging overclaim available on
this page, because it converts an honest story into a false one.

**Compression is permitted; invention is not.** Select and merge corpus lines freely as pacing needs.
Timestamps and facts stay exactly as the corpus states them. Anything not in the corpus is not in the
replay — if a beat needs a line the corpus lacks, the beat gets cut, not filled.

**Label required**: "condensed from the real build log."

## Review checklist

Run all of it; sampling defeats the purpose.

- [ ] Every numeral traces to the seed's Measured data table or the corpus — cited
- [ ] No number rounded, and none made more precise than its source
- [ ] Every build metric carries its scope label; no claim mixes two scopes
- [ ] No wall-clock framing; no "built in N hours"; deploy never attached to the chain's end
- [ ] No human/agency cost baseline anywhere
- [ ] Unmeasured metrics are dashes, not placeholders
- [ ] "Measured" not "proven"
- [ ] First person confined to §5's provenance line and §4's decisions
- [ ] AI team named as AI; no unqualified "the Muster team"
- [ ] One CTA; no community furniture
- [ ] Major version only
- [ ] Every URL real and verified; no `muster.build`
- [ ] Safari catch absent, or narrated as a founder-directed polish pass
- [ ] "Condensed from the real build log" label present on the replay
- [ ] No banned adjectives; no exclamation marks
