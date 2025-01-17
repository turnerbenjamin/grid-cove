import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { mockPromise } from "../../test.utils";
import Build from "../../../src/components/build/Build";
import GridColours from "../../../src/utils/GridColours";
import * as puzzleService from "../../../src/services/puzzle.service";

vi.mock("../../../src/components/general/Modal");
vi.mock("react-router-dom");

describe("Build tests: ", () => {
  beforeEach(async () => {
    await act(async () => render(<Build />));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Before grid size set tests: ", () => {
    //? US5-BLD-1
    test("It should show a dropdown with size options for the grid", () => {
      //Assert
      expect(screen.getAllByRole("option")).toHaveLength(3);
    });
  });

  describe("After grid size set tests: ", () => {
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
      //Assert
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

    //? US5-BLD-6:
    test("It should reshow a dropdown with size options for the grid when go back is clicked", async () => {
      //Act
      await act(async () => {
        fireEvent.click(screen.getByText(/go back/i));
      });
      //Assert
      expect(screen.getAllByRole("option")).toHaveLength(3);
    });
  });

  describe("Selecting non default grid size: ", () => {
    //? US5-BLD-5
    test("It should render a grid with the correct number of cells when a non-default option is selected", async () => {
      //Arrange
      const dropdown = screen.getByRole("menu");
      const gridSize = 10;
      //Act
      await act(async () => {
        fireEvent.change(dropdown, {
          target: { value: gridSize },
        });
      });
      await act(async () => {
        fireEvent.click(screen.getByText(/continue/i));
      });
      //Assert
      expect(screen.getAllByRole("cell")).toHaveLength(gridSize ** 2);
      expect(screen.getByRole("grid").style.gridTemplateColumns).toBe(
        `repeat(${gridSize}, minmax(0, 1fr))`
      );
    });
  });

  describe("Create puzzle tests: ", () => {
    vi.mock("../../../src/services/puzzle.service");
    const testPuzzle = {
      pixelArt: "1".repeat(3) + "0".repeat(22),
      size: 5,
      title: "Test title",
    };
    let createPuzzlePromise;
    let createPuzzleResolver;

    beforeEach(async () => {
      [createPuzzlePromise, createPuzzleResolver] = mockPromise();
      puzzleService.createPuzzle.mockReturnValue(createPuzzlePromise);

      await act(async () => {
        fireEvent.click(screen.getByText(/continue/i));
      });

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
    });

    //? US6-BLD-1
    test("It should call createPuzzle on the puzzle service with the correct arguments", async () => {
      //Assert
      expect(puzzleService.createPuzzle).toBeCalledWith(testPuzzle);
    });

    //? US6-BLD-2
    test("It should disable elements on the page when the puzzle service is loading", async () => {
      //Assert
      expect(screen.getByTestId("build-wrapper").classList).toContain(
        "disabled"
      );
    });

    //? US6-BLD-3
    test("It should reset the grid cells to white when createPuzzle resolves", async () => {
      //Act
      await act(async () => {
        createPuzzleResolver({});
      });
      //Assert
      expect(screen.getByTitle("1,1").style.backgroundColor).toEqual(
        GridColours.WHITE.rgb
      );
    });
  });

  //? US6-BLD-4
  test("It should display errors after clicking save where the puzzleString is invalid", async () => {
    //Act
    await act(async () => fireEvent.click(screen.getByText(/continue/i)));
    await act(async () => fireEvent.mouseDown(screen.getByTitle("1,1")));
    await act(async () => fireEvent.mouseUp(screen.getByTitle("2,1")));
    await act(async () => fireEvent.click(screen.getByText(/save/i)));
    //Assert
    expect(
      screen.getByText(/makes up over 90% of the image/i)
    ).toBeInTheDocument();
  });
});
