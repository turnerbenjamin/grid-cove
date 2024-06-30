import { act, screen, render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";
import SuccessToast from "../../../src/components/general/SuccessToast";

describe("Success toast tests: ", () => {
  const testMessage = "test message";
  const testDisplayFor = 5000;
  let onCloseSpy;
  let setTimeoutSpy;

  beforeEach(async () => {
    Object.defineProperty(global.window, "scrollTo", {
      value: () => null,
    });
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    onCloseSpy = vi.fn(() => null);
    setTimeoutSpy = vi.spyOn(global, "setTimeout");

    await act(async () =>
      render(
        <SuccessToast
          message={testMessage}
          onClose={onCloseSpy}
          displayFor={testDisplayFor}
        />
      )
    );
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById("modal"));
    vi.resetAllMocks();
  });

  //? US13-SCT-1
  test("It should display success message", () => {
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  //? US13-SCT-2
  test("It should call on close when close button clicked", async () => {
    //Act
    await act(async () => {
      fireEvent.click(screen.getByTitle(/close/i));
    });
    expect(onCloseSpy).toBeCalledTimes(1);
  });

  //? US13-SCT-3
  test("It should call setTimeout with correct arguments", async () => {
    //Act
    await act(async () => {
      fireEvent.click(screen.getByTitle(/close/i));
    });
    expect(setTimeoutSpy).toBeCalledTimes(1);
    expect(setTimeoutSpy).toBeCalledWith(onCloseSpy, testDisplayFor);
  });
});
