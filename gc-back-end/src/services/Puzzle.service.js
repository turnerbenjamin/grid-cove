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
      if (err.code === 11000) throw APIErrors.DUPLICATE_PIXEL_ART;
      this.#handleErrors(err);
    }
  };

  getPuzzles = async () => {
    try {
      const puzzles = await Puzzle.aggregate([
        {
          $group: {
            _id: "$size",
            puzzles: { $push: "$_id" },
          },
        },
        {
          $project: {
            _id: 0,
            size: "$_id",
            puzzles: 1,
          },
        },
        {
          $sort: { size: 1 },
        },
      ]);
      return puzzles;
    } catch (err) {
      this.#handleErrors(err);
    }
  };

  getPuzzleById = async (puzzleId) => {
    try {
      const puzzle = await Puzzle.findById(puzzleId).populate();
      if (!puzzle) throw APIErrors.PUZZLE_NOT_FOUND;
      return puzzle;
    } catch (err) {
      if (err.name === "CastError") throw APIErrors.INVALID_PUZZLE_ID;
      this.#handleErrors(err);
    }
  };

  #handleErrors(err) {
    if (err instanceof HTTPError) throw err;
    throw APIErrors.SERVER_ERROR;
  }
}
