import { expect } from "chai";
import sinon from "sinon";

import PuzzleController from "../../src/controllers/Puzzle.controller.js";
import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";

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
});
