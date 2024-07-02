import { screen, render, act, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";

import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext.jsx";
import SaveControls from "../../../src/components/build/SaveControls.jsx";
import * as gridContext from "../../../src/hooks/contexts/gridContext.jsx";
import * as puzzleService from "../../../src/services/puzzle.service.js";
import { setUpForModal } from "../../test.utils.jsx";

vi.mock("../../../src/hooks/contexts/gridContext");
vi.mock("../../../src/services/puzzle.service");
vi.mock("react-router-dom");

describe("Save control tests: ", () => {
  let createPuzzleResolver;
  let createPuzzleRejecter;
  const testPuzzle = {
    pixelArt: "4BBB4B9B9BBB3BB2BBB223232",
    size: 5,
    title: "Test title",
  };

  beforeEach(async () => {
    const promise = new Promise((resolve, reject) => {
      createPuzzleResolver = resolve;
      createPuzzleRejecter = reject;
    });
    puzzleService.createPuzzle.mockReturnValueOnce(promise);
    gridContext.useGridContext.mockReturnValue({
      gridFillString: testPuzzle.pixelArt,
      gridSize: testPuzzle.size,
      resetGrid: () => null,
    });

    Object.defineProperty(global.window, "scrollTo", {
      value: () => null,
    });
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    await act(async () =>
      render(
        <PuzzleContextProvider>
          <SaveControls />
        </PuzzleContextProvider>
      )
    );
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById("modal"));
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
    expect(puzzleService.createPuzzle).toBeCalledWith(testPuzzle);
  });

  //? US6-SVC-2
  test("It should not display validation errors on render", async () => {
    expect(screen.queryByRole("alert")).toBeNull();
  });

  //? US6-SVC-3
  test("It should display errors after clicking save where the title is too short", async () => {
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: "12" },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(
      screen.getByText(/title must be between 3 and 32 characters/i)
    ).toBeInTheDocument();
  });

  //? US6-SVC-4
  test("It should display errors after clicking save where the puzzleString is invalid", async () => {
    //Arrange
    gridContext.useGridContext.mockReturnValue({
      gridFillString: "0".repeat(23) + "1".repeat(2),
      gridSize: testPuzzle.size,
    });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: testPuzzle.title,
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(
      screen.getByText(
        /your art may not include a single colour that makes up over 90% of the image/i
      )
    ).toBeInTheDocument();
  });

  //? US6-SVC-5
  test("It should show a loading spinner while createPuzzle is pending", async () => {
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: testPuzzle.title },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  describe("Modal alerts tests: ", () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.change(screen.getByPlaceholderText(/title/i), {
          target: { value: testPuzzle.title },
        });
      });
      await act(async () => {
        fireEvent.click(screen.getByText(/save/i));
      });
    });

    //? US6-SVC-6
    test("It should show a success modal when createPuzzle resolves", async () => {
      //Act
      await act(async () => {
        createPuzzleResolver({});
      });
      //Assert
      expect(
        screen.getByText(/puzzle created successfully/i)
      ).toBeInTheDocument();
    });

    //? US6-SVC-7
    test("It should close the success modal when the close button is clicked", async () => {
      //Act
      await act(async () => {
        createPuzzleResolver({});
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(/close/is));
      });
      //Assert
      expect(screen.queryByText(/puzzle created successfully/i)).toBeNull();
    });

    //? US6-SVC-8
    test("It should display errors in a modal when createPuzzle rejects", async () => {
      //Arrange
      const testErrorMessage = "Test error";
      //Act
      await act(async () => {
        createPuzzleRejecter(testErrorMessage);
      });
      //Assert
      expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
    });

    //? US6-SVC-9
    test("It should close the errors modal when the close button is clicked", async () => {
      //Arrange
      const testErrorMessage = "Test error";
      //Act
      await act(async () => {
        createPuzzleRejecter(testErrorMessage);
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(/close/i));
      });
      //Assert
      expect(screen.queryByText(testErrorMessage)).toBeNull();
    });

    //? US6-SVC-10
    test("It should display errors in a modal when createPuzzle rejects with an array of errors", async () => {
      //Arrange
      const testErrorMessages = [
        { msg: "Test error1" },
        { msg: "Test error2" },
      ];

      //Act
      await act(async () => {
        createPuzzleRejecter(testErrorMessages);
      });
      //Assert
      expect(screen.queryByText(testErrorMessages[0].msg)).toBeInTheDocument();
      expect(screen.queryByText(testErrorMessages[1].msg)).toBeInTheDocument();
    });
  });
});
