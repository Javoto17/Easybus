# Component Conventions

## Component Organization

Components are organized by feature:

```
src/components/
├── features/
│   └── {featureName}/        # e.g., home, auth, stops
│       └── {ComponentName}/
│           ├── index.ts                    # Barrel export
│           ├── ComponentName.tsx           # Component
│           ├── ComponentName.stories.tsx   # Storybook stories
│           ├── ComponentName.test.tsx      # Unit tests
│           └── ComponentName.styles.ts     # Style definitions
│
└── shared/                  # Cross-cutting components used by multiple features
```

## Component Structure

- One component per file
- Co-locate styles, tests, and stories with component
- Use TypeScript props interfaces

## Storybook

- Stories in `.stories.tsx` files
- Run `pnpm storybook:start` to view
