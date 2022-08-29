import React, { useEffect, useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import QuestionPreview from '../Question/components/QuestionPreview';

const HotQuestions = ({ questions, count, actions, isLoading }) => {
  const fetch = useCallback(
    (force = false) =>
      actions.fetchHotQuestions(
        force === true ? 0 : questions.length,
        force === true
      ),
    [questions, actions]
  );
  useEffect(() => {
    fetch(true);
  }, []);
  const handleQuestionUpvote = useCallback(
    (questionId, deleteUpvote) => () =>
      actions.upvoteQuestion(actions.setQuestion, questionId, deleteUpvote),
    [actions]
  );
  const handleQuestionDownvote = useCallback(
    (questionId, deleteDownvote) => () =>
      actions.downvoteQuestion(actions.setQuestion, questionId, deleteDownvote),
    [actions]
  );
  const handleAnswerDownvote = useCallback(
    (answerId, deleteDownvote) => () =>
      actions.downvoteAnswer(actions.setAnswer, answerId, deleteDownvote),
    [actions]
  );
  const handleAnswerUpvote = useCallback(
    (answerId, deleteUpvote) => () =>
      actions.upvoteAnswer(actions.setAnswer, answerId, deleteUpvote),
    [actions]
  );
  const handleNewAnswer = useCallback(
    (questionId, content) =>
      actions.submitAnswer(actions.setAnswer, questionId, content),
    [actions]
  );
  const handleAnswerUpdate = useCallback(
    (questionId, answerId, content) =>
      actions.updateAnswer(actions.setAnswer, questionId, answerId, content),
    [actions]
  );
  const handleQuestionUpdate = useCallback(
    (questionId, content) =>
      actions.updateQuestion(actions.setQuestion, questionId, content),
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
  const questionsPreview = useMemo(
    () =>
      questions.map((question) => (
        <QuestionPreview
          key={question.id}
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
      )),
    [
      questions,
      handleAnswerDownvote,
      handleAnswerUpdate,
      handleAnswerUpvote,
      handleQuestionDownvote,
      handleQuestionUpvote,
      handleQuestionUpdate,
      handleNewAnswer,
      handleQuestionDelete,
      handleAnswerDelete,
    ]
  );
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div>
      {questionsPreview}
      {count > questions.length && (
        <Button
          className="load-more-button"
          variant="primary"
          type="button"
          onClick={fetch}
        >
          <strong>Load more</strong>
        </Button>
      )}
    </div>
  );
};

export default HotQuestions;
