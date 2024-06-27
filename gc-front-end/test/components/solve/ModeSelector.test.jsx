import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import ModeSelector from "../../../src/components/solve/ModeSelector";
import GridColours from "../../../src/utils/GridColours";

describe("Mode Selector tests: ", () => {
  const testColour = GridColours.ELIMINATED;
  beforeEach(() => {
    render(
      <GridContextProvider>
        <ModeSelector colour={testColour} />
      </GridContextProvider>
    );
  });

  //?US9-MDS-1
  test("It should correctly set its RGB value and title based on the colour provided", () => {
    //Act
    const modeSelector = screen.getByRole("option");
    //Assert
    expect(modeSelector.style.backgroundColor).toEqual(testColour.rgb);
    expect(modeSelector.title).toEqual(testColour.label);
  });
});
