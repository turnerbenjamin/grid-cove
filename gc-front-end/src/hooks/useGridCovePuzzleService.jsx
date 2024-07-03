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

  /**
   * Handles errors returned from the puzzle service.
   *
   * @private
   * @param {Error[]|Error} err - The error object or array of error objects.
   */
  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err.message || err];
    setPuzzleServiceErrors(errorMessages);
  };

  /**
   * Clears the puzzle service errors.
   */
  const handleClearErrors = () => {
    setPuzzleServiceErrors(null);
  };

  /**
   * Creates a new puzzle.
   *
   * @param {string[][]} pixelArt - The pixel art for the puzzle.
   * @param {string} title - The title of the puzzle.
   * @param {number} size - The size of the puzzle.
   * @returns {Promise<Object>} A promise that resolves to the new puzzle object.
   */
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

  /**
   * Fetches all puzzles from the server.
   *
   * @returns {Promise<void>} A promise that resolves when the puzzles are fetched successfully.
   */
  const getAllPuzzles = async () => {
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

  /**
   * Retrieves a puzzle by its ID.
   *
   * @param {string} puzzleId - The ID of the puzzle to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to the retrieved puzzle.
   */
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

  /**
   * Deletes a puzzle by its ID.
   *
   * @param {string} puzzleId - The ID of the puzzle to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the puzzle is deleted successfully, or rejects with an error if there's an issue.
   */
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

  /**
   * Retrieves the next puzzle ID based on the current puzzle ID.
   *
   * @param {string} currentPuzzleId - The ID of the current puzzle.
   * @returns {string|undefined} The ID of the next puzzle, or undefined if there are no more puzzles.
   */
  const getNextPuzzle = useCallback(
    (currentPuzzleId) => {
      if (!puzzles) return;
      const allPuzzles = puzzles.flatMap((puzzleGroup) => puzzleGroup.puzzles);
      const currentIndex = allPuzzles.indexOf(currentPuzzleId);
      return allPuzzles[currentIndex + 1];
    },
    [puzzles]
  );

  //Fetch all puzzles on mount
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
