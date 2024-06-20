import axios from "axios";

export const register = async (newUserSubmission) => {
  let url = import.meta.env.VITE_APP_REGISTRATION_URL;
  try {
    const response = await axios.post(url, newUserSubmission);
    return response.data;
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};
