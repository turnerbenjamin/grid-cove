import { act, render, screen } from "@testing-library/react";
import UserNameInputField from "../../../../src/components/header/inputFields/UserNameInputField";

describe("Username input field tests", () => {
  //?US2-UNI-1
  test("It should not display an error on render", () => {
    render(<UserNameInputField userNameValue="" onChange={() => null} />);
    expect(screen.queryByRole("alert")).toBe(null);
  });

  //?US2-UNI-2
  test("It should display an error on blur where username is invalid", async () => {
    render(<UserNameInputField userNameValue="" onChange={() => null} />);
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBeInTheDocument();
  });

  //?US2-UNI-3
  test("It should not display an error on blur where username is valid", async () => {
    render(
      <UserNameInputField
        userNameValue="valid-username"
        onChange={() => null}
      />
    );
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
