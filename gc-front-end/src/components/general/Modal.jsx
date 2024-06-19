import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

export default function Modal({ onClose, children }) {
  const root = document.getElementById("modal");

  const modal = (
    <div className="absolute inset-0 flex flex-col items-center pt-[10vh] bg-secondary-100 bg-opacity-40">
      <div className="relative bg-secondary-700 p-8">
        {onClose && (
          <MdClose
            className="absolute top-[5px] right-[5px] text-3xl hover:fill-grid-red"
            role="button"
            onClick={onClose}
          />
        )}

        {children}
      </div>
    </div>
  );

  return createPortal(modal, root);
}
