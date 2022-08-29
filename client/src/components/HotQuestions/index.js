import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import {
  selectHotQuestions,
  selectHotQuestionsCount,
  selectIsLoading,
} from './modules/selectors';
import {
  fetchHotQuestions,
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
  questions: selectHotQuestions(state),
  count: selectHotQuestionsCount(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchHotQuestions,
      removeQuestion,
      removeAnswer,
      setQuestion,
      setAnswer,
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
