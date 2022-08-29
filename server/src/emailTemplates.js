import { frontendUrl } from './config';

export const getResetPasswordEmailBody = (token) =>
  `<a href="${frontendUrl}/reset-password?token=${token}">Reset password</a>`;

export const getVerifyEmailBody = (token) =>
  `<a href="${frontendUrl}/verify-email?token=${token}">Verify email</a>`;
