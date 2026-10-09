import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    if ([200, 201].includes(response.status)) {
      if (response.data.message !== "successfully fetched user")
        return response.data;

      if (response.data.message !== "token rotated successsfully")
        return response.data;

      if (response.data.message !== "Product fectched successfully")
        return response.data;

      toast.success(response.data.message);
    }
    return response.data;
  },
  (error) => {
    if ([400, 401, 500, 404,409, 429].includes(error.response?.status)) {
      const message =
        error.response?.data?.errors?.[0]?.msg ??
        error.response?.data?.errors?.[0]?.message ??
        error.response?.data?.message ??
        error.response?.data?.error;

      if (message !== "Refresh token is Invalid") {
        toast.error(message ?? "Request failed");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
