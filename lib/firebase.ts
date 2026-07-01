/**
 * Backward-compatible facade.
 * The single source of truth for Firebase is `core/services/firebase/client.ts`.
 * Existing imports of `src/lib/firebase` keep working through this re-export.
 */
export {
  firebaseAuth as auth,
  firebaseDb as db,
  isFirebaseConfigured,
} from "../core/services/firebase/client";

import { firebaseAuth, firebaseDb } from "../core/services/firebase/client";
export function requireFirebase() {
  return { auth: firebaseAuth, db: firebaseDb };
}
