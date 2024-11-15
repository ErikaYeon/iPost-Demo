import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Placeholders from "@/constants/ProfilePlaceholders";
import { getUserData } from "@/networking/userService";
import {
  APIError,
  Gender,
  LoginResponse,
  UserResponse,
} from "@/types/apiContracts";
import { Crown } from "@/types/models";
import { levelToCrown } from "@/types/mappers";
import { RootState } from "../store";

interface ProfileState {
  id: string;
  username: string | null;
  email: string;
  name: string | null;
  lastname: string | null;
  crown: Crown;
  profileImage: string | undefined;
  coverImage: string | null;
  description: string | null;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  active: boolean;
  gender: Gender | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  id: "",
  username: null,
  email: "",
  name: null,
  lastname: null,
  crown: Crown.GREY,
  profileImage: Placeholders.DEFAULT_PROFILE_PHOTO,
  coverImage: null,
  description: null,
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  active: false,
  gender: null,
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userData: UserResponse = await getUserData(userId);
      return userData;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error fetching user data");
    }
  }
);

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileEmail: (state, action: PayloadAction<{ email: string }>) => {
      const { email } = action.payload;
      state.email = email;
    },
    setProfileUsername: (
      state,
      action: PayloadAction<{ username: string }>
    ) => {
      const { username } = action.payload;
      state.username = username;
    },
    setProfileExtraData: (state, action: PayloadAction<LoginResponse>) => {
      const loginResponse: LoginResponse = action.payload;
      state.username = loginResponse.username;
      state.id = loginResponse.id;
      state.name = loginResponse.name;
      state.lastname = loginResponse.lastname;
      state.crown = levelToCrown(loginResponse.level);
      state.active = true;
    },
    clearProfile: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.name = "";
      state.lastname = "";
      state.crown = Crown.GREY;
      state.profileImage = "";
      state.coverImage = "";
      state.description = "";
      state.followersCount = 0;
      state.followingCount = 0;
      state.postsCount = 0;
      state.gender = 0;
      state.active = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loading = false;
          const user = action.payload;
          state.id = user.id;
          state.username = user.username;
          state.email = user.email;
          state.name = user.name;
          state.lastname = user.lastname;
          state.crown = levelToCrown(user.level);
          state.profileImage = user.profileImage;
          state.coverImage = user.coverImage;
          state.description = user.description;
          state.followersCount = user.followersCount;
          state.followingCount = user.followingCount;
          state.postsCount = user.postsCount;
          state.active = user.active;
          state.gender = user.gender;
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;

export const {
  setProfileEmail,
  setProfileExtraData,
  clearProfile,
  setProfileUsername,
} = profileSlice.actions;

export const selectProfile = (state: RootState) => state;
