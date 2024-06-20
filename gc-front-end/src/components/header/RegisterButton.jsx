import { useAppContext } from "../../hooks/contexts/appContext";
import Button from "../general/Button";
import Modal from "../general/Modal";
import UserDetailsForm from "./UserDetailsForm";

export default function RegisterButton({ onClick, doShowForm, onClose }) {
  const {
    activeUser,
    registerNewUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearAuthenticationErrors,
  } = useAppContext();

  return (
    <>
      <Button
        primary
        className="text-sm sm:text-base sm:tracking-wide"
        onClick={onClick}
      >
        REGISTER
      </Button>
      {doShowForm && (
        <Modal onClose={onClose}>
          <UserDetailsForm
            headingText="Register"
            submitButtonText="Submit"
            onSubmit={registerNewUser}
            errors={authenticationErrors}
            clearErrors={handleClearAuthenticationErrors}
            isLoading={authenticationIsLoading}
            activeFields={{
              userName: true,
              emailAddress: true,
              password: true,
              confirmPassword: true,
            }}
          />
        </Modal>
      )}
    </>
  );
}
