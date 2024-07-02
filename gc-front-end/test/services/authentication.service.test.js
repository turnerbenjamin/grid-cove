import { expect } from "vitest";
import axios from "axios";

import * as authenticationService from "../../src/services/authentication.service";

vi.mock("axios");

describe("Authentication service tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const testResponse = { data: "test data" };

  describe("Register tests", () => {
    const testUserSubmission = {
      username: "test-user",
      emailAddress: "a@b.c",
      password: "password12$",
    };

    //?US1-AHS-1
    test("It should call axios post with the correct url and payload", async () => {
      //Arrange
      const expectedURL = import.meta.env.VITE_APP_REGISTRATION_URL;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await authenticationService.register(testUserSubmission);
      //Assert
      expect(axios.post).toBeCalledWith(expectedURL, testUserSubmission);
    });

    //?US1-AHS-2
    test("It should throw err if post rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await authenticationService.register(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US1-AHS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await authenticationService.register(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US1-AHS-4
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await authenticationService.register(testUserSubmission);
      //Assert
      expect(actual).toEqual(expected);
    });
  });
  describe("Sign in tests", () => {
    const testUserSubmission = {
      emailAddress: "a@b.com",
      password: "password12$",
    };
    let setItemSpy;

    beforeEach(() => {
      setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    });

    afterEach(() => {
      localStorage.clear();
      setItemSpy.mockClear();
    });

    //?US3-AHS-1
    test("It should call axios post with the correct url", async () => {
      //Arrange
      const expectedURL = import.meta.env.VITE_APP_SIGN_IN_URL;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await authenticationService.signIn(testUserSubmission);
      //Assert
      expect(axios.post).toBeCalledWith(expectedURL, testUserSubmission);
    });

    //?US3-AHS-2
    test("It should return err if post rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await authenticationService.signIn(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US3-AHS-3
    test("It should return err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await authenticationService.signIn(testUserSubmission);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US3-AHS-4
    test("It should call set data on local storage where axios resolves", async () => {
      //Arrange
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await authenticationService.signIn(testUserSubmission);
      //Assert
      expect(setItemSpy).toBeCalledWith(
        "user",
        JSON.stringify(testResponse.data)
      );
    });

    //?US3-AHS-5
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await authenticationService.signIn(testUserSubmission);
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Sign Out tests", () => {
    let removeItemSpy;

    beforeEach(() => {
      removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");
    });

    afterEach(() => {
      localStorage.clear();
      removeItemSpy.mockClear();
    });

    //?US4-AHS-1
    test("It should call axios post with the correct url", async () => {
      //Arrange
      const expectedURL = import.meta.env.VITE_APP_SIGN_OUT_URL;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await authenticationService.signOut();
      //Assert
      expect(axios.post).toBeCalledWith(expectedURL);
    });

    //?US4-AHS-2
    test("It should return err if post rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await authenticationService.signOut();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US4-AHS-3
    test("It should return err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await authenticationService.signOut();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US4-AHS-4
    test("It should call remove item on local storage", async () => {
      //Act
      await authenticationService.signOut();
      //Assert
      expect(removeItemSpy).toBeCalledWith("user");
    });
  });

  describe("Get active user service tests", () => {
    let getItemSpy;

    beforeEach(() => {
      getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    });

    afterEach(() => {
      localStorage.clear();
      getItemSpy.mockClear();
    });

    //?US4-AHS-5
    test("It should call get item on local storage", () => {
      //Arrange
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      authenticationService.getActiveUser();
      //Assert
      expect(getItemSpy).toBeCalledWith("user");
    });

    //?US4-AHS-6
    test("It should return the value returned from get item", async () => {
      //Arrange
      const expected = { test: "test" };
      getItemSpy.mockReturnValueOnce(JSON.stringify(expected));
      //Act
      const actual = await authenticationService.getActiveUser();
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Update password tests", () => {
    let removeItemSpy;
    const testPayload = {
      password: "current-password",
      updatedPassword: "new-password",
    };

    beforeEach(() => {
      removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");
    });

    afterEach(() => {
      localStorage.clear();
      removeItemSpy.mockClear();
    });

    //?US14-URS-1
    test("It should call axios patch with the correct url", async () => {
      //Arrange
      const expectedURL = import.meta.env.VITE_APP_UPDATE_PASSWORD_URL;
      axios.patch.mockResolvedValueOnce(testResponse);
      //Act
      await authenticationService.updatePassword(testPayload);
      //Assert
      expect(axios.patch).toBeCalledWith(expectedURL, testPayload);
    });

    //?US14-URS-2
    test("It should throw err if patch rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.patch.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await authenticationService.updatePassword(testPayload);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US14-URS-3
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.patch.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await authenticationService.updatePassword(testPayload);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //?US14-URS-4
    test("It should call remove user item from local storage where axios resolves", async () => {
      //Act
      await authenticationService.updatePassword({ testPayload });
      //Assert
      expect(removeItemSpy).toBeCalledWith("user");
    });
  });
});
