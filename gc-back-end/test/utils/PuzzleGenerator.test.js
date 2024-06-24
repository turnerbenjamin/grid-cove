import { expect } from "chai";

import * as puzzleTestData from "../data/Puzzle.test.data.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";
import APIErrors from "../../src/utils/APIErrors.js";

describe("Puzzle generator tests: ", () => {
  const testPixelArt = puzzleTestData.submissions[0].pixelArt;

  //? PG6-1
  it("should generate a solution string from a given pixel art string", async () => {
    //Act
    const puzzle = PuzzleGenerator.generate(testPixelArt);
    const solution = puzzle.solution;
    //Assert
    expect(solution).to.match(/^[01]+$/);
    expect(solution).has.length(testPixelArt.length);
  });

  //? PG6-2
  it("should throw an error if any one character makes up over 90 percent of the string", async () => {
    //Arrange
    const invalidPuzzle = "0".repeat(91) + "1".repeat(10);
    const expected = APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
    let actual;
    //Act
    try {
      PuzzleGenerator.generate(invalidPuzzle);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });

  //? PG6-3
  it("should return a clues object with row and column properties which have two dimensional arrays, the length of which should equal the puzzle size", async () => {
    //Arrange
    const puzzleSize = Math.round(Math.sqrt(testPixelArt.length));
    //Act
    const puzzle = PuzzleGenerator.generate(testPixelArt);
    const { rowClues, columnClues } = puzzle.clues;
    //Assert
    expect(columnClues).has.length(puzzleSize);
    expect(rowClues).has.length(puzzleSize);
  });
});
