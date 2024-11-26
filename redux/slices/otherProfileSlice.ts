// slices/otherProfileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserData, getUserPosts } from "@/networking/userService";
import { APIError, UserResponse, Post } from "@/types/apiContracts";

interface OtherProfileState {
  id: string;
  username: string;
  email: string;
  name: string;
  lastname: string;
  crown: string;
  profileImage: string | undefined;
  coverImage: string | undefined;
  description: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  loading: boolean;
  error: string | null;
  posts: Post[]; // Posts del usuario
}

const initialState: OtherProfileState = {
  id: "",
  username: "",
  email: "",
  name: "",
  lastname: "",
  crown: "grey",
  profileImage: undefined,
  coverImage: undefined,
  description: "",
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  loading: false,
  error: null,
  posts: [],
};

// Thunk para obtener datos del perfil de otro usuario
export const fetchOtherProfile = createAsyncThunk(
  "otherProfile/fetchOtherProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userData: UserResponse = await getUserData(userId);
      return userData;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error fetching user data");
    }
  }
);

export const fetchOtherProfilePosts = createAsyncThunk(
  "otherProfile/fetchOtherProfilePosts",
  async (
    { userId, offset, limit }: { userId: string; offset: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const posts: Post[] = await getUserPosts(userId, offset, limit);
      return posts;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error fetching user posts");
    }
  }
);

const otherProfileSlice = createSlice({
  name: "otherProfile",
  initialState,
  reducers: {
    clearOtherProfile: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherProfile.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.loading = false;
        const user = action.payload;
        state.id = user.id;
        state.username = user.username;
        state.email = user.email;
        state.name = user.name ?? "";
        state.lastname = user.lastname ?? "";
        state.crown = user.crown;
        state.profileImage = user.profileImage;
        state.coverImage = user.coverImage;
        state.description = user.description ?? "";
        state.followersCount = user.followersCount;
        state.followingCount = user.followingCount;
        state.postsCount = user.postsCount;
      })
      .addCase(fetchOtherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOtherProfilePosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOtherProfilePosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchOtherProfilePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOtherProfile } = otherProfileSlice.actions;
export default otherProfileSlice.reducer;