import { useEffect, useRef, useState } from "react";
import { GiPlagueDoctorProfile } from "react-icons/gi";

export default function ActiveUserControl() {
  const [doShowLogoutButton, setDoShowLogOutButton] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const handleMouseMove = (e) => {
      const mouseIsOverWrapper = wrapperRef.current.contains(e.target);
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
    <div className="relative h-full pl-2" ref={wrapperRef}>
      <GiPlagueDoctorProfile className="text-4xl" title="Profile" />
      {doShowLogoutButton && (
        <>
          <div className="absolute top-[90%] right-0 w-fit">
            <div
              className="mt-4 text-nowrap px-2 py-1 bg-secondary-800 select-none cursor-pointer"
              role-button
            >
              Log-Out
            </div>
          </div>
        </>
      )}
    </div>
  );
}
