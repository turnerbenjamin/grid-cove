export default class UserController {
  #userService;

  constructor(userService) {
    this.#userService = userService;
  }

  updateById = async (req, res) => {
    const updatedUser = await this.#userService.updateById(
      req.user._id,
      req.body
    );
    return updatedUser;
  };
}
