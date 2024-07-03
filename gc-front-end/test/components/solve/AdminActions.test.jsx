import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import AdminActions from "../../../src/components/solve/AdminActions";
import { useGridContext } from "../../../src/hooks/contexts/gridContext";
import { usePuzzleContext } from "../../../src/hooks/contexts/puzzleContext";
import { cleanUpForModal, setUpForModal } from "../../test.utils";

vi.mock("react-router-dom");
vi.mock("../../../src/hooks/contexts/gridContext");
vi.mock("../../../src/hooks/contexts/puzzleContext");

describe("Admin Actions tests: ", () => {
  let setDoRevealPixelArtMock;
  let deletePuzzleByIdMock;

  beforeEach(() => {
    setUpForModal();
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
    cleanUpForModal();
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

  //? US12-ADM-2
  test("It should close the warning and not call delete puzzle when cancel is called", async () => {
    //Act
    render(<AdminActions />);
    await act(async () => {
      fireEvent.click(screen.getByText(/delete/i));
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/cancel/i));
    });
    //Assert
    expect(screen.queryByText(/warning/i)).toBeNull();
    expect(deletePuzzleByIdMock).toBeCalledTimes(0);
  });

  //? US12-ADM-3
  test("It should call delete when the user clicks proceed", async () => {
    //Arrange
    const testId = "testId";
    //Act
    render(<AdminActions puzzle={{ _id: testId }} />);
    await act(async () => {
      fireEvent.click(screen.getByText(/delete/i));
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/proceed/i));
    });
    //Assert
    expect(deletePuzzleByIdMock).toBeCalledTimes(1);
    expect(deletePuzzleByIdMock).toBeCalledWith(testId);
  });
});
