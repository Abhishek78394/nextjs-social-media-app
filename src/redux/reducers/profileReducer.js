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

const initialState = {
  isLoading: false,
  profileData: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileData: action.payload,
        error: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileData: action.payload,
        error: null,
      };
    case UPDATE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileData: {
          ...state.profileData,
          avatar: action.payload.avatar,
        },
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
    case UPDATE_PROFILE_FAILURE:
    case UPDATE_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        isLoading: false,
        profileData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
