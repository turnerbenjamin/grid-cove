import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import UserDetailsForm from "../../../src/components/header/UserDetailsForm";

describe("User details form tests: ", () => {
  describe("General tests", () => {
    const testActiveFieldsConfig = {
      userName: true,
    };
    const testHeadingText = "Test heading text";
    const testSubmitButtonText = "Test submit button text";
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
      expect(screen.queryByText(testHeadingText)).toBeTruthy();
    });
  });
});
