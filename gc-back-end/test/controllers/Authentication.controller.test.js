import { expect } from "chai";
import sinon from "sinon";

import APIErrors from "../../src/utils/APIErrors.js";
import AuthenticationController from "../../src/controllers/Authentication.controller.js";
import * as userTestData from "../data/User.test.data.js";

describe("Authentication controller tests", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: userTestData.submissions[0],
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  afterEach(() => {
    req = null;
    res = null;
  });

  describe("Register tests", () => {
    let authenticationController;
    let authenticationService;

    beforeEach(() => {
      authenticationService = {
        createUser: sinon.stub(),
      };
      authenticationController = new AuthenticationController(
        authenticationService
      );
    });

    afterEach(() => {
      authenticationController = null;
      authenticationService = null;
    });

    //? AC1-1
    it("should call createUser on the Authentication service with the correct arguments", async () => {
      //Act
      await authenticationController.register(req, res);
      const [actualUserArg] = authenticationService.createUser.getCall(0).args;
      //Assert
      expect(actualUserArg).to.equal(req.body);
    });

    //? AC1-2
    it("should respond with a 201 status if the user was created successfully", async () => {
      //Act
      await authenticationController.register(req, res);
      //Assert
      expect(res.status.calledWith(201)).to.be.true;
    });

    //? AC1-3
    it("should call res.json with the value returned from the authentication service", async () => {
      const expected = userTestData.documents[0];
      authenticationService.createUser.resolves(expected);
      //Act
      await authenticationController.register(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.be.true;
    });

    //? AC1-4
    it("should respond with a status of 400 if the authentication service throws a duplicate email address error", async () => {
      authenticationService.createUser.rejects(
        APIErrors.DUPLICATE_EMAIL_ADDRESS
      );
      //Act
      await authenticationController.register(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(APIErrors.DUPLICATE_EMAIL_ADDRESS.message)).to
        .be.true;
    });

    //? AC1-5
    it("should respond with a status of 400 if the authentication service throws a duplicate username error", async () => {
      authenticationService.createUser.rejects(APIErrors.DUPLICATE_USERNAME);
      //Act
      await authenticationController.register(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(APIErrors.DUPLICATE_USERNAME.message)).to.be
        .true;
    });

    //? AC1-6
    it("should respond with a status code of 500 if the User service throws a server error", async () => {
      authenticationService.createUser.rejects(APIErrors.SERVER_ERROR);
      //Act
      await authenticationController.register(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(APIErrors.SERVER_ERROR.message)).to.be.true;
    });
  });

  describe("Sign in tests", () => {
    const testToken = "test-token";
    let authenticationController;
    let authenticationService;

    const testUserSubmission = {
      emailAddress: userTestData.submissions[0].emailAddress,
      password: userTestData.submissions[0].password,
    };

    beforeEach(() => {
      authenticationService = {
        signInUser: sinon.stub(),
      };
      authenticationService.signInUser.resolves({
        token: testToken,
        user: userTestData.documents[0],
      });
      authenticationController = new AuthenticationController(
        authenticationService
      );
      req.body = testUserSubmission;
      res.cookie = sinon.stub();
    });

    afterEach(() => {
      authenticationController = null;
      authenticationService = null;
    });

    //? AC3-1
    it("should call signInUser on the User Service with the correct argument", async () => {
      //Act
      await authenticationController.signIn(req, res);
      const [userSubmissionArgument] =
        authenticationService.signInUser.getCall(0).args;
      //Assert
      expect(userSubmissionArgument).to.equal(testUserSubmission);
    });

    //? AC3-2
    it("should respond with a 500 error if User Service throws a server error", async () => {
      //Arrange
      authenticationService.signInUser.rejects(APIErrors.SERVER_ERROR);
      //Act
      await authenticationController.signIn(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });

    //? AC3-3
    it("should respond with a 401 error if User Service throws a user unauthorised error", async () => {
      //Arrange
      authenticationService.signInUser.rejects(APIErrors.UNAUTHORISED_ERROR);
      //Act
      await authenticationController.signIn(req, res);
      //Assert
      expect(res.status.calledWith(401)).to.equal(true);
    });

    //? AC3-4
    it("should call res.cookie with valid arguments", async () => {
      //Arrange
      const expectedCookieName = "jwt";
      const expectedToken = testToken;
      const expectedOptions = {
        maxAge: process.env.COOKIE_EXPIRES_IN,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
      };
      //Act
      await authenticationController.signIn(req, res);
      const [actualCookieName, actualToken, actualOptions] =
        res.cookie.getCall(0).args;
      //Assert
      expect(actualCookieName).to.equal(expectedCookieName);
      expect(actualToken).to.equal(expectedToken);
      expect(actualOptions).to.deep.equal(expectedOptions);
    });

    //? AC3-5
    it("should call res.cookie with valid arguments", async () => {
      //Arrange
      res.cookie.throws();
      //Act
      await authenticationController.signIn(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });

    //? AC3-6
    it("should respond with a 200 status code if no errors", async () => {
      //Act
      await authenticationController.signIn(req, res);
      //Assert
      expect(res.status.calledWith(200)).to.equal(true);
    });

    //? AC3-7
    it("should call res.json with the user value returned from signInUser where no errors", async () => {
      //Act
      await authenticationController.signIn(req, res);
      //Assert
      expect(res.json.calledWith(userTestData.documents[0])).to.equal(true);
    });
  });

  describe("Sign out tests", () => {
    let authenticationController;
    beforeEach(() => {
      authenticationController = new AuthenticationController({});
      req.body = {};
      res.clearCookie = sinon.stub();
    });

    afterEach(() => {
      authenticationController = null;
    });

    //? AC4-1
    it("should call res.clearCookie with the correct argument", async () => {
      //Act
      await authenticationController.signOut(req, res);
      //Assert
      expect(res.clearCookie.calledWith("jwt")).to.equal(true);
    });

    //? AC4-2
    it("should respond with a 204 success code and an empty body", async () => {
      //Act
      await authenticationController.signOut(req, res);
      //Assert
      expect(res.status.calledWith(204)).to.equal(true);
    });

    //? AC4-2
    it("should respond with a 500 error code if clearCookie throws", async () => {
      //Arrange
      res.clearCookie.throws();
      //Act
      await authenticationController.signOut(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });
  });
  describe("Require logged In tests", () => {
    let authenticationController;
    const testToken = "jwt=xxxxx";
    let authenticationService;
    beforeEach(() => {
      authenticationService = {
        validateToken: sinon.stub(),
      };
      authenticationController = new AuthenticationController(
        authenticationService
      );
      req.cookies = {
        jwt: testToken,
      };
    });

    afterEach(() => {
      authenticationController = null;
    });

    //? AC6-1
    it("should respond with status code of 401 if no req.cookies.jwt", async () => {
      //Arrange
      req.cookies.jwt = undefined;
      //Act
      await authenticationController.requireLoggedIn(req, res);
      //Assert
      expect(res.status.calledWith(401)).to.equal(true);
    });

    //? AC6-2
    it("should call validateToken on the user service", async () => {
      //Act
      await authenticationController.requireLoggedIn(req, res);
      //Assert
      expect(
        authenticationService.validateToken.calledWith(testToken)
      ).to.equal(true);
    });

    //? AC6-3
    it("should respond with status code of 401 if Authentication Service throws an unauthorised error", async () => {
      //Arrange
      authenticationService.validateToken.rejects(APIErrors.UNAUTHORISED_ERROR);
      //Act
      await authenticationController.requireLoggedIn(req, res);
      //Assert
      expect(res.status.calledWith(401)).to.equal(true);
    });

    //? AC6-4
    it("should respond with status code of 500 if Authentication Service throws a server error", async () => {
      //Arrange
      authenticationService.validateToken.rejects(APIErrors.SERVER_ERROR);
      //Act
      await authenticationController.requireLoggedIn(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });

    //? AC6-5
    it("should attach the user returned from the Authentication Service to req object", async () => {
      //Arrange
      const expected = userTestData.documents[0];
      authenticationService.validateToken.resolves(expected);
      //Act
      await authenticationController.requireLoggedIn(req, res);
      //Assert
      expect(req.user).to.equal(expected);
    });
  });
});
