import { LoginResponse } from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

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

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para hacer refresh token en errores 403
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      !originalRequest.url?.startsWith("/accounts")
    ) {
      const storedAccessToken = await AsyncStorage.getItem("access_token");
      const originalAccessToken = originalRequest.headers[
        "Authorization"
      ]?.replace("Bearer ", "");

      // Si los tokens son diferentes, actualizar y reintentar
      if (storedAccessToken && storedAccessToken !== originalAccessToken) {
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${storedAccessToken}`;
        return api(originalRequest);
      }

      if (isRefreshing) {
        // Si hay un refresh en curso, agregar este request a la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshToken = await AsyncStorage.getItem("refresh_token");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            throw new Error("Failed to refresh token");
          }

          processQueue(null, newAccessToken);
          return newAccessToken;
        } catch (err) {
          processQueue(err, null);
          throw err;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      try {
        const newToken = await refreshPromise;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        if (
          refreshError.message === "INVALID_REFRESH_TOKEN" ||
          refreshError.message === "NO_REFRESH_TOKEN" ||
          refreshError.message === "REFRESH_TOKEN_ERROR"
        ) {
          processQueue(refreshError);
          router.push("/Welcome");
        }
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("NO_REFRESH_TOKEN");
    }

    const response = await api.post(
      "/accounts/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const refreshResponse: LoginResponse = response.data;
    await AsyncStorage.setItem("access_token", refreshResponse.access_token);

    return refreshResponse.access_token;
  } catch (error) {
    console.error("Error al renovar el access token: ", error);

    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error("INVALID_REFRESH_TOKEN");
      }
    }

    throw new Error("REFRESH_TOKEN_ERROR");
  }
};

export default api;
