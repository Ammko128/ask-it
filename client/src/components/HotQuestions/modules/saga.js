import { all, put, takeEvery } from 'redux-saga/effects';
import {
  types,
  setHotQuestionsCount,
  setHotQuestions,
  setIsLoading,
} from './actions';
import questionService from '../../../services/questionService';
import { addToast } from '../../Toaster/modules/actions';

function* fetchHotQuestions(action) {
  try {
    yield put(setIsLoading(!action.payload.offset));
    const {
      data: { questions, count },
    } = yield questionService.getHotQuestions(action.payload.offset);
    yield put(
      setHotQuestions(questions, action.payload.offset, action.payload.force)
    );
    yield put(setHotQuestionsCount(count));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide hot questions right now for you.',
      })
    );
  }
}

export default function* hotQuestionsSaga() {
  yield all([takeEvery(types.FETCH_HOT_QUESTIONS, fetchHotQuestions)]);
}
