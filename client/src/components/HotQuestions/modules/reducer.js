import normalizeState from '../../../utils/normalizeState';
import { types } from './actions';

const initialState = {
  questions: {},
  count: 0,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_HOT_QUESTIONS: {
      const { offset, force } = action.payload;
      if (
        !force &&
        ((!offset && state.questions.length > 0) ||
          (offset && offset !== state.questions.length))
      )
        return state;
      return {
        ...state,
        questions: !force
          ? {
              ...state.questions,
              ...normalizeState(action.payload.questions, 'answers'),
            }
          : normalizeState(action.payload.questions, 'answers'),
      };
    }
    case types.SET_HOT_QUESTIONS_COUNT: {
      return { ...state, count: action.payload.count };
    }
    case types.SET_HOT_QUESTION: {
      const { questionId, ...payload } = action.payload;
      return {
        ...state,
        questions: {
          ...state.questions,
          [`normal-${questionId}`]: {
            ...state.questions[`normal-${questionId}`],
            ...payload,
          },
        },
      };
    }
    case types.SET_HOT_ANSWER: {
      const { questionId, answerId, ...payload } = action.payload;
      return {
        ...state,
        questions: {
          ...state.questions,
          [`normal-${questionId}`]: {
            ...state.questions[`normal-${questionId}`],
            answers: {
              ...state.questions[`normal-${questionId}`].answers,
              [`normal-${answerId}`]: {
                ...(state.questions[`normal-${questionId}`].answers[
                  `normal-${answerId}`
                ] || {}),
                ...payload,
                questionId,
              },
            },
          },
        },
      };
    }
    case types.REMOVE_HOT_ANSWER: {
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy.questions[`normal-${action.payload.questionId}`].answers[
        `normal-${action.payload.answerId}`
      ];
      return stateCopy;
    }
    case types.REMOVE_HOT_QUESTION: {
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy.questions[`normal-${action.payload.questionId}`];
      return stateCopy;
    }
    case types.SET_HOT_IS_LOADING: {
      return { ...state, isLoading: action.payload.isLoading };
    }
    default:
      return state;
  }
};

export default reducer;
