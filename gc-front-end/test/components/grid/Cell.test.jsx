import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Cell from "../../../src/components/grid/Cell";
import GridColours from "../../../src/utils/GridColours";
import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";

describe("Cell tests: ", () => {
  //?US9-CLL-1
  test("It should display a cross where its colour has the isEliminated property set to true", () => {
    //Arrange
    render(
      <GridContextProvider>
        <Cell cellData={{ colour: GridColours.ELIMINATED }} />
      </GridContextProvider>
    );
    //Act
    const cell = screen.getByRole("cell");
    const crossOutDivElement = cell.querySelector("canvas");
    //Assert
    expect(crossOutDivElement).toBeInTheDocument();
  });
});
