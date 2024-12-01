import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Placeholders from "@/constants/ProfilePlaceholders";
import {
  getUserData,
  getUserSettings,
  setUserSettings,
  setProfileImage,
  setUserData,
  getUserPosts,
  getUserFavorites,
} from "@/networking/userService";
import {
  APIError,
  Gender,
  LoginResponse,
  UserResponse,
  UserSettingsResponse,
  ProfileImageRequest,
  ProfileUpdateRequest,
  Post,
} from "@/types/apiContracts";
import { Crown } from "@/types/models";
import { levelToCrown } from "@/types/mappers";
import { RootState } from "../store";

interface ProfileState {
  id: string;
  username: string;
  email: string;
  name: string;
  lastname: string;
  crown: Crown;
  profileImage: string | undefined;
  coverImage: string | undefined;
  description: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  active: boolean;
  gender: Gender;
  loading: boolean;
  error: string | null;
  theme: string;
  language: string;
  posts: Post[];
  favorites: Post[];
}

const initialState: ProfileState = {
  id: "",
  username: "",
  email: "",
  name: "",
  lastname: "",
  crown: Crown.GREY,
  profileImage: Placeholders.DEFAULT_PROFILE_PHOTO,
  coverImage: Placeholders.DEFAULT_PROFILE_PHOTO_COVER,
  description: "",
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  active: false,
  gender: Gender.MEN,
  loading: false,
  error: null,
  theme: "dark",
  language: "Español",
  posts: [],
  favorites: [],
};

export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userData: UserResponse = await getUserData(userId);
      console.log("relleno usser data");
      return userData;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error fetching user data");
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "profile/fetchUserPosts",
  async (userId: string) => {
    return await getUserPosts(userId);
  }
);

export const getUserSettingsAsync = createAsyncThunk(
  "profile/getUserSettingsAsync",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userSettings: UserSettingsResponse = await getUserSettings(userId);
      return userSettings;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error fetching user settings");
    }
  }
);
export const setUserSettingsAsync = createAsyncThunk<
  number,
  { userId: string; userSettings: UserSettingsResponse },
  { rejectValue: string }
>(
  "profile/setUserSettingsAsync",
  async (
    {
      userId,
      userSettings,
    }: { userId: string; userSettings: UserSettingsResponse },
    { rejectWithValue }
  ) => {
    try {
      const response = await setUserSettings(userId, userSettings);
      return response;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error fetching user settings");
    }
  }
);
export const updateProfileImageAsync = createAsyncThunk<
  UserResponse, // Tipo de retorno en caso de éxito
  { userId: string; profileImageData: ProfileImageRequest }, // Argumentos esperados
  { rejectValue: string } // Tipo del valor de rechazo
>(
  "profile/updateProfileImage",
  async ({ userId, profileImageData }, { rejectWithValue }) => {
    try {
      const updatedUser: UserResponse = await setProfileImage(
        userId,
        profileImageData
      );
      console.log("Actualización de imagen exitosa");
      return updatedUser;
    } catch (error: any) {
      console.error("Error al actualizar la imagen del perfil", error);
      return rejectWithValue(
        error.message ?? "Error desconocido al actualizar la imagen"
      );
    }
  }
);
export const updateProfileDataAsync = createAsyncThunk<
  UserResponse, // Tipo de retorno en caso de éxito
  { userId: string; profileData: ProfileUpdateRequest }, // Argumentos esperados
  { rejectValue: string } // Tipo del valor de rechazo
>(
  "profile/updateProfileData",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const updatedUser: UserResponse = await setUserData(userId, profileData);
      console.log("Actualización de datos de perfil exitosa");
      return updatedUser;
    } catch (error: any) {
      console.error("Error al actualizar los datos del perfil", error);
      return rejectWithValue(
        error.message ?? "Error desconocido al actualizar los datos del perfil"
      );
    }
  }
);
export const fetchUserFavorites = createAsyncThunk(
  "favorites/fetchUserFavorites",
  async (userId: string, { rejectWithValue }) => {
    try {
      const favorites = await getUserFavorites(userId);
      return favorites;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener favoritos");
    }
  }
);

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
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
      state.theme = "dark";
      state.language = "Español";
    },
    updateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setProfileData: (state, action: PayloadAction<ProfileUpdateRequest>) => {
      const ProfileData = action.payload;
      state.name = ProfileData.name;
      state.username = ProfileData.username;
      state.lastname = ProfileData.lastname;
      state.description = ProfileData.description;
      state.gender = ProfileData.gender;
    },
    setProfileCover: (state, action: PayloadAction<string>) => {
      state.coverImage = action.payload;
    },
    setProifilePhoto: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
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
          state.name = user.name ?? "";
          state.lastname = user.lastname ?? "";
          state.crown = levelToCrown(user.level);
          state.profileImage = user.profileImage;
          state.coverImage = user.coverImage;
          state.description = user.description ?? "";
          state.followersCount = user.followersCount;
          state.followingCount = user.followingCount;
          state.postsCount = user.postsCount;
          state.active = user.active;
          state.gender = user.gender ?? "";
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserSettingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSettingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        getUserSettingsAsync.fulfilled,
        (state, action: PayloadAction<UserSettingsResponse>) => {
          console.log(action.payload.theme);
          state.theme = action.payload.theme === "DARK" ? "dark" : "light";
          state.language =
            action.payload.language === "SPANISH" ? "Español" : "Inglés";
        }
      )
      .addCase(setUserSettingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setUserSettingsAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.error = null;
          console.log(
            "Configuración actualizada con éxito. Status:",
            action.payload
          );
        }
      )
      .addCase(setUserSettingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
        console.error("Error al actualizar configuración:", state.error);
      })
      .addCase(updateProfileImageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.profileImage = updatedUser.profileImage;
        state.coverImage = updatedUser.coverImage;
        console.log("Imagen de perfil actualizada correctamente");
      })
      .addCase(updateProfileImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "Error desconocido al actualizar la imagen";
        console.error("Error al actualizar la imagen del perfil:", state.error);
      })
      .addCase(updateProfileDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.username = updatedUser.username;
        state.name = updatedUser.name;
        state.lastname = updatedUser.lastname;
        state.description = updatedUser.description;
        state.gender = updatedUser.gender;
      })
      .addCase(updateProfileDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          "Error desconocido al actualizar los datos del perfil";
        console.error("Error al actualizar los datos del perfil:", state.error);
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.error = action.error.message ?? "Error al obtener los posts";
        state.loading = false;
      })
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserFavorites.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.favorites = action.payload;
        }
      )
      .addCase(fetchUserFavorites.rejected, (state, action) => {
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
  updateLanguage,
  updateTheme,
  setProfileCover,
  setProifilePhoto,
  setProfileData,
  setProfileUserId,
} = profileSlice.actions;

export const selectProfile = (state: RootState) => state;
