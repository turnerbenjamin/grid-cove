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
import APIErrors from "../../src/utils/APIErrors.js";

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

    after(async () => {
      await User.deleteMany();
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
      const expected = { ...userTestData.documents[0] };
      expected._id = expected._id.toString();
      delete expected.password;
      //Act
      const response = await request.post(signInEndpoint).send(userToSignIn);
      //Assert
      expect(response.body).to.deep.equal(expected);
    });

    //? INT3-3
    it("should have a header to set JWT in success response", async () => {
      //Act
      const response = await request.post(signInEndpoint).send(userToSignIn);
      //Assert
      expect(response.header["set-cookie"][0].startsWith("jwt=")).to.equal(
        true
      );
    });

    //? INT3-4
    it("should respond with a 401 response if email address is not found", async () => {
      //Act
      const response = await request
        .post(signInEndpoint)
        .send(userTestData.submissions[1]);
      //Assert
      expect(response.status).to.equal(401);
    });

    //? INT3-5
    it("should respond with a 401 response if passwords do not match", async () => {
      //Act
      const response = await request
        .post(signInEndpoint)
        .send({ ...userToSignIn, password: "wrong-password12$" });
      //Assert
      expect(response.status).to.equal(401);
    });

    //? INT3-6
    it("should respond with a 500 response if findOne and select fails", async () => {
      //Arrange
      const stub = sinon.stub(User, "findOne");
      stub.rejects();
      //Act
      const response = await request.post(signInEndpoint).send(userToSignIn);
      stub.restore();
      //Assert
      expect(response.status).to.equal(500);
    });
  });

  describe("Sign out route tests: ", () => {
    const signOutEndpoint = "/authentication/sign-out";

    //? INT4-1
    it("should respond with a 204 status code with valid request", async () => {
      //Act
      const response = await request.post(signOutEndpoint);
      //Assert
      expect(response.status).to.equal(204);
    });

    //? INT4-2
    it("should have a header to set JWT to en empty string", async () => {
      //Act
      const response = await request.post(signOutEndpoint);
      //Assert
      expect(response.header["set-cookie"][0].startsWith("jwt=;")).to.equal(
        true
      );
    });

    //? INT4-3
    it("should have an empty body in success response", async () => {
      //Act
      const response = await request.post(signOutEndpoint);
      //Assert
      expect(response.body).to.deep.equal({});
    });
  });

  describe("Update password route tests: ", () => {
    const updatePasswordEndpoint = "/authentication/update-password";
    const userToUpdate = { ...userTestData.documents[0] };
    let authenticationToken;
    let testSubmission;

    before(async () => {
      await User.create(userToUpdate);
      const response = await request
        .post("/authentication/sign-in")
        .send(userTestData.submissions[0]);
      authenticationToken = response.header["set-cookie"][0];
    });

    after(async () => {
      await User.deleteMany();
    });

    beforeEach(() => {
      testSubmission = {
        password: userTestData.submissions[0].password,
        updatedPassword: "newPassword12£",
      };
    });
    afterEach(async () => {
      testSubmission = null;
      await User.findByIdAndUpdate(userToUpdate._id, userToUpdate);
    });

    //? INT14-1
    it("should respond with a status of 200 for a successful request", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send(testSubmission);
      //Assert
      expect(response.status).to.equal(200);
    });

    //? INT14-2
    it("should respond with the updated user, without their password, for a successful request", async () => {
      //Arrange
      const expected = { ...userToUpdate };
      delete expected.password;
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send(testSubmission);
      //Assert
      expect(response.body).to.deep.equal(expected);
    });

    //? INT14-3
    it("should respond with a 401 status code if no req.cookies.jwt", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .send(testSubmission);
      //Assert
      expect(response.status).to.equal(401);
      expect(response.body).to.equal(APIErrors.UNAUTHORISED_ERROR.message);
    });

    //? INT14-4
    it("should respond with a 401 status code if invalid req.cookies.jwt", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", "invalid token")
        .send(testSubmission);
      //Assert
      expect(response.status).to.equal(401);
      expect(response.body).to.equal(APIErrors.UNAUTHORISED_ERROR.message);
    });

    //? INT14-5
    it("should respond with a 403 status code if the password does not match", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send({ ...testSubmission, password: "incorrect-password" });
      //Assert
      expect(response.status).to.equal(403);
      expect(response.body).to.equal(
        APIErrors.PASSWORD_REVALIDATION_ERROR.message
      );
    });

    //? INT14-6
    it("should respond with a 400 response if the updated password is missing", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send({ ...testSubmission, updatedPassword: undefined });
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT14-7
    it("should respond with a 400 response if the updated password is less than 8 characters", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send({ ...testSubmission, updatedPassword: "xxxxx1$" });
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT14-8
    it("should respond with a 400 response if the updated password is more than 32 characters", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send({ ...testSubmission, updatedPassword: "x".repeat(31) + "1$" });
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT14-9
    it("should respond with a 400 response if the updated password does not contain at least one digit", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send({ ...testSubmission, updatedPassword: "x".repeat(8) + "$" });
      //Assert
      expect(response.status).to.equal(400);
    });

    //? INT14-10
    it("should respond with a 400 response if the updated password does not contain at least one special character", async () => {
      //Act
      const response = await request
        .patch(updatePasswordEndpoint)
        .set("Cookie", authenticationToken)
        .send({ ...testSubmission, updatedPassword: "x".repeat(8) + "1" });
      //Assert
      expect(response.status).to.equal(400);
    });
  });
});
