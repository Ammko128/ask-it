import { Model } from 'sequelize';
import { socket } from '../../index';

export default (sequelize, DataTypes) => {
  class Answer extends Model {
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
      this.hasMany(models.AnswerUpvote, {
        as: 'answerUpvotes',
        foreignKey: 'answerId',
        onDelete: 'cascade',
      });
      this.hasMany(models.AnswerDownvote, {
        as: 'answerDownvotes',
        foreignKey: 'answerId',
        onDelete: 'cascade',
      });
      this.hasMany(models.Notification, {
        as: 'notifications',
        foreignKey: 'answerId',
        onDelete: 'cascade',
      });
    }
  }
  Answer.init(
    {
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      content: DataTypes.STRING(10000),
      edited: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Answer',
      hooks: {
        afterCreate: async ({ questionId, id: answerId }) => {
          const { userId } = await sequelize.models.Question.findOne({
            where: { id: questionId },
          });
          const notification = await sequelize.models.Notification.create({
            userId,
            questionId,
            answerId,
            type: 'answer',
          });
          socket.in(`${userId}`).emit('notification', notification);
          return notification;
        },
      },
    }
  );
  return Answer;
};
