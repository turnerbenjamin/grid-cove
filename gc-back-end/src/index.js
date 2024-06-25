import express from "express";

import AuthenticationController from "./controllers/Authentication.controller.js";
import AuthenticationRoutes from "./routes/Authentication.routes.js";
import AuthenticationService from "./services/Authentication.service.js";
import Config from "../config/Config.js";
import Database from "./database/database.js";
import PuzzleController from "./controllers/Puzzle.controller.js";
import PuzzleRoutes from "./routes/Puzzle.routes.js";
import PuzzleService from "./services/Puzzle.service.js";
import Server from "./server/Server.js";

Config.load();

//?Initialise services
const authenticationService = new AuthenticationService();
const puzzleService = new PuzzleService();

//?Initialise controllers
const authenticationController = new AuthenticationController(
  authenticationService
);
const puzzleController = new PuzzleController(puzzleService);

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

//?Start server
const { PORT, HOST, DB_URI } = process.env;
const app = express();
const server = new Server(PORT, HOST, app, [
  authenticationRoutes,
  puzzleRoutes,
]);

server.start();

//?Connect to database
const database = new Database(DB_URI);
await database.connect();
