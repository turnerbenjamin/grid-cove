import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import PaintPot from "../../../src/components/build/PaintPot";
import GridColour from "../../../src/utils/GridColour";

describe("Paint pot tests", () => {
  describe("Paint pot with a dark colour", () => {
    const testColour = new GridColour("Dark", "rgb(85, 85, 85)", 1);
    let paintPot;
    beforeEach(() => {
      render(
        <GridContextProvider>
          <PaintPot colour={testColour} />
        </GridContextProvider>
      );
      paintPot = screen.getByTitle(testColour.label);
    });

    //? US5-PTP-1
    test("It should correctly set its RGB value and title based on the colour provided", () => {
      //Arrange
      const expected = testColour.rgb;
      //Act
      const actual = paintPot.style.backgroundColor;
      expect(actual).toBe(expected);
    });

    //? US5-PTP-2
    test("It should display a tick when selected", async () => {
      //Act
      await act(async () => {
        fireEvent.click(paintPot);
      });
      //Assert
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    //? US5-PTP-3
    test("It should display the correct tick colour where the colour is dark", async () => {
      //Act
      await act(async () => {
        fireEvent.click(paintPot);
      });
      const tick = screen.getByRole("img");
      console.log(tick);
      //Assert
      expect(screen.getByRole("img")).toHaveClass("fill-grid-white");
    });
  });
});
