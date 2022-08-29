export const types = {
  HIDE_TOAST: 'HIDE_TOAST',
  ADD_TOAST: 'ADD_TOAST',
};

export const hideToast = (id) => ({
  type: types.HIDE_TOAST,
  payload: { id },
});

export const addToast = (toast) => ({
  type: types.ADD_TOAST,
  payload: { toast },
});
