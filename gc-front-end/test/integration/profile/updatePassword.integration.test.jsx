import { screen } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

import {
  cleanUpForModal,
  renderAppWithLocationWrapper,
  setUpForModal,
} from "../../test.utils";
import * as authenticationServices from "../../../src/services/authentication.service";

vi.mock("../../../src/services/authentication.service");

describe("Update password integration test: ", () => {
  beforeEach(() => {
    setUpForModal();
  });

  afterEach(() => {
    cleanUpForModal();
  });

  //? US14-INT-1
  test("It should show a sign-in form where the user is not logged in", () => {
    //Act
    renderAppWithLocationWrapper(["/me"]);
    //Assert
    expect(
      screen.queryByRole("heading", { name: /sign-in/i })
    ).toBeInTheDocument();
  });

  //? US14-INT-2
  test("It should not show a sign in form when the user is logged in", () => {
    //Arrange
    authenticationServices.getActiveUser.mockReturnValue({});
    //Act
    renderAppWithLocationWrapper(["/me"]);
    //Assert
    expect(screen.queryByRole("heading", { name: /sign-in/i })).toBeNull();
  });
});
