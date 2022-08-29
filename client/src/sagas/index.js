import { all, spawn } from 'redux-saga/effects';
import authSaga from '../authModules/saga';
import hotQuestionsSaga from '../components/HotQuestions/modules/saga';
import newQuestionsSaga from '../components/NewQuestions/modules/saga';
import topContributorsSaga from '../components/TopContributors/modules/saga';
import questionSaga from '../components/Question/modules/saga';
import profileSaga from '../components/Profile/modules/saga';
import homeSaga from '../components/Home/modules/saga';
import socketSaga from './socketSaga';

const sagas = [
  authSaga,
  hotQuestionsSaga,
  newQuestionsSaga,
  topContributorsSaga,
  questionSaga,
  profileSaga,
  homeSaga,
  socketSaga,
];

export default function* rootSaga() {
  yield all(sagas.map(spawn));
}
