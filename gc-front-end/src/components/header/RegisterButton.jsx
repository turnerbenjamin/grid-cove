import Button from "../general/Button";
import Modal from "../general/Modal";

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
      {doShowForm && <Modal onClose={onClose}>Form</Modal>}
    </>
  );
}
