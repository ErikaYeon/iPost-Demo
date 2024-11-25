import { APIError } from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const MAX_RETRY_COUNT = 3;

const api = axios.create({
  baseURL: "https://ipost-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
      router.push("/ErrorGeneral");
      throw new APIError(errorMessage);
    } else if (error.request) {
      router.push("/ErrorConexion");
      throw new APIError("Network Error: No response from server.");
    } else {
      router.push("/ErrorGeneral");
      throw new APIError(`Axios Configuration Error: ${error.message}`);
    }
  } else {
    // router.push('/ErrorGeneral');
    throw new APIError(
      `Unexpected Error: ${error.message || "Unknown error occurred."}`
    );
  }
};

api.interceptors.response.use(
  (response) => response, // Devuelve la respuesta si no hay errores
  async (error) => {
    const originalRequest = error.config;

    // Si es un error 403 (token expirado) y no pertenece a /accounts
    if (
      error.response?.status === 403 &&
      !originalRequest.url?.startsWith("/accounts")
    ) {
      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        // Si no se ha intentado reintentar previamente, inicializa el contador
        if (!originalRequest._retry_count) {
          originalRequest._retry_count = 0;
        }

        if (refreshToken && originalRequest._retry_count < MAX_RETRY_COUNT) {
          originalRequest._retry_count += 1;
          const newAccessToken = await refreshAccessToken(refreshToken);

          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        }
        await logoutAndRedirect();
      } catch {
        await logoutAndRedirect();
      }
    }
    return Promise.reject(error);
  }
);

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const response = await api.post("/accounts/refresh-token", {
      refresh_token: refreshToken,
    });
    const { access_token } = response.data;
    await AsyncStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    throw new APIError("Ocurrió un error renovando el access token");
  }
};

const logoutAndRedirect = async () => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
  await AsyncStorage.removeItem("user_id");
  router.push("/LogIn");
};

export default api;
