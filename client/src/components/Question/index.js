import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { selectIsLoading, selectQuestion } from './modules/selectors';
import {
  fetchQuestion,
  setUpdatedQuestion,
  setUpdatedAnswer,
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
  question: selectQuestion(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchQuestion,
      removeQuestion,
      removeAnswer,
      setUpdatedQuestion,
      setUpdatedAnswer,
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
