import type { User } from "firebase/auth";
import type { UserProfile, UserSettings } from "./UserProfile";

export interface IProfileRepository {
  getCached(uid: string): Partial<UserProfile> | null;
  clearCache(): void;
  upsertFromUser(user: User, provider?: string): Promise<void>;
  updateSettings(uid: string, settings: UserSettings): Promise<void>;
  watch(uid: string, onData: (data: Partial<UserProfile> | null) => void, onError?: (e: unknown) => void): () => void;
}
