import Puzzle from "../models/Puzzle.model.js";
import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";
import PuzzleGenerator from "../utils/PuzzleGenerator.js";

export default class PuzzleService {
  createPuzzle = async (pixelArt, title, size, artist) => {
    try {
      const { clues, solution } = PuzzleGenerator.generate(pixelArt, size);
      const puzzle = await Puzzle.create({
        pixelArt,
        title,
        solution,
        clues,
        size,
        artist: artist._id,
      });
      return puzzle;
    } catch (err) {
      this.#handleErrors(err);
    }
  };

  getPuzzles = async () => {
    const puzzles = await Puzzle.aggregate();
    return puzzles;
  };

  #handleErrors(err) {
    if (err.code === 11000) throw APIErrors.DUPLICATE_PIXEL_ART;
    if (err instanceof HTTPError) throw err;
    throw APIErrors.SERVER_ERROR;
  }
}
