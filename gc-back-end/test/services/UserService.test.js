import { expect } from "chai";
import sinon from "sinon";

import User from "../../src/models/User.model.js";
import UserService from "../../src/services/User.service.js";
import * as userTestData from "../data/User.test.data.js";
import APIErrors from "../../src/utils/APIErrors.js";

describe("User service tests: ", () => {
  let userService = null;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    userService = null;
  });

  describe("Update user tests: ", () => {
    let findByIdAndUpdateStub;

    let testUserSubmission = {
      emailAddress: userTestData.submissions[0].emailAddress,
      username: userTestData.submissions[0].username,
    };
    let testUserId = userTestData.documents[0]._id;

    beforeEach(() => {
      findByIdAndUpdateStub = sinon.stub(User, "findByIdAndUpdate");
    });

    afterEach(() => {
      findByIdAndUpdateStub.restore();
    });

    //? US13-1
    it("should call findByIdAndUpdate with the correct arguments", async () => {
      //Act
      await userService.updateById(testUserId, testUserSubmission);
      const [actualUserIdToUpdate, actualUpdates] =
        findByIdAndUpdateStub.getCall(0).args;
      //Assert
      expect(actualUserIdToUpdate).to.equal(testUserId);
      expect(actualUpdates).to.equal(testUserSubmission);
    });

    //? US13-2
    it("should throw a duplicate email address error where the email address is a duplicate", async () => {
      //Arrange
      const testDuplicateKeyError = {
        code: 11000,
        keyPattern: { emailAddress: 1 },
      };
      findByIdAndUpdateStub.rejects(testDuplicateKeyError);
      const expected = APIErrors.DUPLICATE_EMAIL_ADDRESS;
      let actual;
      //Act
      try {
        await userService.updateById(testUserId, testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? US13-3
    it("should throw a duplicate username error where the username is a duplicate", async () => {
      //Arrange
      const testDuplicateKeyError = {
        code: 11000,
        keyPattern: { username: 1 },
      };
      findByIdAndUpdateStub.rejects(testDuplicateKeyError);
      const expected = APIErrors.DUPLICATE_USERNAME;
      let actual;
      //Act
      try {
        await userService.updateById(testUserId, testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });
  });
});
