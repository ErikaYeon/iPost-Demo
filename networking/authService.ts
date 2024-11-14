import {
  APIError,
  EmailType,
  LoginRequest,
  LoginResponse,
  RejectedPayload,
  SignupRequest,
} from "@/types/apiContracts";
import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Función de registro
export const signup = async (
  data: SignupRequest
): Promise<{ status: number; message: string }> => {
  try {
    const response = await api.post("/accounts/signup", data);
    if (response.status === 409 || response.status === 404) {
      return { status: 409, message: "El email ya está registrado" };
    }
    if (response.status !== 201) {
      return {
        status: response.status,
        message: "Error desconocido al crear el usuario",
      };
    }
    console.log("Successful signup.");
    return { status: 201, message: "Usuario creado con éxito" };
  } catch (error: any) {
    // Los errores ahora se manejan automáticamente a través del interceptor en api.ts
    throw new APIError("Error durante el registro.");
  }
};

// Función para reenviar el correo de verificación
export const resendEmail = async (data: {
  email: string;
  emailType: EmailType;
}): Promise<number> => {
  try {
    const response = await api.post("/accounts/resent-email", data);
    return response.status;
  } catch (error: any) {
    throw new APIError("Error al reenviar el correo de verificación.");
  }
};

// Función de login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post("/accounts/login", data);
    if (response.status !== 200) {
      console.log(`Error logging in user. Code error: ${response.status}`);
      throw new APIError("Error al iniciar sesión.");
    }
    console.log("Successful login.");
    await saveTokens(response.data.access_token, response.data.refresh_token);
    return response.data;
  } catch (error: any) {
    throw new APIError("Error al iniciar sesión.");
  }
};

// Guardar los tokens en AsyncStorage
const saveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem("access_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);
  } catch (error) {
    console.error("Error saving tokens:", error);
  }
};

// Función de auto-login
export const autoLogin = async (): Promise<LoginResponse | null> => {
  try {
    const accessToken = await getAccessToken();
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!accessToken && !refreshToken) {
      return null;
    }
    return {
      access_token: accessToken,
      refresh_token: refreshToken || "",
    } as LoginResponse;
  } catch (error: any) {
    return null;
  }
};

// Función para renovar el token de acceso
export const refreshAccessToken = async (
  refreshToken: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post("/accounts/refresh-token", {
      refresh_token: refreshToken,
    });
    const { access_token } = response.data;
    await AsyncStorage.setItem("access_token", access_token);
    return response.data;
  } catch (error) {
    console.error("Error renewing access token:", error);
    throw new Error("Unable to refresh access token");
  }
};

// Obtener el accessToken almacenado
const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("access_token");
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// Eliminar los tokens (logout)
const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
  } catch (error) {
    console.error("Error removing tokens:", error);
  }
};

// Función de logout
export const logout = async () => {
  try {
    await removeTokens();
    console.log("Usuario deslogueado");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
