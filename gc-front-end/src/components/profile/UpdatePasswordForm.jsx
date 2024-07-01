import { useState } from "react";

import { useAppContext } from "../../hooks/contexts/appContext";
import Button from "../general/Button";
import ConfirmPasswordInputField from "../header/inputFields/ConfirmPasswordInputField";
import FormValidator from "../../utils/FormValidator";
import PasswordInputField from "../header/inputFields/PasswordInputField";
import RenderedErrors from "../general/RenderedErrors";
import SuccessToast from "../general/SuccessToast";

export default function UpdatePasswordForm() {
  const {
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
    lastActionName,
    updateUserPasswordById,
  } = useAppContext();

  const [password, setPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isLoading =
    lastActionName === "updatePassword" && authenticationIsLoading;
  const errors = lastActionName === "updatePassword" && authenticationErrors;

  const isFormValidated = FormValidator.isValidated({
    password: updatedPassword,
    confirmPassword: confirmUpdatedPassword,
  });

  const submitIsDisabled = !password || errors?.length > 0 || !isFormValidated;

  const onSuccess = () => {
    setSuccessMessage("Password updated successfully!");
    setPassword("");
    setUpdatedPassword("");
    setConfirmUpdatedPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitIsDisabled) return;
    const didUpdate = await updateUserPasswordById({
      password,
      updatedPassword,
    });
    if (didUpdate) onSuccess();
  };

  const handleUpdate = (setter, value) => {
    if (errors?.length > 0 && typeof handleClearErrors === "function")
      handleClearErrors();
    setter(value);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-[95vw] max-w-md mt-12"
      onSubmit={handleSubmit}
      role="form"
    >
      <h2 className="mb-4 text-2xl text-accent-500" role="heading">
        Update Your Password
      </h2>
      <PasswordInputField
        label="Current password"
        passwordValue={password}
        isDisabled={successMessage || isLoading}
        onChange={(e) => handleUpdate(setPassword, e.target.value)}
        isActive={true}
        doSkipValidation={true}
      />

      <PasswordInputField
        label="Updated password"
        passwordValue={updatedPassword}
        isDisabled={successMessage || isLoading}
        onChange={(e) => handleUpdate(setUpdatedPassword, e.target.value)}
        isActive={true}
        doSkipValidation={password.length === 0}
      />

      <ConfirmPasswordInputField
        label="Confirm updated password"
        passwordValue={updatedPassword}
        confirmPasswordValue={confirmUpdatedPassword}
        isDisabled={successMessage || isLoading}
        onChange={(e) =>
          handleUpdate(setConfirmUpdatedPassword, e.target.value)
        }
        isActive={true}
        doSkipValidation={password.length === 0}
      />
      <input type="submit" className="hidden" />
      <Button
        primary
        className="mt-8"
        isLoading={isLoading}
        isDisabled={submitIsDisabled}
        onClick={handleSubmit}
        title="Update password"
        type="submit"
      >
        Update
      </Button>
      {!submitIsDisabled && (
        <p className="text-grid-orange text-center">
          Note: You will be logged-out if the update is successful
        </p>
      )}
      {successMessage && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessMessage("")}
          displayFor={3000}
        />
      )}
      <RenderedErrors errors={errors} />
    </form>
  );
}
