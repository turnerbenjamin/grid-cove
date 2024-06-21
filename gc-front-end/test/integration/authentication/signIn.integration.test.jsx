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
});
