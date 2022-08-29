import model from '../db/models';

const { Notification } = model;

export default {
  getAll: async (_, res) => {
    const newNotifications = await Notification.findAll({
      where: { userId: res.locals.user?.id, isRead: false },
    });
    return res.status(200).send(newNotifications);
  },
  readNotifications: async (req, res) => {
    await Notification.update(
      { isRead: true },
      { where: { id: req.body.notificationIds, userId: res.locals.user?.id } }
    );
    return res.sendStatus(200);
  },
};
