import Button from "../general/Button";

export default function UserDetailsForm({
  headingText,
  submitButtonText,
  activeFields,
}) {
  const inputClasses = "px-2 py-1 text-secondary-900";

  return (
    <form className="flex flex-col items-center justify-center gap-2">
      <h2 className="mb-4 text-2xl">{headingText}</h2>
      <label>Username</label>
      <input
        type="text"
        placeholder="your-username"
        className={inputClasses}
        role="textbox"
      />

      <label>Email address</label>
      <input
        type="text"
        placeholder="your@email.com"
        className={inputClasses}
        role="textbox"
      />

      <label className="mt-4">Password</label>
      <input
        type="password"
        placeholder="Your password"
        className={inputClasses}
        role="textbox"
      />

      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm password"
        className={inputClasses}
        role="textbox"
      />
      <Button primary className="mt-8">
        Submit
      </Button>
    </form>
  );
}
