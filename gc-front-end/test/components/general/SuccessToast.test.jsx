import { act, screen, render } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";
import SuccessToast from "../../../src/components/general/SuccessToast";

describe("Success toast tests: ", () => {
  let onCloseSpy;
  const testMessage = "test message";
  const testDisplayFor = 5000;

  beforeEach(async () => {
    Object.defineProperty(global.window, "scrollTo", {
      value: () => null,
    });
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    onCloseSpy = vi.fn(() => null);

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
});
