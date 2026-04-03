# Project Structure

## Architecture Overview

This project follows **Clean Architecture** with feature-based organization.

### Route Layer (`src/app/`)

Expo Router file-based routing. Routes are thin and delegate to modules/screens.

### Feature Modules (`src/modules/`)

Business logic organized by domain (auth, stops, storage, etc.). Each module has:

- `domain/` - Entities, types, repository interfaces
- `application/` - Use cases, hooks, state management
- `infrastructure/` - API implementations, storage adapters

### Components (`src/components/`)

React components organized by feature in `features/{featureName}/{ComponentName}/` folders.
Each component is co-located with its stories, tests, styles, and barrel export.

### Shared (`src/shared/`)

Cross-cutting utilities used by multiple modules.

### Styling (`src/styles/`, `src/tw/`)

Tailwind/Uniwind configuration and themed component wrappers.

## Key Patterns

- **Co-location**: Component files live together (tsx, test, stories, styles)
- **Barrel exports**: Each component folder has an `index.ts` for clean imports
- **Clean boundaries**: Domain logic is framework-agnostic, infrastructure handles externals

## Windsurf Features

The `.features/` folder contains Windsurf feature specifications for AI-assisted development workflows.
