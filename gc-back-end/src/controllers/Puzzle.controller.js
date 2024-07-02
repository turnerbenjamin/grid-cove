import APIErrors from "../utils/APIErrors.js";
import HTTPError from "../utils/HTTPError.js";

export default class PuzzleController {
  #puzzleService;

  /**
   * Constructs a PuzzleController instance with a given puzzleService.
   * @param {Object} puzzleService - The service responsible for puzzle operations.
   */
  constructor(puzzleService) {
    this.#puzzleService = puzzleService;
  }

  /**
   * Creates a new puzzle with the provided details in the request body and associates it with the current user.
   * Responds with the created puzzle document or an error message.
   * @async
   * @param {Object} req - The HTTP request object, containing the puzzle details.
   * @param {Object} res - The HTTP response object used to respond to the client.
   */
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

  /**
   * Retrieves all puzzles and sends them in the response.
   * @async
   * @param {Object} _ - The request object. Not used in this method, hence the underscore.
   * @param {Object} res - The HTTP response object used to send back the retrieved puzzles or an error.
   */
  getPuzzles = async (_, res) => {
    try {
      const puzzles = await this.#puzzleService.getPuzzles();
      res.status(200).json(puzzles);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Retrieves a specific puzzle by its ID provided in the request parameters.
   * Responds with the found puzzle or an error message.
   * @async
   * @param {Object} req - The HTTP request object, containing the puzzle ID in the parameters.
   * @param {Object} res - The HTTP response object used to send back the found puzzle or an error.
   */
  getPuzzleById = async (req, res) => {
    try {
      const puzzle = await this.#puzzleService.getPuzzleById(
        req?.params?.puzzleId
      );
      res.status(200).json(puzzle);
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  /**
   * Deletes a specific puzzle by its ID provided in the request parameters.
   * Responds with a 204 status code on successful deletion or an error message.
   * @async
   * @param {Object} req - The HTTP request object, containing the puzzle ID in the parameters.
   * @param {Object} res - The HTTP response object used to indicate successful deletion or an error.
   */
  deletePuzzleById = async (req, res) => {
    try {
      await this.#puzzleService.deletePuzzleById(req?.params?.puzzleId);
      res.status(204).json();
    } catch (err) {
      this.#handleErrors(res, err);
    }
  };

  //Error handler for all controllers
  #handleErrors = (res, err) => {
    let userError = err;
    if (!(err instanceof HTTPError)) userError = APIErrors.SERVER_ERROR;
    res.status(userError.statusCode).json(userError.message);
  };
}
