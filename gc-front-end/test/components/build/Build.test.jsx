import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import Build from "../../../src/components/build/Build";
import GridColours from "../../../src/utils/GridColours";

describe("Build tests", () => {
  beforeEach(() => {
    render(<Build />);
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
        fireEvent.click(option);
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
      const cellToColour = screen.getAllByRole("cell")[0];
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
      const cellToColour = screen.getAllByRole("cell")[0];
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
      const testCell = screen.getAllByRole("cell")[0];
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
});
