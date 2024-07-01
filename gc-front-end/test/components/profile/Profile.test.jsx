import { act, fireEvent, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

import { mockPromise, renderWithRouter } from "../../test.utils";
import { AppContextProvider } from "../../../src/hooks/contexts/appContext";

import Profile from "../../../src/components/profile/Profile";

import * as userService from "../../../src/services/user.service";
import * as authenticationService from "../../../src/services/authentication.service";

vi.mock("../../../src/services/user.service");
vi.mock("../../../src/services/authentication.service");

describe("Profile tests: ", () => {
  const testActiveUser = {
    _id: "test-active-user-id",
  };

  beforeEach(() => {
    authenticationService.getActiveUser.mockReturnValueOnce(testActiveUser);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Update user tests: ", () => {
    const [updateUserPromise, updateUserResolver, updateUserRejecter] =
      mockPromise();
    const testUpdates = {
      username: "new-username",
      emailAddress: "new@emailaddress.com",
    };

    beforeEach(async () => {
      userService.updateUser.mockReturnValueOnce(updateUserPromise);
      renderWithRouter(
        <AppContextProvider>
          <Profile />
        </AppContextProvider>,
        "/me"
      );

      await act(async () => {
        fireEvent.change(screen.getByTitle(/username/i), {
          target: { value: testUpdates.username },
        });
        fireEvent.change(screen.getByTitle(/email address/i), {
          target: { value: testUpdates.emailAddress },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByTitle(/submit/i));
      });
    });

    //?US13-PFL-1
    test("It should call the user service with the correct arguments when save is clicked", async () => {
      //Assert
      expect(userService.updateUser).toHaveBeenCalledWith(
        testActiveUser._id,
        testUpdates
      );
    });

    //?US13-PFL-2
    test("It should display a loading spinner while the user service is loading", async () => {
      //Assert
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
