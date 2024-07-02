import { expect } from "chai";
import sinon from "sinon";

import APIErrors from "../../src/utils/APIErrors.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";

describe("Puzzle generator tests: ", () => {
  const testPixelArt = puzzleTestData.submissions[0].pixelArt;
  const testPuzzleSize = Math.round(Math.sqrt(testPixelArt.length));

  //? PG6-1
  it("should generate a solution string from a given pixel art string", async () => {
    //Arrange
    const randomStub = sinon.stub(Math, "random");
    randomStub.returns(0.4);
    const pixelArtThatRequiresRedistributionWhenRandomSetToZeroPointFour =
      "1110000000000000000000032";
    //Act
    const puzzle = PuzzleGenerator.generate(
      pixelArtThatRequiresRedistributionWhenRandomSetToZeroPointFour,
      5
    );
    randomStub.restore();
    const solution = puzzle.solution;
    //Assert
    expect(solution).to.match(/^[01]+$/);
    expect(solution).has.length(testPixelArt.length);
  });

  //? PG6-2
  it("should throw an error if any one character makes up over 90 percent of the string", async () => {
    //Arrange
    const invalidPuzzle = "0".repeat(91) + "1".repeat(9);
    const expected = APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
    let actual;
    //Act
    try {
      PuzzleGenerator.generate(invalidPuzzle, 10);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });

  //? PG6-3
  it("should return a clues object with row and column properties which have two dimensional arrays, the length of which should equal the puzzle size", async () => {
    //Arrange
    const testPixelArt = puzzleTestData.submissions[1].pixelArt;
    const randomStub = sinon.stub(Math, "random");
    randomStub.returns(0.01);
    //Act
    const puzzle = PuzzleGenerator.generate(testPixelArt, testPuzzleSize);
    const { rowClues, columnClues } = puzzle.clues;
    randomStub.restore();
    //Assert
    expect(columnClues).has.length(testPuzzleSize);
    expect(rowClues).has.length(testPuzzleSize);
  });
});
