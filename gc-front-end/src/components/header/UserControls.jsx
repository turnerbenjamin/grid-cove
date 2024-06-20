import { useEffect, useState } from "react";

import RegisterButton from "./RegisterButton";
import SignInButton from "./SignInButton";
import { useAppContext } from "../../hooks/contexts/appContext";
import SuccessfulRegistrationMessage from "./SuccessfulRegistrationMessage";

export default function UserControls() {
  const modalWindows = {
    REGISTER: "register",
    SUCCESS_MESSAGE: "success",
    SIGN_IN: "sign-in",
  };
  const [activeModal, setActiveModal] = useState(null);
  const { isRegistrationSuccessful, handleClearIsRegistrationSuccessful } =
    useAppContext();

  const handleCloseModal = () => setActiveModal(null);

  const handleDismissSuccessMessage = (options) => {
    handleClearIsRegistrationSuccessful();
    setActiveModal(options?.doShowSignInForm ? modalWindows.SIGN_IN : null);
  };

  useEffect(() => {
    if (isRegistrationSuccessful) setActiveModal(modalWindows.SUCCESS_MESSAGE);
  }, [isRegistrationSuccessful]);

  return (
    <div className="md:col-start-3 flex flex-row gap-2 place-self-end">
      <RegisterButton
        onClick={() => setActiveModal(modalWindows.REGISTER)}
        doShowForm={activeModal === modalWindows.REGISTER}
        onClose={handleCloseModal}
      />
      <SignInButton
        onClick={() => setActiveModal(modalWindows.SIGN_IN)}
        doShowForm={activeModal === modalWindows.SIGN_IN}
        onClose={handleCloseModal}
      />
      {activeModal === modalWindows.SUCCESS_MESSAGE && (
        <SuccessfulRegistrationMessage onClose={handleDismissSuccessMessage} />
      )}
    </div>
  );
}
