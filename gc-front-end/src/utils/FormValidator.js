export default class FormValidator {
  static isValidated() {
    return true;
  }
  static validateUsername(username) {
    if (username.length < 8)
      return [false, "Username must be at least 8 characters"];
    if (username.length > 24)
      return [false, "Username must be no more than 24 characters"];
  }
}
