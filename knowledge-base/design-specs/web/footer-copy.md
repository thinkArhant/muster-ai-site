# Footer Copy — the closing signature

**Surface type**: every Content-owned string in the page footer — one closing sentence (team truth +
authorship merged), the receipts row (six link labels and their URLs), and the contact link (copy
deliverable)
**Consumers**: UI/UX (lays out the one-sentence footer and rules which candidate ships, from
renders), Developer (builds the ruled strings and hrefs verbatim), PM (reviews against the
participation truth), QA (string equality and link-string checks), the founder (ruled the merge and
pre-approved the participation phrasing, DEC-056)
**Sources**: `product-spec-seed.md` → Footer (read-only), as amended by the founder on three points:
the "8 agents" line yields to true participation and no raw email ships (DEC-056), and the team line
and authorship line merge into a single sentence (DEC-059). The participation count is measured —
`git log` by commit subject (DEC-054). Governed by `agent-skills/content/copy-rules.md` and
`brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **The footer is three blocks** (founder ruling, DEC-059): one sentence carrying the team truth and
  the authorship, the receipts row beneath it, and one final link. Nothing else — no bio, no photo,
  no social row (seed → Footer).
- **True participation, not roster** (DEC-054, DEC-056): five roles ran this build — PM, Developer,
  UI/UX, QA, Content; Marketing, Legal, and Research were never invoked (zero commits, all three
  null in `agent-context/.populated`). §1's `8 AI agents · 1 operator` caption stays as the roster
  label; the footer states what actually ran. The two never collide because each names its scope.
- **No raw email anywhere on the page** (DEC-056): the GitHub profile link is the contact path; the
  profile carries the email for anyone who wants it.
- **Every URL is stated as a string and verified by string equality** (R12) — never by fetching.
- **The footer carries no lockup** (`brand-guidelines.md` §4): the closing sentence is the
  signature.
- **First person appears nowhere here** (R7): the sentence is a third-person statement about who did
  what; §5's provenance line and §4's decisions remain the page's only first-person places.
- **Ceiling, script-measured** (word-counting convention as in `section-04-copy.md` §1): the merged
  sentence ≤ 40 words. Rationale: the split form it replaces ran 44 (30 + 14); a merge that lands at
  or past that number has not earned the merge. Measured counts in §5.

## 2. The closing sentence

One sentence, team truth first, authorship closing it — the participation facts ride as an em-dash
aside so the sentence scans as a signature, not a roster recital. The five roles that ran and the
three that did not are named in `VERIFY.md` and enumerable from the queue and handoff ledger linked
directly beneath the sentence, which is what keeps the count falsifiable after the names leave the
footer.

**Recommended:**

```
Specced, written, and reviewed by Muster's AI team — 5 of 8 agents, the other three never invoked, 1 operator — and designed and built by Kanwar Sandhu, solo, shipping his own products with it.
```

| Claim | Source |
|---|---|
| Specced, written, and reviewed by Muster's AI team | seed → Footer, verbatim |
| 5 of 8 agents | measured: `git log` on this branch by commit subject — pm, developer, ui-ux, qa, content have commits; marketing, legal, research have zero (DEC-054). 8 is the roster (copy-rules → scope table) |
| the other three never invoked | DEC-054's measurement, stated so the count carries its own falsifier — a reader opens the queue or handoff ledger one line below and checks |
| 1 operator | seed → Footer, verbatim |
| designed and built by Kanwar Sandhu, solo, shipping his own products with it | seed → Footer authorship line, in the founder's own merged phrasing (DEC-059 ruling quotes it without "while"); "it" = Muster — the framework is his, the page's strings are the team's, which is what keeps the two authorship claims from colliding |

**Alternates, for the layout ruling** (taste calls are chosen from renders — the layout step renders
the candidates in the page's real tokens and rules there):

- **B — names kept in the sentence** (40 words, at the ceiling): *"Specced, written, and reviewed by
  Muster's AI team — PM, Developer, UI/UX, QA, and Content; 5 of 8 agents, 1 operator; Marketing,
  Legal, and Research never invoked — and designed and built by Kanwar Sandhu, solo, shipping his
  own products with it."* Keeps role-by-role auditability inside the sentence itself at the cost of
  reading as a recital; the aside outweighs the signature.
- **C — authorship first** (32 words): *"Designed and built by Kanwar Sandhu, solo, shipping his own
  products with Muster — specced, written, and reviewed by its AI team: 5 of 8 agents, 1 operator,
  the other three never invoked."* Signature-first, but it leads the page's closing line with the
  human, on a page whose thesis is what the AI team shipped — and the team truth, the page's audited
  claim, lands mid-sentence.

**Why the recommendation**: the team truth is the footer's highest-priority fact — it is the claim
the page's receipts exist to prove, and the one the founder's own gate finding tested for truth — so
it leads. The eight role names leave the sentence but not the record: `VERIFY.md` names all eight,
and the linked queue and ledger carry the per-role evidence. "Solo" lands directly beside "AI team,"
which is the page's whole proposition in four words. At 33 words it returns 11 against the split
form and reads in one breath.

## 3. The receipts row

Six links. Label source strings are lowercase as the seed writes them, `VERIFY` uppercase as the
seed writes it — a source-string convention: the rendered row uppercases by the page's shared
mono-label transform, and what a reader copies is the lowercase source string. Visible text is the
label; the accessible name is the label (no `aria-label` needed — every label is a real word or a
known file name).

| # | Label | `href` |
|---|---|---|
| 1 | `repo` | `https://github.com/thinkArhant/muster-ai-site` |
| 2 | `queue` | `https://github.com/thinkArhant/muster-ai-site/blob/9b26788/knowledge-base/orchestration-queue.md` |
| 3 | `handoffs` | `https://github.com/thinkArhant/muster-ai-site/blob/bded0dd/knowledge-base/agent-requests.md` |
| 4 | `decision log` | `https://github.com/thinkArhant/muster-ai-site/blob/b41ed56/knowledge-base/decision-log.md` |
| 5 | `VERIFY` | `https://github.com/thinkArhant/muster-ai-site/blob/14bceef/VERIFY.md` |
| 6 | `framework` | `https://github.com/thinkArhant/muster-ai` |

- Order is the seed's five (`repo · queue · handoffs · decision log · VERIFY`), then `framework` —
  this site's receipts first, the thing they prove second.
- The four artifact links (queue, handoffs, decision log, VERIFY) are commit-SHA blob permalinks
  chosen by the founder's demo-in-itself criterion (DEC-059) — each pins the moment that file is
  most a demonstration of itself, not merely the moment it was longest. `queue` → `9b26788`, 16
  steps queued ahead of the run. `handoffs` → `bded0dd`, 11 entries filed and open at once, and
  both entry types on one screen. `decision log` → `b41ed56`, current depth. `VERIFY` →
  `14bceef`; the criterion for this one is *the launch state*, so the pin is provisional and is
  re-pointed at the launch commit. `repo` and `framework` stay live — they are places, not
  snapshots.
- A permalink only resolves if the commit reaches the public repository. A squash merge of the
  build branch collapses this history and 404s all four links; the merge must preserve it.
- Blob URLs render as readable pages on GitHub rather than raw markdown, which is why the
  `VERIFY ⎘` chip in §1 shares link 5's URL exactly (DEC-056; the two strings must stay byte-equal —
  QA checks equality between this table and the chip).
- All six hrefs are inert navigation links: no prefetch attributes, no fetching reference. An
  `<a href>` is permitted under the amended network guard.

## 4. The contact link

The footer's final block, on its own line. The visible text is the destination, so accessible name
and target are the same string — same pattern as §6's link.

| Slot | String |
|---|---|
| Link text | `github.com/thinkArhant` |
| `href` | `https://github.com/thinkArhant` |

No email ships anywhere on the page; the profile carries it for anyone who wants it (DEC-056).

## 5. Measured counts — against the ceilings

| String | Ceiling | Measured |
|---|---|---|
| Closing sentence (recommended) | ≤ 40 | **33** |
| Alternate B | ≤ 40 | **40** |
| Alternate C | ≤ 40 | **32** |
| Receipts labels | seed's labels + `framework` | 6 labels |

Counting convention: whitespace-delimited tokens containing at least one letter or digit; numerals
and compounds (`UI/UX`) count as one; standalone punctuation and separators count as zero.

## 6. Verification statement

Checked line by line against `copy-rules.md` (all three candidates):

- **R1 / R4 / R5** — the footer's only numerals are `5`, `8`, `1`: a measured participation count
  (DEC-054, `git log` by commit subject), the roster size, and the operator count. "The other
  three" is a word, not a numeral, and is arithmetic a reader performs on the stated count, not a
  new figure. No performance or cost claim, no metric, no scope mixing. Nothing rounded, nothing
  invented, no dash case arises.
- **R2 / R3** — no time claim, no cost claim, no baseline of any kind.
- **R6** — "proven" appears nowhere; the footer asserts participation, and links to the artifacts
  that let a reader re-derive it.
- **R7** — no first person. "his own products" is third-person about the named author.
- **R8** — the team is named as AI ("Muster's AI team"); "the Muster team" unqualified appears
  nowhere; the sentence states participation, not roster size, and the operator is counted
  separately and named separately. "Designed and built by Kanwar Sandhu" is scoped by the sentence's
  own first clause — the team's work is named before the author's — and by "with it": what he built
  solo is the framework and the products, not this page's strings.
- **R9** — the footer adds no CTA: the receipts row is provenance the seed itself specifies, not an
  invitation; no newsletter, no Discord, no stars badge, no community furniture. The page's one
  CTA remains §6's `curl`.
- **R10** — no version string.
- **R11** — no coinage misused, no insider term.
- **R12** — all seven URL strings above are stated and verified as strings against DEC-056's
  founder-supplied values; nothing was fetched. `muster.build` appears nowhere. No email string
  appears anywhere in this file's shipping strings. The permalink forms, when pinned, must remain
  `github.com/thinkArhant/muster-ai-site/blob/<sha>/...` — same host, same repo, SHA in the path.
- **`brand-guidelines.md` §5** — no banned adjective, no exclamation mark, no superlative;
  attribution naming follows §5's non-negotiable form.
