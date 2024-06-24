import Puzzle from "../models/Puzzle.model.js";
import APIErrors from "../utils/APIErrors.js";
import PuzzleGenerator from "../utils/PuzzleGenerator.js";

export default class PuzzleService {
  createPuzzle = async (pixelArt, title, artist, size) => {
    try {
      const { clues, solution } = PuzzleGenerator.generate(pixelArt, size);
      await Puzzle.create({
        pixelArt,
        title,
        solution,
        clues,
        size,
        artist: artist._id,
      });
    } catch (err) {
      this.#handleErrors(err);
    }
  };

  #handleErrors(err) {
    if (err.code === 11000) throw APIErrors.DUPLICATE_PIXEL_ART;
  }
}
