import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { Link } from "react-router-dom";

import { getAllPuzzles } from "../../data/puzzles.test.data";
import PuzzlesList from "../../../src/components/puzzles/PuzzlesList";

vi.mock("react-router-dom");

describe("Puzzles list tests: ", () => {
  beforeEach(() => {
    Link = vi.fn(({ children }) => <div role="puzzleCard">{children}</div>);
    render(<PuzzlesList puzzles={getAllPuzzles[0].puzzles} />);
  });

  //? US8-PLT-1
  test("It should all puzzles passed to it", () => {
    const expected = getAllPuzzles[0].puzzles.length;
    expect(screen.getAllByRole("puzzleCard")).toHaveLength(expected);
  });
});
