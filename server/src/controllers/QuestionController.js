import model from '../db/models';
import { questionQueryOptions } from '../utils/questionQueryOptions';

const {
  QuestionUpvote,
  QuestionDownvote,
  AnswerUpvote,
  AnswerDownvote,
  Question,
  Answer,
  User,
  sequelize,
} = model;

const removeRating = async (questionId, userId, model) => {
  await model.destroy({
    where: {
      userId,
      questionId,
    },
  });
};

const addRating = async (questionId, userId, model) => {
  await model.create({
    userId,
    questionId,
  });
};

export default {
  getAll: async (req, res) => {
    const { count, rows: questions } = await Question.findAndCountAll({
      ...questionQueryOptions(res.locals.user?.id),
      limit: 20,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).send({ count, questions });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const question = await Question.findOne({
      ...questionQueryOptions(res.locals.user?.id),
      where: { id },
    });
    return res.status(200).send(question);
  },
  update: async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
    const updatedQuestion = await Question.update(
      { content, edited: true },
      {
        where: { id, userId: res.locals.user.id },
      }
    );
    return res.status(200).send(updatedQuestion);
  },
  getHot: async (req, res) => {
    const { count, rows: questions } = await Question.findAndCountAll({
      ...questionQueryOptions(res.locals.user?.id, [
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM "QuestionUpvotes" WHERE "QuestionUpvotes"."questionId" = "Question".id)'
          ),
          'upvoteCount',
        ],
      ]),
      order: [[sequelize.col('upvoteCount'), 'DESC']],
      limit: 20,
      offset: req.query.offset || 0,
    });
    return res.status(200).send({ count, questions });
  },
  upvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const questionId = req.params.id;
    await removeRating(questionId, userId, QuestionDownvote);
    await addRating(questionId, userId, QuestionUpvote);
    const question = await Question.findOne({
      include: questionQueryOptions(res.locals.user?.id).include.slice(0, 2),
      where: { id: questionId },
    });
    return res.status(200).send(question);
  },
  downvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const questionId = req.params.id;
    await removeRating(questionId, userId, QuestionUpvote);
    await addRating(questionId, userId, QuestionDownvote);
    const question = await Question.findOne({
      include: questionQueryOptions(res.locals.user?.id).include.slice(0, 2),
      where: { id: questionId },
    });
    return res.status(200).send(question);
  },
  removeUpvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const questionId = req.params.id;
    await removeRating(questionId, userId, QuestionUpvote);
    const question = await Question.findOne({
      include: questionQueryOptions(res.locals.user?.id).include.slice(0, 2),
      where: { id: questionId },
    });
    return res.status(200).send(question);
  },
  removeDownvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const questionId = req.params.id;
    await removeRating(questionId, userId, QuestionDownvote);
    const question = await Question.findOne({
      include: questionQueryOptions(res.locals.user?.id).include.slice(0, 2),
      where: { id: questionId },
    });
    return res.status(200).send(question);
  },
  delete: async (req, res) => {
    await Question.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  },
  create: async (req, res) => {
    const newQuestion = await Question.create({
      content: req.body.content,
      userId: res.locals.user?.id,
    });
    return res.status(200).send(newQuestion);
  },
  addAnswer: async (req, res) => {
    const newAnswer = await Answer.create({
      content: req.body.content,
      userId: res.locals.user?.id,
      questionId: req.params.id,
    });
    const options = questionQueryOptions(res.locals.user?.id).include[3];
    const answer = await Answer.findOne({
      include: [
        {
          model: AnswerUpvote,
          as: 'answerUpvotes',
        },
        {
          model: AnswerDownvote,
          as: 'answerDownvotes',
        },
        {
          model: User,
          as: 'user',
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn(
              'EXISTS',
              sequelize.literal(
                `SELECT * FROM "AnswerUpvotes" WHERE "Answer".id = "AnswerUpvotes"."answerId" AND "AnswerUpvotes"."userId" = ${res.locals.user?.id}`
              )
            ),
            'currentUserUpvoted',
          ],
          [
            sequelize.fn(
              'EXISTS',
              sequelize.literal(
                `SELECT * FROM "AnswerDownvotes" WHERE "Answer".id = "AnswerDownvotes"."answerId" AND "AnswerDownvotes"."userId" = ${res.locals.user?.id}`
              )
            ),
            'currentUserDownvoted',
          ],
        ],
      },
      where: { id: newAnswer.id },
    });
    return res.status(200).send(answer);
  },
};
