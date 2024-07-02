import { Router } from "express";

import UserValidator from "../middleware/User.validator.js";

export default class UserRoutes {
  #router;
  #root;
  #authenticationController;
  #userController;

  /**
   * Constructs a new instance of the UserRoutes class.
   * @constructor
   * @param {string} root - The root path of the router.
   * @param {AuthenticationController} authenticationController - The authentication controller.
   * @param {UserController} userController - The user controller.
   */
  constructor(root, authenticationController, userController) {
    this.#router = Router();
    this.#root = root;
    this.#authenticationController = authenticationController;
    this.#userController = userController;
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
    this.#initialiseUpdateUserByIdRoute();
  }

  //Initializes the PATCH route for updating a user's data.
  //A valid authentication token is required
  #initialiseUpdateUserByIdRoute() {
    this.#router.patch(
      "/:userId",
      this.#authenticationController.requireLoggedIn,
      UserValidator.validateUpdateUserSubmission(),
      this.#userController.updateById
    );
  }
}
