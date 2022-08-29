export const types = {
  FETCH_QUESTION: 'FETCH_QUESTION',
  SET_QUESTION: 'SET_QUESTION',
  SET_UPDATED_QUESTION: 'SET_UPDATED_QUESTION',
  SET_UPDATED_ANSWER: 'SET_UPDATED_ANSWER',
  REMOVE_ANSWER: 'REMOVE_ANSWER',
  REMOVE_QUESTION: 'REMOVE_QUESTION',
  SET_QUESTION_IS_LOADING: 'SET_QUESTION_IS_LOADING',
};

export const fetchQuestion = (id) => ({
  type: types.FETCH_QUESTION,
  payload: { id },
});

export const setQuestion = (question) => ({
  type: types.SET_QUESTION,
  payload: { question },
});

export const setUpdatedQuestion = (payload) => ({
  type: types.SET_UPDATED_QUESTION,
  payload,
});

export const setUpdatedAnswer = (payload) => ({
  type: types.SET_UPDATED_ANSWER,
  payload,
});

export const removeQuestion = (payload) => ({
  type: types.REMOVE_QUESTION,
  payload,
});

export const removeAnswer = (payload) => ({
  type: types.REMOVE_ANSWER,
  payload,
});

export const setIsLoading = (isLoading) => ({
  type: types.SET_QUESTION_IS_LOADING,
  payload: { isLoading },
});
