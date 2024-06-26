import { act, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { Link } from "react-router-dom";

import Puzzles from "../../../src/components/puzzles/Puzzles";

import { getAllPuzzles } from "../../data/puzzles.test.data";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";

import * as puzzlesService from "../../../src/services/puzzle.service";

vi.mock("react-router-dom");
vi.mock("../../../src/services/puzzle.service");

describe("Puzzles list tests: ", () => {
  beforeEach(async () => {
    Link = vi.fn(({ children }) => <div role="puzzleCard">{children}</div>);
    puzzlesService.getPuzzles.mockResolvedValueOnce(getAllPuzzles);
    await act(async () => {
      render(
        <PuzzleContextProvider>
          <Puzzles />
        </PuzzleContextProvider>
      );
    });
  });

  //? US8-PZL-1
  test("It should call getAllPuzzles", () => {
    expect(puzzlesService.getPuzzles).toHaveBeenCalledOnce();
  });
});
