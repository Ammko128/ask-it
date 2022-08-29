import model from '../db/models';
import { questionQueryOptions } from '../utils/questionQueryOptions';

const { AnswerUpvote, AnswerDownvote, Answer } = model;

const removeRating = async (answerId, userId, model) => {
  await model.destroy({
    where: {
      userId,
      answerId,
    },
  });
};

const addRating = async (answerId, userId, model) => {
  await model.create({
    userId,
    answerId,
  });
};

export default {
  update: async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;
    const updatedAnswer = await Answer.update(
      { content, edited: true },
      {
        where: { id, userId: res.locals.user.id },
      }
    );
    return res.status(200).send(updatedAnswer);
  },
  upvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const answerId = req.params.id;
    await removeRating(answerId, userId, AnswerDownvote);
    await addRating(answerId, userId, AnswerUpvote);
    const answer = await Answer.findOne({
      include: questionQueryOptions(res.locals.user?.id).include[3].include,
      where: { id: answerId },
    });
    return res.status(200).send(answer);
  },
  downvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const answerId = req.params.id;
    await removeRating(answerId, userId, AnswerUpvote);
    await addRating(answerId, userId, AnswerDownvote);
    const answer = await Answer.findOne({
      include: questionQueryOptions(res.locals.user?.id).include[3].include,
      where: { id: answerId },
    });
    return res.status(200).send(answer);
  },
  removeUpvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const answerId = req.params.id;
    await removeRating(answerId, userId, AnswerUpvote);
    const answer = await Answer.findOne({
      include: questionQueryOptions(res.locals.user?.id).include[3].include,
      where: { id: answerId },
    });
    return res.status(200).send(answer);
  },
  removeDownvote: async (req, res) => {
    const userId = res.locals.user?.id;
    const answerId = req.params.id;
    await removeRating(answerId, userId, AnswerDownvote);
    const answer = await Answer.findOne({
      include: questionQueryOptions(res.locals.user?.id).include[3].include,
      where: { id: answerId },
    });
    return res.status(200).send(answer);
  },
  delete: async (req, res) => {
    await Answer.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  },
};
