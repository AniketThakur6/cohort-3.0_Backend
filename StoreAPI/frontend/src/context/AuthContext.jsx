import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const isAuthenticated = !!accessToken;

  const [toRoute, setToRoute] = useState(true)

  useEffect(()=>{
    if(accessToken === null){
      setTimeout(()=>{
        setToRoute(true)
      },1500)
    }
  },[accessToken])

  useEffect(() => {
    let isMounted = true;

    const getSession = async () => {
      try {
        const response = await api.post("/auth/refresh-token",{});

        const token = response?.data?.accessToken;

        if (!token) {
          throw new Error("Refresh response did not contain an access token");
        }

        const getUser = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = getUser?.data?.user;

        if (!user) {
          throw new Error("User response did not contain a user");
        }

        if (isMounted) {
          setAccessToken(token);
          setUser(user);
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          toast.error("Could not restore your session. Please sign in again.");
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    getSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        isAuthenticated,
        authLoading,
        toRoute, setToRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
