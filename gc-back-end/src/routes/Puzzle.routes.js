import { Router } from "express";

import PuzzleValidator from "../middleware/Puzzle.validator.js";

export default class AuthenticationRoutes {
  #router;
  #root;
  #authenticationController;
  #puzzleController;

  constructor(root, authenticationController, puzzleController) {
    this.#router = Router();
    this.#root = root;
    this.#authenticationController = authenticationController;
    this.#puzzleController = puzzleController;
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.#initialiseCreatePuzzleRoute();
  }

  #initialiseCreatePuzzleRoute() {
    this.#router.post(
      "/",
      this.#authenticationController.requireLoggedIn,
      PuzzleValidator.validate(),
      this.#puzzleController.createPuzzle
    );
  }

  getRouter() {
    return this.#router;
  }

  getRoot() {
    return this.#root;
  }
}
