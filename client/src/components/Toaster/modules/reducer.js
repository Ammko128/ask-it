import { types } from './actions';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HIDE_TOAST: {
      return {
        items: state.items.filter((toast) => toast.id !== action.payload.id),
      };
    }
    case types.ADD_TOAST: {
      return {
        items: [...state.items, { ...action.payload.toast, id: uuidv4() }],
      };
    }
    default:
      return state;
  }
};

export default reducer;
