import * as expressValidator from "express-validator";

export default class UserValidator {
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

  static #handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req, {
      strictParams: true,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  };

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

  static #validatePropertyExists = (property) => {
    return expressValidator
      .body(property)
      .exists()
      .trim()
      .notEmpty()
      .withMessage(`${property} is required`);
  };

  static #validatePassword = ({ isOptional }) => {
    return expressValidator
      .body("password")
      .optional(isOptional)
      .isLength({ min: 8, max: 32 })
      .withMessage("Password must be 8-32 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a digit")
      .matches(/[!@#$£%&?]/)
      .withMessage("Password must contain a special character");
  };

  static #validateEmailAddress = ({ isOptional }) => {
    return expressValidator
      .body("emailAddress")
      .optional(isOptional)
      .isEmail()
      .withMessage("Email address is invalid");
  };

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
}
