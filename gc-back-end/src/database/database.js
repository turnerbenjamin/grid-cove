import mongoose from "mongoose";

export default class Database {
  #uri;

  /**
   * Constructs a new instance of the database connection handler.
   * @param {string} uri - The MongoDB URI to connect to.
   */
  constructor(uri) {
    this.#uri = uri;
  }

  /**
   * Connects to the MongoDB database using the URI provided during instantiation.
   * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
   */
  async connect() {
    try {
      await mongoose.connect(this.#uri);
      if (process.env.NODE_ENV === "testing") return;
      console.log(`Connected to database`);
    } catch (error) {
      console.error("Database connection error", error);
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
