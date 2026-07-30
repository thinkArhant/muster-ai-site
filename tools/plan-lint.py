#!/usr/bin/env python3
"""Referential-integrity lint for an orchestration queue.

`muster-queue-lint.sh` checks STRUCTURE (one fenced Next Step, a valid Role: per block).
This checks whether the plan's references actually resolve — which is where plans break.

Implements FF-001 → R1 and R5. Not in `scripts/` on purpose: verify-shell.mjs globs that
directory into the shipped set and the zero-request surface.

Usage: python3 tools/plan-lint.py [queue.md]
Exit 0 clean, 1 on any defect.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = sys.argv[1] if len(sys.argv) > 1 else "knowledge-base/orchestration-queue.md"

defects = []
notes = []


def defect(kind, msg):
    defects.append(f"{kind}: {msg}")


src = open(os.path.join(ROOT, QUEUE)).read()

# --- carve the file into steps -------------------------------------------------
# A step is a "### heading" followed by a fenced block.
steps = []
for m in re.finditer(r"^### (.+?)\n+```\n(.*?)\n```", src, re.S | re.M):
    title, body = m.group(1).strip(), m.group(2)
    role = re.search(r"^Role:\s*(\S+)", body, re.M)
    steps.append({
        "title": title,
        "body": body,
        "role": role.group(1) if role else None,
        "pos": m.start(),
    })

if not steps:
    defect("PARSE", "no fenced steps found — is this an orchestration queue?")
    print("\n".join(defects))
    sys.exit(1)

work = [s for s in steps if s["role"] != "halt"]
gates = [s for s in steps if s["role"] == "halt"]
notes.append(f"{len(steps)} steps parsed — {len(work)} work, {len(gates)} gate(s)")

# --- 1. every work step declares a deliverable ---------------------------------
for s in work:
    if not re.search(r"\*\*Deliverable:?\*\*", s["body"]):
        defect("NO-DELIVERABLE", f'"{s["title"]}" has no **Deliverable:** line')

# --- 2. blocked-path instruction is INSIDE every work fence --------------------
# The Sprint-1 defect: it lived only in HTML comments outside the fences, so no
# specialist ever received it in its payload.
for s in work:
    # PM is exempt: it is the only role permitted to set `Role: halt`, so telling a PM
    # step never to halt would be wrong. Specialists must all carry the instruction.
    if s["role"] == "pm":
        continue
    if not re.search(r"(do NOT set|never set)\s*`?Role: halt`?", s["body"], re.I):
        defect("NO-BLOCKED-PATH", f'"{s["title"]}" does not tell a blocked agent what to do instead of halting')

# --- 3. handoff IDs: contiguity, and every consumed ID has a producer ----------
# The queue is a living document: completed steps are summarized into the run log
# outside any fence. An ID that appears there was produced by a finished step and
# is neither an orphan nor a gap.
outside = src
for m in re.finditer(r"^### (.+?)\n+```\n(.*?)\n```", src, re.S | re.M):
    outside = outside.replace(m.group(0), "")

produced = {}   # HO-id -> index of producing step (-1 = completed, in the run log)
consumed = {}   # HO-id -> list of consuming step indices
for ho in set(re.findall(r"HO-(\d{3})", outside)):
    produced.setdefault(ho, -1)
for i, s in enumerate(steps):
    for ho in set(re.findall(r"HO-(\d{3})", s["body"])):
        if re.search(rf"File HO-{ho}\b|;\s*HO-{ho}\b|HO-{ho}\.\s*$", s["body"], re.M):
            produced.setdefault(ho, i)
    for ho in set(re.findall(r"HO-(\d{3})", s["body"])):
        consumed.setdefault(ho, []).append(i)

# Contiguity is judged over the LIVE fenced steps only. The run log rotates (Done keeps 10),
# so historical IDs legitimately vanish from the file — a gap against history is rotation,
# not a planning typo. Orphan/order checks above still honour run-log IDs as produced.
fenced_ids = {ho for s in steps for ho in re.findall(r"HO-(\d{3})", s["body"])}
# "HO-024 through HO-029" names every id in the span — expand ranges before judging gaps.
for s in steps:
    for a, b in re.findall(r"HO-(\d{3})\s+through\s+HO-(\d{3})", s["body"]):
        fenced_ids.update(f"{n:03d}" for n in range(int(a), int(b) + 1))
fenced_ids = sorted(fenced_ids)
if fenced_ids:
    lo, hi = int(fenced_ids[0]), int(fenced_ids[-1])
    missing = [f"{n:03d}" for n in range(lo, hi + 1) if f"{n:03d}" not in fenced_ids]
    if missing:
        defect("HO-GAP", f"handoff IDs in live steps are not contiguous — missing {', '.join(missing)} between HO-{lo:03d} and HO-{hi:03d}")

for ho, users in consumed.items():
    if ho not in produced:
        # ranges like "HO-024 through HO-030" legitimately name unproduced-yet ids
        defect("HO-ORPHAN", f"HO-{ho} is referenced but no step produces it")
    else:
        for u in users:
            if u < produced[ho]:
                defect("HO-ORDER",
                       f'HO-{ho} is consumed by "{steps[u]["title"]}" before "{steps[produced[ho]]["title"]}" produces it')

# --- 4. file paths in Inputs resolve on disk, or are produced upstream ---------
# Collect every path a step declares it will create.
created = {}
for i, s in enumerate(steps):
    d = re.search(r"\*\*Deliverable:?\*\*(.*?)(?:\n\*\*|\Z)", s["body"], re.S)
    if d:
        for p in re.findall(r"`([^`\s]+\.[a-z]{2,4})`", d.group(1)):
            created.setdefault(os.path.basename(p), i)

for i, s in enumerate(steps):
    inp = re.search(r"\*\*Inputs:?\*\*(.*?)(?:\n\*\*|\Z)", s["body"], re.S)
    if not inp:
        continue
    last_dir = ""
    for p in re.findall(r"`([^`\s]+\.[a-z]{2,4})`", inp.group(1)):
        base = os.path.basename(p)
        # A bare filename continuing a path list inherits the previous entry's
        # directory: `a/b/x.md`, `y.md` means a/b/y.md.
        if "/" in p:
            last_dir = os.path.dirname(p)
        on_disk = os.path.exists(os.path.join(ROOT, p)) or \
            ("/" not in p and last_dir and os.path.exists(os.path.join(ROOT, last_dir, p)))
        if on_disk:
            continue
        if base in created:
            if created[base] > i:
                defect("INPUT-ORDER",
                       f'"{s["title"]}" consumes {base}, produced later by "{steps[created[base]]["title"]}"')
            continue
        defect("MISSING-INPUT", f'"{s["title"]}" lists `{p}` — not on disk and no step creates it')

# --- 5. every DEC-NNN resolves --------------------------------------------------
dec_text = ""
for f in ("knowledge-base/decision-log.md", "knowledge-base/decision-log-archive.md"):
    fp = os.path.join(ROOT, f)
    if os.path.exists(fp):
        dec_text += open(fp).read()
known = set(re.findall(r"^### (DEC-\d{3})", dec_text, re.M))
for s in steps:
    for d in sorted(set(re.findall(r"DEC-\d{3}", s["body"]))):
        if d not in known:
            defect("DEC-DANGLING", f'"{s["title"]}" cites {d}, which is in no decision log')

# --- 6. `file` line NNN citations point at a plausible symbol -------------------
# Matches: `styles/replay.css` — `.log` at line 116     /     `verify-shell.mjs:533`
for s in steps:
    for path, sym, line in re.findall(r"`([\w./-]+\.(?:css|js|mjs|html))`[^\n]*?`([^`]+)`\s*at line (\d+)", s["body"]):
        fp = os.path.join(ROOT, path)
        if not os.path.exists(fp):
            defect("CITE-PATH", f'"{s["title"]}" cites {path}, which does not exist')
            continue
        lines = open(fp).read().split("\n")
        n = int(line)
        if n < 1 or n > len(lines):
            defect("CITE-RANGE", f"{path}:{n} is past end of file ({len(lines)} lines)")
            continue
        window = "\n".join(lines[max(0, n - 3):n + 2])
        if sym.strip() not in window:
            defect("CITE-SYMBOL", f'{path}:{n} does not contain `{sym}` (cited in "{s["title"]}")')

    for path, line in re.findall(r"`([\w./-]+\.(?:css|js|mjs|html)):(\d+)", s["body"]):
        fp = os.path.join(ROOT, path)
        if not os.path.exists(fp):
            # tests/verify-shell.mjs cited bare is fine if it exists at that relative root
            alt = os.path.join(ROOT, "tests", os.path.basename(path))
            if not os.path.exists(alt):
                defect("CITE-PATH", f'"{s["title"]}" cites {path}, which does not exist')
                continue
            fp = alt
        total = len(open(fp).read().split("\n"))
        if int(line) > total:
            defect("CITE-RANGE", f"{path}:{line} is past end of file ({total} lines)")

# --- 7. exactly one fenced step under ## Next Step ------------------------------
nxt = src.find("## Next Step")
upc = src.find("## Upcoming")
if nxt != -1 and upc != -1:
    n_steps = len(re.findall(r"^### .+?\n+```", src[nxt:upc], re.S | re.M))
    if n_steps != 1:
        defect("NEXT-STEP", f"expected exactly 1 step under ## Next Step, found {n_steps}")

# --- report ---------------------------------------------------------------------
for n in notes:
    print(f"  {n}")
if defects:
    print()
    for d in defects:
        print(f"FAIL  {d}")
    print(f"\n{len(defects)} defect(s) — plan is not ready to run")
    sys.exit(1)
print("\nOK: plan references resolve — deliverables, handoff order, inputs, decisions, citations all clean")
sys.exit(0)
