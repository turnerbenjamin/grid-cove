import express from "express";

import AuthenticationController from "./controllers/Authentication.controller.js";
import AuthenticationRoutes from "./routes/Authentication.routes.js";
import AuthenticationService from "./services/Authentication.service.js";
import Config from "../config/Config.js";
import Database from "./database/database.js";
import PuzzleController from "./controllers/Puzzle.controller.js";
import PuzzleRoutes from "./routes/Puzzle.routes.js";
import PuzzleService from "./services/Puzzle.service.js";
import UserController from "./controllers/User.controller.js";
import UserRoutes from "./routes/User.routes.js";
import UserService from "./services/User.service.js";
import Server from "./server/Server.js";

Config.load();

//?Initialise services
const authenticationService = new AuthenticationService();
const puzzleService = new PuzzleService();
const userService = new UserService();

//?Initialise controllers
const authenticationController = new AuthenticationController(
  authenticationService
);
const puzzleController = new PuzzleController(puzzleService);
const userController = new UserController(userService);

//?Initialise routes
const authenticationRoutes = new AuthenticationRoutes(
  "/authentication",
  authenticationController
);
const puzzleRoutes = new PuzzleRoutes(
  "/puzzles",
  authenticationController,
  puzzleController
);
const userRoutes = new UserRoutes(
  "/users",
  authenticationController,
  userController
);

//?Start server
const { PORT, HOST, DB_URI } = process.env;
const app = express();
const server = new Server(PORT, HOST, app, [
  authenticationRoutes,
  userRoutes,
  puzzleRoutes,
]);

server.start();

//?Connect to database
const database = new Database(DB_URI, server);
await database.connect();
