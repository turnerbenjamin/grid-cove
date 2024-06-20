import { Router } from "express";

import UserValidator from "../middleware/User.validator.js";

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
    this.#router.post(
      "/register",
      UserValidator.validateRegistrationSubmission(),
      this.#authenticationController.register
    );
  }

  getRouter() {
    return this.#router;
  }

  getRoot() {
    return this.#root;
  }
}
