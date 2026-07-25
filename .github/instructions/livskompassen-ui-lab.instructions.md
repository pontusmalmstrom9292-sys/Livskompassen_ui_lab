---
applyTo: "**"
---

# Livskompassen UI Lab - Repository Instructions

Canonical policy source: `AGENTS.md`.

Enforce the following on every task:

- Treat this repository as a standalone frontend and design lab only.
- Never connect to production systems, services, data, credentials or source repositories.
- Keep UI decisions aligned with Obsidian Calm language and cognitive load reduction.
- Do not remove or redesign locked UX concepts without explicit PMIR warning and user approval.
- SuperModules must keep configuration and presentation separate and use typed manifests plus typed mock data.
- Avoid scope creep, broad refactors and unrelated architectural changes.
- For relevant code changes run `npm run typecheck` and `npm run build`.
- In task reports include locked UX impact explicitly.

When in doubt, prefer the stricter interpretation from `AGENTS.md`.
