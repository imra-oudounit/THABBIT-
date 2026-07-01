export const notificationRepository = {
  async requestPermission() { return false; },
  async getNotifications() { return [] as any[]; },
};
