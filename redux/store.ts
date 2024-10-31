import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice'; 
import createPostReducer from './slices/createPostSlice';


const store = configureStore({
  reducer: {
    profile: profileReducer,
    createPost: createPostReducer,
  },
});

export default store;
