export const types = {
  FETCH_CURRENT_USER: 'FETCH_CURRENT_USER',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  FETCH_USER: 'FETCH_USER',
  SET_USER: 'SET_USER',
  SET_USER_QUESTIONS_COUNT: 'SET_USER_QUESTIONS_COUNT',
  SET_USER_QUESTIONS: 'SET_USER_QUESTIONS',
  FETCH_USER_QUESTIONS: 'FETCH_USER_QUESTIONS',
  SET_USER_QUESTION: 'SET_USER_QUESTION',
  SET_USER_ANSWER: 'SET_USER_ANSWER',
  REMOVE_USER_QUESTION: 'REMOVE_USER_QUESTION',
  REMOVE_USER_ANSWER: 'REMOVE_USER_ANSWER',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  READ_NOTIFICATIONS: 'READ_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  FETCH_NOTIFICATIONS: 'FETCH_NOTIFICATIONS',
  SET_USER_IS_LODAING: 'SET_USER_IS_LODAING',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_PASSWORD: 'UPDATE_USER_PASSWORD',
  FETCH_MESSAGES_COUNT: 'FETCH_MESSAGES_COUNT',
  SET_MESSAGES_COUNT: 'SET_MESSAGES_COUNT',
  FETCH_CONVERSATIONS: 'FETCH_CONVERSATIONS',
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  ADD_MESSAGES: 'ADD_MESSAGES',
  SEND_MESSAGE: 'SEND_MESSAGE',
  FETCH_MORE_MESSAGES: 'FETCH_MORE_MESSAGES',
  SET_CHAT_IS_LOADING: 'SET_CHAT_IS_LOADING',
  READ_MESSAGES: 'READ_MESSAGES',
};

export const fetchCurrentUser = () => ({
  type: types.FETCH_CURRENT_USER,
});

export const setCurrentUser = (currentUser) => ({
  type: types.SET_CURRENT_USER,
  payload: { currentUser },
});

export const fetchUser = (id) => ({
  type: types.FETCH_USER,
  payload: { id },
});

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: { user },
});

export const setUserQuestions = (questions) => ({
  type: types.SET_USER_QUESTIONS,
  payload: { questions },
});

export const setUserQuestionsCount = (userQuestionsCount) => ({
  type: types.SET_USER_QUESTIONS_COUNT,
  payload: { userQuestionsCount },
});

export const fetchUserQuestions = (id, offset, force = false) => ({
  type: types.FETCH_USER_QUESTIONS,
  payload: { id, offset, force },
});

export const setQuestion = (payload) => ({
  type: types.SET_USER_QUESTION,
  payload,
});

export const setAnswer = (payload) => ({
  type: types.SET_USER_ANSWER,
  payload,
});

export const removeQuestion = (payload) => ({
  type: types.REMOVE_USER_QUESTION,
  payload,
});

export const removeAnswer = (payload) => ({
  type: types.REMOVE_USER_ANSWER,
  payload,
});

export const fetchNotifications = () => ({
  type: types.FETCH_NOTIFICATIONS,
});

export const setNotifications = (notifications) => ({
  type: types.SET_NOTIFICATIONS,
  payload: { notifications },
});

export const addNotification = (notification) => ({
  type: types.ADD_NOTIFICATION,
  payload: { notification },
});

export const readNotifications = (notificationIds) => ({
  type: types.READ_NOTIFICATIONS,
  payload: { notificationIds },
});

export const setIsLoading = (isLoading) => ({
  type: types.SET_USER_IS_LODAING,
  payload: { isLoading },
});

export const updateUser = (firstName, lastName) => ({
  type: types.UPDATE_USER,
  payload: { firstName, lastName },
});

export const updateUserPassword = (newPassword, confirmPassword) => ({
  type: types.UPDATE_USER_PASSWORD,
  payload: { newPassword, confirmPassword },
});

export const fetchMessagesCount = () => ({
  type: types.FETCH_MESSAGES_COUNT,
});

export const fetchConversations = () => ({
  type: types.FETCH_CONVERSATIONS,
});

export const sendMessage = (receiverId, message, historyPush = false) => ({
  type: types.SEND_MESSAGE,
  payload: { receiverId, message, historyPush },
});

export const fetchMoreMessages = (conversationId, offset) => ({
  type: types.FETCH_MORE_MESSAGES,
  payload: { conversationId, offset },
});

export const setConversations = (conversations) => ({
  type: types.SET_CONVERSATIONS,
  payload: { conversations },
});

export const addMessages = (conversation, messages, position = 'top') => ({
  type: types.ADD_MESSAGES,
  payload: { conversation, messages, position },
});

export const setMessagesCount = (messagesCount) => ({
  type: types.SET_MESSAGES_COUNT,
  payload: { messagesCount },
});

export const setChatIsLoading = (isLoading) => ({
  type: types.SET_CHAT_IS_LOADING,
  payload: { isLoading },
});

export const readMessages = (conversationId) => ({
  type: types.READ_MESSAGES,
  payload: { conversationId },
});
