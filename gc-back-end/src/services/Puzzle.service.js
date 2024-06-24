import PuzzleGenerator from "../utils/PuzzleGenerator.js";

export default class PuzzleService {
  createPuzzle = async (pixelArt, title, author, size) => {
    PuzzleGenerator.generate(pixelArt, size);
  };
}
