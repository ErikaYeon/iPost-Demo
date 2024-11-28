import {
  APIError,
  ChangePasswordRequest,
  EmailType,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "@/types/apiContracts";
import api from "./api";
import { handleError } from "./utils";

export const signup = async (
  data: SignupRequest
): Promise<{ status: number; message: string }> => {
  try {
    const response = await api.post("/accounts/signup", data);
    if (response.status === 409 || response.status === 404) {
      return { status: 409, message: "El email ya está registrado" };
    }
    if (response.status !== 201) {
      return {
        status: response.status,
        message: "Error desconocido al crear el usuario",
      };
    }
    console.log("Successful signup.");
    console.log(response.data);
    return { status: 201, message: "Usuario creado con éxito" };
  } catch (error: any) {
    if (error.status === 409) {
      return { status: 409, message: "Error.El email ya está registrado" };
    }
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const resendEmail = async (data: {
  email: string;
  emailType: EmailType;
}): Promise<Number> => {
  try {
    const response = await api.post("/accounts/resent-email", data);

    console.log("Successful resend");
    console.log(response.data);
    console.log(response.status);
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
    if (error.status === 403 || error.status == 500) {
      throw new APIError("Error logging in user.");
    } else {
      handleError(error);
      throw new APIError("Never executed");
    }
  }
};

export const ChangePassword = async (
  data: ChangePasswordRequest
): Promise<{ status: number; message: string }> => {
  try {
    const response = await api.post("/accounts/password/reset", data);
    if (response.status == 200) {
      return { status: response.status, message: "cambio exitoso" };
    } else if (response.status == 403) {
      return {
        status: response.status,
        message: "contraseña actual incorrecta",
      };
    }
    return {
      status: response.status,
      message: "Error desconocido, inténtelo más tarde",
    };
  } catch (error: any) {
    if (error.status == 403) {
      throw new APIError("contraseña actual incorrecta");
    } else {
      throw new APIError("Ocurrió un error. intentelo nuevamente");
    }
  }
};

export const deleteAccount = async (userId: string): Promise<void> => {
  try {
    const response = await api.delete(`/users/${userId}`);
    console.log("response de delete account" + response.status);
  } catch (error: any) {
    throw new APIError("Ocurrió un error");
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await api.post(`accounts/password/forgot`, email);
    console.log("paso por forgot pass async");
  } catch (error: any) {
    handleError(error);
    throw new APIError("Ocurrió un error");
  }
};
