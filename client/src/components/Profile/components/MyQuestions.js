import React, { useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import QuestionPreview from '../../Question/components/QuestionPreview';

const MyQuestions = ({
  user,
  questionsCount,
  fetchMore,
  handleQuestionUpvote,
  handleQuestionDownvote,
  handleNewAnswer,
  handleQuestionUpdate,
  handleQuestionDelete,
  handleAnswerUpdate,
  handleAnswerUpvote,
  handleAnswerDownvote,
  handleAnswerDelete,
  isLoading,
}) => {
  const handleFetchMore = useCallback(() => {
    fetchMore(user.id, Object.values(user.questions).length);
  }, [fetchMore, user.id, user.questions]);
  const questionsPreview = useMemo(
    () =>
      user.questions
        ? Object.values(user.questions).map((question) => (
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
          ))
        : 'This user did not ask any questions yet.',
    [
      user.questions,
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
  return user.questions && !isLoading ? (
    <div className="my-questions-wrapper">
      {questionsPreview}
      {questionsCount > questionsPreview?.length && (
        <Button
          className="load-more-button"
          variant="primary"
          type="button"
          onClick={handleFetchMore}
        >
          <strong>Load more</strong>
        </Button>
      )}
    </div>
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default MyQuestions;
