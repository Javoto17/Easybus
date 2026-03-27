# Easybus

This is a universal mobile transit app built with Expo, targeting iOS, Android, and web.

## Tech Stack

- Package manager: **pnpm** (required - use `pnpm install` not `npm install`)
- Navigation: Expo Router (file-based routing in `src/app/`)
- Styling: Tailwind CSS v4 with NativeWind
- Data fetching: React Query (TanStack)
- Testing: Jest with `jest-expo` preset
- Component docs: Storybook

## Development Commands

```bash
pnpm install          # Install dependencies (NOT npm install)
pnpm start            # Start Expo development server
pnpm android          # Start on Android emulator
pnpm ios              # Start on iOS simulator
pnpm web              # Start on web
pnpm test             # Run Jest tests
pnpm lint             # Run ESLint
pnpm storybook:start  # Start with Storybook enabled
```

## Conventions

See docs/ folder for detailed conventions:

- **TypeScript**: See [docs/TYPESCRIPT.md](./docs/TYPESCRIPT.md)
- **Testing**: See [docs/TESTING.md](./docs/TESTING.md)
- **Styling**: See [docs/STYLING.md](./docs/STYLING.md)
- **Components**: See [docs/COMPONENTS.md](./docs/COMPONENTS.md)

## Available Skills

This project includes Windsurf skills for specific tasks. Invoke them when needed:

| Skill | Purpose |
|-------|---------|
| `agent-device` | Automate interactions for iOS/Android/macOS apps |
| `building-native-ui` | Build apps with Expo Router, styling, navigation |
| `expo-api-routes` | Create API routes in Expo Router with EAS Hosting |
| `expo-cicd-workflows` | EAS workflow YAML for CI/CD pipelines |
| `expo-deployment` | Deploy to App Store, Play Store, web hosting |
| `expo-dev-client` | Build and distribute development clients |
| `expo-tailwind-setup` | Tailwind v4 + NativeWind v5 setup guide |
| `native-data-fetching` | Network requests, React Query, data fetching |
| `upgrading-expo` | Expo SDK version upgrades |
| `use-dom` | Use Expo DOM components for web code |

Skills are located in `.windsurf/skills/` and `.agents/skills/`.
