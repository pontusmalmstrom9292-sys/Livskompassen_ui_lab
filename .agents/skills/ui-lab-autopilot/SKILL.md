---
name: ui-lab-autopilot
description: Complete exactly one ready Livskompassen UI Lab backlog milestone with typed mock data, governance updates, deterministic tests, and guarded GitHub delivery. Use for scheduled or unattended UI Lab implementation, backlog continuation, autonomous module work, or requests to finish the next governed milestone without user supervision.
---

# UI Lab Autopilot

## Required reading

Read, in order:

1. `AGENTS.md`
2. `docs/AUTOPILOT_BACKLOG.md`
3. `docs/MODULE_REGISTRY.md`
4. `docs/MOCKUP_CATALOG.md`
5. `docs/DESIGN_DECISIONS.md`
6. [references/autonomy-policy.md](references/autonomy-policy.md)

## Workflow

1. Require a clean worktree based on the current default branch. Never work
   directly on `main`.
2. Select exactly the first `ready` backlog item whose dependencies are `done`.
   If none exists, report completion or the blocking IDs and stop.
3. Inspect the affected implementation, manifests, typed mockdata and governance
   files. State scope, files, UX impact and locked-UX impact before editing.
4. Change the selected backlog item to `in_progress` in the same branch.
5. Implement only its documented delivery and acceptance criteria. Use typed,
   fictional data and the existing design system.
6. Add or update Vitest and Playwright coverage for every changed behavior.
7. Run `npm run check`. Fix failures within scope; never weaken or skip a gate.
8. Update the module registry, mockup catalog, changelog and backlog status when
   their current rules require it. Routine promotion is allowed only when the
   backlog already defines objective acceptance criteria.
9. Review `git diff` for secrets, production references, unrelated changes and
   accidental lockfile churn.
10. Commit the bounded change on a `codex/autopilot-<id>` branch and push it.
11. Open a PR with validation evidence. Enable auto-merge only for `safe` items;
    create a draft PR for `review` items.

## Failure behavior

- Fail closed on ambiguity, missing acceptance criteria, failing validation or
  any boundary in the autonomy policy.
- Never retry by broadening permissions, touching production or weakening tests.
- Leave a concise blocker with exact evidence. Continue no other backlog item in
  the same run.
