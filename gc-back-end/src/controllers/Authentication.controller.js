import bcrypt from "bcrypt";

import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";

export default class AuthenticationController {
  #authenticationService;

  constructor(authenticationService) {
    this.#authenticationService = authenticationService;
  }

  register = async (req, res) => {
    try {
      const newUser = await this.#authenticationService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

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

  signOut = async (_, res) => {
    try {
      res.clearCookie("jwt");
      res.status(204).send();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

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

  requirePassword = async (req, res, next) => {
    try {
      await this.#comparePasswords(req.body.password, req.user?.password);
      next();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  #comparePasswords = async (submittedPassword, savedPassword) => {
    if (!submittedPassword) throw APIErrors.UNAUTHORISED_ERROR;
    if (!savedPassword) throw APIErrors.SERVER_ERROR;
    const doMatch = await bcrypt.compare(submittedPassword, savedPassword);
    if (!doMatch) throw APIErrors.PASSWORD_REVALIDATION_ERROR;
  };

  #validateNoMismatchWithParams = (req) => {
    if (!req.params?.userId) return;
    if (req.params.userId !== req.user._id.toString())
      throw APIErrors.UNAUTHORISED_ERROR;
  };

  #setCookie = (res, token) => {
    res.cookie("jwt", token, {
      maxAge: process.env.COOKIE_EXPIRES_IN,
      secure: true,
      sameSite: "None",
      partitioned: true,
    });
  };

  #handleErrors = (res, err) => {
    let userError = err;
    if (!(err instanceof HTTPError)) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
