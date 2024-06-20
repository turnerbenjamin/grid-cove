import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach } from "vitest";
import { expect } from "vitest";

import App from "../../../src/App";
import { AppContextProvider } from "../../../src/hooks/contexts/appContext";
import * as authenticationService from "../../../src/services/authentication.service";

vi.mock("../../../src/router/GridCoveRouter");
vi.mock("react-router-dom");
vi.mock("../../../src/services/authentication.service");

describe("Registration integration tests", () => {
  beforeEach(() => {
    Object.defineProperty(global.window, "scrollTo", { value: () => null });
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);

    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  //?US1-INT-1
  test("It should display a registration form when the registration button is clicked", async () => {
    //Arrange
    const registrationButton = screen.queryByText(/register/i, {
      role: "button",
    });
    //Act
    await act(async () => {
      fireEvent.click(registrationButton);
    });
    //assert
    expect(screen.getByTitle(/username/i)).toBeInTheDocument();
    expect(screen.getByTitle(/email address/i)).toBeInTheDocument();
    expect(screen.getByTitle(/^password/i)).toBeInTheDocument();
    expect(screen.getByTitle(/^confirm password/i)).toBeInTheDocument();
  });

  describe("Form submission tests", () => {
    const expectedSubmission = {
      username: "test-username",
      emailAddress: "test@email.com",
      password: "password12$",
    };
    let submitButton;
    let registerResolver;
    let registerRejecter;

    beforeEach(async () => {
      const promise = new Promise((resolve, reject) => {
        registerResolver = resolve;
        registerRejecter = reject;
      });
      authenticationService.register.mockReturnValueOnce(promise);
      const registrationButton = screen.queryByText(/register/i, {
        role: "button",
      });
      await act(async () => {
        fireEvent.click(registrationButton);
      });
      const usernameInputField = screen.getByTitle(/username/i);
      const emailAddressInputField = screen.getByTitle(/email address/i);
      const passwordInputField = screen.getByTitle(/^password/i);
      const confirmPasswordInputField = screen.getByTitle(/^confirm password/i);
      submitButton = screen.getByTitle(/^submit/i);
      await act(async () => {
        fireEvent.change(usernameInputField, {
          target: { value: expectedSubmission.username },
        });
        fireEvent.change(emailAddressInputField, {
          target: { value: expectedSubmission.emailAddress },
        });
        fireEvent.change(passwordInputField, {
          target: { value: expectedSubmission.password },
        });
        fireEvent.change(confirmPasswordInputField, {
          target: { value: expectedSubmission.password },
        });
      });
    });

    //?US1-INT-2
    test("It should make a call to the authentication service with the correct arguments on submit", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(authenticationService.register).toBeCalledWith(expectedSubmission);
    });

    //?US1-INT-3
    test("It should show a loading spinner when the authentication service is loading", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    //?US1-INT-4
    test("It should display the error where the authentication service returns an error", async () => {
      //Arrange
      const expected = "test error message";
      const testError = new Error(expected);
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        registerRejecter(testError);
      });
      //Assert
      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    //?US1-INT-4
    test("It should display the error where the authentication service returns an error", async () => {
      //Arrange
      const testErrors = [
        { msg: "error message 1" },
        { msg: "error message 2" },
      ];
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        registerRejecter(testErrors);
      });
      //Assert
      expect(screen.getByText(testErrors[0].msg)).toBeInTheDocument();
      expect(screen.getByText(testErrors[1].msg)).toBeInTheDocument();
    });
  });
});
