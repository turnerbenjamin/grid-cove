import { CgSpinner } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { useAppContext } from "../../hooks/contexts/appContext";

import ErrorModal from "../general/ErrorModal";
import { Link } from "react-router-dom";

export default function ActiveUserControl() {
  const [doShowLogoutButton, setDoShowLogOutButton] = useState(false);
  const {
    signOutUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
    lastActionName,
  } = useAppContext();

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseIsOverWrapper = wrapperRef?.current?.contains(e.target);
      if (mouseIsOverWrapper && !doShowLogoutButton)
        setDoShowLogOutButton(true);
      if (!mouseIsOverWrapper && doShowLogoutButton)
        setDoShowLogOutButton(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [doShowLogoutButton]);

  return (
    <>
      <div className="relative h-full pl-2" ref={wrapperRef} title="Profile">
        <Link to="/me">
          <GiPlagueDoctorProfile className="text-4xl hover:fill-primary-200" />
        </Link>
        {doShowLogoutButton && (
          <>
            <div className="absolute top-[90%] right-0 w-fit">
              <div
                className="mt-4 text-nowrap px-2 py-1 bg-secondary-800 select-none cursor-pointer hover:text-accent-300"
                role="button"
                onClick={signOutUser}
              >
                {!authenticationIsLoading && "Log-Out"}
                {authenticationIsLoading && (
                  <CgSpinner className="animate-spin text-2xl" role="status" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {lastActionName === "signOut" && authenticationErrors && (
        <ErrorModal onClose={handleClearErrors} errors={authenticationErrors} />
      )}
    </>
  );
}
