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
  static #SERVER_ERROR = new HTTPError(500, "Server error");

  static #UNAUTHORISED_ERROR = new HTTPError(
    401,
    "Incorrect authentication details"
  );

  //GETTERS
  static get DUPLICATE_USERNAME() {
    return this.#DUPLICATE_USERNAME;
  }

  static get DUPLICATE_EMAIL_ADDRESS() {
    return this.#DUPLICATE_EMAIL_ADDRESS;
  }

  static get UNAUTHORISED_ERROR() {
    return this.#UNAUTHORISED_ERROR;
  }

  static get SERVER_ERROR() {
    return this.#SERVER_ERROR;
  }
}
