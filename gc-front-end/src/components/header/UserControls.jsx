import { useState } from "react";

import RegisterButton from "./RegisterButton";
import SignInButton from "./SignInButton";

export default function UserControls() {
  const modalWindows = {
    REGISTER: "register",
    SUCCESS_MESSAGE: "success",
    SIGN_IN: "sign-in",
  };

  const [activeModal, setActiveModal] = useState(null);

  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="md:col-start-3 flex flex-row gap-2 place-self-end">
      <RegisterButton
        onClick={() => setActiveModal(modalWindows.REGISTER)}
        doShowForm={activeModal === modalWindows.REGISTER}
        onClose={handleCloseModal}
      />
      <SignInButton />
    </div>
  );
}
