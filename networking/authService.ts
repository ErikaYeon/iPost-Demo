import {
  APIError,
  ChangePasswordRequest,
  EmailType,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from "@/types/apiContracts";
import api from "./api";

export const signup = async (
  data: SignupRequest
): Promise<{ status: number; message: string }> => {
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
  return { status: 201, message: "Usuario creado con éxito" };
};

export const resendEmail = async (data: {
  email: string;
  emailType: EmailType;
}): Promise<number> => {
  const response = await api.post("/accounts/resent-email", data);
  console.log("Successful resend:", response.status);
  return response.status;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/accounts/login", data);
  if (response.status !== 200) {
    throw new APIError("Error logging in user.");
  }
  console.log("Successful login.");
  return response.data;
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
  const response = await api.delete(`/users/${userId}`);
  console.log("response de delete account:", response.status);
};

export const forgotPassword = async (email: string): Promise<void> => {
    await api.post(`accounts/password/forgot`, email);
    console.log("paso por forgot pass async");
};
