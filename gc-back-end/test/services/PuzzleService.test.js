import { expect } from "chai";
import sinon from "sinon";

import APIErrors from "../../src/utils/APIErrors.js";
import Puzzle from "../../src/models/Puzzle.model.js";
import PuzzleGenerator from "../../src/utils/PuzzleGenerator.js";
import PuzzleService from "../../src/services/Puzzle.service.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";

describe("Puzzle service tests: ", () => {
  let puzzleService;

  beforeEach(() => {
    puzzleService = new PuzzleService();
  });

  afterEach(() => {
    puzzleService = null;
  });

  describe("Create puzzle tests: ", () => {
    const testArtist = userTestData.documents[0];
    const testPuzzleSubmission = puzzleTestData.submissions[0];
    const testSolutionString = "111111";
    const testClues = {
      rowClues: [[1], [2, 1]],
      columnClues: [[3, 2], [5]],
    };

    let generatePuzzleStub;
    let createStub;
    let createPuzzleArgs;

    beforeEach(() => {
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

  describe("Get puzzles tests: ", () => {
    let aggregateStub;
    beforeEach(() => {
      aggregateStub = sinon.stub(Puzzle, "aggregate");
    });

    afterEach(() => {
      aggregateStub.restore();
    });

    //? PS8-1
    it("should call aggregate on the puzzle model", async () => {
      //Act
      await puzzleService.getPuzzles();
      //Assert
      expect(aggregateStub.calledOnce).to.equal(true);
    });

    //? PS8-2
    it("should return an empty array when no puzzles found", async () => {
      const expected = [];
      aggregateStub.resolves(expected);
      //Act
      const actual = await puzzleService.getPuzzles();
      //Assert
      expect(actual).to.equal(expected);
    });

    //? PS8-3
    it("should return the result of this query when puzzles are found", async () => {
      const expected = puzzleTestData.aggregateReport;
      aggregateStub.resolves(expected);
      //Act
      const actual = await puzzleService.getPuzzles();
      //Assert
      expect(actual).to.equal(expected);
    });

    //? PS8-4
    it("should reject with a server error if aggregate rejects", async () => {
      aggregateStub.rejects(new Error());
      const expected = APIErrors.SERVER_ERROR;
      let actual;
      //Act
      try {
        await puzzleService.getPuzzles();
      } catch (err) {
        actual = err;
      }

      //Assert
      expect(actual).to.equal(expected);
    });
  });

  describe("Get puzzle by id tests: ", () => {
    let findByIdStub;
    let populateStub;
    const testId = puzzleTestData.documents[0]._id;
    beforeEach(() => {
      findByIdStub = sinon.stub(Puzzle, "findById");
      populateStub = sinon.stub(Puzzle, "populate");
      findByIdStub.returns({ populate: populateStub });
      populateStub.resolves(puzzleTestData.documents[0]);
    });

    afterEach(() => {
      findByIdStub.restore();
      populateStub.restore();
    });

    //? PS9-1
    it("should call findById with the correct argument", async () => {
      const expected = testId;
      //Act
      await puzzleService.getPuzzleById(testId);
      //Assert
      expect(findByIdStub.calledWith(expected)).to.equal(true);
    });

    //? PS9-2
    it("should call populate", async () => {
      //Act
      await puzzleService.getPuzzleById(testId);
      //Assert
      expect(populateStub.calledOnce).to.equal(true);
    });

    //? PS9-3
    it("should return the puzzle returned by findById", async () => {
      //Arrange
      const expected = puzzleTestData.documents[0];
      populateStub.resolves(expected);
      //Act
      const actual = await puzzleService.getPuzzleById(testId);
      //Assert
      expect(actual).to.equal(expected);
    });

    //? PS9-4
    it("should throw a puzzle not found error where findById returns a falsy value", async () => {
      //Arrange
      populateStub.resolves(null);
      const expected = APIErrors.PUZZLE_NOT_FOUND;
      let actual;
      //Act
      try {
        await puzzleService.getPuzzleById(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });

    //? PS9-4
    it("should throw a puzzle not found error where findById returns a falsy value", async () => {
      //Arrange
      populateStub.rejects({ name: "CastError" });
      const expected = APIErrors.INVALID_PUZZLE_ID;
      let actual;
      //Act
      try {
        await puzzleService.getPuzzleById(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).to.equal(expected);
    });
  });
});
