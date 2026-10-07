import { createContext } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const hello = "fine";

  return (
    <StoreContext.Provider
      value={{
        hello,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
