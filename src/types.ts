export type User = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};

export type LoginRequest = User;
export type LoginResponse = AuthResponse;

export type SignUpReqest = User;
export type SignUpResponse = AuthResponse;
