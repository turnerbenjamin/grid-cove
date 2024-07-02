import * as expressValidator from "express-validator";

export default class PuzzleValidator {
  /**
   * Validates the puzzle input data.
   * @returns {Array} An array of validation chain instances.
   */
  static validate = () => {
    return [
      PuzzleValidator.#validateSize(),
      PuzzleValidator.#validatePixelArt(),
      PuzzleValidator.#validateTitle(),
      PuzzleValidator.#handleValidationErrors,
    ];
  };

  //Checks that size property exists, is between 5 and 15, and is a multiple of 5
  static #validateSize() {
    return expressValidator
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
      });
  }

  //Validates pixelArt property to ensure that it exists and has a length equal to the square of size
  static #validatePixelArt() {
    return expressValidator
      .body("pixelArt")
      .exists()
      .trim()
      .notEmpty()
      .withMessage("pixel art is required")
      .custom((value, { req }) => {
        if (value.length !== parseInt(req?.body?.size) ** 2)
          throw new Error("Pixel art length must be the square of size");
        return true;
      });
  }

  //Validates title property to ensure that it exists and has a length between 3 and 32 chars
  static #validateTitle() {
    return expressValidator
      .body("title")
      .exists()
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 32 })
      .withMessage("Title must be between 3 and 32 characters long");
  }

  //Error handler for the puzzle validator
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
