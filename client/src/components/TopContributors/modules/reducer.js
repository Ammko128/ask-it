import { types } from './actions';

const initialState = {
  users: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOP_CONTRIBUTORS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    case types.SET_TOP_CONTRIBUTORS_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    default:
      return state;
  }
};

export default reducer;
