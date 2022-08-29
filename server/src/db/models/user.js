import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Question, {
        as: 'questions',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(models.Answer, {
        as: 'answers',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(models.QuestionUpvote, {
        as: 'questionUpvotes',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(models.QuestionDownvote, {
        as: 'questionDownvotes',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(models.AnswerUpvote, {
        as: 'answerUpvotes',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(models.AnswerDownvote, {
        as: 'answerDownvotes',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(models.Notification, {
        as: 'notifications',
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['passwordHash'] },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
