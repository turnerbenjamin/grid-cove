import { afterEach, beforeEach, expect } from "vitest";

import GridSolveState from "../../src/utils/GridSolveState";

describe("Grid Solve State tests: ", () => {
  //Note, this test puzzle is purposely invalid, it has more than one potential solution.
  const testPuzzle = {
    size: 3,
    clues: {
      rowClues: [[1, 1], [1, 1], [1], [1, 1], [1, 1]],
      columnClues: [[1, 1], [1, 1], [1], [1, 1], [1, 1]],
    },
    solution: "1000101010001000101010001",
  };
  let emptyGridFillString;
  beforeEach(() => {
    emptyGridFillString = "0".repeat(25);
  });

  afterEach(() => {
    emptyGridFillString = null;
  });

  //?US9-GSS-1
  test("It should return false for a given row where the state of that row does not match its clue signature", () => {
    //Act
    const gridSolveState = new GridSolveState(emptyGridFillString, testPuzzle);
    //Assert
    expect(gridSolveState.getRowSolveState(0)).toEqual(false);
  });
});
