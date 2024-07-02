import { Router } from "express";

import PuzzleValidator from "../middleware/Puzzle.validator.js";

export default class PuzzleRoutes {
  #router;
  #root;
  #authenticationController;
  #puzzleController;

  /**
   * Constructs a new instance of the PuzzleRoutes class.
   * @constructor
   * @param {string} root - The root path of the router.
   * @param {AuthenticationController} authenticationController - The authentication controller.
   * @param {PuzzleController} puzzleController - The puzzle controller.
   */
  constructor(root, authenticationController, puzzleController) {
    this.#router = Router();
    this.#root = root;
    this.#authenticationController = authenticationController;
    this.#puzzleController = puzzleController;
    this.#initialiseRoutes();
  }

  /**
   * Get the router instance.
   * @returns {Router} The router instance.
   */
  getRouter() {
    return this.#router;
  }

  /**
   * Get the root path of this router
   * @returns {string} The root path of this router.
   */
  getRoot() {
    return this.#root;
  }

  //Initialises all routes for this router
  #initialiseRoutes() {
    this.#initialiseCreatePuzzleRoute();
    this.#initialiseGetPuzzlesRoute();
    this.#initialiseGetPuzzleByIdRoute();
    this.#initialiseDeletePuzzleByIdRoute();
  }

  //Initializes the POST route for creating a puzzle.
  //A valid authentication token is required
  #initialiseCreatePuzzleRoute() {
    this.#router.post(
      "/",
      this.#authenticationController.requireLoggedIn,
      PuzzleValidator.validate(),
      this.#puzzleController.createPuzzle
    );
  }

  //Initializes the GET route for getting all puzzles
  #initialiseGetPuzzlesRoute() {
    this.#router.get("/", this.#puzzleController.getPuzzles);
  }

  //Initializes the GET route for getting a puzzle by its id
  #initialiseGetPuzzleByIdRoute() {
    this.#router.get("/:puzzleId", this.#puzzleController.getPuzzleById);
  }

  //Initializes the DELETE route for deleting a puzzle by its id
  //A valid authentication token is required
  //Am admin role is required
  #initialiseDeletePuzzleByIdRoute() {
    this.#router.delete(
      "/:puzzleId",
      this.#authenticationController.requireLoggedIn,
      this.#authenticationController.requireAdminRole,
      this.#puzzleController.deletePuzzleById
    );
  }
}
