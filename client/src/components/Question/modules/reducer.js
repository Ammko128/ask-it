import normalizeState from '../../../utils/normalizeState';
import { types } from './actions';

const initialState = {
  item: {},
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUESTION: {
      return {
        ...state,
        item: {
          ...action.payload.question,
          answers: normalizeState(action.payload.question.answers),
        },
      };
    }
    case types.SET_UPDATED_QUESTION: {
      const { questionId, ...payload } = action.payload;
      return {
        ...state,
        item: { ...state.item, ...payload },
      };
    }
    case types.SET_UPDATED_ANSWER: {
      const { questionId, answerId, ...payload } = action.payload;
      return {
        ...state,
        item: {
          ...state.item,
          answers: {
            ...state.item.answers,
            [`normal-${answerId}`]: {
              ...(state.item.answers[`normal-${answerId}`] || {}),
              ...payload,
              questionId,
            },
          },
        },
      };
    }
    case types.REMOVE_ANSWER: {
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy.item.answers[`normal-${action.payload.answerId}`];
      return stateCopy;
    }
    case types.SET_QUESTION_IS_LOADING: {
      return { ...state, isLoading: action.payload.isLoading };
    }
    default:
      return state;
  }
};

export default reducer;
