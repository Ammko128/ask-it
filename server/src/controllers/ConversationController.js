import { Op } from 'sequelize';
import model from '../db/models';

const { Conversation, Message, User } = model;

export default {
  getAll: async (_, res) => {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { userId1: res.locals.user?.id },
          { userId2: res.locals.user?.id },
        ],
      },
      include: [
        {
          model: Message,
          as: 'messages',
          order: [['createdAt', 'DESC']],
          limit: 25,
          include: [
            {
              model: User,
              as: 'sender',
            },
            {
              model: User,
              as: 'receiver',
            },
          ],
        },
        {
          model: User,
          as: 'user1',
        },
        {
          model: User,
          as: 'user2',
        },
      ],
    });
    return res.status(200).send(conversations);
  },
  getMessages: async (req, res) => {
    const messages = await Message.findAll({
      where: { conversationId: req.params.id },
      offset: req.query.offset,
      order: [['createdAt', 'DESC']],
      limit: 25,
      include: [
        {
          model: User,
          as: 'sender',
        },
        {
          model: User,
          as: 'receiver',
        },
      ],
    });
    return res.status(200).send(messages);
  },
  getMessageCount: async (_, res) => {
    const messageCount = await Message.count({
      where: { receiverId: res.locals.user?.id, isRead: false },
    });
    return res.status(200).send({ messageCount });
  },
  sendMessage: async (req, res) => {
    const [conversation, created] = await Conversation.findOrCreate({
      where: {
        [Op.or]: [
          { userId1: req.body.receiverId, userId2: res.locals.user?.id },
          { userId2: req.body.receiverId, userId1: res.locals.user?.id },
        ],
      },
      defaults: {
        userId1: res.locals.user?.id,
        userId2: req.body.receiverId,
      },
      include: [
        {
          model: User,
          as: 'user1',
        },
        {
          model: User,
          as: 'user2',
        },
      ],
    });
    const conversationReturn = created
      ? await Conversation.findOne({
          where: { id: conversation.id },
          include: [
            {
              model: User,
              as: 'user1',
            },
            {
              model: User,
              as: 'user2',
            },
          ],
        })
      : conversation;
    const message = await Message.create(
      {
        conversationId: conversation.id,
        senderId: res.locals.user?.id,
        receiverId: req.body.receiverId,
        message: req.body.message,
      },
      {}
    );
    const newMessage = await Message.findOne({
      where: { id: message.id },
      include: [
        {
          model: User,
          as: 'sender',
        },
        {
          model: User,
          as: 'receiver',
        },
      ],
    });
    return res
      .status(201)
      .send({ conversation: conversationReturn, message: newMessage });
  },
  readMessages: async (req, res) => {
    await Message.update(
      { isRead: true },
      {
        where: {
          receiverId: res.locals.user?.id,
          conversationId: req.params.id,
          isRead: false,
        },
      }
    );
    return res.sendStatus(200);
  },
};
