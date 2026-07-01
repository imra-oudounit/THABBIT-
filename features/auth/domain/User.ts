/**
 * Auth-feature view of a user.
 * Domain layer never depends on Firebase types directly.
 */
export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
}

export type AuthProvider = "password" | "google" | "phone" | "anonymous";
