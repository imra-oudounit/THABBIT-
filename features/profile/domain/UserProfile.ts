/**
 * Domain entity for the user profile stored in Firestore.
 */
export interface UserSettings {
  reciter: string;
  warshOnly: boolean;
  speed: string;
  darkMode: string;
  notifications: boolean;
  offlineMode: boolean;
  strictness: string;
}

export interface RecentActivity {
  label: string;
  time: string;
  icon: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  phoneNumber: string | null;
  email: string | null;
  photoURL: string | null;
  provider: string;
  language: string;
  createdAt: unknown;
  lastLogin: unknown;
  isAnonymous: boolean;
  streak: number;
  memorizationProgress: number;
  reviewProgress: number;
  dailyGoalVerses: number;
  dailyGoalCompleted: number;
  dailyReviewGoal: number;
  dailyReviewCompleted: number;
  totalVersesMemorized: number;
  totalMinutesToday: number;
  lastSurah: string;
  lastVerse: string;
  lastVerseRef: string;
  recentActivity: RecentActivity[];
  settings: UserSettings;
}

export const defaultUserProfile: UserProfile = {
  uid: "",
  displayName: null,
  phoneNumber: null,
  email: null,
  photoURL: null,
  provider: "",
  language: "ar",
  createdAt: null,
  lastLogin: null,
  isAnonymous: false,
  streak: 0,
  memorizationProgress: 0,
  reviewProgress: 0,
  dailyGoalVerses: 3,
  dailyGoalCompleted: 0,
  dailyReviewGoal: 5,
  dailyReviewCompleted: 0,
  totalVersesMemorized: 0,
  totalMinutesToday: 0,
  lastSurah: "",
  lastVerse: "",
  lastVerseRef: "",
  recentActivity: [],
  settings: {
    reciter: "Mishary Al-Afasy",
    warshOnly: true,
    speed: "1.0",
    darkMode: "system",
    notifications: true,
    offlineMode: false,
    strictness: "balanced",
  },
};
