import { all, put, takeEvery } from 'redux-saga/effects';
import { types, setTopContributors, setIsLoading } from './actions';
import userService from '../../../services/userService';
import { addToast } from '../../Toaster/modules/actions';

function* fetchTopContributors() {
  try {
    yield put(setIsLoading(true));
    const { data: users } = yield userService.getTopContributors();
    yield put(setTopContributors(users));
    yield put(setIsLoading(false));
  } catch (e) {
    yield put(
      addToast({
        title: 'Something went wrong',
        message: 'We could not provide top contributors right now for you.',
      })
    );
  }
}

export default function* topContributorsSaga() {
  yield all([takeEvery(types.FETCH_TOP_CONTRIBUTORS, fetchTopContributors)]);
}
