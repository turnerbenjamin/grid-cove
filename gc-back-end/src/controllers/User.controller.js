import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";

export default class UserController {
  #userService;

  constructor(userService) {
    this.#userService = userService;
  }

  updateById = async (req, res) => {
    try {
      const updatedUser = await this.#userService.updateById(
        req.user._id,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  #handleErrors = (res, err) => {
    let userError = err;
    if (!(err instanceof HTTPError)) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
