import { expect } from "vitest";
import axios from "axios";

import * as userService from "../../src/services/user.service";

vi.mock("axios");

describe("User service tests: ", () => {
  let setItemSpy;

  beforeEach(() => {
    setItemSpy = vi.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
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
        import.meta.env.VITE_APP_API_ROOT
      }/users/${testUserId}`;
      axios.patch.mockResolvedValueOnce(testResponse);
      //Act
      await userService.updateUser(testUserId, testUpdates);
      //Assert
      expect(axios.patch).toBeCalledWith(expectedURL, testUpdates);
    });

    //? US13-URS-2
    test("It should throw err if get rejects with standard error object", async () => {
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

    //? US13-URS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.patch.mockRejectedValueOnce({ response: { data: expected } });
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

    //? US13-URS-4
    test("It should call set data on local storage where axios resolves", async () => {
      //Arrange
      axios.patch.mockResolvedValueOnce(testResponse);
      //Act
      await userService.updateUser(testUserId, testUpdates);
      //Assert
      expect(setItemSpy).toBeCalledWith(
        "user",
        JSON.stringify(testResponse.data)
      );
    });

    //? US13-URS-5
    test("It should return response data where axios resolves", async () => {
      //Arrange
      axios.patch.mockResolvedValueOnce(testResponse);
      const expected = testResponse.data;
      //Act
      const actual = await userService.updateUser(testUserId, testUpdates);
      //Assert
      expect(actual).toBe(expected);
    });
  });
});
