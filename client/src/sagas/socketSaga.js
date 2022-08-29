import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';
import { io } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { addToast } from '../components/Toaster/modules/actions';
import {
  addMessages,
  addNotification,
  setMessagesCount,
} from '../components/Profile/modules/actions';
import { toastMessages } from '../constants';
import config from '../config';
import { selectMessagesCount } from '../components/Profile/modules/selectors';

const connect = () => {
  const socket = io(config.socketUrl);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      if (!!localStorage.getItem('token')) {
        socket.emit('auth:login', {
          token: localStorage.getItem('token'),
          id: localStorage.getItem('id'),
        });
      }
      resolve(socket);
    });
  });
};

const createSocketChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (event) => (data) => {
      emit({ data, event });
    };
    socket.on('notification', handler('notification'));
    socket.on('message', handler('message'));
    return () => {
      socket.off('notification', handler('notification'));
      socket.off('message', handler('message'));
    };
  });

const socketLogin =
  (socket) =>
  ({ payload: { token, id } }) => {
    socket.emit('auth:login', {
      token,
      id: `${id}`,
    });
  };

const socketLogout =
  (socket) =>
  ({ payload: { token, id } }) => {
    socket.emit('auth:logout', {
      token,
      id: `${id}`,
    });
  };

export default function* socketSaga() {
  const socket = yield call(connect);
  const socketChannel = yield call(createSocketChannel, socket);

  yield all([takeEvery('SOCKET_LOGIN', socketLogin(socket))]);
  yield all([takeEvery('SOCKET_LOGOUT', socketLogout(socket))]);

  while (true) {
    const payload = yield take(socketChannel);
    switch (payload.event) {
      case 'notification':
        yield put(
          addToast({
            title: 'Notification',
            message: toastMessages[payload.data.type],
          })
        );
        yield put(addNotification(payload.data));
        break;
      case 'message':
        if (
          payload.data.conversation.userId1 ===
          payload.data.conversation.userId2
        )
          break;
        yield put(
          addToast({
            title: 'New message',
            message: 'You have a new private message.',
          })
        );
        yield put(
          addMessages(
            payload.data.conversation,
            [payload.data.message],
            'bottom'
          )
        );
        const newMessagesCount = yield select(selectMessagesCount);
        yield put(setMessagesCount(newMessagesCount + 1));
        break;
      default:
    }
  }
}
