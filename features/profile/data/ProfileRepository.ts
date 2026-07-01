import type { User } from "firebase/auth";
import { container } from "../../../core/di/container";
import { storage } from "../../../core/utils/storage";
import { STORAGE_KEYS, FIRESTORE_COLLECTIONS } from "../../../core/constants/app";
import {
  defaultUserProfile,
  type UserProfile,
  type UserSettings,
} from "../domain/UserProfile";
import type { IProfileRepository } from "../domain/IProfileRepository";

/**
 * Firestore-backed implementation of the profile repository.
 * - Caches the profile in localStorage for instant first paint.
 * - Deduplicates rapid writes that often happen during sign-up.
 */
class ProfileRepository implements IProfileRepository {
  private readonly firestore = container.firestore;
  private lastWriteUid = "";
  private lastWriteTime = 0;

  // ── Cache ─────────────────────────────────────────────────────────
  getCached(uid: string): Partial<UserProfile> | null {
    const cached = storage.getJSON<Partial<UserProfile>>(STORAGE_KEYS.PROFILE_CACHE);
    if (!cached) return null;
    if (cached.uid && cached.uid !== uid) return null;
    return cached;
  }

  private setCached(value: Partial<UserProfile>): void {
    storage.setJSON(STORAGE_KEYS.PROFILE_CACHE, value);
  }

  clearCache(): void {
    storage.remove(STORAGE_KEYS.PROFILE_CACHE);
  }

  // ── Reads ─────────────────────────────────────────────────────────
  watch(uid: string, onData: (data: Partial<UserProfile> | null) => void, onError?: (e: unknown) => void) {
    return this.firestore.watchDoc<Partial<UserProfile>>(
      FIRESTORE_COLLECTIONS.USERS,
      uid,
      (data) => onData(data),
      (err) => onError?.(err),
    );
  }

  // ── Writes ────────────────────────────────────────────────────────
  async upsertFromUser(user: User, provider?: string): Promise<void> {
    const now = Date.now();
    if (user.uid === this.lastWriteUid && now - this.lastWriteTime < 3000) return;
    this.lastWriteUid = user.uid;
    this.lastWriteTime = now;

    const detectedProvider =
      provider ?? (user.isAnonymous ? "anonymous" : user.providerData?.[0]?.providerId ?? "google");

    try {
      const existing = await this.firestore.getDoc<Partial<UserProfile>>(
        FIRESTORE_COLLECTIONS.USERS,
        user.uid,
      );

      if (!existing) {
        const profile: UserProfile = {
          ...defaultUserProfile,
          uid: user.uid,
          displayName: user.displayName ?? (user.isAnonymous ? "Guest" : null),
          phoneNumber: user.phoneNumber,
          email: user.email,
          photoURL: user.photoURL,
          provider: detectedProvider,
          language: document.documentElement.lang || "ar",
          createdAt: this.firestore.serverTime(),
          lastLogin: this.firestore.serverTime(),
          isAnonymous: user.isAnonymous,
        };
        await this.firestore.setDoc(FIRESTORE_COLLECTIONS.USERS, user.uid, profile);
        this.setCached({
          ...profile,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
        return;
      }

      const patch = {
        displayName: user.displayName ?? existing.displayName,
        phoneNumber: user.phoneNumber ?? existing.phoneNumber,
        email: user.email ?? existing.email,
        photoURL: user.photoURL ?? existing.photoURL,
        provider: detectedProvider,
        isAnonymous: user.isAnonymous,
        lastLogin: this.firestore.serverTime(),
      };
      await this.firestore.updateDoc(FIRESTORE_COLLECTIONS.USERS, user.uid, patch);
      this.setCached({ ...existing, ...patch, lastLogin: new Date().toISOString() });
    } catch (error) {
      console.warn("Firestore write failed (check security rules):", error);
    }
  }

  async updateSettings(uid: string, settings: UserSettings): Promise<void> {
    try {
      await this.firestore.updateDoc(FIRESTORE_COLLECTIONS.USERS, uid, { settings });
      const cached = this.getCached(uid);
      if (cached) this.setCached({ ...cached, settings });
    } catch (error) {
      console.warn("Failed to update settings:", error);
    }
  }
}

export const profileRepository: IProfileRepository = new ProfileRepository();
