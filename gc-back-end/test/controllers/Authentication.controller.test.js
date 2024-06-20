import { expect } from "chai";
import sinon from "sinon";

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
  });
});
