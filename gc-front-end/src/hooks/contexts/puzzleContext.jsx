import { createContext, useContext } from "react";
import useGridCovePuzzleService from "../useGridCovePuzzleService";

const PuzzleContext = createContext();

const PuzzleContextProvider = function ({ children }) {
  const puzzleServices = useGridCovePuzzleService();

  const model = {
    ...puzzleServices,
  };

  return (
    <PuzzleContext.Provider value={model}>{children}</PuzzleContext.Provider>
  );
};

const usePuzzleContext = function () {
  return useContext(PuzzleContext);
};

export { usePuzzleContext, PuzzleContextProvider };
