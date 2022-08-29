import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user1',
        foreignKey: 'userId1',
        onDelete: 'cascade',
      });
      this.belongsTo(models.User, {
        as: 'user2',
        foreignKey: 'userId2',
        onDelete: 'cascade',
      });
      this.hasMany(models.Message, {
        as: 'messages',
        foreignKey: 'conversationId',
        onDelete: 'cascade',
      });
    }
  }
  Conversation.init(
    {
      userId1: DataTypes.INTEGER,
      userId2: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Conversation',
    }
  );
  return Conversation;
};
