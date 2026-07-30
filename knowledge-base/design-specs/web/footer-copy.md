# Footer Copy — the closing signature

**Surface type**: every Content-owned string in the page footer — the team line, the receipts row
(six link labels and their URLs), and the authorship line with its contact link (copy deliverable)
**Consumers**: Developer (builds the strings and hrefs verbatim), UI/UX (the footer inherits the
page's alignment system), PM (reviews against the participation truth), QA (string equality and
link-string checks), the founder (pre-approved the participation phrasing, DEC-056)
**Sources**: `product-spec-seed.md` → Footer (read-only), as amended by the founder on two points
(DEC-056): the "8 agents" line yields to true participation, and no raw email ships.
The participation count is measured — `git log` by commit subject (DEC-054). Governed by
`agent-skills/content/copy-rules.md` and `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **The seed specifies the footer in full**; this file ships it, with exactly the two founder-ruled
  amendments and nothing else added. No bio, no photo, no social row (seed → Footer).
- **True participation, not roster** (DEC-054, DEC-056): five roles ran this build — PM, Developer,
  UI/UX, QA, Content; Marketing, Legal, and Research were never invoked (zero commits, all three
  null in `agent-context/.populated`). §1's `8 AI agents · 1 operator` caption stays as the roster
  label; the footer states what actually ran. The two never collide because each names its scope.
- **No raw email anywhere on the page** (DEC-056): the GitHub profile link is the contact path; the
  profile carries the email for anyone who wants it.
- **Every URL is stated as a string and verified by string equality** (R12) — never by fetching.
- **The footer carries no lockup** (`brand-guidelines.md` §4): the authorship line is the closing
  signature.
- **First person appears nowhere here** (R7): both footer lines are third-person statements about
  who did what; §5's provenance line and §4's decisions remain the page's only first-person places.
- **Ceilings, script-measured** (word-counting convention as in `section-04-copy.md` §1): team line
  ≤ 35 words; authorship line is seed-verbatim at 14 words. Measured counts in §5.

## 2. The team line

The seed's construction, amended to the measured truth:

```
Specced, written, and reviewed by Muster's AI team — 5 of 8 agents, 1 operator. PM, Developer, UI/UX, QA, and Content ran this build; Marketing, Legal, and Research were never invoked.
```

| Claim | Source |
|---|---|
| Specced, written, and reviewed by Muster's AI team | seed → Footer, verbatim |
| 5 of 8 agents | measured: `git log` on this branch by commit subject — pm, developer, ui-ux, qa, content have commits; marketing, legal, research have zero (DEC-054). 8 is the roster (copy-rules → scope table) |
| 1 operator | seed → Footer, verbatim |
| The five named ran; the three named were never invoked | DEC-054's measurement, stated so the claim is checkable role by role against the receipts row's own links |

The second sentence is what makes the count auditable rather than asserted: a reader can open the
queue or the handoff ledger linked one line below and check every name.

## 3. The receipts row

Six links. Labels ship lowercase as the seed writes them, `VERIFY` uppercase as the seed writes it.
Visible text is the label; the accessible name is the label (no `aria-label` needed — every label
is a real word or a known file name).

| # | Label | `href` |
|---|---|---|
| 1 | `repo` | `https://github.com/thinkArhant/muster-ai-site` |
| 2 | `queue` | `https://github.com/thinkArhant/muster-ai-site/blob/main/knowledge-base/orchestration-queue.md` |
| 3 | `handoffs` | `https://github.com/thinkArhant/muster-ai-site/blob/main/knowledge-base/agent-requests.md` |
| 4 | `decision log` | `https://github.com/thinkArhant/muster-ai-site/blob/main/knowledge-base/decision-log.md` |
| 5 | `VERIFY` | `https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md` |
| 6 | `framework` | `https://github.com/thinkArhant/muster-ai` |

- Order is the seed's five (`repo · queue · handoffs · decision log · VERIFY`), then `framework` —
  this site's receipts first, the thing they prove second.
- Blob URLs point at `main` so they survive branch deletion after merge; they render as readable
  pages on GitHub rather than raw markdown, which is why the `VERIFY ⎘` chip in §1 shares link 5's
  URL exactly (DEC-056; the chip's `href` change is the build's job, but the two strings must stay
  byte-equal — QA checks equality between this table and the chip).
- All six hrefs are inert navigation links: no prefetch attributes, no fetching reference. An
  `<a href>` is permitted under the amended network guard.

## 4. The authorship line

Seed-verbatim, followed by the contact link. The email in the seed's footer spec does not ship —
founder ruling, amending his own seed (DEC-056).

```
Designed and built by Kanwar Sandhu, solo, while shipping his own products with it.
```

| Slot | String |
|---|---|
| Link text | `github.com/thinkArhant` |
| `href` | `https://github.com/thinkArhant` |

- "it" = Muster: the line's subject is the framework's author, and "shipping his own products with
  it" is what keeps the sentence from contradicting the team line above — the framework is his; the
  page's strings are the team's.
- The link's visible text is the URL, so accessible name and destination are the same string —
  same pattern as §6's link.

## 5. Measured counts — against the ceilings

| String | Ceiling | Measured |
|---|---|---|
| Team line (both sentences) | ≤ 35 | **30** |
| Authorship line | seed-verbatim | **14** |
| Receipts labels | seed's labels + `framework` | 6 labels |

Counting convention: whitespace-delimited tokens containing at least one letter or digit; numerals
and compounds (`UI/UX`) count as one; standalone punctuation and separators count as zero.

## 6. Verification statement

Checked line by line against `copy-rules.md`:

- **R1 / R4 / R5** — the footer's only numerals are `5`, `8`, `1`: a measured participation count
  (DEC-054, `git log` by commit subject), the roster size, and the operator count. No performance
  or cost claim, no metric, no scope mixing — the line itself is the scope statement ("this
  build"). Nothing rounded, nothing invented, no dash case arises.
- **R2 / R3** — no time claim, no cost claim, no baseline of any kind.
- **R6** — "proven" appears nowhere; the footer asserts participation, and links to the artifacts
  that let a reader re-derive it.
- **R7** — no first person. "his own products" is third-person about the named author.
- **R8** — the team is named as AI ("Muster's AI team"); "the Muster team" unqualified appears
  nowhere; no phrasing lets a reader assume humans wrote the deliverables — the operator is
  counted separately and named separately.
- **R9** — the footer adds no CTA: the receipts row is provenance the seed itself specifies, not an
  invitation; no newsletter, no Discord, no stars badge, no community furniture. The page's one
  CTA remains §6's `curl`.
- **R10** — no version string.
- **R11** — no coinage misused, no insider term.
- **R12** — all seven URL strings above are stated and verified as strings against DEC-056's
  founder-supplied values; nothing was fetched. `muster.build` appears nowhere. No email string
  appears anywhere in this file's shipping strings.
- **`brand-guidelines.md` §5** — no banned adjective, no exclamation mark, no superlative;
  attribution naming follows §5's non-negotiable form.
