import bcrypt from "bcrypt";

import APIErrors from "../utils/APIErrors.js";
import User from "../models/User.model.js";
import HTTPError from "../utils/HTTPError.js";

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

  signInUser = async (userCredentials) => {
    try {
      const userDocument = await User.findOne({
        emailAddress: userCredentials.emailAddress,
      }).select("+password");
      await this.#verifyUser(userCredentials, userDocument);
    } catch (err) {
      this.#handleError(err);
    }
  };

  #verifyUser = async (userCredentials, userDocument) => {
    if (!userDocument) throw APIErrors.UNAUTHORISED_ERROR;
    const validated = await bcrypt.compare(
      userCredentials.password,
      userDocument.password
    );
    if (!validated) throw APIErrors.UNAUTHORISED_ERROR;
  };

  #handleError = (err) => {
    if (err instanceof HTTPError) throw err;
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
