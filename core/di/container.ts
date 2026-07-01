import { firebaseAuthService, firestoreService } from "../services/firebase";

/**
 * Tiny dependency-injection container.
 * Features pull their dependencies from here instead of importing
 * Firebase directly, which makes testing and swapping implementations
 * trivial.
 */
export const container = {
  authService: firebaseAuthService,
  firestore: firestoreService,
};

export type Container = typeof container;
