import { expect } from "chai";
import express from "express";
import supertest from "supertest";

import AuthenticationController from "../../src/controllers/Authentication.controller.js";
import AuthenticationRoutes from "../../src/routes/Authentication.routes.js";
import AuthenticationService from "../../src/services/Authentication.service.js";
import Database from "../../src/database/database.js";
import Server from "../../src/server/Server.js";
import * as userTestData from "../data/User.test.data.js";
import User from "../../src/models/User.model.js";

describe("Authentication integration tests: ", () => {
  let server;
  let database;
  let request;

  before(async () => {
    const authenticationService = new AuthenticationService();
    const authenticationController = new AuthenticationController(
      authenticationService
    );
    const authenticationRoutes = new AuthenticationRoutes(
      "/authentication",
      authenticationController
    );

    const { PORT, HOST, DB_URI } = process.env;
    const app = express();

    server = new Server(PORT, HOST, app, [authenticationRoutes]);
    database = new Database(DB_URI);
    await database.connect();
    server.start();
    request = supertest(app);
  });

  after(async () => {
    await server.close();
    await database.close();
  });

  describe("Registration route test", () => {
    const userInDatabase = userTestData.submissions[0];
    const userToAdd = userTestData.submissions[1];
    const registerEndpoint = "/authentication/register";
    beforeEach(async () => {
      await User.create(userInDatabase);
    });

    beforeEach(async () => {
      await User.deleteMany();
    });

    //? INT1-1
    it("should respond with a 201 status code with valid request", async () => {
      //Act
      const response = await request.post(registerEndpoint).send(userToAdd);
      //Assert
      expect(response.status).to.equal(201);
    });

    //? INT1-2
    it("should return the new user's details without the password", async () => {
      const response = await request.post(registerEndpoint).send(userToAdd);
      //Assert
      expect(response.body.password).to.equal(undefined);
      expect(response.body.username).to.equal(userToAdd.username);
      expect(response.body.emailAddress).to.equal(userToAdd.emailAddress);
      expect(response.body._id).to.exist;
    });
  });
});
