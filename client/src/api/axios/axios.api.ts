import axios from "axios";

export const BaseUrl = "http://localhost:5000/api";

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: BaseUrl
});

axiosApi.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosApi;
