import { Router } from 'express';
import permitter from '../middleware/permitter';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import QuestionController from '../controllers/QuestionController';
import AnswerController from '../controllers/AnswerController';
import NotificationController from '../controllers/NotificationController';
import ConversationController from '../controllers/ConversationController';

const router = Router();

// Auth routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.post('/auth/forgot-password', AuthController.forgotPassword);
router.post('/auth/reset-password', AuthController.resetPassword);
router.post('/auth/verify-email', AuthController.verifyEmail);

// Question routes
router.get('/question/hot', permitter(true), QuestionController.getHot);
router.get('/question/:id', permitter(true), QuestionController.getById);
router.get('/question', permitter(true), QuestionController.getAll);
router.patch('/question/:id', permitter(), QuestionController.update);
router.post('/question/:id/answer', permitter(), QuestionController.addAnswer);
router.post('/question/:id/upvote', permitter(), QuestionController.upvote);
router.post('/question/:id/downvote', permitter(), QuestionController.downvote);
router.post('/question', permitter(), QuestionController.create);
router.delete(
  '/question/:id/upvote',
  permitter(),
  QuestionController.removeUpvote
);
router.delete(
  '/question/:id/downvote',
  permitter(),
  QuestionController.removeDownvote
);
router.delete('/question/:id', permitter(), QuestionController.delete);

// Answer routes
router.patch('/answer/:id', permitter(), AnswerController.update);
router.post('/answer/:id/upvote', permitter(), AnswerController.upvote);
router.post('/answer/:id/downvote', permitter(), AnswerController.downvote);
router.delete('/answer/:id/upvote', permitter(), AnswerController.removeUpvote);
router.delete(
  '/answer/:id/downvote',
  permitter(),
  AnswerController.removeDownvote
);
router.delete('/answer/:id', permitter(), AnswerController.delete);

// User routes
router.get(
  '/user/top-contributors',
  permitter(true),
  UserController.getTopContributors
);
router.get('/user/:id/question', permitter(true), UserController.getQuestions);
router.get('/user/:id', permitter(true), UserController.getById);
router.patch('/user/:id', permitter(), UserController.update);

router.get('/notification', permitter(), NotificationController.getAll);
router.post(
  '/notification/read',
  permitter(),
  NotificationController.readNotifications
);

router.get('/conversation', permitter(), ConversationController.getAll);
router.get(
  '/conversation/message-count',
  permitter(),
  ConversationController.getMessageCount
);
router.get(
  '/conversation/:id',
  permitter(),
  ConversationController.getMessages
);
router.post('/conversation', permitter(), ConversationController.sendMessage);
router.post(
  '/conversation/:id/read',
  permitter(),
  ConversationController.readMessages
);

// Invalid route
router.all('*', (_, res) =>
  res.status(404).send({
    message: 'Invalid endpoint.',
  })
);

export default router;
