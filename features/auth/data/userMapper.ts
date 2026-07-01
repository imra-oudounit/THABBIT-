import type { User } from "firebase/auth";
import type { AuthUser } from "../domain/User";

/**
 * Maps the Firebase Auth User to the domain AuthUser shape.
 */
export function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
  };
}
