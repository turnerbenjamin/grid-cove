import { createContext, useContext } from "react";
import useGridCoveUserService from "../useGridCoveUserService";

const AppContext = createContext();

const AppContextProvider = function ({ children }) {
  const userServices = useGridCoveUserService();

  const model = {
    ...userServices,
  };

  return <AppContext.Provider value={model}>{children}</AppContext.Provider>;
};

const useAppContext = function () {
  return useContext(AppContext);
};

export { useAppContext, AppContextProvider };
