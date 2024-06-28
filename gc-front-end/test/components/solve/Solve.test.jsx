import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import Solve from "../../../src/components/solve/Solve";

import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import {
  getPuzzleTestData,
  solvedWhenTopLeftCellFilled,
} from "../../data/puzzles.test.data";

import GridColours from "../../../src/utils/GridColours";
import RevealPixelArtTransition from "../../../src/utils/RevealPixelArtTransition";

import * as puzzleService from "../../../src/services/puzzle.service";
import * as reactRouterDom from "react-router-dom";
import { useAppContext } from "../../../src/hooks/contexts/appContext";

vi.mock("../../../src/services/puzzle.service");
vi.mock("../../../src/hooks/contexts/appContext");
vi.mock("../../../src/utils/RevealPixelArtTransition");
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
    useAppContext.mockReturnValue({});

    await act(async () =>
      render(
        <PuzzleContextProvider>
          <Solve />
        </PuzzleContextProvider>
      )
    );
  });

  describe("Initial render tests: ", () => {
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
  });

  describe("User events on the grid tests: ", () => {
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

  describe("Solved puzzle tests: ", () => {
    const testPuzzle = solvedWhenTopLeftCellFilled;
    beforeEach(async () => {
      RevealPixelArtTransition.getDelay.mockReturnValue(0);

      //Act
      await act(async () => {
        getPuzzleResolver(testPuzzle);
      });
      await act(async () => {
        fireEvent.mouseDown(screen.getByTitle("1,1"));
      });
      await act(async () => {
        fireEvent.mouseUp(screen.getByTitle("1,1"));
      });
    });

    //? US10-SLV-1
    test("It should show the pixel art once the puzzle is solved", async () => {
      //Arrange
      const expectedCalls = testPuzzle.size ** 2;
      //Assert
      expect(RevealPixelArtTransition.getDelay).toBeCalledTimes(expectedCalls);
    });

    //? US7-SLV-1
    test("It should show the puzzle title and artist username once the puzzle is solved", async () => {
      //Assert
      expect(screen.getByText(/solved/i)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(testPuzzle.title, "i"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(testPuzzle.artist.username, "i"))
      ).toBeInTheDocument();
    });
  });

  describe("Admin actions tests: ", () => {
    //?US11-SLV-1
    test("It should not show admin actions when no current user", () => {
      expect(screen.queryByText(/admin actions/i)).toBeNull();
    });
  });
});
