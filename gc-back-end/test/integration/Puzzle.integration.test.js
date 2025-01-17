import { expect } from "chai";
import express from "express";
import sinon from "sinon";
import supertest from "supertest";

import APIErrors from "../../src/utils/APIErrors.js";
import AuthenticationController from "../../src/controllers/Authentication.controller.js";
import AuthenticationRoutes from "../../src/routes/Authentication.routes.js";
import AuthenticationService from "../../src/services/Authentication.service.js";
import Database from "../../src/database/database.js";
import PuzzleController from "../../src/controllers/Puzzle.controller.js";
import Puzzle from "../../src/models/Puzzle.model.js";
import PuzzleRoutes from "../../src/routes/Puzzle.routes.js";
import PuzzleService from "../../src/services/Puzzle.service.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";

import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";

describe("Puzzle integration tests: ", () => {
  const testUserCredentials = userTestData.submissions[0];
  let accessToken;
  let server;
  let database;
  let request;

  before(async () => {
    const authenticationService = new AuthenticationService();
    const puzzleService = new PuzzleService();
    const authenticationController = new AuthenticationController(
      authenticationService
    );
    const puzzleController = new PuzzleController(puzzleService);
    const puzzleRoutes = new PuzzleRoutes(
      "/puzzles",
      authenticationController,
      puzzleController
    );
    const authenticationRoutes = new AuthenticationRoutes(
      "/authentication",
      authenticationController
    );

    const { PORT, HOST, DB_URI } = process.env;
    const app = express();

    server = new Server(PORT, HOST, app, [authenticationRoutes, puzzleRoutes]);
    database = new Database(DB_URI, server);
    await database.connect();
    server.start();
    request = supertest(app);

    await User.insertMany(userTestData.documents);
    const response = await request
      .post("/authentication/sign-in")
      .send(testUserCredentials);
    accessToken = response.header["set-cookie"][0];
  });

  after(async () => {
    await User.deleteMany();
    await server.close();
    await database.close();
  });

  describe("Create puzzle tests: ", () => {
    const createPuzzleEndpoint = "/puzzles";
    let testPuzzleSubmission;

    beforeEach(() => {
      testPuzzleSubmission = { ...puzzleTestData.submissions[0] };
    });

    afterEach(async () => {
      await Puzzle.deleteMany();
      testPuzzleSubmission = null;
    });

    //?INT6-1
    it("should respond with a 201 status code for a valid request", async () => {
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(201);
    });

    //?INT6-2
    it("should return a new puzzle object for a valid request", async () => {
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.body.pixelArt).to.equal(testPuzzleSubmission.pixelArt);
      expect(response.body.title).to.equal(testPuzzleSubmission.title);
      expect(response.body.size).to.equal(testPuzzleSubmission.size);
      expect(response.body).to.haveOwnProperty("artist");
      expect(response.body).to.haveOwnProperty("solution");
      expect(response.body).to.haveOwnProperty("clues");
      expect(response.body).to.haveOwnProperty("_id");
    });

    //?INT6-3
    it("should respond with a 401 status code if not req.cookies.jwt", async () => {
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(401);
    });

    //?INT6-4
    it("should respond with a 401 status code if invalid req.cookies.jwt", async () => {
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", "jwt=notAValidToken")
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(401);
    });

    //?INT6-5
    it("should respond with a 500 status code if create rejects", async () => {
      //Arrange
      const createStub = sinon.stub(Puzzle, "create");
      createStub.rejects();
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      createStub.restore();
      //Assert
      expect(response.status).to.equal(500);
    });

    //?INT6-6
    it("should respond with a 400 status code if the puzzle art is duplicated", async () => {
      //Arrange
      await Puzzle.create(puzzleTestData.documents[0]);
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
      expect(response.body).to.equal(APIErrors.DUPLICATE_PIXEL_ART.message);
    });

    //?INT6-7
    it("should respond with a 400 status code if the pixel art string distribution is invalid", async () => {
      //Arrange
      testPuzzleSubmission.pixelArt = "0".repeat(91) + "1".repeat(9);
      testPuzzleSubmission.size = 10;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
      expect(response.body).to.equal(
        APIErrors.INVALID_PIXEL_ART_CHARACTER_DISTRIBUTION.message
      );
    });

    //?INT6-8
    it("should respond with a 400 status code if the grid size is missing", async () => {
      //Arrange
      testPuzzleSubmission.size = null;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-9
    it("should respond with a 400 status code if the grid size is not greater or equal to 5", async () => {
      //Arrange
      testPuzzleSubmission.size = 4;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-10
    it("should respond with a 400 status code if the grid size is not less than or equal to 15", async () => {
      //Arrange
      testPuzzleSubmission.size = 20;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-11
    it("should respond with a 400 status code if the grid size is not a multiple of 5", async () => {
      //Arrange
      testPuzzleSubmission.size = 7;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-12
    it("should respond with a 400 status code if the pixel art string is missing", async () => {
      //Arrange
      delete testPuzzleSubmission.pixelArt;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-13
    it("should respond with a 400 status code if the pixel art string length is not the square of the puzzle size", async () => {
      //Arrange
      testPuzzleSubmission.pixelArt += "a";
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-14
    it("should respond with a 400 status code if the title is missing", async () => {
      //Arrange
      delete testPuzzleSubmission.title;
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-15
    it("should respond with a 400 status code if the title is not greater or equal to 3 chars", async () => {
      //Arrange
      testPuzzleSubmission.title = "12";
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });

    //?INT6-16
    it("should respond with a 400 status code if the title is not less than or equal to 32 chars", async () => {
      //Arrange
      testPuzzleSubmission.title = "a".repeat(33);
      //Act
      const response = await request
        .post(createPuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(400);
    });
  });

  describe("Get puzzles tests: ", () => {
    const getPuzzleEndpoint = "/puzzles";

    describe("Where puzzles in database: ", () => {
      before(async () => {
        await Puzzle.insertMany(puzzleTestData.documents);
      });

      after(async () => {
        await Puzzle.deleteMany();
      });

      //?INT8-1
      it("should respond with a status of 200 for a successful request", async () => {
        //Act
        const response = await request.get(getPuzzleEndpoint);
        //Assert
        expect(response.status).to.equal(200);
      });

      //?INT8-2
      it("should respond with a report in the correct format", async () => {
        //Arrange
        const expected = puzzleTestData.aggregateReport;
        //Act
        const response = await request.get(getPuzzleEndpoint);
        //Assert
        expect(response.body).to.deep.equal(expected);
      });

      //?INT8-3
      it("should respond with a status of 500 where a server error is thrown", async () => {
        //Arrange
        const aggregateStub = sinon.stub(Puzzle, "aggregate");
        aggregateStub.rejects();
        //Act
        const response = await request.get(getPuzzleEndpoint);
        aggregateStub.restore();
        //Assert
        expect(response.status).to.equal(500);
      });
    });
    describe("Where no puzzles in database: ", () => {
      //?INT8-4
      it("should respond with a status of 200 where no puzzles found", async () => {
        //Act
        const response = await request.get(getPuzzleEndpoint);
        //Assert
        expect(response.status).to.equal(200);
      });

      //?INT8-5
      it("should respond with an empty array where no puzzles found", async () => {
        //Arrange
        const expected = [];
        //Act
        const response = await request.get(getPuzzleEndpoint);
        //Assert
        expect(response.body).to.deep.equal(expected);
      });
    });
  });

  describe("Get puzzle by id tests: ", () => {
    const puzzleInDatabase = { ...puzzleTestData.documents[0] };
    const puzzleNotInDatabase = puzzleTestData.documents[1];
    const getPuzzleByIdEndpoint = (id) => `/puzzles/${id}`;

    before(async () => {
      await Puzzle.create(puzzleInDatabase);
    });

    after(async () => {
      await Puzzle.deleteMany();
    });

    //?INT9-1
    it("should respond with a status of 200 for a successful request", async () => {
      //Act
      const response = await request.get(
        getPuzzleByIdEndpoint(puzzleInDatabase._id)
      );
      //Assert
      expect(response.status).to.equal(200);
    });

    //?INT9-2
    it("should respond with a correctly formatted puzzle object with a successful request", async () => {
      //Arrange
      const expected = puzzleInDatabase;
      puzzleInDatabase.artist = {
        username: userTestData.documents[0].username,
      };
      //Act
      const response = await request.get(
        getPuzzleByIdEndpoint(puzzleInDatabase._id)
      );
      delete response.body.__v;
      delete response.body.clues?._id;
      //Assert
      expect(response.body).to.deep.equal(expected);
    });

    //?INT9-3
    it("should respond with a status of 404 where the puzzleId is not found", async () => {
      //Act
      const response = await request.get(
        getPuzzleByIdEndpoint(puzzleNotInDatabase._id)
      );
      //Assert
      expect(response.status).to.equal(404);
    });

    //?INT9-4
    it("should respond with a status of 400 where the puzzleId is not in a valid format", async () => {
      //Act
      const response = await request.get(
        getPuzzleByIdEndpoint("invalidIdFormat")
      );
      //Assert
      expect(response.status).to.equal(400);
      expect(response.body).to.equal(APIErrors.INVALID_PUZZLE_ID.message);
    });

    //?INT9-5
    it("should respond with a status of 500 where a server error is thrown", async () => {
      //Arrange
      const findByIdStub = sinon.stub(Puzzle, "findById");
      findByIdStub.rejects();
      //Act
      const response = await request.get(
        getPuzzleByIdEndpoint(puzzleInDatabase)
      );
      findByIdStub.restore();
      //Assert
      expect(response.status).to.equal(500);
    });
  });

  describe("Delete puzzle by id tests: ", () => {
    const puzzleInDatabase = puzzleTestData.documents[0];
    const puzzleNotInDatabase = puzzleTestData.documents[1];
    const deletePuzzleByIdEndpoint = (id) => `/puzzles/${id}`;
    let accessTokenOfNonAdminUser;
    let accessTokenOfAdminUser;

    before(async () => {
      let response = await request
        .post("/authentication/sign-in")
        .send(userTestData.submissions[0]);
      accessTokenOfNonAdminUser = response.header["set-cookie"][0];
      response = await request
        .post("/authentication/sign-in")
        .send(userTestData.submissions[1]);
      accessTokenOfAdminUser = response.header["set-cookie"][0];
    });

    beforeEach(async () => {
      await Puzzle.create(puzzleInDatabase);
    });

    afterEach(async () => {
      await Puzzle.deleteMany();
    });

    //?INT12-1
    it("should respond with a status of 204 for a successful request", async () => {
      //Arrange
      const puzzleToDelete = puzzleInDatabase;
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint(puzzleToDelete._id))
        .set("Cookie", accessTokenOfAdminUser);
      //Assert
      expect(response.status).to.equal(204);
    });

    //?INT12-2
    it("should respond with an empty body for a successful request", async () => {
      //Arrange
      const puzzleToDelete = puzzleInDatabase;
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint(puzzleToDelete._id))
        .set("Cookie", accessTokenOfAdminUser);
      //Assert
      expect(response.body).to.deep.equal({});
    });

    //?INT12-3
    it("should respond with a 401 error if res.cookies.jwt is missing", async () => {
      //Arrange
      const puzzleToDelete = puzzleInDatabase;
      //Act
      const response = await request.delete(
        deletePuzzleByIdEndpoint(puzzleToDelete._id)
      );
      //Assert
      expect(response.status).to.equal(401);
    });

    //?INT12-4
    it("should respond with a 401 error if res.cookies.jwt is invalid", async () => {
      //Arrange
      const puzzleToDelete = puzzleInDatabase;
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint(puzzleToDelete._id))
        .set("Cookie", "jwt=notAValidToken");
      //Assert
      expect(response.status).to.equal(401);
    });

    //?INT12-5
    it("should respond with a 403 error if res.cookies.jwt is invalid", async () => {
      //Arrange
      const puzzleToDelete = puzzleInDatabase;
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint(puzzleToDelete._id))
        .set("Cookie", accessTokenOfNonAdminUser);
      //Assert
      expect(response.status).to.equal(403);
    });

    //?INT12-6
    it("should respond with a status of 400 where the puzzleId is not in a valid format", async () => {
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint("invalidIdFormat"))
        .set("Cookie", accessTokenOfAdminUser);
      //Assert
      expect(response.status).to.equal(400);
      expect(response.body).to.equal(APIErrors.INVALID_PUZZLE_ID.message);
    });

    //?INT12-7
    it("should respond with a status of 404 where the puzzleId is not found", async () => {
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint(puzzleNotInDatabase._id))
        .set("Cookie", accessTokenOfAdminUser);
      //Assert
      expect(response.status).to.equal(404);
      expect(response.body).to.equal(APIErrors.PUZZLE_NOT_FOUND.message);
    });

    //?INT12-8
    it("should respond with a status of 500 where a server error is thrown", async () => {
      //Arrange
      const findByIdAndDeleteStub = sinon.stub(Puzzle, "findByIdAndDelete");
      findByIdAndDeleteStub.rejects(new Error());
      //Act
      const response = await request
        .delete(deletePuzzleByIdEndpoint(puzzleInDatabase._id))
        .set("Cookie", accessTokenOfAdminUser);
      findByIdAndDeleteStub.restore();
      //Assert
      expect(response.status).to.equal(500);
      expect(response.body).to.equal(APIErrors.SERVER_ERROR.message);
    });
  });
});
