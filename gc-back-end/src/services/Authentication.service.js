import bcrypt from "bcrypt";

import APIErrors from "../utils/APIErrors.js";
import User from "../models/User.model.js";

export default class AuthenticationService {
  createUser = async (newUser) => {
    try {
      newUser.password = await this.#hash(newUser.password);
      const newUserDocument = await User.create(newUser);
      return this.#formatUserDocument(newUserDocument);
    } catch (err) {
      this.#handleError(err);
    }
  };

  #handleError = (err) => {
    if (err.code === 11000) {
      if (err.keyPattern?.emailAddress) throw APIErrors.DUPLICATE_EMAIL_ADDRESS;
      if (err.keyPattern?.username) throw APIErrors.DUPLICATE_USERNAME;
    }
    throw APIErrors.SERVER_ERROR;
  };

  #hash = async (password) => {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  };

  #formatUserDocument = (userDocument) => {
    return {
      _id: userDocument._id,
      username: userDocument.username,
      emailAddress: userDocument.emailAddress,
      roles: userDocument.roles,
    };
  };
}
