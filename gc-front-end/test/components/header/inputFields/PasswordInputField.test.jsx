import { act, render, screen } from "@testing-library/react";
import PasswordInputField from "../../../../src/components/header/inputFields/PasswordInputField";

describe("Password input field tests", () => {
  //?US2-PWI-1
  test("It should not display an error on render", () => {
    render(
      <PasswordInputField passwordValue="invalid" onChange={() => null} />
    );
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
