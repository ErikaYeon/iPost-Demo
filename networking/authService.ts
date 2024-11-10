import {
  APIError,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "@/types/apiContracts";
import api from "./api";
import { handleError } from "./api";

export const signup = async (data: SignupRequest): Promise<Number> => {
  try {
    const response = await api.post("/accounts/signup", data);

    if (response.status !== 201) {
      console.log(`Error creating user. Code error: ${response.status}`);
      throw new APIError("Error creating user.");
    }

    console.log("Successful signup.");
    return response.status;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed"); // This 'throw' is never executed, but TypeScript was whining about the method contract.
  }
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post("/accounts/login", data);
    if (response.status !== 200) {
      console.log(`Error logging in user. Code error: ${response.status}`);
      throw new APIError("Error logging in user.");
    }
    console.log("Successful login.");
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed"); // This 'throw' is never executed, but TypeScript was whining about the method contract.
  }
};
