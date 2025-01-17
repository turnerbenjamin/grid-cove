import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import Grid from "../../../src/components/grid/Grid";
import GridColours from "../../../src/utils/GridColours";
import Mode from "../../../src/components/solve/Mode";

describe("Grid tests: ", () => {
  const testGridSize = 2;
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

    //? US5-GRD-6
    test("It should not colour a cell where the right mouse button is clicked", async () => {
      //Arrange
      const cellToColour = screen.getByTitle("1,1");
      const expected = cellToColour.style.backgroundColor;
      //Act
      await act(async () => {
        fireEvent.mouseDown(cellToColour, {
          button: 1,
        });
      });
      const actual = cellToColour.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-GRD-7
    test("It should not colour a cell where the origin element clicked does not have a key data attribute", async () => {
      //Arrange
      const testOriginElement = document;
      const testCellToMoveTo = screen.getByTitle("2,1");
      const expected = testCellToMoveTo.style.backgroundColor;
      //Act
      await act(async () => {
        fireEvent.mouseDown(testOriginElement);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveTo);
      });
      const actual = testCellToMoveTo.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-GRD-8
    test("It should handle a mouse move over a non-cell element", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveTo = screen.getByTitle("2,1");
      const expected = GridColours.BLACK.rgb;
      //Act
      await act(async () => {
        fireEvent.mouseDown(testOriginCell);
      });
      await act(async () => {
        fireEvent.mouseMove(document);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveTo);
      });
      const actual = testCellToMoveTo.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
    });

    //? US5-GRD-9;
    test("It should correctly colour cells when touch events fired", async () => {
      //Arrange
      document.elementFromPoint = vi
        .fn()
        .mockReturnValue(screen.getByTitle("1,2"));
      //Act
      await act(async () => fireEvent.touchStart(screen.getByTitle("1,1")));
      await act(async () =>
        fireEvent.touchMove(screen.getByTitle("1,2"), {
          touches: [{ clientX: 1, clientY: 1 }],
        })
      );
      await act(async () => fireEvent.touchEnd(screen.getByTitle("1,2")));
      //Assert
      expect(screen.getByTitle("1,1").style.backgroundColor).toBe(
        GridColours.BLACK.rgb
      );
      expect(screen.getByTitle("1,2").style.backgroundColor).toBe(
        GridColours.BLACK.rgb
      );
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
          <Mode />
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

    //? US9-GRD-2
    test("It should not style cells when the mouse is moved over them between a mouse down and mouse up event where the mouse down event occurred in a different row or column", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveTo = screen.getByTitle("1,2");
      const expected = GridColours.ELIMINATED.rgb;
      //Act
      await act(async () => {
        fireEvent.click(screen.getByTitle(GridColours.ELIMINATED.label));
      });
      await act(async () => {
        fireEvent.mouseDown(testCellToMoveTo);
      });
      await act(async () => {
        fireEvent.mouseUp(testCellToMoveTo);
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(GridColours.BLACK.label));
      });
      await act(async () => {
        fireEvent.mouseDown(testOriginCell);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveTo);
      });
      const actual = testCellToMoveTo.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
      expect(testCellToMoveTo.querySelector("canvas")).toBeInTheDocument();
    });

    //? US9-GRD-3
    test("It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the mode is white but the fill style is not", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveTo = screen.getByTitle("1,2");
      const expected = GridColours.WHITE.rgb;
      //Act
      await act(async () => {
        fireEvent.click(screen.getByTitle(GridColours.ELIMINATED.label));
      });
      await act(async () => {
        fireEvent.mouseDown(testCellToMoveTo);
      });
      await act(async () => {
        fireEvent.mouseUp(testCellToMoveTo);
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(GridColours.WHITE.label));
      });
      await act(async () => {
        fireEvent.mouseDown(testOriginCell);
      });
      await act(async () => {
        fireEvent.mouseMove(testCellToMoveTo);
      });
      const actual = testCellToMoveTo.style.backgroundColor;
      //Assert
      expect(actual).toBe(expected);
      expect(testCellToMoveTo.querySelector("canvas")).toBeNull();
    });

    //? US9-GRD-4
    test("It should colour cells when the mouse is moved over them between a mouse down and mouse up event where the fill style is white but the mode is not", async () => {
      //Arrange
      const testOriginCell = screen.getByTitle("1,1");
      const testCellToMoveTo = screen.getByTitle("1,2");
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
  });
});
