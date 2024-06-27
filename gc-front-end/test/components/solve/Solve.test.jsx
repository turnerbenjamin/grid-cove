import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import Solve from "../../../src/components/solve/Solve";

import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import { getPuzzleTestData } from "../../data/puzzles.test.data";

import * as puzzleService from "../../../src/services/puzzle.service";
import * as reactRouterDom from "react-router-dom";
import GridColours from "../../../src/utils/GridColours";

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

  //? US9-SLV-1
  test("It should call getPuzzle with the correct argument", () => {
    expect(puzzleService.getPuzzle).toBeCalledWith(testPuzzleId);
  });

  //? US9-SLV-2
  test("It should show a loading spinner while getPuzzle is pending", () => {
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //? US9-SLV-3
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

  //? US9-SLV-4
  test("It should render a grid with the correct number of cells", async () => {
    //Act
    await act(async () => {
      getPuzzleResolver(getPuzzleTestData);
    });
    //Assert
    expect(screen.getAllByRole("cell")).toHaveLength(
      getPuzzleTestData.solution.length
    );
  });

  //? US9-SLV-5
  test("It should set the default fill style to black", async () => {
    //Act
    await act(async () => {
      getPuzzleResolver(getPuzzleTestData);
    });
    //Assert
    expect(screen.getByTitle(GridColours.BLACK.label)).toHaveClass(
      "border-primary-500"
    );
  });

  //? US9-SLV-6
  test("It should correctly change the style of a cell where a non-default mode is selected", async () => {
    //Act
    await act(async () => {
      getPuzzleResolver(getPuzzleTestData);
    });
    await act(async () => {
      fireEvent.click(screen.getByTitle(GridColours.ELIMINATED.label));
    });
    const cellToChange = screen.getByTitle("1,1");
    await act(async () => {
      fireEvent.mouseDown(cellToChange);
    });
    //Assert
    expect(cellToChange.style.backgroundColor).toEqual(
      GridColours.ELIMINATED.rgb
    );
    expect(cellToChange.querySelector("canvas")).toBeInTheDocument();
  });
});
