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
        isActive
      />
    );
    expect(screen.queryByRole("alert")).toBe(null);
  });

  //?US2-CPI-2
  test("It should display an error on blur where passwords do not match", async () => {
    render(
      <ConfirmPasswordInputField
        passwordValue="a"
        confirmPasswordValue="b"
        onChange={() => null}
        isActive
      />
    );
    const inputField = screen.getByTitle("Confirm Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBeInTheDocument();
  });

  //?US2-CPI-3
  test("It should not display an error on blur where passwords do match", async () => {
    render(
      <ConfirmPasswordInputField
        passwordValue="a"
        confirmPasswordValue="a"
        onChange={() => null}
        isActive
      />
    );
    const inputField = screen.getByTitle("Confirm Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
