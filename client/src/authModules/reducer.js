import { types } from './actions';

const initialState = {
  emailVerified: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SET_EMAIL_VERIFIED: {
      return { emailVerified: action.payload.emailVerified };
    }
    default:
      return state;
  }
};

export default reducer;
