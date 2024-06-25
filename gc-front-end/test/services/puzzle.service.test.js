import { expect } from "vitest";
import axios from "axios";

import * as puzzleService from "../../src/services/puzzle.service";

vi.mock("axios");

describe("Puzzle service tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const testResponse = { data: "test data" };

  describe("Create puzzle tests", () => {
    const testSubmission = {
      pixelArt: "000000909000000D000DD999D",
      title: "Skull",
      size: 5,
    };

    //?US1-AHS-1
    test("It should call axios post with the correct url and payload", async () => {
      //Arrange
      const expectedURL = import.meta.env.VITE_APP_CREATE_PUZZLE_URL;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await puzzleService.createPuzzle(testSubmission);
      //Assert
      expect(axios.post).toBeCalledWith(expectedURL, testSubmission);
    });
  });
});
