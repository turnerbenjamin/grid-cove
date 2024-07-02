import { useState } from "react";

import { useAppContext } from "../../hooks/contexts/appContext";
import ActiveUserControl from "./ActiveUserControl";
import RegisterButton from "./RegisterButton";
import SignInButton from "./SignInButton";
import SuccessfulRegistrationMessage from "./SuccessfulRegistrationMessage";
import SuccessToast from "../general/SuccessToast";

export default function UserControls() {
  const modalWindows = {
    REGISTER: "register",
    SUCCESS_MESSAGE: "success",
    SIGN_IN: "sign-in",
  };
  const [activeModal, setActiveModal] = useState(null);
  const [showSignInSuccessMessage, setShowSignInSuccessMessage] =
    useState(false);
  const { activeUser } = useAppContext();

  const handleCloseModal = () => setActiveModal(null);

  const handleDismissSuccessMessage = (options) => {
    setActiveModal(options?.doShowSignInForm ? modalWindows.SIGN_IN : null);
  };

  return (
    <>
      <div className="md:col-start-3 h-full flex flex-row gap-2 place-self-end items-center">
        {(!activeUser || activeModal) && (
          <>
            <RegisterButton
              onClick={() => setActiveModal(modalWindows.REGISTER)}
              doShowForm={activeModal === modalWindows.REGISTER}
              onClose={handleCloseModal}
              onSuccess={() => setActiveModal(modalWindows.SUCCESS_MESSAGE)}
            />
            <SignInButton
              onClick={() => setActiveModal(modalWindows.SIGN_IN)}
              doShowForm={activeModal === modalWindows.SIGN_IN}
              onClose={handleCloseModal}
              setShowSignInSuccessMessage={setShowSignInSuccessMessage}
            />
          </>
        )}
        {activeModal === modalWindows.SUCCESS_MESSAGE && (
          <SuccessfulRegistrationMessage
            onClose={handleDismissSuccessMessage}
          />
        )}
        {activeUser && !activeModal && <ActiveUserControl />}
      </div>
      {showSignInSuccessMessage && (
        <SuccessToast
          message={"You have been signed in"}
          onClose={() => setShowSignInSuccessMessage(false)}
          displayFor={3000}
        />
      )}
    </>
  );
}
