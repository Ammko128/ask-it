import bcrypt from 'bcrypt';
import model from '../db/models';
import { questionQueryOptions } from '../utils/questionQueryOptions';

const { User, Question, Answer, sequelize } = model;

export default {
  getById: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.status(200).send(user);
  },
  update: async (req, res) => {
    if (!res.locals.user?.id || !parseInt(req.params.id) === res.locals.user.id)
      return res.status(403).send('Unauthorized request');
    const { firstName, lastName, newPassword, confirmPassword } = req.body;
    const { id } = req.params;
    let newPasswordHash;
    if (!!newPassword) {
      if (confirmPassword === newPassword)
        newPasswordHash = await bcrypt.hash(newPassword, 10);
    }
    const newData = {
      firstName,
      lastName,
    };
    if (newPasswordHash) newData.passwordHash = newPasswordHash;
    const updatedUser = await User.update(newData, { where: { id } });
    return res.status(200).send(updatedUser);
  },
  getTopContributors: async (req, res) => {
    const users = await User.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM "Answers" WHERE "Answers"."userId" = "User"."id")'
            ),
            'answerCount',
          ],
        ],
      },
      order: [[sequelize.col('answerCount'), 'DESC']],
      limit: 10,
    });
    return res.status(200).send(users);
  },
  getQuestions: async (req, res) => {
    const { count, rows: questions } = await Question.findAndCountAll({
      ...questionQueryOptions(res.locals.user?.id),
      where: { userId: req.params.id },
      limit: 20,
      order: [[{ model: Answer, as: 'answers' }, 'createdAt', 'ASC']],
      offset: req.query.offset || 0,
    });
    return res.status(200).send({ count, questions });
  },
};
