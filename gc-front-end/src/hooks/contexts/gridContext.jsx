import { createContext, useContext, useEffect, useState } from "react";

const GridContext = createContext();

const GridContextProvider = function ({ children }) {
  const [fillStyle, setFillStyle] = useState(null);
  const [gridSize, setGridSize] = useState(null);
  const [gridColours, setGridColours] = useState(null);

  useEffect(() => {
    if (!gridSize) return;
    setGridColours(
      Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => 0)
      )
    );
  }, [gridSize]);

  const model = {
    fillStyle,
    setFillStyle,
    gridSize,
    setGridSize,
    gridColours,
  };

  return <GridContext.Provider value={model}>{children}</GridContext.Provider>;
};

const useGridContext = function () {
  return useContext(GridContext);
};

export { useGridContext, GridContextProvider };
