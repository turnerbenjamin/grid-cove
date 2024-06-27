import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import Solve from "../../../src/components/solve/Solve";
import * as puzzleService from "../../../src/services/puzzle.service";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import * as reactRouterDom from "react-router-dom";

vi.mock("../../../src/services/puzzle.service");
vi.mock("react-router-dom");

describe("Solve tests: ", () => {
  let getPuzzleResolver;
  let getPuzzleRejecter;
  const testPuzzleId = "testPuzzleId";
  reactRouterDom.useParams = vi.fn().mockReturnValue({
    puzzleId: testPuzzleId,
  });

  beforeEach(async () => {
    const promise = new Promise((resolve, reject) => {
      getPuzzleResolver = resolve;
      getPuzzleRejecter = reject;
    });

    puzzleService.getPuzzle.mockReturnValue(promise);

    await act(async () =>
      render(
        <PuzzleContextProvider>
          <Solve />
        </PuzzleContextProvider>
      )
    );
  });

  //? US5-SLV-1
  test("It should call getPuzzle with the correct argument", () => {
    expect(puzzleService.getPuzzle).toBeCalledWith(testPuzzleId);
  });

  //? US5-SLV-2
  test("It should show a loading spinner while getPuzzle is pending", () => {
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //? US5-SLV-3
  test("It should display errors where getPuzzle rejects", async () => {
    //Arrange
    const expected = "Test Error";
    //Act
    await act(async () => {
      getPuzzleRejecter(expected);
    });
    //Assert
    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });
});
