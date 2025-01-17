import { useAppContext } from "../../hooks/contexts/appContext";
import Button from "../general/Button";
import Modal from "../general/Modal";
import UserDetailsForm from "./UserDetailsForm";

export default function RegisterButton({
  onClick,
  doShowForm,
  onClose,
  onSuccess,
}) {
  const {
    registerNewUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
  } = useAppContext();

  const handleRegisterNewUser = async (submission) => {
    const newUser = await registerNewUser(submission);
    if (newUser) onSuccess();
  };

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
            onSubmit={handleRegisterNewUser}
            errors={authenticationErrors}
            handleClearErrors={handleClearErrors}
            isLoading={authenticationIsLoading}
            activeFields={{
              username: true,
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
