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
import {
  signup,
  login,
  resendEmail,
  forgotPassword,
} from "@/networking/authService";

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

export const signupAsync = createAsyncThunk<
  { message: string; status: number },
  SignupRequest,
  { rejectValue: RejectedPayload }
>("auth/signup", async (userData: SignupRequest, { rejectWithValue }) => {
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
    return rejectWithValue({
      message: error.message || "Error al registrar",
      status: 500,
    });
  }
});
export const resendEmailAsync = createAsyncThunk<
  { message: string; status: number },
  { email: string; emailType: EmailType },
  { rejectValue: RejectedPayload }
>(
  "auth/resendEmail",
  async (
    userData: { email: string; emailType: EmailType },
    { rejectWithValue }
  ) => {
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

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const loginResponse: LoginResponse = await login(credentials);
      await AsyncStorage.setItem("access_token", loginResponse.access_token);
      await AsyncStorage.setItem("refresh_token", loginResponse.refresh_token);
      return loginResponse;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error when login");
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk<
  { message: string; status: number },
  { email: string },
  { rejectValue: RejectedPayload }
>("auth/forgotPassword", async ({ email }, { rejectWithValue }) => {
  try {
    const responseStatus = await forgotPassword(email);
    if (responseStatus === 404) {
      return rejectWithValue({ message: "Email no encontrado", status: 404 });
    }
    if (responseStatus === 200) {
      return {
        message: "Enlace de recuperación enviado con éxito",
        status: 200,
      };
    }
    throw new Error("Error desconocido al recuperar la contraseña");
  } catch (error: APIError | any) {
    return rejectWithValue({
      message: error.message || "Error al recuperar la contraseña",
      status: 500,
    });
  }
});

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
      .addCase(resendEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendEmailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message!;
        if (action.payload?.status === 404) {
          console.log("El email no se encontró.");
        }
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload.message);
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message!;
      });
  },
});

export default authSlice.reducer;
