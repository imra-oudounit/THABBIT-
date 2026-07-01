export type AuthRoute = "welcome" | "login" | "register" | "forgot" | "phone-input" | "otp-verify";
export type MainTabRoute = "home" | "quran" | "ai" | "missions" | "wordbyword" | "revision" | "stats" | "profile";
export type OverlayRoute = "none" | "settings" | "premium" | "reader";

export const authRoutes: readonly AuthRoute[] = [
  "welcome",
  "login",
  "register",
  "forgot",
  "phone-input",
  "otp-verify",
] as const;

export const protectedRoutes: readonly MainTabRoute[] = [
  "home",
  "quran",
  "ai",
  "missions",
  "wordbyword",
  "revision",
  "stats",
  "profile",
] as const;

export interface ReaderRoutePayload {
  surah?: {
    n: number;
    name: string;
    ar: string;
    verses: number;
    type: string;
    pct: number;
  };
}

export type AppRouteState = {
  authView: AuthRoute;
  tab: MainTabRoute;
  overlay: OverlayRoute;
  reader?: ReaderRoutePayload;
};
