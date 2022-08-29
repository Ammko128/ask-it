import { Model } from 'sequelize';
import { socket } from '../../index';

export default (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'sender',
        foreignKey: 'senderId',
        onDelete: 'cascade',
      });
      this.belongsTo(models.User, {
        as: 'receiver',
        foreignKey: 'receiverId',
        onDelete: 'cascade',
      });
      this.belongsTo(models.Conversation, {
        as: 'conversation',
        foreignKey: 'conversationId',
        onDelete: 'cascade',
      });
    }
  }
  Message.init(
    {
      conversationId: DataTypes.INTEGER,
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      message: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: 'Message',
      hooks: {
        afterCreate: async (message) => {
          const conversation = await sequelize.models.Conversation.findOne({
            where: { id: message.conversationId },
            include: [
              {
                model: sequelize.models.User,
                as: 'user1',
              },
              {
                model: sequelize.models.User,
                as: 'user2',
              },
            ],
          });
          const newMessage = await sequelize.models.Message.findOne({
            where: { id: message.id },
            include: [
              {
                model: sequelize.models.User,
                as: 'sender',
              },
              {
                model: sequelize.models.User,
                as: 'receiver',
              },
            ],
          });
          socket
            .in(`${message.receiverId}`)
            .emit('message', { conversation, message: newMessage });
          return conversation;
        },
      },
    }
  );
  return Message;
};
