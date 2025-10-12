// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    const message =
      error.response?.data?.message || error.message || "Unknown Axios error";
    return Promise.reject(new Error(message));
  }
);
