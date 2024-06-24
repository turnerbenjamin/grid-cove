import { expect } from "chai";

import * as puzzleTestData from "../data/Puzzle.test.data.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";

describe("Puzzle generator tests: ", () => {
  const testPixelArt = puzzleTestData.submissions[0].pixelArt;

  //? PG6-1
  it("should generate a solution string from a given pixel art string", async () => {
    //Arrange
    //Act
    const puzzle = PuzzleGenerator.generate(testPixelArt);
    const solution = puzzle.solution;
    //Assert
    expect(solution).to.match(/^[01]+$/);
    expect(solution).has.length(testPixelArt.length);
  });
});
