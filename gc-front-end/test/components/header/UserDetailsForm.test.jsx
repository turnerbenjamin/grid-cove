import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import UserDetailsForm from "../../../src/components/header/UserDetailsForm";
import userEvent from "@testing-library/user-event";

describe("User details form tests: ", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const testHeadingText = "Test heading text";
  const testSubmitButtonText = "Test submit button text";

  describe("General tests", () => {
    const testActiveFieldsConfig = {
      userName: true,
    };

    describe("Initial render tests", () => {
      beforeEach(() => {
        render(
          <UserDetailsForm
            headingText={testHeadingText}
            submitButtonText={testSubmitButtonText}
            activeFields={testActiveFieldsConfig}
          />
        );
      });

      //?US1-UDF-1
      test("It should display the correct heading text", () => {
        expect(screen.queryByText(testHeadingText)).toBeInTheDocument();
      });

      //?US1-UDF-2
      test("It should display the correct submit button text", () => {
        expect(screen.queryByText(testSubmitButtonText)).toBeInTheDocument();
      });
    });

    describe("Loading state tests", () => {
      beforeEach(() => {
        render(
          <UserDetailsForm
            headingText={testHeadingText}
            submitButtonText={testSubmitButtonText}
            activeFields={{
              userName: true,
              emailAddress: true,
              password: true,
              confirmPassword: true,
            }}
            isLoading
          />
        );
      });
      //?US1-UDF-3
      test("It should show a loading spinner when the isLoading prop is true", () => {
        expect(screen.queryByRole("status")).toBeInTheDocument();
      });

      //?US1-UDF-4
      test("It should show disable all inputs when the isLoading prop is true", () => {
        const inputs = screen.queryAllByRole("textbox");
        expect(inputs.every((input) => input.disabled)).toBeTruthy();
      });
    });

    describe("Loading state tests", () => {
      let clearErrorsSpy;
      const testErrors = ["Test error1", "Test error 2"];
      beforeEach(() => {
        clearErrorsSpy = vi.fn(() => null);
        render(
          <UserDetailsForm
            headingText={testHeadingText}
            submitButtonText={testSubmitButtonText}
            activeFields={{
              userName: true,
              emailAddress: true,
              password: true,
              confirmPassword: true,
            }}
            errors={testErrors}
            clearErrors={clearErrorsSpy}
          />
        );
      });

      //?US1-UDF-5
      test("It should show errors where a list of errors are passed as a prop", () => {
        expect(screen.queryByText(testErrors[0])).toBeInTheDocument();
        expect(screen.queryByText(testErrors[1])).toBeInTheDocument();
      });

      //?US1-UDF-6
      test("It should disable the submit button when there are errors", () => {
        const submitButton = screen.queryByText(testSubmitButtonText);
        expect(submitButton.disabled).toEqual(true);
      });

      //?US1-UDF-7
      test("It should show call clearErrors after an update to a text box where the errors prop is provided", async () => {
        const input = screen.queryAllByRole("textbox")[0];
        await act(async () => {
          fireEvent.change(input, {
            target: { value: "x" },
          });
        });
        expect(clearErrorsSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Registration form configuration tests", () => {
    const testRegistrationFormConfig = {
      userName: true,
      emailAddress: true,
      password: true,
      confirmPassword: true,
    };
    const expectedSubmission = {
      username: "test-username",
      emailAddress: "test@email.com",
      password: "password12$",
    };

    let onSubmitSpy;

    let usernameInputField;
    let emailAddressInputField;
    let passwordInputField;
    let confirmPasswordInputField;

    beforeEach(() => {
      onSubmitSpy = vi.fn(() => null);
      render(
        <UserDetailsForm
          headingText={testHeadingText}
          submitButtonText={testSubmitButtonText}
          activeFields={testRegistrationFormConfig}
          onSubmit={onSubmitSpy}
        />
      );
      usernameInputField = screen.getByTitle(/username/i);
      emailAddressInputField = screen.getByTitle(/email address/i);
      passwordInputField = screen.getByTitle(/^password/i);
      confirmPasswordInputField = screen.getByTitle(/^confirm password/i);
    });

    afterEach(() => {
      usernameInputField = null;
      emailAddressInputField = null;
      passwordInputField = null;
      confirmPasswordInputField = null;
    });

    //?US1-UDF-8
    test("It should display the correct fields for registration when correct config prop provided", () => {
      expect(usernameInputField).toBeInTheDocument();
      expect(emailAddressInputField).toBeInTheDocument();
      expect(passwordInputField).toBeInTheDocument();
      expect(confirmPasswordInputField).toBeInTheDocument();
    });

    // //?US1-UDF-9
    test("It should call onSubmit with the correct details when the submit button is clicked", async () => {
      //Arrange
      const submitButton = screen.getByRole("button");
      //Act
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
        fireEvent.click(submitButton);
      });

      //Assert
      expect(onSubmitSpy).toBeCalledWith(expectedSubmission);
    });
  });
});
