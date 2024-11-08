import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice'; 
import createPostReducer from './slices/createPostSlice';
import authReducer from './slices/authSlice'


const store = configureStore({
  reducer: {
    profile: profileReducer,
    createPost: createPostReducer,
    auth: authReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
