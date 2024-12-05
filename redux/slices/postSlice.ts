import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/types/apiContracts"; // Definir el tipo de Post
import {
  getPosts,
  unfavoritePost,
  favoritePost,
} from "@/networking/postService";
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
    console.log(
      "offset" +
        state.posts.offset +
        "limit" +
        state.posts.limit +
        "time" +
        state.posts.time
    );
    state.posts.offset = 0;
    const { offset, limit, time } = state.posts;
    const { userId, isRefreshing } = params;
    if (isRefreshing) {
      return await getPosts(userId, 0, limit, time);
    } else {
      return await getPosts(userId, offset, limit);
    }
  }
);
export const favoritePostAsync = createAsyncThunk(
  "posts/favoritePost",
  async (
    { postId, userId }: { postId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      await favoritePost(postId, userId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Acción para eliminar un post de favoritos
export const unfavoritePostAsync = createAsyncThunk(
  "posts/unfavoritePost",
  async (
    { postId, userId }: { postId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      await unfavoritePost(postId, userId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
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
    clearPosts: (state) => {
      (state.posts = []), (state.offset = 0);
    },
    UpdateTime(state, action) {
      state.time = action.payload;
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
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toISOString(),
          isAd: false,
        }));
        state.hasMore = action.payload.length > 0;
        state.offset += APIConstants.LIST_LIMIT;
        state.time =
          state.posts.length > 0
            ? state.posts[state.posts.length - 1].createdAt
            : new Date().toISOString();
        console.log(action.payload);
        console.log(state.posts);
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch posts";
      })
      .addCase(favoritePostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(favoritePostAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(favoritePostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(unfavoritePostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfavoritePostAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unfavoritePostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exporta la nueva acción
export const { addNewPost, clearPosts, UpdateTime } = postSlice.actions;

export default postSlice.reducer;
