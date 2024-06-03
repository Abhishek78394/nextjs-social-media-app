import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import followReducer from './reducers/followReducer';
import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    follow: followReducer,
    user: userReducer,
    message: messageReducer,
  },
});
