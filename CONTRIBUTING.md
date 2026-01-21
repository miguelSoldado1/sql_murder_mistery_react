# Contributing to SQL Cold Cases

Thanks for wanting to contribute! This document explains the typical workflow for development, testing, and adding new challenges.

Getting started

- Prerequisites: Node.js 18+ and `pnpm` (or use `npm` / `yarn`).
- Install dependencies and run locally:

```bash
pnpm install
pnpm dev
```

Branching & pull requests

- Create a feature branch from `main`: `git checkout -b feat/<new_mystery>`.
- Keep PRs focused and include a short description of the change and any manual steps to verify.
- Link related issue(s) in the PR.

Coding conventions

- Use TypeScript and follow existing code style.
- Keep changes small and atomic; split large refactors into multiple PRs.

Testing

- Run unit and integration tests with:

```bash
pnpm test
```

- Add tests for new features or puzzle validation where possible.

Adding a new challenge

1. Add the SQLite `.db` file to `public/database/` (use a descriptive filename, e.g. `coldcase_undersea_v1.db`).
2. Add schema/metadata under `schema/` following existing examples so the UI can show tables and hints.
3. Create a route/component under `src/routes/` (copy an existing challenge route) that loads the `.db` via `use-database` and renders the challenge UI.
4. Add tests under `test/` to validate puzzles or any automated checks.
