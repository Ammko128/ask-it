import { all, put, takeEvery } from 'redux-saga/effects';
import {
  types,
  setCurrentUser,
  setUser,
  setUserQuestionsCount,
  setUserQuestions,
  setNotifications,
  setIsLoading,
  fetchUser as fetchUserAction,
  fetchUserQuestions as fetchUserQuestionsAction,
  setMessagesCount,
  setConversations,
  addMessages,
  setChatIsLoading,
  fetchMessagesCount as fetchMessagesCountAction,
  fetchConversations as fetchConversationsAction,
} from './actions';
import userService from '../../../services/userService';
import notificationService from '../../../services/notificationService';
import { addToast } from '../../Toaster/modules/actions';
import localHistory from '../../../localHistory';
import messageService from '../../../services/messageService';

function* fetchCurrentUser() {
  try {
    const id = localStorage.getItem('id');
    const { data } = yield userService.getById(id);
    yield put(setCurrentUser(data));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try logging in again.',
      })
    );
    localHistory.push('/login');
  }
}

function* fetchUser(action) {
  try {
    yield put(setIsLoading(true));
    const { data: user } = yield userService.getById(action.payload.id);
    yield put(setUser(user));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message:
          'We could not provide information about this user right now for you.',
      })
    );
  }
}

function* fetchUserQuestions(action) {
  try {
    yield put(setIsLoading(!action.payload.offset));
    const {
      data: { questions, count },
    } = yield userService.getUserQuestions(
      action.payload.id,
      action.payload.offset
    );
    yield put(setUserQuestions(questions));
    yield put(setUserQuestionsCount(count));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message:
          'We could not provide questions from this user right now for you.',
      })
    );
  }
}

function* fetchNotifications() {
  try {
    const { data: notifications } = yield notificationService.getAll();
    yield put(setNotifications(notifications));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide new notifications for you right now.',
      })
    );
  }
}

function* readNotifications(action) {
  try {
    yield notificationService.readNotifications(action.payload.notificationIds);
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Notifications could not be flagged as read.',
      })
    );
  }
}

function* updateUser(action) {
  try {
    const id = localStorage.getItem('id');
    yield userService.update(
      id,
      action.payload.firstName,
      action.payload.lastName
    );
    yield put(fetchUserAction(id));
    yield put(fetchUserQuestionsAction(id));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try updating your profile again in a couple of minutes.',
      })
    );
  }
}

function* updateUserPassword(action) {
  try {
    const id = localStorage.getItem('id');
    yield userService.changePassword(
      id,
      action.payload.newPassword,
      action.payload.confirmPassword
    );
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try changing your password again in a couple of minutes.',
      })
    );
  }
}

function* fetchMessagesCount() {
  try {
    const {
      data: { messageCount },
    } = yield messageService.fetchMessagesCount();
    yield put(setMessagesCount(messageCount));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message:
          'We could not provide number of new messages for you right now.',
      })
    );
  }
}

function* fetchConversations() {
  try {
    yield put(setChatIsLoading(true));
    const { data: conversations } = yield messageService.fetchConversations();
    yield put(setConversations(conversations));
    yield put(setChatIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide conversations for you right now.',
      })
    );
  }
}

function* fetchMoreMessages(action) {
  try {
    yield put(setChatIsLoading(true));
    const { conversationId, offset } = action.payload;
    const { data: messages } = yield messageService.fetchMoreMessages(
      conversationId,
      offset
    );
    yield put(addMessages({ id: conversationId }, messages));
    yield put(setChatIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide more messages for you right now.',
      })
    );
  }
}

function* sendMessage(action) {
  try {
    const { receiverId, message } = action.payload;
    const {
      data: { conversation, message: newMessage },
    } = yield messageService.sendMessage(receiverId, message);
    yield put(addMessages(conversation, [newMessage], 'bottom'));
    if (action.payload.historyPush)
      localHistory.push(`/messages/${conversation.id}`);
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try sending a message again in a couple of minutes.',
      })
    );
  }
}

function* readMessages(action) {
  try {
    const { conversationId } = action.payload;
    yield messageService.readMessages(conversationId);
    yield put(fetchConversationsAction());
    yield put(fetchMessagesCountAction());
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try setting messages as read again in a couple of minutes.',
      })
    );
  }
}

export default function* profileSaga() {
  yield all([takeEvery(types.FETCH_CURRENT_USER, fetchCurrentUser)]);
  yield all([takeEvery(types.FETCH_USER, fetchUser)]);
  yield all([takeEvery(types.FETCH_USER_QUESTIONS, fetchUserQuestions)]);
  yield all([takeEvery(types.FETCH_NOTIFICATIONS, fetchNotifications)]);
  yield all([takeEvery(types.READ_NOTIFICATIONS, readNotifications)]);
  yield all([takeEvery(types.UPDATE_USER, updateUser)]);
  yield all([takeEvery(types.UPDATE_USER_PASSWORD, updateUserPassword)]);
  yield all([takeEvery(types.FETCH_MESSAGES_COUNT, fetchMessagesCount)]);
  yield all([takeEvery(types.FETCH_CONVERSATIONS, fetchConversations)]);
  yield all([takeEvery(types.FETCH_MORE_MESSAGES, fetchMoreMessages)]);
  yield all([takeEvery(types.SEND_MESSAGE, sendMessage)]);
  yield all([takeEvery(types.READ_MESSAGES, readMessages)]);
}
