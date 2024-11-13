import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  APIError,
  EmailType,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  RejectedPayload,
} from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup, login, resendEmail } from "@/networking/authService";
import api from "@/networking/api"; // Asegúrate de tener una instancia configurada de API para las solicitudes

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


// Thunk para el registro de usuario
export const signupAsync = createAsyncThunk<
  { message: string; status: number },
  SignupRequest,
  { rejectValue: RejectedPayload }
>(
  "auth/signup",
  async (userData: SignupRequest, { rejectWithValue }) => {
    try {
      const { status, message } = await signup(userData);
      if (status === 409 || status === 404) {
        return rejectWithValue({ message, status });
      }
      if (status !== 201) {
        return rejectWithValue({ message, status });
      }
      return { message, status };
    } catch (error: any) {
      return rejectWithValue({ message: error.message || "Error al registrar", status: 500 });
    }
  }
);

// Thunk para reenviar el email de verificación
export const resendEmailAsync = createAsyncThunk<
  { message: string; status: number },
  { email: string; emailType: EmailType },
  { rejectValue: RejectedPayload }
>(
  "auth/resendEmail",
  async (userData: { email: string; emailType: EmailType }, { rejectWithValue }) => {
    try {
      const responseStatus = await resendEmail(userData);
      if (responseStatus === 404) {
        return rejectWithValue({ message: "Email no encontrado", status: 404 });
      }
      if (responseStatus === 201) {
        return { message: "Email enviado con éxito", status: 201 };
      }
      throw new Error("Error desconocido al reenviar el email");
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error when resend email");
    }
  }
);

// Thunk para iniciar sesión
export const loginAsync = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const loginResponse: LoginResponse = await login(credentials);
      await AsyncStorage.setItem("access_token", loginResponse.access_token);
      await AsyncStorage.setItem("refresh_token", loginResponse.refresh_token);
      console.log("ACCESS TOKEN: ", loginResponse.access_token);
      console.log("REFRESH TOKEN: ", loginResponse.refresh_token);
      console.log(loginResponse)
      return loginResponse;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error when login");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      if (accessToken && refreshToken) {
        return { access_token: accessToken, refresh_token: refreshToken };
      } else {
        throw new Error("No tokens found");
      }
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Error checking auth status");
    }
  }
);

// Thunk para autologin al abrir la aplicación
export const autoLoginAsync = createAsyncThunk<
  { access_token: string; refresh_token: string | null },
  void,
  { rejectValue: string }
>(
  "auth/autoLogin",
  async (_, { rejectWithValue }) => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      const refresh_token = await AsyncStorage.getItem("refresh_token");

      if (access_token) {
        const response = await api.get("/path/to/validate/token", {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (response.status === 200) {
          return { access_token, refresh_token };
        } else {
          return rejectWithValue("Invalid token response");
        }
      }

      if (refresh_token) {
        const refreshResponse = await api.post("/accounts/refresh", {
          refresh_token,
        });
        const { access_token: newAccessToken } = refreshResponse.data;
        await AsyncStorage.setItem("access_token", newAccessToken);
        return { access_token: newAccessToken, refresh_token };
      } else {
        throw new Error("No tokens available");
      }
    } catch (error: any) {
      console.error("AutoLogin Error: ", error.response || error.message);
      return rejectWithValue(error.message ?? "Error al hacer autologin");
    }
  }
);


// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.loading = false;
      state.error = null;
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("refresh_token");
    },
  },
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
        state.error = action.payload?.message ?? "Error desconocido";
        if (action.payload?.status === 409) {
          console.log("Email ya existente");
        }
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
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
        state.loading = false;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(autoLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        autoLoginAsync.fulfilled,
        (state, action: PayloadAction<{ access_token: string; refresh_token: string | null }>) => {
          state.loading = false;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
        }
      )
      .addCase(autoLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendEmailAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message!;
        if (action.payload?.status === 404) {
          console.log("El email no se encontró.");
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
