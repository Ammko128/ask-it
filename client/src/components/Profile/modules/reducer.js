import { types } from './actions';
import normalizeState from '../../../utils/normalizeState';

const initialState = {
  currentUser: {},
  user: {},
  userQuestionsCount: 0,
  notifications: [],
  isLoading: false,
  messagesCount: 0,
  conversations: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: {
      return { ...state, currentUser: action.payload.currentUser };
    }
    case types.SET_USER: {
      return { ...state, user: action.payload.user };
    }
    case types.SET_USER_QUESTIONS: {
      const { offset, force } = action.payload;
      if (
        !force &&
        ((!offset && state.user.questions?.length > 0) ||
          (offset && offset !== state.questions?.length))
      )
        return state;
      return {
        ...state,
        user: {
          ...state.user,
          questions: !force
            ? {
                ...state.user.questions,
                ...normalizeState(action.payload.questions, 'answers'),
              }
            : normalizeState(action.payload.questions, 'answers'),
        },
      };
    }
    case types.SET_USER_QUESTIONS_COUNT: {
      return {
        ...state,
        userQuestionsCount: action.payload.userQuestionsCount,
      };
    }
    case types.SET_USER_QUESTION: {
      const { questionId, ...payload } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          questions: {
            ...state.user.questions,
            [`normal-${questionId}`]: {
              ...state.user.questions[`normal-${questionId}`],
              ...payload,
            },
          },
        },
      };
    }
    case types.SET_USER_ANSWER: {
      const { questionId, answerId, ...payload } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          questions: {
            ...state.user.questions,
            [`normal-${questionId}`]: {
              ...state.user.questions[`normal-${questionId}`],
              answers: {
                ...state.user.questions[`normal-${questionId}`].answers,
                [`normal-${answerId}`]: {
                  ...(state.user.questions[`normal-${questionId}`].answers[
                    `normal-${answerId}`
                  ] || {}),
                  ...payload,
                  questionId,
                },
              },
            },
          },
        },
      };
    }
    case types.REMOVE_USER_ANSWER: {
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy.user.questions[`normal-${action.payload.questionId}`]
        .answers[`normal-${action.payload.answerId}`];
      return stateCopy;
    }
    case types.REMOVE_USER_QUESTION: {
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy.user.questions[`normal-${action.payload.questionId}`];
      return stateCopy;
    }
    case types.SET_NOTIFICATIONS: {
      return { ...state, notifications: action.payload.notifications };
    }
    case types.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [action.payload.notification, ...state.notifications],
      };
    }
    case types.SET_USER_IS_LODAING: {
      return { ...state, isLoading: action.payload.isLoading };
    }
    case types.SET_MESSAGES_COUNT: {
      return { ...state, messagesCount: action.payload.messagesCount };
    }
    case types.SET_CONVERSATIONS: {
      return {
        ...state,
        conversations: normalizeState(action.payload.conversations),
      };
    }
    case types.ADD_MESSAGES: {
      const { conversation, messages, position } = action.payload;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [`normal-${conversation.id}`]: state.conversations[
            `normal-${conversation.id}`
          ]
            ? {
                ...state.conversations[`normal-${conversation.id}`],
                messages:
                  position === 'top'
                    ? [
                        ...state.conversations[`normal-${conversation.id}`]
                          .messages,
                        ...messages,
                      ]
                    : [
                        ...messages,
                        ...state.conversations[`normal-${conversation.id}`]
                          .messages,
                      ],
              }
            : { ...conversation, messages },
        },
      };
    }
    case types.SET_CHAT_IS_LOADING: {
      return {
        ...state,
        chatIsLoading: action.payload.isLoading,
      };
    }
    default:
      return state;
  }
};

export default reducer;
