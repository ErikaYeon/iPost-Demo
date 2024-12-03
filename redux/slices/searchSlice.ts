import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserShort } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import { searchProfiles } from "@/networking/userService";
import {
  getFollowersUser,
  getFollowingsUser,
  followUser,
  unfollowUser,
} from "@/networking/FollowsService";
import { isEmpty } from "@/utils/RegexExpressions";
import APIConstants from "@/constants/APIConstants";
import { RootState } from "../store";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query: string) => {
    const results = await searchProfiles(query);
    return results.map((user: UserShort) => ({
      ...user,
      profileImage: user.profileImage || Placeholders.DEFAULT_PROFILE_PHOTO,
    }));
  }
);

export const fetchFollowingsUser = createAsyncThunk(
  "follows/getFollowingsUser",
  async (userId: string, { getState }) => {
    const state = getState() as RootState;
    const { offset, limit } = state.search;
    const results = await getFollowingsUser(userId, offset, limit);
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
  async (userId: string, { getState }) => {
    const state = getState() as RootState;
    const { offset, limit } = state.search;
    const results = await getFollowersUser(userId, offset, limit);
    return results.map((user: UserShort) => ({
      ...user,
      profileImage: isEmpty(user.profileImage)
        ? Placeholders.DEFAULT_PROFILE_PHOTO
        : user.profileImage,
    }));
  }
);

export const followUserThunk = createAsyncThunk<
  void,
  { userId: string; userToFollow: string },
  { rejectValue: string }
>(
  "follow/followUser",
  async ({ userId, userToFollow }, { rejectWithValue }) => {
    try {
      await followUser(userId, userToFollow);
    } catch (error) {
      console.error("Error al seguir usuario:", error);
      return rejectWithValue("No se pudo seguir al usuario.");
    }
  }
);

export const unfollowUserThunk = createAsyncThunk<
  void,
  { userId: string; userToUnfollow: string },
  { rejectValue: string }
>(
  "follow/unfollowUser",
  async ({ userId, userToUnfollow }, { rejectWithValue }) => {
    try {
      await unfollowUser(userId, userToUnfollow);
    } catch (error) {
      console.error("Error al dejar de seguir usuario:", error);
      return rejectWithValue("No se pudo dejar de seguir al usuario.");
    }
  }
);

interface SearchState {
  results: UserShort[];
  followingsList: UserShort[];
  followersList: UserShort[];
  status: "idle" | "loading" | "succeeded" | "failed";
  offset: number;
  limit: number;
  hasMoreFollowings: boolean;
  hasMoreFollowers: boolean;
}

const initialState: SearchState = {
  results: [],
  followingsList: [],
  followersList: [],
  status: "idle",
  offset: 0,
  limit: 13,
  hasMoreFollowings: true,
  hasMoreFollowers: true,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    clearFollowingList: (state) => {
      state.followingsList = [];
    },
    clearFollowersList: (state) => {
      state.followersList = [];
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
          state.followingsList.unshift(...action.payload);
          state.hasMoreFollowings = action.payload.length === state.limit;
          state.offset += action.payload.length;
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
          state.hasMoreFollowers = action.payload.length === state.limit;
          state.offset += action.payload.length;
        }
      )
      .addCase(fetchFollowersUser.rejected, (state) => {
        state.status = "failed";
      });
    builder.addCase(followUserThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(followUserThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(followUserThunk.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(unfollowUserThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(unfollowUserThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(unfollowUserThunk.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default searchSlice.reducer;
export const {
  clearSearchResults,
  setOffset,
  clearFollowingList,
  clearFollowersList,
} = searchSlice.actions;
