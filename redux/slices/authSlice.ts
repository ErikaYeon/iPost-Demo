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
import { refreshAccessToken } from "@/networking/authService";

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
  { message: string; status: number },  // Payload de éxito
  SignupRequest,  // Argumento recibido (userData)
  { rejectValue: RejectedPayload }  // Payload en caso de error
>(
  "auth/signup",
  async (userData: SignupRequest, { rejectWithValue }) => {
    try {
      const { status, message } = await signup(userData);  // Desestructuración de la respuesta
      if (status === 409 || status === 404) {
        return rejectWithValue({ message, status });  // Manejo del error 409 (email ya registrado)
      }
      if (status !== 201) {
        return rejectWithValue({ message, status });  // Manejo de otros errores
      }
      return { message, status };  // Caso de éxito
    } catch (error: any) {
      return rejectWithValue({ message: error.message || "Error al registrar", status: 500 });  // Error en la solicitud
    }
  }
);
export const resendEmailAsync = createAsyncThunk<
{ message: string; status: number }, // fulfilled payload type
{ email: string; emailType: EmailType }, // argument type
{ rejectValue: RejectedPayload } // rejected payload type
>(
  "auth/resendEmail",
  async (userData: {email:string, emailType: EmailType}, { rejectWithValue }) => {
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

// Función de autologin con verificación y renovación del token
export const autoLoginAsync = createAsyncThunk(
  "auth/autoLogin",
  async (_, { rejectWithValue }) => {
    try {
      // Obtener los tokens de AsyncStorage
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      // Si el accessToken no existe, intenta renovar el accessToken utilizando el refreshToken
      if (!accessToken && refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken); // Esta función debería implementar la lógica para obtener un nuevo access token
        if (!newAccessToken) {
          throw new Error("No se pudo renovar el token de acceso.");
        }
        return { access_token: newAccessToken, refresh_token: refreshToken };
      }

      // Si ya existe el accessToken, simplemente devolver los tokens
      if (accessToken) {
        return { access_token: accessToken, refresh_token: refreshToken };
      }

      // Si no hay tokens disponibles, retornar error
      throw new Error("No se encontraron tokens de acceso.");
    } catch (error: any) {
      return rejectWithValue(error.message || "Error durante el proceso de auto-login.");
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
        
        // Maneja el caso de éxito aquí si necesitas hacer algo adicional
      })
      .addCase(resendEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message! ;
        if (action.payload?.status === 404) {
          // Aquí puedes manejar el caso de email no encontrado
          console.log("El email no se encontró.");
        }
      })
      .addCase(autoLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(autoLoginAsync.fulfilled, (state, action: PayloadAction<{ access_token: string; refresh_token: string | null}>) => {
        state.loading = false;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(autoLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.access_token = null;
        state.refresh_token = null;
      });
  },
});

export default authSlice.reducer;
