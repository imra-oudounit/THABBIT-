import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/presentation/AuthContext";
import {
  defaultUserProfile,
  type UserProfile,
} from "../domain/UserProfile";
import { profileRepository } from "../data/ProfileRepository";

/**
 * Hook that merges Firebase Auth identity with the Firestore profile.
 *
 * - Cached profile loads synchronously for instant first paint.
 * - Firestore updates stream in via onSnapshot.
 * - Loading is never blocked on Firestore; auth data alone is enough.
 */
function mergeAuthUser(base: UserProfile, user: { uid: string; displayName?: string | null; email?: string | null; phoneNumber?: string | null; photoURL?: string | null; isAnonymous?: boolean }): UserProfile {
  return {
    ...base,
    uid: user.uid,
    displayName:
      base.displayName ||
      user.displayName ||
      (user.isAnonymous ? "Guest" : "User"),
    email: base.email || user.email || null,
    phoneNumber: base.phoneNumber || user.phoneNumber || null,
    photoURL: base.photoURL || user.photoURL || null,
    isAnonymous: user.isAnonymous ?? false,
  };
}

export function useUserProfile(): { profile: UserProfile; loading: boolean } {
  const { user } = useAuth();
  const unsubRef = useRef<(() => void) | null>(null);

  const [profile, setProfile] = useState<UserProfile>(() => {
    if (!user) return defaultUserProfile;
    const cached = profileRepository.getCached(user.uid);
    return mergeAuthUser({ ...defaultUserProfile, ...(cached || {}) } as UserProfile, user);
  });

  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (unsubRef.current) {
      unsubRef.current();
      unsubRef.current = null;
    }

    if (!user) {
      setProfile(defaultUserProfile);
      setLoading(false);
      return;
    }

    const cached = profileRepository.getCached(user.uid);
    setProfile(mergeAuthUser({ ...defaultUserProfile, ...(cached || {}) } as UserProfile, user));
    setLoading(false);

    const safety = window.setTimeout(() => setLoading(false), 2500);

    const unsubscribe = profileRepository.watch(
      user.uid,
      (data) => {
        setProfile(mergeAuthUser({ ...defaultUserProfile, ...(data || {}) } as UserProfile, user));
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore read failed:", error);
        setProfile(mergeAuthUser(defaultUserProfile, user));
        setLoading(false);
      },
    );

    unsubRef.current = unsubscribe;
    return () => {
      window.clearTimeout(safety);
      unsubscribe();
    };
  }, [user]);

  return { profile, loading };
}
