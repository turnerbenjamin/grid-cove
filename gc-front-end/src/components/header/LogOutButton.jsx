import { CgSpinner } from "react-icons/cg";
import { useAppContext } from "../../hooks/contexts/appContext";
import { useNavigate } from "react-router-dom";

export default function LogOutButton() {
  const { authenticationIsLoading, signOutUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const isLoggedOut = await signOutUser();
    if (isLoggedOut) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="absolute top-[90%] right-0 w-fit">
        <div
          className="mt-4 text-nowrap px-2 py-1 bg-secondary-800 select-none cursor-pointer hover:text-accent-300"
          role="button"
          onClick={handleLogOut}
        >
          {!authenticationIsLoading && "Log-Out"}
          {authenticationIsLoading && (
            <CgSpinner className="animate-spin text-2xl" role="status" />
          )}
        </div>
      </div>
    </>
  );
}
