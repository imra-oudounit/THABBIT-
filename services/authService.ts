/**
 * Backward-compatible facade.
 *
 * The implementation now lives in `features/auth` and `features/profile`
 * following clean architecture (data / domain / presentation). This file
 * preserves the legacy import paths so the existing screens keep working
 * without any UI change.
 */
import { RecaptchaVerifier, type User, type ConfirmationResult } from "firebase/auth";
import { authRepository } from "../features/auth/data/AuthRepository";
import { profileRepository } from "../features/profile/data/ProfileRepository";
import { firebaseAuthService } from "../core/services/firebase";

// ── Profile cache helpers (legacy API) ──────────────────────────────
export const getCachedProfile = (uid?: string) =>
  uid ? profileRepository.getCached(uid) : profileRepository.getCached("");

export const clearProfileCache = () => profileRepository.clearCache();

export async function updateUserSettings(uid: string, settings: any) {
  await profileRepository.updateSettings(uid, settings);
}

// ── User document upsert (legacy API) ───────────────────────────────
export async function createOrUpdateUserDocument(user: User, provider?: string) {
  await profileRepository.upsertFromUser(user, provider);
}

// ── Email / Password ────────────────────────────────────────────────
export async function registerWithEmail(fullName: string, email: string, password: string) {
  const u = await authRepository.registerWithEmail(fullName, email, password);
  // Return the live Firebase user (legacy callers expect the SDK User).
  return await waitForFirebaseUser(u.uid);
}

export async function loginWithEmail(email: string, password: string) {
  const u = await authRepository.loginWithEmail(email, password);
  return await waitForFirebaseUser(u.uid);
}

export async function sendPasswordReset(email: string) {
  await authRepository.sendPasswordReset(email);
}

export async function resendVerificationEmail(_user: User) {
  await authRepository.resendVerificationEmail();
}

// ── Google / Guest / Phone ──────────────────────────────────────────
export async function loginWithGoogle() {
  const u = await authRepository.loginWithGoogle();
  return await waitForFirebaseUser(u.uid);
}

export async function signInAsGuest() {
  const u = await authRepository.loginAsGuest();
  return await waitForFirebaseUser(u.uid);
}

let recaptchaVerifier: RecaptchaVerifier | null = null;
export function setupRecaptcha(containerId: string) {
  if (recaptchaVerifier) recaptchaVerifier.clear();
  recaptchaVerifier = firebaseAuthService.recaptcha(containerId);
  return recaptchaVerifier;
}

export async function sendOTP(phoneNumber: string, containerId: string): Promise<ConfirmationResult> {
  return authRepository.sendPhoneOtp(phoneNumber, containerId);
}

// ── Account upgrade ─────────────────────────────────────────────────
export async function upgradeAnonymousToGoogle(currentUser: User) {
  const { GoogleAuthProvider, linkWithPopup } = await import("firebase/auth");
  const provider = new GoogleAuthProvider();
  const result = await linkWithPopup(currentUser, provider);
  profileRepository.upsertFromUser(result.user, "google").catch(() => undefined);
  return result.user;
}

// ── Sign out ────────────────────────────────────────────────────────
export async function logout() {
  await authRepository.logout();
}

// ── Internal: convert AuthUser back to live Firebase User ───────────
function waitForFirebaseUser(_uid: string): Promise<User> {
  return new Promise((resolve) => {
    const unsub = firebaseAuthService.onChange((u) => {
      if (u) {
        unsub();
        resolve(u);
      }
    });
  });
}
