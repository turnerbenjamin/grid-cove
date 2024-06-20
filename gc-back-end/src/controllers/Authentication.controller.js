export default class AuthenticationController {
  #authenticationService;

  constructor(authenticationService) {
    this.#authenticationService = authenticationService;
  }

  register = async (req, res) => {
    const newUser = await this.#authenticationService.createUser(req.body);
    res.status(201).json(newUser);
  };
}
