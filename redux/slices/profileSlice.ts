import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../networking/api";
import Placeholders from "@/constants/ProfilePlaceholders";

interface ProfileState {
  email: string;
  password: string;
  username: string;
  name: string;
  lastname: string;
  profilePictureUrl: string;
  isVip: boolean;
  crownType: string;
  access_token?: string;
  refresh_token?: string;
  id?: string;
}

interface PartialProfileState {
  email: string;
  password: string;
  username: string;
}

const initialState: ProfileState = {
  email: "",
  username: "",
  password: "",
  name: "Ipost",
  lastname: "Ipost",
  profilePictureUrl: Placeholders.DEFAULT_PROFILE_PHOTO,
  isVip: true,
  crownType: "grey",
};

// Thunk para el signup
// export const signup = createAsyncThunk(
//   'profile/signup',
//   async (userData, { rejectWithValue }) => {
//     try {
//       console.log(userData)
//       const response = await api.post('/api/accounts/signup', userData);

//       // Verifica si la respuesta es exitosa
//       // console.log(JSON.stringify(response,null,4))
//       if (response.status === 200) {
//         console.log(response.status)
//         console.log(response.data)
//         console.log('llamada bien')
//         return response.data

//       } else {
//         console.log('llamada mal')

//       }
//     } catch (error) {

//       return
//       rejectWithValue(
//         error
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'profile/loginUser',
//   async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/api/accounts/login', { email, password });
//       console.log(response.data)
//       return response.data as LoginResponse;
//     } catch (error: any) {
//       console.log(error)
//       return rejectWithValue('Algo salió mal, inténtelo nuevamente');
//     }
//   }
// );
export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      console.log("funciona fetch data");
      console.log(response.data);

      return response.data; // Return the response data
    } catch (error: any) {
      console.error("Fetch user info failed:", error);
      return rejectWithValue("Failed to fetch user info");
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<PartialProfileState>) => {
      const { email, password, username } = action.payload;
      state.email = email;
      state.password = password;
      state.username = username; //A CHECKEAR SI ESTO VA ACA
    },
    setProfileExtraData: (state, action: PayloadAction<ProfileState>) => {
      const { username, name, profilePictureUrl, isVip, crownType } =
        action.payload; //ACA EN EL FETCH VOY A AGREGAR FOTO,ISVIP Y LA CORONA
      state.username = username;
      state.name = name;
      // state.profilePictureUrl = profilePictureUrl;
      state.isVip = isVip;
      state.crownType = crownType;
    },
    clearProfile: (state) => {
      state.email = "";
      state.username = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(signup.fulfilled, (state, action) => {
      //   const { email, username, name, lastname } = action.payload;
      //   state.email = email;
      //   state.username = username;
      //   state.name = name;
      //   state.lastname = lastname;
      // })
      // .addCase(signup.rejected, (state, action) => {
      //   console.error('Signup failed:', action.payload);
      // })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   const { id, access_token, refresh_token } = action.payload;
      //   state.access_token = access_token;
      //   state.refresh_token = refresh_token;
      //   state.id = id;
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   console.error('Login failed:', action.payload);
      // })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const { username, email, name, lastname, profileImage } =
          action.payload;
        state.username = username;
        state.email = email;
        state.name = name;
        state.lastname = lastname;
        state.profilePictureUrl = profileImage || state.profilePictureUrl; // Fallback to default if null
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        console.error("Fetch user info failed:", action.payload);
      });
  },
});

// Exportar las acciones
export const { setProfile, clearProfile } = profileSlice.actions;

// Exportar el reducer
export default profileSlice.reducer;
