import { useState } from "react";

import { createPuzzle } from "../services/puzzle.service";

export default function useGridCovePuzzleService() {
  const [puzzleServiceIsLoading, setPuzzleServiceIsLoading] = useState(false);
  const [puzzleServiceErrors, setPuzzleServiceErrors] = useState(null);

  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err];
    setPuzzleServiceErrors(errorMessages);
  };

  const handleClearErrors = () => {
    setPuzzleServiceErrors(null);
  };

  const createNewPuzzle = async (pixelArt, title, size) => {
    try {
      setPuzzleServiceErrors(null);
      setPuzzleServiceIsLoading(true);
      const newPuzzle = await createPuzzle({ pixelArt, title, size });
      return newPuzzle;
    } catch (err) {
      handleErrors(err);
    } finally {
      setPuzzleServiceIsLoading(false);
    }
  };

  return {
    createNewPuzzle,
    puzzleServiceIsLoading,
    puzzleServiceErrors,
    handleClearErrors,
  };
}
