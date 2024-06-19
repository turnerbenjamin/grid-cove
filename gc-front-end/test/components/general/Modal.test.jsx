import { screen, render } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";

import Modal from "../../../src/components/general/Modal";

describe("Modal component tests", () => {
  let onCloseSpy;
  let testChildren = "Test Children";
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    onCloseSpy = vi.fn(() => null);
    render(
      <>
        <div id="modal"> </div>
        <Modal onClose={onCloseSpy}>{testChildren}</Modal>
      </>
    );
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById("modal"));
    vi.resetAllMocks();
  });

  //?US1-MDL-1
  test("It should render children passed as props", () => {
    expect(screen.getByText(testChildren)).toBeInTheDocument();
  });
});
