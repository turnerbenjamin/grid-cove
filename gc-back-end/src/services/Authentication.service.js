import bcrypt from "bcrypt";

import APIErrors from "../utils/APIErrors.js";
import User from "../models/User.model.js";

export default class AuthenticationService {
  createUser = async (newUser) => {
    try {
      newUser.password = await this.#hash(newUser.password);
      await User.create(newUser);
    } catch (err) {
      throw APIErrors.SERVER_ERROR;
    }
  };

  #hash = async (password) => {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  };
}
