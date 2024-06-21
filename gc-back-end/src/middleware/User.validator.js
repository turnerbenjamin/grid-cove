import * as expressValidator from "express-validator";

export default class UserValidator {
  static validateRegistrationSubmission = () => {
    return [
      expressValidator
        .body("username")
        .exists()
        .trim()
        .notEmpty()
        .withMessage("Username must be provided")
        .isLength({ min: 8, max: 24 })
        .withMessage("Username must be between 8 and 24 characters")
        .matches(/^[a-z0-9-]*$/)
        .withMessage(
          "Username must contain only digits, lowercase letters or a hyphen"
        ),
      expressValidator
        .body("emailAddress")
        .exists()
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Email address is invalid"),
      expressValidator
        .body("password")
        .exists()
        .trim()
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password is invalid"),
      UserValidator.handleValidationErrors,
    ];
  };

  static handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req, {
      strictParams: true,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    this.#stripInvalidProperties(req);
    next();
  };

  static #stripInvalidProperties = (req) => {
    req.body = {
      username: req.body.username,
      emailAddress: req.body.emailAddress,
      password: req.body.password,
    };
  };
}
