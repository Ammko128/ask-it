import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Question extends Model {
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
      this.hasMany(models.Answer, {
        as: 'answers',
        foreignKey: 'questionId',
        onDelete: 'cascade',
      });
      this.hasMany(models.QuestionUpvote, {
        as: 'questionUpvotes',
        foreignKey: 'questionId',
        onDelete: 'cascade',
      });
      this.hasMany(models.QuestionDownvote, {
        as: 'questionDownvotes',
        foreignKey: 'questionId',
        onDelete: 'cascade',
      });
      this.hasMany(models.Notification, {
        as: 'notifications',
        foreignKey: 'questionId',
        onDelete: 'cascade',
      });
    }
  }
  Question.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING(10000),
      edited: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Question',
    }
  );
  return Question;
};
