import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../db/models';
import { privateJwtKey, emailFrom } from '../config';
import sendEmail from '../emailClient';
import {
  getResetPasswordEmailBody,
  getVerifyEmailBody,
} from '../emailTemplates';

const { User, InvalidAccessToken } = model;

export default {
  register: async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (user) {
        return res
          .status(409)
          .send({ message: 'User with that email already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        passwordHash,
      });
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, emailVerification: true },
        privateJwtKey
      );
      await sendEmail(
        'Ask.it - Verify email address',
        getVerifyEmailBody(token),
        newUser.email,
        emailFrom
      );
      return res.status(201).send({
        message: 'Account created successfully',
        email: newUser.email,
      });
    } catch (e) {
      return res.status(500).send({
        message: 'Something went wrong. Please try again later.',
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { include: ['passwordHash'] },
      });
      const correctPassword = !user
        ? undefined
        : await bcrypt.compare(password, user.passwordHash);
      if (!correctPassword) return res.status(403).send('Wrong credentials.');
      if (user.emailVerified === false) {
        return res.status(401).send('Email not verified.');
      }
      const token = jwt.sign({ id: user.id }, privateJwtKey);
      res.status(200).send({ token, id: user.id });
    } catch (e) {
      return res.status(500).send({
        message: 'Something went wrong. Please try again later.',
      });
    }
  },
  logout: async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).send('Token is invalid');
    await InvalidAccessToken.create({ token });
    return res.status(200).send('Successfully logged out');
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send('Email is invalid');
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send('User not found');
    const token = jwt.sign({ id: user.id, resetPassword: true }, privateJwtKey);
    await sendEmail(
      'Ask.it - Reset password',
      getResetPasswordEmailBody(token),
      user.email,
      emailFrom
    );
    return res.sendStatus(200);
  },
  resetPassword: async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token) return res.status(400).send('Token is invalid');
    let id;
    try {
      const decodedToken = jwt.verify(token, privateJwtKey);
      if (!decodedToken.resetPassword)
        return res.status(400).send('Token is invalid');
      id = decodedToken.id;
    } catch (e) {
      console.log('Reset password token error:', e);
      return res.status(400).send('Token is invalid');
    }
    const passwordHash =
      newPassword === confirmPassword
        ? await bcrypt.hash(newPassword, 10)
        : null;
    await User.update({ passwordHash }, { where: { id } });
    return res.sendStatus(200);
  },
  verifyEmail: async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).send('Token is invalid');
    let email;
    try {
      const decodedToken = jwt.verify(token, privateJwtKey);
      if (!decodedToken.emailVerification)
        return res.status(400).send('Token is invalid');
      email = decodedToken.email;
    } catch (e) {
      console.log('Verify email token error:', e);
      return res.status(400).send('Token is invalid');
    }
    await User.update({ emailVerified: true }, { where: { email } });
    return res.sendStatus(200);
  },
};
