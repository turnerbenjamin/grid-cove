import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function PasswordInputField({
  passwordValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;
  return (
    <FormInputValidator
      className="mb-2"
      values={[passwordValue]}
      validator={FormValidator.validatePassword}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        labelTitle="Password"
        placeholder="Your password"
        type="password"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
