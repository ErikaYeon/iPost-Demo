import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  APIError,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup, login } from "@/networking/authService";
import setAuthToken from "@/networking/api";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  loading: false,
  error: null,
};

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (userData: SignupRequest, { rejectWithValue }) => {
    try {
      await signup(userData);
      console.log("Successful sign up from slice.");
    } catch (error: APIError | any) {
      console.log("Error from signup slice."); // ToDo: remove this log after tests
      return rejectWithValue(error.message ?? "Error when sign up");
    }
  }
);

export const loginAsync = createAsyncThunk(
  "profile/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const loginResponse: LoginResponse = await login(credentials);
      console.log("Successful login.");
      await AsyncStorage.setItem("access_token", loginResponse.access_token);
      await AsyncStorage.setItem("refresh_token", loginResponse.refresh_token);
      setAuthToken(loginResponse.access_token);
      console.log("Token available in Axios.");
      return loginResponse;
    } catch (error: APIError | any) {
      console.log("Error from login slice."); // ToDo: remove this log after tests
      return rejectWithValue(error.message ?? "Error when login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
