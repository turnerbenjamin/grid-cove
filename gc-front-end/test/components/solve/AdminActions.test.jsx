import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import AdminActions from "../../../src/components/solve/AdminActions";
import { useGridContext } from "../../../src/hooks/contexts/gridContext";

vi.mock("../../../src/hooks/contexts/gridContext");

describe("Admin Actions tests: ", () => {
  let setDoRevealPixelArtMock;
  beforeEach(() => {
    setDoRevealPixelArtMock = vi.fn();
    useGridContext.mockReturnValue({
      setDoRevealPixelArt: setDoRevealPixelArtMock,
    });
  });

  test("It should call doRevealPixel Art when the reveal button is pressed", async () => {
    //Act
    render(<AdminActions />);
    await act(async () => {
      fireEvent.click(screen.getByText(/reveal/i));
    });

    expect(setDoRevealPixelArtMock).toBeCalledTimes(1);
  });
});
