import { screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import { getAllPuzzlesTestData } from "../../data/puzzles.test.data";
import { renderWithRouter } from "../../test.utils";
import PuzzlesList from "../../../src/components/puzzles/PuzzlesList";

describe("Puzzles list tests: ", () => {
  beforeEach(() => {
    renderWithRouter(
      <PuzzlesList puzzles={getAllPuzzlesTestData[0].puzzles} />,
      "/puzzles"
    );
  });

  //? US8-PLT-1
  test("It should all puzzles passed to it", () => {
    //Arrange
    const expected = getAllPuzzlesTestData[0].puzzles.length;
    //Assert
    expect(screen.getAllByTitle(/click to solve/i)).toHaveLength(expected);
  });
});
