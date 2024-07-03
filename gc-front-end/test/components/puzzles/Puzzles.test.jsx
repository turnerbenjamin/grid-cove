import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import { mockPromise, renderWithRouter } from "../../test.utils";
import { getAllPuzzlesTestData } from "../../data/puzzles.test.data";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import Puzzles from "../../../src/components/puzzles/Puzzles";
import * as puzzlesService from "../../../src/services/puzzle.service";

vi.mock("../../../src/services/puzzle.service");

describe("Puzzles list tests: ", () => {
  let getPuzzlesPromise;
  let getPuzzlesResolver;
  let getPuzzlesRejecter;

  beforeEach(async () => {
    [getPuzzlesPromise, getPuzzlesResolver, getPuzzlesRejecter] = mockPromise();
    puzzlesService.getPuzzles.mockReturnValueOnce(getPuzzlesPromise);

    await act(async () => {
      renderWithRouter(
        <PuzzleContextProvider>
          <Puzzles />
        </PuzzleContextProvider>,
        "/puzzles"
      );
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  //? US8-PZL-1
  test("It should call getAllPuzzles", () => {
    //Assert
    expect(puzzlesService.getPuzzles).toHaveBeenCalledOnce();
  });

  //? US8-PZL-2
  test("It should display a loading spiner while getAllPuzzles is pending", () => {
    //Assert
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //? US8-PZL-3
  test("It should display all puzzles with a heading for each size group when getAllPuzzles resolves", async () => {
    //Arrange
    const expectedPuzzleCount = getAllPuzzlesTestData.flatMap(
      (puzzleGroup) => puzzleGroup.puzzles
    ).length;
    //Act
    await act(async () => {
      getPuzzlesResolver(getAllPuzzlesTestData);
    });
    //Assert
    expect(screen.getAllByTitle(/click to solve/i)).toHaveLength(
      expectedPuzzleCount
    );
    expect(screen.getByText("5 x 5")).toBeInTheDocument();
    expect(screen.getByText("10 x 10")).toBeInTheDocument();
    expect(screen.getByText("15 x 15")).toBeInTheDocument();
  });

  //? US8-PZL-4
  test("It should display a notification where getAllPuzzles finds no puzzles", async () => {
    //Act
    await act(async () => {
      getPuzzlesResolver([]);
    });
    //Assert
    expect(screen.getByText(/No puzzles found/i)).toBeInTheDocument();
  });

  //? US8-PZL-5
  test("It should display an error message where getAllPuzzles rejects", async () => {
    //Arrange
    const testError = "Test error";
    //Act
    await act(async () => {
      getPuzzlesRejecter(new Error(testError));
    });
    //Assert
    expect(screen.getByText(testError)).toBeInTheDocument();
  });

  //? US8-PZL-6
  test("should navigate to the correct page when a Puzzle card is clicked", async () => {
    //Arrange
    const testPuzzleId = "testPuzzleId";
    const expectedLocation = `/puzzles/${testPuzzleId}`;
    //Act
    await act(async () => {
      getPuzzlesResolver([
        {
          size: 5,
          puzzles: [testPuzzleId],
        },
      ]);
    });
    const puzzleCard = screen.getByTitle(/click to solve/i);
    await act(async () => {
      fireEvent.click(puzzleCard);
    });
    //Assert
    expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
      expectedLocation
    );
  });
});
