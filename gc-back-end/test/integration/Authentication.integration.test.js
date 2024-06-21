import { expect } from "chai";
import express from "express";
import sinon from "sinon";
import supertest from "supertest";

import AuthenticationController from "../../src/controllers/Authentication.controller.js";
import AuthenticationRoutes from "../../src/routes/Authentication.routes.js";
import AuthenticationService from "../../src/services/Authentication.service.js";
import Database from "../../src/database/database.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";
import * as userTestData from "../data/User.test.data.js";

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

    afterEach(async () => {
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

    //? INT1-3
    it("should respond with a 400 response if the username is missing", async () => {
      const userToAddWithMissingUsername = { ...userToAdd, username: null };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithMissingUsername);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-4
    it("should respond with a 400 response if the username is too short", async () => {
      const userToAddWithInvalidUsername = {
        ...userToAdd,
        username: "x".repeat(7),
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidUsername);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-5
    it("should respond with a 400 response if the username is too long", async () => {
      const userToAddWithInvalidUsername = {
        ...userToAdd,
        username: "x".repeat(25),
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidUsername);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-6
    it("should respond with a 400 response if the username contains invalid characters", async () => {
      const userToAddWithInvalidUsername = {
        ...userToAdd,
        username: "invalid username",
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidUsername);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-7
    it("should respond with a 400 response if the email address missing", async () => {
      const userToAddWithMissingEmailAddress = {
        ...userToAdd,
        emailAddress: null,
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithMissingEmailAddress);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-8
    it("should respond with a 400 response if the email address is invalid", async () => {
      const userToAddWithInvalidEmailAddress = {
        ...userToAdd,
        emailAddress: "invalid.email.com",
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidEmailAddress);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-9
    it("should respond with a 400 response if the password is missing", async () => {
      const userToAddWithMissingPassword = {
        ...userToAdd,
        password: null,
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithMissingPassword);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT2-1
    it("should respond with a 400 response if the password is less than 8 characters", async () => {
      const userToAddWithInvalidPassword = {
        ...userToAdd,
        password: "xxxxx1$",
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidPassword);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT2-2
    it("should respond with a 400 response if the password is more than 32 characters", async () => {
      const userToAddWithInvalidPassword = {
        ...userToAdd,
        password: "x".repeat(31) + "1$",
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidPassword);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT2-3
    it("should respond with a 400 response if the password does not contain at least one digit", async () => {
      const userToAddWithInvalidPassword = {
        ...userToAdd,
        password: "x".repeat(8) + "$",
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidPassword);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT2-4
    it("should respond with a 400 response if the password does not contain at least one special character", async () => {
      const userToAddWithInvalidPassword = {
        ...userToAdd,
        password: "x".repeat(8) + "1",
      };
      const response = await request
        .post(registerEndpoint)
        .send(userToAddWithInvalidPassword);
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-10
    it("should not allows users to define their roles", async () => {
      const createStub = sinon.stub(User, "create");
      const userWithRolesSet = {
        ...userToAdd,
        roles: ["admin"],
      };
      await request.post(registerEndpoint).send(userWithRolesSet);
      const [newUserArg] = createStub.getCall(0)?.args ?? [];
      createStub.restore();
      //Assert
      expect(newUserArg.roles).to.equal(undefined);
    });

    //? INT1-11
    it("should respond with a 400 response if the email address is duplicated", async () => {
      //Arrange
      await User.create(userInDatabase);
      //Act
      const response = await request.post(registerEndpoint).send({
        ...userToAdd,
        emailAddress: userInDatabase.emailAddress,
      });
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-12
    it("should respond with a 400 response if the username is duplicated", async () => {
      //Arrange
      await User.create(userInDatabase);
      //Act
      const response = await request.post(registerEndpoint).send({
        ...userToAdd,
        username: userInDatabase.username,
      });
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT1-13
    it("should respond with a 500 response if create fails", async () => {
      //Arrange
      const createStub = sinon.stub(User, "create");
      createStub.rejects();
      //Act
      const response = await request.post(registerEndpoint).send({
        ...userToAdd,
        username: userInDatabase.username,
      });
      createStub.restore();
      //Assert
      expect(response.status).to.equal(500);
    });

    //? INT1-14
    it("should create the user in the database", async () => {
      //Act
      await request.post(registerEndpoint).send(userToAdd);
      const response = await User.findOne({
        emailAddress: userToAdd.emailAddress,
      });
      //Assert
      expect(response?.username).to.equal(userToAdd.username);
    });

    //? INT1-15
    it("should not include password field in response", async () => {
      //Act
      const response = await request.post(registerEndpoint).send(userToAdd);
      //Assert
      expect(response.body.password).to.equal(undefined);
    });
  });

  describe("SignIn route test", () => {
    const userToSignIn = userTestData.submissions[0];
    const signInEndpoint = "/authentication/sign-in";

    before(async () => {
      await User.create(userTestData.documents[0]);
    });

    //? INT3-1
    it("should respond with a 200 status code with valid request", async () => {
      //Act
      const response = await request.post(signInEndpoint).send(userToSignIn);
      //Assert
      expect(response.status).to.equal(200);
    });

    //? INT3-2
    it("should include the correct user details, without the password, in the response body", async () => {
      //Arrange
      const expected = userTestData.documents[0];
      expected._id = expected._id.toString();
      delete expected.password;
      //Act
      const response = await request.post(signInEndpoint).send(userToSignIn);
      //Assert
      expect(response.body).to.deep.equal(expected);
    });

    //? INT3-4
    it("should have a header to set JWT in success response", async () => {
      //Act
      const response = await request.post(signInEndpoint).send(userToSignIn);
      //Assert
      expect(response.header["set-cookie"][0].startsWith("jwt=")).to.equal(
        true
      );
    });
  });
});
