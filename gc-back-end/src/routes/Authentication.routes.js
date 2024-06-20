import { Router } from "express";

export default class AuthenticationRoutes {
  #router;
  #root;
  #authenticationController;

  constructor(root, authenticationController) {
    this.#router = Router();
    this.#root = root;
    this.#authenticationController = authenticationController;
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.#initialiseRegisterRoute();
  }

  #initialiseRegisterRoute() {
    this.#router.post("/register", this.#authenticationController.register);
  }

  getRouter() {
    return this.#router;
  }

  getRoot() {
    return this.#root;
  }
}
