import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import followReducer from './reducers/followReducer';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    follow: followReducer
  },
});
