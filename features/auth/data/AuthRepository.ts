import { container } from "../../../core/di/container";
import { firebaseAuth } from "../../../core/services/firebase";
import { AppError } from "../../../core/errors/AppError";
import { profileRepository } from "../../profile/data/ProfileRepository";
import type { IAuthRepository } from "../domain/IAuthRepository";
import type { AuthUser } from "../domain/User";
import { toAuthUser } from "./userMapper";

/**
 * Concrete Firebase-backed implementation of IAuthRepository.
 * All side-effects (Firestore profile write, error mapping) live here.
 */
class AuthRepository implements IAuthRepository {
  private readonly auth = container.authService;

  watchAuthState(cb: (user: AuthUser | null) => void): () => void {
    return this.auth.onChange((u) => cb(u ? toAuthUser(u) : null));
  }

  async registerWithEmail(fullName: string, email: string, password: string): Promise<AuthUser> {
    try {
      const result = await this.auth.signUpEmail(email, password);
      await this.auth.updateDisplayName(result.user, fullName);
      // Verification email — non-blocking (default Firebase flow, no continueUrl).
      this.auth.sendVerification(result.user).catch(() => undefined);
      profileRepository.upsertFromUser(result.user, "password").catch(() => undefined);
      return toAuthUser(result.user);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async loginWithEmail(email: string, password: string): Promise<AuthUser> {
    try {
      const result = await this.auth.signInEmail(email, password);
      profileRepository.upsertFromUser(result.user, "password").catch(() => undefined);
      return toAuthUser(result.user);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async loginWithGoogle(): Promise<AuthUser> {
    try {
      const result = await this.auth.signInGoogle();
      profileRepository.upsertFromUser(result.user, "google").catch(() => undefined);
      return toAuthUser(result.user);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async loginAsGuest(): Promise<AuthUser> {
    try {
      const result = await this.auth.signInAnonymous();
      profileRepository.upsertFromUser(result.user, "anonymous").catch(() => undefined);
      return toAuthUser(result.user);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await this.auth.sendPasswordReset(email);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async resendVerificationEmail(): Promise<void> {
    const current = firebaseAuth.currentUser;
    if (!current) throw new AppError("auth/user-not-found");
    try {
      await this.auth.sendVerification(current);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async sendPhoneOtp(phoneNumber: string, recaptchaContainerId: string) {
    try {
      const verifier = this.auth.recaptcha(recaptchaContainerId);
      return await this.auth.sendOtp(phoneNumber, verifier);
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }

  async logout(): Promise<void> {
    try {
      profileRepository.clearCache();
      await this.auth.signOut();
    } catch (e) {
      throw AppError.fromUnknown(e);
    }
  }
}

export const authRepository: IAuthRepository = new AuthRepository();
