import { all, put, takeEvery } from 'redux-saga/effects';
import { types, setQuestion, setIsLoading } from './actions';
import questionService from '../../../services/questionService';
import localHistory from '../../../localHistory';
import { addToast } from '../../Toaster/modules/actions';

function* fetchQuestion(action) {
  try {
    yield put(setIsLoading(true));
    const { data: question } = yield questionService.getQuestionById(
      action.payload.id
    );
    yield put(setQuestion(question));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide this question right now for you.',
      })
    );
  }
}

function* removeQuestion() {
  try {
    localHistory.push('/');
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: "You can't remove this question right now.",
      })
    );
  }
}

export default function* questionSaga() {
  yield all([takeEvery(types.FETCH_QUESTION, fetchQuestion)]);
  yield all([takeEvery(types.REMOVE_QUESTION, removeQuestion)]);
}
