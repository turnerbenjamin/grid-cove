import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import { useAppContext } from "../../../src/hooks/contexts/appContext";
import UpdatePasswordForm from "../../../src/components/profile/UpdatePasswordForm";

vi.mock("../../../src/hooks/contexts/appContext");

describe("Update password form tests: ", () => {
  let updatePasswordSpy;
  let handleClearErrorsSpy;
  const testUpdatedPassword = "password12£";

  beforeEach(() => {
    updatePasswordSpy = vi.fn();
    handleClearErrorsSpy = vi.fn();
    useAppContext.mockReturnValue({
      authenticationIsLoading: false,
      authenticationErrors: [],
      handleClearErrors: () => {},
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
    });
  });
});
