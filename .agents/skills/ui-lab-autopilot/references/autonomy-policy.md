# Autonomy Policy

## Safe auto-merge

An item is safe only when every condition holds:

- It is marked `safe` in `docs/AUTOPILOT_BACKLOG.md`.
- All edits stay inside this UI Lab repository.
- No canonical place, locked UX concept or approved design decision changes.
- No backend, auth, network product capability, production dependency, real data
  or secret is introduced.
- No new runtime dependency is added unless the backlog item explicitly permits it.
- `npm run check` passes and the diff contains only the selected milestone.

## Mandatory review

Create a draft PR and do not enable auto-merge when any change:

- is marked `review`;
- changes `AGENTS.md`, `docs/UI_LAWS.md` or `docs/DESIGN_DECISIONS.md`;
- selects between materially different variants or changes a module's zone;
- alters Barnfokus, P3 Kanban, Valvet tabs, HITL promotion, Journal/evidence
  separation or cognitive capacity gating;
- needs broader permissions or access outside the repository.

## Forbidden

Never modify, import, inspect for copying, or link to `Livskompassen3.0`.
Never deploy. Never use real user data. Never add Firebase, backend services,
Cloud Functions, production APIs, authentication, Capacitor or PWA behavior.
