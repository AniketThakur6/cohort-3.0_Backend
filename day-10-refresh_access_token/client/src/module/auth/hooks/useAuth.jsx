import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { registerApi } from "../apis/authApi";
import { Auth } from "../../../shared/context/AuthContex";
import { useApi } from "../../../config/api";


export const useAuth = () => {
  const navigate = useNavigate();

  

  const { accessToken, setAccessToken, user, setUser } = useContext(Auth);
  const api = useApi();

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const loginFormSubmit = (data) => {
    const obj = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    navigate("/home", { replace: true });
    reset();
  };

  const registerFormSubmit = async (data) => {
    const obj = {
      name: data.name.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    const res = await registerApi(api, obj);

    setAccessToken(res.accessToken);
    setUser(res.data.user);

    navigate("/home");
    reset();
  };

  return {
    navigate,
    register,
    handleSubmit,
    getValues,
    errors,
    loginFormSubmit,
    registerFormSubmit,
  };
};
