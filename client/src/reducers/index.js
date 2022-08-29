import { combineReducers } from 'redux';
import hotQuestionsReducer from '../components/HotQuestions/modules/reducer';
import newQuestionsReducer from '../components/NewQuestions/modules/reducer';
import topContributorsReducer from '../components/TopContributors/modules/reducer';
import questionReducer from '../components/Question/modules/reducer';
import profileReducer from '../components/Profile/modules/reducer';
import toastsReducer from '../components/Toaster/modules/reducer';
import authReducer from '../authModules/reducer';

export default combineReducers({
  hotQuestions: hotQuestionsReducer,
  newQuestions: newQuestionsReducer,
  topContributors: topContributorsReducer,
  question: questionReducer,
  profile: profileReducer,
  toasts: toastsReducer,
  auth: authReducer,
});
