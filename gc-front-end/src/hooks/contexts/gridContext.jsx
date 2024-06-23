import { createContext, useContext, useEffect, useState } from "react";

const GridContext = createContext();

const GridContextProvider = function ({ children }) {
  const [fillStyle, setFillStyle] = useState(null);

  const model = {
    fillStyle,
    setFillStyle,
  };

  return <GridContext.Provider value={model}>{children}</GridContext.Provider>;
};

const useGridContext = function () {
  return useContext(GridContext);
};

export { useGridContext, GridContextProvider };
