import { act, fireEvent, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";

import {
  cleanUpForModal,
  mockPromise,
  renderAppWithLocationWrapper,
  setUpForModal,
} from "../../test.utils";
import * as authenticationServices from "../../../src/services/authentication.service";

vi.mock("../../../src/services/authentication.service");

describe("Require logged in tests: ", () => {
  let signInPromise;
  let signInResolver;
  let signInForm;

  beforeEach(() => {
    setUpForModal();
    [signInPromise, signInResolver] = mockPromise();
    authenticationServices.getActiveUser.mockReturnValueOnce();
    authenticationServices.signIn.mockReturnValueOnce(signInPromise);

    renderAppWithLocationWrapper(["/me"]);
    signInForm = screen
      .queryByRole("heading", { name: /sign-in/i })
      .closest("form");
  });

  afterEach(() => {
    cleanUpForModal();
  });

  describe("On successful sign-in: ", () => {
    let startingLocation;

    beforeEach(async () => {
      startingLocation =
        screen.getByTestId("current-location").dataset.location;
      authenticationServices.signIn.mockResolvedValue({});

      await act(async () =>
        fireEvent.click(within(signInForm).getByTitle(/submit/i))
      );
      await act(async () => signInResolver({}));
    });

    //? US14-RLI-1
    test("It should not show a sign-in form and should stay on the same page where sign in resolves", async () => {
      //Arrange
      const expected = startingLocation;
      //Assert
      expect(screen.queryByRole("heading", { name: /sign-in/i })).toBeNull();
      expect(screen.getByTestId("current-location").dataset.location).toBe(
        expected
      );
    });

    //? US14-RLI-2
    test("It should display a success message where sign in resolves", async () => {
      //Assert
      expect(screen.getByTitle(/success/i)).toBeInTheDocument();
    });

    //? US14-RLI-3
    test("It should remove the success message where the close button is clicked", async () => {
      //Act
      await act(async () => fireEvent.click(screen.getByTitle(/close/i)));
      //Assert
      expect(screen.queryByTitle(/success/i)).toBeNull();
    });
  });

  //? US14-RLI-4
  test("It should not show a sign-in form and should navigate to root where close is selected", async () => {
    //Arrange
    const expected = "/";
    //Act
    await act(async () => fireEvent.click(screen.getByTitle("close")));
    //Assert
    expect(screen.queryByRole("heading", { name: /sign-in/i })).toBeNull();
    expect(screen.getByTestId("current-location").dataset.location).toBe(
      expected
    );
  });
});
