import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";
import { Link } from "react-router-dom";

import Puzzles from "../../../src/components/puzzles/Puzzles";

import { getAllPuzzles } from "../../data/puzzles.test.data";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";

import * as puzzlesService from "../../../src/services/puzzle.service";

vi.mock("react-router-dom");
vi.mock("../../../src/services/puzzle.service");

describe("Puzzles list tests: ", () => {
  let getPuzzlesResolver;
  let getPuzzlesRejecter;

  beforeEach(async () => {
    const promise = new Promise((resolve, reject) => {
      getPuzzlesResolver = resolve;
      getPuzzlesRejecter = reject;
    });

    Link = vi.fn(({ children }) => <div role="puzzleCard">{children}</div>);
    puzzlesService.getPuzzles.mockReturnValueOnce(promise);

    await act(async () => {
      render(
        <PuzzleContextProvider>
          <Puzzles />
        </PuzzleContextProvider>
      );
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  //? US8-PZL-1
  test("It should call getAllPuzzles", () => {
    expect(puzzlesService.getPuzzles).toHaveBeenCalledOnce();
  });

  //? US8-PZL-2
  test("It should display a loading spiner while getAllPuzzles is pending", () => {
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //? US8-PZL-3
  test("It should display all puzzles with a heading for each size group when getAllPuzzles resolves", async () => {
    //Arrange
    const expectedPuzzleCount = getAllPuzzles.flatMap(
      (puzzleGroup) => puzzleGroup.puzzles
    ).length;
    //Act
    await act(async () => {
      getPuzzlesResolver(getAllPuzzles);
    });

    expect(screen.getAllByRole("puzzleCard")).toHaveLength(expectedPuzzleCount);
    expect(screen.getByText("5 x 5")).toBeInTheDocument();
    expect(screen.getByText("10 x 10")).toBeInTheDocument();
    expect(screen.getByText("15 x 15")).toBeInTheDocument();
  });

  //? US8-PZL-4
  test("It should display a notification where getAllPuzzles finds no puzzles", async () => {
    //Act
    await act(async () => {
      getPuzzlesResolver([]);
    });
    expect(screen.getByText(/No puzzles found/i)).toBeInTheDocument();
  });
});
