import { expect } from "vitest";

import RevealPixelArtTransition from "../../src/utils/RevealPixelArtTransition";

describe("Reveal Pixel Art Transition tests: ", () => {
  //?US10-RPA-1
  test("It should return a number between 0 and the delay", () => {
    const testRow = 10;
    const testColumn = 10;
    const testGridSize = 10;
    const testDelay = 500;
    //Act
    const actual = RevealPixelArtTransition.getDelay(
      testColumn,
      testRow,
      testGridSize,
      testDelay
    );
    //assert
    expect(actual).toBeGreaterThanOrEqual(0);
    expect(actual).toBeLessThanOrEqual(testDelay);
  });
});
