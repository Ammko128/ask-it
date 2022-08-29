export const types = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_REGISTER: 'AUTH_REGISTER',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_FORGOT_PASSWORD: 'AUTH_FORGOT_PASSWORD',
  AUTH_RESET_PASSWORD: 'AUTH_RESET_PASSWORD',
  AUTH_VERIFY_EMAIL: 'AUTH_VERIFY_EMAIL',
  AUTH_SET_EMAIL_VERIFIED: 'AUTH_SET_EMAIL_VERIFIED',
};

export const login = (email, password) => ({
  type: types.AUTH_LOGIN,
  payload: { email, password },
});

export const register = (email, password, firstName, lastName) => ({
  type: types.AUTH_REGISTER,
  payload: { email, password, firstName, lastName },
});

export const logout = () => ({
  type: types.AUTH_LOGOUT,
});

export const forgotPassword = (email) => ({
  type: types.AUTH_FORGOT_PASSWORD,
  payload: { email },
});

export const resetPassword = (token, newPassword, confirmPassword) => ({
  type: types.AUTH_RESET_PASSWORD,
  payload: { token, newPassword, confirmPassword },
});

export const verifyEmail = (token) => ({
  type: types.AUTH_VERIFY_EMAIL,
  payload: { token },
});

export const setEmailVerified = (emailVerified) => ({
  type: types.AUTH_SET_EMAIL_VERIFIED,
  payload: { emailVerified },
});
