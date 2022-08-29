import { apiService } from './apiService';

const BASE_PATH = '/auth';

const authService = {
  login: async (credentials) => {
    const response = await apiService.post(`${BASE_PATH}/login`, credentials);
    return response;
  },
  register: async (newUser) => {
    const response = await apiService.post(`${BASE_PATH}/register`, newUser);
    return response;
  },
  logout: async (userId, token) => {
    const response = await apiService.post(`${BASE_PATH}/logout`, {
      userId,
      token,
    });
    return response;
  },
  forgotPassword: async (email) => {
    const response = await apiService.post(`${BASE_PATH}/forgot-password`, {
      email,
    });
    return response;
  },
  resetPassword: async (data) => {
    const response = await apiService.post(`${BASE_PATH}/reset-password`, data);
    return response;
  },
  verifyEmail: async (data) => {
    const response = await apiService.post(`${BASE_PATH}/verify-email`, data);
    return response;
  },
};

export default authService;
