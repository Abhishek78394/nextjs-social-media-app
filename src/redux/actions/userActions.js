import { createAction } from './utils';
import { 
    FETCH_USER_REQUEST, 
    FETCH_USER_SUCCESS, 
    FETCH_USER_FAILURE, 
  } from '../actionTypes';
  

// Action creators for fetch profile
export const fetchUser = createAction({
    REQUEST: FETCH_USER_REQUEST,
    SUCCESS: FETCH_USER_SUCCESS,
    FAILURE: FETCH_USER_FAILURE,
  });