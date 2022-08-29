import { Model } from 'sequelize';
import { socket } from '../../index';

export default (sequelize, DataTypes) => {
  class QuestionUpvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.belongsTo(models.Question, {
        as: 'question',
        foreignKey: 'questionId',
        onDelete: 'cascade',
      });
    }
  }
  QuestionUpvote.init(
    {
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'QuestionUpvote',
      hooks: {
        afterCreate: async ({ questionId }) => {
          const { userId } = await sequelize.models.Question.findOne({
            where: { id: questionId },
          });
          const notification = await sequelize.models.Notification.create({
            userId,
            questionId,
            type: 'question-upvote',
          });
          socket.in(`${userId}`).emit('notification', notification);
          return notification;
        },
      },
    }
  );
  return QuestionUpvote;
};
