import axios from "axios";
axios.defaults.withCredentials = true;

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

export const signOut = async () => {
  let url = import.meta.env.VITE_APP_SIGN_OUT_URL;
  try {
    await axios.post(url);
    localStorage.removeItem(`user`);
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};

export const getActiveUser = () => {
  return JSON.parse(localStorage.getItem(`user`));
};
