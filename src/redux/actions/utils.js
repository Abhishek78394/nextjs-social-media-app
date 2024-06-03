
  export const createAction = (actionType) => ({
    request: () => ({ type: actionType.REQUEST }),
    success: (payload) => ({ type: actionType.SUCCESS, payload }),
    failure: (error) => ({ type: actionType.FAILURE, payload: error }),
  });