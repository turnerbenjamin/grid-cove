import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect } from "vitest";

import Modal from "../../../src/components/general/Modal";
import { cleanUpForModal, setUpForModal } from "../../test.utils";

describe("Modal component tests", () => {
  describe("With on close argument Tests", () => {
    let onCloseSpy;
    let testChildren = "Test Children";
    beforeEach(() => {
      setUpForModal();
      onCloseSpy = vi.fn(() => null);
      render(
        <>
          <Modal onClose={onCloseSpy}>{testChildren}</Modal>
        </>
      );
    });

    afterEach(() => {
      cleanUpForModal();
      vi.resetAllMocks();
    });

    //?US1-MDL-1
    test("It should render children passed as props", () => {
      expect(screen.getByText(testChildren)).toBeInTheDocument();
    });

    //?US1-MDL-2
    test("It should call onClose when close button clicked", async () => {
      const closeButton = screen.getByRole("button");
      await userEvent.click(closeButton);
      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Without on close tests", () => {
    beforeEach(() => {
      setUpForModal();
      render(
        <>
          <div id="modal"> </div>
          <Modal>Test</Modal>
        </>
      );
    });

    afterEach(() => {
      cleanUpForModal();
      vi.resetAllMocks();
    });

    //?US1-MDL-3
    test("It should not have a close button where this is not passed as an argument", async () => {
      const closeButton = screen.queryByRole("button");
      expect(closeButton).not.toBeInTheDocument();
    });
  });
});
