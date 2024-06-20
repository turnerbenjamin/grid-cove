import HTTPError from "./HTTPError.js";

export default class APIErrors {
  static SERVER_ERROR = new HTTPError(500, "Server error");
}
