import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Notification extends Model {
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
      this.belongsTo(models.Answer, {
        as: 'answer',
        foreignKey: 'answerId',
        onDelete: 'cascade',
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      answerId: DataTypes.INTEGER,
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Notification',
    }
  );
  return Notification;
};
