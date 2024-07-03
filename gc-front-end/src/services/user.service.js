import axios from "axios";

import withErrorHandling from "./withErrorHandling";

axios.defaults.withCredentials = true;

const usersEndpointRoot = `${import.meta.env.VITE_APP_API_ROOT}/users`;

/**
 * Updates a user by their id.
 *
 * @param {string} userToUpdateId - The ID of the user to update.
 * @param {object} updates - The updates to apply to the user.
 * @returns {Promise<object>} - A promise that resolves to the updated user object.
 */
export const updateUser = async (userToUpdateId, updates) => {
  const url = `${usersEndpointRoot}/${userToUpdateId}`;
  return await withErrorHandling(async () => {
    const response = await axios.patch(url, updates);
    localStorage.setItem(`user`, JSON.stringify(response.data));
    return response.data;
  });
};
