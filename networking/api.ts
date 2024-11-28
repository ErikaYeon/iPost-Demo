import { APIError, LoginResponse } from "@/types/apiContracts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log(originalRequest.url);

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
        console.log("no coinciden");
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${storedAccessToken}`;
        return api(originalRequest);
      }

      console.log({ isRefreshing });
      if (isRefreshing) {
        // Si hay un refresh en curso, agregar este request a la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
          console.log("failedQueue pushed");
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
          console.log("refreshPromise dispatched");
          const refreshToken = await AsyncStorage.getItem("refresh_token");
          console.log({ refreshToken });
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
        console.log({ newToken });
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export const refreshAccessToken = async (): Promise<string> => {
  try {
    console.log("Entró en refreshAccessToken");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No se encontró el refresh token");
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

    console.log("Respuesta del back: ", response);
    const refreshResponse: LoginResponse = response.data;
    await AsyncStorage.setItem("access_token", refreshResponse.access_token);

    return refreshResponse.access_token;
  } catch (error) {
    console.error("Error al renovar el access token: ", error);
    throw new APIError("Ocurrió un error renovando el access token");
  }
};

export default api;
