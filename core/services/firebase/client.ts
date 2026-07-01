import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { env } from "../../config/env";

/**
 * Single Firebase initialization point.
 * All Firebase access in the codebase must go through this module.
 * The config is sourced from the environment layer to support
 * development / staging / production without touching feature code.
 */
const firebaseConfig = env.firebase;

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId,
);

const app: FirebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const firebaseAuth: Auth = getAuth(app);
export const firebaseDb: Firestore = getFirestore(app);

firebaseAuth.useDeviceLanguage();
