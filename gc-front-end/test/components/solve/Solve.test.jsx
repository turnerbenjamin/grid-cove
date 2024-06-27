import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import Solve from "../../../src/components/solve/Solve";
import * as puzzleService from "../../../src/services/puzzle.service";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext";
import * as reactRouterDom from "react-router-dom";

vi.mock("../../../src/services/puzzle.service");
vi.mock("react-router-dom");

describe("Solve tests: ", () => {
  let getPuzzleResolver;
  let getPuzzleRejecter;
  const testPuzzleId = "testPuzzleId";
  reactRouterDom.useParams = vi.fn().mockReturnValue({
    puzzleId: testPuzzleId,
  });

  beforeEach(async () => {
    const promise = new Promise((resolve, reject) => {
      getPuzzleResolver = resolve;
      getPuzzleRejecter = reject;
    });

    puzzleService.getPuzzle.mockReturnValue(promise);
    await act(async () =>
      render(
        <PuzzleContextProvider>
          <Solve />
        </PuzzleContextProvider>
      )
    );
  });

  //? US5-SLV-1
  test("It should call getPuzzle with the correct argument", () => {
    expect(puzzleService.getPuzzle).toBeCalledWith(testPuzzleId);
  });
});
