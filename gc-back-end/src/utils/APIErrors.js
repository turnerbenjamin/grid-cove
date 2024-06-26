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

  static #INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION = new HTTPError(
    400,
    "Your art may not include a single colour that makes up over 90% of the image"
  );

  static #UNAUTHORISED_ERROR = new HTTPError(
    401,
    "Incorrect authentication details"
  );

  static #PUZZLE_NOT_FOUND = new HTTPError(404, "Puzzle not found");

  static #SERVER_ERROR = new HTTPError(500, "Server error");

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

  static get PUZZLE_NOT_FOUND() {
    return this.#PUZZLE_NOT_FOUND;
  }

  static get INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION() {
    return this.#INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
  }

  static get SERVER_ERROR() {
    return this.#SERVER_ERROR;
  }
}
