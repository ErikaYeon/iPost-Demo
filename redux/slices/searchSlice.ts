import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserShort } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import { searchProfiles } from "@/networking/userService";
import {
  getFollowersUser,
  getFollowingsUser,
} from "@/networking/FollowsService";
import { isEmpty } from "@/utils/RegexExpressions";

// Thunk asincrónico para realizar la búsqueda de usuarios
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query: string) => {
    const results = await searchProfiles(query);
    return results.map((user: UserShort) => ({
      ...user,
      profileImage: user.profileImage || Placeholders.DEFAULT_PROFILE_PHOTO, // Usa el placeholder si no hay imagen
    }));
  }
);
export const fetchFollowingsUser = createAsyncThunk(
  "follows/getFollowingsUser",
  async (userId: string) => {
    const results = await getFollowingsUser(userId);
    return results.map((user: UserShort) => ({
      ...user,
      profileImage: isEmpty(user.profileImage)
        ? Placeholders.DEFAULT_PROFILE_PHOTO
        : user.profileImage,
    }));
  }
);
export const fetchFollowersUser = createAsyncThunk(
  "follows/getFollowersUser",
  async (userId: string) => {
    const results = await getFollowersUser(userId);
    return results.map((user: UserShort) => ({
      ...user,
      profileImage: isEmpty(user.profileImage)
        ? Placeholders.DEFAULT_PROFILE_PHOTO
        : user.profileImage,
    }));
  }
);

interface SearchState {
  results: UserShort[];
  followingsList: UserShort[];
  followersList: UserShort[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: SearchState = {
  results: [],
  followingsList: [],
  followersList: [],
  status: "idle",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<UserShort[]>) => {
          state.status = "succeeded";
          state.results = action.payload;
        }
      )
      .addCase(fetchSearchResults.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchFollowingsUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchFollowingsUser.fulfilled,
        (state, action: PayloadAction<UserShort[]>) => {
          state.status = "succeeded";
          state.followingsList = action.payload;
        }
      )
      .addCase(fetchFollowingsUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchFollowersUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchFollowersUser.fulfilled,
        (state, action: PayloadAction<UserShort[]>) => {
          state.status = "succeeded";
          state.followersList = action.payload;
        }
      )
      .addCase(fetchFollowersUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default searchSlice.reducer;
export const { clearSearchResults } = searchSlice.actions;
