import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserShort } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import { searchProfiles } from "@/networking/userService"; // Suponiendo que existe un servicio para buscar usuarios

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

interface SearchState {
  results: UserShort[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: SearchState = {
  results: [],
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
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<UserShort[]>) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default searchSlice.reducer;
export const { clearSearchResults } = searchSlice.actions;
