import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import {
  selectIsLoading,
  selectNewQuestions,
  selectNewQuestionsCount,
} from './modules/selectors';
import {
  fetchNewQuestions,
  setQuestion,
  setAnswer,
  removeQuestion,
  removeAnswer,
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
  questions: selectNewQuestions(state),
  count: selectNewQuestionsCount(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchNewQuestions,
      setQuestion,
      setAnswer,
      removeQuestion,
      removeAnswer,
      submitAnswer,
      upvoteAnswer,
      upvoteQuestion,
      downvoteAnswer,
      downvoteQuestion,
      updateAnswer,
      updateQuestion,
      deleteQuestion,
      deleteAnswer,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
