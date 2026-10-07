import axios from "axios";
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    if ([200, 201].includes(response.status)) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if ([400, 401, 500, 404, 429].includes(error.response?.status)) {
      console.log("hello")
      toast.error(error.response.data.error);
    }

    return error;
  },
);

export default api;
