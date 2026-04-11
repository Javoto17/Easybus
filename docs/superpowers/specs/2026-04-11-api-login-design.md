# API Login Implementation Design

**Date:** 2026-04-11  
**Status:** Draft  

## Overview

Implement proper API login for the EMT Madrid API using auto-login on app start, zustand for global auth state, and silent token refresh on expiration.

## Problem

The current auth infrastructure exists but is never used:
- `AuthRepository` implements login/logout/validateToken correctly
- No global state exposes auth status to components
- Login is never triggered — the app works without authentication
- No mechanism to handle token expiration during app lifecycle

## Architecture

```
_layout.tsx (Root)
  └─ useInitializeAuth() hook
       └─ authStore.initialize()
            └─ AuthRepository.login()
                 └─ ClientRepository.get(EMT login endpoint)
                      └─ StorageRepository (AsyncStorage persistence)
```

## Components

### 1. Zustand Auth Store

**File:** `src/modules/auth/application/authStore.ts`

**State:**
- `isLoggedIn: boolean` — whether a valid token exists
- `token: string | null` — current access token
- `isLoading: boolean` — login/validation in progress
- `error: string | null` — last error message

**Actions:**
- `initialize()` — Auto-login: check stored token validity, call API if needed
- `logout()` — Clear token from store and storage
- `clearError()` — Reset error state
- `setToken(token, expiration)` — Update token after successful login

**Behavior on creation:**
- Automatically calls `initialize()` to attempt login
- If stored token is valid and not expired → sets `isLoggedIn = true`
- If token missing/expired → calls `AuthRepository.login()` to get fresh token

### 2. useInitializeAuth Hook

**File:** `src/hooks/useInitializeAuth.ts`

- Calls `authStore.initialize()` on mount
- Returns `{ isReady: boolean }` — true when auth attempt completes
- Used by `_layout.tsx` to block app rendering until auth resolves

### 3. Root Layout Update

**File:** `src/app/_layout.tsx`

- Import and call `useInitializeAuth()`
- Show loading/splash state while `isReady === false`
- Render `<Slot />` once `isReady === true`
- Auth store is initialized at app root, available everywhere

### 4. AuthRepository Improvements

**File:** `src/modules/auth/infrastructure/AuthRepository.ts`

**Changes:**
- Return typed result instead of bare boolean for better debugging
- Add proper error types (network error, API error, invalid response)
- Token expiration check: compare stored expiration with current time before deciding to re-login

## Data Flow

1. App starts → `_layout.tsx` renders
2. `useInitializeAuth()` calls `authStore.initialize()`
3. Store checks AsyncStorage for existing token + expiration
4. **If valid token exists:** sets `isLoggedIn = true`, `token = storedToken`, resolves
5. **If token missing/expired:** calls `AuthRepository.login()`
   - Repository calls `GET /mobilitylabs/user/login/` with `X-ClientId` + `passKey` headers
   - On success: stores new token + expiration in AsyncStorage
   - Store updates `isLoggedIn` and `token` state
6. `useInitializeAuth()` returns `isReady: true`
7. App renders normal routes

**Token refresh during use:**
- Any component can call `authStore.initialize()` to refresh token
- API calls that receive 401 can trigger `initialize()` for silent refresh

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Network error during login | `error` set in store, `isLoading = false`, app still loads (graceful degradation) |
| Invalid API credentials (X-ClientId/passKey) | `error` set, logged to console, app loads without token |
| Token expires mid-session | Next `initialize()` call silently re-logs in |
| Logout fails on server | Clear local storage anyway, reset store state |

## Dependencies

- **New:** `zustand` (for global auth state)
- **Existing:** `@react-native-async-storage/async-storage`, `@tanstack/react-query`, `expo-router`

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/modules/auth/application/authStore.ts` | Create | Zustand store with auth state and actions |
| `src/hooks/useInitializeAuth.ts` | Create | Hook to initialize auth at app root |
| `src/app/_layout.tsx` | Modify | Add useInitializeAuth, show loading state |
| `src/modules/auth/infrastructure/AuthRepository.ts` | Modify | Improve error handling, typed returns |
| `src/modules/auth/domain/AuthRepository.ts` | Modify | Update interface if needed |
| `package.json` | Modify | Add zustand dependency |

## Success Criteria

- App auto-logs in to EMT API on start
- Token is persisted and reused across app launches
- Expired tokens are silently refreshed
- Auth state is accessible via `useAuthStore()` hook from any component
- Failed login doesn't crash the app
