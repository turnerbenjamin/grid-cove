import { act, render, screen } from "@testing-library/react";
import PasswordInputField from "../../../../src/components/header/inputFields/PasswordInputField";

describe("Password input field tests", () => {
  //?US2-PWI-1
  test("It should not display an error on render", () => {
    render(
      <PasswordInputField
        passwordValue="invalid"
        onChange={() => null}
        isActive
      />
    );
    expect(screen.queryByRole("alert")).toBe(null);
  });

  //?US2-PWI-2
  test("It should display an error on blur where password is invalid", async () => {
    render(
      <PasswordInputField
        passwordValue="invalid"
        onChange={() => null}
        isActive
      />
    );
    const inputField = screen.getByTitle("Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBeInTheDocument();
  });

  //?US2-PWI-3
  test("It should not display an error on blur where password is valid", async () => {
    render(
      <PasswordInputField
        passwordValue="validPassword123$"
        onChange={() => null}
        isActive
      />
    );
    const inputField = screen.getByTitle("Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
