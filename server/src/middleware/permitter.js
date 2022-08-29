import jwt from 'jsonwebtoken';
import { privateJwtKey } from '../config';
import model from '../db/models';

const { User, InvalidAccessToken } = model;

export default (skip = false) =>
  async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')?.[1];
    if (!token) return skip ? next() : res.status(403).send('Unauthorized');
    const invalidAccessToken = await InvalidAccessToken.findOne({
      where: { token },
    });
    if (invalidAccessToken)
      return skip ? next() : res.status(403).send('Unauthorized');
    let id;
    try {
      id = jwt.verify(token, privateJwtKey).id;
    } catch (e) {
      console.log('Permitter error:', e);
    }
    if (!id) return skip ? next() : res.status(403).send('Unauthorized');
    const user = await User.findByPk(id);
    res.locals.user = user;
    next();
  };
