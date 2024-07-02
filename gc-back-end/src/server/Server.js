import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

export default class Server {
  #app;
  #host;
  #port;
  #server;
  #routes;

  /**
   * Represents a server instance.
   * @constructor
   * @param {number} port - The port number for the server.
   * @param {string} host - The host address for the server.
   * @param {object} app - The Express app instance.
   * @param {object} routes - The routes object containing the server routes.
   */
  constructor(port, host, app, routes) {
    this.#app = app;
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#routes = routes;
  }

  /**
   * Starts the server by initializing the app middleware, routes, and listening on the specified host and port.
   */
  start() {
    this.#initialiseAppMiddleware();
    this.#initialiseRoutes();
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      if (process.env.NODE_ENV === "testing") return;
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
      console.log(`Server is listening on http://${this.#host}:${this.#port}`);
    });
  }

  /**
   * Closes the server.
   */
  close() {
    this.#server?.close();
  }

  //Initializes the global middleware for the app.
  #initialiseAppMiddleware = () => {
    this.#app.use(express.json());
    this.#app.use(cookieParser());
    this.#app.use(
      cors({
        credentials: true,
        origin: [process.env.REACT_APP_ORIGIN],
      })
    );
  };

  //Initializes the routes by adding them to the app instance.
  #initialiseRoutes = () => {
    this.#routes.forEach((route) => {
      this.#app.use(route.getRoot(), route.getRouter());
    });
  };
}
