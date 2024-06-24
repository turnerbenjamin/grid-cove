import { expect } from "chai";
import sinon from "sinon";

import Puzzle from "../../src/models/Puzzle.model.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";
import PuzzleService from "../../src/services/Puzzle.service.js";
import * as userTestData from "../data/User.test.data.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";

describe("Puzzle service tests: ", () => {
  const testAuthor = userTestData.documents[0];
  const testPuzzleSubmission = puzzleTestData.submissions[0];
  const testSolutionString = "111111";
  const testClues = {
    rowClues: [[1], [2, 1]],
    columnClues: [[3, 2], [5]],
  };
  let puzzleService;
  let generatePuzzleStub;
  let createStub;

  beforeEach(() => {
    puzzleService = new PuzzleService();
    generatePuzzleStub = sinon.stub(PuzzleGenerator, "generate");
    generatePuzzleStub.returns({
      solution: testSolutionString,
      clues: testClues,
    });
    createStub = sinon.stub(Puzzle, "create");
  });

  afterEach(() => {
    puzzleService = null;
    generatePuzzleStub.restore();
    createStub.restore();
  });

  //? PS6-1
  it("should call PuzzleGenerator with the pixel art string", async () => {
    const expectedPixelArtArg = testPuzzleSubmission.pixelArt;
    const expectedPuzzleSizeArg = testPuzzleSubmission.size;
    //Act
    await puzzleService.createPuzzle(
      testPuzzleSubmission.pixelArt,
      testPuzzleSubmission.title,
      testAuthor,
      testPuzzleSubmission.size
    );
    const [actualPixelArtArg, actualPuzzleSizeArg] =
      generatePuzzleStub.getCall(0).args;
    //Assert
    expect(actualPixelArtArg).to.equal(expectedPixelArtArg);
    expect(actualPuzzleSizeArg).to.equal(expectedPuzzleSizeArg);
  });
});
