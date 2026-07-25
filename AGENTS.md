# LIVSKOMPASSEN UI LAB — AGENT RULES

## Repository role

This repository is a completely isolated frontend and design laboratory for Livskompassen 3.0.

It is NOT the production application.

Its purpose is to explore, compare and validate:

- UI design
- UX flows
- information architecture
- navigation concepts
- design tokens
- reusable components
- configurable SuperModules
- capacity-aware presentation
- typed mock data

Nothing created here is automatically approved for production.

## Absolute isolation

Never:

- modify Livskompassen3.0
- import source files from Livskompassen3.0
- create filesystem links to Livskompassen3.0
- add Firebase
- add backend services
- add Cloud Functions
- add production APIs
- add authentication
- add Capacitor
- add PWA functionality
- use real user data
- copy secrets or environment files
- create direct dependencies on the production repository

Use typed mock data only.

## Product purpose

Livskompassen is a private Life OS for one user.

It is designed for extreme cognitive offloading, low-affect handling, safety, truth and structure.

The user may have ADHD, GAD, RSD and high psychosocial stress.

The goal is not maximum productivity.

The goal is to reduce:

- cognitive load
- decision fatigue
- uncertainty
- navigation depth
- visual stress

Every design should help the user identify the next meaningful micro-step.

## Canonical places

The only canonical product places are:

- Hjärtat
- Familjen
- Vardagen
- Valvet

Fyren is a background system for:

- capacity
- current condition
- cognitive gating
- complexity reduction
- next-step guidance

Fyren must not become an additional product world or ordinary destination.

## Design language

Use the Livskompassen design language:

- Obsidian Calm
- Nordic dusk
- dark navy and charcoal surfaces
- restrained warm gold accents
- clear structural lines
- large touch targets
- subtle full-bodied 3D depth
- calm hierarchy
- premium but not decorative

Target distribution:

- 80% matte calm surfaces
- 15% structural depth, borders and elevation
- 5% decorative accent

Avoid:

- neon
- rainbow palettes
- excessive glow
- crypto-dashboard aesthetics
- gaming aesthetics
- generic SaaS dashboards
- bright backgrounds
- unnecessary background imagery
- gamification
- XP
- streaks
- scores used as motivation

Do not copy Material Design or Apple HIG visually. Their accessibility and interaction principles may be used when helpful.

## Typography

Use:

- Cormorant Garamond for selected display headings
- Inter for UI and body text

Uppercase and wide tracking are reserved for:

- zone labels
- short section labels
- selected ceremonial headings

Do not use decorative typography in normal controls or body text.

## SuperModule architecture

Every SuperModule must separate configuration from presentation.

A SuperModule should have:

- typed manifest
- reusable shell
- ordered sections
- optional delegates
- capacity-mode visibility
- locked-feature declarations
- typed mock data
- one or more explicit visual presets

Supported configurable properties may include:

- layout
- density
- visual depth
- spacing
- section visibility
- section order
- primary action
- active zone
- viewport
- capacity mode

Do not make security rules, silo rules or locked product flows configurable through ordinary design controls.

## Governance statuses

Every module, mockup or major variant must have one status:

- locked
- configurable
- experimental
- reference
- candidate
- merged
- archived

Do not create disconnected screens without registering them in the appropriate governance document.

## Locked UX concepts

Do not remove, rename or redesign away these concepts without an explicit PMIR warning and user approval:

- Barnfokus questions
- P3 Kanban
- Valvet tabs: Mönster, Orkester, Kunskapsbank, Aktörskarta
- manual human-in-the-loop promotion to Valvet
- separation between Journal and evidence workflows
- cognitive capacity gating

UI Lab may create visual variants around these concepts, but must preserve their purpose and existence.

## Change discipline

Before making changes:

1. Inspect the repository.
2. State what will change.
3. State why it is needed.
4. List files that will be modified.
5. State any architectural or UX impact.
6. Identify whether locked UX is affected.

For small bug fixes, a concise plan is sufficient.

Do not expand the task beyond the requested scope.

Do not add libraries unless necessary.

Do not create a second design system beside the existing one.

Do not perform broad refactors during a visual task.

## Ambiguity rule

When two materially different design solutions are plausible:

- do not silently choose one
- create separate named variants where reasonable
- explain the trade-off
- wait for user selection before replacing the current reference

For trivial implementation details, choose the simplest maintainable solution.

## Validation

After relevant code changes, run:

- npm run typecheck
- npm run build

When runtime behavior is affected, also run the development server and inspect the relevant screen.

Do not claim success unless validation actually passed.

If validation cannot run, state exactly why.

## Reporting

After each task, report:

- summary
- changed files
- validation performed
- locked UX impact
- unresolved issues
- one recommended next step

## Priority order

Always prioritize:

1. Safety
2. Cognitive simplicity
3. Clarity
4. Accessibility
5. Consistency
6. Maintainability
7. Visual polish
8. Additional features

## Cross-agent compatibility baseline

To keep behavior aligned across Copilot CLI, Codex and other agent runtimes:

- `AGENTS.md` is the canonical source of repository agent policy.
- `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md` must mirror the same intent and hard constraints.
- `CLAUDE.md` and `GEMINI.md` should point to this policy to reduce drift between tools.
- If there is wording drift, preserve safety, isolation and locked UX constraints from this file.
