import { beforeAll, expect } from "vitest";
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
  });
});
