# Design: Stop Header Toolbar

**Date:** 2026-04-11
**Status:** Draft — pending review

## Problem

The `headerRight` buttons in `src/app/(root)/stop/[id].tsx` (Refresh and Favorite) are unresponsive to taps. The `Pressable` elements inside `navigation.setOptions({ headerRight })` have collapsed hit areas due to navigation header layout constraints.

## Scope

Only `stop/[id].tsx` has actionable `headerRight` buttons. The other 7 screens using `navigation.setOptions` only configure `title`, `headerLargeTitle`, or `headerBackTitle` — no changes needed there.

## Solution

Replace the `headerRight` JSX with `Stack.Toolbar` (iOS-only, Expo SDK 55+), which provides native hit areas and proper touch handling.

### Architecture

**iOS path:**
- Add `<Stack.Toolbar placement="right">` as a sibling to `<ScreenLayout>` in the component tree
- Two `<Stack.Toolbar.Button>` children:
  - Refresh: `icon="arrow.clockwise"`, `onPress={onPressRefresh}`
  - Favorite: `icon={isFavorite ? "heart.fill" : "heart"}`, `tintColor={isFavorite ? "#ff716c" : "#85adff"}`, `onPress={onPressFavorite}`

**Android path (fallback):**
- Keep `navigation.setOptions({ headerRight })` but fix hit areas:
  - Replace `className="p-2"` with explicit `style={{ width: 44, height: 44, justifyContent: "center", alignItems: "center" }}`
  - Add `hitSlop={12}` to each `Pressable`

### Component structure

```tsx
export default function StopDetailScreen() {
  // ... existing hooks and state ...

  return (
    <>
      <ScreenLayout ... />

      {/* iOS Toolbar */}
      {process.env.EXPO_OS === 'ios' && (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            icon="arrow.clockwise"
            tintColor="#85adff"
            onPress={onPressRefresh}
          />
          <Stack.Toolbar.Button
            icon={isFavorite ? "heart.fill" : "heart"}
            tintColor={isFavorite ? "#ff716c" : "#85adff"}
            onPress={onPressFavorite}
          />
        </Stack.Toolbar>
      )}

      <Dialog ... />
    </>
  );
}
```

The `useEffect` currently handling both title/back and headerRight is split:
- **All platforms:** `navigation.setOptions({ title, headerBackTitle, ... })` remains for title/back configuration
- **iOS only:** `headerRight` is removed from the useEffect (handled by Stack.Toolbar)
- **Android only:** A separate conditional useEffect adds back `headerRight` with fixed Pressables (explicit sizing + hitSlop)

### Imports

- Add: `import { Stack } from 'expo-router/stack'`
- Remove from stop page: `Ionicons` import (no longer needed for toolbar buttons; still used in empty state, keep it)
- Remove: `useNavigation` if title/back can be moved to `Stack.Screen` options (optional cleanup)

### Dependencies

- `Stack.Toolbar` requires Expo SDK 55+. Already in project per guidelines.
- iOS only. Android uses `headerRight` fallback.

## Testing

- Manually verify both toolbar buttons respond to taps on iOS simulator
- Manually verify header buttons still work on Android emulator
- Verify favorite toggle still works (heart fills/unfills)
- Verify refresh invalidates queries as expected

## Rollback

If `Stack.Toolbar` causes issues, revert to `navigation.setOptions({ headerRight })` with explicit `hitSlop` and sized `Pressable` wrappers.
