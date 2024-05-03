import { actionType } from "../actionTypes";


  const receiveLogin = user => {
    return {
      type: actionType.LOGIN.SUCCESS,
      payload: user
    };
  };
  const receiveRegister = user => {
    return {
      type: actionType.SIGN_UP.SUCCESS,
      payload: user
    };
  };
  

  export const loginUser = (user) => async(dispatch) => {
    dispatch(receiveLogin(user));
  };


  export const RegisterUser = (user) => async(dispatch) => {
    dispatch(receiveRegister(user));
  };