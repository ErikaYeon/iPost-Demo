export interface ApiGenericResponse {
  message: string;
  statusCode: number;
}

export class APIError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  name: string;
  lastname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  access_token: string;
  refresh_token: string;
}
