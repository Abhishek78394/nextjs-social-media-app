import { 
  FETCH_PROFILE_REQUEST, 
  FETCH_PROFILE_SUCCESS, 
  FETCH_PROFILE_FAILURE, 
  UPDATE_PROFILE_REQUEST, 
  UPDATE_PROFILE_SUCCESS, 
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE
} from '../actionTypes';

const createAction = (actionType) => ({
  request: () => ({ type: actionType.REQUEST }),
  success: (payload) => ({ type: actionType.SUCCESS, payload }),
  failure: (error) => ({ type: actionType.FAILURE, payload: error }),
});

// Action creators for fetch profile
export const fetchProfile = createAction({
  REQUEST: FETCH_PROFILE_REQUEST,
  SUCCESS: FETCH_PROFILE_SUCCESS,
  FAILURE: FETCH_PROFILE_FAILURE,
});

// Action creators for updateProfile
export const updateProfile = createAction({
  REQUEST: UPDATE_PROFILE_REQUEST,
  SUCCESS: UPDATE_PROFILE_SUCCESS,
  FAILURE: UPDATE_PROFILE_FAILURE,
});

// Action creators for updateProfilePic
export const updateProfilePic = createAction({
  REQUEST: UPDATE_PROFILE_PICTURE_REQUEST,
  SUCCESS: UPDATE_PROFILE_PICTURE_SUCCESS,
  FAILURE: UPDATE_PROFILE_PICTURE_FAILURE,
});