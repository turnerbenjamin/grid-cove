import Button from "../general/Button";
import Modal from "../general/Modal";
import UserDetailsForm from "./UserDetailsForm";

export default function RegisterButton({ onClick, doShowForm, onClose }) {
  return (
    <>
      <Button
        primary
        className="text-sm sm:text-base sm:tracking-wide"
        onClick={onClick}
        doShowForm={doShowForm}
        onClose={onClose}
      >
        REGISTER
      </Button>
      {doShowForm && (
        <Modal onClose={onClose}>
          <UserDetailsForm
            headingText="Register"
            submitButtonText="Submit"
            activeFields={{
              userName: true,
              emailAddress: true,
              password: true,
              confirmPassword: true,
            }}
            errors={["Test error 1", "Test error 2"]}
          />
        </Modal>
      )}
    </>
  );
}
