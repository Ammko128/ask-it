export const types = {
  FETCH_TOP_CONTRIBUTORS: 'FETCH_TOP_CONTRIBUTORS',
  SET_TOP_CONTRIBUTORS: 'SET_TOP_CONTRIBUTORS',
  SET_TOP_CONTRIBUTORS_IS_LOADING: 'SET_TOP_CONTRIBUTORS_IS_LOADING',
};

export const fetchTopContributors = () => ({
  type: types.FETCH_TOP_CONTRIBUTORS,
});

export const setTopContributors = (users) => ({
  type: types.SET_TOP_CONTRIBUTORS,
  payload: { users },
});

export const setIsLoading = (isLoading) => ({
  type: types.SET_TOP_CONTRIBUTORS_IS_LOADING,
  payload: { isLoading },
});
