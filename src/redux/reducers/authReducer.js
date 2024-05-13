import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_FAILURE, REQUEST_SENT } from '../actionTypes';

const initialState = {
  isLoggedIn: false,
  userData: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SENT:
    case REGISTER_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };
    case REGISTER_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        isLoggedIn: false,
        userData: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
