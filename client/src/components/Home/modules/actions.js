export const types = {
  SUBMIT_QUESTION: 'SUBMIT_QUESTION',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  UPVOTE_ANSWER: 'UPVOTE_ANSWER',
  DOWNVOTE_ANSWER: 'DOWNVOTE_ANSWER',
  UPVOTE_QUESTION: 'UPVOTE_QUESTION',
  DOWNVOTE_QUESTION: 'DOWNVOTE_QUESTION',
  UPDATE_ANSWER: 'UPDATE_ANSWER',
  UPDATE_QUESTION: 'UPDATE_QUESTION',
  DELETE_QUESTION: 'DELETE_QUESTION',
  DELETE_ANSWER: 'DELETE_ANSWER',
};

export const submitQuestion = (content) => ({
  type: types.SUBMIT_QUESTION,
  payload: { content },
});

export const submitAnswer = (resolver, questionId, content) => ({
  type: types.SUBMIT_ANSWER,
  payload: { resolver, questionId, content },
});

export const upvoteAnswer = (resolver, answerId, deleteUpvote = false) => ({
  type: types.UPVOTE_ANSWER,
  payload: { resolver, answerId, deleteUpvote },
});

export const downvoteAnswer = (resolver, answerId, deleteDownvote = false) => ({
  type: types.DOWNVOTE_ANSWER,
  payload: { resolver, answerId, deleteDownvote },
});

export const upvoteQuestion = (resolver, questionId, deleteUpvote = false) => ({
  type: types.UPVOTE_QUESTION,
  payload: { resolver, questionId, deleteUpvote },
});

export const downvoteQuestion = (
  resolver,
  questionId,
  deleteDownvote = false
) => ({
  type: types.DOWNVOTE_QUESTION,
  payload: { resolver, questionId, deleteDownvote },
});

export const updateQuestion = (resolver, questionId, content) => ({
  type: types.UPDATE_QUESTION,
  payload: { resolver, questionId, content },
});

export const updateAnswer = (resolver, questionId, answerId, content) => ({
  type: types.UPDATE_ANSWER,
  payload: { resolver, questionId, answerId, content },
});

export const deleteQuestion = (resolver, questionId) => ({
  type: types.DELETE_QUESTION,
  payload: { resolver, questionId },
});

export const deleteAnswer = (resolver, questionId, answerId) => ({
  type: types.DELETE_ANSWER,
  payload: { resolver, questionId, answerId },
});
