import { act, fireEvent, render, screen } from "@testing-library/react";

import PaintSet from "../../../src/components/build/PaintSet";
import { expect } from "vitest";
import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import GridColours from "../../../src/utils/GridColours";

describe("Paint set tests", () => {
  //? US5-PTS-1
  test("It should display the 16 colours returned from GridColours", () => {
    //Arrange
    const gridColours = GridColours.getAllColours();
    render(
      <GridContextProvider>
        <PaintSet />
      </GridContextProvider>
    );
    //Assert
    expect(screen.getByTitle(gridColours[0].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[1].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[2].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[3].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[4].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[5].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[6].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[7].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[8].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[9].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[10].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[11].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[12].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[13].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[14].label)).toBeInTheDocument();
    expect(screen.getByTitle(gridColours[15].label)).toBeInTheDocument();
  });
});
