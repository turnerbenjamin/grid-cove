import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function ConfirmPasswordInputField({
  passwordValue,
  confirmPasswordValue,
  isLoading,
  onChange,
}) {
  return (
    <FormInputValidator
      className="mb-2"
      values={[passwordValue, confirmPasswordValue]}
      validator={FormValidator.validateConfirmPassword}
    >
      <FormInput
        labelTitle="Confirm Password"
        placeholder="Confirm password"
        type="password"
        isLoading={isLoading}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
