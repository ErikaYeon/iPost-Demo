import { APIError } from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { refreshAccessToken } from "./authService";

const api = axios.create({
  baseURL: "https://ipost-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en las cabeceras de la solicitud
api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("access_token");
    if (accessToken && !config.url?.startsWith("/accounts")) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar el error 401 y renovar el token
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente devuélvela
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado ya renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Evita un bucle infinito de intentos

      // Intenta renovar el token de acceso
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Si la renovación fue exitosa, configura el nuevo token en el encabezado de la solicitud original
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Reintenta la solicitud original con el nuevo token
        return api(originalRequest);
      } else {
        // Si la renovación falla, elimina los tokens y redirige al login
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        router.push("/LogIn");
      }
    }

    return Promise.reject(error); // Si no es un 401 o la renovación falla, rechaza el error
  }
);

export const handleError = (error: any, onRetry?: () => void): APIError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errorMessage = `API Error: ${
        error.response.data?.message || "Error desconocido"
      }`;
      const errorStatus = ` - Status: ${error.response.status}`;
      console.log(errorMessage + errorStatus);
      if (onRetry) {
        onRetry();
      }
      router.push('/ErrorGeneral');
      throw new APIError(errorMessage);
    } else if (error.request) {
      router.push('/ErrorConexion');
      throw new APIError("Network Error: No response from server.");
    } else {
      router.push('/ErrorGeneral');
      throw new APIError(`Axios Configuration Error: ${error.message}`);
    }
  } else {
    // router.push('/ErrorGeneral');
    throw new APIError(
      `Unexpected Error: ${error.message || "Unknown error occurred."}`
    );
  }
};

export default api;
