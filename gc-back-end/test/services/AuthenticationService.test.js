import { expect } from "chai";
import bcrypt from "bcrypt";
import sinon from "sinon";

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
  });
});
