import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, REQUEST_SENT } from '../actionTypes';

const createAction = (actionType) => ({
  request: () => ({ type: actionType.REQUEST }),
  success: (payload) => ({ type: actionType.SUCCESS, payload }),
  failure: (error) => ({ type: actionType.FAILURE, payload: error }),
});

// Action creators for login
export const login = createAction({
  REQUEST: LOGIN_REQUEST,
  SUCCESS: LOGIN_SUCCESS,
  FAILURE: LOGIN_FAILURE,
});

// Action creators for registration
export const register = createAction({
  REQUEST: REGISTER_REQUEST,
  SUCCESS: REGISTER_SUCCESS,
  FAILURE: REGISTER_FAILURE,
});

// Action creators for forgot password
export const forgotPassword = createAction({
  REQUEST: FORGOT_PASSWORD_REQUEST,
  SUCCESS: FORGOT_PASSWORD_SUCCESS,
  FAILURE: FORGOT_PASSWORD_FAILURE,
});

// Action creators for logout
export const logout = createAction({
  REQUEST: LOGOUT_REQUEST,
  SUCCESS: LOGOUT_SUCCESS,
  FAILURE: LOGOUT_FAILURE,
});

export const requestSent = () => ({ type: REQUEST_SENT });
