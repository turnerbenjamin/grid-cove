import { afterEach, beforeEach, expect } from "vitest";
import FormValidator from "../../src/utils/FormValidator";

describe("Register tests", () => {
  let testSubmission;

  beforeEach(() => {
    testSubmission = {
      username: "test-user",
      emailAddress: "a@b.c",
      password: "password12$",
      confirmPassword: "password12$",
    };
  });

  afterEach(() => {
    testSubmission = null;
  });

  //?US2-FVD-1
  test("It should return true from isValidated where all active fields are valid", () => {
    //Act
    const actual = FormValidator.isValidated(testSubmission);
    //Assert
    expect(actual).toBe(true);
  });

  //?US2-FVD-2
  test("It should return an error where the username is less than 8 characters", () => {
    //Arrange
    const testInvalidUsername = "xxx-xxx";
    //Act
    const [isValidated, error] =
      FormValidator.validateUsername(testInvalidUsername);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/username must be at least 8 characters/i);
  });

  //?US2-FVD-3
  test("It should return an error where the username is more than 24 characters", () => {
    //Arrange
    const testInvalidUsername = "x".repeat(12) + "-" + "x".repeat(12);
    //Act
    const [isValidated, error] =
      FormValidator.validateUsername(testInvalidUsername);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/username must be no more than 24 characters/i);
  });
});
