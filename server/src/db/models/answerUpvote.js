import { Model } from 'sequelize';
import { socket } from '../../index';

export default (sequelize, DataTypes) => {
  class AnswerUpvote extends Model {
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
      this.belongsTo(models.Answer, {
        as: 'answer',
        foreignKey: 'answerId',
        onDelete: 'cascade',
      });
    }
  }
  AnswerUpvote.init(
    {
      userId: DataTypes.INTEGER,
      answerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AnswerUpvote',
      hooks: {
        afterCreate: async ({ answerId }) => {
          const { userId, questionId } = await sequelize.models.Answer.findOne({
            where: { id: answerId },
          });
          const notification = await sequelize.models.Notification.create({
            userId,
            answerId,
            questionId,
            type: 'answer-upvote',
          });
          socket.in(`${userId}`).emit('notification', notification);
          return notification;
        },
      },
    }
  );
  return AnswerUpvote;
};
