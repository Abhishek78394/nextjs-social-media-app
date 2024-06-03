import { CHAT_FAILURE, CHAT_REQUEST, CHAT_SUCCESS, FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "../actionTypes";

const initialState = {
  messages: [],
  chat: null,
  loading: false,
  error: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_REQUEST:
    case SEND_MESSAGE_REQUEST:
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHAT_SUCCESS:
      return {
        ...state,
        chat: action.payload,
        loading: false,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages:  action.payload,
        loading: false,
      };
    case CHAT_FAILURE:
    case SEND_MESSAGE_FAILURE:
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;