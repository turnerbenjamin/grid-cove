import { useAppContext } from "../../hooks/contexts/appContext";
import Button from "../general/Button";
import Modal from "../general/Modal";
import UserDetailsForm from "./UserDetailsForm";

export default function SignInButton({ onClick, doShowForm, onClose }) {
  const {
    signInUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearAuthenticationErrors,
    isSignInSuccessful,
    handleClearSignInIsSuccessful,
  } = useAppContext();

  const handleClose = () => {
    handleClearSignInIsSuccessful();
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
            submitButtonText={isSignInSuccessful ? "Close" : "Submit"}
            onSubmit={isSignInSuccessful ? handleClose : signInUser}
            isLoading={authenticationIsLoading}
            errors={authenticationErrors}
            handleClearAuthenticationErrors={handleClearAuthenticationErrors}
            successMessage={
              isSignInSuccessful && "You have signed in successfully."
            }
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
