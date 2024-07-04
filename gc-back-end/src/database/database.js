import mongoose from "mongoose";

export default class Database {
  #uri;
  #server;

  /**
   * Constructs a new instance of the database connection handler.
   * @param {string} uri - The MongoDB URI to connect to.
   */
  constructor(uri, server) {
    this.#uri = uri;
    this.#server = server;
  }

  /**
   * Connects to the MongoDB database using the URI provided during instantiation.
   * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
   */
  async connect() {
    try {
      await mongoose.connect(this.#uri);
      console.log(`Connected to database`);
    } catch (error) {
      console.error("Database connection error");
      this.#server.close();
    }
  }

  /**
   * Closes the connection to the MongoDB database.
   * @returns {Promise<void>} A promise that resolves when the connection is successfully closed.
   */
  async close() {
    await mongoose.disconnect();
  }
}
