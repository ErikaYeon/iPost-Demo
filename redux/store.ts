import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice'; 
import createPostReducer from './slices/createPostSlice';


const store = configureStore({
  reducer: {
    profile: profileReducer,
    createPost: createPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
