import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  APIError,
  EmailType,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  RejectedPayload,
  ChangePasswordRequest,
} from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signup,
  login,
  resendEmail,
  ChangePassword,
  deleteAccount,
  forgotPassword,
  magicLinkLogin,
} from "@/networking/authService";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
  userId: string | null;
  status: "idle" | "loading" | "authenticated" | "notAuthenticated";
}

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  loading: false,
  error: null,
  userId: null,
  status: "notAuthenticated",
};

export interface AutologinResponse {
  access_token: string;
  refresh_token: string;
  userId: string;
}

export const signupAsync = createAsyncThunk<
  { message: string; status: number }, // Payload de éxito
  SignupRequest, // Argumento recibido (userData)
  { rejectValue: RejectedPayload } // Payload en caso de error
>("auth/signup", async (userData: SignupRequest, { rejectWithValue }) => {
  try {
    const { status, message } = await signup(userData); // Desestructuración de la respuesta
    if (status === 409 || status === 404) {
      return rejectWithValue({ message, status }); // Manejo del error 409 (email ya registrado)
    }
    if (status !== 201) {
      return rejectWithValue({ message, status }); // Manejo de otros errores
    }
    return { message, status }; // Caso de éxito
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Error al registrar",
      status: 500,
    }); // Error en la solicitud
  }
});
export const resendEmailAsync = createAsyncThunk<
  { message: string; status: number }, // fulfilled payload type
  { email: string; emailType: EmailType }, // argument type
  { rejectValue: RejectedPayload } // rejected payload type
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
      await AsyncStorage.setItem("user_id", loginResponse.id);
      return loginResponse;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error when login");
    }
  }
);

export const changePasswordAsync = createAsyncThunk<
  { message: string; status: number }, // Payload de éxito
  ChangePasswordRequest, // Argumento recibido
  { rejectValue: RejectedPayload } // Payload en caso de error
>(
  "auth/changePassword",
  async (data: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      const { status, message } = await ChangePassword(data);

      if (status === 403) {
        return rejectWithValue({ message, status });
      }

      if (status !== 200) {
        return rejectWithValue({
          message: "Error inesperado, inténtelo más tarde",
          status,
        });
      }
      return { message, status }; // Caso de éxito
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Error en la solicitud",
        status: 500,
      });
    }
  }
);

export const deleteAccountAsync = createAsyncThunk(
  "auth/deleteAccount",
  async (userId: string, { rejectWithValue }) => {
    try {
      await deleteAccount(userId);
      console.log("paso por aca");
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Ocurrió un error111");
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await forgotPassword(email);
      console.log("paso por forgot pass async");
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Ocurrió un error111");
    }
  }
);

export const autoLoginAsync = createAsyncThunk(
  "auth/autoLogin",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      const userId = await AsyncStorage.getItem("user_id");

      if (accessToken && userId && refreshToken) {
        return {
          access_token: accessToken,
          refresh_token: refreshToken || "",
          userId: userId || "",
        };
      }

      throw new Error("No se encontraron tokens de acceso.");
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const magicLinkLoginAsync = createAsyncThunk(
  "auth/magicLinkLogin",
  async (token: string, { rejectWithValue }) => {
    try {
      const loginResponse: LoginResponse = await magicLinkLogin(token);
      await AsyncStorage.setItem("access_token", loginResponse.access_token);
      await AsyncStorage.setItem("refresh_token", loginResponse.refresh_token);
      await AsyncStorage.setItem("user_id", loginResponse.id);
      return loginResponse;
    } catch (error: APIError | any) {
      return rejectWithValue(error.message ?? "Error en magic link login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
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
          // Aquí puedes manejar el caso de email no encontrado
          console.log("El email no se encontró.");
        }
      })
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message!;
      })
      .addCase(deleteAccountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccountAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAccountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Error
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        console.log(
          "Se envió correctamente el email para recuperar contraseña."
        );
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = null!;
        console.error("Error al enviar email:", action.payload);
      })
      .addCase(autoLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        autoLoginAsync.fulfilled,
        (state, action: PayloadAction<AutologinResponse>) => {
          state.loading = false;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
          state.userId = action.payload.userId;
          state.status = "authenticated";
        }
      )
      .addCase(autoLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.access_token = null;
        state.refresh_token = null;
        state.status = "notAuthenticated";
      })
      .addCase(magicLinkLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        magicLinkLoginAsync.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
          state.userId = action.payload.id;
          state.status = "authenticated";
        }
      )
      .addCase(magicLinkLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.access_token = null;
        state.refresh_token = null;
        state.status = "notAuthenticated";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
