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

// Interceptor para manejar el error 403 y renovar el token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    // Inicializar retry_count en originalRequest si no está definido
    if (!originalRequest._retry_count) {
      originalRequest._retry_count = 0;
    }

    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      refreshToken &&
      originalRequest._retry_count < 4
    ) {
      originalRequest._retry = true;
      originalRequest._retry_count += 1;

      // Intenta renovar el token de acceso
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        router.push("/LogIn");
      }
    }
    return Promise.reject(error);
  }
);

// Función para renovar el token de acceso
export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await api.post("/accounts/refresh-token", {
      refresh_token: refreshToken,
    });
    console.log("ENTRA A LA FUNCION REFRESH");
    const { access_token } = response.data;
    await AsyncStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Error renewing access token:", error);
    return null;
  }
};

export default api;
