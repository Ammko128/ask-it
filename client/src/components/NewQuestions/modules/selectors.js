export const selectNewQuestions = (state) =>
  Object.values(state.newQuestions.questions);
export const selectNewQuestionsCount = (state) => state.newQuestions.count;
export const selectIsLoading = (state) => state.newQuestions.isLoading;
