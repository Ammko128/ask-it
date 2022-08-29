import express from 'express';
import cors from 'cors';
import router from './router';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { privateJwtKey } from './config';
import model from './db/models';

const { InvalidAccessToken } = model;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', router);

const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('auth:login', async (data) => {
    const invalidAccessToken = await InvalidAccessToken.findOne({
      where: { token: data.token },
    });
    if (invalidAccessToken) return;
    let id;
    try {
      id = jwt.verify(data.token, privateJwtKey).id;
    } catch (e) {
      console.log('Socket auth login error:', e);
    }
    if (!id) return;
    socket.join(data.id);
  });
  socket.on('auth:logout', (data) => {
    socket.leave(data.id);
  });
});

export const socket = io;

server.listen(port, () => {
  console.log('App is now running at port ', port);
});
