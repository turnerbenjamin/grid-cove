import HTTPError from "../utils/HTTPError.js";

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
    const puzzles = await this.#puzzleService.getPuzzles();
    res.status(200).json(puzzles);
  };

  #handleErrors = (res, err) => {
    let userError = err;
    if (!err instanceof HTTPError) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
