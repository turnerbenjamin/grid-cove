import HTTPError from "../utils/HTTPError.js";

export default class PuzzleController {
  #puzzleService;

  constructor(puzzleService) {
    this.#puzzleService = puzzleService;
  }

  createPuzzle = async (req, res) => {
    try {
      await this.#puzzleService.createPuzzle(
        req.body.pixelArt,
        req.body.title,
        req.body.size,
        req.user
      );
      res.status(201);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  #handleErrors = (res, err) => {
    let userError = err;
    if (!err instanceof HTTPError) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
