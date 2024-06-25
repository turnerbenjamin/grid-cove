export default class PuzzleValidator {
  static validate({ pixelArt, title }) {
    const errors = [];
    const pixelArtError = PuzzleValidator.validatePixelArtString(pixelArt);
    const titleError = PuzzleValidator.validateTitle(title);
    if (pixelArtError) errors.push(pixelArtError);
    if (titleError) errors.push(titleError);
    return [errors.length === 0, errors];
  }

  static validateTitle(title) {
    if (title?.length < 3 || title?.length > 32)
      return "Title must be between 3 and 32 characters";
  }

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
