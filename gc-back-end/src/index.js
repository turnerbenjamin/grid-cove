import express from "express";

import AuthenticationController from "./controllers/Authentication.controller.js";
import AuthenticationRoutes from "./routes/Authentication.routes.js";
import AuthenticationService from "./services/Authentication.service.js";
import Config from "../config/Config.js";
import Database from "./database/database.js";
import Server from "./server/Server.js";

Config.load();

//?Initialise services
const authenticationService = new AuthenticationService();

//?Initialise controllers
const authenticationController = new AuthenticationController(
  authenticationService
);

//?Initialise routes
const authenticationRoutes = new AuthenticationRoutes(
  "/authentication",
  authenticationController
);

//?Start server
const { PORT, HOST, DB_URI } = process.env;
const app = express();
const server = new Server(PORT, HOST, app, [authenticationRoutes]);

server.start();

//?Connect to database
const database = new Database(DB_URI);
await database.connect();
