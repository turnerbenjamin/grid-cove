import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdOutlineCheck } from "react-icons/md";

export default function SuccessToast({ message, onClose, displayFor = 0 }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector("body").style.overflowY = "hidden";
    return () => {
      document.querySelector("body").style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(onClose, displayFor);
    return () => clearTimeout(timeout);
  });

  const toast = (
    <div className="absolute top-[5vh] inset-x-0 flex flex-col items-center">
      <div className="relative border-2 border-primary-500 bg-grid-white py-2 px-20 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        {onClose && (
          <MdClose
            className="absolute top-[5px] right-[5px] text-3xl fill-primary-900 hover:fill-grid-red"
            role="button"
            onClick={onClose}
            title="close"
          />
        )}
        <div className="flex flex-row items-center justify-center gap-2">
          <MdOutlineCheck className="fill-primary-600 text-3xl" />
          <p className="text-secondary-900">{message}</p>
        </div>
      </div>
    </div>
  );

  const root = document.getElementById("modal");
  return createPortal(toast, root);
}
