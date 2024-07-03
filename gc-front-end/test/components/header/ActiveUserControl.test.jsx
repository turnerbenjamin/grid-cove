import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";

import { useAppContext } from "../../../src/hooks/contexts/appContext";
import ActiveUserControl from "../../../src/components/header/ActiveUserControl";

vi.mock("react-router-dom");
vi.mock("../../../src/hooks/contexts/appContext");

describe("Active user control tests: ", () => {
  beforeEach(() => {
    useAppContext.mockReturnValue({
      signOutUser: vi.fn(),
    });
    render(
      <div title="Not active user control">
        <ActiveUserControl />
      </div>
    );
  });

  //? US4-AUC-1
  test("It should display a log-out button when hovered over", async () => {
    //Act
    await act(async () => {
      fireEvent.mouseMove(screen.getByTitle("Profile"));
    });
    //Assert
    expect(screen.queryByText(/log-out/i)).toBeInTheDocument();
  });

  //? US4-AUC-2
  test("It should not display a log-out button when mouse not hovered over", async () => {
    //Act
    await act(async () => {
      fireEvent.mouseMove(screen.getByTitle("Profile"));
    });
    await act(async () => {
      fireEvent.mouseMove(screen.getByTitle("Not active user control"));
    });
    //Assert
    expect(screen.queryByText(/log-out/i)).toBe(null);
  });
});
