/**
 * Backward-compatible thin facade.
 * Real implementation lives in `features/onboarding`.
 */
import { onboardingRepository } from "../features/onboarding";

export const hasCompletedOnboarding = () => onboardingRepository.isCompleted();
export const completeOnboarding = () => onboardingRepository.complete();
export const resetOnboarding = () => onboardingRepository.reset();
