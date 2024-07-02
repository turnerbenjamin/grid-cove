import Puzzle from "../models/Puzzle.model.js";
import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";
import PuzzleGenerator from "../utils/PuzzleGenerator.js";

export default class PuzzleService {
  /**
   * Creates a puzzle with the given pixel art, title, size, and artist.
   *
   * @param {string[][]} pixelArt - The pixel art for the puzzle.
   * @param {string} title - The title of the puzzle.
   * @param {number} size - The size of the puzzle.
   * @param {object} artist - The artist of the puzzle.
   * @returns {Promise<object>} The created puzzle.
   * @throws {APIErrors.DUPLICATE_PIXEL_ART} If the pixel art already exists.
   */
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

  /**
   * Retrieves all puzzles grouped by size.
   *
   * @returns {Promise<Array<Object>>} An array of objects representing the puzzles grouped by size.
   * Each object contains the size and an array of puzzle IDs.
   * @throws {Error} If an error occurs while retrieving the puzzles.
   */
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

  /**
   * Retrieves a puzzle by its ID.
   *
   * @param {string} puzzleId - The ID of the puzzle to retrieve.
   * @returns {Promise<Object>} The puzzle object.
   * @throws {APIErrors.PUZZLE_NOT_FOUND} If the puzzle is not found.
   * @throws {APIErrors.INVALID_PUZZLE_ID} If the puzzle ID is invalid.
   */
  getPuzzleById = async (puzzleId) => {
    try {
      const puzzle = await Puzzle.findById(puzzleId).populate({
        path: "artist",
        select: "username -_id",
      });
      if (!puzzle) throw APIErrors.PUZZLE_NOT_FOUND;
      return puzzle;
    } catch (err) {
      if (err.name === "CastError") throw APIErrors.INVALID_PUZZLE_ID;
      this.#handleErrors(err);
    }
  };

  /**
   * Deletes a puzzle by its ID.
   *
   * @param {string} puzzleId - The ID of the puzzle to delete.
   * @throws {APIErrors.PUZZLE_NOT_FOUND} If the puzzle with the given ID is not found.
   * @throws {APIErrors.INVALID_PUZZLE_ID} If the provided puzzle ID is invalid.
   */
  deletePuzzleById = async (puzzleId) => {
    try {
      const deletedPuzzle = await Puzzle.findByIdAndDelete(puzzleId);
      if (!deletedPuzzle) throw APIErrors.PUZZLE_NOT_FOUND;
    } catch (err) {
      if (err.name === "CastError") throw APIErrors.INVALID_PUZZLE_ID;
      this.#handleErrors(err);
    }
  };

  //Error handler for all PuzzleService methods
  #handleErrors(err) {
    if (err instanceof HTTPError) throw err;
    throw APIErrors.SERVER_ERROR;
  }
}
