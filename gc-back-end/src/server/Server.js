import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

export default class Server {
  #app;
  #host;
  #port;
  #server;
  #routes;

  constructor(port, host, app, routes) {
    this.#app = app;
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#routes = routes;
  }

  start() {
    this.#initialiseAppMiddleware();
    this.#initialiseRoutes();
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
      console.log(`Server is listening on http://${this.#host}:${this.#port}`);
    });
  }

  close() {
    this.#server?.close();
  }

  #initialiseAppMiddleware = () => {
    this.#app.use(express.json());
    this.#app.use(cookieParser());
    this.#app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:5173"],
      })
    );
  };

  #initialiseRoutes = () => {
    this.#routes.forEach((route) => {
      this.#app.use(route.getRoot(), route.getRouter());
    });
  };
}
