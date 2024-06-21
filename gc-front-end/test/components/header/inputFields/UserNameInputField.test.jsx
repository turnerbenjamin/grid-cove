import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import UserNameInputField from "../../../../src/components/header/inputFields/UserNameInputField";

describe("Username input field test", () => {
  //?US2-UNI-1
  test("Should not display an error on render", () => {
    render(<UserNameInputField userNameValue="" onChange={() => null} />);
    screen.debug();
    expect(screen.queryByRole("alert")).toBeNull;
  });
});
