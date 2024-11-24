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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      !originalRequest.url?.startsWith("/accounts") &&
      error.response?.status === 403
    ) {
      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (!originalRequest._retry_count) {
          originalRequest._retry_count = 0;
        }

        if (refreshToken && originalRequest._retry_count <= MAX_RETRY_COUNT) {
          originalRequest._retry_count += 1;
          const newAccessToken = await refreshAccessToken(refreshToken);

          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } else {
            await logoutAndRedirect();
          }
        } else {
          await logoutAndRedirect();
        }
      } catch (error) {
        console.log("Error refreshing token");
      }
    } else {
      return Promise.reject(handleError(error));
    }
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
    console.error("Error renewing access token:", error);
    throw new APIError("Ocurrió un error renovando el access token");
  }
};

const logoutAndRedirect = async () => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
  router.push("/LogIn");
};

export default api;
