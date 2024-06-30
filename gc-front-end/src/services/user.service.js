import axios from "axios";
axios.defaults.withCredentials = true;

export const updateUser = async (userToUpdateId, updates) => {
  const url = `${import.meta.env.VITE_APP_UPDATE_USER_URL}/${userToUpdateId}`;
  try {
    const response = await axios.patch(url, updates);
    localStorage.setItem(`user`, JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    throw err?.response?.data ?? err;
  }
};
