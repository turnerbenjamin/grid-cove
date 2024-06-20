import * as expressValidator from "express-validator";

export default class UserValidator {
  static validateRegistrationSubmission = () => {
    return [
      expressValidator
        .body("username")
        .exists()
        .trim()
        .notEmpty()
        .withMessage("Username must be provided"),
      UserValidator.handleValidationErrors,
    ];
  };

  static handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  };
}
