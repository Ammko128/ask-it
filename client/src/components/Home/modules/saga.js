import { all, put, takeEvery } from 'redux-saga/effects';
import { types } from './actions';
import questionService from '../../../services/questionService';
import localHistory from '../../../localHistory';
import { addToast } from '../../Toaster/modules/actions';

function* submitQuestion(action) {
  try {
    const {
      data: { id },
    } = yield questionService.submitQuestion(action.payload.content);
    localHistory.push(`/question/${id}`);
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try submitting a new question again in a couple of minutes.',
      })
    );
  }
}

function* submitAnswer(action) {
  try {
    const { questionId, content, resolver } = action.payload;
    const { data } = yield questionService.submitAnswer(questionId, content);
    yield put(resolver({ questionId, content, answerId: data.id, ...data }));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message:
          'Try submitting an answer for this question again in a couple of minutes.',
      })
    );
  }
}

function* upvoteAnswer(action) {
  try {
    const { questionId, answerId, deleteUpvote, resolver } = action.payload;
    const { data } = yield questionService.upvoteAnswer(answerId, deleteUpvote);
    yield put(
      resolver({
        questionId,
        answerId,
        currentUserUpvoted: !deleteUpvote,
        currentUserDownvoted: false,
        ...data,
      })
    );
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try upvoting this answer again in a couple of minutes.',
      })
    );
  }
}

function* downvoteAnswer(action) {
  try {
    const { questionId, answerId, deleteDownvote, resolver } = action.payload;
    const { data } = yield questionService.downvoteAnswer(
      answerId,
      deleteDownvote
    );
    yield put(
      resolver({
        questionId,
        answerId,
        currentUserDownvoted: !deleteDownvote,
        currentUserUpvoted: false,
        ...data,
      })
    );
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try downvoting this answer again in a couple of minutes.',
      })
    );
  }
}

function* upvoteQuestion(action) {
  try {
    const { questionId, deleteUpvote, resolver } = action.payload;
    const { data } = yield questionService.upvoteQuestion(
      questionId,
      deleteUpvote
    );
    yield put(
      resolver({
        questionId,
        currentUserUpvoted: !deleteUpvote,
        currentUserDownvoted: false,
        ...data,
      })
    );
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try upvoting this question again in a couple of minutes.',
      })
    );
  }
}

function* downvoteQuestion(action) {
  try {
    const { questionId, deleteDownvote, resolver } = action.payload;
    const { data } = yield questionService.downvoteQuestion(
      action.payload.questionId,
      action.payload.deleteDownvote
    );
    yield put(
      resolver({
        questionId,
        currentUserDownvoted: !deleteDownvote,
        currentUserUpvoted: false,
        ...data,
      })
    );
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try downvoting this question again in a couple of minutes.',
      })
    );
  }
}

function* updateAnswer(action) {
  try {
    const { questionId, answerId, resolver, content } = action.payload;
    yield questionService.updateAnswer(answerId, content);
    yield put(resolver({ questionId, content, answerId }));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try updating this answer again in a couple of minutes.',
      })
    );
  }
}

function* updateQuestion(action) {
  try {
    const { questionId, resolver, content } = action.payload;
    yield questionService.updateQuestion(questionId, content);
    yield put(resolver({ questionId, content }));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try updating this question again in a couple of minutes.',
      })
    );
  }
}

function* deleteAnswer(action) {
  try {
    const { questionId, answerId, resolver } = action.payload;
    yield questionService.deleteAnswer(answerId);
    yield put(resolver({ questionId, answerId }));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try deleting this answer again in a couple of minutes.',
      })
    );
  }
}

function* deleteQuestion(action) {
  try {
    const { questionId, resolver } = action.payload;
    yield questionService.deleteQuestion(questionId);
    yield put(resolver({ questionId }));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'Try deleting this question again in a couple of minutes.',
      })
    );
  }
}

export default function* homeSaga() {
  yield all([takeEvery(types.SUBMIT_QUESTION, submitQuestion)]);
  yield all([takeEvery(types.SUBMIT_ANSWER, submitAnswer)]);
  yield all([takeEvery(types.UPVOTE_ANSWER, upvoteAnswer)]);
  yield all([takeEvery(types.DOWNVOTE_ANSWER, downvoteAnswer)]);
  yield all([takeEvery(types.UPVOTE_QUESTION, upvoteQuestion)]);
  yield all([takeEvery(types.DOWNVOTE_QUESTION, downvoteQuestion)]);
  yield all([takeEvery(types.UPDATE_ANSWER, updateAnswer)]);
  yield all([takeEvery(types.UPDATE_QUESTION, updateQuestion)]);
  yield all([takeEvery(types.DELETE_ANSWER, deleteAnswer)]);
  yield all([takeEvery(types.DELETE_QUESTION, deleteQuestion)]);
}
