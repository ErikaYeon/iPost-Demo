import { APIError } from "@/types/apiContracts";
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

export const handleError = (error: any): APIError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errorMessage = `API Error: ${
        error.response.data?.message || "Error desconocido"
      }`;
      const errorStatus = ` - Status: ${error.response.status}`;
      console.log(errorMessage + errorStatus);
      throw new APIError(errorMessage);
    } else if (error.request) {
      throw new APIError("Network Error: No response from server.");
    } else {
      throw new APIError(`Axios Configuration Error: ${error.message}`);
    }
  } else {
    throw new APIError(
      `Unexpected Error: ${error.message || "Unknown error occurred."}`
    );
  }
};

export default api;
