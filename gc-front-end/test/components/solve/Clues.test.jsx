import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import Clues from "../../../src/components/solve/Clues";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";

import { getPuzzleTestData } from "../../data/puzzles.test.data";

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
    expect(screen.getAllByRole("figure")).toHaveLength(testClues.length);
  });
});
