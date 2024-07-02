import { useCallback, useEffect, useState } from "react";

import {
  createPuzzle,
  getPuzzles,
  getPuzzle,
  deletePuzzle,
} from "../services/puzzle.service";

export default function useGridCovePuzzleService() {
  const [puzzles, setPuzzles] = useState(null);
  const [puzzleServiceIsLoading, setPuzzleServiceIsLoading] = useState(false);
  const [puzzleServiceErrors, setPuzzleServiceErrors] = useState(null);

  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err.message || err];
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

  const getAllPuzzles = async (pixelArt, title, size) => {
    try {
      setPuzzleServiceErrors(null);
      setPuzzleServiceIsLoading(true);
      const puzzles = await getPuzzles();
      setPuzzles(puzzles);
    } catch (err) {
      handleErrors(err);
    } finally {
      setPuzzleServiceIsLoading(false);
    }
  };

  const getPuzzleById = async (puzzleId) => {
    try {
      setPuzzleServiceErrors(null);
      setPuzzleServiceIsLoading(true);
      const puzzle = await getPuzzle(puzzleId);
      return puzzle;
    } catch (err) {
      handleErrors(err);
    } finally {
      setPuzzleServiceIsLoading(false);
    }
  };

  const deletePuzzleById = async (puzzleId) => {
    try {
      setPuzzleServiceErrors(null);
      setPuzzleServiceIsLoading(true);
      await deletePuzzle(puzzleId);
      await getAllPuzzles();
      return true;
    } catch (err) {
      handleErrors(err);
    } finally {
      setPuzzleServiceIsLoading(false);
    }
  };

  const getNextPuzzle = useCallback(
    (currentPuzzleId) => {
      if (!puzzles) return;
      const allPuzzles = puzzles.flatMap((puzzleGroup) => puzzleGroup.puzzles);
      const currentIndex = allPuzzles.indexOf(currentPuzzleId);
      return allPuzzles[currentIndex + 1];
    },
    [puzzles]
  );

  useEffect(() => {
    getAllPuzzles();
  }, []);

  return {
    createNewPuzzle,
    deletePuzzleById,
    getAllPuzzles,
    getPuzzleById,
    getNextPuzzle,
    handleClearErrors,
    puzzles,
    puzzleServiceErrors,
    puzzleServiceIsLoading,
  };
}
