import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";

export default class UserController {
  #userService;

  /**
   * Constructs a UserController instance.
   * @param {Object} userService - The service responsible for user operations.
   */
  constructor(userService) {
    this.#userService = userService;
  }

  /**
   * Updates a user by their ID.
   * @param {Object} req - The HTTP request object, containing the user's ID in `req.user._id` and the update data in `req.body`.
   * @param {Object} res - The HTTP response object used to send back the updated user data or an error message.
   */
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

  //Error handler for all controllers
  #handleErrors = (res, err) => {
    let userError = err;
    if (!(err instanceof HTTPError)) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
