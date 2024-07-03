import axios from "axios";

import withErrorHandling from "./withErrorHandling";

const puzzlesEndpointRoot = `${import.meta.env.VITE_APP_API_ROOT}/puzzles`;

/**
 * Creates a new puzzle.
 * @param {Object} payload - The payload containing the puzzle data.
 * @returns {Promise<Object>} - A promise that resolves to the response data of the created puzzle.
 */
export const createPuzzle = async (payload) => {
  let url = puzzlesEndpointRoot;
  return await withErrorHandling(async () => {
    const response = await axios.post(url, payload);
    return response.data;
  });
};

/**
 * Retrieves all puzzles from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of puzzles.
 */
export const getPuzzles = async () => {
  let url = puzzlesEndpointRoot;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

/**
 * Retrieves a puzzle from the server by its id.
 *
 * @param {string} puzzleId - The ID of the puzzle to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the puzzle data.
 */
export const getPuzzle = async (puzzleId) => {
  let url = `${puzzlesEndpointRoot}/${puzzleId}`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

/**
 * Deletes a puzzle by its id.
 * @param {string} puzzleId - The ID of the puzzle to delete.
 * @returns {Promise<void>} - A promise that resolves when the puzzle is successfully deleted.
 */
export const deletePuzzle = async (puzzleId) => {
  let url = `${puzzlesEndpointRoot}/${puzzleId}`;
  return await withErrorHandling(async () => {
    await axios.delete(url);
  });
};
