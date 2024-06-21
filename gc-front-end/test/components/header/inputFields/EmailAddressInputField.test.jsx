import { act, render, screen } from "@testing-library/react";
import EmailAddressInputField from "../../../../src/components/header/inputFields/EmailAddressInputField";

describe("Email Address input field tests", () => {
  //?US2-EAI-1
  test("It should not display an error on render", () => {
    render(
      <EmailAddressInputField emailAddressValue="" onChange={() => null} />
    );
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
