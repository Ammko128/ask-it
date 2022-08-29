export const selectCurrentUser = (state) => state.profile.currentUser;
export const selectUser = (state) => state.profile.user;
export const selectUserQuestionsCount = (state) =>
  state.profile.userQuestionsCount;
export const selectNotifications = (state) => state.profile.notifications;
export const selectIsLoading = (state) => state.profile.isLoading;
export const selectMessagesCount = (state) => state.profile.messagesCount;
export const selectConversations = (state) => state.profile.conversations;
export const selectChatIsLoading = (state) => state.profile.chatIsLoading;
