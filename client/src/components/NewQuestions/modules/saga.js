import { all, put, takeEvery } from 'redux-saga/effects';
import {
  types,
  setNewQuestionsCount,
  setNewQuestions,
  setIsLoading,
} from './actions';
import questionService from '../../../services/questionService';
import { addToast } from '../../Toaster/modules/actions';

function* fetchNewQuestions(action) {
  try {
    yield put(setIsLoading(!action.payload.offset));
    const {
      data: { questions, count },
    } = yield questionService.getNewQuestions(action.payload.offset);
    yield put(setNewQuestions(questions, action.payload.offsets, action.payload.force));
    yield put(setNewQuestionsCount(count));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide new questions right now for you.',
      })
    );
  }
}

export default function* newQuestionsSaga() {
  yield all([takeEvery(types.FETCH_NEW_QUESTIONS, fetchNewQuestions)]);
}
