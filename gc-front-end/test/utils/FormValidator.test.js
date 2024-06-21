import { afterEach, beforeEach, expect } from "vitest";
import FormValidator from "../../src/utils/FormValidator";

describe("Register tests", () => {
  let testSubmission;
  let testConfig;

  beforeEach(() => {
    testSubmission = {
      username: "test-user",
      emailAddress: "a@b.c",
      password: "password12$",
      confirmPassword: "password12$",
    };
    testConfig = {
      username: true,
      emailAddress: true,
      password: true,
      confirmPassword: true,
    };
  });

  afterEach(() => {
    testSubmission = null;
    testConfig = null;
  });

  //?US2-FVD-1
  test("It should return true from isValidated where all active fields are valid", () => {
    //Arrange
    const formValidator = new FormValidator(testSubmission, testConfig);
    //Act
    const actual = formValidator.isValidated();
    //Assert
    expect(actual).toBe(true);
  });
});
