import { profileRepository } from "../../../features/profile/data/ProfileRepository";
export const UserService = {
  getCachedProfile: profileRepository.getCached.bind(profileRepository),
  updateSettings: profileRepository.updateSettings.bind(profileRepository),
  upsertFromUser: profileRepository.upsertFromUser.bind(profileRepository),
};
