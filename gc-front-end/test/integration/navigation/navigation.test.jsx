import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect } from "vitest";

import App from "../../../src/App";

import * as puzzlesService from "../../../src/services/puzzle.service";

vi.mock("../../../src/services/puzzle.service");

describe("Navigation tests: ", () => {
  describe("Solve puzzle navigation: ", () => {
    const testPuzzleId = "testPuzzleId";

    beforeEach(async () => {
      puzzlesService.getPuzzles.mockResolvedValueOnce([
        {
          size: 5,
          puzzles: [testPuzzleId],
        },
      ]);

      await act(async () => {
        render(
          <MemoryRouter initialEntries={["/puzzles"]}>
            <App />
          </MemoryRouter>
        );
      });
    });

    test("should navigate to the correct page when a Puzzle card is clicked", async () => {
      //Arrange
      const expected = `puzzles/${testPuzzleId}`;
      //Act
      const puzzleCard = screen.getByTitle(/click to solve/i);
      await act(async () => {
        fireEvent.click(puzzleCard);
      });
      //Assert
      expect(screen.getByTestId(expected));
    });
  });
});
