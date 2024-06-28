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
      next();
    } catch (err) {
      this.#handleErrors(res, err);
    }
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
    if (!err.statusCode) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
