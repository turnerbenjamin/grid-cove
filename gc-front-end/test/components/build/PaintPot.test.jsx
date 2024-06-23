import { render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { GridContextProvider } from "../../../src/hooks/contexts/gridContext";
import PaintPot from "../../../src/components/build/PaintPot";
import GridColours from "../../../src/utils/GridColours";

describe("Paint pot tests", () => {
  const gridColours = GridColours.getAllColours();
  const testColour = gridColours[0];
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
});
