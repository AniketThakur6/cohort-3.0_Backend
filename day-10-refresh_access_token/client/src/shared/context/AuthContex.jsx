import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);

  return (
    <Auth
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        isHydrating,
        setIsHydrating,
      }}
    >
      {children}
    </Auth>
  );
};
