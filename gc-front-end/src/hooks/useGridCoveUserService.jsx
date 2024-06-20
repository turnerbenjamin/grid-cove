import { useState } from "react";

import { register } from "../services/authentication.service";

export default function useGridCoveUserService() {
  const [activeUser, setActiveUser] = useState(null);
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [authenticationErrors, setAuthenticationErrors] = useState(null);

  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err.message];
    setAuthenticationErrors(errorMessages);
  };

  const handleClearAuthenticationErrors = () => setAuthenticationErrors(false);

  const registerNewUser = async (newUserSubmission) => {
    try {
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      await register(newUserSubmission);
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
  };
}
