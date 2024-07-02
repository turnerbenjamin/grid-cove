import * as expressValidator from "express-validator";

export default class UserValidator {
  /**
   * Validates registration submission data.
   *
   * This method performs a series of validations and sanitization on the registration submission data.
   * It checks for the existence of required properties (username, emailAddress, password), validates
   * the format of the username, emailAddress, and password, and sanitizes the body of the request based
   * on a whitelist.
   *
   * @returns {Array} An array of middleware functions that perform the validations and sanitization.
   */
  static validateRegistrationSubmission = () => {
    return [
      this.#validatePropertyExists("username"),
      this.#validateUsername({ isOptional: false }),
      this.#validatePropertyExists("emailAddress"),
      this.#validateEmailAddress({ isOptional: false }),
      this.#validatePropertyExists("password"),
      this.#validatePassword({ isOptional: false }),
      this.#sanitiseBody({
        whitelist: ["username", "emailAddress", "password"],
      }),
      UserValidator.#handleValidationErrors,
    ];
  };

  /**
   * Validates update user submission.
   *
   * This method performs a series of validations and sanitization on the update user submission, validates
   * these fields where provided and throws errors where blacklisted fields (password and roles) are in the body
   *
   * @returns {Array} An array of middleware functions that perform the validations and sanitization.
   */
  static validateUpdateUserSubmission = () => {
    return [
      this.#validateBodyIncludesOneOf(["username", "emailAddress"]),
      this.#sanitiseBody({
        whitelist: ["username", "emailAddress"],
        blacklist: ["password", "roles"],
      }),
      this.#validateUsername({ isOptional: true }),
      this.#validateEmailAddress({ isOptional: true }),
      UserValidator.#handleValidationErrors,
    ];
  };

  /**
   * Validates the update password submission.
   *
   * It ensures that the updatedPassword property exists and validates its value
   *
   * @returns {Array} An array of middleware functions that perform the validation and error handling steps.
   */
  static validateUpdatePasswordSubmission = () => {
    return [
      this.#validatePropertyExists("updatedPassword"),
      this.#validatePassword({
        isOptional: true,
        propertyName: "updatedPassword",
      }),
      UserValidator.#handleValidationErrors,
    ];
  };

  //Validate that at least one of the enumerated properties exists on the body
  //else throws an error
  static #validateBodyIncludesOneOf = (properties) => {
    return expressValidator.body().custom((body) => {
      for (const property of properties) {
        if (body.hasOwnProperty(property)) return true;
      }
      throw new Error(
        `At least on of the following must be provided: ${properties.join(
          ", "
        )}`
      );
    });
  };

  //Validate that the give property exists on the body
  static #validatePropertyExists = (property) => {
    return expressValidator
      .body(property)
      .exists()
      .trim()
      .notEmpty()
      .withMessage(`${property} is required`);
  };

  //Validate that the password field is between 8 and 32 characters long and
  //contains at least one digit and special character
  static #validatePassword = ({ isOptional, propertyName }) => {
    return expressValidator
      .body(propertyName || "password")
      .optional(isOptional)
      .isLength({ min: 8, max: 32 })
      .withMessage("Password must be 8-32 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a digit")
      .matches(/[!@#$£%&?]/)
      .withMessage("Password must contain a special character");
  };

  //Validates that the provided email address is correctly formatted
  static #validateEmailAddress = ({ isOptional }) => {
    return expressValidator
      .body("emailAddress")
      .optional(isOptional)
      .isEmail()
      .withMessage("Email address is invalid");
  };

  //Validates that the provided username is between 8 and 24 chars and contains
  //only lowercase letters, digits and hyphens
  static #validateUsername = ({ isOptional }) => {
    return expressValidator
      .body("username")
      .optional(isOptional)
      .isLength({ min: 8, max: 24 })
      .withMessage("Username must be between 8 and 24 characters")
      .matches(/^[a-z0-9-]*$/)
      .withMessage(
        "Username must contain only digits, lowercase letters or a hyphen"
      );
  };

  //Ensures that only whitelisted fields are present in the body. If a blacklist is
  //provided, the presence of a blacklisted property in the body will lead to an error
  static #sanitiseBody = ({ whitelist, blacklist }) => {
    return (req, res, next) => {
      const sanitisedBody = {};

      for (const validProperty of whitelist) {
        if (!req.body[validProperty]) continue;
        sanitisedBody[validProperty] = req.body[validProperty];
      }
      if (blacklist)
        this.#checkBodyForBlacklistedProperties(req.body, blacklist, res);
      req.body = sanitisedBody;
      next();
    };
  };

  //Check the body for blacklisted properties and throw an error where thy are found
  static #checkBodyForBlacklistedProperties = (body, blacklist, res) => {
    for (const invalidProperty of blacklist) {
      if (body.hasOwnProperty(invalidProperty))
        return res
          .status(400)
          .json(
            `You are not permitted to provide ${invalidProperty} on this route`
          );
    }
  };

  //Error handler for the User validator
  static #handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req, {
      strictParams: true,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  };
}
