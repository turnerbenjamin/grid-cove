export default class HTTPError extends Error {
  #statusCode;
  #message;
  constructor(statusCode, message) {
    super(message);
    this.#statusCode = statusCode;
  }
  get statusCode() {
    return this.#statusCode;
  }
}
