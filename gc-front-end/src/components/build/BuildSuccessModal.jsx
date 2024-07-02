import { Link } from "react-router-dom";

import Button from "../general/Button";
import Modal from "../general/Modal";

export default function BuildSuccessModal({ onClose, newPuzzleId }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg text-center text-primary-500 mb-4">Success</h3>
        <p className="mb-4">You have created a new puzzle</p>
        <Link to={`/puzzles/${newPuzzleId}`} title="Take a look">
          <Button>Take a look...</Button>
        </Link>
      </div>
    </Modal>
  );
}
