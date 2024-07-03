import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import { useAppContext } from "../../../src/hooks/contexts/appContext";
import { cleanUpForModal, mockPromise, setUpForModal } from "../../test.utils";
import UpdatePasswordForm from "../../../src/components/profile/UpdatePasswordForm";

vi.mock("../../../src/hooks/contexts/appContext");

describe("Update password form tests: ", () => {
  const testUpdatedPassword = "password12£";
  let updatePasswordSpy;

  beforeEach(() => {
    updatePasswordSpy = vi.fn();
    useAppContext.mockReturnValue({
      updateUserPasswordById: updatePasswordSpy,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Pre-submit tests: ", () => {
    beforeEach(() => {
      render(<UpdatePasswordForm />);
    });

    //? US14-UPF-1
    test("It should disable the update button where the password field is empty", async () => {
      //Act
      await act(async () => {
        fireEvent.change(screen.getByTitle(/^updated password$/i), {
          target: { value: testUpdatedPassword },
        });
        fireEvent.change(screen.getByTitle(/^confirm updated password$/i), {
          target: { value: testUpdatedPassword },
        });
      });
      //Assert
      expect(screen.getByText(/^update$/i)).toHaveClass("disabled");
    });

    //? US14-UPF-2
    test("It should not show validation errors on render", async () => {
      //Assert
      expect(screen.queryByRole("alert")).toBeNull();
    });

    describe("Where password field is not empty: ", () => {
      //? US14-UPF-3
      test("It should not show validation errors when the password field is empty", async () => {
        //Act
        const updatedPasswordInputField =
          screen.getByTitle(/^updated password$/i);
        await act(async () => {
          fireEvent.change(updatedPasswordInputField, {
            target: { value: "invalid" },
          });
        });
        await act(async () => {
          fireEvent.blur(updatedPasswordInputField);
        });
        //Assert
        expect(screen.queryByRole("alert")).toBeNull();
      });
    });

    describe("Where password field is not empty: ", () => {
      beforeEach(async () => {
        await act(async () => {
          fireEvent.change(screen.getByTitle(/current password/i), {
            target: { value: testUpdatedPassword },
          });
        });
      });

      //? US14-UPF-4
      test("It should not show validation errors when the updated password field is blurred with a validation error", async () => {
        //Act
        const updatedPasswordInputField =
          screen.getByTitle(/^updated password$/i);
        await act(async () => {
          fireEvent.change(updatedPasswordInputField, {
            target: { value: "invalid" },
          });
        });
        await act(async () => {
          fireEvent.blur(updatedPasswordInputField);
        });
        //Assert
        expect(screen.queryByRole("alert")).toBeInTheDocument();
      });

      //? US14-UPF-5
      test("It should show validation errors when the confirm updated password field is blurred with a validation error", async () => {
        //Act
        const confirmUpdatedPasswordInputField = screen.getByTitle(
          /^confirm updated password$/i
        );
        await act(async () => {
          fireEvent.change(screen.getByTitle(/^updated password$/i), {
            target: { value: testUpdatedPassword },
          });
          fireEvent.change(confirmUpdatedPasswordInputField, {
            target: { value: testUpdatedPassword + "x" },
          });
        });
        await act(async () => {
          fireEvent.blur(confirmUpdatedPasswordInputField);
        });
        //Assert
        expect(screen.queryByRole("alert")).toBeInTheDocument();
      });

      //? US14-UPF-16
      test("It should disable submit where validation errors", async () => {
        //Act
        await act(async () => {
          fireEvent.submit(screen.getByRole("form"));
        });
        //Assert
        expect(updatePasswordSpy).toBeCalledTimes(0);
      });
    });
  });

  describe("Submission tests: ", () => {
    describe("General submission tests: ", () => {
      beforeEach(async () => {
        render(<UpdatePasswordForm />);
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
      });

      //? US14-UPF-6
      test("It should show a warning that the user will be logged out when the update button is active", async () => {
        //Assert
        expect(screen.getByText(/you will be logged-out/i)).toBeInTheDocument();
      });

      //? US14-UPF-7
      test("It should call updateUserPasswordById when update is pressed", async () => {
        //Arrange
        const expected = {
          password: testUpdatedPassword,
          updatedPassword: testUpdatedPassword,
        };
        //Act
        await act(async () => fireEvent.click(screen.getByText(/^update$/i)));
        //Assert
        expect(updatePasswordSpy).toBeCalledWith(expected);
      });
    });

    describe("Submission is loading tests: ", () => {
      beforeEach(async () => {
        useAppContext.mockReturnValue({
          authenticationIsLoading: true,
          lastActionName: "updatePassword",
        });
        render(<UpdatePasswordForm />);
      });

      //? US14-UPF-8
      test("It should show a loading spinner when update password is loading", async () => {
        //Assert
        expect(screen.getByRole("status")).toBeInTheDocument();
      });

      //? US14-UPF-9
      test("It should disable inputs while update password is loading", async () => {
        //Assert
        expect(screen.getByTitle(/^current password$/i)).toHaveClass(
          "disabled"
        );
        expect(screen.getByTitle(/^updated password$/i)).toHaveClass(
          "disabled"
        );
        expect(screen.getByTitle(/^confirm updated password$/i)).toHaveClass(
          "disabled"
        );
      });
    });

    describe("Submission has errors tests: ", () => {
      const testErrorMessage = "test error message";
      let handleClearErrorsSpy;

      beforeEach(async () => {
        handleClearErrorsSpy = vi.fn();
        useAppContext.mockReturnValue({
          authenticationErrors: [testErrorMessage],
          handleClearErrors: handleClearErrorsSpy,
          lastActionName: "updatePassword",
        });
        render(<UpdatePasswordForm />);
      });

      //? US14-UPF-10
      test("It should show errors where update password has errors", async () => {
        //Assert
        expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
      });

      //? US14-UPF-11
      test("It should disable the update button where update password has errors", async () => {
        //Assert
        expect(screen.getByText(/^update$/i)).toHaveClass("disabled");
      });

      //? US14-UPF-12
      test("It should show call clearErrors, where update password has errors, after an update is made", async () => {
        //Act
        fireEvent.change(screen.getByTitle(/^updated password$/i), {
          target: { value: "some-change-to-field" },
        });
        //Assert
        expect(handleClearErrorsSpy).toBeCalledTimes(1);
      });
    });

    describe("Successful submission tests: ", () => {
      let updatePasswordSpy;
      let updatePasswordPromise;
      let updatePasswordResolver;

      beforeEach(async () => {
        setUpForModal();
        [updatePasswordPromise, updatePasswordResolver] = mockPromise();
        updatePasswordSpy = vi.fn().mockReturnValue(updatePasswordPromise);
        useAppContext.mockReturnValue({
          updateUserPasswordById: updatePasswordSpy,
        });
        render(<UpdatePasswordForm />);

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
        await act(async () => {
          updatePasswordResolver(true);
        });
      });

      afterEach(() => {
        cleanUpForModal();
      });

      //? US14-UPF-13
      test("It should show a success message when updateUserPasswordById resolves", async () => {
        //Assert
        expect(screen.getByTitle(/success/i)).toBeInTheDocument();
      });

      //? US14-UPF-14
      test("It should not show a success message after the close button has been selected", async () => {
        //Act
        await act(async () => fireEvent.click(screen.getByTitle(/close/i)));
        //Assert
        expect(screen.queryByTitle(/success/i)).toBeNull();
      });

      //? US14-UPF-15
      test("It should clear the input fields where updateUserPasswordById resolves", async () => {
        //Act
        await act(async () => fireEvent.click(screen.getByTitle(/close/i)));
        //Assert
        expect(screen.getByTitle(/^current password$/i).value).toBe("");
        expect(screen.getByTitle(/^updated password$/i).value).toBe("");
        expect(screen.getByTitle(/^confirm updated password$/i).value).toBe("");
      });
    });
  });
});
