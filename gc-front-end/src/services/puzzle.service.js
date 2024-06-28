import axios from "axios";

export const createPuzzle = async (payload) => {
  let url = import.meta.env.VITE_APP_CREATE_PUZZLE_URL;
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};

export const getPuzzles = async () => {
  let url = import.meta.env.VITE_APP_GET_PUZZLES_URL;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};

export const getPuzzle = async (puzzleId) => {
  let url = import.meta.env.VITE_APP_GET_PUZZLES_URL;
  try {
    const response = await axios.get(`${url}/${puzzleId}`);
    return response.data;
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};

export const deletePuzzle = async (puzzleId) => {
  let url = import.meta.env.VITE_APP_DELETE_PUZZLES_URL;
  try {
    await axios.delete(`${url}/${puzzleId}`);
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};
