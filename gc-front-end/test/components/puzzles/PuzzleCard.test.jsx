import { act, fireEvent, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import { renderWithRouter } from "../../test.utils";
import PuzzleCard from "../../../src/components/puzzles/PuzzleCard";

describe("Puzzle Card tests: ", () => {
  const testIndex = 5;
  const testId = "testId";

  beforeEach(() => {
    renderWithRouter(
      <PuzzleCard puzzleIndex={testIndex} puzzleId={testId} />,
      "/puzzles"
    );
  });

  //? US8-PZC-1
  test("It should display the puzzleIndex", () => {
    //Assert
    expect(screen.getByText(`${testIndex}`)).toBeInTheDocument();
  });

  //? US8-PZC-2
  test("It should navigate to the correct url when clicked", async () => {
    //Arrange
    const expectedLocation = `/puzzles/${testId}`;
    //Act
    await act(() => fireEvent.click(screen.getByTitle(/click to solve/i)));
    //Assert
    expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
      expectedLocation
    );
  });
});
