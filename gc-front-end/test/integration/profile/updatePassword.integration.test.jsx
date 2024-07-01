import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

import {
  cleanUpForModal,
  renderAppWithLocationWrapper,
  setUpForModal,
} from "../../test.utils";
import * as authenticationServices from "../../../src/services/authentication.service";

vi.mock("../../../src/services/authentication.service");

describe("Update password integration test: ", () => {
  beforeEach(() => {
    setUpForModal();
  });

  afterEach(() => {
    cleanUpForModal();
  });

  //? US14-INT-1
  test("It should show a sign-in form where the user is not logged in", () => {
    //Act
    renderAppWithLocationWrapper(["/me"]);
    //Assert
    expect(
      screen.queryByRole("heading", { name: /sign-in/i })
    ).toBeInTheDocument();
  });

  //? US14-INT-2
  test("It should not show a sign in form when the user is logged in", () => {
    //Arrange
    authenticationServices.getActiveUser.mockReturnValue({});
    //Act
    renderAppWithLocationWrapper(["/me"]);
    //Assert
    expect(screen.queryByRole("heading", { name: /sign-in/i })).toBeNull();
  });

  describe("After successful update tests: ", () => {
    const testUpdatedPassword = "password12£";

    beforeEach(async () => {
      authenticationServices.getActiveUser.mockReturnValueOnce({});
      authenticationServices.updatePassword.mockResolvedValue(true);
      renderAppWithLocationWrapper(["/me"]);

      await act(async () => {
        fireEvent.change(screen.getByTitle(/^current password$/i), {
          target: { value: testUpdatedPassword },
        });
        fireEvent.change(screen.getByTitle(/^updated password$/i), {
          target: { value: testUpdatedPassword },
        });
        fireEvent.change(screen.getByTitle(/^confirm updated password$/i), {
          target: { value: testUpdatedPassword },
        });
      });
      await act(async () => fireEvent.click(screen.getByText(/^update$/i)));
    });

    //? US14-INT-3
    test("It should show a sign in form if updateUserPasswordById resolves", () => {
      //Arrange
      authenticationServices.getActiveUser.mockReturnValue({});
      //Act
      renderAppWithLocationWrapper(["/me"]);
      //Assert
      expect(
        screen.queryByRole("heading", { name: /sign-in/i })
      ).toBeInTheDocument();
    });
  });
});
