import { createContext, useContext, useEffect, useState } from "react";
import useGridCovePuzzleService from "../useGridCovePuzzleService";
import GridSolveState from "../../utils/GridSolveState";
import { useLocation } from "react-router-dom";

const PuzzleContext = createContext();

const PuzzleContextProvider = function ({ children }) {
  const [solveState, setSolveState] = useState();
  const path = useLocation();
  const puzzleServices = useGridCovePuzzleService();

  const updateSolveState = (gridCellString, puzzle) => {
    const gridSolveState = new GridSolveState(gridCellString, puzzle);
    setSolveState(gridSolveState);
  };

  useEffect(() => {
    setSolveState(null);
  }, [path]);

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
