import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apiProtected = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiProtected.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiProtected.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { token } = response.data;

        // Оновлюємо токен у Zustand поза хуком
        useAuthStore.getState().setToken(token);

        // Повторний запит із новим токеном
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiProtected(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiProtected;