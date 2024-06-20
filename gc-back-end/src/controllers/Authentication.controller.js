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

  #handleErrors = (res, err) => {
    let userError = err;
    if (!err.statusCode) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
