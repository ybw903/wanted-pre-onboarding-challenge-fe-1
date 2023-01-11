import axios from "axios";
import { localStorageManager } from "../utils";

console.log(process.env.REACT_APP_API_BASE_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorageManager.getToken();
  if (!token) return config;

  // TODO: axios bug workaround, ref: https://github.com/axios/axios/issues/5034
  // @ts-expect-error
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

export default apiClient;
