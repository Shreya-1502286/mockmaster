# MockMaster — 2-Day Phased Execution Plan

**Project**: AI-driven mock interview simulator & analytics portal (web app, mocked backend)
**Stitch Project ID**: `2054388282190489874`
**Timeline**: 2 Days (5 focused phases, each gated by user approval)

---

## Phase 0: Setup, Stitch Sync & Guardrails (Day 1 — ~1.5 hrs)
- **Objective**: Scaffold the React + Vite + Tailwind app, pull Stitch tokens/screens from project `2054388282190489874`, and initialize `CHANGELOG.md` and `PLAN.md`.
- **Deliverables**:
  - React + Tailwind project scaffold in `~/Desktop/Mockmaster`
  - `src/styles/tokens.css` (pure-white `#FFFFFF` light mode + Chrome-inspired `#202124` / `#292A2D` dark mode + typography/radii tokens)
  - `CHANGELOG.md` initialized
- **Exit Gate**: Stop and ask user for approval before starting Phase 1.

## Phase 1: Mock Data Fixtures & Mock API Layer (Day 1 — ~2.5 hrs)
- **Objective**: Build realistic static JSON fixtures and a mock API service with `300–800 ms` simulated latency and deterministic/keyword-based mock AI responses.
- **Deliverables**:
  - Personas (`Shreya` as `fresher` targeting `Frontend Dev`, plus a working professional persona), tracks (`DSA`, `Frontend`, `Behavioral`, `System Design`), ~10 questions per track across `easy`/`medium`/`hard`, session templates, scorecards, 4-week demo history, 5-item weekly plan (`done`/`today`/`upcoming` with `learn`/`practise`/`interview` tags), and debrief quotes.
  - Mock routes/handlers: `GET /tracks`, `GET /questions?track&difficulty`, `POST /sessions`, `GET /sessions/:id`, `GET /users/me/progress`, `GET /users/me/weekly-plan`, `GET /users/me/debrief`, `PATCH /users/me/settings`.
- **Exit Gate**: Stop and ask user for approval before starting Phase 2.

## Phase 2: Theme Provider & Shared UI Components (Day 1 → Day 2 — ~3 hrs)
- **Objective**: Implement theme switching (persisted via `PATCH /users/me/settings`) and reusable components aligned with Stitch designs.
- **Deliverables**:
  - `ThemeProvider` (light/dark toggle)
  - `Navbar` (with `Dashboard`, `Tracks`, `Progress` links, search, streak badge, theme toggle, user menu), `CourseCard`, `DifficultyBadge`, `FreeBadge`, `ProgressBar`, `TimelineRail` / `TimelineNode`, `DebriefCard`, `QuestionPanel`, `CodePane`.
  - Loading, empty, and error state wrappers.
- **Exit Gate**: Stop and ask user for approval before starting Phase 3.

## Phase 3: End-to-End Screens & Session Flow (Day 2 — ~4 hrs)
- **Objective**: Build and wire all 9 screens in sequence to the mock API layer.
- **Build Order**:
  1. `Dashboard` (welcome/weekly progress, "Your week" timeline, "Last debrief", "My Courses", "Free Courses / Free Practice")
  2. `Track Select` (filters by track, difficulty, status/free)
  3. `Session Lobby` (difficulty, mode, pacing, weekly goal impact, start action)
  4. `Interview Session` (Q&A + follow-ups + Monaco editor + run/submit)
  5. `Scorecard` (overall score, rubric breakdown, mentor debrief, question review)
  6. `Progress / History` (4-week streak/consistency, track mastery, past sessions table)
  7. `Landing` & `Login / Signup` (with quick demo login for `Shreya`)
  8. `Settings` (role/persona, light/dark theme, weekly session target)
- **Exit Gate**: Stop and ask user for approval before starting Phase 4.

## Phase 4: Light/Dark QA, Demo Seed & Polish (Day 2 — ~1.5 hrs)
- **Objective**: Audit contrast, token usage, navigation consistency, and 4-week demo data end-to-end.
- **Deliverables**:
  - Light/dark audit across all 9 screens (no broken contrast or stray hardcoded colors)
  - Verified end-to-end journey: demo login -> pick track -> lobby -> complete session -> scorecard -> updated progress/streak
  - Final `CHANGELOG.md` update
- **Exit Gate**: Present final summary and ask for approval before any `git commit`.
