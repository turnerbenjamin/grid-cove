import validator from "validator";

export default class FormValidator {
  static validators = {
    username: FormValidator.validateUsername,
    emailAddress: FormValidator.validateEmailAddress,
    password: FormValidator.validatePassword,
    confirmPassword: FormValidator.validateConfirmPassword,
  };

  static isValidated(submission) {
    for (const key in submission) {
      const validator = FormValidator.validators[key];
      if (!validator || !validator(submission[key], submission.password)[0])
        return false;
    }
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

  static validateEmailAddress(emailAddress) {
    if (emailAddress.trim().length === 0)
      return [false, "Email address is required"];
    if (!validator.isEmail(emailAddress))
      return [false, "Email address is invalid"];
    return [true];
  }

  static validatePassword(password) {
    if (password.length < 8)
      return [false, "Password must be at least 8 characters"];
    if (password.length > 32)
      return [false, "Password must be no more than 32 characters"];
    if (!password.match(/\d/))
      return [false, "Password must contain at least one digit"];
    if (!password.match(/[!@#$£%&?]/))
      return [false, "Password must contain at least one special character"];
    return [true];
  }

  static validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) return [false, "Passwords do not match"];
    return [true];
  }
}
