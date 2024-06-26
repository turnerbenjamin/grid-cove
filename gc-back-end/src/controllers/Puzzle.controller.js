import HTTPError from "../utils/HTTPError.js";
import APIErrors from "../utils/APIErrors.js";

export default class PuzzleController {
  #puzzleService;

  constructor(puzzleService) {
    this.#puzzleService = puzzleService;
  }

  createPuzzle = async (req, res) => {
    try {
      const puzzleDocument = await this.#puzzleService.createPuzzle(
        req.body.pixelArt,
        req.body.title,
        req.body.size,
        req.user
      );
      res.status(201).json(puzzleDocument);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  getPuzzles = async (_, res) => {
    try {
      const puzzles = await this.#puzzleService.getPuzzles();
      res.status(200).json(puzzles);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  getPuzzleById = async (req, res) => {
    this.#puzzleService.getPuzzleById(req?.params?.puzzleId);
    res.status(200);
  };

  #handleErrors = (res, err) => {
    let userError = err;
    if (!(err instanceof HTTPError)) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
