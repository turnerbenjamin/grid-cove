import { expect } from "chai";
import bcrypt from "bcrypt";
import sinon from "sinon";

import AuthenticationService from "../../src/services/Authentication.service.js";
import User from "../../src/models/User.model.js";
import * as userTestData from "../data/User.test.data.js";
import APIErrors from "../../src/utils/APIErrors.js";

describe("Authentication service tests", () => {
  let authenticationService = null;

  beforeEach(() => {
    authenticationService = new AuthenticationService();
  });

  afterEach(() => {
    authenticationService = null;
  });

  describe("Create user tests", () => {
    let createStub;
    let hashStub;
    const testUser = userTestData.submissions[0];
    const testHashedPassword = "hashed";

    beforeEach(() => {
      createStub = sinon.stub(User, "create");
      hashStub = sinon.stub(bcrypt, "hash");
      hashStub.resolves(testHashedPassword);
    });

    afterEach(() => {
      createStub.restore();
      hashStub.restore();
    });

    //? AS1-1
    it("should call hash on bcrypt with the password", async () => {
      //Arrange
      const expectedPasswordToHash = testUser.password;
      const expectedSalt = parseInt(process.env.SALT);
      //Act
      await authenticationService.createUser(testUser);
      const [actualPasswordToHash, actualSalt] = hashStub.getCall(0).args;
      //Assert
      expect(actualPasswordToHash).to.equal(expectedPasswordToHash);
      expect(actualSalt).to.equal(expectedSalt);
    });

    //? AS1-2
    it("should throw a server error where hash fails", async () => {
      //Arrange
      hashStub.rejects(new Error("test error"));
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.createUser(testUser);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS1-3
    it("should call create on User model with the correct arguments", async () => {
      //Arrange
      createStub.resolves(testUser);
      const expectedNewUserArg = { ...testUser, password: testHashedPassword };
      //Act
      await authenticationService.createUser(testUser);
      const [actualNewUserArg] = createStub.getCall(0).args;
      //Assert
      expect(actualNewUserArg).to.deep.equal(expectedNewUserArg);
    });

    //? AS1-4
    it("should throw a duplicate email address error where the email address is a duplicate", async () => {
      //Arrange
      const testDuplicateKeyError = {
        code: 11000,
        keyPattern: { emailAddress: 1 },
      };
      createStub.rejects(testDuplicateKeyError);
      const expected = APIErrors.DUPLICATE_EMAIL_ADDRESS;
      let actual;
      //Act
      try {
        await authenticationService.createUser(testUser);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS1-5
    it("should throw a duplicate username error where the username is a duplicate", async () => {
      //Arrange
      const testDuplicateKeyError = {
        code: 11000,
        keyPattern: { username: 1 },
      };
      createStub.rejects(testDuplicateKeyError);
      const expected = APIErrors.DUPLICATE_USERNAME;
      let actual;
      //Act
      try {
        await authenticationService.createUser(testUser);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });
  });
});
