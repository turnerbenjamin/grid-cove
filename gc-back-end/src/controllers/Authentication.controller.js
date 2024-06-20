export default class AuthenticationController {
  #authenticationService;

  constructor(authenticationService) {
    this.#authenticationService = authenticationService;
  }

  register = async (req) => {
    await this.#authenticationService.createUser(req.body);
  };
}
