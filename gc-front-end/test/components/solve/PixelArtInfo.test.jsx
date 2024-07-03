import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { renderWithRouter } from "../../test.utils";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import PixelArtInfo from "../../../src/components/solve/PixelArtInfo";

describe("Pixel art info tests: ", () => {
  //?US7-PAI-1
  test("It should show unknown if the artist is undefined", () => {
    const testPuzzleId = "123";
    //Act
    renderWithRouter(
      <PuzzleContextProvider>
        <PixelArtInfo puzzle={{ _id: testPuzzleId, title: "testPuzzle" }} />
      </PuzzleContextProvider>,
      "/"
    );
    //Assert
    expect(screen.getByText(/by unknown/i)).toBeInTheDocument();
  });
});
