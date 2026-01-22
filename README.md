# SQL Cold Cases

An interactive SQL puzzle web app built with React, TypeScript and Vite. This repository contains multiple "cold case" challenges, each backed by a small SQLite schema and data set. Players explore schemas, run SQL queries, and solve puzzles to progress. The app uses TanStack Router for client-side routing.

Key features

- Interactive SQL editor and query runner
- Schema visualiser and table nodes for exploring relationships
- Routing handled with TanStack Router for nested, type-safe routes
- Several curated mystery challenges under `schema/` and `public/database/`
- Tests and examples using Vitest

Quick start

Prerequisites:

- Node.js 18+ (or compatible)
- pnpm (recommended) — or use `npm` / `yarn` with equivalent commands

Install and run in development:

```bash
pnpm install
pnpm dev
```

Build and test:

```bash
pnpm build
pnpm test
```

Project layout (important files)

- `src/` — application source
  - `components/` — UI components (challenge UI, schema visualiser, editor)
  - `hooks/use-database.ts` — database loader and query runner
  - `routes/` — route components for each challenge
- `public/database/` — SQLite `.db` files used by challenges
- `schema/` — per-challenge schema descriptions and metadata
- `test/` — Vitest tests for puzzles and components

Adding a new challenge

1. Add the SQLite `.db` file to `public/database/`.
2. Add any schema metadata in `schema/` (follow existing files as examples).
3. Create a route/component in `src/routes/` that loads the DB and challenge UI (copy an existing challenge route).
4. Add tests under `test/` for every new mystery.

Notes

- This project uses Vite + React + TypeScript + Tailwind CSS. Configuration files are at the repository root.
- Database files in `public/database/` are static SQL used to initialise in-browser or wasm SQLite instances.
- If you run into issues, check the browser console for DB import logs and errors.

Where to go next

- See `src/components/challenge-header.tsx` and `src/hooks/use-database.ts` to understand how a challenge loads and runs queries.
- Run `pnpm dev` and open http://localhost:5173 to try puzzles locally.

If you want, I can add a CONTRIBUTING guide, badges, or a short developer quickstart.

