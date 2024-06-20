import bcrypt from "bcrypt";

export default class AuthenticationService {
  createUser = async (newUser) => {
    newUser.password = await this.#hash(newUser.password);
  };

  #hash = async (password) => {
    return await bcrypt.hash(password, parseInt(process.env.SALT));
  };
}
