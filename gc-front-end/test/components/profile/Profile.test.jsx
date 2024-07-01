import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test } from "vitest";

import {
  cleanUpForModal,
  mockPromise,
  renderWithRouter,
  setUpForModal,
} from "../../test.utils";
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
    let updateUserPromise;
    let updateUserResolver;
    let updateUserRejecter;

    const testUpdates = {
      username: "new-username",
      emailAddress: "new@emailaddress.com",
    };

    beforeEach(async () => {
      setUpForModal();
      [updateUserPromise, updateUserResolver, updateUserRejecter] =
        mockPromise();
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

    afterEach(() => {
      cleanUpForModal();
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

    //?US13-PFL-3
    test("It should display errors where the user service rejects", async () => {
      //Arrange
      const testErrorMessage = "test error message";
      //Act
      await act(async () => {
        updateUserRejecter(new Error(testErrorMessage));
      });
      //Assert
      expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
    });

    //?US13-PFL-4
    test("It should remove errors from the display once an update has been made to the form", async () => {
      //Arrange
      const testErrorMessage = "test error message";
      //Act
      await act(async () => {
        updateUserRejecter(new Error(testErrorMessage));
      });
      await act(async () => {
        fireEvent.change(screen.getByTitle(/email address/i), {
          target: { value: "updated.again@email.com" },
        });
      });
      //Assert
      expect(screen.queryByText(testErrorMessage)).toBeNull();
    });

    //?US13-PFL-5
    test("It should display a success message if the user service resolves", async () => {
      //Act
      await act(async () => {
        updateUserResolver({});
      });
      //Assert
      expect(screen.getByTitle(/success/i)).toBeInTheDocument();
    });

    //?US13-PFL-6
    test("It should not display a success message if the user clicks close", async () => {
      //Act
      await act(async () => {
        updateUserResolver({});
      });
      await act(async () => {
        fireEvent.click(screen.getByTitle(/close/i));
      });
      //Assert
      expect(screen.queryByTitle(/success/i)).toBeNull();
    });
  });
});
