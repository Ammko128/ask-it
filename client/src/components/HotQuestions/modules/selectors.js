export const selectHotQuestions = (state) =>
  Object.values(state.hotQuestions.questions);
export const selectHotQuestionsCount = (state) => state.hotQuestions.count;
export const selectIsLoading = (state) => state.hotQuestions.isLoading;
