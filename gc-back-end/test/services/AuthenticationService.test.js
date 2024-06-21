import { expect } from "chai";
import bcrypt from "bcrypt";
import sinon from "sinon";

import APIErrors from "../../src/utils/APIErrors.js";
import AuthenticationService from "../../src/services/Authentication.service.js";
import User from "../../src/models/User.model.js";
import * as userTestData from "../data/User.test.data.js";

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
    const testUserSubmission = userTestData.submissions[0];
    const testUserDocument = userTestData.documents[0];
    const testHashedPassword = testUserDocument.password;

    beforeEach(() => {
      createStub = sinon.stub(User, "create");
      createStub.resolves(testUserDocument);
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
      const expectedPasswordToHash = testUserSubmission.password;
      const expectedSalt = parseInt(process.env.SALT);
      //Act
      await authenticationService.createUser(testUserSubmission);
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
        await authenticationService.createUser(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS1-3
    it("should call create on User model with the correct arguments", async () => {
      //Arrange
      const expectedNewUserArg = {
        ...testUserSubmission,
        password: testHashedPassword,
      };
      //Act
      await authenticationService.createUser(testUserSubmission);
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
        await authenticationService.createUser(testUserSubmission);
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
        await authenticationService.createUser(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS1-6
    it("should throw a server error for all other errors", async () => {
      //Arrange
      createStub.rejects(new Error());
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.createUser(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS1-7
    it("should return the new user's details, without the password", async () => {
      //Arrange
      const expected = { ...testUserDocument };
      delete expected.password;
      //Act
      const actual = await authenticationService.createUser(testUserSubmission);
      //Assert
      expect(actual).to.deep.equal(expected);
    });
  });

  describe("Sign-In user tests", () => {
    let findOneStub;
    let selectStub;
    let compareStub;
    const testUserSubmission = {
      emailAddress: userTestData.submissions[0].emailAddress,
      password: userTestData.submissions[0].password,
    };
    const testUserDocument = userTestData.documents[0];

    beforeEach(() => {
      findOneStub = sinon.stub(User, "findOne");
      selectStub = sinon.stub();
      selectStub.resolves(testUserDocument);
      findOneStub.returns({ select: selectStub });
      compareStub = sinon.stub(bcrypt, "compare");
      compareStub.resolves(true);
    });

    afterEach(() => {
      findOneStub.restore();
      selectStub = null;
      compareStub.restore();
    });

    //? AS3-1
    it("should call findOne and select on the user model with the correct arguments", async () => {
      //Arrange
      const expected = {
        emailAddress: testUserSubmission.emailAddress,
      };
      //Act
      await authenticationService.signInUser(testUserSubmission);
      const [findUserArgument] = findOneStub.getCall(0).args;
      const [selectArgument] = selectStub.getCall(0).args;
      //Assert
      expect(findUserArgument).to.deep.equal(expected);
      expect(selectArgument).to.equal("+password");
    });

    //? AS3-2
    it("should throw a server error where findOne fails", async () => {
      //Arrange
      selectStub.rejects(new Error());
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.signInUser(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS3-3
    it("should throw a server error where findOne fails", async () => {
      //Arrange
      selectStub.resolves(null);
      const expected = APIErrors.UNAUTHORISED_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.signInUser(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS3-4
    it("should call compare on bcrypt with the correct arguments", async () => {
      //Arrange
      const expectedArguments = [
        testUserSubmission.password,
        testUserDocument.password,
      ];
      //Act
      await authenticationService.signInUser(testUserSubmission);
      const actualArguments = compareStub.getCall(0).args;
      //Assert
      expect(actualArguments).to.deep.equal(expectedArguments);
    });
  });
});
