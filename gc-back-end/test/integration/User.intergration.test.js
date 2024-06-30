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
import APIErrors from "../../src/utils/APIErrors.js";

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
    const userNotToUpdate = usersInDatabase[1];
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

    //? INT13-2
    it("should respond with a status of 200 for a successful request where username only is updated", async () => {
      //Arrange
      testUpdates = { username: testUpdates.username };
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal(testUpdates.username);
    });

    //? INT13-3
    it("should respond with a status of 200 for a successful request where email address only is updated", async () => {
      //Arrange
      testUpdates = { emailAddress: testUpdates.emailAddress };
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(200);
      expect(response.body.emailAddress).to.equal(testUpdates.emailAddress);
    });

    //? INT13-4
    it("should respond with the updated user document without the password for a successful request", async () => {
      //Arrange
      const expected = {
        ...userToUpdate,
        username: testUpdates.username,
        emailAddress: testUpdates.emailAddress,
      };
      delete expected.password;
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      delete response.body.__v;
      //Assert
      expect(response.body).to.deep.equal(expected);
    });

    //? INT13-5
    it("should respond with a 401 status code if not req.cookies.jwt", async () => {
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(401);
    });

    //? INT13-6
    it("should respond with a 401 status code if invalid req.cookies.jwt", async () => {
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", "invalidJWT")
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(401);
    });

    //? INT13-7
    it("should respond with a 401 status code if user id in req.cookie does not match req.params.userId", async () => {
      //Act
      const response = await request
        .patch(updateUserEndpoint(userNotToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(401);
    });

    //? INT13-8
    it("should respond with a 400 response if an email address is provided which is a duplicate", async () => {
      //Arrange
      testUpdates.emailAddress = userNotToUpdate.emailAddress;
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
      expect(response.body).to.equal(APIErrors.DUPLICATE_EMAIL_ADDRESS.message);
    });

    //? INT13-9
    it("should respond with a 400 response if a username is provided which is a duplicate", async () => {
      //Arrange
      testUpdates.username = userNotToUpdate.username;
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
      expect(response.body).to.equal(APIErrors.DUPLICATE_USERNAME.message);
    });

    //? INT13-10
    it("should respond with a 400 response if neither username nor password are provided", async () => {
      //Arrange
      testUpdates = {};
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-11
    it("should respond with a status of 400 if req.body includes password", async () => {
      //Arrange
      testUpdates.password = "new-password";
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-12
    it("should respond with a status of 400 if req.body includes roles", async () => {
      //Arrange
      testUpdates.roles = ["user", "admin"];
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-13
    it("should respond with a 400 response if a username is provided and it is too short", async () => {
      //Arrange
      testUpdates.username = "x".repeat(7);
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-14
    it("should respond with a 400 response if a username is provided and it is too long", async () => {
      //Arrange
      testUpdates.username = "x".repeat(25);
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-15
    it("should respond with a 400 response if a username is provided and it is contains invalid characters", async () => {
      //Arrange
      testUpdates.username = "invalid username";
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-16
    it("should respond with a 400 response if an email address is provided and it is invalid", async () => {
      //Arrange
      testUpdates.emailAddress = "invalid.email.com";
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT13-17
    it("should respond with a 500 response if findByIdAndUpdate rejects", async () => {
      //Arrange
      const findByIdAndUpdateStub = sinon.stub(User, "findByIdAndUpdate");
      findByIdAndUpdateStub.rejects();
      //Act
      const response = await request
        .patch(updateUserEndpoint(userToUpdate._id))
        .set("Cookie", userToUpdateAccessToken)
        .send(testUpdates);
      findByIdAndUpdateStub.restore();
      //Assert
      expect(response.status).to.equal(500);
      expect(response.body).to.equal(APIErrors.SERVER_ERROR.message);
    });
  });
});
