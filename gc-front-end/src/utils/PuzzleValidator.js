export default class PuzzleValidator {
  /**
   * Validates the pixel art and title of a puzzle.
   * @param {Object} puzzle - The puzzle object containing the pixel art and title.
   * @param {string} puzzle.pixelArt - The pixel art string to validate.
   * @param {string} puzzle.title - The title to validate.
   * @returns {Array} - An array containing a boolean indicating if the validation passed and an array of errors (if any).
   */
  static validate({ pixelArt, title }) {
    const errors = [];
    const pixelArtError = PuzzleValidator.validatePixelArtString(pixelArt);
    const titleError = PuzzleValidator.validateTitle(title);
    if (pixelArtError) errors.push(pixelArtError);
    if (titleError) errors.push(titleError);
    return [errors.length === 0, errors];
  }

  /**
   * Validates the title of a puzzle.
   *
   * @param {string} title - The title to be validated.
   * @returns {string|undefined} - Returns an error message if the title is invalid, otherwise returns undefined.
   */
  static validateTitle(title) {
    if (title?.length < 3 || title?.length > 32)
      return "Title must be between 3 and 32 characters";
  }

  /**
   * Validates a pixel art string.
   *
   * @param {string} pixelArtString - The pixel art string to validate.
   * @returns {string|undefined} - Returns an error message if the pixel art is invalid, otherwise undefined.
   */
  static validatePixelArtString(pixelArtString) {
    if (!pixelArtString) return "Pixel art is required";
    const maxOccurrence = Math.floor(pixelArtString.length * 0.9);
    const profile = {};
    for (const char of pixelArtString) {
      profile[char] = (profile[char] || 0) + 1;
      if (profile[char] > maxOccurrence)
        return "Your art may not include a single colour that makes up over 90% of the image";
    }
  }
}
