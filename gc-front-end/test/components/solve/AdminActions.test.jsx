import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import AdminActions from "../../../src/components/solve/AdminActions";
import { useGridContext } from "../../../src/hooks/contexts/gridContext";
import { usePuzzleContext } from "../../../src/hooks/contexts/puzzleContext";

vi.mock("react-router-dom");
vi.mock("../../../src/hooks/contexts/gridContext");
vi.mock("../../../src/hooks/contexts/puzzleContext");

describe("Admin Actions tests: ", () => {
  let setDoRevealPixelArtMock;
  let deletePuzzleByIdMock;

  beforeEach(() => {
    Object.defineProperty(global.window, "scrollTo", { value: () => null });
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    setDoRevealPixelArtMock = vi.fn();
    deletePuzzleByIdMock = vi.fn();
    useGridContext.mockReturnValue({
      setDoRevealPixelArt: setDoRevealPixelArtMock,
    });
    usePuzzleContext.mockReturnValue({
      deletePuzzleById: deletePuzzleByIdMock,
    });
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById("modal"));
    vi.resetAllMocks();
  });

  //? US11-ADM-1
  test("It should call doRevealPixel Art when the reveal button is pressed", async () => {
    //Act
    render(<AdminActions />);
    await act(async () => {
      fireEvent.click(screen.getByText(/reveal/i));
    });
    //Assert
    expect(setDoRevealPixelArtMock).toBeCalledTimes(1);
  });

  //? US12-ADM-1
  test("It should show a warning when delete is clicked before a call to delete puzzle is made", async () => {
    //Act
    render(<AdminActions />);
    await act(async () => {
      fireEvent.click(screen.getByText(/delete/i));
    });
    //Assert
    expect(screen.queryByText(/warning/i)).toBeInTheDocument();
    expect(deletePuzzleByIdMock).toBeCalledTimes(0);
  });
});
