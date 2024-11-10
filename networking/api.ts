import { APIError } from "@/types/apiContracts";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers["Authorization"];
  }
};

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
