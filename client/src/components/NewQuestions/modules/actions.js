export const types = {
  FETCH_NEW_QUESTIONS: 'FETCH_NEW_QUESTIONS',
  SET_NEW_QUESTIONS: 'SET_NEW_QUESTIONS',
  SET_NEW_QUESTIONS_COUNT: 'SET_NEW_QUESTIONS_COUNT',
  SET_NEW_QUESTION: 'SET_NEW_QUESTION',
  SET_NEW_ANSWER: 'SET_NEW_ANSWER',
  REMOVE_NEW_QUESTION: 'REMOVE_NEW_QUESTION',
  REMOVE_NEW_ANSWER: 'REMOVE_NEW_ANSWER',
  SET_NEW_IS_LOADING: 'SET_NEW_IS_LOADING',
};

export const fetchNewQuestions = (offset, force = false) => ({
  type: types.FETCH_NEW_QUESTIONS,
  payload: { offset, force },
});

export const setNewQuestions = (questions, offset, force = false) => ({
  type: types.SET_NEW_QUESTIONS,
  payload: { questions, offset, force },
});

export const setNewQuestionsCount = (count) => ({
  type: types.SET_NEW_QUESTIONS_COUNT,
  payload: { count },
});

export const setQuestion = (payload) => ({
  type: types.SET_NEW_QUESTION,
  payload,
});

export const setAnswer = (payload) => ({
  type: types.SET_NEW_ANSWER,
  payload,
});

export const removeQuestion = (payload) => ({
  type: types.REMOVE_NEW_QUESTION,
  payload,
});

export const removeAnswer = (payload) => ({
  type: types.REMOVE_NEW_ANSWER,
  payload,
});

export const setIsLoading = (isLoading) => ({
  type: types.SET_NEW_IS_LOADING,
  payload: { isLoading },
});
