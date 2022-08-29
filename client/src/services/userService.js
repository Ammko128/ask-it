import { apiService } from './apiService';

const BASE_PATH = '/user';

const userService = {
  getTopContributors: async () => {
    const response = await apiService.get(`${BASE_PATH}/top-contributors`);
    return response;
  },
  getById: async (id) => {
    const response = await apiService.get(`${BASE_PATH}/${id}`);
    return response;
  },
  getUserQuestions: async (id, offset = 0) => {
    const response = await apiService.get(`${BASE_PATH}/${id}/question`, {
      params: { offset },
    });
    return response;
  },
  update: async (id, firstName, lastName) => {
    const response = await apiService.patch(`${BASE_PATH}/${id}`, {
      firstName,
      lastName,
    });
    return response;
  },
  changePassword: async (id, newPassword, confirmPassword) => {
    const response = await apiService.patch(`${BASE_PATH}/${id}`, {
      newPassword,
      confirmPassword,
    });
    return response;
  },
};

export default userService;
