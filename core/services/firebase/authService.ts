import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateProfile,
  type ConfirmationResult,
  type User,
} from "firebase/auth";
import { firebaseAuth } from "./client";

/**
 * Pure wrapper over Firebase Auth.
 * No business logic, no Firestore writes — only authentication primitives.
 */
export const firebaseAuthService = {
  onChange(cb: (u: User | null) => void) {
    return onAuthStateChanged(firebaseAuth, cb);
  },

  // Email / Password
  async signUpEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  },
  async signInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  },
  async sendVerification(user: User) {
    return sendEmailVerification(user);
  },
  async sendPasswordReset(email: string) {
    return sendPasswordResetEmail(firebaseAuth, email);
  },
  async updateDisplayName(user: User, displayName: string) {
    return updateProfile(user, { displayName });
  },

  // Google
  async signInGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(firebaseAuth, provider);
  },

  // Anonymous / Guest
  async signInAnonymous() {
    return signInAnonymously(firebaseAuth);
  },

  // Phone (web requires invisible reCAPTCHA)
  recaptcha(containerId: string) {
    return new RecaptchaVerifier(firebaseAuth, containerId, { size: "invisible" });
  },
  async sendOtp(phone: string, verifier: RecaptchaVerifier): Promise<ConfirmationResult> {
    return signInWithPhoneNumber(firebaseAuth, phone, verifier);
  },

  async signOut() {
    return signOut(firebaseAuth);
  },
};

export type { User, ConfirmationResult };
