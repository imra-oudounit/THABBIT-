import { storage } from "../../../core/utils/storage";
import { STORAGE_KEYS } from "../../../core/constants/app";

/**
 * Onboarding state lives entirely on the device.
 * No Firestore writes required for first-launch experience.
 */
export const onboardingRepository = {
  isCompleted(): boolean {
    return storage.get(STORAGE_KEYS.ONBOARDING_COMPLETED) === "true";
  },
  complete(): void {
    storage.set(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
  },
  reset(): void {
    storage.remove(STORAGE_KEYS.ONBOARDING_COMPLETED);
  },
};
