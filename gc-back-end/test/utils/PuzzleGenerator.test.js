import { expect } from "chai";

import * as puzzleTestData from "../data/Puzzle.test.data.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";
import APIErrors from "../../src/utils/APIErrors.js";

describe("Puzzle generator tests: ", () => {
  const testPixelArt = puzzleTestData.submissions[0].pixelArt;
  const testPuzzleSize = Math.round(Math.sqrt(testPixelArt.length));

  //? PG6-1
  it("should generate a solution string from a given pixel art string", async () => {
    //Act
    const puzzle = PuzzleGenerator.generate(testPixelArt, testPuzzleSize);
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
      PuzzleGenerator.generate(invalidPuzzle, testPuzzleSize);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });

  //? PG6-3
  it("should return a clues object with row and column properties which have two dimensional arrays, the length of which should equal the puzzle size", async () => {
    //Act
    const puzzle = PuzzleGenerator.generate(testPixelArt, testPuzzleSize);
    const { rowClues, columnClues } = puzzle.clues;
    //Assert
    expect(columnClues).has.length(testPuzzleSize);
    expect(rowClues).has.length(testPuzzleSize);
  });

  //? PG6-4
  it("It should throw an error if the grid size is not a multiple of 5", async () => {
    //Arrange
    const expected = APIErrors.INVALID_PUZZLE_SIZE;
    const invalidPuzzleSize = 4;
    let actual;
    //Act
    try {
      PuzzleGenerator.generate(testPixelArt, invalidPuzzleSize);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });
});
