import { useState } from "react";

import {
  getActiveUser,
  register,
  signIn,
  signOut,
} from "../services/authentication.service";

export default function useGridCoveUserService() {
  const [activeUser, setActiveUser] = useState(getActiveUser());
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [authenticationErrors, setAuthenticationErrors] = useState(null);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(null);
  const [isSignInSuccessful, setIsSignInSuccessful] = useState(null);

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
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const user = await signIn(userCredentials);
      setActiveUser(user);
      setIsSignInSuccessful(true);
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
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

  return {
    activeUser,
    registerNewUser,
    authenticationIsLoading,
    authenticationErrors,
    isRegistrationSuccessful,
    handleClearIsRegistrationSuccessful,
    signInUser,
    isSignInSuccessful,
    handleClearSignInIsSuccessful,
    signOutUser,
    handleClearErrors,
  };
}
