import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import QuestionPreview from './components/QuestionPreview';
import './question.scss';

const Question = ({ question, actions, isLoading }) => {
  const { id } = useParams();
  useEffect(() => {
    actions.fetchQuestion(id);
  }, [id]);
  const handleQuestionUpvote = useCallback(
    (questionId, deleteUpvote) => () =>
      actions.upvoteQuestion(
        actions.setUpdatedQuestion,
        questionId,
        deleteUpvote
      ),
    [actions]
  );
  const handleQuestionDownvote = useCallback(
    (questionId, deleteDownvote) => () =>
      actions.downvoteQuestion(
        actions.setUpdatedQuestion,
        questionId,
        deleteDownvote
      ),
    [actions]
  );
  const handleAnswerDownvote = useCallback(
    (answerId, deleteDownvote) => () =>
      actions.downvoteAnswer(
        actions.setUpdatedAnswer,
        answerId,
        deleteDownvote
      ),
    [actions]
  );
  const handleAnswerUpvote = useCallback(
    (answerId, deleteUpvote) => () =>
      actions.upvoteAnswer(actions.setUpdatedAnswer, answerId, deleteUpvote),
    [actions]
  );
  const handleNewAnswer = useCallback(
    (questionId, content) =>
      actions.submitAnswer(actions.setUpdatedAnswer, questionId, content),
    [actions]
  );
  const handleAnswerUpdate = useCallback(
    (questionId, answerId, content) =>
      actions.updateAnswer(
        actions.setUpdatedAnswer,
        questionId,
        answerId,
        content
      ),
    [actions]
  );
  const handleQuestionDelete = useCallback(
    (questionId) => () =>
      actions.deleteQuestion(actions.removeQuestion, questionId),
    [actions]
  );
  const handleAnswerDelete = useCallback(
    (questionId, answerId) => () =>
      actions.deleteAnswer(actions.removeAnswer, questionId, answerId),
    [actions]
  );
  const handleQuestionUpdate = useCallback(
    (questionId, content) =>
      actions.updateQuestion(actions.setUpdatedQuestion, questionId, content),
    [actions]
  );
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div className="question-wrapper">
      {question?.id && (
        <QuestionPreview
          question={question}
          handleUpvote={handleQuestionUpvote}
          handleDownvote={handleQuestionDownvote}
          submitNewAnswer={handleNewAnswer}
          handleUpdate={handleQuestionUpdate}
          handleDelete={handleQuestionDelete}
          handleAnswerUpdate={handleAnswerUpdate}
          handleAnswerUpvote={handleAnswerUpvote}
          handleAnswerDownvote={handleAnswerDownvote}
          handleAnswerDelete={handleAnswerDelete}
        />
      )}
    </div>
  );
};

export default Question;
