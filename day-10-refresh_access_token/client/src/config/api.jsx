import axios from "axios";
import { useContext, useMemo } from "react";
import { Auth } from "../shared/context/AuthContex";

export const useApi = () => {
  const { setAccessToken, accessToken, setUser } = useContext(Auth);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5173",
      withCredentials: true,
    });

    instance.interceptors.request.use((request) => {
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status !== 401 ||
          originalRequest?._retry ||
          originalRequest?.url === "/api/auth/refresh"
        ) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          const refreshResponse = await instance.post("/api/auth/refresh");
          const newAccessToken = refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          const userResponse = await instance.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          setUser(userResponse.data.data.user);

          return instance(originalRequest);
        } catch (refreshError) {
          setAccessToken(null);
          setUser(null);
          return Promise.reject(refreshError);
        }
      },
    );

    return instance;
  }, [accessToken]);

  return api;
};
