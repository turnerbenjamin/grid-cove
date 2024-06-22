import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import App from "../../../src/App";
import * as authenticationService from "../../../src/services/authentication.service";

vi.mock("react-router-dom");
vi.mock("../../../src/router/GridCoveRouter");
vi.mock("../../../src/services/authentication.service");

describe("Log out integration tests", () => {
  let modalRoot;
  let logOutButton;
  let signOutResolver;
  let signOutRejecter;

  beforeEach(async () => {
    //Sign out mock
    const promise = new Promise((resolve, reject) => {
      signOutResolver = resolve;
      signOutRejecter = reject;
    });
    authenticationService.signOut.mockReturnValueOnce(promise);

    //Modal Set-Up
    Object.defineProperty(global.window, "scrollTo", { value: () => null });
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    authenticationService.getActiveUser.mockReturnValue({
      emailAddress: "testuser@email.com",
    });
    document.body.appendChild(modalRoot);

    //Render App
    render(<App />);
    await act(async () => {
      fireEvent.mouseMove(screen.getByTitle("Profile"));
    });
    logOutButton = screen.getByText(/log-out/i);
  });

  afterEach(() => {
    vi.resetAllMocks();
    document.body.removeChild(modalRoot);
  });

  //?US4-INT-1
  test("It should make a call to the authentication service", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
    });
    //Assert
    expect(authenticationService.signOut).toBeCalledTimes(1);
  });

  //?US4-INT-2
  test("It should show a loading spinner when the authentication service is loading", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
    });
    //Assert
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //?US4-INT-3
  test("It should display an error modal where the auth service throws an error", async () => {
    //Arrange
    const expected = "test error message";
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
      signOutRejecter(expected);
    });
    //Assert
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  //?US4-INT-4
  test("It should show Register and Sign-In Buttons after successful log out", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
      signOutResolver();
    });
    //Assert
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/sign-in/i)).toBeInTheDocument();
  });
});
