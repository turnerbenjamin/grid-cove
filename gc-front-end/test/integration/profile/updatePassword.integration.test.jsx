import { screen, within } from "@testing-library/react";

import { afterEach, beforeEach } from "vitest";
import {
  cleanUpForModal,
  renderAppWithLocationWrapper,
  setUpForModal,
} from "../../test.utils";

vi.mock("axios");

describe("Update password integration test: ", () => {
  beforeEach(() => {
    setUpForModal();
    renderAppWithLocationWrapper(["/me"]);
  });

  afterEach(() => {
    cleanUpForModal();
  });

  //? US14-INT-1
  test("It should show a sign-in form where the user is not logged in", () => {
    expect(
      screen.queryByRole("heading", { name: /sign-in/i })
    ).toBeInTheDocument();
  });
});
