import type { ConfirmationResult } from "firebase/auth";
import type { AuthUser } from "./User";

/**
 * Authentication contract.
 * Presentation layer depends only on this interface.
 */
export interface IAuthRepository {
  watchAuthState(cb: (user: AuthUser | null) => void): () => void;

  registerWithEmail(fullName: string, email: string, password: string): Promise<AuthUser>;
  loginWithEmail(email: string, password: string): Promise<AuthUser>;
  loginWithGoogle(): Promise<AuthUser>;
  loginAsGuest(): Promise<AuthUser>;

  sendPasswordReset(email: string): Promise<void>;
  resendVerificationEmail(): Promise<void>;

  sendPhoneOtp(phoneNumber: string, recaptchaContainerId: string): Promise<ConfirmationResult>;

  logout(): Promise<void>;
}
