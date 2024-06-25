import { screen, render, act, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";

import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext.jsx";
import SaveControls from "../../../src/components/build/SaveControls.jsx";
import * as gridContext from "../../../src/hooks/contexts/gridContext.jsx";
import * as puzzleService from "../../../src/services/puzzle.service.js";

vi.mock("../../../src/hooks/contexts/gridContext");
vi.mock("../../../src/services/puzzle.service");

describe("Save control tests: ", () => {
  let createPuzzleResolver;
  let createPuzzleRejecter;
  const testPuzzle = {
    pixelArt: "4BBB4B9B9BBB3BB2BBB223232",
    size: 5,
    title: "Test title",
  };

  beforeEach(() => {
    const promise = new Promise((resolve, reject) => {
      createPuzzleResolver = resolve;
      createPuzzleRejecter = reject;
    });
    puzzleService.createPuzzle.mockReturnValueOnce(promise);
    gridContext.useGridContext.mockReturnValue({
      gridFillString: testPuzzle.pixelArt,
      gridSize: testPuzzle.size,
    });
    render(
      <PuzzleContextProvider>
        <SaveControls />
      </PuzzleContextProvider>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  //? US6-SVC-1
  test("It should call createPuzzle on the puzzle service with the correct arguments", async () => {
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: testPuzzle.title },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    screen.debug();
    expect(puzzleService.createPuzzle).toBeCalledWith(testPuzzle);
  });

  //? US6-SVC-2
  test("It should not display validation errors on render", async () => {
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
