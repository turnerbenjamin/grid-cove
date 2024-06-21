import { act, render, screen } from "@testing-library/react";
import EmailAddressInputField from "../../../../src/components/header/inputFields/EmailAddressInputField";

describe("Email Address input field tests", () => {
  //?US2-EAI-1
  test("It should not display an error on render", () => {
    render(
      <EmailAddressInputField
        emailAddressValue="invalid.email"
        onChange={() => null}
      />
    );
    expect(screen.queryByRole("alert")).toBe(null);
  });

  //?US2-EAI-2
  test("It should display an error on blur where email address is invalid", async () => {
    render(
      <EmailAddressInputField
        emailAddressValue="invalid.email"
        onChange={() => null}
      />
    );
    const inputField = screen.getByTitle("Email address");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBeInTheDocument();
  });
});
