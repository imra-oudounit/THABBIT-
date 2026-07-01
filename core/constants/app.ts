/**
 * Application-wide constants.
 * Centralized to avoid magic strings throughout the codebase.
 */
export const APP_NAME = "THABBIT";
export const APP_VERSION = "2.4.1";

export const STORAGE_KEYS = {
  LOCALE: "thabbit_locale",
  LANGUAGE_SELECTED: "thabbit_language_selected",
  ONBOARDING_COMPLETED: "thabbit_onboarding_completed",
  PROFILE_CACHE: "thabbit_profile_cache",
} as const;

export const FIRESTORE_COLLECTIONS = {
  USERS: "users",
} as const;

export const AUTH_PROVIDERS = {
  PASSWORD: "password",
  GOOGLE: "google",
  PHONE: "phone",
  ANONYMOUS: "anonymous",
} as const;
