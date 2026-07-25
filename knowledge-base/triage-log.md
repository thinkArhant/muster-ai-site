# Triage Log
<!-- Per-project audit log of observation dispositions. PM-owned. -->
<!-- Tier-2: read on demand only (during planning, or when auditing past calls) — NEVER a startup read. -->
<!-- Logs ALL dispositions (ACT / DEFER / IGNORE / ESCALATE), chronological. The silent autonomous handles (ACT/DEFER/IGNORE — made without a live founder) are exactly what this log exists to make auditable. -->
<!-- Archive at sprint closeout: move entries from before the current sprint to triage-log-archive.md (mirrors the decision-log.md rule, CLAUDE.md Rule 14). -->
<!-- Disposition flow + routing: team/pm/skills/generic/observation-triage.md. -->

<!-- Format (one line per disposition):
- YYYY-MM-DD | OBS-NNN (HO-NNN) | DISPOSITION | summary | rationale-or-target
  DISPOSITION ∈ ACT | DEFER | IGNORE | ESCALATE
  rationale-or-target: ACT → REQ-NNN / agent; DEFER → pre-launch-checklist or roadmap; IGNORE → why; ESCALATE → Founder Decisions title
-->

## Dispositions

- 2026-07-25 | OBS-001 (HO-001) | ACT | Model plan disagreed across two files — `current-sprint.md:55` named `claude-opus-4-8` while DEC-004 and every queue `Model:` line named `claude-opus-5` | PM error, fixed same session; see DEC-014. Root cause: the switch was applied to the queue with a targeted sed and verified with a grep on that same file, so the sprint board's prose was never checked. Cascade Lag Prevention Protocol requires a repo-wide grep for the old value — that step was skipped.
- 2026-07-25 | OBS-002 (HO-001) | ACT | Roster size and roles that ran differ — L1 says "8 roles standing by"; seven roles actually executed the wave | Confirmed at source by corpus v1.1 and now binding via DEC-013. Encoded in `copy-rules.md` as a named rule under the scope table rather than left as an inventory footnote, because the failure it prevents is a copy failure: narration implying all eight roles worked the wave. Developer's own suggested action was "none needed" — upgraded to ACT since Content, not Developer, is the party at risk.
- 2026-07-25 | HO-001 F1 | ESCALATE→resolved | Session table says 8 sessions; DEC-023 says "7 agent steps" | Escalated to Founder Decisions as non-blocking; answered at source in corpus v1.1 rather than by ruling. Both true: 8 sessions = 7 agent work-steps + the PM review session. See DEC-013.
