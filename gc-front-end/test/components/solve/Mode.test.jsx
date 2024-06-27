import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Mode from "../../../src/components/solve/Mode";
import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import GridColours from "../../../src/utils/GridColours";

describe("Mode tests: ", () => {
  test("It should display the 3 modes", () => {
    //Act
    render(
      <GridContextProvider>
        <Mode />
      </GridContextProvider>
    );
    const modeSelectors = screen.getAllByRole("option");
    expect(modeSelectors).toHaveLength(3);
    expect(screen.getByTitle(GridColours.BLACK.label)).toBeInTheDocument();
    expect(screen.getByTitle(GridColours.WHITE.label)).toBeInTheDocument();
    expect(screen.getByTitle(GridColours.ELIMINATED.label)).toBeInTheDocument();
  });
});
