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
  
  const UpdatedProfile = user => {
    return {
      type: actionType.UTILS.RESPONSE_RECEVIED,
      payload: user
    };
  };

  export const loginUser = (user) => async(dispatch) => {
    dispatch(receiveLogin(user));
  };


  export const RegisterUser = (user) => async(dispatch) => {
    dispatch(receiveRegister(user));
  };
  
  export const UpdateProfilePic = (user) => async(dispatch) => {
    dispatch(UpdatedProfile(user));
  };

  export const UpdateProfile = user => async(dispatch) => {
    dispatch(UpdatedProfile(user));
  }

  export const logOutUser = ()=> {
    return {
      type: actionType.EXISTING_USER.SUCCESS,
    };
  };
  

  export const fetchUser = user => {
    return {
      type: actionType.UTILS.RESPONSE_RECEVIED,
      payload: user
    };
  };