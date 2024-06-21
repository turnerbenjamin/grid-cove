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
  } = useAppContext();

  return (
    <>
      <Button
        className="text-sm sm:text-base sm:tracking-wide"
        onClick={onClick}
      >
        SIGN-IN
      </Button>
      {doShowForm && (
        <Modal onClose={onClose}>
          <UserDetailsForm
            headingText="Sign-In"
            submitButtonText="Submit"
            onSubmit={signInUser}
            isLoading={authenticationIsLoading}
            errors={authenticationErrors}
            handleClearAuthenticationErrors={handleClearAuthenticationErrors}
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
