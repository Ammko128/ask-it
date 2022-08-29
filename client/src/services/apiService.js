import axios from "axios";
import config from "../config";
import localHistory from "../localHistory";

const defaultOptions = (baseURL) => ({
  timeout: 30000,
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = axios.create(defaultOptions(config.apiUrl || ""));

apiService.interceptors.request.use((conf) => {
  const newConfig = { ...conf };
  const Authorization = `Bearer ${localStorage.getItem("token")}`;
  newConfig.headers = { ...newConfig.headers, Authorization };
  return newConfig;
});

apiService.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localHistory.push("/login", { retry: !err.config.url.includes("auth") });
    }
    return Promise.reject(err);
  }
);

export default apiService;
