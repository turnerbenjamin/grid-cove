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

    const testUserSubmission = {
      emailAddress: "new@emailaddress.com",
      username: "new-username",
    };
    const testUserId = userTestData.documents[0]._id;

    beforeEach(() => {
      findByIdAndUpdateStub = sinon.stub(User, "findByIdAndUpdate");
      findByIdAndUpdateStub.resolves({});
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

    //? US13-4
    it("should throw a server error where findByIdAndUpdate rejects", async () => {
      //Arrange
      findByIdAndUpdateStub.rejects(new Error());
      const expected = APIErrors.SERVER_ERROR;
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

    //? US13-5
    it("should throw a server error where findByIdAndUpdate resolves with null", async () => {
      //Arrange
      findByIdAndUpdateStub.resolves(null);
      const expected = APIErrors.SERVER_ERROR;
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

    //? US13-5
    it("should throw a server error where findByIdAndUpdate resolves with null", async () => {
      //Arrange
      const expected = { ...userTestData.documents[0] };
      findByIdAndUpdateStub.resolves(expected);
      const actual = await userService.updateById(
        testUserId,
        testUserSubmission
      );
      //Assert
      expect(actual).to.equal(expected);
    });
  });
});
