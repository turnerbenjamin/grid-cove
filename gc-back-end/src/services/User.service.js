import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";
import User from "../models/User.model.js";

export default class UserService {
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

  #handleError = (err) => {
    if (err instanceof HTTPError) throw err;
    if (err.code === 11000) {
      if (err.keyPattern?.emailAddress) throw APIErrors.DUPLICATE_EMAIL_ADDRESS;
      if (err.keyPattern?.username) throw APIErrors.DUPLICATE_USERNAME;
    }
    throw APIErrors.SERVER_ERROR;
  };
}
