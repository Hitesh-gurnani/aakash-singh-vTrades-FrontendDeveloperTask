import axios from "axios";

// Create an axios instance with custom config
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000, // 10 seconds,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Get token from storage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (expired token, etc.)
    if (error.response && error.response.status === 401) {
      // Clear tokens
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      // Redirect to login page if not already there
      if (!window.location.pathname.includes("/auth/signin")) {
        window.location.href = "/auth/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
