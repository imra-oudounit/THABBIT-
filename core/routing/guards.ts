import type { MainTabRoute } from "./routes";

export function canAccessProtectedRoute(isAuthenticated: boolean, _route: MainTabRoute): boolean {
  return isAuthenticated;
}

export function resolveEntryRoute(hasLanguage: boolean, hasOnboarding: boolean, isAuthenticated: boolean) {
  if (!hasLanguage) return "language" as const;
  if (!hasOnboarding) return "onboarding" as const;
  return isAuthenticated ? "home" as const : "auth" as const;
}
