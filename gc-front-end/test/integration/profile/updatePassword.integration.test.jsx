import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";

import {
  cleanUpForModal,
  mockPromise,
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

  describe("On submit tests: ", () => {
    const testUpdatedPassword = "password12£";
    let updatePasswordPromise;
    let updatePasswordResolver;
    let updatePasswordRejecter;

    beforeEach(async () => {
      [updatePasswordPromise, updatePasswordResolver, updatePasswordRejecter] =
        mockPromise();
      authenticationServices.getActiveUser.mockReturnValueOnce({});
      authenticationServices.updatePassword.mockReturnValue(
        updatePasswordPromise
      );

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

    describe("After successful update tests: ", () => {
      beforeEach(async () => {
        vi.mock("../../../src/components/general/SuccessToast");
        await act(async () => updatePasswordResolver(true));
      });

      //? US14-INT-3
      test("It should show a sign in form if updateUserPasswordById resolves", () => {
        //Assert
        expect(
          screen.queryByRole("heading", { name: /sign-in/i })
        ).toBeInTheDocument();
      });
    });

    describe("After rejected update tests: ", () => {
      const testErrorMessage = "test error message";

      beforeEach(async () => {
        vi.mock("../../../src/components/general/SuccessToast");
        await act(async () => updatePasswordRejecter(testErrorMessage));
      });

      //? US14-INT-4
      test("It should show errors where updateUserPasswordById rejects", () => {
        //Assert
        expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
      });
    });
  });
});
