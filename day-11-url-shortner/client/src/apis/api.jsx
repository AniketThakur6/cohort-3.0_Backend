import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "/api/url",
  withCredentials: true,
});

api.interceptors.response.use(
  (response)=>{
    // return response
  },
  (error)=>{
    if([400,401,500].includes(error.response?.status)){
      console.log("working")
      toast.error(error.response.data.error)
    }

    return error
  }
)

export default api;
