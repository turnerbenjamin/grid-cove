import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import { getPuzzleTestData } from "../../data/puzzles.test.data";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import Clues from "../../../src/components/solve/Clues";

vi.mock("react-router-dom");

describe("Clues tests: ", () => {
  let testClues;

  beforeEach(() => {
    testClues = getPuzzleTestData.clues.rowClues;
  });

  afterEach(() => {
    testClues = null;
  });

  //? US9-CLS-1
  test("It should display all clues passed to it", () => {
    //Act
    render(
      <PuzzleContextProvider>
        <Clues clues={testClues} />
      </PuzzleContextProvider>
    );
    //Assert
    expect(screen.getAllByRole("figure")).toHaveLength(testClues.length);
  });

  //? US9-CLS-2
  test("It should show a 0 where a clue has no elements", () => {
    //Arrange
    const cluesWithAnEmptyElement = [...testClues];
    cluesWithAnEmptyElement.push([]);
    //Act
    render(
      <PuzzleContextProvider>
        <Clues clues={cluesWithAnEmptyElement} />
      </PuzzleContextProvider>
    );
    //Assert
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
