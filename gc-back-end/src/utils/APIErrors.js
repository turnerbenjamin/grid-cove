import HTTPError from "./HTTPError.js";

export default class APIErrors {
  //? 400 Errors
  static #DUPLICATE_USERNAME = new HTTPError(
    400,
    "This username has been taken"
  );
  static #DUPLICATE_EMAIL_ADDRESS = new HTTPError(
    400,
    "This email address has been taken"
  );
  static #DUPLICATE_PIXEL_ART = new HTTPError(
    400,
    "This pixel art has been saved previously"
  );
  static #INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION = new HTTPError(
    400,
    "Your art may not include a single colour that makes up over 90% of the image"
  );
  static #INVALID_PUZZLE_ID = new HTTPError(400, "The puzzle id is invalid");

  //? 401 Errors
  static #UNAUTHORISED_ERROR = new HTTPError(
    401,
    "Incorrect authentication details"
  );

  //? 403 Errors
  static #ADMIN_ROLE_REQUIRED_ERROR = new HTTPError(
    403,
    "An admin permission is required to access this resource"
  );
  static #PASSWORD_REVALIDATION_ERROR = new HTTPError(
    403,
    "The password provided is incorrect"
  );

  //? 404 Errors
  static #PUZZLE_NOT_FOUND = new HTTPError(404, "Puzzle not found");

  //? 500 Errors
  static #SERVER_ERROR = new HTTPError(500, "Server error");

  /**
   * @returns {HTTPError} The HTTP error for a duplicate username.
   */
  static get DUPLICATE_USERNAME() {
    return this.#DUPLICATE_USERNAME;
  }

  /**
   * @returns {HTTPError} The HTTP error for duplicate pixel art.
   */
  static get DUPLICATE_PIXEL_ART() {
    return this.#DUPLICATE_PIXEL_ART;
  }

  /**
   * @returns {HTTPError} The HTTP error for duplicate email address art.
   */
  static get DUPLICATE_EMAIL_ADDRESS() {
    return this.#DUPLICATE_EMAIL_ADDRESS;
  }

  /**
   * @returns {HTTPError} The HTTP error for a 401 unauthorised error.
   */
  static get UNAUTHORISED_ERROR() {
    return this.#UNAUTHORISED_ERROR;
  }

  /**
   * @returns {HTTPError} The HTTP error for a admin role required error.
   */
  static get ADMIN_ROLE_REQUIRED_ERROR() {
    return this.#ADMIN_ROLE_REQUIRED_ERROR;
  }

  /**
   * @returns {HTTPError} The HTTP error for a password revalidation error.
   */
  static get PASSWORD_REVALIDATION_ERROR() {
    return this.#PASSWORD_REVALIDATION_ERROR;
  }

  /**
   * @returns {HTTPError} The HTTP error for a puzzle not found error.
   */
  static get PUZZLE_NOT_FOUND() {
    return this.#PUZZLE_NOT_FOUND;
  }

  /**
   * @returns {HTTPError} The HTTP error for an invalid pixel art distribution error.
   */
  static get INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION() {
    return this.#INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
  }

  /**
   * @returns {HTTPError} The HTTP error for an invalid puzzle id error.
   */
  static get INVALID_PUZZLE_ID() {
    return this.#INVALID_PUZZLE_ID;
  }

  /**
   * @returns {HTTPError} The HTTP error for a server error.
   */
  static get SERVER_ERROR() {
    return this.#SERVER_ERROR;
  }
}
