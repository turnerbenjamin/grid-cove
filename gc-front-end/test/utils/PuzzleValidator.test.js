import { afterEach, beforeEach, expect } from "vitest";
import PuzzleValidator from "../../src/utils/PuzzleValidator";

describe("Register tests", () => {
  let testSubmission;

  beforeEach(() => {
    testSubmission = {
      pixelArt: "000000909000000D000DD999D",
      title: "Skull",
    };
  });

  afterEach(() => {
    testSubmission = null;
  });

  //?US6-PVR-1
  test("It should return true and an empty array where no errors", () => {
    //Act
    const [actualIsValidated, actualErrors] =
      PuzzleValidator.validate(testSubmission);
    //Assert
    expect(actualIsValidated).toBe(true);
    expect(actualErrors.length).toBe(0);
  });

  //?US6-PVR-2
  test("It should return false and an errors array with a length greater than 0 where title is less than 3 characters", () => {
    //Arrange
    testSubmission.title = "12";
    //Act
    const [actualIsValidated, actualErrors] =
      PuzzleValidator.validate(testSubmission);
    //Assert
    expect(actualIsValidated).toBe(false);
    expect(actualErrors.length).greaterThan(0);
  });

  //?US6-PVR-3
  test("It should return false and an errors array with a length greater than 0 where title is more than 32 characters", () => {
    //Arrange
    testSubmission.title = "a".repeat(33);
    //Act
    const [actualIsValidated, actualErrors] =
      PuzzleValidator.validate(testSubmission);
    //Assert
    expect(actualIsValidated).toBe(false);
    expect(actualErrors.length).greaterThan(0);
  });

  //?US6-PVR-4
  test("It should return false and an errors array with a length greater than 0 where there is no pixel art string", () => {
    //Arrange
    delete testSubmission.pixelArt;
    //Act
    const [actualIsValidated, actualErrors] =
      PuzzleValidator.validate(testSubmission);
    //Assert
    expect(actualIsValidated).toBe(false);
    expect(actualErrors.length).greaterThan(0);
  });
  //?US6-PVR-5
  test("It should return false and an errors array with a length greater than 0 where one character comprises over 90% of the pixel art string", () => {
    //Arrange
    testSubmission.pixelArt = "0".repeat(23) + "1".repeat(2);
    //Act
    const [actualIsValidated, actualErrors] =
      PuzzleValidator.validate(testSubmission);
    //Assert
    expect(actualIsValidated).toBe(false);
    expect(actualErrors.length).greaterThan(0);
  });
});
