import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";
import User from "../models/User.model.js";

export default class AuthenticationService {
  /**
   * Creates a new user.
   * @param {Object} newUser - The user object containing the user details.
   * @returns {Promise<Object>} The formatted user document.
   */
  createUser = async (newUser) => {
    try {
      newUser.password = await this.#hash(newUser.password);
      const newUserDocument = await User.create(newUser);
      return this.#formatUserDocument(newUserDocument);
    } catch (err) {
      this.#handleError(err);
    }
  };

  /**
   * Updates the password for a user.
   *
   * @param {string} userToUpdateId - The ID of the user to update.
   * @param {string} updatedPassword - The updated password.
   * @returns {Promise<Object>} The updated user document.
   * @throws {APIErrors.SERVER_ERROR} If there is an error updating the user's password.
   */
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
      return this.#formatUserDocument(updatedUser);
    } catch (err) {
      this.#handleError(err);
    }
  };

  /**
   * Sign in a user with the provided user credentials.
   *
   * @param {Object} userCredentials - The user credentials object.
   * @param {string} userCredentials.emailAddress - The email address of the user.
   * @param {string} userCredentials.password - The user's password.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the token and user information.
   * @throws {Error} - If an error occurs during the sign-in process.
   */
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

  /**
   * Validates a token and returns the corresponding user document.
   *
   * @param {string} token - The token to be validated.
   * @returns {Promise<object>} - The user document associated with the token.
   * @throws {HTTPError} - If the token is invalid or expired.
   * @throws {APIErrors.SERVER_ERROR} - If an unexpected error occurs.
   */
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

  /**
   * Verifies the user credentials against the user document.
   * Throws an error if the user document is not found or if the credentials are invalid.
   *
   * @param {Object} userCredentials - The user credentials to verify.
   * @param {string} userCredentials.password - The user's password.
   * @param {Object} userDocument - The user document to compare the credentials against.
   * @throws {APIErrors.UNAUTHORISED_ERROR} - If the user document is not found or if the credentials are invalid.
   */
  #verifyUser = async (userCredentials, userDocument) => {
    if (!userDocument) throw APIErrors.UNAUTHORISED_ERROR;
    const validated = await bcrypt.compare(
      userCredentials.password,
      userDocument.password
    );
    if (!validated) throw APIErrors.UNAUTHORISED_ERROR;
  };

  /**
   * Generates a JSON Web Token (JWT) for the given user document.
   *
   * @param {Object} userDocument - The user document containing the _id field.
   * @returns {string} The generated JWT.
   */
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

  //Decodes a JWT token using the secret key.
  #decodeToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      throw APIErrors.UNAUTHORISED_ERROR;
    }
  };

  //Returns a hashed password
  #hash = async (password) => {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  };

  //Formats a user document, essentially whitelisting _id, username,
  //emailAddress and roles
  #formatUserDocument = (userDocument) => {
    return {
      _id: userDocument._id,
      username: userDocument.username,
      emailAddress: userDocument.emailAddress,
      roles: userDocument.roles,
    };
  };

  //Error handler for all service methods
  #handleError = (err) => {
    if (err instanceof HTTPError) throw err;
    if (err.code === 11000) {
      if (err.keyPattern?.emailAddress) throw APIErrors.DUPLICATE_EMAIL_ADDRESS;
      if (err.keyPattern?.username) throw APIErrors.DUPLICATE_USERNAME;
    }
    throw APIErrors.SERVER_ERROR;
  };
}
