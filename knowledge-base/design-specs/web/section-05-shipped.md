# §5 — Shipped with Muster: treatment

**Surface type**: §5's design ruling — the hierarchy of the three prose lines. Everything else in
the section (strings, cards, readout treatment) is owned elsewhere and unchanged by this file.
**Consumers**: Developer (builds the treatment), QA (derives the §5 hierarchy checks)
**Inherits**: every token in `page-shell.md`. No new size, weight outside the page's 400/700 pair,
colour, or motion token is introduced here.
**Sources**: strings are `section-05-copy.md`'s and are not restated here; card treatment is
`page-shell.md` §8's instrument readout cell.

---

## 1. The hierarchy ruling

**The provenance line is §5's primary line and carries the section's one emphasis: `--font-sans`
at `--text-body`, weight 700, full `--ink`. The Bodh line and the this-page line stay at
`--text-body` 400.** (DEC-060.)

The ranking, per the content-hierarchy method: if a reader takes one sentence from §5, it is the
provenance line — the founder-supplied claim that the framework existed as working practice before
it existed as a repo. The Bodh line introduces the exhibit and the this-page line ties the dashed
card to the meter; both are context for the claim, not the claim. Weight is the right lever
because scale is not free here: the section already carries two instrument cards and a heading,
and a second display-scale voice would compete with them.

**Bold-at-body is the page's own strongest-line grammar** — §4's sheets carry their bolded title
sentence at 700 and the mechanism rows bold their labels; §5's strongest line takes the same
weight and earns the same read.

## 2. Chosen from renders — and what was rejected

Both candidate treatments were rendered against the real tokens, dark theme, both engines, and
judged from the renders:

| Candidate | Verdict |
|---|---|
| Provenance at `--text-lead` scale, 700 | Rejected: at lead scale the line dominates the section and reads as a second heading — founder testimony in display dress, the exact posture §5's own ruling refuses when it keeps the line out of a readout cell |
| **Provenance at `--text-body`, 700** | **Ships.** Reads as the strongest sentence in a passage, not as chrome; the three lines stay one reading column with one clear primary |

## 3. What does not change

- Line order, spacing (`.shipped__line + .shipped__line` rhythm), the 64ch cap, and full-ink
  colour are untouched — this ruling spends exactly one lever, weight.
- The line's markup emphasis is style-scoped (a class or `<b>` per `page-shell.md` §3's
  in-passage emphasis rule); the announced string is unchanged, byte-equal to
  `section-05-copy.md` §3.2.
- No rust: the emphasis system is weight, never colour (`page-shell.md` §2.3).

## 4. Assertions

Two relationships:

1. **One primary line.** The three `.shipped__line` elements share one computed font-size
   (`--text-body`), and exactly one — the provenance line, matched by its string — computes
   weight 700; the other two compute 400. Fails if the hierarchy flattens, migrates to another
   line, or a size fork sneaks in with the weight.
2. **The emphasis is weight alone.** The provenance line's computed `color` equals the other
   lines' (`--ink`), and no element inside §5's prose block computes the accent as `color`.

## 5. Provenance

Decided here: the ruling that the provenance line is the primary and that weight at body size is
the lever — judged from rendered candidates, not on paper (DEC-060). From the direction
reference: nothing.
