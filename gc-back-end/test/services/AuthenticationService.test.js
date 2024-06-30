import { expect } from "chai";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    let signStub;
    const testUserSubmission = {
      emailAddress: userTestData.submissions[0].emailAddress,
      password: userTestData.submissions[0].password,
    };
    const testUserDocument = userTestData.documents[0];
    const testToken = { testToken: "testToken" };

    beforeEach(() => {
      findOneStub = sinon.stub(User, "findOne");
      selectStub = sinon.stub();
      selectStub.resolves(testUserDocument);
      findOneStub.returns({ select: selectStub });
      signStub = sinon.stub(jwt, "sign");
      signStub.returns(testToken);
      compareStub = sinon.stub(bcrypt, "compare");
      compareStub.resolves(true);
    });

    afterEach(() => {
      findOneStub.restore();
      selectStub = null;
      compareStub.restore();
      signStub.restore();
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

    //? AS3-5
    it("should respond with a server error where bcrypt fails", async () => {
      //Arrange
      compareStub.rejects();
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

    //? AS3-6
    it("should throw a user unauthorised error where bcrypt returns false", async () => {
      //Arrange
      compareStub.resolves(false);
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

    //? AS3-7
    it("should call sign on jwt with the correct arguments", async () => {
      //Arrange
      const expectedJWTBody = { _id: testUserDocument._id };
      const expectedSecretKey = process.env.JWT_SECRET_KEY;
      const expectedOptions = { expiresIn: process.env.JWT_EXPIRES_IN };
      //Act
      await authenticationService.signInUser(testUserSubmission);
      const [actualJWTBody, actualSecretKey, actualOptions] =
        signStub.getCall(0).args;
      //Assert

      expect(actualJWTBody).to.deep.equal(expectedJWTBody);
      expect(actualSecretKey).to.equal(expectedSecretKey);
      expect(actualOptions).to.deep.equal(expectedOptions);
    });

    //? AS3-8
    it("should throw a server error if sign fails", async () => {
      //Arrange
      signStub.throws();
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

    //? AS3-9
    it("should return the user, without the password, and an access token where no errors", async () => {
      //Arrange
      const expected = {
        token: testToken,
        user: testUserDocument,
      };
      delete expected.user.password;
      //Act
      const actual = await authenticationService.signInUser(testUserSubmission);
      //Assert
      expect(actual).to.deep.equal(expected);
    });
  });

  describe("Validate token tests", () => {
    const testDecodedToken = { _id: "test_id" };
    const testToken = "jwt=xxxxx";
    const testUserDocument = userTestData.documents[0];
    let verifyStub;
    let findByIdStub;
    let selectStub;

    beforeEach(() => {
      verifyStub = sinon.stub(jwt, "verify");
      verifyStub.returns(testDecodedToken);
      selectStub = sinon.stub();
      selectStub.resolves(testUserDocument);
      findByIdStub = sinon.stub(User, "findById");
      findByIdStub.returns({ select: selectStub });
    });

    afterEach(() => {
      verifyStub.restore();
      findByIdStub.restore();
      selectStub = null;
    });

    //? AS6-1
    it("should call jwt.verify with correct arguments", async () => {
      //Arrange
      const expectedJWTArg = testToken;
      const expectedSecretArg = process.env.JWT_SECRET_KEY;
      //Act
      await authenticationService.validateToken(testToken);
      const [actualJWTArg, actualSecretArg] = verifyStub.getCall(0).args;
      //Assert
      expect(actualJWTArg).to.equal(expectedJWTArg);
      expect(actualSecretArg).to.equal(expectedSecretArg);
    });

    //? AS6-2
    it("should throw an unauthorised error if jwt.verify throws", async () => {
      //Arrange
      verifyStub.throws(new Error());
      const expected = APIErrors.UNAUTHORISED_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.validateToken(testToken);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS6-3
    it("should call findById on the User Service with correct id if verify resolves", async () => {
      //Arrange
      const expected = testDecodedToken._id;
      //Act
      await authenticationService.validateToken(testToken);
      const [actual] = findByIdStub.getCall(0).args;
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS6-4
    it("should throw a server error if findById rejects", async () => {
      //Arrange
      findByIdStub.rejects(new Error());
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.validateToken(testToken);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS6-5
    it("should throw an unauthorised error if findById returns a falsy value", async () => {
      //Arrange
      selectStub.resolves(null);
      const expected = APIErrors.UNAUTHORISED_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.validateToken(testToken);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS6-6
    it("should return the user document", async () => {
      //Arrange
      const expected = testUserDocument;
      //Act
      const actual = await authenticationService.validateToken(testToken);
      //Assert
      expect(actual).to.equal(expected);
    });
  });

  describe("Update password tests: ", () => {
    const testUpdatedPassword = "new-password";
    const testUserToUpdateId = "test-user-to-update-id";
    const testHashedUpdatedPassword = "new-password-hashed";
    const testUpdatedUser = userTestData.documents[0];
    let hashStub;
    let findByIdAndUpdateStub;

    beforeEach(() => {
      hashStub = sinon.stub(bcrypt, "hash");
      hashStub.resolves(testHashedUpdatedPassword);
      findByIdAndUpdateStub = sinon.stub(User, "findByIdAndUpdate");
      findByIdAndUpdateStub.resolves(testUpdatedUser);
    });

    afterEach(() => {
      hashStub.restore();
      findByIdAndUpdateStub.restore();
    });

    //? AS14-1
    it("should call hash on bcrypt with the password", async () => {
      //Arrange
      const expectedPasswordToHash = testUpdatedPassword;
      const expectedSalt = parseInt(process.env.SALT);
      //Act
      await authenticationService.updatePassword(
        testUserToUpdateId,
        testUpdatedPassword
      );
      const [actualPasswordToHash, actualSalt] = hashStub.getCall(0).args;
      //Assert
      expect(actualPasswordToHash).to.equal(expectedPasswordToHash);
      expect(actualSalt).to.equal(expectedSalt);
    });

    //? AS14-2
    it("should throw a server error where hash fails", async () => {
      //Arrange
      hashStub.rejects();
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.updatePassword(
          testUserToUpdateId,
          testUpdatedPassword
        );
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? AS14-3
    it("should call findByIdAndUpdate with the correct arguments", async () => {
      //Arrange
      const expectedUserIdArg = testUserToUpdateId;
      const expectedUpdateArg = { password: testHashedUpdatedPassword };
      //Act
      await authenticationService.updatePassword(
        testUserToUpdateId,
        testUpdatedPassword
      );
      const [actualUserIdArg, actualUpdateArg] =
        findByIdAndUpdateStub.getCall(0).args;
      //Assert
      expect(actualUserIdArg).to.equal(expectedUserIdArg);
      expect(actualUpdateArg).to.deep.equal(expectedUpdateArg);
    });

    //? AS14-4
    it("should throw a server error where findByIdAndUpdate rejects", async () => {
      //Arrange
      findByIdAndUpdateStub.rejects();
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await authenticationService.updatePassword(
          testUserToUpdateId,
          testUpdatedPassword
        );
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });
  });
});
