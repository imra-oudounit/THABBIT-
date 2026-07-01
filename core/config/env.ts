export type AppFlavor = "development" | "staging" | "production";

export interface AppEnv {
  flavor: AppFlavor;
  isDev: boolean;
  isProd: boolean;
  appName: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

const mode = ((import.meta.env.MODE || "development") as AppFlavor);

export const env: AppEnv = {
  flavor: mode,
  isDev: mode === "development",
  isProd: mode === "production",
  appName: "THABBIT",
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD5wanWqQ5BTY7v4oqSy-WqFxaq2NhMIRw",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "thabbit-60dae.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "thabbit-60dae",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "thabbit-60dae.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "600559863278",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:600559863278:android:5702f7f50916e92608faff",
  },
};
