import Modal from "./Modal";
import RenderedErrors from "./RenderedErrors";

export default function ErrorModal({ onClose, errors }) {
  return (
    <Modal onClose={onClose}>
      <div>
        <h3 className="text-2xl text-center text-danger-500 mb-4">Error</h3>
        <p className="mb-4">Sorry, there has been an error:</p>
        <RenderedErrors errors={errors} />
      </div>
    </Modal>
  );
}
