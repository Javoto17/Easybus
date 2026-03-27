# Testing Conventions

## Test Runner

- Jest with `jest-expo` preset
- Watch mode enabled by default (`pnpm test`)

## Test Organization

- Co-locate tests with components: `ComponentName.tsx` → `ComponentName.test.tsx`
- Use `__tests__` folders for complex component groups

## Testing Tools

- `@testing-library/react-native` for component tests
- Mock external dependencies in `jest.setup.js` if needed
