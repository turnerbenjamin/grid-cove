import { useEffect, useState } from "react";

import { updateUser } from "../services/user.service";
import {
  getActiveUser,
  register,
  signIn,
  signOut,
  updatePassword,
} from "../services/authentication.service";

export default function useGridCoveUserService() {
  const [activeUser, setActiveUser] = useState(getActiveUser());
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [authenticationErrors, setAuthenticationErrors] = useState(null);
  const [lastActionName, setLastActionName] = useState("");

  //Listens for 401 error events thrown by any service. Where received
  //active user is set to null
  useEffect(() => {
    const handle401Error = () => {
      setActiveUser(null);
    };
    document.addEventListener("401Error", handle401Error);
    return () => document.removeEventListener("401Error", handle401Error);
  }, []);

  /**
   * Handles errors returned from the server.
   *
   * @private
   * @param {Error|Array} err - The error object or array of error objects.
   */
  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err.message || err];
    setAuthenticationErrors(errorMessages);
  };

  /**
   * Clears authentication errors.
   */
  const handleClearErrors = () => {
    setAuthenticationErrors(null);
  };

  /**
   * Registers a new user.
   *
   * @param {Object} newUserSubmission - The user submission data for registration.
   * @returns {Promise<Object>} - A promise that resolves to the newly registered user.
   */
  const registerNewUser = async (newUserSubmission) => {
    try {
      setLastActionName("register");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const newUser = await register(newUserSubmission);
      return newUser;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  /**
   * Sign in a user with the provided credentials.
   *
   * @param {object} userCredentials - The user credentials to sign in with.
   * @returns {Promise<object>} - A promise that resolves to the signed-in user.
   */
  const signInUser = async (userCredentials) => {
    try {
      setLastActionName("sign-in");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const user = await signIn(userCredentials);
      setActiveUser(user);
      return user;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  /**
   * Signs out the user.
   * @returns {boolean} Returns true if the user is successfully signed out.
   */
  const signOutUser = async () => {
    try {
      setLastActionName("signOut");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      await signOut();
      setActiveUser(null);
      return true;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  /**
   * Updates a user by their ID with the provided updates.
   *
   * @param {string} userToUpdateId - The ID of the user to update.
   * @param {object} updates - The updates to apply to the user.
   * @returns {Promise<object>} - A promise that resolves to the updated user object.
   */
  const updateUserById = async (userToUpdateId, updates) => {
    try {
      setLastActionName("updateUser");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const user = await updateUser(userToUpdateId, updates);
      setActiveUser(user);
      return user;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  /**
   * Updates the password of a user by their ID.
   *
   * @param {Object} payload - The payload containing the user ID and new password.
   * @returns {Promise<Object>} - A promise that resolves to the updated user object.
   */
  const updateUserPasswordById = async (payload) => {
    try {
      setLastActionName("updatePassword");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const user = await updatePassword(payload);
      setActiveUser(null);
      return user;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  return {
    authenticationErrors,
    authenticationIsLoading,
    activeUser,
    handleClearErrors,
    lastActionName,
    registerNewUser,
    signInUser,
    signOutUser,
    updateUserPasswordById,
    updateUserById,
  };
}
