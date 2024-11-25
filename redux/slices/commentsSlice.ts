import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getComments, setComment } from "../../networking/commentService";
import { commentType1 } from "@/types/apiContracts";

interface CommentsState {
  comments: commentType1[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const fetchCommentsByPostId = createAsyncThunk<commentType1[], string>(
  "posts/getComments",
  async (postId: string, { rejectWithValue }) => {
    try {
      const comments = await getComments(postId);
      return comments;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching comments");
    }
  }
);

export const postComments = createAsyncThunk(
  "posts/setComment",
  async (
    {
      postId,
      authorId,
      comment,
    }: { postId: string; authorId: string; comment: string },
    { rejectWithValue }
  ) => {
    try {
      const commentResponse = await setComment(postId, authorId, comment);
      return commentResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error set comment");
    }
  }
);

// Slice de Redux Toolkit
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentToList(state, action) {
      state.comments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        // state.comments = action.payload;
        state.comments = action.payload.map((comment) => {
          return {
            ...comment,
          };
        });
        state.isLoading = false;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(postComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postComments.fulfilled, (state, action) => {
        state.isLoading = false;
        const comment = action.payload;
        state.comments.unshift(comment);
      })
      .addCase(postComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentsSlice.reducer;
export const { addCommentToList } = commentsSlice.actions;
