import { act, render, screen } from "@testing-library/react";

import UserNameInputField from "../../../../src/components/header/inputFields/UserNameInputField";

describe("Username input field tests: ", () => {
  //?US2-UNI-1
  test("It should not display an error on render", () => {
    //Act
    render(
      <UserNameInputField userNameValue="" onChange={() => null} isActive />
    );
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
  });

  //?US2-UNI-2
  test("It should display an error on blur where username is invalid", async () => {
    //Act
    render(
      <UserNameInputField userNameValue="" onChange={() => null} isActive />
    );
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBeInTheDocument();
  });

  //?US2-UNI-3
  test("It should not display an error on blur where username is valid", async () => {
    //Act
    render(
      <UserNameInputField
        userNameValue="valid-username"
        onChange={() => null}
        isActive
      />
    );
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
  });
});
