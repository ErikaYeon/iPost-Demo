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
  (error) => Promise.reject(error)
);

const logoutAndRedirect = async () => {
  await AsyncStorage.multiRemove(["access_token", "refresh_token", "user_id"]);
  router.push("/LogIn");
};

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await api.post("/accounts/refresh-token", {
      refresh_token: refreshToken,
    });
    const { access_token } = response.data;
    await AsyncStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new APIError("Failed to refresh access token");
  }
};

const handleError = async (error: any, originalRequest: any): Promise<void> => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;

      if (status === 403 && !originalRequest.url?.startsWith("/accounts")) {
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        if (originalRequest._retry_count < MAX_RETRY_COUNT && refreshToken) {
          originalRequest._retry_count += 1;

          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch {
            console.warn("Token refresh failed. Redirecting to login.");
            await logoutAndRedirect();
            return;
          }
        } else {
          console.warn("Max retries reached or no refresh token available.");
          await logoutAndRedirect();
          return;
        }
      }

      console.error(
        `Unhandled API error: ${error.response.data?.message || "Unknown"}`
      );
      router.push("/ErrorGeneral");
    } else if (error.request) {
      console.error("No response from server.");
      router.push("/ErrorConexion");
    } else {
      console.error("Unexpected error:", error.message);
      router.push("/ErrorGeneral");
    }
  } else {
    console.error("Non-Axios error occurred:", error);
    router.push("/ErrorGeneral");
  }
  throw error;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry_count) {
      originalRequest._retry_count = 0;
    }

    return handleError(error, originalRequest);
  }
);

export default api;
