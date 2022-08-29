import { apiService } from './apiService';

const BASE_PATH = '/notification';

const notificationService = {
  getAll: async () => {
    const response = await apiService.get(BASE_PATH);
    return response;
  },
  readNotifications: async (notificationIds) => {
    const response = await apiService.post(`${BASE_PATH}/read`, {
      notificationIds,
    });
    return response;
  },
};

export default notificationService;
