import * as expressValidator from "express-validator";

export default class PuzzleValidator {
  static validate = () => {
    return [
      expressValidator
        .body("size")
        .exists()
        .trim()
        .notEmpty()
        .withMessage("Size is required")
        .isInt({ min: 5, max: 15 })
        .withMessage("Size must be between 5 and 15")
        .custom((value) => {
          if (value % 5 !== 0) throw new Error("Size must be a multiple of 5");
          return true;
        }),
      expressValidator
        .body("pixelArt")
        .exists()
        .trim()
        .notEmpty()
        .withMessage("pixel art is required")
        .custom((value, { req }) => {
          if (value.length !== parseInt(req?.body?.size) ** 2)
            throw new Error("Pixel art length must be the square of size");
          return true;
        }),
      expressValidator
        .body("title")
        .exists()
        .trim()
        .notEmpty()
        .withMessage("Title is required"),
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
