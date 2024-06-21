export default class FormValidator {
  static isValidated() {
    return true;
  }
  static validateUsername(username) {
    if (username.length < 8)
      return [false, "Username must be at least 8 characters"];
    if (username.length > 24)
      return [false, "Username must be no more than 24 characters"];
    if (!username.match(/^[a-z0-9-]*$/))
      return [
        false,
        "Username may only contain lowercase letters, digits and hyphens",
      ];
    return [true];
  }
}
