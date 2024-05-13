import {
  ACCEPT_REQUEST_FAILURE,
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ADD_FOLLOWER_FAILURE,
  ADD_FOLLOWER_REQUEST,
  ADD_FOLLOWER_SUCCESS,
  ADD_FOLLOWING_FAILURE,
  ADD_FOLLOWING_REQUEST,
  ADD_FOLLOWING_SUCCESS,
  FOLLOWER_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWING_FAILURE,
  FOLLOWING_REQUEST,
  FOLLOWING_SUCCESS,
  PENDING_REQUESTS_FAILURE,
  PENDING_REQUESTS_REQUEST,
  PENDING_REQUESTS_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWING_FAILURE,
  REMOVE_FOLLOWING_REQUEST,
  REMOVE_FOLLOWING_SUCCESS,
} from "../actionTypes";

const initialState = {
  followers: [],
  following: [],
  pendingRequests: [],
  loading: false,
  error: null,
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOWER_REQUEST:
    case FOLLOWING_REQUEST:
    case PENDING_REQUESTS_REQUEST:
    case ADD_FOLLOWER_REQUEST:
    case REMOVE_FOLLOWER_REQUEST:
    case ADD_FOLLOWING_REQUEST:
    case REMOVE_FOLLOWING_REQUEST:
    case ACCEPT_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FOLLOWER_SUCCESS:
      return {
        ...state,
        followers: action.payload,
        loading: false,
      };
    case FOLLOWING_SUCCESS:
      return {
        ...state,
        following: action.payload,
        loading: false,
      };
    case PENDING_REQUESTS_SUCCESS:
      return {
        ...state,
        pendingRequests: action.payload,
        loading: false,
      };
    case ADD_FOLLOWER_SUCCESS:
      return {
        ...state,
        followers: [...state.followers, action.payload],
        loading: false,
      };
    case REMOVE_FOLLOWER_SUCCESS:
      return {
        ...state,
        followers: state.followers.filter(user => user.id !== action.payload),
        loading: false,
      };
    case ADD_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: [...state.following, action.payload],
        loading: false,
      };
    case REMOVE_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: state.following.filter(user => user.id !== action.payload),
        loading: false,
      };
    case ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(request => request.id !== action.payload),
        following: [...state.following, action.payload],
        loading: false,
      };
    case FOLLOWER_FAILURE:
    case FOLLOWING_FAILURE:
    case PENDING_REQUESTS_FAILURE:
    case ADD_FOLLOWER_FAILURE:
    case REMOVE_FOLLOWER_FAILURE:
    case ADD_FOLLOWING_FAILURE:
    case REMOVE_FOLLOWING_FAILURE:
    case ACCEPT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default followReducer;
