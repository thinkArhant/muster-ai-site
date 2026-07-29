# §3 Copy — the insight

**Surface type**: the §3 reading passage — kicker plus one paragraph (copy deliverable)
**Consumers**: Developer (builds the strings verbatim), PM (reviews against the copy rules)
**Sources**: claims trace to `product-spec-seed.md` §3 and §4 (founder-authored, read-only) and the
founder ruling recorded in `decision-log.md` DEC-047, cited per claim below. Copy is governed by
`agent-skills/content/copy-rules.md`.

---

## 1. Rules this file is written under

- **Product voice.** §3 is not one of the two permitted first-person places (R7).
- **§3 carries no numerals**, so no measurement scope applies — deliberately: the argument here is
  mechanism, and the numbers stay where their scope labels live.
- **One recognition hook** (R11): "context engineering" is spent here, once, attached to the
  curated-slice sentence — never as a standalone flourish — and appears nowhere else on the page.
- **No named competitor appears anywhere on the page** (DEC-047). §3's contrast is Muster vs **bare
  Claude Code** — the reader's own lived experience.
- **Honesty boundaries (hard, DEC-047)**: mechanism claims only — no comparative token or benchmark
  claim against bare Claude Code, because none is measured. Never a capability dig at Claude Code:
  Muster runs on it, and the claim is about **who carries the context at production scale**, not about
  capability. The scaling claim renders as architecture, not promise.
- **Word counting convention**: as in the sibling copy files — whitespace-delimited tokens containing
  a letter or digit; script-measured.

## 2. Section chrome

- **Section heading (`<h2>`)**: `§03 · THE INSIGHT`

## 3. The kicker

**Budget: ≤ 12 words** — it is the section's five-second read. Written: **6**.

```
The product grows. The briefing doesn't.
```

| Claim | Source |
|---|---|
| The whole line | Founder-supplied kicker, his pick of three candidates (DEC-047); the compounding claim that is §3's spine |

**Wrap rule for the build** (spec home: `page-shell.md`): each kicker sentence is an
unbreakable-preferred unit — an inline-block span, the headline's mechanism family. Measured
behaviour: one line at desktop; sentence-boundary break at 375px; internal wrap without overflow
at 320px.

## 4. The paragraph

**Budget: ≤ 90 words.** Written: **90** — founder-confirmed against the render, byte-exact; this
string may not be re-tightened or re-expanded without a founder ruling.

```
Muster puts eight AI roles under one human operator, coordinating through markdown files and a queue. Used bare, Claude Code makes you the memory: every session starts with re-explaining, and the re-explaining grows with the product. Muster moves that job into the system. Decisions land in a knowledge base; each session reads a curated slice — a small always-on tier, the rest on demand, most never — context engineering, per role. The product grows; what a session reads stays bounded. Mechanics run as scripts, judgment in prose — it holds on cheap models.
```

| Claim | Source |
|---|---|
| Eight AI roles, one operator, files and a queue | Seed rule 8 ("8 agents, 1 operator"); seed rule 11 coinage territory (*the queue is the org chart*), stated as fact — the page's only prose statement of it |
| Used bare, Claude Code makes you the memory; re-explaining grows with the product | DEC-047 ruling 2 — the operator's job under bare use, never a Claude Code capability claim |
| Muster moves that job into the system; decisions land in a knowledge base; curated per-role slice | DEC-047 mechanism claims (persistent knowledge base, curated per-role slice, capped reads) |
| A small always-on tier, the rest on demand, most never | Seed §4 decision 1 (founder-authored), kept verbatim in its short form |
| Context engineering, per role | R11's one permitted recognition hook, attached to the curated-slice sentence |
| The product grows; what a session reads stays bounded | DEC-047 — the compounding claim rendered as architecture, not promise |
| Mechanics run as scripts, judgment in prose — holds on cheap models | Seed §3 close, verbatim shape; seed §4 decision 2 mechanism ("runs safely on small, cheap models") |

**Reading of the sensitive sentence, binding on any future edit**: "makes you the memory" states the
operator's job when Claude Code is used bare — not a limit of Claude Code. If a future revision needs
a softer form, the pre-authored replacement is *"the context lives in your head and your prompts."*

## 5. Verification statement

No numerals appear in §3, so nothing can be rounded, precision-inflated, or scope-mixed. No competitor
is named — here or anywhere on the page (DEC-047) — and no universal claim is made about other
frameworks. No comparative benchmark against bare Claude Code appears; every contrast claim is a
mechanism claim. No banned adjective, no exclamation mark, no "proven." First person appears nowhere.
"Context engineering" appears exactly once in this file's shipping string and must appear nowhere else
on the page. Insider terms (*cascade lag*, *cold-start sufficiency*) do not appear. Word counts above
are script-measured under the stated convention.
