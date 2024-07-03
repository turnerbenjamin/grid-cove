import bcrypt from "bcrypt";

import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";

export default class AuthenticationController {
  #authenticationService;

  /**
   * Constructs a new AuthenticationController instance.
   * @param {Object} authenticationService - The service handling authentication logic.
   */
  constructor(authenticationService) {
    this.#authenticationService = authenticationService;
  }

  /**
   * Registers a new user.
   * Handles the HTTP POST request to register a new user.
   * @param {Object} req - The HTTP request object, containing the user's registration details in the body.
   * @param {Object} res - The HTTP response object used to respond to the client.
   */
  register = async (req, res) => {
    try {
      const newUser = await this.#authenticationService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Updates the password for an existing user.
   * Handles the HTTP POST request to update a user's password.
   * Note: This method relies on the requireLoggedIn middleware being run first
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object used to respond to the client.
   */
  updatePassword = async (req, res) => {
    try {
      const updatedUser = await this.#authenticationService.updatePassword(
        req.user._id,
        req.body.updatedPassword
      );
      res.clearCookie("jwt");
      res.status(200).json(updatedUser);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Signs in a user.
   *
   * This method authenticates a user based on the request body, sets a cookie with the authentication token,
   * and returns the user's information in the response.
   *
   * @param {Object} req - The request object, containing the user's credentials.
   * @param {Object} res - The response object used to send back the HTTP response.
   */
  signIn = async (req, res) => {
    try {
      const { token, user } = await this.#authenticationService.signInUser(
        req.body
      );
      this.#setCookie(res, token);
      res.status(200).json(user);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Signs out a user.
   *
   * This method clears the authentication cookie named 'jwt' from the user's browser, effectively signing
   * the user out.
   *
   * @param {Object} _ - The request object. Not used in this method, hence the underscore.
   * @param {Object} res - The response object used to send back the HTTP response.
   */
  signOut = async (_, res) => {
    try {
      res.clearCookie("jwt");
      res.status(204).send();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Middleware to ensure the user is logged in by checking for a JWT in the cookies.
   * If the JWT is present, it validates the token and sets the user in the request object.
   * If the JWT is not present or invalid, it throws an unauthorized error.
   *
   * Note: This method relies on the requireLoggedIn middleware being run first
   *
   * @param {Object} req - The request object, expected to contain cookies with a JWT.
   * @param {Object} res - The response object used to send back the HTTP response.
   * @param {Function} next - The next middleware function in the call stack.
   * @throws {APIErrors.UNAUTHORISED_ERROR} If the JWT is not present or invalid.
   */
  requireLoggedIn = async (req, res, next) => {
    try {
      if (!req?.cookies?.jwt) throw APIErrors.UNAUTHORISED_ERROR;
      req.user = await this.#authenticationService.validateToken(
        req.cookies.jwt
      );
      this.#validateNoMismatchWithParams(req);
      next();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Middleware to ensure the user has an 'admin' role.
   * It checks if the user object in the request has roles that include 'admin'.
   * If the user does not have an 'admin' role, it throws an admin role required error.
   *
   * Note: This method relies on the requireLoggedIn middleware being run first
   *
   * @param {Object} req - The request object from Express.js. Expected to contain a user object with roles.
   * @param {Object} res - The response object from Express.js.
   * @param {Function} next - The next middleware function in the Express.js call stack.
   * @throws {APIErrors.ADMIN_ROLE_REQUIRED_ERROR} If the user does not have an 'admin' role.
   */
  requireAdminRole = async (req, res, next) => {
    try {
      if (!req.user) throw APIErrors.SERVER_ERROR;
      if (!req.user.roles.includes("admin"))
        throw APIErrors.ADMIN_ROLE_REQUIRED_ERROR;
      next();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Middleware to ensure the provided password matches the user's password.
   * It compares the password provided in the request body with the user's stored password.
   * If the passwords do not match, it throws an error.
   *
   * Note: This method relies on the requireLoggedIn middleware being run first
   *
   * @param {Object} req - The request object, expected to contain a body with a password, and a user object.
   * @param {Object} res - The response object from Express.js.
   * @param {Function} next - The next middleware function in the Express.js call stack.
   * @throws {Error} If the passwords do not match.
   */
  requirePassword = async (req, res, next) => {
    try {
      await this.#comparePasswords(req.body.password, req.user?.password);
      next();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  //Compares the submitted password with that in req.user. Throws an appropriate
  //error
  #comparePasswords = async (submittedPassword, savedPassword) => {
    if (!submittedPassword) throw APIErrors.UNAUTHORISED_ERROR;
    if (!savedPassword) throw APIErrors.SERVER_ERROR;
    const doMatch = await bcrypt.compare(submittedPassword, savedPassword);
    if (!doMatch) throw APIErrors.PASSWORD_REVALIDATION_ERROR;
  };

  //Compares the userId param with the _id property in req.user.
  //This method relies on the requireLoggedIn middleware being run first
  #validateNoMismatchWithParams = (req) => {
    if (!req.params?.userId) return;
    if (req.params.userId !== req.user._id.toString())
      throw APIErrors.UNAUTHORISED_ERROR;
  };

  //Set a JWT cookie with the provided token as its value
  #setCookie = (res, token) => {
    res.cookie("jwt", token, {
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN),
      secure: true,
      sameSite: "None",
      partitioned: true,
    });
  };

  //Error handler for all controllers
  #handleErrors = (res, err) => {
    let userError = err;
    if (!(err instanceof HTTPError)) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
