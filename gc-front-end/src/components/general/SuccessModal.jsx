import Modal from "./Modal";

export default function SuccessModal({ onClose, successMessage }) {
  return (
    <Modal onClose={onClose}>
      <div>
        <h3 className="text-lg text-center text-primary-500">Success</h3>
        <p>{successMessage}</p>
      </div>
    </Modal>
  );
}
