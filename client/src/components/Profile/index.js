import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import {
  selectCurrentUser,
  selectIsLoading,
  selectUser,
  selectUserQuestionsCount,
} from './modules/selectors';
import {
  fetchUser,
  fetchUserQuestions,
  setUserQuestions,
  setUserQuestionsCount,
  setAnswer,
  setQuestion,
  removeAnswer,
  removeQuestion,
  updateUser,
  updateUserPassword,
} from './modules/actions';
import {
  submitAnswer,
  upvoteAnswer,
  upvoteQuestion,
  downvoteAnswer,
  downvoteQuestion,
  updateAnswer,
  updateQuestion,
  deleteQuestion,
  deleteAnswer,
} from '../Home/modules/actions';

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  user: selectUser(state),
  questionsCount: selectUserQuestionsCount(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchUser,
      fetchUserQuestions,
      submitAnswer,
      upvoteAnswer,
      upvoteQuestion,
      downvoteAnswer,
      downvoteQuestion,
      updateAnswer,
      updateQuestion,
      deleteQuestion,
      deleteAnswer,
      setUserQuestions,
      setUserQuestionsCount,
      setAnswer,
      setQuestion,
      removeAnswer,
      removeQuestion,
      updateUser,
      updateUserPassword,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
