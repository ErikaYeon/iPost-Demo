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
  //lastFetch: Date;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  offset: 0,
  limit: APIConstants.LIST_LIMIT,
  //lastFetch: new Date(new Date().setDate(new Date().getDate() - 7)), // Fecha una semana antes de hoy ToDo: falta arreglar
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: { userId: string }, { getState }) => {
    const state = getState() as RootState;
    const { offset, limit } = state.posts;
    const { userId } = params;
    return await getPosts( userId, offset, limit);
  }
);


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost(state, action: PayloadAction<Post>) {
      const newPost = {
        ...action.payload,
        createdAt: new Date(action.payload.createdAt).toISOString(), // Asegura que `createdAt` sea una cadena en formato ISO
      };
      state.posts = [newPost, ...state.posts]; // Agregar el nuevo post al inicio
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toISOString(), // Asegúrate de que `createdAt` esté en formato de cadena
        }));
        state.hasMore = action.payload.length > 0;
        state.offset += APIConstants.LIST_LIMIT;
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
