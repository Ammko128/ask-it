import nodemailer from 'nodemailer';
import {
  smtpHost,
  smtpPassword,
  smtpPort,
  smtpSecure,
  smtpUser,
} from './config';

const emailClient = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (subject, body, to, from, html = true) => {
  try {
    return emailClient.sendMail({
      subject,
      to,
      from,
      html: html ? body : undefined,
      text: !html ? body : undefined,
    });
  } catch (e) {
    console.log('Send email error', e.response);
    return;
  }
};

export default sendEmail;
