import axios from "axios";
import withErrorHandling from "./withErrorHandling";
axios.defaults.withCredentials = true;

const authenticationEndpointRoot = `${
  import.meta.env.VITE_APP_API_ROOT
}/authentication`;

export const register = async (newUserSubmission) => {
  let url = `${authenticationEndpointRoot}/register`;
  return await withErrorHandling(async () => {
    const response = await axios.post(url, newUserSubmission);
    return response.data;
  });
};

export const signIn = async (userCredentials) => {
  let url = `${authenticationEndpointRoot}/sign-in`;
  return await withErrorHandling(async () => {
    const response = await axios.post(url, userCredentials);
    localStorage.setItem(`user`, JSON.stringify(response.data));
    return response.data;
  });
};

export const signOut = async () => {
  let url = `${authenticationEndpointRoot}/sign-out`;
  return await withErrorHandling(async () => {
    await axios.post(url);
    localStorage.removeItem(`user`);
  });
};

export const updatePassword = async (payload) => {
  let url = `${authenticationEndpointRoot}/update-password`;
  return await withErrorHandling(async () => {
    const response = await axios.patch(url, payload);
    localStorage.removeItem(`user`);
    return response.data;
  });
};

export const getActiveUser = () => {
  return JSON.parse(localStorage.getItem(`user`));
};
