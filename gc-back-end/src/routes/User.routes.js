import { Router } from "express";

export default class UserRoutes {
  #router;
  #root;
  #authenticationController;
  #userController;

  constructor(root, authenticationController, userController) {
    this.#router = Router();
    this.#root = root;
    this.#authenticationController = authenticationController;
    this.#userController = userController;
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.#UpdateUserByIdRoute();
  }

  #UpdateUserByIdRoute() {
    this.#router.patch(
      "/:userId",
      this.#authenticationController.requireLoggedIn,
      this.#userController.updateById
    );
  }

  getRouter() {
    return this.#router;
  }

  getRoot() {
    return this.#root;
  }
}
