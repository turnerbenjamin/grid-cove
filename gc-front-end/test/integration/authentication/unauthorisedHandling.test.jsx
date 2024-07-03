import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";
import axios from "axios";

import * as authenticationService from "../../../src/services/authentication.service";

import {
  cleanUpForModal,
  renderAppWithLocationWrapper,
  setUpForModal,
} from "../../test.utils";

vi.mock("axios");
vi.mock("../../../src/components/header/Header");
vi.mock("../../../src/services/authentication.service");

describe("Global 401 error handling tests: ", () => {
  const testErrorMessage = "test error message";

  beforeEach(async () => {
    setUpForModal();
    authenticationService.getActiveUser.mockReturnValueOnce({});
    axios.post.mockRejectedValueOnce({
      response: { data: new Error(testErrorMessage), status: 401 },
    });

    renderAppWithLocationWrapper(["/build"]);
    await act(async () => fireEvent.click(screen.getByText(/continue/i)));
    await act(async () => {
      fireEvent.mouseDown(screen.getByTitle("1,1"));
      fireEvent.mouseDown(screen.getByTitle("2,1"));
      fireEvent.mouseDown(screen.getByTitle("3,1"));
      fireEvent.change(screen.getByPlaceholderText(/title/i), {
        target: { value: "new puzzle name" },
      });
    });
    await act(async () => fireEvent.mouseUp(screen.getByTitle("3,1")));
    await act(async () => fireEvent.click(screen.getByText(/save/i)));
  });

  afterEach(() => {
    cleanUpForModal();
  });

  //? US6-INT-1
  test("It should display a sign-in screen if createPuzzle throws a 401 error", async () => {
    //Assert
    expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
    expect(screen.getByText(/sign-in/i)).toBeInTheDocument();
  });
});
