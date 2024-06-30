import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  updatePassword = async (userToUpdateId, updatedPassword) => {
    try {
      const hashedUpdatedPassword = await this.#hash(updatedPassword);
      const updatedUser = await User.findByIdAndUpdate(
        userToUpdateId,
        {
          password: hashedUpdatedPassword,
        },
        { new: true }
      );
      if (!updatedUser) throw APIErrors.SERVER_ERROR;
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
      const token = this.#getToken(userDocument);
      return { token, user: this.#formatUserDocument(userDocument) };
    } catch (err) {
      this.#handleError(err);
    }
  };

  validateToken = async (token) => {
    try {
      const decodedToken = this.#decodeToken(token);
      const userDocument = await User.findById(decodedToken._id).select(
        "+password"
      );
      if (!userDocument) throw APIErrors.UNAUTHORISED_ERROR;
      return userDocument;
    } catch (err) {
      if (err instanceof HTTPError) throw err;
      throw APIErrors.SERVER_ERROR;
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

  #getToken = (userDocument) => {
    const token = jwt.sign(
      { _id: userDocument._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    return token;
  };

  #decodeToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      throw APIErrors.UNAUTHORISED_ERROR;
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
