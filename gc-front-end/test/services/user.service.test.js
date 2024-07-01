import { expect } from "vitest";
import axios from "axios";

import * as userService from "../../src/services/user.service";

vi.mock("axios");

describe("User service tests: ", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const testResponse = { data: "test data" };

  describe("Update user tests: ", () => {
    const testUserId = "TestUserId";
    const testUpdates = {
      username: "new-username",
      emailAddress: "new@emailaddress.com",
    };

    //? US13-URS-1
    test("It should call axios get with the correct url", async () => {
      //Arrange
      const expectedURL = `${
        import.meta.env.VITE_APP_UPDATE_USER_URL
      }/${testUserId}`;
      axios.patch.mockResolvedValueOnce(testResponse);
      //Act
      await userService.updateUser(testUserId, testUpdates);
      //Assert
      expect(axios.patch).toBeCalledWith(expectedURL, testUpdates);
    });

    //? US13-URS-2
    test(" It should throw err if get rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.patch.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await userService.updateUser(testUserId, testUpdates);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });
  });
});
