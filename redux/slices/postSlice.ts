import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  time: string;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  offset: 0,
  limit: APIConstants.LIST_LIMIT,
  time: new Date().toISOString(),
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: { userId: string; isRefreshing: boolean }, { getState }) => {
    const state = getState() as RootState;
    const { offset, limit, time } = state.posts;
    const { userId, isRefreshing } = params;
    if (isRefreshing) {
      return await getPosts(userId, offset, limit, time);
    } else {
      return await getPosts(userId, offset, limit);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost(state, action: PayloadAction<Post>) {
      const newPost = {
        ...action.payload,
        createdAt: new Date(action.payload.createdAt).toISOString(),
      };
      state.posts = [newPost, ...state.posts];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = [];
        console.log(action.payload);
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toISOString(),
          isAd: false,
        }));
        state.hasMore = action.payload.length > 0;
        state.offset += APIConstants.LIST_LIMIT;
        state.time = new Date().toISOString();
        console.log("LOS POST QUE TRAJO" + state.posts.length);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      });
  },
});

// Exporta la nueva acción
export const { addNewPost } = postSlice.actions;

export default postSlice.reducer;
