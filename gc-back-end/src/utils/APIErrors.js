import HTTPError from "./HTTPError.js";

export default class APIErrors {
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

  static #SERVER_ERROR = new HTTPError(500, "Server error");

  static #UNAUTHORISED_ERROR = new HTTPError(
    401,
    "Incorrect authentication details"
  );

  static #INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION = new HTTPError(
    400,
    "Your art may not include a single colour that makes up over 90% of the image"
  );

  static #INVALID_PUZZLE_SIZE = new HTTPError(
    400,
    "The puzzle size must be a multiple of 5"
  );

  static #INVALID_PIXEL_ART_LENGTH = new HTTPError(
    400,
    "The length of the pixel art string must equal the square of the puzzle size"
  );

  //GETTERS
  static get DUPLICATE_USERNAME() {
    return this.#DUPLICATE_USERNAME;
  }

  static get DUPLICATE_PIXEL_ART() {
    return this.#DUPLICATE_PIXEL_ART;
  }

  static get DUPLICATE_EMAIL_ADDRESS() {
    return this.#DUPLICATE_EMAIL_ADDRESS;
  }

  static get UNAUTHORISED_ERROR() {
    return this.#UNAUTHORISED_ERROR;
  }

  static get INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION() {
    return this.#INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
  }

  static get INVALID_PUZZLE_SIZE() {
    return this.#INVALID_PUZZLE_SIZE;
  }

  static get INVALID_PIXEL_ART_LENGTH() {
    return this.#INVALID_PIXEL_ART_LENGTH;
  }

  static get SERVER_ERROR() {
    return this.#SERVER_ERROR;
  }
}
