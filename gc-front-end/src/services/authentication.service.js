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

export const signIn = async (userCredentials) => {
  let url = import.meta.env.VITE_APP_SIGN_IN_URL;
  try {
    const response = await axios.post(url, userCredentials);
    localStorage.setItem(`user`, JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};
