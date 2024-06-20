import bcrypt from "bcrypt";

import APIErrors from "../utils/APIErrors.js";
import User from "../models/User.model.js";

export default class AuthenticationService {
  createUser = async (newUser) => {
    try {
      newUser.password = await this.#hash(newUser.password);
      await User.create(newUser);
    } catch (err) {
      this.#handleError(err);
    }
  };

  #handleError = (err) => {
    if (err.code === 11000) {
      if (err.keyPattern?.username) throw APIErrors.DUPLICATE_USERNAME;
    }
    throw APIErrors.SERVER_ERROR;
  };

  #hash = async (password) => {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  };
}
