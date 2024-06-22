import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import ActiveUserControl from "../../../src/components/header/ActiveUserControl";
import { useAppContext } from "../../../src/hooks/contexts/appContext";

vi.mock("react-router-dom");
vi.mock("../../../src/hooks/contexts/appContext");

describe("Active user control tests", () => {
  beforeEach(() => {
    useAppContext.mockReturnValue({
      signOutUser: vi.fn(),
    });
    render(<ActiveUserControl />);
  });

  //? US4-AUC-1
  test("It should display a log-out button when hovered over", async () => {
    //Assert
    await act(async () => {
      fireEvent.mouseMove(screen.getByTitle("Profile"));
    });
    expect(screen.queryByText(/log-out/i)).toBeInTheDocument();
  });
});
