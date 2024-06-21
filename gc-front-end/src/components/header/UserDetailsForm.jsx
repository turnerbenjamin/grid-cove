import { useState } from "react";

import Button from "../general/Button";
import RenderedErrors from "../general/RenderedErrors";
import FormValidator from "../../utils/FormValidator";
import UserNameInputField from "./inputFields/UserNameInputField";
import EmailAddressInputField from "./inputFields/EmailAddressInputField";
import PasswordInputField from "./inputFields/PasswordInputField";
import ConfirmPasswordInputField from "./inputFields/ConfirmPasswordInputField";

export default function UserDetailsForm({
  headingText,
  submitButtonText,
  activeFields,
  errors,
  isLoading,
  clearErrors,
  onSubmit,
  doSkipValidation,
  successMessage,
}) {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = (setter, value) => {
    if (errors?.length > 0 && typeof clearErrors === "function") clearErrors();
    setter(value);
  };

  const submission = {
    username,
    emailAddress,
    password,
    confirmPassword,
  };

  for (const field in submission) {
    if (!activeFields[field]) delete submission[field];
  }

  const isFormValidated =
    doSkipValidation || FormValidator.isValidated(submission);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValidated) return;
    delete submission.confirmPassword;
    onSubmit(submission);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-[95vw] max-w-md"
      onSubmit={handleSubmit}
      role="form"
    >
      <h2 className="mb-4 text-2xl text-accent-500" role="heading">
        {headingText}
      </h2>

      <UserNameInputField
        userNameValue={username}
        isDisabled={successMessage || isLoading}
        onChange={(e) => handleUpdate(setUsername, e.target.value)}
        isActive={activeFields?.username}
        doSkipValidation={doSkipValidation}
      />

      <EmailAddressInputField
        emailAddressValue={emailAddress}
        isDisabled={successMessage || isLoading}
        onChange={(e) => handleUpdate(setEmailAddress, e.target.value)}
        isActive={activeFields?.emailAddress}
        doSkipValidation={doSkipValidation}
      />

      <PasswordInputField
        passwordValue={password}
        isDisabled={successMessage || isLoading}
        onChange={(e) => handleUpdate(setPassword, e.target.value)}
        isActive={activeFields?.password}
        doSkipValidation={doSkipValidation}
      />

      <ConfirmPasswordInputField
        passwordValue={password}
        confirmPasswordValue={confirmPassword}
        isDisabled={successMessage || isLoading}
        onChange={(e) => handleUpdate(setConfirmPassword, e.target.value)}
        isActive={activeFields?.confirmPassword}
        doSkipValidation={doSkipValidation}
      />

      <input type="submit" className="hidden" />
      <Button
        primary
        className="mt-8"
        isLoading={isLoading}
        isDisabled={errors?.length > 0 || !isFormValidated}
        onClick={handleSubmit}
        title="Submit"
        type="submit"
      >
        {submitButtonText}
      </Button>
      {successMessage && <p className="text-primary-300">{successMessage}</p>}
      <RenderedErrors errors={errors} />
    </form>
  );
}
