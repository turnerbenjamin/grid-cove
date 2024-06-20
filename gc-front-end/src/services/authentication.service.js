import axios from "axios";

export const register = async (newUserSubmission) => {
  let url = import.meta.env.VITE_APP_REGISTRATION_URL;
  try {
    await axios.post(url, newUserSubmission);
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};
