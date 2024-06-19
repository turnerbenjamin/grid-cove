import Button from "../general/Button";
import RenderedErrors from "../general/RenderedErrors";

export default function UserDetailsForm({
  headingText,
  submitButtonText,
  activeFields,
  errors,
  isLoading,
  clearErrors,
}) {
  const inputClasses = "px-2 py-1 text-secondary-900";

  const handleUpdate = () => {
    if (errors?.length > 0 && typeof clearErrors === "function") clearErrors();
  };

  return (
    <form className="flex flex-col items-center justify-center gap-2">
      <h2 className="mb-4 text-2xl">{headingText}</h2>
      <label>Username</label>
      <input
        type="text"
        placeholder="your-username"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={() => handleUpdate()}
      />

      <label>Email address</label>
      <input
        type="text"
        placeholder="your@email.com"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={() => handleUpdate()}
      />

      <label className="mt-4">Password</label>
      <input
        type="password"
        placeholder="Your password"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={() => handleUpdate()}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm password"
        className={inputClasses}
        role="textbox"
        disabled={isLoading}
        onChange={() => handleUpdate()}
      />
      <Button
        primary
        className="mt-8"
        isLoading={isLoading}
        isDisabled={errors?.length > 0}
      >
        {submitButtonText}
      </Button>
      <RenderedErrors errors={errors} />
    </form>
  );
}
