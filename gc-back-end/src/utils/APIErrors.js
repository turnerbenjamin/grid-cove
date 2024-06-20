import HTTPError from "./HTTPError.js";

export default class APIErrors {
  static #DUPLICATE_USERNAME = new HTTPError(
    400,
    "A user with this username already exists"
  );
  static #DUPLICATE_EMAIL_ADDRESS = new HTTPError(
    400,
    "A user with this email address already exists"
  );
  static #SERVER_ERROR = new HTTPError(500, "Server error");

  //GETTERS
  static get DUPLICATE_USERNAME() {
    return this.#DUPLICATE_USERNAME;
  }

  static get DUPLICATE_EMAIL_ADDRESS() {
    return this.#DUPLICATE_EMAIL_ADDRESS;
  }

  static get SERVER_ERROR() {
    return this.#SERVER_ERROR;
  }
}
