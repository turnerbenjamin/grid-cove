import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterAll, beforeEach, expect } from "vitest";

import Build from "../../../src/components/build/Build";
import GridColours from "../../../src/utils/GridColours";
import * as puzzleService from "../../../src/services/puzzle.service";

describe("Build tests", () => {
  beforeEach(() => {
    render(<Build />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Before grid size set tests", () => {
    //? US5-BLD-1
    test("It should show a dropdown with size options for the grid", () => {
      expect(screen.getAllByRole("option")).toHaveLength(3);
    });
  });

  describe("After grid size set tests", () => {
    let option;
    let gridSize;
    beforeEach(async () => {
      option = screen.getAllByRole("option")[0];
      gridSize = option.value;
      await act(async () => {
        fireEvent.click(screen.getByText(/continue/i));
      });
    });

    //? US5-BLD-2
    test("It should render a grid with the correct number of cells when an option is selected", () => {
      expect(screen.getAllByRole("cell")).toHaveLength(gridSize ** 2);
      expect(screen.getByRole("grid").style.gridTemplateColumns).toBe(
        `repeat(${gridSize}, minmax(0, 1fr))`
      );
    });

    //? US5-BLD-3
    test("It should set the default fill style to black", () => {
      //Arrange
      const expected = GridColours.BLACK;
      const blackPaintPot = screen.getByTitle(expected.label);
      const tick = within(blackPaintPot).queryByRole("img");
      //Assert
      expect(tick).toBeInTheDocument();
    });

    //? US5-BLD-4
    test("It should correctly colour a cell when that cell is clicked", async () => {
      //Arrange
      const cellToColour = screen.getByTitle("1,1");
      const expected = GridColours.BLACK.rgb;
      //Act
      await act(async () => {
        fireEvent.mouseDown(cellToColour);
      });
      const actual = cellToColour.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-BLD-5
    test("It should change the colour of a previously coloured cell when clicked having selected a new colour from the paint set", async () => {
      //Arrange
      const cellToColour = screen.getByTitle("1,1");
      const newColour = GridColours.GREEN;
      //Act
      await act(async () => {
        fireEvent.mouseDown(cellToColour);
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(newColour.label));
      });
      await act(async () => {
        fireEvent.mouseDown(cellToColour);
      });
      const actual = cellToColour.style.backgroundColor;
      //Assert
      expect(actual).toBe(newColour.rgb);
    });

    //? US5-BLD-6
    test("It should not colour cells when the mouse is moved over them", async () => {
      //Arrange
      const testCell = screen.getByTitle("1,1");
      const expected = testCell.style.backgroundColor;
      //Act
      await act(async () => {
        fireEvent.mouseMove(testCell);
      });
      const actual = testCell.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-BLD-7
    test("It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in the same row or column", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveTo = screen.getByTitle("2,1");
      const expected = GridColours.BLACK.rgb;
      //Act
      await act(async () => {
        fireEvent.mouseDown(testOriginCell);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveTo);
      });
      const actual = testCellToMoveTo.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-BLD-8
    test("It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in a different row or column", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveToInDifferentRowAndColumn = screen.getByTitle("2,2");
      const expected = GridColours.BLACK.rgb;
      //Act
      await act(async () => {
        fireEvent.mouseDown(testOriginCell);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveToInDifferentRowAndColumn);
      });
      const actual =
        testCellToMoveToInDifferentRowAndColumn.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-BLD-9
    test("It should not continue to colour cells after a mouse up event", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveTo = screen.getByTitle("2,1");
      const testCellToMoveToAfterMouseUp = screen.getByTitle("2,2");
      const expected = testCellToMoveToAfterMouseUp.style.backgroundColor;
      //Act
      await act(async () => {
        fireEvent.mouseDown(testOriginCell);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveTo);
      });
      await act(async () => {
        fireEvent.mouseUp(testCellToMoveTo);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveToAfterMouseUp);
      });
      const actual = testCellToMoveToAfterMouseUp.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });
  });
  describe("Selecting non default grid size", () => {
    //? US5-BLD-10
    test("It should render a grid with the correct number of cells when a non-default option is selected", async () => {
      const dropdown = screen.getByRole("menu");
      const gridSize = 10;
      await act(async () => {
        fireEvent.change(dropdown, {
          target: { value: gridSize },
        });
      });
      await act(async () => {
        fireEvent.click(screen.getByText(/continue/i));
      });
      expect(screen.getAllByRole("cell")).toHaveLength(gridSize ** 2);
      expect(screen.getByRole("grid").style.gridTemplateColumns).toBe(
        `repeat(${gridSize}, minmax(0, 1fr))`
      );
    });
  });

  describe("Create puzzle tests", () => {
    vi.mock("../../../src/services/puzzle.service");

    const testPuzzle = {
      pixelArt: "1".repeat(3) + "0".repeat(22),
      size: 5,
      title: "Test title",
    };
    let createPuzzleResolver;
    let createPuzzleRejecter;

    beforeEach(async () => {
      const promise = new Promise((resolve, reject) => {
        createPuzzleResolver = resolve;
        createPuzzleRejecter = reject;
      });
      puzzleService.createPuzzle.mockReturnValue(promise);

      await act(async () => {
        fireEvent.click(screen.getByText(/continue/i));
      });
    });

    //? US6-BLD-1
    test("It should call createPuzzle on the puzzle service with the correct arguments", async () => {
      //Act
      await act(async () => {
        fireEvent.mouseDown(screen.getByTitle("1,1"));
        fireEvent.mouseDown(screen.getByTitle("2,1"));
        fireEvent.mouseDown(screen.getByTitle("3,1"));
        fireEvent.change(screen.getByPlaceholderText(/title/i), {
          target: { value: testPuzzle.title },
        });
      });
      await act(async () => {
        fireEvent.mouseUp(screen.getByTitle("3,1"));
      });
      await act(async () => {
        fireEvent.click(screen.getByText(/save/i));
      });
      //Assert
      expect(puzzleService.createPuzzle).toBeCalledWith(testPuzzle);
    });
  });
});
