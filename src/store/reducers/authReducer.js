import { actionType } from "../actionTypes";

const initialState = {
  user: null,
  userToken: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.LOGIN.SUCCESS:
      return {
        ...state,
        user: action.payload,
        userToken: action.payload?.reset_token,
      };
    case actionType.SIGN_UP.SUCCESS:
      return {
        ...state,
        user: action.payload,
        userToken: action.payload?.reset_token,
      };
    case actionType.EXISTING_USER.SUCCESS:
      return {
        ...state,
        user: null,
      };
      case actionType.UTILS.RESPONSE_RECEVIED:
        return {
          ...state,
          user: action.payload,
        };
  
    default:
      return state;
  }
}

export default userReducer;
