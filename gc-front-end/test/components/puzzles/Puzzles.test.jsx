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
});
