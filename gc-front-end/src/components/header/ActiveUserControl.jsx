import { CgSpinner } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { useAppContext } from "../../hooks/contexts/appContext";

import ErrorModal from "../general/ErrorModal";
import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";

export default function ActiveUserControl() {
  const [doShowLogoutButton, setDoShowLogOutButton] = useState(false);
  const { authenticationErrors, handleClearErrors, lastActionName } =
    useAppContext();

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
      <div className="h-full flex flex-col justify-center">
        <div className="relative  pl-2 " ref={wrapperRef} title="Profile">
          <Link to="/me">
            <GiPlagueDoctorProfile className="text-4xl hover:fill-primary-200" />
          </Link>
          {doShowLogoutButton && <LogOutButton />}
        </div>
      </div>
      {lastActionName === "signOut" && authenticationErrors && (
        <ErrorModal onClose={handleClearErrors} errors={authenticationErrors} />
      )}
    </>
  );
}
