import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import Cell from "../../../src/components/grid/Cell";
import GridColours from "../../../src/utils/GridColours";
import { useGridContext } from "../../../src/hooks/contexts/gridContext";

import RevealPixelArtTransition from "../../../src/utils/RevealPixelArtTransition";

vi.mock("../../../src/utils/RevealPixelArtTransition");
vi.mock("../../../src/hooks/contexts/gridContext");

describe("Cell tests: ", () => {
  const testGridSize = 5;
  const testCellData = {
    row: 2,
    col: 3,
    colour: GridColours.BLACK,
  };

  beforeEach(() => {
    useGridContext.mockReturnValue({
      doRevealPixelArt: false,
      gridSize: testGridSize,
    });
  });

  //?US9-CLL-1
  test("It should display a cross where its colour has the isEliminated property set to true", () => {
    //Arrange
    render(
      <Cell cellData={{ ...testCellData, colour: GridColours.ELIMINATED }} />
    );
    //Act
    const cell = screen.getByRole("cell");
    const crossOutDivElement = cell.querySelector("canvas");
    //Assert
    expect(crossOutDivElement).toBeInTheDocument();
  });

  //?US10-CLL-1
  test("It should call getDelay from RevealPixelArtTransition when doRevealPixelArt is true", () => {
    //Arrange
    const expected = [testCellData.col, testCellData.row, testGridSize];
    useGridContext.mockReturnValue({
      doRevealPixelArt: true,
      gridSize: testGridSize,
    });
    RevealPixelArtTransition.getDelay.mockReturnValue(0);
    //Act
    render(<Cell cellData={testCellData} />);
    //Assert
    expect(RevealPixelArtTransition.getDelay).toBeCalledWith(...expected);
  });

  //?US10-CLL-2
  test("It should show hidden face when doRevealPixelArt is true", async () => {
    //Arrange
    useGridContext.mockReturnValue({
      doRevealPixelArt: true,
      gridSize: testGridSize,
    });
    RevealPixelArtTransition.getDelay.mockReturnValue(0);
    //Act
    render(
      <Cell
        cellData={testCellData}
        hiddenColour={GridColours.GREEN.colourCode}
      />
    );
    //Assert
    await waitFor(() =>
      expect(screen.getByRole("cell").classList).toContain("rotate-Y-180")
    );
    expect(screen.getByRole("img").classList).not.toContain("rotate-Y-180");
  });
});
