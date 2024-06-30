import { expect } from "chai";
import express from "express";
import sinon from "sinon";
import supertest from "supertest";

import AuthenticationController from "../../src/controllers/Authentication.controller.js";
import AuthenticationService from "../../src/services/Authentication.service.js";
import Database from "../../src/database/database.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";
import UserController from "../../src/controllers/User.controller.js";
import UserRoutes from "../../src/routes/User.routes.js";
import UserService from "../../src/services/User.service.js";

import * as userTestData from "../data/User.test.data.js";
import AuthenticationRoutes from "../../src/routes/Authentication.routes.js";

describe("User integration tests: ", () => {
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
    const userService = new UserService();
    const userController = new UserController(userService);
    const userRoutes = new UserRoutes(
      "/users",
      authenticationController,
      userController
    );

    const { PORT, HOST, DB_URI } = process.env;
    const app = express();

    server = new Server(PORT, HOST, app, [authenticationRoutes, userRoutes]);
    database = new Database(DB_URI);
    await database.connect();
    server.start();
    request = supertest(app);
  });

  after(async () => {
    await server.close();
    await database.close();
  });

  describe("Update route test", () => {
    const usersInDatabase = [
      userTestData.documents[0],
      userTestData.documents[1],
    ];
    const userToUpdate = usersInDatabase[0];
    let userToUpdateAccessToken;
    const updateUserEndpoint = (id) => `/users/${id}`;
    let testUpdates;

    before(async () => {
      await User.insertMany(usersInDatabase);
      let response = await request
        .post("/authentication/sign-in")
        .send(userTestData.submissions[0]);
      userToUpdateAccessToken = response.header["set-cookie"][0];
    });

    after(async () => {
      await User.deleteMany();
    });

    beforeEach(() => {
      testUpdates = {
        emailAddress: "new@emailaddress.com",
        username: "new-username",
      };
    });

    afterEach(async () => {
      await User.findByIdAndUpdate(userToUpdate._id, userToUpdate);
    });

    //? INT13-1
    it("should respond with a status of 200 for a successful request where username and email updated", async () => {
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(200);
    });
  });
});