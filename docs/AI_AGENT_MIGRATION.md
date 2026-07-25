# AI Agent Migration Baseline (Cursor -> Antigravity/Codex/Copilot CLI)

This repository now contains a hardened, cross-tool instruction baseline.

## What is already done in this repo

1. Canonical policy in `AGENTS.md`.
2. Copilot-compatible root instruction file: `.github/copilot-instructions.md`.
3. Additional repo instruction layer: `.github/instructions/livskompassen-ui-lab.instructions.md`.
4. Cross-tool bridge files: `CLAUDE.md` and `GEMINI.md`.

## Exact actions you need to do outside code (once per machine/account)

1. In GitHub Copilot CLI, run `/instructions` and verify repository instructions are enabled.
2. Run `/env` and confirm the instruction files are listed as loaded.
3. In your target tool (Antigravity/Codex workspace), ensure repository root instruction files are not ignored.
4. If the tool supports custom instruction paths, include repository root and `.github/instructions/`.
5. In GitHub repository settings, enable branch protection and require CI pass before merge.

## Verification commands (in repo)

```bash
npm run test
npm run typecheck
npm run build
npm run test:e2e
```

Den samlade grinden är `npm run check` och körs även av GitHub Actions-workflowen
`Quality Gate`.

## Drift rule

If you update agent behavior, update `AGENTS.md` first, then mirror intent into `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`.
