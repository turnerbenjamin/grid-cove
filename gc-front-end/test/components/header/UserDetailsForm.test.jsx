import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import UserDetailsForm from "../../../src/components/header/UserDetailsForm";

describe("User details form tests: ", () => {
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

    //?US1-UDF-3
    test("It should show a loading spinner when the isLoading prop is true", () => {
      //Act
      render(
        <UserDetailsForm
          headingText={testHeadingText}
          submitButtonText={testSubmitButtonText}
          activeFields={testActiveFieldsConfig}
          isLoading
        />
      );
      //Assert
      expect(screen.queryByRole("status")).toBeInTheDocument();
    });
  });
});
