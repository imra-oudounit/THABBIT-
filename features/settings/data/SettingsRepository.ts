import { profileRepository } from "../../profile/data/ProfileRepository";
export const settingsRepository = {
  updateSettings: profileRepository.updateSettings.bind(profileRepository),
};
