import apiClient from "./apiClient";
import {
  LoginRequest,
  LoginResponse,
  SignUpReqest,
  SignUpResponse,
  User,
} from "../types";

interface IAuthAPI {
  login(loginRequest: LoginRequest): Promise<LoginResponse>;
  signUp(signUpRequest: SignUpReqest): Promise<SignUpResponse>;
}

const BASE_URL = "/users" as const;

class AuthAPI implements IAuthAPI {
  async login(loginRequest: User): Promise<LoginResponse> {
    const response = await apiClient.post(`${BASE_URL}/login`, loginRequest);
    return response.data;
  }
  async signUp(signUpRequest: User): Promise<SignUpResponse> {
    const response = await apiClient.post(`${BASE_URL}/create`, signUpRequest);
    return response.data;
  }
}

export default new AuthAPI();
