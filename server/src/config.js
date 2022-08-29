import dotenv from 'dotenv';

dotenv.config();

export const privateJwtKey = process.env.PRIVATE_JWT_KEY;
export const frontendUrl = process.env.FRONTEND_URL;
export const emailFrom = process.env.EMAIL_FROM;
export const smtpHost = process.env.SMTP_HOST || 'smtp.ethereal.email';
export const smtpPort = parseInt(process.env.SMTP_PORT || '587');
export const smtpSecure = process.env.SMTP_SECURE === 'true';
export const smtpUser = process.env.SMTP_USER;
export const smtpPassword = process.env.SMTP_PASSWORD;
