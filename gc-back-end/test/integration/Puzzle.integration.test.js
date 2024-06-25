import { expect } from "chai";
import express from "express";
import sinon from "sinon";
import supertest from "supertest";

import AuthenticationController from "../../src/controllers/Authentication.controller.js";
import AuthenticationRoutes from "../../src/routes/Authentication.routes.js";
import AuthenticationService from "../../src/services/Authentication.service.js";
import Database from "../../src/database/database.js";
import PuzzleController from "../../src/controllers/Puzzle.controller.js";
import PuzzleRoutes from "../../src/routes/Puzzle.routes.js";
import PuzzleService from "../../src/services/Puzzle.service.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";

import * as puzzleTestData from "../data/Puzzle.test.data.js";
import * as userTestData from "../data/User.test.data.js";
import Puzzle from "../../src/models/Puzzle.model.js";
import mongoose from "mongoose";

describe("Puzzle integration tests: ", () => {
  const testUserCredentials = userTestData.submissions[0];
  const testPuzzleSubmission = puzzleTestData.submissions[0];
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
    database = new Database(DB_URI);
    await database.connect();
    server.start();
    request = supertest(app);

    await request.post("/authentication/register").send(testUserCredentials);
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
    const cretePuzzleEndpoint = "/puzzles";

    afterEach(async () => {
      await Puzzle.deleteMany();
    });

    //?INT6-1
    it("should respond with a 201 status code for a valid request", async () => {
      //Act
      const response = await request
        .post(cretePuzzleEndpoint)
        .set("Cookie", accessToken)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(201);
    });

    //?INT6-2
    it("should return a new puzzle object for a valid request", async () => {
      //Act
      const response = await request
        .post(cretePuzzleEndpoint)
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
        .post(cretePuzzleEndpoint)
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(401);
    });

    //?INT6-4
    it("should respond with a 401 status code if invalid req.cookies.jwt", async () => {
      //Act
      const response = await request
        .post(cretePuzzleEndpoint)
        .set("Cookie", "jwt=notAValidToken")
        .send(testPuzzleSubmission);
      //Assert
      expect(response.status).to.equal(401);
    });
  });
});
