import {
  APIError,
  EmailType,
  LoginRequest,
  LoginResponse,
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
    return { status: 201, message: "Usuario creado con éxito" };
  } catch {
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
  } catch {
    throw new APIError("Error al reenviar el correo de verificación.");
  }
};

// Función de login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post("/accounts/login", data);
    await saveTokens(response.data.access_token, response.data.refresh_token);
    return response.data;
  } catch {
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
    console.log("ENTRA A LA FUNCION AUTOLOGIN");
    const accessToken = await getAccessToken();
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!accessToken && !refreshToken) {
      return null;
    }
    return {
      access_token: accessToken,
      refresh_token: refreshToken || "",
    } as LoginResponse;
  } catch {
    return null;
  }
};

// Obtener el accessToken almacenado
const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("access_token");
  } catch {
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
  await removeTokens();
};
