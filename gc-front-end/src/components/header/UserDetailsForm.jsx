import { useState } from "react";

import Button from "../general/Button";
import RenderedErrors from "../general/RenderedErrors";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      username,
      emailAddress,
      password,
    });
  };

  const labelClasses = "w-full max-w-[20rem]";
  const inputClasses = "px-2 py-1 text-secondary-900 w-full max-w-[20rem]";

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-[95vw] max-w-md"
      onSubmit={handleSubmit}
      role="form"
    >
      <h2 className="mb-4 text-2xl text-accent-500" role="heading">
        {headingText}
      </h2>
      <label className={labelClasses}>Username</label>
      <input
        type="text"
        placeholder="your-username"
        title="Username"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={(e) => handleUpdate(setUsername, e.target.value)}
      />

      <label className={labelClasses}>Email address</label>
      <input
        type="text"
        placeholder="your@email.com"
        title="Email address"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={(e) => handleUpdate(setEmailAddress, e.target.value)}
      />

      <label className={labelClasses + " mt-4"}>Password</label>
      <input
        type="password"
        placeholder="Your password"
        title="Password"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={(e) => handleUpdate(setPassword, e.target.value)}
      />

      <label className={labelClasses}>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm password"
        title="Confirm password"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={(e) => handleUpdate(setConfirmPassword, e.target.value)}
      />
      <input type="submit" className="hidden" />
      <Button
        primary
        className="mt-8"
        isLoading={isLoading}
        isDisabled={errors?.length > 0}
        onClick={handleSubmit}
        title="Submit"
      >
        {submitButtonText}
      </Button>
      <RenderedErrors errors={errors} />
    </form>
  );
}
