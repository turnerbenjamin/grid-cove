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
}) {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = (setter, value) => {
    if (errors?.length > 0 && typeof clearErrors === "function") clearErrors();
    setter(value);
  };

  const isFormValidated = FormValidator.isValidated({
    username,
    emailAddress,
    password,
    confirmPassword,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValidated) return;
    onSubmit({
      username,
      emailAddress,
      password,
    });
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
        isLoading={isLoading}
        onChange={(e) => handleUpdate(setUsername, e.target.value)}
      />

      <EmailAddressInputField
        emailAddressValue={emailAddress}
        isLoading={isLoading}
        onChange={(e) => handleUpdate(setEmailAddress, e.target.value)}
      />

      <PasswordInputField
        passwordValue={password}
        isLoading={isLoading}
        onChange={(e) => handleUpdate(setPassword, e.target.value)}
      />

      <ConfirmPasswordInputField
        passwordValue={password}
        confirmPasswordValue={confirmPassword}
        isLoading={isLoading}
        onChange={(e) => handleUpdate(setConfirmPassword, e.target.value)}
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
      <RenderedErrors errors={errors} />
    </form>
  );
}
