export const types = {
  FETCH_HOT_QUESTIONS: 'FETCH_HOT_QUESTIONS',
  SET_HOT_QUESTIONS: 'SET_HOT_QUESTIONS',
  SET_HOT_QUESTIONS_COUNT: 'SET_HOT_QUESTIONS_COUNT',
  SET_HOT_QUESTION: 'SET_HOT_QUESTION',
  SET_HOT_ANSWER: 'SET_HOT_ANSWER',
  REMOVE_HOT_QUESTION: 'REMOVE_HOT_QUESTION',
  REMOVE_HOT_ANSWER: 'REMOVE_HOT_ANSWER',
  SET_HOT_IS_LOADING: 'SET_HOT_IS_LOADING',
};

export const fetchHotQuestions = (offset, force = false) => ({
  type: types.FETCH_HOT_QUESTIONS,
  payload: { offset, force },
});

export const setHotQuestions = (questions, offset, force = false) => ({
  type: types.SET_HOT_QUESTIONS,
  payload: { questions, offset, force },
});

export const setHotQuestionsCount = (count) => ({
  type: types.SET_HOT_QUESTIONS_COUNT,
  payload: { count },
});

export const setQuestion = (payload) => ({
  type: types.SET_HOT_QUESTION,
  payload,
});

export const setAnswer = (payload) => ({
  type: types.SET_HOT_ANSWER,
  payload,
});

export const removeQuestion = (payload) => ({
  type: types.REMOVE_HOT_QUESTION,
  payload,
});

export const removeAnswer = (payload) => ({
  type: types.REMOVE_HOT_ANSWER,
  payload,
});

export const setIsLoading = (isLoading) => ({
  type: types.SET_HOT_IS_LOADING,
  payload: { isLoading },
});
