import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { Link } from "react-router-dom";

import PuzzleCard from "../../../src/components/puzzles/PuzzleCard";

vi.mock("react-router-dom");

describe("Puzzle Card tests: ", () => {
  const testIndex = 5;
  const testId = "testId";
  Link = vi.fn(({ to, children }) => <div data-testid={to}>{children}</div>);

  beforeEach(() => {
    render(<PuzzleCard puzzleIndex={testIndex} puzzleId={testId} />);
  });

  //? US8-PZC-1
  test("It should display the puzzleIndex", () => {
    screen.debug();
    expect(screen.getByText(`${testIndex}`)).toBeInTheDocument();
  });
});
