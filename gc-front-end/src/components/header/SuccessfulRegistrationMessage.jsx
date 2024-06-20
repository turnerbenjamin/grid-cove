import Button from "../general/Button";
import Modal from "../general/Modal";

export default function SuccessfulRegistrationMessage({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-primary-500 text-2xl mb-2">Success</h3>
        <p>Your account has been created</p>
        <Button
          className="mt-6"
          onClick={() => onClose({ doShowSignInForm: true })}
        >
          Sign In
        </Button>
      </div>
    </Modal>
  );
}
