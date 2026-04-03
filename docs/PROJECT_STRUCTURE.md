# Project Structure

## Architecture Overview

This project follows **Clean Architecture** with feature-based organization.

## Route Layer (`src/app/`)

Expo Router file-based routing. **Screens are created directly in this folder** (e.g., `src/app/(root)/index.tsx`, `src/app/(root)/stop/[id].tsx`).

Routes are thin and delegate to modules/components.

### Important Convention

- **DO NOT** create screens in `src/components/screens/`
- **DO** create screens directly in `src/app/` using Expo Router file-based routing
- Components used by screens should be in `src/components/features/{featureName}/`

## Feature Modules (`src/modules/`)

Business logic organized by domain (auth, stops, storage, etc.). Each module has:

- `domain/` - Entities, types, repository interfaces
- `application/` - Use cases, hooks, state management
- `infrastructure/` - API implementations, storage adapters

## Components (`src/components/`)

React components organized by feature in `features/{featureName}/{ComponentName}/` folders.
Each component is co-located with its stories, tests, styles, and barrel export.

**Note**: Screen-level components belong in `src/app/`, not here.

## Shared (`src/shared/`)

Cross-cutting utilities used by multiple modules.

## Styling (`src/styles/`, `src/tw/`)

Tailwind/Uniwind configuration and themed component wrappers.

## Key Patterns

- **Screens in app/**: All route screens live in `src/app/` using Expo Router conventions
- **Co-location**: Component files live together (tsx, test, stories, styles)
- **Barrel exports**: Each component folder has an `index.ts` for clean imports
- **Clean boundaries**: Domain logic is framework-agnostic, infrastructure handles externals
