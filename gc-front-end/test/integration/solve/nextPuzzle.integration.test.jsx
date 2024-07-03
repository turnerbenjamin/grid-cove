import { act, fireEvent, screen } from "@testing-library/react";
import { beforeEach, expect, vi } from "vitest";

import {
  solvedWhenTopLeftCellFilled,
  getAllPuzzlesTestData,
} from "../../data/puzzles.test.data";
import { renderWithRouter } from "../../test.utils";
import { useAppContext } from "../../../src/hooks/contexts/appContext";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import RevealPixelArtTransition from "../../../src/utils/RevealPixelArtTransition";
import Solve from "../../../src/components/solve/Solve";
import * as puzzleService from "../../../src/services/puzzle.service";

vi.mock("../../../src/services/puzzle.service");
vi.mock("../../../src/hooks/contexts/appContext");
vi.mock("../../../src/utils/RevealPixelArtTransition");

describe("Next puzzle link tests: ", () => {
  const firstPuzzleId = getAllPuzzlesTestData[0].puzzles[0];
  const secondPuzzleId = getAllPuzzlesTestData[0].puzzles[1];
  const lastPuzzleId = getAllPuzzlesTestData[2].puzzles[1];

  beforeEach(() => {
    puzzleService.getPuzzles.mockResolvedValue(getAllPuzzlesTestData);
    RevealPixelArtTransition.getDelay.mockReturnValue(0);
    useAppContext.mockReturnValue({});
  });

  describe("Where next puzzle is available: ", () => {
    beforeEach(async () => {
      puzzleService.getPuzzle.mockResolvedValue({
        ...solvedWhenTopLeftCellFilled,
        _id: firstPuzzleId,
      });

      await act(async () =>
        renderWithRouter(
          <PuzzleContextProvider>
            <Solve />
          </PuzzleContextProvider>,
          `/puzzles/:puzzleId`,
          { puzzleId: firstPuzzleId }
        )
      );
      await act(async () => {
        fireEvent.mouseDown(screen.getByTitle("1,1"));
      });
      await act(async () => {
        fireEvent.mouseUp(screen.getByTitle("1,1"));
      });
    });

    //? US9-INT-1
    test("It should show a button to access next puzzle where one is available", async () => {
      //Assert
      expect(screen.getByText(/next/i)).toBeInTheDocument();
    });

    //? US9-INT-2
    test("It should navigate to the next puzzle when the link is clicked", async () => {
      //Arrange
      const expectedLocation = `/puzzles/${secondPuzzleId}`;
      //Act
      await act(async () => fireEvent.click(screen.getByTitle(/next/i)));
      //Assert
      expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
        expectedLocation
      );
    });
  });

  describe("Where next puzzle is available: ", () => {
    beforeEach(async () => {
      puzzleService.getPuzzle.mockResolvedValue({
        ...solvedWhenTopLeftCellFilled,
        _id: lastPuzzleId,
      });

      await act(async () =>
        renderWithRouter(
          <PuzzleContextProvider>
            <Solve />
          </PuzzleContextProvider>,
          `/puzzles/:puzzleId`,
          { puzzleId: lastPuzzleId }
        )
      );
      await act(async () => {
        fireEvent.mouseDown(screen.getByTitle("1,1"));
      });
      await act(async () => {
        fireEvent.mouseUp(screen.getByTitle("1,1"));
      });
    });

    //? US9-INT-3
    test("It should not show a button to access the next puzzle where one is not available", async () => {
      //Assert
      expect(screen.queryByText(/next/i)).toBeNull();
    });
  });
});
