import { expect } from "vitest";
import axios from "axios";

import * as authenticationService from "../../src/services/authentication.service";

vi.mock("axios");

describe("Authentication service tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Register tests", () => {
    const testUserSubmission = {
      username: "test-user",
      emailAddress: "a@b.c",
      password: "password12$",
    };
    const testResponse = { data: "test data" };

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
  });
});
