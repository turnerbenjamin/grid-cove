import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import ModeSelector from "../../../src/components/solve/ModeSelector";
import GridColours from "../../../src/utils/GridColours";

describe("Mode Selector tests: ", () => {
  describe("Eliminate style where fill style is black: ", () => {
    const testColour = GridColours.ELIMINATED;
    beforeEach(() => {
      render(
        <GridContextProvider defaultFillStyle={GridColours.BLACK}>
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

    //?US9-MDS-2
    test("It should display a crossed out div where eliminate is selected", () => {
      //Act
      const modeSelector = screen.getByRole("option");
      const crossedOutDiv = modeSelector.querySelector("canvas");
      //Assert
      expect(crossedOutDiv).toBeInTheDocument();
    });

    //?US9-MDS-3
    test("It should not a white border where not selected", () => {
      //Act
      const modeSelector = screen.getByRole("option");
      //Assert
      expect(modeSelector.classList).toContain("border-grid-white");
    });
  });

  describe("Black style where fill style is black: ", () => {
    const testColour = GridColours.BLACK;
    beforeEach(() => {
      render(
        <GridContextProvider defaultFillStyle={GridColours.BLACK}>
          <ModeSelector colour={testColour} />
        </GridContextProvider>
      );
    });

    //?US9-MDS-4
    test("It should have a green border where selected", () => {
      //Act
      const modeSelector = screen.getByRole("option");
      //Assert
      expect(modeSelector.classList).toContain("border-primary-500");
    });
  });
});
