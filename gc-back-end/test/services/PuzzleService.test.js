import { expect } from "chai";
import sinon from "sinon";

import APIErrors from "../../src/utils/APIErrors.js";
import Puzzle from "../../src/models/Puzzle.model.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";
import PuzzleService from "../../src/services/Puzzle.service.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";

describe("Puzzle service tests: ", () => {
  const testArtist = userTestData.documents[0];
  const testPuzzleSubmission = puzzleTestData.submissions[0];
  const testSolutionString = "111111";
  const testClues = {
    rowClues: [[1], [2, 1]],
    columnClues: [[3, 2], [5]],
  };
  let puzzleService;
  let generatePuzzleStub;
  let createStub;
  let createPuzzleArgs;

  beforeEach(() => {
    puzzleService = new PuzzleService();
    generatePuzzleStub = sinon.stub(PuzzleGenerator, "generate");
    generatePuzzleStub.returns({
      solution: testSolutionString,
      clues: testClues,
    });
    createStub = sinon.stub(Puzzle, "create");
    createPuzzleArgs = [
      testPuzzleSubmission.pixelArt,
      testPuzzleSubmission.title,
      testPuzzleSubmission.size,
      testArtist,
    ];
  });

  afterEach(() => {
    puzzleService = null;
    createPuzzleArgs = null;
    generatePuzzleStub.restore();
    createStub.restore();
  });

  //? PS6-1
  it("should call PuzzleGenerator with the pixel art string", async () => {
    const expectedPixelArtArg = testPuzzleSubmission.pixelArt;
    const expectedPuzzleSizeArg = testPuzzleSubmission.size;
    //Act
    await puzzleService.createPuzzle(...createPuzzleArgs);
    const [actualPixelArtArg, actualPuzzleSizeArg] =
      generatePuzzleStub.getCall(0).args;
    //Assert
    expect(actualPixelArtArg).to.equal(expectedPixelArtArg);
    expect(actualPuzzleSizeArg).to.equal(expectedPuzzleSizeArg);
  });

  //? PS6-2
  it("should call create on the Puzzle model with the correct arguments", async () => {
    const expected = {
      pixelArt: testPuzzleSubmission.pixelArt,
      title: testPuzzleSubmission.title,
      solution: testSolutionString,
      clues: testClues,
      size: testPuzzleSubmission.size,
      artist: testArtist._id,
    };
    //Act
    await puzzleService.createPuzzle(...createPuzzleArgs);
    const [actual] = createStub.getCall(0).args;
    //Assert
    expect(actual).to.deep.equal(expected);
  });

  //? PS6-3
  it("should call create on the Puzzle model with the correct arguments", async () => {
    //Arrange
    const testDuplicateKeyError = {
      code: 11000,
      keyPattern: { emailAddress: 1 },
    };
    createStub.rejects(testDuplicateKeyError);
    const expected = APIErrors.DUPLICATE_PIXEL_ART;
    let actual;
    //Act
    try {
      await puzzleService.createPuzzle(...createPuzzleArgs);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });

  //? PS6-4
  it("should rethrow an invalid puzzle art distribution error where thrown by the Puzzle Generator", async () => {
    //Arrange
    const expected = APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION;
    generatePuzzleStub.throws(expected);
    let actual;
    //Act
    try {
      await puzzleService.createPuzzle(...createPuzzleArgs);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });

  //? PS6-5
  it("should throw a server error for all other errors", async () => {
    //Arrange
    const expected = APIErrors.SERVER_ERROR;
    generatePuzzleStub.throws(new Error());
    let actual;
    //Act
    try {
      await puzzleService.createPuzzle(...createPuzzleArgs);
    } catch (err) {
      actual = err;
    }
    //Assert
    expect(actual).to.equal(expected);
  });

  //? PS6-6
  it("should return the new puzzle document where create resolves", async () => {
    //Arrange
    const expected = puzzleTestData.documents[0];
    createStub.resolves(expected);
    const actual = await puzzleService.createPuzzle(...createPuzzleArgs);
    //Assert
    expect(actual).to.equal(expected);
  });
});
