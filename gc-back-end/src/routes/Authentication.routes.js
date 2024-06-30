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
    this.#initialiseSignInRoute();
    this.#initialiseSignOutRoute();
    this.#initialiseUpdatePasswordRoute();
  }

  #initialiseRegisterRoute() {
    this.#router.post(
      "/register",
      UserValidator.validateRegistrationSubmission(),
      this.#authenticationController.register
    );
  }

  #initialiseSignInRoute() {
    this.#router.post("/sign-in", this.#authenticationController.signIn);
  }

  #initialiseSignOutRoute() {
    this.#router.post("/sign-out", this.#authenticationController.signOut);
  }

  #initialiseUpdatePasswordRoute() {
    this.#router.patch(
      "/update-password",
      this.#authenticationController.requireLoggedIn,
      this.#authenticationController.requirePassword,
      UserValidator.validateUpdatePasswordSubmission(),
      this.#authenticationController.updatePassword
    );
  }

  getRouter() {
    return this.#router;
  }

  getRoot() {
    return this.#root;
  }
}
