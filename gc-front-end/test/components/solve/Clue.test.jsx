import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import Clue from "../../../src/components/solve/Clue";
import * as puzzleContext from "../../../src/hooks/contexts/puzzleContext";

vi.mock("../../../src/hooks/contexts/puzzleContext");

describe("Clue test: ", () => {
  const testClue = [1, 2];
  const testIndex = 0;
  let getColumnSolveStateMock;

  beforeEach(() => {
    getColumnSolveStateMock = vi.fn();
    puzzleContext.usePuzzleContext.mockReturnValue({
      solveState: {
        getColumnSolveState: getColumnSolveStateMock,
      },
    });
  });

  //? US9-CLU-1
  test("It should display each clue element", () => {
    //Arrange
    render(<Clue clue={testClue} index={testIndex} />);
    const expected = ["1,", "2"];
    //Assert
    expect(screen.getByText(expected[0])).toBeInTheDocument();
    expect(screen.getByText(expected[1])).toBeInTheDocument();
  });

  //? US9-CLU-2
  test("It should display as a flex col where isRow prop is false", () => {
    //Arrange
    render(<Clue clue={testClue} index={testIndex} />);
    //Assert
    expect(screen.getByRole("figure").classList).toContain("flex-col");
  });

  //? US9-CLU-3
  test("It should set opacity below 100 where the clue is solved", () => {
    //Arrange
    getColumnSolveStateMock.mockReturnValue(true);
    render(<Clue clue={testClue} index={testIndex} />);
    //Assert
    expect(getColumnSolveStateMock).toHaveBeenCalledWith(testIndex);
    expect(screen.getByRole("figure").classList).toContain("opacity-50");
  });

  //? US9-CLU-4
  test("It should set opacity to 100 where the clue is not solved", () => {
    //Arrange
    getColumnSolveStateMock.mockReturnValue(false);
    render(<Clue clue={testClue} index={testIndex} />);
    //Assert
    expect(getColumnSolveStateMock).toHaveBeenCalledWith(testIndex);
    expect(screen.getByRole("figure").classList).toContain("opacity-100");
  });
});
