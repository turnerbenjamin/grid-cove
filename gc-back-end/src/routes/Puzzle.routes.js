import { Router } from "express";

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
