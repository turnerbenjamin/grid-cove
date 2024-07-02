import axios from "axios";

import withErrorHandling from "./withErrorHandling";

const puzzlesEndpointRoot = `${import.meta.env.VITE_APP_API_ROOT}/puzzles`;

export const createPuzzle = async (payload) => {
  let url = puzzlesEndpointRoot;
  return await withErrorHandling(async () => {
    const response = await axios.post(url, payload);
    return response.data;
  });
};

export const getPuzzles = async () => {
  let url = puzzlesEndpointRoot;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

export const getPuzzle = async (puzzleId) => {
  let url = `${puzzlesEndpointRoot}/${puzzleId}`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

export const deletePuzzle = async (puzzleId) => {
  let url = `${puzzlesEndpointRoot}/${puzzleId}`;
  return await withErrorHandling(async () => {
    await axios.delete(url);
  });
};
