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
});
