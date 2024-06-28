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
    this.#initialiseGetPuzzlesRoute();
    this.#initialiseGetPuzzleByIdRoute();
    this.#initialiseDeletePuzzleByIdRoute();
  }

  #initialiseCreatePuzzleRoute() {
    this.#router.post(
      "/",
      this.#authenticationController.requireLoggedIn,
      PuzzleValidator.validate(),
      this.#puzzleController.createPuzzle
    );
  }

  #initialiseGetPuzzlesRoute() {
    this.#router.get("/", this.#puzzleController.getPuzzles);
  }

  #initialiseGetPuzzleByIdRoute() {
    this.#router.get("/:puzzleId", this.#puzzleController.getPuzzleById);
  }

  #initialiseDeletePuzzleByIdRoute() {
    this.#router.delete(
      "/:puzzleId",
      this.#authenticationController.requireLoggedIn,
      this.#authenticationController.requireAdminRole,
      this.#puzzleController.deletePuzzleById
    );
  }

  getRouter() {
    return this.#router;
  }

  getRoot() {
    return this.#root;
  }
}
