# Footer Copy — the closing signature

**Surface type**: every Content-owned string in the page footer — one closing sentence (team truth +
authorship merged), the receipts row (six link labels and their URLs), and the contact link (copy
deliverable)
**Consumers**: UI/UX (lays out the one-sentence footer), Developer (builds the ruled strings and
hrefs verbatim), PM (reviews against the participation truth), QA (string equality and link-string
checks)
**Sources**: `product-spec-seed.md` → Footer (read-only), as amended by the founder on three points:
the "8 agents" line yields to true participation, no raw email ships, and the team line and the
authorship line are one sentence. The participation count is measured — `git log` by commit subject.
Governed by `agent-skills/content/copy-rules.md` and `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **The footer is three blocks** (founder ruling): one sentence carrying the team truth and the
  authorship, the receipts row beneath it, and one final link. Nothing else — no bio, no photo, no
  social row (seed → Footer).
- **True participation, not roster**: five roles ran this build — PM, Developer, UI/UX, QA, Content;
  Marketing, Legal, and Research were never invoked (zero commits, all three null in
  `agent-context/.populated`). §1's `8 AI agents · 1 operator` caption is the roster label; the
  footer states what actually ran. The two never collide because each names its scope.
- **No raw email anywhere on the page**: the GitHub profile link is the contact path; the profile
  carries the email for anyone who wants it.
- **Every URL is stated as a string and verified by string equality** (R12) — never by fetching.
- **The footer carries no lockup** (`brand-guidelines.md` §4): the closing sentence is the
  signature.
- **First person appears nowhere here** (R7): the sentence is a third-person statement about who did
  what; §5's provenance line and §4's decisions remain the page's only first-person places.
- **Ceiling, script-measured** (word-counting convention as in `section-04-copy.md` §1): the
  sentence ≤ 40 words. Rationale: it sets at lead scale — the largest text in the footer — and its
  shape is two clauses with one em-dash aside between them. The ceiling is what keeps the aside an
  aside: past 40 words the participation facts outweigh the two clauses they qualify, and the page
  closes on a recital instead of a signature. The number is calibrated, not guessed — a form naming
  all eight roles inside the sentence measures 42, and that form is the recital. Measured count in
  §5.

## 2. The closing sentence

One sentence, team truth first, authorship closing it — the participation facts ride as an em-dash
aside so the sentence scans as a signature, not a roster recital. The five roles that ran and the
three that did not are named in `VERIFY.md` and enumerable from the queue and handoff ledger linked
directly beneath the sentence, which is what keeps the count falsifiable without the names in the
footer.

**The string, founder-ruled and final:**

```
Specced, written, and reviewed by Muster's AI team — 5 of 8 agents, the other three never invoked, 1 operator — on a framework designed and built by Kanwar Sandhu, solo, shipping his own products with it.
```

| Claim | Source |
|---|---|
| Specced, written, and reviewed by Muster's AI team | seed → Footer, verbatim |
| 5 of 8 agents | measured: `git log` on this branch by commit subject — pm, developer, ui-ux, qa, content have commits; marketing, legal, research have zero. 8 is the roster (copy-rules → scope table) |
| the other three never invoked | the same measurement, stated so the count carries its own falsifier — a reader opens the queue or handoff ledger one line below and checks |
| 1 operator | seed → Footer, verbatim |
| on a framework designed and built by Kanwar Sandhu, solo, shipping his own products with it | seed → Footer authorship line, founder-ruled phrasing. "it" = Muster |

**Why the sentence is shaped this way:**

- **The team truth leads** because it is the footer's highest-priority fact — the claim the page's
  receipts exist to prove, and the one a skeptic checks first.
- **"On a framework" is the scoping clause, and it is doing real work.** The page carries two
  authorship claims that could collide: the AI team wrote the deliverables, and one person built the
  thing they wrote them with. Naming *the framework* as what was designed and built keeps them
  apart — without it, "designed and built by Kanwar Sandhu" sits in the same sentence as the team's
  work with nothing saying which is which. It also gives the sentence one connective instead of a
  second "and" competing with the first.
- **The eight role names stay out of the sentence but not out of the record**: `VERIFY.md` names all
  eight, and the linked queue and ledger carry the per-role evidence.
- **"Solo" lands directly beside "AI team,"** which is the page's whole proposition in four words.
- At 35 words it reads in one breath and holds five words under the ceiling.

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
| 5 | `VERIFY` | `https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md` |
| 6 | `framework` | `https://github.com/thinkArhant/muster-ai` |

- Order is the seed's five (`repo · queue · handoffs · decision log · VERIFY`), then `framework` —
  this site's receipts first, the thing they prove second.
- Three artifact links (queue, handoffs, decision log) are commit-SHA blob permalinks chosen by the
  founder's demo-in-itself criterion (DEC-059) — each pins the moment that file is most a
  demonstration of itself, not merely the moment it was longest. `queue` → `9b26788`, 16 steps
  queued ahead of the run. `handoffs` → `bded0dd`, 11 entries filed and open at once, and both entry
  types on one screen. `decision log` → `b41ed56`, current depth. Their demo moments are in the
  past, which is what makes a snapshot the right form.
- `VERIFY` is the fourth artifact link and the one exception: it points at `blob/main`, live. The
  same criterion produces the opposite answer, because the moment that file is most a demonstration
  of itself is *the launch state* — and `main` at launch **is** that state by construction. A pin
  here would be a snapshot requiring a re-pin step that a later session could forget; a live link
  cannot rot. `repo` and `framework` stay live for the different reason that they are places, not
  snapshots.
- A permalink only resolves if the commit reaches the public repository. A squash merge of the
  build branch collapses this history and 404s the three pinned links; the merge must preserve it.
  `blob/main` survives either merge strategy, which is a second reason VERIFY is not pinned.
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
| Closing sentence | ≤ 40 | **35** |
| Receipts labels | seed's labels + `framework` | 6 labels |

Counting convention: whitespace-delimited tokens containing at least one letter or digit; numerals
and compounds (`UI/UX`) count as one; standalone punctuation and separators count as zero.

## 6. Verification statement

Checked line by line against `copy-rules.md`:

- **R1 / R4 / R5** — the footer's only numerals are `5`, `8`, `1`: a measured participation count
  (`git log` by commit subject), the roster size, and the operator count. "The other
  three" is a word, not a numeral, and is arithmetic a reader performs on the stated count, not a
  new figure. No performance or cost claim, no metric, no scope mixing. Nothing rounded, nothing
  invented, no dash case arises.
- **R2 / R3** — no time claim, no cost claim, no baseline of any kind.
- **R6** — "proven" appears nowhere; the footer asserts participation, and links to the artifacts
  that let a reader re-derive it.
- **R7** — no first person. "his own products" is third-person about the named author.
- **R8** — the team is named as AI ("Muster's AI team"); "the Muster team" unqualified appears
  nowhere; the sentence states participation, not roster size, and the operator is counted
  separately and named separately. "Designed and built by Kanwar Sandhu" is scoped twice over — by
  the sentence's own first clause, which names the team's work before the author's, and by "on a
  framework", which names what he built solo. What he built solo is the framework and the products;
  this page's strings are the team's.
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
