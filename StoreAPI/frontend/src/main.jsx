import { createRoot } from "react-dom/client";
import "./index.css";
import { Bounce, ToastContainer } from "react-toastify";
import AppRoute from "./routes/AppRoute";
import StoreContextProvider from "./context/StoreContext";
import AuthContextProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <StoreContextProvider>
      <AppRoute />
      <ToastContainer autoClose={2500} theme="dark" transition={Bounce} />
    </StoreContextProvider>
  </AuthContextProvider>,
);
