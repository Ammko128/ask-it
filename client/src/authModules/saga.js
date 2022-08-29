import { all, put, takeEvery } from 'redux-saga/effects';
import { setEmailVerified, types } from './actions';
import { setCurrentUser } from '../components/Profile/modules/actions';
import authService from '../services/authService';
import localHistory from '../localHistory';
import { addToast } from '../components/Toaster/modules/actions';

function* login(action) {
  try {
    const {
      data: { token, id },
    } = yield authService.login(action.payload);
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localHistory.push('/');
    yield put({ type: 'SOCKET_LOGIN', payload: { token, id } });
  } catch (e) {
    yield put(
      addToast({
        title: 'Invalid credentials',
        message:
          e.response.status === 403
            ? 'We could not find an account with those credentials.'
            : e.response.status === 401
            ? 'Please verify your email to access your account.'
            : 'Try signing in again in a couple of minutes.',
      })
    );
  }
}

function* register(action) {
  try {
    yield authService.register(action.payload);
    localHistory.push('/login', { registered: true });
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message:
          e.response.status === 409
            ? 'User with that email address already exists.'
            : 'Try signing up again in a couple of minutes.',
      })
    );
  }
}

function* logout() {
  try {
    yield put(setCurrentUser({}));
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    yield authService.logout(userId, token);
    yield put({ type: 'SOCKET_LOGOUT', payload: { token, id: userId } });
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not invalidate your access token.',
      })
    );
  } finally {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localHistory.push('/login', { logout: true });
  }
}

function* forgotPassword(action) {
  try {
    yield authService.forgotPassword(action.payload.email);
  } catch (e) {
    yield put(
      addToast({
        title: 'Invalid email address',
        message: 'We could not find an account with that email.',
      })
    );
  }
}

function* resetPassword(action) {
  try {
    yield authService.resetPassword(action.payload);
    localHistory.push('/login', { resetPassword: true });
  } catch (e) {
    yield put(
      addToast({
        title: 'Invalid token',
        message: 'Use the link from your email to reset your password.',
      })
    );
  }
}

function* verifyEmail(action) {
  try {
    yield authService.verifyEmail(action.payload);
    yield put(setEmailVerified(true));
  } catch (e) {
    yield put(setEmailVerified(false));
    yield put(
      addToast({
        title: 'Invalid token',
        message: 'Use the link from your email to verify your email.',
      })
    );
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(types.AUTH_LOGIN, login),
    takeEvery(types.AUTH_REGISTER, register),
    takeEvery(types.AUTH_LOGOUT, logout),
    takeEvery(types.AUTH_RESET_PASSWORD, resetPassword),
    takeEvery(types.AUTH_FORGOT_PASSWORD, forgotPassword),
    takeEvery(types.AUTH_VERIFY_EMAIL, verifyEmail),
  ]);
}
