export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token:               string;
  email:               string;
  nombres:             string;
  expiracion:          string;
  containerDeAdjuntos: string;
}
