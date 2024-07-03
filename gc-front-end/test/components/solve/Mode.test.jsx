import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import GridColours from "../../../src/utils/GridColours";
import Mode from "../../../src/components/solve/Mode";

describe("Mode tests: ", () => {
  test("It should display the 3 modes", () => {
    //Act
    render(
      <GridContextProvider>
        <Mode />
      </GridContextProvider>
    );
    const modeSelectors = screen.getAllByRole("option");
    //Assert
    expect(modeSelectors).toHaveLength(3);
    expect(screen.getByTitle(GridColours.BLACK.label)).toBeInTheDocument();
    expect(screen.getByTitle(GridColours.WHITE.label)).toBeInTheDocument();
    expect(screen.getByTitle(GridColours.ELIMINATED.label)).toBeInTheDocument();
  });
});
