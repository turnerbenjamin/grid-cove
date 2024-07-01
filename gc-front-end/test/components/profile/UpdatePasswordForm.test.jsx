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
  });
});
