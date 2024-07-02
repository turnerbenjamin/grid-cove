import { Router } from "express";

import UserValidator from "../middleware/User.validator.js";

export default class AuthenticationRoutes {
  #router;
  #root;
  #authenticationController;

  /**
   * Constructs a new instance of the AuthenticationRoutes class.
   * @param {string} root - The root path of this router.
   * @param {AuthenticationController} authenticationController - The authentication controller.
   */
  constructor(root, authenticationController) {
    this.#router = Router();
    this.#root = root;
    this.#authenticationController = authenticationController;
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
    this.#initialiseRegisterRoute();
    this.#initialiseSignInRoute();
    this.#initialiseSignOutRoute();
    this.#initialiseUpdatePasswordRoute();
  }

  //Initializes the POST route for registering a user.
  #initialiseRegisterRoute() {
    this.#router.post(
      "/register",
      UserValidator.validateRegistrationSubmission(),
      this.#authenticationController.register
    );
  }

  //Initializes the POST route for signing-in a user.
  #initialiseSignInRoute() {
    this.#router.post("/sign-in", this.#authenticationController.signIn);
  }

  //Initializes the POST route for signing-out a user.
  #initialiseSignOutRoute() {
    this.#router.post("/sign-out", this.#authenticationController.signOut);
  }

  //This method sets up the PATCH route for updating the user's password.
  //A valid authentication token is required
  //The user must provide their current password to be revalidated
  #initialiseUpdatePasswordRoute() {
    this.#router.patch(
      "/update-password",
      this.#authenticationController.requireLoggedIn,
      this.#authenticationController.requirePassword,
      UserValidator.validateUpdatePasswordSubmission(),
      this.#authenticationController.updatePassword
    );
  }
}
