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
  beforeEach(async () => {
    Object.defineProperty(global.window, "scrollTo", { value: () => null });
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    authenticationService.getActiveUser.mockReturnValue({
      emailAddress: "testuser@email.com",
    });
    document.body.appendChild(modalRoot);
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
});
