import HTTPError from "./HTTPError.js";

export default class APIErrors {
  static DUPLICATE_USERNAME = new HTTPError(
    400,
    "A user with this username already exists"
  );
  static SERVER_ERROR = new HTTPError(500, "Server error");
}
