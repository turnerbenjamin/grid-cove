import { screen, act, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import {
  cleanUpForModal,
  mockPromise,
  renderWithRouter,
  setUpForModal,
} from "../../test.utils.jsx";
import { PuzzleContextProvider } from "../../../src/hooks/contexts/puzzleContext.jsx";
import SaveControls from "../../../src/components/build/SaveControls.jsx";
import * as gridContext from "../../../src/hooks/contexts/gridContext.jsx";
import * as puzzleService from "../../../src/services/puzzle.service.js";

vi.mock("../../../src/hooks/contexts/gridContext");
vi.mock("../../../src/services/puzzle.service");
vi.mock("../../../src/components/header/Logo.jsx");

describe("Save control tests: ", () => {
  const testPuzzle = {
    pixelArt: "4BBB4B9B9BBB3BB2BBB223232",
    size: 5,
    title: "Test title",
  };
  const testNewPuzzle = { ...testPuzzle, _id: "1234" };
  let createPuzzlePromise;
  let createPuzzleResolver;
  let createPuzzleRejecter;

  beforeEach(async () => {
    setUpForModal();

    [createPuzzlePromise, createPuzzleResolver, createPuzzleRejecter] =
      mockPromise();
    puzzleService.createPuzzle.mockReturnValueOnce(createPuzzlePromise);

    gridContext.useGridContext.mockReturnValue({
      getCurrentGridFillString: vi.fn().mockReturnValue(testPuzzle.pixelArt),
      gridSize: testPuzzle.size,
      resetGrid: () => null,
    });

    await act(async () =>
      renderWithRouter(
        <PuzzleContextProvider>
          <SaveControls />
        </PuzzleContextProvider>,
        "/build"
      )
    );
  });

  afterEach(() => {
    cleanUpForModal();
    vi.resetAllMocks();
  });

  //? US6-SVC-1
  test("It should call createPuzzle on the puzzle service with the correct arguments", async () => {
    //Act
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: testPuzzle.title },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    //Assert
    expect(puzzleService.createPuzzle).toBeCalledWith(testPuzzle);
  });

  //? US6-SVC-2
  test("It should not display validation errors on render", async () => {
    //Assert
    expect(screen.queryByRole("alert")).toBeNull();
  });

  //? US6-SVC-3
  test("It should display errors after clicking save where the title is too short", async () => {
    //Act
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: "12" },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    //Assert
    expect(
      screen.getByText(/title must be between 3 and 32 characters/i)
    ).toBeInTheDocument();
  });

  //? US6-SVC-4
  test("It should show a loading spinner while createPuzzle is pending", async () => {
    //Act
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: testPuzzle.title },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText(/save/i));
    });
    //Assert
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

    //? US6-SVC-5
    test("It should show a success modal when createPuzzle resolves", async () => {
      //Act
      await act(async () => {
        createPuzzleResolver(testNewPuzzle);
      });
      //Assert
      expect(
        screen.getByText(/you have created a new puzzle/i)
      ).toBeInTheDocument();
    });

    //? US6-SVC-10
    test("It should navigate to new puzzle when button clicked in success modal", async () => {
      //Arrange
      const expectedLocation = `/puzzles/${testNewPuzzle._id}`;
      //Act
      await act(async () => {
        createPuzzleResolver(testNewPuzzle);
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(/Take a look/i));
      });
      //Assert
      expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
        expectedLocation
      );
    });

    //? US6-SVC-6
    test("It should close the success modal when the close button is clicked", async () => {
      //Act
      await act(async () => {
        createPuzzleResolver(testNewPuzzle);
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(/close/i));
      });
      //Assert
      expect(screen.queryByText(/you have created a new puzzle/i)).toBeNull();
    });

    //? US6-SVC-7
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

    //? US6-SVC-8
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

    //? US6-SVC-9
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
