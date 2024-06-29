import { expect } from "chai";
import sinon from "sinon";

import * as userTestData from "../data/User.test.data.js";
import UserController from "../../src/controllers/User.controller.js";

describe("User controller tests: ", () => {
  let req;
  let res;
  let userService;
  let userController;

  beforeEach(() => {
    req = {};
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
    const testUserSubmission = {
      emailAddress: "new@emailaddress.com",
      username: "new-username",
    };
    const testUser = userTestData.documents[0];

    beforeEach(() => {
      userService = {
        updateById: sinon.stub(),
      };
      userController = new UserController(userService);
      req.body = testUserSubmission;
      req.user = testUser;
    });

    afterEach(() => {
      userController = null;
      userService = null;
    });

    //? UC13-1
    it("should call updateById on the user service with the correct argument", async () => {
      const expectedUserIdToUpdate = req.user._id;
      const expectedUpdates = req.body;
      //Act
      await userController.updateById(req, res);
      const [actualUserIdToUpdate, actualUpdates] =
        userService.updateById.getCall(0).args;
      //Assert
      expect(actualUserIdToUpdate).to.equal(expectedUserIdToUpdate);
      expect(actualUpdates).to.equal(expectedUpdates);
    });
  });
});
