// src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Anexa token fake (se existir) em todas as requisições
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});