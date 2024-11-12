// createPostSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addPost } from "@/networking/postService";
import { APIError, CreatePostRequest, Post } from "@/types/apiContracts";

interface CreatePostState {
  postContent: string;
  selectedImages: string[];
  location: string;
  date: string;
  loading: boolean;
  error: string | null;
}

const initialState: CreatePostState = {
  postContent: '',
  selectedImages: [],
  location: '',
  date: '',
  loading: false,
  error: null,
};

export const createPostAsync = createAsyncThunk(
  "createPost/add",
  async (postData: CreatePostRequest, { rejectWithValue }) => {
    try {
      const post = await addPost(postData);
      return post;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error creating post");
    }
  }
);

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    setPostContent(state, action: PayloadAction<string>) {
      state.postContent = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setSelectedImages(state, action: PayloadAction<string[]>) {
      state.selectedImages = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    clearPost(state) {
      state.postContent = '';
      state.location = '';
      state.selectedImages = [];
      state.date = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPostContent, setLocation, setSelectedImages, setDate, clearPost } = createPostSlice.actions;

export default createPostSlice.reducer;