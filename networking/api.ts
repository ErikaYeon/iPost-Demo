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

// Interceptor para manejar el error 403 y renovar el token
api.interceptors.response.use(
  (response) => response, // 
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    // Inicializar retry_count en originalRequest si no está definido
    if (!originalRequest._retry_count) {
      originalRequest._retry_count = 0;
    }

    // Si el error es 403 y no hemos intentado ya renovar el token
    if (error.response?.status === 403 && !originalRequest._retry && refreshToken && originalRequest._retry_count < 4) {
      originalRequest._retry = true; // Evita un bucle infinito de intentos
      originalRequest._retry_count += 1; // Aumenta el contador de reintentos

      // Intenta renovar el token de acceso
      const newAccessToken = await refreshAccessToken(refreshToken);

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
    return Promise.reject(error); // Si no es un 403 o la renovación falla, rechaza el error
  }
);

export default api;
