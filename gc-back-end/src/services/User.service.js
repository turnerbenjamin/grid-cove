import APIErrors from "../utils/APIErrors.js";
import User from "../models/User.model.js";

export default class UserService {
  updateById = async (userToUpdateId, updates) => {
    try {
      await User.findByIdAndUpdate(userToUpdateId, updates);
    } catch (err) {
      this.#handleError(err);
    }
  };

  #handleError = (err) => {
    if (err.code === 11000) {
      if (err.keyPattern?.emailAddress) throw APIErrors.DUPLICATE_EMAIL_ADDRESS;
    }
    throw APIErrors.SERVER_ERROR;
  };
}
