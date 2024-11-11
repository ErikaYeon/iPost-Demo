import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "@/types/apiContracts"; // Definir el tipo de Post
import { getPosts } from "@/networking/postService";
import APIConstants from "@/constants/APIConstants";
import { RootState } from "@/redux/store";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  offset: number;
  limit: number;
  lastFetch: Date;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  offset: 0,
  limit: APIConstants.LIST_LIMIT,
  lastFetch: new Date(new Date().setDate(new Date().getDate() - 7)), // Fecha una semana antes de hoy ToDo: falta arreglar
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: { lastFetch: Date; userId: string }, { getState }) => {
    const state = getState() as RootState;
    const { offset, limit } = state.posts;
    const { lastFetch, userId } = params;
    return await getPosts(lastFetch, userId, offset, limit);
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
        state.lastFetch = new Date();
        state.hasMore = action.payload.length > 0;
        state.offset += APIConstants.LIST_LIMIT;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      });
  },
});

export default postSlice.reducer;
