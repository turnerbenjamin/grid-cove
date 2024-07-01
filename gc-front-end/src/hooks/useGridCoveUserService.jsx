import { useState } from "react";

import {
  getActiveUser,
  register,
  signIn,
  signOut,
  updatePassword,
} from "../services/authentication.service";
import { updateUser } from "../services/user.service";

export default function useGridCoveUserService() {
  const [activeUser, setActiveUser] = useState(getActiveUser());
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [authenticationErrors, setAuthenticationErrors] = useState(null);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(null);
  const [isSignInSuccessful, setIsSignInSuccessful] = useState(null);
  const [lastActionName, setLastActionName] = useState("");

  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err.message || err];
    setAuthenticationErrors(errorMessages);
  };

  const handleClearErrors = () => {
    setAuthenticationErrors(null);
  };

  const handleClearIsRegistrationSuccessful = () =>
    setIsRegistrationSuccessful(false);

  const handleClearSignInIsSuccessful = () => setIsSignInSuccessful(false);

  const registerNewUser = async (newUserSubmission) => {
    try {
      setLastActionName("register");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      await register(newUserSubmission);
      setIsRegistrationSuccessful(true);
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  const signInUser = async (userCredentials) => {
    try {
      setLastActionName("sign-in");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const user = await signIn(userCredentials);
      setActiveUser(user);
      setIsSignInSuccessful(true);
      return user;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      setLastActionName("signOut");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      await signOut();
      setActiveUser(null);
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

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
    handleClearIsRegistrationSuccessful,
    handleClearSignInIsSuccessful,
    isRegistrationSuccessful,
    isSignInSuccessful,
    lastActionName,
    registerNewUser,
    signInUser,
    signOutUser,
    updateUserPasswordById,
    updateUserById,
  };
}
