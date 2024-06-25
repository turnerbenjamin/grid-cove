import { expect } from "chai";
import sinon from "sinon";

import PuzzleController from "../../src/controllers/Puzzle.controller.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";
import APIErrors from "../../src/utils/APIErrors.js";

describe("Puzzle controller tests", () => {
  const testPuzzleSubmission = puzzleTestData.submissions[0];
  const testUser = userTestData.documents[0];
  let puzzleController;
  let puzzleService;
  let req;
  let res;

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

  afterEach(() => {
    puzzleService = null;
    puzzleController = null;
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
});
