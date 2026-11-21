# Changelog

All notable changes to MockMaster are documented in this file by phase.

## Phase 0 — Setup, Stitch Sync & Guardrails (2026-11-21)
### Files Created / Modified
- Scaffolded React + Vite + TypeScript app in `~/Desktop/Mockmaster` (`package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `tsconfig*.json`).
- Installed Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`), `lucide-react`, and `react-router-dom`.
- Created `src/styles/tokens.css` with pure-white `#FFFFFF` light mode (`#5624D2` primary accent, `#1E8E5A` emerald badges/done states), Chrome-inspired `#202124` / `#292A2D` dark mode, and typography/radii/shadow tokens.
- Updated `src/index.css` to import Tailwind CSS and `./styles/tokens.css` with base theme rules.

### Key Decisions
- Used Vite + React + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`) for fast builds and clean CSS variable theming.
- Defined semantic CSS custom properties under `:root` / `[data-theme="light"]` and `[data-theme="dark"]` so Phase 2's `ThemeProvider` can switch themes cleanly.

### Open Questions / Notes
- Google Stitch MCP tools were not exposed in this session, and the `/browser` subagent could not attach to Chrome (`DevToolsActivePort` missing). `src/styles/tokens.css` was initialized from the exact palette & token specification in `.antigravityrules` and `PLAN.md`. Once Stitch MCP or Chrome remote debugging is available, we can optionally cross-check Stitch project `2054388282190489874` screen layouts.

## Phase 1 — Mock Data Fixtures & Mock API Layer (2026-11-21)
### Files Created / Modified
- Created `src/mocks/types.ts` defining TypeScript interfaces for personas, settings, tracks, questions, follow-up rules, sessions, scorecards, weekly plan items, debrief quotes, and progress summaries.
- Created `src/mocks/fixtures/personas.ts` with 2 personas (`Shreya` as `fresher` targeting `Frontend Dev`, and `Aarav` as `professional` targeting `Senior Frontend Engineer`), 5-item weekly plans (`done`/`today`/`upcoming` with `learn`/`practise`/`interview` tags), and mentor debrief quotes.
- Created `src/mocks/fixtures/tracks.ts` with 4 tracks (`dsa`, `frontend`, `behavioral`, `system-design`).
- Created `src/mocks/fixtures/questions.ts` with 36 interview questions (9 per track: 3 `easy`, 3 `medium`, 3 `hard`), hints, starter code, expected keywords, and keyword-triggered follow-up rules.
- Created `src/mocks/fixtures/sessions.ts` with pre-seeded completed sessions, scorecards, 4-week demo history, and track mastery data.
- Created `src/mocks/api.ts` with `300–800 ms` simulated latency, `localStorage` persistence, deterministic keyword-based evaluation/follow-up engine, and handlers for `GET /tracks`, `GET /questions`, `POST /sessions`, `GET /sessions/:id`, `GET /users/me/progress`, `GET /users/me/weekly-plan`, `GET /users/me/debrief`, `PATCH /users/me/settings`, plus session answer submission/completion and persona switching.

### Key Decisions
- Used `localStorage` persistence (`mockmaster_mock_store_v1`) on top of static fixtures so completing a session or toggling settings updates streak, weekly plan, and progress across reloads.
- Kept all evaluation deterministic using keyword matching + depth heuristics (zero external AI calls).

### Open Questions / Notes
- None. Ready for Phase 2 (`ThemeProvider` & shared UI components).

## Phase 2 — Theme Provider & Shared UI Components (2026-11-21)
### Files Created / Modified
- Created `src/context/ThemeContext.tsx` (`ThemeProvider` and `useTheme`) supporting pure-white `#FFFFFF` light mode and Chrome-inspired `#202124` / `#292A2D` dark mode via `data-theme`, persisted through `mockApi.patchMySettings({ theme })`.
- Created `src/components/layout/Navbar.tsx` with `Dashboard`, `Tracks`, and `Progress` links, search input, streak badge, theme toggle, and user menu.
- Created `src/components/ui/Badges.tsx` (`DifficultyBadge`, `FreeBadge`, `PlanTagBadge`).
- Created `src/components/ui/ProgressBar.tsx`.
- Created `src/components/ui/CourseCard.tsx`.
- Created `src/components/ui/TimelineRail.tsx` (`TimelineRail` and `TimelineNode` with `done` / `today` / `upcoming` states and `learn` / `practise` / `interview` tags).
- Created `src/components/ui/DebriefCard.tsx`.
- Created `src/components/ui/QuestionPanel.tsx`.
- Created `src/components/ui/CodePane.tsx` (with line numbers, Tab indentation, reset, and simulated syntax/run check).
- Created `src/components/ui/AsyncStates.tsx` (`LoadingState`, `EmptyState`, `ErrorState`).
- Created `src/components/index.ts` barrel export.

### Key Decisions
- Styled all components using CSS custom properties from `src/styles/tokens.css` so light and dark themes switch seamlessly with zero hardcoded colors.
- Built `CodePane` as a lightweight, zero-dependency editor with line numbers and Tab support for instant builds (can be upgraded to Monaco later if desired without changing props).

### Open Questions / Notes
- None. Ready for Phase 3 (End-to-End Screens & Session Flow).



