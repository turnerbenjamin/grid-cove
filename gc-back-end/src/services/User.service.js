import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";
import User from "../models/User.model.js";

export default class UserService {
  /**
   * Updates a user by their ID with the provided updates.
   *
   * @param {string} userToUpdateId - The ID of the user to update.
   * @param {Object} updates - The updates to apply to the user.
   * @returns {Promise<Object>} - A promise that resolves to the updated user.
   */
  updateById = async (userToUpdateId, updates) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userToUpdateId,
        updates,
        { new: true }
      );
      if (!updatedUser) throw APIErrors.SERVER_ERROR;
      return updatedUser;
    } catch (err) {
      this.#handleError(err);
    }
  };

  //Error handler for all UserService methods
  #handleError = (err) => {
    if (err instanceof HTTPError) throw err;
    if (err.code === 11000) {
      if (err.keyPattern?.emailAddress) throw APIErrors.DUPLICATE_EMAIL_ADDRESS;
      if (err.keyPattern?.username) throw APIErrors.DUPLICATE_USERNAME;
    }
    throw APIErrors.SERVER_ERROR;
  };
}
