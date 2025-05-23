import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import createPostReducer from "./slices/createPostSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import timelineReducer from './slices/timelineSlice'
import adsReducer from './slices/adsSlice'
import commentsReducer from './slices/commentsSlice'
import searchReducer from "./slices/searchSlice";
import otherProfileReducer from "./slices/otherProfileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    createPost: createPostReducer,
    auth: authReducer,
    posts: postReducer,
    timeline: timelineReducer,
    ads: adsReducer,
    comments: commentsReducer,
    search: searchReducer,
    otherProfile: otherProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
