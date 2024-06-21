import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function ConfirmPasswordInputField({
  passwordValue,
  confirmPasswordValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;
  return (
    <FormInputValidator
      className="mb-2"
      values={[passwordValue, confirmPasswordValue]}
      validator={FormValidator.validateConfirmPassword}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        labelTitle="Confirm Password"
        placeholder="Confirm password"
        type="password"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
