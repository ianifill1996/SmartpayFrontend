// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://smartpaybackend.onrender.com/api",
});

// Automatically attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;