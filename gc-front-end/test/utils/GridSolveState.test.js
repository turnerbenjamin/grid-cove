import { afterEach, beforeEach, expect } from "vitest";

import GridSolveState from "../../src/utils/GridSolveState";

describe("Grid Solve State tests: ", () => {
  //Note, this test puzzle is purposely invalid, it has more than one potential solution.
  const testPuzzle = {
    size: 5,
    clues: {
      rowClues: [[1, 1], [1, 1], [1], [1, 1], [1, 1]],
      columnClues: [[1, 1], [1, 1], [1], [1, 1], [1, 1]],
    },
    solution: "1000101010001000101010001",
    alternativeSolution: "0101010001001001000101010",
  };
  let testGridFillString;
  beforeEach(() => {
    testGridFillString = "0".repeat(25);
  });

  afterEach(() => {
    testGridFillString = null;
  });

  //?US9-GSS-1
  test("It should return false for a given row where the state of that row does not match its clue signature", () => {
    //Act
    const gridSolveState = new GridSolveState(testGridFillString, testPuzzle);
    //Assert
    expect(gridSolveState.getRowSolveState(0)).toEqual(false);
  });

  //?US9-GSS-2
  test(" It should return true for a given row where it's state matches the solution", () => {
    //Arrange
    testGridFillString =
      testPuzzle.solution.slice(0, 5) + testGridFillString.slice(5);
    //Act
    const gridSolveState = new GridSolveState(testGridFillString, testPuzzle);
    //Assert
    expect(gridSolveState.getRowSolveState(0)).toEqual(true);
  });

  //?US9-GSS-3
  test("It should return true for a given row where it's state matches the its clue signature but not the solution", () => {
    //Arrange
    testGridFillString =
      testPuzzle.alternativeSolution.slice(0, 5) + testGridFillString.slice(5);
    //Act
    const gridSolveState = new GridSolveState(testGridFillString, testPuzzle);
    //Assert
    expect(gridSolveState.getRowSolveState(0)).toEqual(true);
  });

  //?US9-GSS-4
  test("It should return false for a given column where the state of that column does not match its clue signature", () => {
    //Act
    const gridSolveState = new GridSolveState(testGridFillString, testPuzzle);
    //Assert
    expect(gridSolveState.getColumnSolveState(0)).toEqual(false);
  });
});
