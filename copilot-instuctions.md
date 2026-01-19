
# Copilot custom instructions

## SQL puzzle design

- Reuse the existing schema; do not add tables unless explicitly asked.
- Create a NEW seed SQL file under `scripts/` for each new puzzle (don’t edit old ones unless asked).
- Use existing `scripts/` files as context to stay consistent with prior puzzles (table usage patterns, naming/roles/sectors, clue + decoy structure, and any established “canon”), and also avoid collisions (IDs, reused names, or duplicate story events).
- Follow the existing patterns in `src/routes/` and `src/test/` when adding a new puzzle route and its Vitest assertions.
- Puzzles must be deterministic: each solution step should return exactly one row.
- Add multiple decoys so naive single-filter queries return multiple rows; require intersection of 2–4 clues.
- Every clue must be SQL-addressable (maps to concrete predicates like role/sector/timestamp/amount/type/count).
- Tests must rely only on player-visible clues (no hidden assumptions).
- Keep clue text plain and direct; avoid raw timestamp codes unless explained.

