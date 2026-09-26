# ALION — Agent Notes

Two independent apps, no root workspace tooling, no git repo, no CI, no tests.

## Structure

- `frontend/` — the real app: Next.js 15 App Router, React 19, TypeScript, Tailwind 3. Scaffolded by Rocket.new. Pages live under `src/app/<route>/page.tsx` with route-specific components in `<route>/components/`.
- `backend/` — FastAPI + SQLAlchemy 2 (SQLite) app with routers, services, models, schemas, AI providers. Entry point: `app/main.py`.

## Frontend commands (run inside `frontend/`)

- Dev server: `npm run dev` → **http://localhost:4028** (not 3000).
- Quirk: `npm start` also runs the **dev** server; production start is `npm run serve`.
- Verification: `npm run type-check` (tsc --noEmit) + `npm run lint`. Builds ignore TypeScript errors and ESLint (`next.config.mjs` sets both to true), so `npm run build` passing proves nothing — always run type-check explicitly.
- Format: `npm run format` (Prettier; single quotes, 100 print width, es5 trailing commas — mirrored in ESLint's prettier rule).

## Gotchas

- `package.json` contains a `rocketCritical` block listing deps/scripts that must not be removed or modified.
- Remote image hosts go in `frontend/image-hosts.config.mjs` (imported by `next.config.mjs` as `images.remotePatterns`) — do not inline them into next config.
- Webpack injects `@dhiwise/component-tagger` loader, which adds `data-component="..."` attributes to all local JSX/TSX elements. These tags in code/DOM output are expected.
- `frontend/.env` holds placeholder keys (Supabase, OpenAI, Gemini, Anthropic, Stripe…); the app runs without real values.

## Backend

FastAPI + SQLAlchemy 2 (SQLite) backend. Run from `backend/`:

```
.venv\Scripts\python -m uvicorn app.main:app --reload
```

- Config: `app/core/config.py` reads `backend/.env` (template: `backend/.env.example`). Secrets live here only — never in frontend.
- Layers: routers (`app/routers/`, thin) → services (`app/services/`) → SQLAlchemy models (`app/models/`) with Pydantic schemas in `app/schemas/`. AI providers plug into the registry in `app/ai/` (only offline `mock` provider exists).
- API contract uses camelCase (`dueDate`, `conversationId`) and task status `"in-progress"` to match the existing frontend types; schemas accept both camel and snake case input.
- Tests: `.venv\Scripts\python -m pytest tests` from `backend/` (23 tests, in-memory SQLite; no real DB touched).
- `requirements.txt` is authoritative and pinned; install dev deps too (`pytest`, `httpx`).
