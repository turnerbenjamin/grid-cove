import { createContext, useContext, useState } from "react";
import useGridCovePuzzleService from "../useGridCovePuzzleService";
import GridSolveState from "../../utils/GridSolveState";

const PuzzleContext = createContext();

const PuzzleContextProvider = function ({ children }) {
  const [solveState, setSolveState] = useState();

  const puzzleServices = useGridCovePuzzleService();

  const updateSolveState = (gridCellString, puzzle) => {
    const gridSolveState = new GridSolveState(gridCellString, puzzle);
    setSolveState(gridSolveState);
  };

  const model = {
    ...puzzleServices,
    updateSolveState,
    solveState,
  };

  return (
    <PuzzleContext.Provider value={model}>{children}</PuzzleContext.Provider>
  );
};

const usePuzzleContext = function () {
  return useContext(PuzzleContext);
};

export { usePuzzleContext, PuzzleContextProvider };
