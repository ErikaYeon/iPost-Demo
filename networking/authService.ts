import {
  APIError,
  EmailType,
  LoginRequest,
  LoginResponse,
  RejectedPayload,
  SignupRequest,
} from "@/types/apiContracts";
import api from "./api";
import { handleError } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

// Función de registro
export const signup = async (data: SignupRequest): Promise<{status: number, message: string}> => {
  try {
    const response = await api.post("/accounts/signup", data);
    if (response.status === 409 || response.status === 404) {
      return { status: 409, message: "El email ya está registrado" };
    }
    if (response.status !== 201) {
      return { status: response.status, message: "Error desconocido al crear el usuario" };
    }
    console.log("Successful signup.");
    console.log(response.data)
    return { status: 201, message: "Usuario creado con éxito" };
  } catch (error: any) {
    if (error.status === 409) {
      return { status: 409, message: "Error.El email ya está registrado" };
    }
    console.log('ENTRA aca ');
    handleError(error);
    throw new APIError("Never executed"); // This 'throw' is never executed, but TypeScript was whining about the method contract.
  }
};

// Función para reenviar el correo de verificación
export const resendEmail = async (data: {email: string, emailType: EmailType}): Promise<number> => {
  try {
    const response = await api.post("/accounts/resent-email", data);

    console.log("Successful resend");
    console.log(response.data)
    console.log(response.status)
    return response.status;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed"); // This 'throw' is never executed, but TypeScript was whining about the method contract.
  }
};

// Función de login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post("/accounts/login", data);
    if (response.status !== 200) {
      console.log(`Error logging in user. Code error: ${response.status}`);
      throw new APIError("Error logging in user.");
    }
    console.log("Successful login.");
    // Guardar los tokens obtenidos al hacer login
    await saveTokens(response.data.access_token, response.data.refresh_token);
    return response.data;
  } catch (error: any) {
    if (error.status === 403) {
      throw new APIError("Error logging in user.");
    } else {
      handleError(error);
      throw new APIError("Never executed");
    }
  }
};

// Guardar los tokens en AsyncStorage
const saveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem("access_token", accessToken);  // Cambié aquí la clave a "access_token"
    await AsyncStorage.setItem("refresh_token", refreshToken);  // Cambié aquí la clave a "refresh_token"
  } catch (error) {
    console.error("Error saving tokens:", error);
  }
};

// Función de auto-login
export const autoLogin = async (): Promise<LoginResponse | null> => {
  try {
    // Obtener tokens almacenados
    const accessToken = await getAccessToken();
    const refreshToken = await AsyncStorage.getItem("refresh_token"); // Cambié la clave aquí a "refresh_token"

    // Si no existe el accessToken ni el refreshToken, retornar null
    if (!accessToken && !refreshToken) {
      return null;
    }

    // Si el accessToken existe, se intenta hacer una solicitud
    // Si el backend responde 401 (expirado), se intentará renovar el token
    return { access_token: accessToken, refresh_token: refreshToken || "" } as LoginResponse;
  } catch (error: any) {
    handleError(error);  // Si hay un error, será manejado globalmente
    return null; 
  }
};

// Función para renovar el token de acceso
export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await api.post("/accounts/refresh-token", { // ENDPOINT QUE NECESITO
      refresh_token: refreshToken,
    });

    const { access_token } = response.data;
    await AsyncStorage.setItem("access_token", access_token);  // Cambié aquí la clave a "access_token"
    return access_token;
  } catch (error) {
    console.error("Error renewing access token:", error);
    throw new Error("Unable to refresh access token");
  }
};

// Obtener el accessToken almacenado
const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("access_token");  // Cambié aquí la clave a "access_token"
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// Eliminar los tokens (logout)
const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem("access_token");  // Cambié aquí la clave a "access_token"
    await AsyncStorage.removeItem("refresh_token");  // Cambié aquí la clave a "refresh_token"
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
