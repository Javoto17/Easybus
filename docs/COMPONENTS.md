# Component Conventions

## Component Organization

```
src/components/
├── atoms/          # Basic building blocks (Button, Input, Text)
├── molecules/      # Combinations of atoms (SearchBar, Card)
└── [other groups]  # Organize by feature/domain
```

## Component Structure

- One component per file
- Co-locate styles, tests, and stories with component
- Use TypeScript props interfaces

## Storybook

- Stories in `.stories.tsx` files
- Run `pnpm storybook:start` to view
