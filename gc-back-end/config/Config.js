import { config } from "dotenv";
import path from "path";

export default class Config {
  static #environment = process.env.NODE_ENV;
  static #configPath = path.resolve(process.cwd(), "config");
  static #dotEnvFilePaths = {
    production: path.resolve(Config.#configPath, ".env"),
    development: path.resolve(Config.#configPath, ".env.development"),
    testing: path.resolve(Config.#configPath, ".env.testing"),
  };

  static load() {
    config({ path: this.#dotEnvFilePaths[this.#environment] });
  }
}
