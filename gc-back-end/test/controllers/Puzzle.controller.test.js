import { expect } from "chai";
import sinon from "sinon";

import PuzzleController from "../../src/controllers/Puzzle.controller.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";
import APIErrors from "../../src/utils/APIErrors.js";

describe("Puzzle controller tests", () => {
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
    const testUser = userTestData.documents[0];

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
      const expected = [];
      puzzleService.getPuzzles.resolves(expected);
      //Act
      await puzzleController.getPuzzles(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });

    //? PC8-3
    it("should call res.json with the response from getPuzzles where it resolves to an array with a length greater than 0", async () => {
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
      const expected = testPuzzle;
      //Act
      await puzzleController.getPuzzleById(req, res);
      //Assert
      expect(res.json.calledWith(expected)).to.equal(true);
    });
  });
});
