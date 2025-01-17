import { expect } from "chai";
import sinon from "sinon";

import APIErrors from "../../src/utils/APIErrors.js";
import PuzzleController from "../../src/controllers/Puzzle.controller.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";

describe("Puzzle controller tests: ", () => {
  let puzzleController;
  let puzzleService;
  let req;
  let res;

  afterEach(() => {
    puzzleService = null;
    puzzleController = null;
  });

  describe("Create puzzle tests: ", () => {
    const testPuzzleSubmission = puzzleTestData.submissions[0];
    const testUser = { ...userTestData.documents[0] };

    beforeEach(() => {
      puzzleService = {
        createPuzzle: sinon.stub(),
      };
      puzzleController = new PuzzleController(puzzleService);
      req = {
        body: testPuzzleSubmission,
        user: testUser,
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
    });

    //? PC6-1
    it("should call the puzzle service with the correct arguments", async () => {
      //Arrange
      const expected = [
        testPuzzleSubmission.pixelArt,
        testPuzzleSubmission.title,
        testPuzzleSubmission.size,
        testUser,
      ];
      //Act
      await puzzleController.createPuzzle(req, res);
      const actual = puzzleService.createPuzzle.getCall(0)?.args;
      //Assert
      expect(actual).to.deep.equal(expected);
    });

    //? PC6-2
    it("should respond with a 400 status code if Puzzle Service throws a duplicate pixel art error", async () => {
      //Arrange
      puzzleService.createPuzzle.rejects(APIErrors.DUPLICATE_PIXEL_ART);
      //Act
      await puzzleController.createPuzzle(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.equal(true);
    });

    //? PC6-3
    it("should respond with a 400 status code if Puzzle Service throws a invalid character distribution error", async () => {
      //Arrange
      puzzleService.createPuzzle.rejects(
        APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION
      );
      //Act
      await puzzleController.createPuzzle(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.equal(true);
    });

    //? PC6-4
    it("should respond with a 500 error code if Puzzle Service throws a server error", async () => {
      //Arrange
      puzzleService.createPuzzle.rejects(APIErrors.SERVER_ERROR);
      //Act
      await puzzleController.createPuzzle(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });

    //? PC6-5
    it("should respond with a 201 status code if Puzzle Service resolves", async () => {
      //Arrange
      puzzleService.createPuzzle.resolves(puzzleTestData.documents[0]);
      //Act
      await puzzleController.createPuzzle(req, res);
      //Assert
      expect(res.status.calledWith(201)).to.equal(true);
    });

    //? PC6-6
    it("should call res.json with the value returned from puzzle service", async () => {
      //Arrange
      const expected = puzzleTestData.documents[0];
      puzzleService.createPuzzle.resolves(expected);
      //Act
      await puzzleController.createPuzzle(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });
  });

  describe("Get puzzles tests: ", () => {
    const testPuzzles = puzzleTestData.aggregateReport;

    beforeEach(() => {
      puzzleService = {
        getPuzzles: sinon.stub(),
      };
      puzzleService.getPuzzles.resolves(testPuzzles);
      puzzleController = new PuzzleController(puzzleService);
      req = {};
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
    });

    //? PC8-1
    it("should call getPuzzles on the puzzle service", async () => {
      //Act
      await puzzleController.getPuzzles(req, res);
      //Assert
      expect(puzzleService.getPuzzles.calledOnce).to.equal(true);
    });

    //? PC8-2
    it("should call res.json with the response from getPuzzles where it resolves to an empty array", async () => {
      //Arrange
      const expected = [];
      puzzleService.getPuzzles.resolves(expected);
      //Act
      await puzzleController.getPuzzles(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });

    //? PC8-3
    it("should call res.json with the response from getPuzzles where it resolves to an array with a length greater than 0", async () => {
      //Arrange
      const expected = ["1"];
      puzzleService.getPuzzles.resolves(expected);
      //Act
      await puzzleController.getPuzzles(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });

    //? PC8-4
    it("should call res.status with 200 where getPuzzles resolves", async () => {
      //Act
      await puzzleController.getPuzzles(req, res);
      //Assert
      expect(res.status.calledWith(200)).to.equal(true);
    });

    //? PC8-5
    it("should call res.status with 500 where getPuzzles rejects", async () => {
      //Arrange
      puzzleService.getPuzzles.rejects(new Error());
      //Act
      await puzzleController.getPuzzles(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
      expect(res.json.calledWith(APIErrors.SERVER_ERROR.message)).to.equal(
        true
      );
    });
  });

  describe("Get puzzle By Id tests: ", () => {
    const testPuzzle = puzzleTestData.documents[0];

    beforeEach(() => {
      puzzleService = {
        getPuzzleById: sinon.stub(),
      };
      puzzleService.getPuzzleById.resolves(testPuzzle);
      puzzleController = new PuzzleController(puzzleService);
      req = {
        params: { puzzleId: testPuzzle._id },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
    });

    //? PC9-1
    it("should call getPuzzleById on the puzzle service with the correct argument", async () => {
      //Arrange
      const expected = req.params.puzzleId;
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(puzzleService.getPuzzleById.calledWith(expected)).to.equal(true);
    });

    //? PC9-2
    it("should respond with a status code of 200 where getPuzzleById resolves", async () => {
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(200)).to.equal(true);
    });

    //? PC9-3
    it("should respond with the value returned from getPuzzleById where getPuzzleById resolves", async () => {
      //Arrange
      const expected = testPuzzle;
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });

    //? PC9-4
    it("should respond with a status code of 404 where getPuzzleById throws a puzzle not found error", async () => {
      //Arrange
      puzzleService.getPuzzleById.rejects(APIErrors.PUZZLE_NOT_FOUND);
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(404)).to.equal(true);
    });

    //? PC9-5
    it("should respond with a status code of 400 where getPuzzleById throws an invalid puzzle id error", async () => {
      //Arrange
      puzzleService.getPuzzleById.rejects(APIErrors.INVALID_PUZZLE_ID);
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.equal(true);
    });

    //? PC9-6
    it("should respond with a status code of 500 where getPuzzleById throws a server error", async () => {
      //Arrange
      puzzleService.getPuzzleById.rejects(APIErrors.SERVER_ERROR);
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });
  });

  describe("Delete puzzle By Id tests: ", () => {
    const testPuzzle = puzzleTestData.documents[0];

    beforeEach(() => {
      puzzleService = {
        deletePuzzleById: sinon.stub(),
      };
      puzzleService.deletePuzzleById.resolves(testPuzzle);
      puzzleController = new PuzzleController(puzzleService);
      req = {
        params: { puzzleId: testPuzzle._id },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
    });

    //? PC12-1
    it("should call deletePuzzleById on the puzzle service with the correct argument", async () => {
      //Arrange
      const expected = req.params.puzzleId;
      //Act
      await puzzleController.deletePuzzleById(req, res);
      //Assert
      expect(puzzleService.deletePuzzleById.calledWith(expected)).to.equal(
        true
      );
    });

    //? PC12-2
    it("should respond with a status code of 204 where the puzzle service resolves", async () => {
      //Act
      await puzzleController.deletePuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(204)).to.equal(true);
    });

    //? PC12-3
    it("should call res.json with no args where the puzzle service resolves", async () => {
      //Act
      await puzzleController.deletePuzzleById(req, res);
      //Assert
      expect(res.json.calledWith()).to.equal(true);
    });

    //? PC12-4
    it("should respond with a status code of 400 where the puzzle service rejects with an invalid puzzle id error", async () => {
      //Arrange
      puzzleService.deletePuzzleById.rejects(APIErrors.INVALID_PUZZLE_ID);
      //Act
      await puzzleController.deletePuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(400)).to.equal(true);
    });

    //? PC12-5
    it("should respond with a status code of 404 where the puzzle service rejects with a puzzle not found error", async () => {
      //Arrange
      puzzleService.deletePuzzleById.rejects(APIErrors.PUZZLE_NOT_FOUND);
      //Act
      await puzzleController.deletePuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(404)).to.equal(true);
    });

    //? PC12-6
    it("should respond with a status code of 500 where the puzzle service rejects with a server error", async () => {
      //Arrange
      puzzleService.deletePuzzleById.rejects(APIErrors.SERVER_ERROR);
      //Act
      await puzzleController.deletePuzzleById(req, res);
      //Assert
      expect(res.status.calledWith(500)).to.equal(true);
    });
  });
});
