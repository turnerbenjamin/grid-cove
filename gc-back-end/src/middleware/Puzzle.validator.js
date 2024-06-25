import * as expressValidator from "express-validator";

export default class PuzzleValidator {
  static validate = () => {
    return [
      expressValidator
        .body("size")
        .exists()
        .trim()
        .notEmpty()
        .withMessage("Size is required"),
      PuzzleValidator.handleValidationErrors,
    ];
  };

  static handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req, {
      strictParams: true,
    });
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  };
}
