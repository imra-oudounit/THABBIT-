# THABBIT — Architecture Overview

This project now follows a **Feature-First Clean Architecture** while preserving the final approved UI pixel-for-pixel.

## Goals achieved

- **No UI redesign** — colors, typography, spacing, layout, icons, animations, and branding are untouched.
- **Feature isolation** — every feature has its own `data / domain / presentation` folders.
- **Single Firebase init point** — all Firebase access flows through `core/services/firebase/client.ts`.
- **Repository pattern** — domain contracts are implemented by concrete data-layer repositories.
- **Dependency injection** — the `core/di/container.ts` centralizes cross-cutting services.
- **Backward compatibility** — the legacy import paths are preserved as facades so existing screens keep working unchanged.

---

## Folder structure

```text
src/
├── core/
│   ├── config/                # env / build flavors
│   ├── constants/             # storage keys, collection names, app constants
│   ├── di/                    # service container
│   ├── errors/                # AppError + mappers
│   ├── localization/          # i18n provider re-export
│   ├── logging/               # logger with prod/dev levels
│   ├── network/               # future HTTP client / network abstractions
│   ├── routing/               # strongly typed routes + guards
│   ├── services/
│   │   ├── firebase/          # low-level Firebase wrappers
│   │   └── modules/           # app-facing services (Auth, User, Quran, AI, ...)
│   └── utils/                 # storage, validators, numbers
│
├── features/
│   ├── auth/
│   ├── profile/
│   ├── onboarding/
│   ├── splash/
│   ├── home/
│   ├── quran/
│   ├── reader/
│   ├── ai/
│   ├── premium/
│   ├── settings/
│   ├── notifications/
│   ├── bookmarks/
│   ├── search/
│   ├── memorization/
│   ├── revision/
│   ├── tafsir/
│   ├── achievements/
│   └── statistics/
│
├── shared/
│   └── widgets/              # reusable UI primitives (existing design unchanged)
│
├── components/               # legacy visual components (still valid)
├── screens/                  # legacy screen files (still power the UI)
├── context/                  # legacy AuthContext facade
├── hooks/                    # legacy hook facades
├── i18n/                     # legacy localization resources
├── lib/                      # legacy Firebase facade
├── services/                 # legacy service facade
└── App.tsx                   # composition root
```

---

## Feature template

Each feature follows:

```text
features/<feature>/
├── data/          # repositories, mappers, data sources
├── domain/        # entities, interfaces, use-case contracts
└── presentation/  # hooks, providers, screen exports
```

Example: `features/profile`
- `domain/UserProfile.ts` — profile entity
- `domain/IProfileRepository.ts` — contract
- `data/ProfileRepository.ts` — Firestore + cache implementation
- `presentation/useUserProfile.ts` — UI-facing hook

---

## Core layer responsibilities

### `core/config`
Environment and build flavor preparation for:
- development
- staging
- production

### `core/routing`
Strongly typed route state:
- `AuthRoute`
- `MainTabRoute`
- `OverlayRoute`

Guards:
- protected route access
- entry route resolution

### `core/services/firebase`
Reusable Firebase wrappers separated by concern:
- `authService.ts`
- `firestoreService.ts`
- `client.ts`

### `core/services/modules`
Reusable high-level services:
- `AuthService`
- `UserService`
- `QuranService`
- `TafsirService`
- `AIService`
- `NotificationService`
- `PremiumService`
- `SearchService`

### `core/errors`
Centralized error system:
- `AppError`
- `FirebaseErrorMapper`
- `ValidationError`
- `NetworkError`
- `ErrorMapper`

### `core/logging`
Production logging with levels:
- debug
- info
- warn
- error

Debug logs are naturally reduced in production.

---

## Shared components

Reusable widgets (without changing the visual design):
- `ConfirmDialog`
- `BottomNav`
- `ProfileMenu`
- `PremiumCard`
- `ScreenLoader`
- `EmptyStateCard`
- `ErrorStateCard`
- `SearchField`

The existing design system is preserved exactly; these wrappers only centralize reuse.

---

## Firebase organization

Firebase logic is now layered:

1. **Low-level wrappers** in `core/services/firebase/`
2. **Feature repositories** consume those wrappers
3. **Legacy facades** re-export feature implementations for backward compatibility

This cleanly separates:
- Authentication
- Firestore profile storage
- Future Storage
- Future Notifications

---

## Performance improvements preserved

- Faster splash for cached users
- Local profile cache for instant first paint
- Non-blocking Firestore writes
- Deduplicated profile upserts
- Proper `onSnapshot` cleanup
- Lazy background sync of profile data

All without changing any UI.

---

## Localization

Localization remains centralized and scalable:
- Arabic
- English
- French
- Full RTL / LTR switching

The provider is exposed through `core/localization`, while the legacy `i18n` paths still work.

---

## Testing structure

Prepared folders:
- `tests/unit/`
- `tests/widget/`
- `tests/integration/`

Recommended coverage:
- validators
- route guards
- repositories
- auth flows
- profile/settings state
- language switching
- sign-out confirmation

---

## Dependency flow

```text
Presentation → Domain contracts → Data repositories → Core services → Firebase SDK
```

Not the reverse.

That means:
- Screens never need to know Firebase internals.
- Features remain independently maintainable.
- Future migration to Riverpod/Bloc/Flutter equivalents is straightforward.

---

## Migration strategy for future work

The current React/Vite codebase has been reorganized to mirror a production Flutter-style clean architecture. Future engineering can:

1. Move screens gradually from `src/screens/*` into feature `presentation/` folders.
2. Replace legacy facades only after all imports have been migrated.
3. Expand service modules (`Storage`, `Notifications`, `Remote Config`) without touching UI.

---

## Non-goals

- No redesign
- No pixel changes
- No component restyling
- No navigation UX changes

Only maintainability, scalability, security, and performance improvements.
