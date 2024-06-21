import { act, render, screen } from "@testing-library/react";
import ConfirmPasswordInputField from "../../../../src/components/header/inputFields/ConfirmPasswordInputField";

describe("Confirm password input field tests", () => {
  //?US2-CPI-1
  test("It should not display an error on render", () => {
    render(
      <ConfirmPasswordInputField
        passwordValue="a"
        confirmPasswordValue="b"
        onChange={() => null}
      />
    );
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
