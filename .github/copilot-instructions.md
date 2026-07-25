# Livskompassen UI Lab - Copilot Instructions

Follow `AGENTS.md` in the repository root as the canonical policy.

Mandatory constraints:

1. This repository is an isolated UI lab. Do not add backend, Firebase, auth, production APIs, Capacitor, PWA features or real user data.
2. Preserve canonical places: Hjartat, Familjen, Vardagen, Valvet. Fyren is background logic, not a fifth destination.
3. Keep locked UX concepts intact unless explicit PMIR warning and user approval are given.
4. Use typed mock data only.
5. Before coding, inspect affected files and state concise change scope and impact.
6. After relevant code changes, run `npm run typecheck` and `npm run build`.
7. Report: summary, changed files, validation status, locked UX impact, unresolved issues, one next step.

If any local instruction conflicts, prioritize safety, isolation, and locked UX preservation.
