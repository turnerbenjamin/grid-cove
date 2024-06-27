import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import Grid from "../../../src/components/grid/Grid";
import GridColours from "../../../src/utils/GridColours";

describe("Grid tests: ", () => {
  const testGridSize = 5;
  const testDefaultFillStyle = GridColours.BLACK;

  describe("General grid tests: ", () => {
    beforeEach(() => {
      render(
        <GridContextProvider
          size={testGridSize}
          defaultFillStyle={testDefaultFillStyle}
        >
          <Grid />
        </GridContextProvider>
      );
    });

    //? US5-GRD-1
    test("It should correctly colour a cell when that cell is clicked", async () => {
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

    //? US5-GRD-2
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
  });

  describe("Build configuration tests: ", () => {
    beforeEach(() => {
      render(
        <GridContextProvider
          size={testGridSize}
          defaultFillStyle={testDefaultFillStyle}
        >
          <Grid />
        </GridContextProvider>
      );
    });

    //? US5-GRD-3
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

    //? US5-GRD-4
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

    //? US5-GRD-5
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

  describe("Solve configuration tests: ", () => {
    beforeEach(() => {
      render(
        <GridContextProvider
          size={testGridSize}
          defaultFillStyle={testDefaultFillStyle}
          doColourInsideTheLines
          doNotOverwriteFilledCellsOnDrag
        >
          <Grid />
        </GridContextProvider>
      );
    });

    //? US9-GRD-1
    test("It should not style cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in a different row or column", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveToInDifferentRowAndColumn = screen.getByTitle("2,2");
      const expected =
        testCellToMoveToInDifferentRowAndColumn.style.backgroundColor;
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
  });
});
