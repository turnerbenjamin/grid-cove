import { expect } from "chai";
import sinon from "sinon";

import * as userTestData from "../data/User.test.data.js";
import UserController from "../../src/controllers/User.controller.js";
import APIErrors from "../../src/utils/APIErrors.js";

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
    const testUser = { ...userTestData.documents[0] };

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
      //Arrange
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

    //? UC13-2
    it("should respond with a status code of 200 where updateUserById resolves", async () => {
      //Arrange
      userService.updateById.resolves(testUser);
      //Act
      const actual = await userController.updateById(req, res);
      //Assert
      expect(res.status.calledWith(200)).to.equal(true);
    });

    //? UC13-3
    it("should respond with the updated user where updateUserById resolves", async () => {
      //Arrange
      const expected = testUser;
      userService.updateById.resolves(expected);
      //Act
      await userController.updateById(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });

    //? UC13-4
    it("should respond with a status of 400 where the user service throws a duplicate email address error", async () => {
      //Arrange
      userService.updateById.rejects(APIErrors.DUPLICATE_EMAIL_ADDRESS);
      //Act
      await userController.updateById(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.equal(true);
      expect(
        res.json.calledWith(APIErrors.DUPLICATE_EMAIL_ADDRESS.message)
      ).to.equal(true);
    });

    //? UC13-5
    it("should respond with a status of 400 where the user service throws a duplicate username error", async () => {
      //Arrange
      userService.updateById.rejects(APIErrors.DUPLICATE_USERNAME);
      //Act
      await userController.updateById(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.equal(true);
      expect(
        res.json.calledWith(APIErrors.DUPLICATE_USERNAME.message)
      ).to.equal(true);
    });

    //? UC13-6
    it("should respond with a status code of 500 where updateUserById rejects", async () => {
      //Arrange
      userService.updateById.rejects(new Error());
      //Act
      await userController.updateById(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
      expect(res.json.calledWith(APIErrors.SERVER_ERROR.message)).to.equal(
        true
      );
    });
  });
});
