import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  // const [refreshProduct, setRefreshProduct] = useState(false)

  const productRefresh = async () => {
    try {
      setProductLoading(true);

      const response = await api.get("/products");

      const products = response?.data?.products ?? [];

      setProductData(products);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error);
        toast.error("Could not get Products");
      }
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    productRefresh();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productData,
        setProductData,
        productLoading,
        setProductLoading,
        productRefresh,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
