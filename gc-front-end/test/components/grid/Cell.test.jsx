import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import Cell from "../../../src/components/grid/Cell";
import GridColours from "../../../src/utils/GridColours";

describe("Cell tests: ", () => {
  //?US9-CLL-1
  test("It should display a cross where its colour has the isEliminated property set to true", () => {
    //Arrange
    render(<Cell cellData={{ colour: GridColours.ELIMINATED }} />);
    //Act
    const cell = screen.getByRole("cell");
    const crossOutDivElement = cell.querySelector("canvas");
    //Assert
    expect(crossOutDivElement).toBeInTheDocument();
  });
});
