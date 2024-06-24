import Puzzle from "../models/Puzzle.model.js";
import PuzzleGenerator from "../utils/PuzzleGenerator.js";

export default class PuzzleService {
  createPuzzle = async (pixelArt, title, artist, size) => {
    const { clues, solution } = PuzzleGenerator.generate(pixelArt, size);
    await Puzzle.create({
      pixelArt,
      title,
      solution,
      clues,
      size,
      artist: artist._id,
    });
  };
}
