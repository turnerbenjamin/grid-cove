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
