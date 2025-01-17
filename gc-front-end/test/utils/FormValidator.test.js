import { afterEach, beforeEach, expect } from "vitest";

import FormValidator from "../../src/utils/FormValidator";

describe("Register tests: ", () => {
  let testSubmission;

  beforeEach(() => {
    testSubmission = {
      username: "test-user",
      emailAddress: "test@email.com",
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

  //?US2-FVD-4
  test("It should return an error where the username contains invalid characters", () => {
    //Arrange
    const testInvalidUsername = "Test Username";
    //Act
    const [isValidated, error] =
      FormValidator.validateUsername(testInvalidUsername);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(
      /username may only contain lowercase letters, digits and hyphens/i
    );
  });

  //?US2-FVD-5
  test("It should return true where the username is valid", () => {
    //Arrange
    const testValidUsername = "test-username";
    //Act
    const [isValidated, error] =
      FormValidator.validateUsername(testValidUsername);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //?US2-FVD-6
  test("It should return an error where the email is empty", () => {
    //Arrange
    const testInvalidEmailAddress = "  ";
    //Act
    const [isValidated, error] = FormValidator.validateEmailAddress(
      testInvalidEmailAddress
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/email address is required/i);
  });

  //?US2-FVD-7
  test("It should return an error where the email is invalid", () => {
    //Arrange
    const testInvalidEmailAddress = "test.invalidEmailAddress.com";
    //Act
    const [isValidated, error] = FormValidator.validateEmailAddress(
      testInvalidEmailAddress
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/email address is invalid/i);
  });

  //?US2-FVD-8
  test("It should return true where the emailAddress is valid", () => {
    //Arrange
    const testValidEmailAddress = "test@validEmailAddress.com";
    //Act
    const [isValidated, error] = FormValidator.validateEmailAddress(
      testValidEmailAddress
    );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //?US2-FVD-9
  test("It should return an error where the password is less than 8 characters", () => {
    //Arrange
    const testInvalidPassword = "xxxxx1$";
    //Act
    const [isValidated, error] =
      FormValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/password must be at least 8 characters/i);
  });

  //?US2-FVD-10
  test("It should return an error where the password is more than 32 characters", () => {
    //Arrange
    const testInvalidPassword = "x".repeat(31) + "1$";
    //Act
    const [isValidated, error] =
      FormValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/password must be no more than 32 characters/i);
  });

  //?US2-FVD-11
  test("It should return an error where the password does not contain at least one digit", () => {
    //Arrange
    const testInvalidPassword = "x".repeat(7) + "$";
    //Act
    const [isValidated, error] =
      FormValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/password must contain at least one digit/i);
  });

  //?US2-FVD-12
  test("It should return an error where the password does not contain at least one special character", () => {
    //Arrange
    const testInvalidPassword = "x".repeat(7) + "1";
    //Act
    const [isValidated, error] =
      FormValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(
      /password must contain at least one special character/i
    );
  });

  //?US2-FVD-13
  test("It should return true where the password is valid", () => {
    //Arrange
    const testValidPassword = "x".repeat(7) + "1$";
    //Act
    const [isValidated, error] =
      FormValidator.validatePassword(testValidPassword);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //?US2-FVD-14
  test("It should return false where password and confirmPassword do not match", () => {
    //Act
    const [isValidated, error] = FormValidator.validateConfirmPassword(
      "a",
      "b"
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/passwords do not match/i);
  });

  //?US2-FVD-15
  test("It should return true where password and confirmPassword do match", () => {
    //Act
    const [isValidated, error] = FormValidator.validateConfirmPassword(
      "a",
      "a"
    );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //?US2-FVD-16
  test("It should return false from isValidated where one field is invalid", () => {
    //Arrange
    testSubmission.password = "invalidPassword";
    //Act
    const actual = FormValidator.isValidated(testSubmission);
    //Assert
    expect(actual).toBe(false);
  });
});
