import { expect } from "vitest";
import axios from "axios";

import * as puzzleService from "../../src/services/puzzle.service";

vi.mock("axios");

describe("Puzzle service tests: ", () => {
  const testResponse = { data: "test data" };

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Create puzzle tests: ", () => {
    const testSubmission = {
      pixelArt: "000000909000000D000DD999D",
      title: "Skull",
      size: 5,
    };

    //?US6-PZS-1
    test("It should call axios post with the correct url and payload", async () => {
      //Arrange
      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/puzzles`;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await puzzleService.createPuzzle(testSubmission);
      //Assert
      expect(axios.post).toBeCalledWith(expectedURL, testSubmission);
    });

    //?US6-PZS-2
    test("It should throw err if post rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await puzzleService.createPuzzle(testSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US6-PZS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await puzzleService.createPuzzle(testSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US6-PZS-4
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await puzzleService.createPuzzle(testSubmission);
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Get puzzles tests: ", () => {
    //?US8-PZS-1
    test("It should call axios get with the correct url", async () => {
      //Arrange
      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/puzzles`;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      await puzzleService.getPuzzles();
      //Assert
      expect(axios.get).toBeCalledWith(expectedURL);
    });

    //?US8-PZS-2
    test("It should throw err if get rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await puzzleService.getPuzzles();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US8-PZS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await puzzleService.getPuzzles();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US8-PZS-4
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await puzzleService.getPuzzles();
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Get puzzle by id tests: ", () => {
    const testId = "123";

    //?US9-PZS-1
    test("It should call axios get with the correct url", async () => {
      //Arrange
      const expectedURL = `${
        import.meta.env.VITE_APP_API_ROOT
      }/puzzles/${testId}`;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      await puzzleService.getPuzzle(testId);
      //Assert
      expect(axios.get).toBeCalledWith(expectedURL);
    });

    //?US9-PZS-2
    test("It should throw err if get rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await puzzleService.getPuzzle(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US9-PZS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await puzzleService.getPuzzle(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US9-PZS-4
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await puzzleService.getPuzzle(testId);
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Delete puzzle by id tests: ", () => {
    const testId = "123";

    //? US12-PZS-1
    test("It should call axios post with the correct url", async () => {
      //Arrange
      axios.delete.mockResolvedValueOnce(testResponse);
      const expectedURL = `${
        import.meta.env.VITE_APP_API_ROOT
      }/puzzles/${testId}`;
      //Act
      await puzzleService.deletePuzzle(testId);
      //Assert
      expect(axios.delete).toBeCalledWith(expectedURL);
    });

    //? US12-PZS-2
    test("It should throw err if post rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.delete.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await puzzleService.deletePuzzle(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? US12-PZS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.delete.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await puzzleService.deletePuzzle(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });
  });
});
