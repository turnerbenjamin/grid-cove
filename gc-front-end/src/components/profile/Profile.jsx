import { useState } from "react";
import useGridCoveUserService from "../../hooks/useGridCoveUserService";
import SuccessToast from "../general/SuccessToast";
import UserDetailsForm from "../header/UserDetailsForm";
import { useAppContext } from "../../hooks/contexts/appContext";

export default function Profile() {
  const {
    activeUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearAuthenticationErrors,
    updateUserById,
  } = useAppContext();

  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (submission) => {
    const updatedUser = await updateUserById(activeUser._id, submission);
    if (updatedUser) setSuccessMessage("Your details have been updated");
  };

  return (
    <>
      <div className="flex flex-col items-center py-[5vh]">
        <UserDetailsForm
          headingText="Update Your Details"
          submitButtonText="Save"
          onSubmit={handleSubmit}
          errors={authenticationErrors}
          clearErrors={handleClearAuthenticationErrors}
          isLoading={authenticationIsLoading}
          activeFields={{
            username: true,
            emailAddress: true,
          }}
          defaultValues={{
            username: activeUser?.username,
            emailAddress: activeUser?.emailAddress,
          }}
        />
      </div>
      {successMessage && (
        <SuccessToast
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
          displayFor={3000}
        />
      )}
    </>
  );
}
