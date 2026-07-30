# §6 Copy — get started

**Surface type**: every Content-owned string in §6 — one lead line, two commands, one link (copy
deliverable)
**Consumers**: Developer (builds the strings verbatim; the `curl` is byte-identical to §1's), PM
(reviews against the copy rules), QA (string-equality and URL checks)
**Sources**: `product-spec-seed.md` §6 (founder-authored, read-only) and
`agent-skills/content/copy-rules.md` R12, which holds the verified `curl`. Governed by
`copy-rules.md` and `brand-guidelines.md` §5.

---

## 1. Rules this file is written under

- **Product voice.** §6 is not one of the two permitted first-person places (R7).
- **One CTA (R9, A-009).** The `curl` plus one GitHub link is the whole conversion surface. No
  signup, no newsletter, no Discord, no stars badge, no license badge, no "star us", no next-steps
  list.
- **The `curl` is verified by string equality, never by fetching.** It is byte-identical to
  `copy-rules.md` R12 and to §1's curl string; §1's harness already asserts the three are byte-equal.
- **`muster.build` is fictional and must never appear** (R12, A-003). The trap lives in
  `design-specs/direction-reference.html`, which is a feel reference and never a copy source.
- **Word counting convention**: as in the sibling copy files — script-measured.

## 2. Section chrome

- **Section heading (`<h2>`)**: `§06 · GET STARTED`

## 3. The lead line

**Budget: ≤ 18 words** — one line at the reading column on desktop, two at phone; §6's job is to get
out of the way of the command. Written: **15**.

```
One command. No signup, no framework install, no API wiring — markdown files and Claude Code.
```

| Claim | Source |
|---|---|
| One command; no signup, no framework install, no API wiring | Seed §6 message, verbatim shape |
| Markdown files and Claude Code | Seed §6 ("markdown files + Claude Code"); seed → What this product is ("for Claude Code") |

The line states the prerequisite rather than hiding it: Claude Code is required, and a reader who
does not have it learns that before running anything.

## 4. The commands

### 4.1 The `curl` — one string, byte-identical everywhere it appears

```
curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product
```

Verified by string equality against `copy-rules.md` R12 (the verified form) and
`section-01-copy.md` §8 (the hero's string). All three are byte-equal; no fetch was performed.

### 4.2 Then

```
cd my-product && claude
```

Source: seed §6, verbatim. The directory name matches the `curl`'s `bash -s my-product` argument, and
the two strings drift together or not at all — a reader who edits the project name in the first
command must edit it in the second, which is why they are shown adjacent and unannotated.

**Build notes on the commands** (treatment, stated because §6 has no separate design spec):

- The blinking cursor belongs after the `curl` (seed §6; `page-shell.md` §10.4). It is the page's
  only cursor, `aria-hidden`, and carries no text.
- If a prompt glyph (`$`) is rendered, it is decorative: `aria-hidden`, outside the selectable command
  text, and never part of what a reader copies. A `$` inside the copied string breaks the command.
- No copy-to-clipboard control is specified. §1's interactive inventory is exactly one element (the
  `VERIFY ⎘` chip) and §6's is one — the link. Copying is a text selection, as it is in every
  terminal the reader already uses. If the build rules that a copy affordance earns its place, it is a treatment of the existing
  CTA rather than a second one, and no new copy is needed.

## 5. The link

One GitHub link. Visible text is the URL, so the link's accessible name and its destination are the
same string and nothing needs an `aria-label`:

| Slot | String |
|---|---|
| Link text | `github.com/thinkArhant/muster-ai` |
| `href` | `https://github.com/thinkArhant/muster-ai` |

Source: seed → What this product is (`github.com/thinkArhant/muster-ai`) and seed §6 ("One GitHub
link"). The repository is the same one the `curl` reads its setup script from, which is what makes
the command checkable before it is run.

## 6. The section inventory — what §6 does not carry

The seed's §6 closes with "Nothing else," and that is a content ruling, so this file states what it
excludes:

- **No `VERIFY ⎘` chip.** The chip is §1's, beside the numbers it verifies; §6 makes no measured
  claim, so there is nothing there for it to verify. (If the build rules a chip into §6 anyway, the
  string already exists in `section-01-copy.md` §7 and this file adds none.)
- **No license line, no version string, no requirements list, no "what happens next" copy, no
  troubleshooting note, no footer duplication.** The footer carries authorship and links; §6 carries
  a command.
- **No second CTA of any kind** (R9, A-009).

## 7. Verification statement

- **R1 / R4 / R5** — §6 contains no measured value, no metric, and no scope claim; nothing can be
  rounded or scope-mixed.
- **R2 / R3** — no time claim, no cost claim, no baseline. §6 does not say how long setup takes.
- **R6** — "proven" does not appear.
- **R7** — first person appears nowhere.
- **R8** — no attribution claim in §6.
- **R9** — exactly one CTA: the `curl` and one GitHub link. No community furniture.
- **R10** — no version string appears; the eyebrow's `v4` is §1's and stays there.
- **R12** — both URLs are real: `raw.githubusercontent.com/thinkArhant/muster-ai` (the verified
  `curl`) and `github.com/thinkArhant/muster-ai` (the repository). `muster.build` appears nowhere in
  this file or its strings.
- **`brand-guidelines.md` §5** — no banned adjective, no exclamation mark, no "coming soon", no
  superlative.
