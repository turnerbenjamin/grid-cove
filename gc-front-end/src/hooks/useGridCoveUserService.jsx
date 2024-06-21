import { useState } from "react";

import { register, signIn } from "../services/authentication.service";

export default function useGridCoveUserService() {
  const [activeUser, setActiveUser] = useState(null);
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [authenticationErrors, setAuthenticationErrors] = useState(null);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(null);
  const [isSignInSuccessful, setIsSignInSuccessful] = useState(null);

  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err];
    setAuthenticationErrors(errorMessages);
  };

  const handleClearAuthenticationErrors = () => setAuthenticationErrors(false);

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
      await signIn(userCredentials);
      setIsSignInSuccessful(true);
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
    handleClearAuthenticationErrors,
    isRegistrationSuccessful,
    handleClearIsRegistrationSuccessful,
    signInUser,
    isSignInSuccessful,
    handleClearSignInIsSuccessful,
  };
}
