import { useState } from "react";
import { useAppContext } from "../../hooks/contexts/appContext";

import Button from "../general/Button";
import Modal from "../general/Modal";
import SuccessToast from "../general/SuccessToast";
import UserDetailsForm from "./UserDetailsForm";

export default function SignInButton({
  onClick,
  doShowForm,
  onClose,
  setShowSignInSuccessMessage,
}) {
  const {
    signInUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
    isSignInSuccessful,
    handleClearSignInIsSuccessful,
  } = useAppContext();

  const handleClose = () => {
    onClose();
  };

  const handleSignIn = async (submission) => {
    const user = await signInUser(submission);
    if (!user) return;
    setShowSignInSuccessMessage(true);
    onClose();
  };

  return (
    <>
      <Button
        className="text-sm sm:text-base sm:tracking-wide"
        onClick={onClick}
      >
        SIGN-IN
      </Button>
      {doShowForm && (
        <Modal onClose={handleClose}>
          <UserDetailsForm
            headingText="Sign-In"
            submitButtonText={"Submit"}
            onSubmit={handleSignIn}
            isLoading={authenticationIsLoading}
            errors={authenticationErrors}
            handleClearErrors={handleClearErrors}
            doSkipValidation
            activeFields={{
              emailAddress: true,
              password: true,
            }}
          />
        </Modal>
      )}
    </>
  );
}
