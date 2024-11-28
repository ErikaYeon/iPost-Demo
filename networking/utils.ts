import { APIError } from "@/types/apiContracts";
import axios from "axios";
import { router } from "expo-router";

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
