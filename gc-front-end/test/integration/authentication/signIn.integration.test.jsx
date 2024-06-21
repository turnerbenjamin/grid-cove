import { act, fireEvent, render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import { beforeEach, expect } from "vitest";

import App from "../../../src/App";
import * as authenticationService from "../../../src/services/authentication.service";

vi.mock("react-router-dom");
vi.mock("../../../src/router/GridCoveRouter");
vi.mock("../../../src/services/authentication.service");

describe("Sign in integration tests", () => {
  beforeEach(() => {
    Object.defineProperty(global.window, "scrollTo", { value: () => null });
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
    render(<App />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  //?US1-INT-1
  test("It should display a sign in form when the sign in button is clicked", async () => {
    //Arrange
    const signInButton = screen.queryByText(/sign-in/i);
    //Act
    await act(async () => {
      fireEvent.click(signInButton);
    });
    //assert

    expect(screen.getByTitle(/email address/i)).toBeInTheDocument();
    expect(screen.getByTitle(/^password/i)).toBeInTheDocument();
    expect(screen.queryByTitle(/username/i)).toBe(null);
    expect(screen.queryByTitle(/^confirm password/i)).toBe(null);
  });

  describe("Validation is turned off tests", () => {
    let emailAddressInput;
    let passwordInput;
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(screen.queryByText(/sign-in/i));
      });
      emailAddressInput = screen.getByTitle(/email address/i);
      passwordInput = screen.getByTitle(/^password/i);
      await act(async () => {
        fireEvent.change(emailAddressInput, {
          target: { value: "x" },
        });
        fireEvent.change(passwordInput, {
          target: { value: "x" },
        });
        fireEvent.blur(emailAddressInput);
        fireEvent.blur(passwordInput);
      });
    });

    //?US1-INT-2
    test("It should not display validation errors", async () => {
      //assert
      expect(screen.queryByRole("alert")).toBe(null);
    });

    //?US1-INT-3
    test("It should not disable submit where the values in the input fields would not pass validation", async () => {
      //arrange
      const submitButton = screen.getByTitle(/^submit/i);
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //assert
      expect(authenticationService.signIn).toBeCalledTimes(1);
    });
  });

  describe("Submission tests", () => {
    let emailAddressInput;
    let passwordInput;
    let submitButton;
    let signInResolver;
    let signInRejecter;
    const testSubmission = {
      emailAddress: "lou@vu.com",
      password: "$tephani3Say$",
    };
    beforeEach(async () => {
      const promise = new Promise((resolve, reject) => {
        signInResolver = resolve;
        signInRejecter = reject;
      });
      authenticationService.signIn.mockReturnValueOnce(promise);
      await act(async () => {
        fireEvent.click(screen.queryByText(/sign-in/i));
      });
      submitButton = screen.getByTitle(/^submit/i);
      emailAddressInput = screen.getByTitle(/email address/i);
      passwordInput = screen.getByTitle(/^password/i);
      await act(async () => {
        fireEvent.change(emailAddressInput, {
          target: { value: testSubmission.emailAddress },
        });
        fireEvent.change(passwordInput, {
          target: { value: testSubmission.password },
        });
      });
    });

    //?US3-INT-4
    test("It should make a call to the authentication service with the correct arguments on submit", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(authenticationService.signIn).toBeCalledWith(testSubmission);
    });

    //?US3-INT-5
    test("It should show a loading spinner when the authentication service is loading", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    //?US3-INT-6
    test("It should display the error where the authentication service returns an error", async () => {
      //Arrange
      const expected = "test error message";
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        signInRejecter(expected);
      });
      //Assert
      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    //?US3-INT-7
    test("It should display all errors where the authentication service returns multiple errors", async () => {
      //Arrange
      const testErrors = [
        { msg: "error message 1" },
        { msg: "error message 2" },
      ];
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        signInRejecter(testErrors);
      });
      //Assert
      expect(screen.getByText(testErrors[0].msg)).toBeInTheDocument();
      expect(screen.getByText(testErrors[1].msg)).toBeInTheDocument();
    });
  });
});
