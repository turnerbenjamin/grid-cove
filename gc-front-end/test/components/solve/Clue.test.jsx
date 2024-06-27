import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import Clue from "../../../src/components/solve/Clue";
import { usePuzzleContext } from "../../../src/hooks/contexts/puzzleContext";

vi.mock("../../../src/hooks/contexts/puzzleContext");

describe("Clue test: ", () => {
  const testClue = [1, 2];
  const testIndex = 0;

  beforeEach(() => {
    usePuzzleContext.mockReturnValue({
      solveState: {
        getColumnSolveState: vi.fn(),
      },
    });
    render(<Clue clue={testClue} index={testIndex} />);
  });

  //? US9-CLU-1
  test("It should display each clue element", () => {
    //Arrange
    const expected = ["1,", "2"];
    //Assert
    expect(screen.getByText(expected[0])).toBeInTheDocument();
    expect(screen.getByText(expected[1])).toBeInTheDocument();
  });

  //? US9-CLU-2
  test("It should display as a flex col where isRow prop is false", () => {
    //Assert
    expect(screen.getByRole("figure").classList).toContain("flex-col");
  });
});
