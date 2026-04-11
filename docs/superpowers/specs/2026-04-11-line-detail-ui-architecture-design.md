# Line Detail UI Architecture Design

**Date:** 2026-04-11
**Status:** Draft
**Author:** Qwen Code

## Problem

The line detail screen (`src/app/(root)/line/[lineId].tsx`) mixes data fetching, cache management, navigation effects, section composition, and rendering in a single file. This makes it harder to:

- Test data logic independently
- Reuse line query patterns across screens
- Understand the screen's structure at a glance
- Add new sections without growing an already dense file

## Goal

Improve separation of concerns while respecting the established project architecture conventions.

## Architecture Context

The app follows Clean Architecture with feature-based organization:

- **Routes** live in `src/app/` (Expo Router file-based routing)
- **Components** live in `src/components/features/{feature}/` with co-located tests, stories, styles
- **Business logic** lives in `src/modules/{domain}/{layer}/` (domain/application/infrastructure)
- **Shared utilities** live in `src/shared/` and `src/hooks/`

Existing screens (`stop/[id].tsx`, `index.tsx`) follow a consistent pattern:
1. Module-level repository singletons
2. `SectionType` discriminated union for FlatList sections
3. All-in-one screen component with queries, effects, composition
4. Feature components for UI pieces

## Design

### Layer 1: Data Hook — `useLineDetail`

Extract React Query logic into a custom hook at the application layer.

**Location:** `src/modules/stops/application/line/useLineDetail.ts`

**Responsibilities:**
- Encapsulate `useQuery` setup (queryKey, queryFn, enabled)
- Handle `useFocusEffect` cache invalidation
- Return `{ data, isError, isLoading, refetch }`

**Dependencies:**
- `getLineDetail` use case (existing)
- `stopRepository` (module-level singleton)
- React Query and expo-router hooks

**What it does NOT do:**
- Does not handle navigation (screen's responsibility)
- Does not render anything (pure data layer)

### Layer 2: Extracted Presentational Components

#### `LineAlertsSection`

**Location:** `src/components/features/line/LineAlertsSection/`

**Responsibilities:**
- Render alerts section as `ListFooterComponent`
- Accept optional `onRetry` callback for refresh button
- Use existing `Card`, `Typography` components
- Follow HeroUI Native + Tailwind patterns

**Props:**
```typescript
interface LineAlertsSectionProps {
  onRetry?: () => void;
}
```

#### `LineEmptyState`

**Location:** `src/components/features/line/LineEmptyState/`

**Responsibilities:**
- Render empty state when no directions exist
- Show icon, title, description, retry button
- Accept `onRetry` callback

**Props:**
```typescript
interface LineEmptyStateProps {
  onRetry: () => void;
}
```

### Layer 3: Screen Composition — `[lineId].tsx`

The screen file becomes a thin composition layer:

**Responsibilities:**
- Read route params (`useLocalSearchParams`)
- Call `useLineDetail(lineId)`
- Set navigation options (`useEffect` + `navigation.setOptions`)
- Define `SectionType` union
- Compose sections array
- Wire `ScreenLayout` with FlatList variant

**What stays inline (by convention):**
- Repository instantiation (module-level, matches other screens)
- `SectionType` definition (screen-specific composition type)
- Navigation effects (screen-specific)

**What moves out:**
- Query logic → `useLineDetail` hook
- Empty state JSX → `LineEmptyState` component
- Alerts JSX → `LineAlertsSection` component

## File Structure

```
src/app/(root)/line/[lineId].tsx                    ← Screen (simplified)
src/components/features/line/
  ├── LineAlertsSection/
  │   ├── LineAlertsSection.tsx
  │   ├── LineAlertsSection.stories.tsx
  │   └── index.ts
  ├── LineEmptyState/
  │   ├── LineEmptyState.tsx
  │   ├── LineEmptyState.stories.tsx
  │   └── index.ts
  ├── LineHeader/                                   ← Existing, unchanged
  ├── LineDirectionsList/                           ← Existing, unchanged
  ├── LineDirectionItem/                            ← Existing, unchanged
  ├── LineStopsList/                                ← Existing, unchanged
  ├── LineStopItem/                                 ← Existing, unchanged
  └── index.ts                                      ← Updated barrel export
src/modules/stops/application/line/
  ├── getLineDetail.ts                              ← Existing, unchanged
  ├── getLineStopsByDirection.ts                    ← Existing, unchanged
  └── useLineDetail.ts                              ← NEW hook
```

## Error Handling

- Network/API errors → handled by `useQuery` → screen renders `<StopErrorState />`
- Empty data → `LineEmptyState` component renders with retry option
- Invalid lineId → query stays disabled, screen renders empty/error state

## Testing Strategy

- `useLineDetail` — unit test with mocked `stopRepository` and React Query
- `LineAlertsSection` — Storybook story + optional unit test
- `LineEmptyState` — Storybook story + optional unit test
- Screen — integration test (existing pattern: screens are not individually unit tested)

## Migration Steps

1. Create `useLineDetail.ts` hook
2. Create `LineAlertsSection` component + story
3. Create `LineEmptyState` component + story
4. Update barrel exports in `line/index.ts`
5. Refactor `[lineId].tsx` to use new hook and components
6. Run tests, Storybook, and lint to verify

## Trade-offs

| Decision | Trade-off |
|----------|-----------|
| Hook at application layer | Adds a file but makes data logic testable. Worth it. |
| Extract alerts/empty as components | Adds files for relatively small UI blocks. But follows existing patterns (StopEmptyState, StopErrorState exist). Consistent. |
| Keep repositories module-level | Matches all other screens. Not the most testable pattern, but consistent. |
| Don't extract navigation effects | Screen-specific, not worth abstracting. If 3+ screens share this pattern, extract later. |
